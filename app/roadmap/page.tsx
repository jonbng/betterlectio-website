import type { Metadata } from "next"

import { readVoterId } from "@/app/roadmap/actions"
import { GitHub, Sparkles } from "@/components/site/icons"
import { RoadmapBoard } from "@/components/site/roadmap-board"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import {
  siteButton,
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
} from "@/components/site/styles"
import { getRoadmap, getVotedIds } from "@/lib/roadmap"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Se hvad vi planlægger, arbejder på og har udgivet i BetterLectio — og stem på det, du vil have mest.",
  alternates: { canonical: "/roadmap" },
}

// Votes bust the "roadmap" cache tag; keep the page dynamic so voter state and
// counts stay fresh per request.
export const dynamic = "force-dynamic"

export default async function RoadmapPage() {
  const [columns, voterId] = await Promise.all([getRoadmap(), readVoterId()])
  const votedIds = [...(await getVotedIds(voterId))]
  const hasItems = columns.some((c) => c.items.length > 0)

  return (
    <div className="site">
      <SiteNav />

      <main className={cn(siteMainClass, siteContainerClass, "pt-6 pb-24")}>
        <section className="mx-auto max-w-[720px] py-12 text-center min-[720px]:py-16">
          <span className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-grey text-ink [&_svg]:size-8">
            <Sparkles />
          </span>
          <span className={siteEyebrow()}>Roadmap</span>
          <h1 className="mt-4 mb-5 text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            Hvad der er på vej.
          </h1>
          <p className="mx-auto max-w-[54ch] text-[clamp(17px,2vw,20px)] font-medium leading-[1.5] text-ink-muted">
            Følg med i, hvad vi planlægger, arbejder på og lige har udgivet.
            Stem på det, du synes er vigtigst — det hjælper os med at prioritere.
          </p>
        </section>

        {hasItems ? (
          <RoadmapBoard columns={columns} votedIds={votedIds} />
        ) : (
          <div className="mx-auto max-w-[520px] rounded-[24px] border border-dashed border-line bg-grey/40 p-10 text-center">
            <p className="text-[17px] font-bold text-ink">
              Roadmappet er lige på trapperne.
            </p>
            <p className="mt-2 text-sm leading-[1.5] text-ink-muted">
              Vi er ved at kuratere, hvad der skal vises her. Indtil da kan du
              komme med ønsker på GitHub.
            </p>
          </div>
        )}

        <section className="mx-auto mt-16 max-w-[620px] rounded-[24px] border border-line bg-grey/50 p-8 text-center">
          <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-ink">
            Mangler du noget?
          </h2>
          <p className="mx-auto mt-2 max-w-[46ch] text-sm leading-[1.5] text-ink-muted">
            Har du en idé eller fundet en fejl? Send os et ønske direkte i appen
            eller på GitHub — det ender her, hvis vi tager det med.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/jonbng/betterlectio/issues"
              target="_blank"
              rel="noreferrer noopener"
              className={siteButton("secondary")}
            >
              <GitHub /> Kom med et ønske
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
