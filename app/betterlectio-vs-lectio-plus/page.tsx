import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GraduationCap,
  Monitor,
  Shield,
  Smartphone,
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
  better?: "betterlectio" | "lectio-plus" | "tie"
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
    better: "betterlectio",
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
    better: "tie",
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
    better: "betterlectio",
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
    better: "betterlectio",
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
        <span>Koden kan læses og efterprøves på GitHub.</span>
      </>
    ),
    lectioPlus: (
      <>
        <strong>Lukket kildekode</strong>
        <span>Udgives kommercielt af Totus Labs ApS.</span>
      </>
    ),
    better: "betterlectio",
    sources: [
      { label: "BetterLectio på GitHub", href: SOURCES.betterlectioGithub },
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
    better: "tie",
    sources: [
      { label: "BetterLectio privatliv", href: SOURCES.betterlectioPrivacy },
      { label: "Lectio+ i App Store", href: SOURCES.lectioPlusIos },
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
    better: "lectio-plus",
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
    better: "lectio-plus",
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
      "Ja. BetterLectio koster 0 kr. og har hverken abonnement, køb i appen eller annoncer. Kildekoden er samtidig offentligt tilgængelig.",
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

function VerdictMark({ winner }: { winner?: ComparisonRow["better"] }) {
  if (!winner) return null
  const text =
    winner === "tie"
      ? "Lige"
      : winner === "betterlectio"
        ? "Fordel BetterLectio"
        : "Fordel Lectio+"

  return (
    <span
      className={cn(
        "mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.03em] uppercase",
        winner === "betterlectio"
          ? "bg-ink text-white"
          : winner === "lectio-plus"
            ? "bg-brand-soft text-brand-deep"
            : "bg-grey text-ink-muted",
      )}
    >
      {text}
    </span>
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
            "grid gap-10 pt-9 pb-14 min-[720px]:pt-16 min-[720px]:pb-20 min-[980px]:grid-cols-[1.08fr_0.92fr] min-[980px]:items-end min-[980px]:gap-16",
          )}
        >
          <div>
            <span className={siteEyebrow()}>
              Ærlig sammenligning · kontrolleret {LAST_REVIEWED}
            </span>
            <h1 className="mt-5 max-w-[850px] text-[clamp(48px,7.8vw,102px)] leading-[0.92] font-extrabold tracking-[-0.06em] text-balance">
              BetterLectio <span className="text-ink-muted">vs. Lectio+</span>
            </h1>
            <p className="mt-7 max-w-[650px] text-[clamp(19px,2.3vw,25px)] leading-[1.45] font-medium text-pretty text-ink-muted">
              To moderne måder at bruge Lectio på. Den ene koster 0 kr. og
              følger dig fra telefonen ind i browseren. Den anden har været med
              siden 2014 og står stærkt på iPhone.
            </p>
          </div>

          <aside className="overflow-hidden rounded-[30px] bg-ink text-white shadow-[0_0_0_1px_oklch(0_0_0/0.05),0_24px_70px_-36px_oklch(0_0_0/0.7)]">
            <div className="p-7 min-[520px]:p-9">
              <span className={siteEyebrow("white")}>Det korte svar</span>
              <p className="mt-4 text-[clamp(24px,3vw,34px)] leading-[1.15] font-extrabold tracking-[-0.035em] text-balance">
                For elever, der vil have mobil og browser uden at betale, er
                BetterLectio det stærkeste valg.
              </p>
              <p className="mt-4 text-[16px] leading-[1.6] text-pretty text-white/68">
                Især hvis du vil have en gratis løsning på både mobil og
                computer. Lectio+ giver mere mening, hvis du er lærer, bruger en
                ældre iPhone eller vægter en lang iOS-historik højest.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/15">
              <div className="bg-white/[0.06] px-6 py-6">
                <p className="font-mono text-[10px] tracking-[0.08em] text-white/50 uppercase">
                  BetterLectio
                </p>
                <p className="mt-2 text-[clamp(34px,5vw,52px)] leading-none font-extrabold tracking-[-0.045em] tabular-nums">
                  0 kr.
                </p>
              </div>
              <div className="bg-white/[0.06] px-6 py-6">
                <p className="font-mono text-[10px] tracking-[0.08em] text-white/50 uppercase">
                  Lectio+
                </p>
                <p className="mt-2 text-[clamp(25px,3.8vw,40px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
                  99 kr./år
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}>
          <div className="grid gap-px overflow-hidden rounded-[24px] bg-line shadow-[0_0_0_1px_oklch(0_0_0/0.04),0_8px_28px_-22px_oklch(0_0_0/0.24)] min-[720px]:grid-cols-3">
            {[
              ["0 kr.", "altid gratis", "Ingen abonnement eller køb i appen"],
              ["5", "platforme", "iOS, Android, Chrome, Firefox og Edge"],
              ["100%", "open source", "Koden kan læses og efterprøves"],
            ].map(([value, label, body]) => (
              <div key={label} className="bg-white px-7 py-7 min-[720px]:py-8">
                <div className="flex items-baseline gap-2.5">
                  <strong className="text-[32px] leading-none font-extrabold tracking-[-0.035em] tabular-nums">
                    {value}
                  </strong>
                  <span className="font-mono text-[10px] font-bold tracking-[0.06em] text-ink-muted uppercase">
                    {label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-[1.5] text-pretty text-ink-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className={cn(siteContainerClass, "scroll-mt-8 py-16 min-[720px]:py-24")}
          id="sammenligning"
        >
          <div className="grid gap-6 min-[900px]:grid-cols-[0.72fr_1.28fr] min-[900px]:items-end">
            <div>
              <span className={siteEyebrow()}>Punkt for punkt</span>
              <h2 className="mt-3 text-[clamp(36px,5.3vw,66px)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
                Forskellene, der faktisk betyder noget.
              </h2>
            </div>
            <p className="max-w-[58ch] text-[17px] leading-[1.65] text-pretty text-ink-muted min-[900px]:justify-self-end">
              Begge apps viser skema, lektier, opgaver, beskeder, fravær og
              karakterer. Det afgørende er derfor ikke længden på en
              funktionsliste, men pris, platforme, åbenhed og hvem produktet er
              bygget til.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[28px] border border-line bg-white min-[720px]:mt-14">
            <div className="hidden grid-cols-[0.58fr_1fr_1fr] border-b border-line bg-grey px-6 py-4 font-mono text-[11px] font-bold tracking-[0.06em] text-ink-muted uppercase min-[760px]:grid min-[900px]:px-8">
              <span>Det vigtigste</span>
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
                  <VerdictMark winner={row.better} />
                  <div className="mt-3 hidden flex-wrap gap-1.5 min-[760px]:flex">
                    {row.sources.map((source) => (
                      <SourceAnchor key={source.href + source.label} source={source} />
                    ))}
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col px-5 py-5 min-[760px]:border-l min-[760px]:border-line min-[760px]:px-6 min-[760px]:py-7 min-[900px]:px-8",
                    row.better === "betterlectio" && "bg-grey/45",
                  )}
                >
                  <span className="mb-2 font-mono text-[10px] font-bold tracking-[0.06em] text-ink-muted uppercase min-[760px]:hidden">
                    BetterLectio
                  </span>
                  <div className="flex flex-col gap-1.5 text-[15px] leading-[1.5] text-ink-muted [&_strong]:font-bold [&_strong]:text-ink">
                    {row.betterlectio}
                  </div>
                </div>

                <div
                  className={cn(
                    "flex flex-col border-t border-line px-5 py-5 min-[760px]:border-t-0 min-[760px]:border-l min-[760px]:px-6 min-[760px]:py-7 min-[900px]:px-8",
                    row.better === "lectio-plus" && "bg-brand-soft/45",
                  )}
                >
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

        <section className={cn(siteContainerClass, "pb-16 min-[720px]:pb-24")}>
          <div className="grid gap-5 min-[900px]:grid-cols-12">
            <article className="overflow-hidden rounded-[30px] bg-ink p-7 text-white min-[720px]:p-10 min-[900px]:col-span-7">
              <span className={siteEyebrow("white")}>Den største forskel</span>
              <p className="mt-5 text-[clamp(70px,11vw,132px)] leading-[0.8] font-extrabold tracking-[-0.065em] tabular-nums">
                0 kr.
              </p>
              <h2 className="mt-8 max-w-[13ch] text-[clamp(30px,4vw,48px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-balance">
                Gratis er ikke en prøveperiode.
              </h2>
              <p className="mt-5 max-w-[51ch] text-[17px] leading-[1.65] text-pretty text-white/68">
                Hele BetterLectio er gratis. Der er ingen betalingsmur efter
                installationen, ingen premium-funktioner og ingen årlig regning.
                Lectio+ kan hentes gratis, men abonnementer og medlemskab sælges
                gennem køb i appen.
              </p>
              <a
                href={SOURCES.lectioPlusIos}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:text-white hover:decoration-white"
              >
                Se priserne i App Store <ArrowUpRight className="size-4" />
              </a>
            </article>

            <article className="overflow-hidden rounded-[30px] border border-line bg-white p-7 min-[720px]:p-10 min-[900px]:col-span-5">
              <span className={siteEyebrow()}>Dit skema, dine farver</span>
              <h2 className="mt-4 max-w-[12ch] text-[clamp(29px,3.6vw,43px)] leading-[1.04] font-extrabold tracking-[-0.04em] text-balance">
                Se faget, før du læser det.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-pretty text-ink-muted">
                Begge apps bruger farver. I BetterLectio kan du selv give hvert
                fag en tydelig farve og lade valget følge med på tværs af dine
                enheder.
              </p>
              <div className="mt-8 grid gap-2.5" aria-label="Eksempel på fagfarver">
                {[
                  ["Matematik", "oklch(0.68 0.14 258)", "MA"],
                  ["Dansk", "oklch(0.7 0.14 145)", "DA"],
                  ["Engelsk", "oklch(0.72 0.13 28)", "EN"],
                  ["Historie", "oklch(0.7 0.13 80)", "HI"],
                ].map(([subject, color, code]) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-grey px-4 py-3"
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <span
                        className="size-3 rounded-full shadow-[0_0_0_1px_oklch(0_0_0/0.08)]"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      {subject}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink-muted">
                      {code}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
          <div className="mx-auto max-w-[720px] text-center">
            <span className={siteEyebrow()}>Én oplevelse, overalt</span>
            <h2 className="mt-3 text-[clamp(36px,5.4vw,66px)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
              Lectio+ bor på mobilen. BetterLectio følger med dig.
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-[17px] leading-[1.65] text-pretty text-ink-muted">
              Brug appen i bussen og den fulde browser-udvidelse ved computeren.
              Fagfarver, indstillinger og færdige lektier kan følge med mellem
              dine enheder.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-5 min-[860px]:grid-cols-[1.25fr_0.75fr] min-[860px]:gap-6">
            <figure className="overflow-hidden rounded-[30px] bg-grey p-5 min-[720px]:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <figcaption>
                  <span className="flex items-center gap-2 text-lg font-extrabold">
                    <Monitor className="size-5" /> I din browser
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">
                    Chrome · Firefox · Edge
                  </span>
                </figcaption>
                <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.04em] uppercase">
                  BetterLectio
                </span>
              </div>
              <Image
                src="/shots/web-skema.png"
                alt="BetterLectios farvekodede ugeskema i en browser"
                width={2560}
                height={1600}
                sizes="(max-width: 860px) 92vw, 700px"
                className="block h-auto w-full rounded-[18px] outline -outline-offset-1 outline-black/10"
              />
            </figure>

            <figure className="flex min-h-[520px] flex-col overflow-hidden rounded-[30px] bg-ink p-5 text-white min-[720px]:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <figcaption>
                  <span className="flex items-center gap-2 text-lg font-extrabold">
                    <Smartphone className="size-5" /> I din lomme
                  </span>
                  <span className="mt-1 block text-sm text-white/55">
                    iPhone · iPad · Android
                  </span>
                </figcaption>
              </div>
              <div className="flex flex-1 items-end justify-center overflow-hidden rounded-[20px] bg-white/[0.07] px-8 pt-8">
                <Image
                  src="/shots/mobile-skema.png"
                  alt="BetterLectios skema i mobilappen"
                  width={1179}
                  height={2556}
                  sizes="(max-width: 860px) 65vw, 300px"
                  className="block h-auto max-h-[500px] w-auto rounded-t-[26px] outline -outline-offset-1 outline-white/10"
                />
              </div>
            </figure>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
          <div className="grid gap-5 min-[900px]:grid-cols-2">
            <article className="rounded-[30px] bg-ink p-7 text-white min-[720px]:p-10">
              <div className="flex size-12 items-center justify-center rounded-[14px] bg-white/10">
                <GraduationCap className="size-6" />
              </div>
              <span className={cn(siteEyebrow("white"), "mt-8")}>
                Vælg BetterLectio, hvis
              </span>
              <h2 className="mt-3 text-[clamp(30px,4vw,48px)] leading-[1.03] font-extrabold tracking-[-0.045em] text-balance">
                du er elev og vil have mere for 0 kr.
              </h2>
              <ul className="mt-7 grid gap-4 text-[16px] leading-[1.55] text-white/72">
                {[
                  "du vil bruge samme moderne oplevelse på mobil og computer",
                  "du vil vælge og synkronisere farver for dine fag",
                  "du foretrækker open source og et offentligt roadmap",
                  "du bruger Android og vil prøve et nyere alternativ",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-pretty">
                    <Check className="mt-0.5 size-5 shrink-0 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[30px] border border-line bg-white p-7 min-[720px]:p-10">
              <div className="flex size-12 items-center justify-center rounded-[14px] bg-brand-soft text-brand-deep">
                <Shield className="size-6" />
              </div>
              <span className={cn(siteEyebrow(), "mt-8")}>
                Vælg Lectio+, hvis
              </span>
              <h2 className="mt-3 text-[clamp(30px,4vw,48px)] leading-[1.03] font-extrabold tracking-[-0.045em] text-balance">
                deres erfaring passer bedre til dit behov.
              </h2>
              <ul className="mt-7 grid gap-4 text-[16px] leading-[1.55] text-ink-muted">
                {[
                  "du er lærer og vil have funktioner målrettet lærerrollen",
                  "du har en iPhone, der ikke kan opdateres til iOS 18.5",
                  "du lægger mest vægt på mange års iOS-anmeldelser",
                  "du kun har brug for Lectio på mobilen",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-pretty">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand-deep" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
          <div className="overflow-hidden rounded-[32px] border border-line bg-white">
            <div className="grid min-[900px]:grid-cols-[1.08fr_0.92fr]">
              <div className="p-7 min-[720px]:p-12 min-[1000px]:p-14">
                <span className={siteEyebrow()}>Nyere, men ikke lille</span>
                <h2 className="mt-4 max-w-[13ch] text-[clamp(38px,5.4vw,68px)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
                  Vokset fra én elev til {number.format(stats.totalStudents)}.
                </h2>
                <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.65] text-pretty text-ink-muted">
                  BetterLectio begyndte i marts 2026 og bruges nu af elever på{" "}
                  {number.format(stats.totalSchools)} skoler. Tallene kommer fra
                  registrerede BetterLectio-profiler — ikke downloadestimater.
                </p>
                <Link
                  href="/stats"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold underline decoration-line decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-ink"
                >
                  Se alle tal og metoden <ArrowRight className="size-5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-px border-t border-line bg-line min-[900px]:border-t-0 min-[900px]:border-l">
                {[
                  [number.format(stats.totalStudents), "registrerede elevprofiler"],
                  [number.format(stats.totalSchools), "skoler med mindst én elev"],
                  [number.format(stats.totalFeedback), "idéer og fejlrapporter"],
                  [stats.isFallback ? "Marts 2026" : "Live", "offentligt opdaterede tal"],
                ].map(([value, label]) => (
                  <div key={label} className="flex min-h-40 flex-col justify-between bg-grey p-6 min-[720px]:min-h-48 min-[720px]:p-8">
                    <strong className="text-[clamp(30px,4vw,50px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
                      {value}
                    </strong>
                    <span className="mt-6 max-w-[16ch] text-sm leading-snug font-semibold text-ink-muted">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
          <div className="grid gap-8 min-[900px]:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className={siteEyebrow()}>Butiksvurderinger</span>
              <h2 className="mt-3 text-[clamp(34px,4.8vw,58px)] leading-[1] font-extrabold tracking-[-0.045em] text-balance">
                Android fortæller én historie. iPhone en anden.
              </h2>
              <p className="mt-5 max-w-[43ch] text-[16px] leading-[1.65] text-pretty text-ink-muted">
                Stjerner uden antal er misvisende. Derfor viser vi begge dele —
                også når Lectio+ står stærkest.
              </p>
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <article className="rounded-[26px] bg-grey p-6 min-[720px]:p-8">
                <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                  Google Play · Android
                </p>
                <div className="mt-7 grid grid-cols-2 gap-5">
                  <Rating product="BetterLectio" score="5,0" count="5" />
                  <Rating product="Lectio+" score="1,5" count="259" />
                </div>
                <p className="mt-7 text-xs leading-relaxed text-pretty text-ink-muted">
                  BetterLectios stikprøve er endnu meget lille. Tallene er et
                  øjebliksbillede fra Google Play den {LAST_REVIEWED}.
                </p>
              </article>
              <article className="rounded-[26px] border border-line bg-white p-6 min-[720px]:p-8">
                <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                  App Store · iPhone
                </p>
                <div className="mt-7 grid grid-cols-2 gap-5">
                  <Rating product="BetterLectio" score="5,0" count="1" />
                  <Rating product="Lectio+" score="4,4" count="11.617" />
                </div>
                <p className="mt-7 text-xs leading-relaxed text-pretty text-ink-muted">
                  Her har Lectio+ den klart stærkeste dokumentation: mere end et
                  årtis historik og langt flere bedømmelser.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "py-16 min-[720px]:py-24")}>
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
          className={cn(siteContainerClass, "scroll-mt-8 py-16 min-[720px]:py-24")}
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
                  ikke neutrale, og derfor linker vi direkte til kilden bag
                  priser, kompatibilitet og konkurrentoplysninger. Sammenligningen
                  bygger på offentlige produktsider og butikslister kontrolleret{" "}
                  <time dateTime={LAST_REVIEWED_ISO}>{LAST_REVIEWED}</time>.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { label: "Lectio+ App Store", href: SOURCES.lectioPlusIos },
                    { label: "Lectio+ Google Play", href: SOURCES.lectioPlusAndroid },
                    { label: "BetterLectio statistik", href: SOURCES.betterlectioStats },
                    { label: "BetterLectio kildekode", href: SOURCES.betterlectioGithub },
                  ].map((source) => (
                    <SourceAnchor key={source.href} source={source} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={cn(siteContainerClass, "pt-14 pb-24 text-center min-[720px]:pt-20 min-[720px]:pb-32")}>
          <span className={siteEyebrow()}>Prøv forskellen selv</span>
          <h2 className="mx-auto mt-3 max-w-[15ch] text-[clamp(40px,6.4vw,78px)] leading-[0.96] font-extrabold tracking-[-0.055em] text-balance">
            Den bedste sammenligning koster dig 0 kr.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[18px] leading-[1.6] text-pretty text-ink-muted">
            Installér BetterLectio på under et minut. Du bruger stadig dit
            normale Lectio-login og kan altid gå tilbage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/download" className={siteButton("primary")}>
              Hent BetterLectio gratis <ArrowRight />
            </Link>
            <Link href="#metode" className={siteButton("secondary")}>
              Se kilder og metode <ArrowRight />
            </Link>
          </div>
          <p className="mt-7 text-xs text-ink-muted">
            BetterLectio er ikke tilknyttet Lectio+, Totus Labs ApS eller MaCom A/S.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
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
