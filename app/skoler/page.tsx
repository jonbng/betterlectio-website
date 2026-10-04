import type { Metadata } from "next"
import Link from "next/link"

import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import {
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
  sitePageClass,
} from "@/components/site/styles"
import { getAllSchoolsForSeo } from "@/lib/schools"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Skoler med BetterLectio",
  description:
    "Find din skole og se, hvordan BetterLectio gør Lectio hurtigere og nemmere at bruge.",
  alternates: { canonical: "/skoler" },
  openGraph: {
    title: "Skoler med BetterLectio",
    description:
      "Find din skole og se, hvordan BetterLectio gør Lectio hurtigere og nemmere at bruge.",
    url: "/skoler",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skoler med BetterLectio",
    description:
      "Find din skole og se, hvordan BetterLectio gør Lectio hurtigere og nemmere at bruge.",
    images: ["/twitter-image"],
  },
}

export default async function SchoolsPage() {
  const schools = (await getAllSchoolsForSeo()).toSorted((a, b) =>
    a.displayName.localeCompare(b.displayName, "da")
  )

  return (
    <div className="site">
      <SiteNav />

      <main className={cn(siteMainClass, siteContainerClass, sitePageClass)}>
        <div className="mx-auto max-w-[1000px]">
          <header className="mx-auto max-w-[720px] text-center">
            <span className={siteEyebrow()}>Find din skole</span>
            <h1 className="mt-4 text-[clamp(40px,6vw,72px)] leading-none font-extrabold tracking-[-0.045em]">
              BetterLectio på din skole
            </h1>
            <p className="mx-auto mt-5 max-w-[58ch] text-lg leading-[1.55] text-ink-muted">
              BetterLectio virker på alle skoler, der bruger Lectio. Vælg din
              skole for at læse mere og komme i gang.
            </p>
          </header>

          <ul className="mt-12 grid list-none gap-2 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
            {schools.map((school) => (
              <li key={school.id}>
                <Link
                  href={`/skoler/${school.slug}`}
                  className="flex min-h-14 items-center rounded-2xl border border-line bg-white px-5 py-3 font-semibold text-ink no-underline transition-colors hover:bg-grey"
                >
                  {school.displayName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
