import type { Metadata } from "next"
import Link from "next/link"

import {
  ArrowRight,
  Code,
  GraduationCap,
  Heart,
  Shield,
} from "@/components/site/icons"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { StatsGrowthChart } from "@/components/site/stats-growth-chart"
import {
  siteButton,
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
} from "@/components/site/styles"
import { getPublicStats } from "@/lib/public-stats"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "BetterLectio i tal",
  description:
    "Aktuelle tal om BetterLectios elever, skoler, vækst og feedback.",
  alternates: { canonical: "/stats" },
  openGraph: {
    title: "BetterLectio i tal",
    description: "Aktuelle tal om BetterLectios elever, skoler og vækst.",
    url: "/stats",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BetterLectio i tal",
    description: "Aktuelle tal om BetterLectios elever, skoler og vækst.",
    images: ["/twitter-image"],
  },
}

const number = new Intl.NumberFormat("da-DK")

function formatDate(value: string, includeYear = false) {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    ...(includeYear ? { year: "numeric" } : {}),
  }).format(new Date(value))
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-40 flex-col justify-between bg-white px-6 py-7 min-[720px]:min-h-48 min-[720px]:px-8 min-[720px]:py-8">
      <p className="text-[clamp(36px,5vw,64px)] leading-none font-extrabold tracking-[0.01em] tabular-nums">
        {value}
      </p>
      <p className="mt-6 max-w-[17ch] text-sm leading-snug font-semibold text-ink-muted min-[720px]:text-base">
        {label}
      </p>
    </div>
  )
}

export default async function StatsPage() {
  const stats = await getPublicStats()
  const firstDate = formatDate(stats.firstStudentAt, true)
  const updateDate = formatDate(stats.updatedAt)
  const marqueeSchools = [...stats.schoolNames, ...stats.schoolNames]
  const classroomCount = Math.floor(stats.totalStudents / 30)
  const nextMilestoneProgress = stats.nextMilestone
    ? Math.min(100, (stats.totalStudents / stats.nextMilestone) * 100)
    : 100

  return (
    <div className="site">
      <div className="site-diagonal" aria-hidden="true" />
      <SiteNav />

      <main className={siteMainClass}>
        <section
          className={cn(
            siteContainerClass,
            "pt-10 pb-14 min-[720px]:pt-16 min-[720px]:pb-20"
          )}
        >
          <div className="mx-auto max-w-[980px] text-center">
            <span className={siteEyebrow()}>Siden marts 2026</span>
            <h1 className="mt-4 text-[clamp(48px,8vw,104px)] leading-[0.94] font-extrabold tracking-[-0.055em] text-balance">
              BetterLectio i tal.
            </h1>
            <p className="mx-auto mt-7 max-w-[680px] text-[clamp(18px,2.2vw,24px)] leading-[1.5] font-medium text-pretty text-ink-muted">
              Fra den første elev den {firstDate} til elever på{" "}
              {number.format(stats.totalSchools)} skoler i Danmark
              {stats.reachesGreenland ? " og Grønland" : ""}.
            </p>
          </div>

          <div className="mt-14 text-center min-[720px]:mt-20">
            <p className="text-[clamp(92px,20vw,250px)] leading-[0.82] font-extrabold tracking-[0.012em] tabular-nums">
              {number.format(stats.totalStudents)}
            </p>
            <p className="mt-8 text-lg font-bold min-[720px]:mt-12 min-[720px]:text-xl">
              elever har taget BetterLectio i brug
            </p>
            <p className="mt-2 font-mono text-xs tracking-[0.05em] text-ink-muted uppercase">
              {stats.isFallback
                ? "Senest kendte, afrundede tal"
                : `Opdateret ${updateDate}`}
            </p>
          </div>
        </section>

        <section
          className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}
          aria-label="Nøgletal"
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border border-line bg-line min-[900px]:grid-cols-4">
            <Stat
              value={number.format(stats.totalSchools)}
              label="skoler har elever med BetterLectio"
            />
            <Stat
              value={
                stats.weeklyActiveStudents == null
                  ? number.format(stats.newStudentsThisWeek)
                  : number.format(stats.weeklyActiveStudents)
              }
              label={
                stats.weeklyActiveStudents == null
                  ? "nye elever den seneste uge"
                  : "aktive elever den seneste uge"
              }
            />
            <Stat
              value={number.format(stats.totalFeedback)}
              label="idéer og fejlrapporter sendt ind"
            />
            <Stat
              value={number.format(classroomCount)}
              label="fyldte klasselokaler i elevtal"
            />
          </div>
        </section>

        <section className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}>
          <div className="border-y border-line py-12 min-[720px]:py-20">
            <span className={siteEyebrow()}>Det tallene betyder</span>
            <h2 className="mt-4 max-w-[1000px] text-[clamp(34px,5.8vw,72px)] leading-[1.03] font-extrabold tracking-[-0.045em] text-balance">
              Lidt mindre bøvl i skoledagen.
            </h2>
            <p className="mt-8 max-w-[940px] text-[clamp(21px,3vw,36px)] leading-[1.35] font-semibold tracking-[-0.025em] text-pretty text-ink-muted">
              <span className="text-ink">Et skema, der er til at læse.</span>{" "}
              Lektier samlet ét sted. Beskeder i lommen. Karakterer uden et
              regneark ved siden af.
            </p>
          </div>
        </section>

        <section className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}>
          <div className="overflow-hidden rounded-[32px] bg-ink px-5 py-9 text-white min-[720px]:px-12 min-[720px]:py-12 min-[1000px]:px-16">
            <div className="grid gap-8 min-[900px]:grid-cols-[0.75fr_1.25fr] min-[900px]:items-end">
              <div>
                <span className={siteEyebrow("white")}>
                  Fra én elev til i dag
                </span>
                <h2 className="mt-3 max-w-[11ch] text-[clamp(34px,5vw,64px)] leading-[0.98] font-extrabold tracking-[-0.045em] text-balance">
                  Det begyndte med én elev.
                </h2>
              </div>
              <p className="max-w-[49ch] text-[17px] leading-[1.55] text-white/70 min-[900px]:justify-self-end">
                Kurven følger, hvor mange elever der har taget BetterLectio i
                brug siden marts 2026.
              </p>
            </div>
            <div className="mt-8 text-white min-[720px]:mt-12">
              <StatsGrowthChart
                points={stats.growth}
                milestones={stats.milestones}
              />
            </div>
          </div>
        </section>

        {stats.milestoneStory ? (
          <section
            className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}
          >
            <div className="grid items-end gap-7 border-y border-line py-12 min-[720px]:grid-cols-[1fr_auto] min-[720px]:py-16">
              <div>
                <span className={siteEyebrow()}>Et kapitel i væksten</span>
                <p className="mt-4 max-w-[850px] text-[clamp(38px,6.5vw,82px)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
                  Fra {number.format(stats.milestoneStory.from.value)} til{" "}
                  {number.format(stats.milestoneStory.to.value)} elever på{" "}
                  <span className="text-ink-muted">
                    {number.format(stats.milestoneStory.days)} dage.
                  </span>
                </p>
              </div>
              <div className="pb-1 font-mono text-xs leading-relaxed tracking-[0.04em] text-ink-muted uppercase min-[720px]:text-right">
                <p>{formatDate(stats.milestoneStory.from.date)}</p>
                <p aria-hidden="true">↓</p>
                <p>{formatDate(stats.milestoneStory.to.date)}</p>
              </div>
            </div>
          </section>
        ) : null}

        <section className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}>
          <article className="overflow-hidden rounded-[32px] border border-line bg-white">
            <div className="grid min-[900px]:grid-cols-[1.18fr_0.82fr]">
              <div className="p-8 min-[720px]:p-12 min-[1000px]:p-16">
                <span className={siteEyebrow()}>Feedback i praksis</span>
                <h2 className="mt-4 max-w-[14ch] text-[clamp(36px,5.4vw,68px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
                  {number.format(stats.totalFeedback)} gange har nogen taget sig
                  tid til at skrive.
                </h2>
              </div>

              <div className="flex flex-col justify-center border-t border-line bg-grey p-8 min-[720px]:p-12 min-[900px]:border-t-0 min-[900px]:border-l">
                <p className="max-w-[34ch] text-[clamp(19px,2.2vw,27px)] leading-[1.45] font-semibold tracking-[-0.02em] text-pretty">
                  Idéer, fejl og de små detaljer bliver samlet ét sted.
                </p>
                <p className="mt-4 max-w-[42ch] text-[16px] leading-relaxed text-pretty text-ink-muted">
                  Roadmapet viser de forslag, der er planlagt, i gang eller
                  færdige.
                </p>
                <Link
                  href="/roadmap"
                  className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 font-bold underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-ink"
                >
                  Se hele roadmapet <ArrowRight className="size-5" />
                </Link>
              </div>
            </div>
            <div className="border-t border-line bg-white px-8 py-9 min-[720px]:px-12 min-[720px]:py-11 min-[1000px]:px-16">
              <span className={siteEyebrow()}>Fra de første forslag</span>
              <div className="mt-6 grid divide-y divide-line border-y border-line min-[720px]:grid-cols-3 min-[720px]:divide-x min-[720px]:divide-y-0">
                {[
                  ["Beskeder", "Et helt nyt beskedoverblik."],
                  ["Karakterer", "Karakterer og gennemsnit samlet ét sted."],
                  ["Skema", "Egne aftaler direkte i skemaet."],
                ].map(([label, title]) => (
                  <div
                    key={label}
                    className="grid min-h-28 grid-cols-[7.5rem_1fr] items-center gap-4 py-5 min-[720px]:min-h-36 min-[720px]:grid-cols-1 min-[720px]:content-between min-[720px]:px-7 min-[720px]:py-6 min-[720px]:first:pl-0 min-[720px]:last:pr-0"
                  >
                    <p className="font-mono text-[11px] tracking-[0.05em] text-ink-muted uppercase">
                      {label}
                    </p>
                    <p className="max-w-[18ch] text-lg leading-tight font-bold tracking-[-0.025em] text-balance min-[720px]:mt-7 min-[1000px]:text-xl">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className={cn(siteContainerClass, "pb-10 min-[720px]:pb-14")}>
          <div className="grid items-center gap-7 border-y border-line py-10 min-[720px]:grid-cols-[auto_1fr_auto] min-[720px]:py-12">
            <p className="text-[clamp(72px,10vw,120px)] leading-[0.82] font-extrabold tracking-[0.012em] tabular-nums">
              {number.format(stats.totalSchools)}
            </p>
            <div>
              <span className={siteEyebrow()}>Skole for skole</span>
              <h2 className="mt-2 text-[clamp(28px,3.6vw,46px)] leading-none font-extrabold tracking-[-0.04em] text-balance">
                skoler i Danmark
                {stats.reachesGreenland ? " og Grønland" : ""}
              </h2>
            </div>
            <GraduationCap className="hidden size-14 text-ink-muted min-[720px]:block" />
          </div>
        </section>

        {stats.schoolNames.length > 0 ? (
          <section
            className="overflow-hidden border-y border-line py-7"
            aria-label="Et udvalg af skoler"
          >
            <p className="mb-5 text-center font-mono text-[11px] font-bold tracking-[0.08em] text-ink-muted uppercase">
              Et lille udvalg af de {number.format(stats.totalSchools)} skoler
            </p>
            <div className="marquee" aria-hidden="true">
              <div className="marquee__track">
                {marqueeSchools.map((school, index) => (
                  <span
                    key={`${school}-${index}`}
                    className="mx-6 text-[clamp(20px,2.8vw,34px)] font-extrabold tracking-[-0.025em] text-ink/75"
                  >
                    {school}
                    <span className="ml-12 text-ink/20">•</span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
          <div className="rounded-[32px] bg-ink px-7 py-12 text-white min-[720px]:px-14 min-[720px]:py-16">
            <div className="grid gap-10 min-[900px]:grid-cols-[1.2fr_0.8fr] min-[900px]:items-end">
              <div>
                <span className={siteEyebrow("white")}>Bygget i det åbne</span>
                <h2 className="mt-3 max-w-[12ch] text-[clamp(34px,5vw,60px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
                  Tallene er kun en del af historien.
                </h2>
                <p className="mt-5 max-w-[55ch] text-[17px] leading-[1.55] text-white/70">
                  BetterLectio er gratis, uden annoncer og open source. Koden,
                  roadmapet og måden vi behandler data på er åbne for alle.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  [Code, "Open source"],
                  [Heart, "Lavet af elever"],
                  [Shield, "Privatliv"],
                  [GraduationCap, "Til elever"],
                ].map(([Icon, label]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl bg-white/10 p-4"
                  >
                    <Icon className="mb-5 size-6" />
                    <p className="text-sm font-bold">{label as string}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://github.com/jonbng/betterlectio"
                target="_blank"
                rel="noreferrer noopener"
                className={siteButton("secondary")}
              >
                Se kildekoden <ArrowRight />
              </a>
              <Link href="/privatliv" className={siteButton("ghost")}>
                Privatliv <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "pb-20 min-[720px]:pb-28")}>
          <div className="mx-auto max-w-[820px] text-center">
            <span className={siteEyebrow()}>Næste milepæl</span>
            <h2 className="mx-auto mt-3 text-[clamp(64px,11vw,132px)] leading-[0.9] font-extrabold tracking-[0.012em] text-balance tabular-nums">
              {stats.nextMilestone
                ? number.format(stats.nextMilestone)
                : "Videre herfra"}
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-[17px] leading-[1.55] text-ink-muted">
              Kurven fortsætter, og tallet opdateres automatisk undervejs.
            </p>
            {stats.nextMilestone ? (
              <div className="mx-auto mt-8 max-w-[540px]">
                <div className="h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-ink"
                    style={{ width: `${nextMilestoneProgress}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between font-mono text-[11px] tracking-[0.03em] text-ink-muted uppercase">
                  <span>{number.format(stats.totalStudents)} i dag</span>
                  <span>{number.format(stats.nextMilestone)}</span>
                </div>
              </div>
            ) : null}
            <div className="mt-9">
              <Link href="/download" className={siteButton("primary")}>
                Hent BetterLectio gratis <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
