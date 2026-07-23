import type { Metadata } from "next"
import Link from "next/link"

import { ArrowRight, GitHub, Sparkles } from "@/components/site/icons"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import {
  siteButton,
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
} from "@/components/site/styles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Hvad vi arbejder på i BetterLectio. Roadmappet er på vej, følg med på GitHub imens.",
  alternates: { canonical: "/roadmap" },
}

export default function RoadmapPage() {
  return (
    <div className="site">
      <SiteNav />

      <main className={cn(siteMainClass, siteContainerClass, "pt-6 pb-10")}>
        <section className="mx-auto max-w-[720px] py-16 text-center min-[720px]:py-28">
          <span className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-grey text-ink [&_svg]:size-8">
            <Sparkles />
          </span>
          <span className={siteEyebrow()}>Roadmap</span>
          <h1 className="mt-4 mb-5 text-[clamp(40px,6vw,72px)] font-extrabold leading-[1] tracking-[-0.045em]">
            Vi er ved at bygge det.
          </h1>
          <p className="mx-auto max-w-[52ch] text-[clamp(18px,2.2vw,21px)] font-medium leading-[1.5] text-ink-muted">
            Et ordentligt roadmap med, hvad der er på vej, kommer snart. Indtil da
            kan du følge udviklingen og komme med ønsker direkte på GitHub.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <a
              href="https://github.com/jonbng/betterlectio/issues"
              target="_blank"
              rel="noreferrer noopener"
              className={siteButton("primary")}
            >
              <GitHub /> Følg med på GitHub
            </a>
            <Link href="/" className={siteButton("secondary")}>
              Tilbage til forsiden <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
