import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Monitor,
} from "@/components/site/icons"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import {
  siteButton,
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
} from "@/components/site/styles"
import { JsonLd } from "@/components/site/structured-data"
import { getPublicStats } from "@/lib/public-stats"
import { cn } from "@/lib/utils"

const PAGE_URL = "https://betterlectio.dk/betterlectio-vs-lectio-plus"
const LAST_REVIEWED_ISO = "2026-10-04"
const LAST_REVIEWED = "4. oktober 2026"

const SOURCES = {
  lectioPlusIos: "https://apps.apple.com/dk/app/lectio/id836215784",
  lectioPlusAndroid:
    "https://play.google.com/store/apps/details?id=com.totus_labs.lectio",
  betterlectioGithub: "https://github.com/jonbng/betterlectio",
  betterlectioAndroidGithub: "https://github.com/jonbng/betterlectio-android",
  betterlectioPrivacy: "https://betterlectio.dk/privatliv",
  betterlectioStats: "https://betterlectio.dk/stats",
  betterlectioDownload: "https://betterlectio.dk/download",
} as const

export const metadata: Metadata = {
  title: "BetterLectio vs. Lectio+: Hvilken app er bedst i 2026?",
  description:
    "Sammenlign BetterLectio og Lectio+ på pris, funktioner, Android, iPhone, browser, privatliv og open source.",
  alternates: { canonical: "/betterlectio-vs-lectio-plus" },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "BetterLectio vs. Lectio+",
    description:
      "En ærlig sammenligning af pris, platforme, funktioner og de vigtigste forskelle.",
    publishedTime: LAST_REVIEWED_ISO,
    modifiedTime: LAST_REVIEWED_ISO,
  },
  twitter: {
    card: "summary_large_image",
    title: "BetterLectio vs. Lectio+",
    description:
      "Hvilken Lectio-app passer bedst til dig? Se den dokumenterede sammenligning.",
  },
}

type SourceLink = {
  label: string
  href: string
}

type ComparisonRow = {
  label: string
  betterlectio: React.ReactNode
  lectioPlus: React.ReactNode
  sources: SourceLink[]
}

const comparisonRows: ComparisonRow[] = [
  {
    label: "Pris for elever",
    betterlectio: (
      <>
        <strong>0 kr.</strong>
        <span>Ingen abonnement eller køb i appen.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>12 kr./md. eller 99 kr./år</strong>
        <span>App Store viser også et medlemskab til 249 kr.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio download", href: SOURCES.betterlectioDownload },
      { label: "Lectio+ i App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Mobil",
    betterlectio: (
      <>
        <strong>iPhone, iPad og Android</strong>
        <span>Separate apps til iOS og Android.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>iPhone, iPad og Android</strong>
        <span>Separate apps til iOS og Android.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio platforme", href: SOURCES.betterlectioDownload },
      { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
      { label: "Lectio+ Google Play", href: SOURCES.lectioPlusAndroid },
    ],
  },
  {
    label: "På computeren",
    betterlectio: (
      <>
        <strong>Chrome, Firefox og Edge</strong>
        <span>Forbedrer Lectio direkte i browseren.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Ingen browser-udvidelse</strong>
        <span>Lectio+ markedsføres som en mobilapp.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio platforme", href: SOURCES.betterlectioDownload },
      { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Farver i skemaet",
    betterlectio: (
      <>
        <strong>Farver, du selv kan vælge</strong>
        <span>Hvert fag kan få sin egen farve og synkroniseres.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Lectios velkendte farvekoder</strong>
        <span>Farverne gør skemaet lettere at afkode.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio kildekode", href: SOURCES.betterlectioGithub },
      { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Kildekode",
    betterlectio: (
      <>
        <strong>Open source</strong>
        <span>Koden kan læses, efterprøves og forbedres af andre.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Closed source</strong>
        <span>Kildekoden er ikke offentligt tilgængelig.</span>
      </>
    ),
    sources: [
      { label: "Browser på GitHub", href: SOURCES.betterlectioGithub },
      { label: "Android på GitHub", href: SOURCES.betterlectioAndroidGithub },
      { label: "Lectio+ i App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Annoncer",
    betterlectio: (
      <>
        <strong>Ingen annoncer</strong>
        <span>BetterLectio lover at forblive reklamefri.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Ingen annoncer</strong>
        <span>Lectio+ lover også at forblive reklamefri.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio privatliv", href: SOURCES.betterlectioPrivacy },
      { label: "Lectio+ i App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Privatliv på enheden",
    betterlectio: (
      <>
        <strong>Password sendes ikke til BetterLectio</strong>
        <span>Privatlivssiden beskriver undtagelser og databehandling.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Profiloplysninger gemmes krypteret</strong>
        <span>Det oplyser Lectio+ i sin App Store-beskrivelse.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio privatliv", href: SOURCES.betterlectioPrivacy },
      { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
    ],
  },
  {
    label: "Elever og lærere",
    betterlectio: (
      <>
        <strong>Bygget til elever</strong>
        <span>Fokus på den daglige elevoplevelse.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Elever og lærere</strong>
        <span>Har funktioner målrettet begge brugergrupper.</span>
      </>
    ),
    sources: [{ label: "Lectio+ App Store", href: SOURCES.lectioPlusIos }],
  },
  {
    label: "Ældre iPhones",
    betterlectio: (
      <>
        <strong>Kræver iOS 18.5</strong>
        <span>Bedst på nyere Apple-enheder.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Kræver iOS 16.7</strong>
        <span>Understøtter flere ældre iPhones.</span>
      </>
    ),
    sources: [
      { label: "BetterLectio i App Store", href: "https://apps.apple.com/dk/app/betterlectio/id6761808963" },
      { label: "Lectio+ i App Store", href: SOURCES.lectioPlusIos },
    ],
  },
]

const faqs = [
  {
    question: "Er BetterLectio virkelig helt gratis?",
    answer:
      "Ja. BetterLectio koster 0 kr. og har hverken abonnement, køb i appen eller annoncer. BetterLectio er samtidig open source.",
  },
  {
    question: "Er Lectio+ gratis?",
    answer:
      "Lectio+ kan hentes gratis, men App Store viser køb i appen på 12 kr. om måneden, 99 kr. om året eller et medlemskab til 249 kr. Priser kan ændre sig, så kontrollér altid den aktuelle butiksside.",
  },
  {
    question: "Hvilken app er bedst på Android?",
    answer:
      "Den 4. oktober 2026 havde BetterLectio 5,0 stjerner fra 5 anmeldelser på Google Play, mens Lectio+ havde 1,5 stjerner fra 259 anmeldelser. BetterLectios stikprøve er meget mindre, men den aktuelle forskel i brugertilfredshed er markant.",
  },
  {
    question: "Er BetterLectio og Lectio+ en erstatning for Lectio?",
    answer:
      "Nej. Begge produkter giver dig en anden brugerflade til oplysningerne i Lectio. Din skole fortsætter med at bruge Lectio som det underliggende system.",
  },
]

function comparisonJsonLd() {
  const organizationId = "https://betterlectio.dk/#organization"
  const websiteId = "https://betterlectio.dk/#website"
  const webpageId = `${PAGE_URL}#webpage`
  const articleId = `${PAGE_URL}#article`
  const breadcrumbId = `${PAGE_URL}#breadcrumb`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "BetterLectio",
        url: "https://betterlectio.dk",
        logo: {
          "@type": "ImageObject",
          url: "https://betterlectio.dk/icon.png",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: "https://betterlectio.dk",
        name: "BetterLectio",
        inLanguage: "da-DK",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: PAGE_URL,
        name: "BetterLectio vs. Lectio+: Hvilken app er bedst i 2026?",
        description:
          "Sammenlign BetterLectio og Lectio+ på pris, funktioner, Android, iPhone, browser, privatliv og open source.",
        inLanguage: "da-DK",
        isPartOf: { "@id": websiteId },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": articleId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${PAGE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "Article",
        "@id": articleId,
        url: PAGE_URL,
        headline: "BetterLectio vs. Lectio+: Hvilken app er bedst i 2026?",
        description:
          "En dokumenteret sammenligning af BetterLectio og Lectio+ på pris, platforme, funktioner og målgruppe.",
        datePublished: LAST_REVIEWED_ISO,
        dateModified: LAST_REVIEWED_ISO,
        inLanguage: "da-DK",
        articleSection: "Produktsammenligning",
        mainEntityOfPage: { "@id": webpageId },
        image: `${PAGE_URL}/opengraph-image`,
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        about: [
          {
            "@type": "SoftwareApplication",
            "@id": "https://betterlectio.dk/#app",
            name: "BetterLectio",
            url: "https://betterlectio.dk",
            applicationCategory: "EducationalApplication",
            operatingSystem: "iOS, Android, Chrome, Firefox, Edge",
          },
          {
            "@type": "SoftwareApplication",
            "@id": `${PAGE_URL}#lectio-plus`,
            name: "Lectio+",
            applicationCategory: "EducationalApplication",
            operatingSystem: "iOS, Android",
            sameAs: [SOURCES.lectioPlusIos, SOURCES.lectioPlusAndroid],
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "BetterLectio",
            item: "https://betterlectio.dk",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "BetterLectio vs. Lectio+",
            item: PAGE_URL,
          },
        ],
      },
    ],
  }
}

function SourceAnchor({ source }: { source: SourceLink }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-8 items-center gap-1 rounded-full bg-grey px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.02em] text-ink-muted no-underline transition-colors duration-150 hover:text-ink focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {source.label}
      <ArrowUpRight className="size-3" />
    </a>
  )
}

export default async function ComparisonPage() {
  const stats = await getPublicStats()
  const number = new Intl.NumberFormat("da-DK")

  return (
    <div className="site">
      <JsonLd data={comparisonJsonLd()} />
      <div className="site-diagonal" aria-hidden="true" />
      <SiteNav />

      <main className={siteMainClass}>
        <section
          className={cn(
            siteContainerClass,
            "pt-10 pb-14 min-[720px]:pt-16 min-[720px]:pb-20",
          )}
        >
          <div className="max-w-[900px]">
            <span className={siteEyebrow()}>
              Produktsammenligning · opdateret {LAST_REVIEWED}
            </span>
            <h1 className="mt-5 text-[clamp(46px,7vw,84px)] leading-[0.94] font-extrabold tracking-[-0.055em] text-balance">
              BetterLectio <span className="text-ink-muted">vs. Lectio+</span>
            </h1>
            <p className="mt-6 max-w-[720px] text-[clamp(19px,2.2vw,24px)] leading-[1.5] font-medium text-pretty text-ink-muted">
              Begge gør Lectio nemmere på mobilen. Den praktiske forskel er, at
              BetterLectio er gratis og også forbedrer Lectio på computeren,
              mens Lectio+ har længere historik og bredere støtte til lærere.
            </p>
            <p className="mt-5 text-sm text-ink-muted">
              Skrevet af BetterLectio · 9 sammenligningspunkter · kilder ved
              hvert punkt
            </p>
          </div>

          <div className="mt-10 grid overflow-hidden rounded-[24px] border border-line bg-white min-[760px]:grid-cols-[0.58fr_1fr_1fr]">
            <div className="bg-grey px-6 py-7 min-[760px]:px-7">
              <span className={siteEyebrow()}>Kort konklusion</span>
              <p className="mt-3 text-sm leading-[1.6] text-pretty text-ink-muted">
                Der er ikke én vinder for alle. Valget afhænger især af enhed,
                rolle og pris.
              </p>
            </div>
            <div className="border-t border-line px-6 py-7 min-[760px]:border-t-0 min-[760px]:border-l min-[760px]:px-7">
              <p className="font-mono text-[11px] font-bold tracking-[0.05em] uppercase">
                Vælg BetterLectio
              </p>
              <p className="mt-3 text-[16px] leading-[1.6] text-pretty text-ink-muted">
                Hvis du er elev og vil have en gratis løsning på både mobil og
                computer med farver, der følger dine enheder.
              </p>
            </div>
            <div className="border-t border-line px-6 py-7 min-[760px]:border-t-0 min-[760px]:border-l min-[760px]:px-7">
              <p className="font-mono text-[11px] font-bold tracking-[0.05em] uppercase">
                Vælg Lectio+
              </p>
              <p className="mt-3 text-[16px] leading-[1.6] text-pretty text-ink-muted">
                Hvis du er lærer, har en ældre iPhone eller foretrækker den app
                med længst historik og flest iOS-anmeldelser.
              </p>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "pb-8 min-[720px]:pb-12")}>
          <div className="flex flex-col gap-3 border-y border-line py-5 text-sm leading-[1.6] text-ink-muted min-[760px]:flex-row min-[760px]:items-start min-[760px]:justify-between min-[760px]:gap-10">
            <p className="max-w-[68ch] text-pretty">
              <strong className="text-ink">Om sammenligningen:</strong> Vi er
              afsenderen bag BetterLectio og dermed ikke neutrale. Oplysninger om
              Lectio+ kommer fra deres aktuelle App Store- og Google Play-lister;
              vi har ikke haft adgang til deres betalte brugeroplevelse.
            </p>
            <Link
              href="#metode"
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink"
            >
              Metode og kilder <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section
          className={cn(siteContainerClass, "scroll-mt-8 py-12 min-[720px]:py-20")}
          id="sammenligning"
        >
          <div className="max-w-[720px]">
            <span className={siteEyebrow()}>Overblik</span>
            <h2 className="mt-3 text-[clamp(34px,4.8vw,58px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
              Sammenlignet på det, der ændrer hverdagen.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.65] text-pretty text-ink-muted">
              Begge dækker de grundlæggende Lectio-opgaver. Derfor fokuserer vi
              på forskellene frem for at gøre fælles funktioner til kunstige
              sejre.
            </p>
          </div>

          <div className="mt-9 overflow-hidden rounded-[24px] border border-line bg-white min-[720px]:mt-12">
            <div className="hidden grid-cols-[0.58fr_1fr_1fr] border-b border-line bg-grey px-6 py-4 font-mono text-[11px] font-bold tracking-[0.06em] text-ink-muted uppercase min-[760px]:grid min-[900px]:px-8">
              <span>Sammenligningspunkt</span>
              <span>BetterLectio</span>
              <span>Lectio+</span>
            </div>

            {comparisonRows.map((row) => (
              <article
                key={row.label}
                className="grid border-b border-line last:border-b-0 min-[760px]:grid-cols-[0.58fr_1fr_1fr]"
              >
                <div className="bg-grey/70 px-5 py-5 min-[760px]:bg-white min-[760px]:px-6 min-[760px]:py-7 min-[900px]:px-8">
                  <h3 className="text-[17px] font-extrabold tracking-[-0.015em]">
                    {row.label}
                  </h3>
                  <div className="mt-3 hidden flex-wrap gap-1.5 min-[760px]:flex">
                    {row.sources.map((source) => (
                      <SourceAnchor key={source.href + source.label} source={source} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col px-5 py-5 min-[760px]:border-l min-[760px]:border-line min-[760px]:px-6 min-[760px]:py-7 min-[900px]:px-8">
                  <span className="mb-2 font-mono text-[10px] font-bold tracking-[0.06em] text-ink-muted uppercase min-[760px]:hidden">
                    BetterLectio
                  </span>
                  <div className="flex flex-col gap-1.5 text-[15px] leading-[1.5] text-ink-muted [&_strong]:font-bold [&_strong]:text-ink">
                    {row.betterlectio}
                  </div>
                </div>

                <div className="flex flex-col border-t border-line px-5 py-5 min-[760px]:border-t-0 min-[760px]:border-l min-[760px]:px-6 min-[760px]:py-7 min-[900px]:px-8">
                  <span className="mb-2 font-mono text-[10px] font-bold tracking-[0.06em] text-ink-muted uppercase min-[760px]:hidden">
                    Lectio+
                  </span>
                  <div className="flex flex-col gap-1.5 text-[15px] leading-[1.5] text-ink-muted [&_strong]:font-bold [&_strong]:text-ink">
                    {row.lectioPlus}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5 min-[760px]:hidden">
                    {row.sources.map((source) => (
                      <SourceAnchor key={source.href + source.label} source={source} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 px-1 text-xs leading-relaxed text-pretty text-ink-muted">
            Priser, kompatibilitet og butiksvurderinger kan ændre sig. Alle
            oplysninger er senest kontrolleret {LAST_REVIEWED}.
          </p>
        </section>

        <section className={cn(siteContainerClass, "py-12 min-[720px]:py-20")}>
          <div className="max-w-[720px]">
            <span className={siteEyebrow()}>Det afgørende</span>
            <h2 className="mt-3 text-[clamp(34px,4.8vw,58px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
              Hvorfor vi ender med at anbefale BetterLectio til elever.
            </h2>
          </div>

          <div className="mt-10 border-t border-line">
            <DecisionPoint number="01" title="Prisen er reelt forskellig.">
              <p>
                BetterLectio koster 0 kr. uden abonnement eller køb i appen.
                Lectio+ kan installeres gratis, men App Store viser 12 kr. om
                måneden, 99 kr. om året og et medlemskab til 249 kr. For en elev,
                der blot vil have et bedre Lectio, er det en mærkbar forskel.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line">
                <PriceFact product="BetterLectio" price="0 kr." detail="uden køb i appen" />
                <PriceFact product="Lectio+" price="99 kr./år" detail="eller andre køb i appen" />
              </div>
            </DecisionPoint>

            <DecisionPoint number="02" title="BetterLectio fortsætter på computeren.">
              <p>
                Lectio+ er en mobilapp. BetterLectio har både mobilapps og en
                browser-udvidelse, som ændrer den Lectio-side, du allerede bruger
                i Chrome, Firefox eller Edge. Det betyder én sammenhængende
                oplevelse i stedet for kun et alternativ på telefonen.
              </p>
              <figure className="mt-7 rounded-[24px] bg-grey p-4 min-[720px]:p-6">
                <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-bold">
                    <Monitor className="size-5" /> Faktisk produktskærmbillede
                  </span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                    Chrome · Firefox · Edge
                  </span>
                </figcaption>
                <Image
                  src="/shots/web-skema.png"
                  alt="BetterLectios farvekodede ugeskema i en browser"
                  width={2560}
                  height={1600}
                  sizes="(max-width: 900px) 90vw, 720px"
                  className="block h-auto w-full rounded-[14px] outline -outline-offset-1 outline-black/10"
                />
              </figure>
            </DecisionPoint>

            <DecisionPoint number="03" title="Tilpasningen følger med.">
              <p>
                Begge apps bruger farver i skemaet. I BetterLectio vælger du selv
                farven for hvert fag, og fagfarver, indstillinger og færdige
                lektier kan synkroniseres mellem app og browser. Det er en lille
                detalje, men en man bruger hver dag.
              </p>
              <div className="mt-6 grid gap-3 min-[560px]:grid-cols-2">
                {[
                  ["Matematik", "oklch(0.68 0.14 258)"],
                  ["Dansk", "oklch(0.7 0.14 145)"],
                  ["Engelsk", "oklch(0.72 0.13 28)"],
                  ["Historie", "oklch(0.7 0.13 80)"],
                ].map(([subject, color]) => (
                  <div key={subject} className="flex items-center gap-3 rounded-xl bg-grey px-4 py-3 text-sm font-semibold">
                    <span className="size-3 rounded-full shadow-[0_0_0_1px_oklch(0_0_0/0.08)]" style={{ backgroundColor: color }} aria-hidden="true" />
                    {subject}
                  </div>
                ))}
              </div>
            </DecisionPoint>

            <DecisionPoint number="04" title="Åbenhed kan efterprøves.">
              <p>
                BetterLectios mobilapps er udviklet separat til deres platforme:
                SwiftUI på iOS og Kotlin med Jetpack Compose på Android.
                BetterLectio er open source, så koden kan læses og efterprøves
                af andre. Lectio+ er closed source og udgives af Totus Labs ApS.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <SourceAnchor source={{ label: "Browserens kildekode", href: SOURCES.betterlectioGithub }} />
                <SourceAnchor source={{ label: "Androids kildekode", href: SOURCES.betterlectioAndroidGithub }} />
              </div>
            </DecisionPoint>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-12 min-[720px]:py-20")}>
          <div className="grid gap-8 min-[900px]:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className={siteEyebrow()}>Et vigtigt forbehold</span>
              <h2 className="mt-3 text-[clamp(34px,4.8vw,58px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
                Anmeldelserne peger ikke samme vej.
              </h2>
              <p className="mt-5 max-w-[43ch] text-[16px] leading-[1.65] text-pretty text-ink-muted">
                BetterLectio har høje karakterer, men meget få anmeldelser.
                Lectio+ har langt stærkere dokumentation på iPhone og en markant
                lavere vurdering på Android.
              </p>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-line bg-white">
              <div className="grid min-[580px]:grid-cols-2">
                <article className="p-6 min-[720px]:p-8">
                  <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                    Google Play · Android
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-5">
                    <Rating product="BetterLectio" score="5,0" count="5" />
                    <Rating product="Lectio+" score="1,5" count="259" />
                  </div>
                </article>
                <article className="border-t border-line p-6 min-[580px]:border-t-0 min-[580px]:border-l min-[720px]:p-8">
                  <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                    App Store · iPhone
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-5">
                    <Rating product="BetterLectio" score="5,0" count="1" />
                    <Rating product="Lectio+" score="4,4" count="11.617" />
                  </div>
                </article>
              </div>
              <p className="border-t border-line bg-grey px-6 py-4 text-xs leading-relaxed text-pretty text-ink-muted min-[720px]:px-8">
                Butikstal kontrolleret {LAST_REVIEWED}. De kan ændre sig, og
                BetterLectios stikprøver er for små til sikre konklusioner.
              </p>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-12 min-[720px]:py-20")}>
          <div className="max-w-[700px]">
            <span className={siteEyebrow()}>Fordele og ulemper</span>
            <h2 className="mt-3 text-[clamp(34px,4.8vw,58px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
              Det ærlige valg mellem dem.
            </h2>
          </div>
          <div className="mt-9 grid overflow-hidden rounded-[24px] border border-line bg-line min-[800px]:grid-cols-2">
            <ProductDecision
              name="BetterLectio"
              summary="Bedst egnet til elever, der vil have mobil og browser uden at betale."
              strengths={[
                "Gratis uden abonnement eller køb i appen",
                "Mobilapps plus Chrome, Firefox og Edge",
                "Egne fagfarver og synkronisering på tværs",
                "Open source med offentligt tilgængelig kildekode",
              ]}
              limitations={[
                "Kræver iOS 18.5 på iPhone og iPad",
                "Nyt produkt med meget få butiksanmeldelser",
                "Primært udviklet til elever, ikke lærere eller skoleaftaler",
              ]}
              footer={`Lanceret i 2026 · ${number.format(stats.totalStudents)} registrerede elevprofiler på ${number.format(stats.totalSchools)} skoler`}
            />
            <ProductDecision
              name="Lectio+"
              summary="Bedst egnet til lærere, ældre iPhones og dem, der vægter lang iOS-historik."
              strengths={[
                "Mere end et årtis historik på iPhone",
                "Funktioner til både elever og lærere",
                "Understøtter iPhones tilbage til iOS 16.7",
                "4,4 stjerner fra 11.617 iOS-anmeldelser",
              ]}
              limitations={[
                "Kræver abonnement eller medlemskab efter download",
                "Ingen officiel browser-udvidelse fundet",
                "1,5 stjerner fra 259 Android-anmeldelser ved kontrollen",
              ]}
              footer="Udgivet af Totus Labs ApS · butikstal kontrolleret 4. oktober 2026"
            />
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-12 min-[720px]:py-20")}>
          <div className="mx-auto max-w-[780px] text-center">
            <span className={siteEyebrow()}>Spørgsmål og svar</span>
            <h2 className="mt-3 text-[clamp(34px,5vw,60px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
              Det, man normalt vil vide før et skift.
            </h2>
          </div>
          <div className="site-details mx-auto max-w-[840px]">
            {faqs.map((faq) => (
              <details key={faq.question} className="site-detail">
                <summary>{faq.question}</summary>
                <div className="site-detail__body">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className={cn(siteContainerClass, "scroll-mt-8 py-12 min-[720px]:py-20")}
          id="metode"
        >
          <div className="rounded-[30px] bg-grey p-7 min-[720px]:p-10 min-[900px]:p-12">
            <div className="grid gap-8 min-[900px]:grid-cols-[0.7fr_1.3fr]">
              <div>
                <span className={siteEyebrow()}>Sådan har vi sammenlignet</span>
                <h2 className="mt-3 text-[clamp(30px,4vw,46px)] leading-[1.03] font-extrabold tracking-[-0.04em] text-balance">
                  Partisk afsender. Dokumenterbare fakta.
                </h2>
              </div>
              <div className="text-[15px] leading-[1.7] text-pretty text-ink-muted">
                <p>
                  Denne side er skrevet og udgivet af BetterLectio. Det gør os
                  ikke neutrale. Vi har gennemgået BetterLectios egne produkter
                  og kildekode, men har ikke haft adgang til Lectio+ bag deres
                  betalingsadgang. Oplysninger om Lectio+ bygger derfor på deres
                  offentlige butikslister. Vi har udeladt påstande, vi ikke kunne
                  kontrollere, og markeret små anmeldelsesgrundlag. Alt er senest
                  kontrolleret{" "}
                  <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED}</time>.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
                    { label: "Lectio+ Google Play", href: SOURCES.lectioPlusAndroid },
                    { label: "BetterLectio statistik", href: SOURCES.betterlectioStats },
                    { label: "Browser-kildekode", href: SOURCES.betterlectioGithub },
                    { label: "Android-kildekode", href: SOURCES.betterlectioAndroidGithub },
                  ].map((source) => (
                    <SourceAnchor key={source.href} source={source} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "pt-10 pb-24 min-[720px]:pt-14 min-[720px]:pb-28")}>
          <div className="flex flex-col gap-6 rounded-[24px] bg-ink px-7 py-8 text-white min-[720px]:flex-row min-[720px]:items-center min-[720px]:justify-between min-[720px]:px-10 min-[720px]:py-9">
            <div>
              <span className={siteEyebrow("white")}>Prøv det selv</span>
              <h2 className="mt-2 text-[clamp(26px,3vw,38px)] leading-[1.05] font-extrabold tracking-[-0.035em] text-balance">
                BetterLectio koster 0 kr.
              </h2>
              <p className="mt-2 max-w-[58ch] text-sm leading-[1.6] text-pretty text-white/65">
                Du bruger stadig dit normale Lectio-login og kan altid gå tilbage.
              </p>
            </div>
            <Link href="/download" className={siteButton("secondary", "shrink-0")}>
              Hent BetterLectio gratis <ArrowRight />
            </Link>
          </div>
          <p className="mt-5 text-center text-xs text-ink-muted">
            BetterLectio er ikke tilknyttet Lectio+, Totus Labs ApS eller MaCom A/S.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function DecisionPoint({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="grid gap-5 border-b border-line py-9 last:border-b-0 min-[800px]:grid-cols-[0.62fr_1.38fr] min-[800px]:gap-12 min-[800px]:py-12">
      <div>
        <span className="font-mono text-xs font-bold text-ink-muted tabular-nums">
          {number}
        </span>
        <h3 className="mt-2 max-w-[16ch] text-[clamp(25px,3vw,36px)] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance">
          {title}
        </h3>
      </div>
      <div className="text-[16px] leading-[1.7] text-pretty text-ink-muted">
        {children}
      </div>
    </article>
  )
}

function PriceFact({
  product,
  price,
  detail,
}: {
  product: string
  price: string
  detail: string
}) {
  return (
    <div className="bg-grey p-5 min-[560px]:p-6">
      <p className="font-mono text-[10px] font-bold tracking-[0.05em] text-ink-muted uppercase">
        {product}
      </p>
      <p className="mt-2 text-[clamp(26px,3vw,38px)] leading-none font-extrabold tracking-[-0.04em] text-ink tabular-nums">
        {price}
      </p>
      <p className="mt-2 text-xs text-ink-muted">{detail}</p>
    </div>
  )
}

function ProductDecision({
  name,
  summary,
  strengths,
  limitations,
  footer,
}: {
  name: string
  summary: string
  strengths: string[]
  limitations: string[]
  footer: string
}) {
  return (
    <article className="bg-white p-6 min-[720px]:p-9">
      <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
        {name}
      </p>
      <h3 className="mt-3 max-w-[20ch] text-[clamp(24px,3vw,34px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance">
        {summary}
      </h3>

      <h4 className="mt-8 text-sm font-bold">Styrker</h4>
      <ul className="mt-3 grid gap-3 text-[15px] leading-[1.55] text-ink-muted">
        {strengths.map((item) => (
          <li key={item} className="flex gap-2.5 text-pretty">
            <Check className="mt-0.5 size-[18px] shrink-0 text-ink" />
            {item}
          </li>
        ))}
      </ul>

      <h4 className="mt-8 text-sm font-bold">Begrænsninger</h4>
      <ul className="mt-3 grid gap-3 text-[15px] leading-[1.55] text-ink-muted">
        {limitations.map((item) => (
          <li key={item} className="flex gap-2.5 text-pretty">
            <span className="shrink-0 text-ink-muted" aria-hidden="true">—</span>
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-8 border-t border-line pt-5 text-xs leading-[1.55] text-pretty text-ink-muted">
        {footer}
      </p>
    </article>
  )
}

function Rating({
  product,
  score,
  count,
}: {
  product: string
  score: string
  count: string
}) {
  return (
    <div>
      <p className="text-[13px] font-bold text-ink-muted">{product}</p>
      <p className="mt-2 text-[clamp(34px,4vw,50px)] leading-none font-extrabold tracking-[-0.045em] tabular-nums">
        {score}
      </p>
      <p className="mt-2 text-xs text-ink-muted tabular-nums">
        {count} {count === "1" ? "anmeldelse" : "anmeldelser"}
      </p>
    </div>
  )
}
