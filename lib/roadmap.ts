import "server-only"

import { unstable_cache } from "next/cache"

import { getSupabaseAdmin } from "@/lib/supabase"

// Public roadmap columns of feedback_items. Statuses map to three board
// columns. Only admin-published rows (is_public = true) are ever read, and we
// select curated public copy only — never the raw user message or any PII.
export type RoadmapColumnKey = "planned" | "in_progress" | "shipped"
export type RoadmapCategory = "bug" | "idea" | "other"

export type RoadmapItem = {
  id: string
  title: string
  description: string | null
  category: RoadmapCategory
  column: RoadmapColumnKey
  eta: string | null
  voteCount: number
}

export type RoadmapColumn = {
  key: RoadmapColumnKey
  label: string
  items: RoadmapItem[]
}

export const ROADMAP_CACHE_TAG = "roadmap"
const CACHE_REVALIDATE_SECONDS = 60 * 5 // 5 min; votes also bust the tag on write

const STATUS_TO_COLUMN: Record<string, RoadmapColumnKey> = {
  planned: "planned",
  in_progress: "in_progress",
  completed: "shipped",
}

const COLUMN_LABELS: Record<RoadmapColumnKey, string> = {
  planned: "Planlagt",
  in_progress: "I gang",
  shipped: "Udgivet",
}

const COLUMN_ORDER: RoadmapColumnKey[] = ["planned", "in_progress", "shipped"]

type RoadmapRow = {
  id: string
  status: string
  category: string
  public_title: string | null
  public_description: string | null
  roadmap_eta: string | null
  roadmap_sort: number | null
  roadmap_vote_count: number | null
  made_public_at: string | null
}

function normalizeCategory(value: string): RoadmapCategory {
  return value === "bug" || value === "idea" ? value : "other"
}

async function fetchRoadmap(): Promise<RoadmapColumn[]> {
  const empty = COLUMN_ORDER.map((key) => ({
    key,
    label: COLUMN_LABELS[key],
    items: [] as RoadmapItem[],
  }))

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("feedback_items")
      .select(
        "id, status, category, public_title, public_description, roadmap_eta, roadmap_sort, roadmap_vote_count, made_public_at",
      )
      .eq("is_public", true)
      .in("status", ["planned", "in_progress", "completed"])
    if (error) throw error

    const rows = (data ?? []) as RoadmapRow[]
    const byColumn = new Map<RoadmapColumnKey, RoadmapRow[]>()
    for (const row of rows) {
      const column = STATUS_TO_COLUMN[row.status]
      if (!column) continue
      const list = byColumn.get(column) ?? []
      list.push(row)
      byColumn.set(column, list)
    }

    return COLUMN_ORDER.map((key) => {
      const rowsForColumn = (byColumn.get(key) ?? []).slice().sort(sortRows)
      return {
        key,
        label: COLUMN_LABELS[key],
        items: rowsForColumn.map((row) => ({
          id: row.id,
          title: row.public_title?.trim() || "Kommende forbedring",
          description: row.public_description?.trim() || null,
          category: normalizeCategory(row.category),
          column: key,
          eta: row.roadmap_eta?.trim() || null,
          voteCount: row.roadmap_vote_count ?? 0,
        })),
      }
    })
  } catch (err) {
    console.error("[lib/roadmap] fetchRoadmap failed", err)
    return empty
  }
}

// Manual sort in JS so we can put null sort values last (Postgres nulls-first
// ordering is awkward through the JS client): sort asc, then most votes, then
// most recently published.
function sortRows(a: RoadmapRow, b: RoadmapRow): number {
  const sa = a.roadmap_sort
  const sb = b.roadmap_sort
  if (sa != null && sb != null && sa !== sb) return sa - sb
  if (sa != null && sb == null) return -1
  if (sa == null && sb != null) return 1
  const va = a.roadmap_vote_count ?? 0
  const vb = b.roadmap_vote_count ?? 0
  if (va !== vb) return vb - va
  const ta = a.made_public_at ? Date.parse(a.made_public_at) : 0
  const tb = b.made_public_at ? Date.parse(b.made_public_at) : 0
  return tb - ta
}

export const getRoadmap = unstable_cache(fetchRoadmap, ["bl-roadmap"], {
  revalidate: CACHE_REVALIDATE_SECONDS,
  tags: [ROADMAP_CACHE_TAG],
})

/**
 * feedback_item ids the given voter has already upvoted. Per-visitor, so this
 * is intentionally NOT cached.
 */
export async function getVotedIds(voterId: string | null): Promise<Set<string>> {
  if (!voterId) return new Set()
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from("roadmap_votes")
      .select("feedback_id")
      .eq("voter_id", voterId)
    if (error) throw error
    return new Set((data ?? []).map((r) => r.feedback_id as string))
  } catch (err) {
    console.error("[lib/roadmap] getVotedIds failed", err)
    return new Set()
  }
}
