import "server-only"

import { unstable_cache } from "next/cache"

import { getSupabaseAdmin } from "@/lib/supabase"

const DAY_MS = 86_400_000
const PAGE_SIZE = 1_000
const MILESTONES = [
  1, 100, 500, 1_000, 2_500, 5_000, 10_000, 25_000, 50_000, 100_000,
]

type StudentRow = {
  created_at: string
  school_id: number
}

type SchoolRow = {
  id: number
  name: string
  display_name: string | null
  lon: number | null
}

export type GrowthPoint = {
  date: string
  total: number
}

export type GrowthMilestone = {
  value: number
  date: string
}

export type PublicStats = {
  totalStudents: number
  totalSchools: number
  weeklyActiveStudents: number | null
  newStudentsThisWeek: number
  totalFeedback: number
  firstStudentAt: string
  updatedAt: string
  growth: GrowthPoint[]
  milestones: GrowthMilestone[]
  milestoneStory: {
    from: GrowthMilestone
    to: GrowthMilestone
    days: number
  } | null
  nextMilestone: number | null
  schoolNames: string[]
  reachesGreenland: boolean
  isFallback: boolean
}

async function fetchAllStudents(): Promise<StudentRow[]> {
  const supabase = getSupabaseAdmin()
  const rows: StudentRow[] = []

  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("students")
      .select("created_at, school_id")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw error
    rows.push(...((data ?? []) as StudentRow[]))
    if ((data?.length ?? 0) < PAGE_SIZE) break
  }

  return rows
}

async function fetchWeeklyActiveStudents(): Promise<number | null> {
  const token = process.env.POSTHOG_API_KEY
  if (!token) return null

  const host = process.env.POSTHOG_API_HOST ?? "https://eu.posthog.com"
  const projectId = process.env.POSTHOG_PROJECT_ID ?? "145688"
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query:
          "SELECT uniqExact(person_id) FROM events WHERE event = 'app_active' AND timestamp >= now() - INTERVAL 7 DAY",
      },
    }),
    next: { revalidate: 3_600 },
  })

  if (!response.ok) return null
  const result = (await response.json()) as { results?: unknown[][] }
  const value = result.results?.[0]?.[0]
  return typeof value === "number" ? value : null
}

function buildGrowth(students: StudentRow[]): GrowthPoint[] {
  if (students.length === 0) return []

  const daily = new Map<string, number>()
  for (const student of students) {
    const date = student.created_at.slice(0, 10)
    daily.set(date, (daily.get(date) ?? 0) + 1)
  }

  const start = new Date(`${students[0].created_at.slice(0, 10)}T00:00:00Z`)
  const end = new Date()
  const points: GrowthPoint[] = []
  let total = 0

  for (
    let cursor = start;
    cursor <= end;
    cursor = new Date(cursor.getTime() + DAY_MS)
  ) {
    const date = cursor.toISOString().slice(0, 10)
    total += daily.get(date) ?? 0
    points.push({ date, total })
  }

  return points
}

function buildMilestones(students: StudentRow[]): GrowthMilestone[] {
  return MILESTONES.filter((value) => value <= students.length).map(
    (value) => ({
      value,
      date: students[value - 1].created_at.slice(0, 10),
    })
  )
}

function selectSchoolNames(schools: SchoolRow[]): string[] {
  const names = schools
    .map((school) => school.display_name ?? school.name)
    .sort((a, b) => a.localeCompare(b, "da"))

  if (names.length <= 18) return names
  const selected = Array.from(
    { length: 18 },
    (_, index) => names[Math.floor((index * (names.length - 1)) / 17)]
  )
  return [...new Set(selected)]
}

async function fetchStats(): Promise<PublicStats> {
  try {
    const supabase = getSupabaseAdmin()
    const students = await fetchAllStudents()
    if (students.length === 0) throw new Error("No student rows returned")

    const schoolIds = [...new Set(students.map((student) => student.school_id))]
    const weekAgo = Date.now() - 7 * DAY_MS
    const [{ data: schoolData, error: schoolError }, total, weeklyActive] =
      await Promise.all([
        supabase
          .from("schools")
          .select("id, name, display_name, lon")
          .in("id", schoolIds),
        supabase
          .from("feedback_items")
          .select("*", { count: "exact", head: true }),
        fetchWeeklyActiveStudents(),
      ])

    if (schoolError) throw schoolError
    if (total.error) throw total.error
    const schools = (schoolData ?? []) as SchoolRow[]
    const growth = buildGrowth(students)
    const milestones = buildMilestones(students)
    const from = milestones.at(-2)
    const to = milestones.at(-1)

    return {
      totalStudents: students.length,
      totalSchools: schoolIds.length,
      weeklyActiveStudents: weeklyActive,
      newStudentsThisWeek: students.filter(
        (student) => new Date(student.created_at).getTime() >= weekAgo
      ).length,
      totalFeedback: total.count ?? 0,
      firstStudentAt: students[0].created_at,
      updatedAt: new Date().toISOString(),
      growth,
      milestones,
      milestoneStory:
        from && to
          ? {
              from,
              to,
              days: Math.max(
                1,
                Math.round(
                  (new Date(to.date).getTime() -
                    new Date(from.date).getTime()) /
                    DAY_MS
                )
              ),
            }
          : null,
      nextMilestone:
        MILESTONES.find((milestone) => milestone > students.length) ?? null,
      schoolNames: selectSchoolNames(schools),
      reachesGreenland: schools.some((school) => (school.lon ?? 0) < -10),
      isFallback: false,
    }
  } catch (error) {
    console.error("[public-stats] Unable to refresh public statistics", error)
    return fallbackStats()
  }
}

function fallbackStats(): PublicStats {
  const snapshot = [
    ["2026-03-23", 1],
    ["2026-04-10", 100],
    ["2026-05-18", 500],
    ["2026-08-11", 1_000],
    ["2026-09-09", 2_000],
    ["2026-09-23", 2_500],
    ["2026-10-03", 2_800],
  ] as const

  return {
    totalStudents: 2_800,
    totalSchools: 170,
    weeklyActiveStudents: null,
    newStudentsThisWeek: 200,
    totalFeedback: 327,
    firstStudentAt: "2026-03-23T00:00:00.000Z",
    updatedAt: "2026-10-03T00:00:00.000Z",
    growth: snapshot.map(([date, total]) => ({ date, total })),
    milestones: snapshot.slice(0, -1).map(([date, value]) => ({ date, value })),
    milestoneStory: {
      from: { value: 1_000, date: "2026-08-11" },
      to: { value: 2_500, date: "2026-09-23" },
      days: 43,
    },
    nextMilestone: 5_000,
    schoolNames: [
      "Aurehøj Gymnasium",
      "Birkerød Gymnasium",
      "Egaa Gymnasium",
      "Gefion Gymnasium",
      "GUX Nuuk",
      "HCØ Lyngby",
      "Nørre Gymnasium",
      "Rysensteen Gymnasium",
      "Sankt Annæ Gymnasium",
      "Sorø Akademi",
    ],
    reachesGreenland: true,
    isFallback: true,
  }
}

export const getPublicStats = unstable_cache(fetchStats, ["public-stats-v2"], {
  revalidate: 3_600,
  tags: ["public-stats"],
})
