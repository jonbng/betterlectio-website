import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { PressCopyButton } from "@/components/site/press-copy-button"
import { ProtectedPressEmail } from "@/components/site/protected-press-email"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { ArrowRight, ArrowUpRight } from "@/components/site/icons"
import {
  siteButton,
  siteContainerClass,
  siteEyebrow,
  siteMainClass,
} from "@/components/site/styles"
import { getPublicStats } from "@/lib/public-stats"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Presse og medier",
  description:
    "Fakta, baggrund, billeder og pressekontakt for BetterLectio, en gratis, uafhængig brugerflade til Lectio, udviklet af Jonathan Bangert.",
  alternates: { canonical: "/presse" },
  openGraph: {
    title: "Presse og medier · BetterLectio",
    description: "Fakta, baggrund, billeder og pressekontakt for BetterLectio.",
    url: "/presse",
  },
}

const FOUNDER_WEBSITE = "https://jonathanbangert.com"

const LOGO_ASSETS = [
  {
    src: "/press/logos/betterlectio-app-icon.svg",
    alt: "BetterLectio-appikon med sort ugle på hvid afrundet firkant",
    title: "Appikon",
    detail: "Afrundet · lys baggrund",
    surface: "neutral" as const,
    downloads: [
      { href: "/press/logos/betterlectio-app-icon.svg", label: "SVG" },
      { href: "/press/logos/betterlectio-app-icon-1024.png", label: "PNG" },
    ],
  },
  {
    src: "/press/logos/betterlectio-mark-black.svg",
    alt: "Sort BetterLectio-ugle på transparent baggrund",
    title: "Sort mærke",
    detail: "Transparent · til lyse flader",
    surface: "neutral" as const,
    downloads: [
      { href: "/press/logos/betterlectio-mark-black.svg", label: "SVG" },
      { href: "/press/logos/betterlectio-mark-black-1024.png", label: "PNG" },
    ],
  },
  {
    src: "/press/logos/betterlectio-mark-white.svg",
    alt: "Hvid BetterLectio-ugle på mørk baggrund",
    title: "Hvidt mærke",
    detail: "Transparent · til mørke flader",
    surface: "dark" as const,
    downloads: [
      { href: "/press/logos/betterlectio-mark-white.svg", label: "SVG" },
      { href: "/press/logos/betterlectio-mark-white-1024.png", label: "PNG" },
    ],
  },
  {
    src: "/press/logos/betterlectio-mark-black-on-white.svg",
    alt: "Sort BetterLectio-ugle på fast hvid baggrund",
    title: "Mærke på hvid",
    detail: "Fast baggrund · kvadratisk",
    surface: "neutral" as const,
    downloads: [
      {
        href: "/press/logos/betterlectio-mark-black-on-white.svg",
        label: "SVG",
      },
      {
        href: "/press/logos/betterlectio-mark-black-on-white-1024.png",
        label: "PNG",
      },
    ],
  },
]

const EDITORIAL_ASSETS = [
  {
    src: "/press/editorial/editorial-overview-2400.png",
    alt: "BetterLectio på web og mobil med overskriften Skolen. Samlet.",
    title: "Skolen. Samlet.",
    detail: "PNG · 2400 × 1350 · redaktionelt hovedbillede",
    aspect: "editorial" as const,
  },
  {
    src: "/press/editorial/editorial-before-after-2400.png",
    alt: "Sammenligning af Lectio og BetterLectios skema",
    title: "Før og efter",
    detail: "PNG · 2400 × 1350 · sammenligning",
    aspect: "editorial" as const,
  },
  {
    src: "/press/editorial/editorial-dark-2400.png",
    alt: "BetterLectios mørke skema med overskriften Ro i skoledagen",
    title: "Ro i skoledagen",
    detail: "PNG · 2400 × 1350 · mørk version",
    aspect: "editorial" as const,
  },
  {
    src: "/press/editorial/editorial-everywhere-2400.png",
    alt: "BetterLectio vist på web og mobil med overskriften Ét sted. Hele dagen.",
    title: "På alle skærme",
    detail: "PNG · 2400 × 1350 · web og mobil",
    aspect: "editorial" as const,
  },
  {
    src: "/press/editorial/editorial-mobile-1600.png",
    alt: "To BetterLectio-mobilskærme i en lys redaktionel komposition",
    title: "Lectio. Bare bedre.",
    detail: "PNG · 1600 × 2000 · stående format",
    fit: "contain" as const,
    surface: "neutral" as const,
  },
  {
    src: "/press/editorial/editorial-square-2000.png",
    alt: "BetterLectios skema med overskriften Din skoledag. Uden støj.",
    title: "Din skoledag. Uden støj.",
    detail: "PNG · 2000 × 2000 · kvadratisk format",
    fit: "contain" as const,
    surface: "neutral" as const,
  },
] as const

const WEB_ASSETS = [
  ["schedule.png", "Skema", "Ugens undervisning og ændringer"],
  ["home.png", "Forside", "Dagens overblik og kommende aktiviteter"],
  ["assignments.png", "Opgaver", "Afleveringer, status og deadlines"],
  ["find-schedule.png", "Find skema", "Søgning efter elever og skemaer"],
] as const

const MOBILE_ASSETS = [
  [
    "01-lectio-bare-bedre.png",
    "Lectio. Bare bedre.",
    "Skema i BetterLectio til Android",
  ],
  ["02-messages.png", "Beskeder", "Beskeder og opgaveaflevering"],
  ["03-homework.png", "Lektier", "Lektier og undervisningsmateriale"],
  ["04-assignments.png", "Opgaver", "Deadlines og afleveringsstatus"],
  ["05-class.png", "Klassen", "Klasseprofil og skema"],
  ["06-absence.png", "Fravær", "Fraværsoversigt i mørk tilstand"],
] as const

const number = new Intl.NumberFormat("da-DK")

function formatDate(value: string) {
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  )
}

function Fact({
  value,
  label,
  note,
}: {
  value: string
  label: string
  note: string
}) {
  return (
    <article className="flex min-h-52 flex-col justify-between bg-white p-6 min-[720px]:p-8">
      <p className="text-[clamp(42px,6vw,72px)] leading-none font-extrabold tracking-[-0.055em] tabular-nums">
        {value}
      </p>
      <div className="mt-8">
        <h3 className="text-base font-extrabold text-ink">{label}</h3>
        <p className="mt-1 max-w-[29ch] text-sm leading-[1.45] text-pretty text-ink-muted">
          {note}
        </p>
      </div>
    </article>
  )
}

function AssetCard({
  src,
  alt,
  title,
  detail,
  fit = "cover",
  surface = "light",
  aspect = "landscape",
  downloads,
  className,
}: {
  src: string
  alt: string
  title: string
  detail: string
  fit?: "cover" | "contain"
  surface?: "light" | "dark" | "neutral"
  aspect?: "landscape" | "portrait" | "banner" | "wide" | "editorial" | "square"
  downloads?: Array<{ href: string; label: string }>
  className?: string
}) {
  const downloadOptions = downloads ?? [{ href: src, label: "PNG" }]

  return (
    <article
      className={cn(
        "group self-start overflow-hidden rounded-[26px] bg-white shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_1px_2px_-1px_oklch(0_0_0/0.06),0_2px_4px_oklch(0_0_0/0.04)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          aspect === "portrait"
            ? "aspect-[4/5]"
            : aspect === "square"
              ? "aspect-square"
              : aspect === "editorial"
                ? "aspect-video"
                : aspect === "banner"
                  ? "aspect-[1024/500]"
                  : aspect === "wide"
                    ? "aspect-[27/8]"
                    : "aspect-[16/10]",
          surface === "dark"
            ? "bg-ink"
            : surface === "neutral"
              ? "bg-grey"
              : "bg-white"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1080px) 33vw, (min-width: 700px) 50vw, 100vw"
          quality={95}
          className={cn(
            "outline -outline-offset-1 outline-black/10 transition-transform duration-300 ease-out motion-reduce:transition-none",
            fit === "cover"
              ? "object-cover object-top group-hover:scale-[1.015] motion-reduce:group-hover:scale-100"
              : "object-contain p-10"
          )}
        />
      </div>
      <div className="flex min-h-[84px] items-center justify-between gap-4 p-5">
        <div>
          <h3 className="font-extrabold tracking-[-0.015em]">{title}</h3>
          <p className="mt-0.5 font-mono text-[11px] tracking-[0.03em] text-ink-muted uppercase">
            {detail}
          </p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {downloadOptions.map((download) => (
            <a
              key={download.href}
              href={download.href}
              download
              aria-label={`Download ${title} som ${download.label}`}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink px-3 text-[11px] font-extrabold tracking-[0.04em] text-white uppercase transition-[transform,opacity] duration-150 ease-out hover:opacity-85 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {download.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

function CollectionHeader({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <div className="grid gap-3 min-[780px]:grid-cols-[0.7fr_1.3fr] min-[780px]:items-end">
      <div>
        <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
          {label}
        </p>
        <h3 className="mt-2 text-[clamp(26px,3.5vw,40px)] leading-none font-extrabold tracking-[-0.035em] text-balance">
          {title}
        </h3>
      </div>
      <p className="max-w-[64ch] text-sm leading-[1.55] text-pretty text-ink-muted min-[780px]:justify-self-end">
        {description}
      </p>
    </div>
  )
}

export default async function PressePage() {
  const stats = await getPublicStats()
  const students = number.format(stats.totalStudents)
  const schools = number.format(stats.totalSchools)
  const updated = formatDate(stats.updatedAt)
  const firstStudent = formatDate(stats.firstStudentAt)

  const shortDescription =
    "BetterLectio er en gratis og uafhængig brugerflade til Lectio, bygget af elever og ledet af gymnasieelev Jonathan Bangert. BetterLectio er ikke tilknyttet MaCom A/S."

  const fullDescription = `BetterLectio er en gratis og uafhængig brugerflade til Lectio, skabt og ledet af gymnasieelev Jonathan Bangert. Han begyndte projektet på Sorø Akademi for at skabe en mere overskuelig oplevelse af det system, han selv brugte hver dag. BetterLectio blev offentligt tilgængeligt i marts 2026 og findes i dag til iOS, Android, Chrome, Firefox og Edge. Elliott Friedrich har bidraget væsentligt til iOS-appen. ${students} elevprofiler fra ${schools} skoler er registreret i BetterLectio. Projektet har ingen omsætning og er ikke tilknyttet MaCom A/S.`

  const factsText = `BETTERLECTIO: FAKTA\n\n• ${students} elevprofiler registreret i BetterLectio\n• ${schools} skoler med mindst én registreret elevprofil\n• Første elevprofil registreret ${firstStudent}\n• Første offentlige udgivelse i marts 2026\n• Tilgængelig til iOS, Android, Chrome, Firefox og Edge\n• Gratis og uden annoncer\n• Skabt og ledet af Jonathan Bangert\n• Elliott Friedrich har bidraget væsentligt til iOS-appen\n• Ikke tilknyttet, godkendt eller drevet af MaCom A/S\n• Tal opdateret ${updated}\n\nKilde og metode: betterlectio.dk/stats`

  const pressJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://betterlectio.dk/#organization",
    name: "BetterLectio",
    url: "https://betterlectio.dk",
    logo: "https://betterlectio.dk/logo.png",
    description: shortDescription,
    foundingDate: "2025-12",
    founder: {
      "@type": "Person",
      name: "Jonathan Bangert",
      url: FOUNDER_WEBSITE,
      sameAs: [
        "https://github.com/jonbng",
        "https://linkedin.com/in/jonathan-bangert/",
        "https://x.com/jonbng",
      ],
    },
    sameAs: ["https://github.com/jonbng/betterlectio"],
  }

  return (
    <div className="site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pressJsonLd) }}
      />
      <div className="site-diagonal" aria-hidden="true" />
      <SiteNav />

      <main className={siteMainClass}>
        <section
          className={cn(
            siteContainerClass,
            "pt-8 pb-14 min-[720px]:pt-14 min-[720px]:pb-20"
          )}
        >
          <div className="grid items-end gap-10 min-[960px]:grid-cols-[1.3fr_0.7fr] min-[960px]:gap-16">
            <div>
              <span className={siteEyebrow()}>Presse</span>
              <h1 className="mt-4 max-w-[920px] text-[clamp(48px,7.7vw,100px)] leading-[0.94] font-extrabold tracking-[-0.06em] text-balance">
                BetterLectio er en uafhængig brugerflade til Lectio.
              </h1>
            </div>

            <div className="pb-1">
              <p className="max-w-[48ch] text-[clamp(18px,2vw,22px)] leading-[1.5] font-medium text-pretty text-ink-muted">
                Gratis, bygget af elever og ledet af gymnasieelev Jonathan
                Bangert. Her er fakta, baggrund, billeder og direkte kontakt.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ProtectedPressEmail />
                <a
                  href="#materialer"
                  className={siteButton(
                    "secondary",
                    "pr-5 pl-6 active:scale-[0.96]"
                  )}
                >
                  Hent billeder <DownloadIcon className="size-[18px]" />
                </a>
              </div>
            </div>
          </div>

          <nav
            aria-label="På denne side"
            className="mt-12 flex flex-wrap gap-x-7 gap-y-2 border-y border-line py-4 text-sm font-bold min-[720px]:mt-16"
          >
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#fakta"
            >
              Fakta
            </a>
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#historien"
            >
              Tidslinje
            </a>
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#beskrivelse"
            >
              Om BetterLectio
            </a>
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#materialer"
            >
              Materialer
            </a>
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#stifter"
            >
              Stifteren
            </a>
            <a
              className="min-h-11 content-center text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              href="#kontakt"
            >
              Kontakt
            </a>
          </nav>
        </section>

        <section
          id="fakta"
          className={cn(
            siteContainerClass,
            "scroll-mt-8 pb-16 min-[720px]:pb-24"
          )}
        >
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className={siteEyebrow()}>Dokumenterbare fakta</span>
              <h2 className="mt-3 text-[clamp(34px,5vw,60px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
                Nøgletal.
              </h2>
            </div>
            <PressCopyButton text={factsText} label="Kopiér alle fakta" />
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] bg-line shadow-[0_0_0_1px_oklch(0_0_0/0.05)] min-[1000px]:grid-cols-4 sm:grid-cols-2">
            <Fact
              value={students}
              label="registrerede elevprofiler"
              note="Profiler oprettet i BetterLectio, ikke et estimat eller et downloadtal."
            />
            <Fact
              value={schools}
              label="skoler med profiler"
              note="Skoler med mindst én registreret elevprofil i BetterLectio."
            />
            <Fact
              value={firstStudent.split(" ").slice(0, 2).join(" ")}
              label="første registrering"
              note={`Den første elevprofil blev registreret i ${firstStudent.split(" ").at(-1)}.`}
            />
            <Fact
              value="Gratis"
              label="og open source"
              note="Ingen annoncer, abonnementer eller skjulte gebyrer."
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-xs leading-relaxed text-ink-muted">
            <p className="font-mono tracking-[0.035em] uppercase">
              {stats.isFallback ? "Senest kendte, afrundede tal" : "Live data"}{" "}
              · Opdateret {updated}
            </p>
            <Link
              href="/stats"
              className="inline-flex min-h-11 items-center gap-2 font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink"
            >
              Se udvikling og metode <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section
          id="historien"
          className="scroll-mt-8 bg-ink py-16 text-white min-[720px]:py-24"
        >
          <div className={siteContainerClass}>
            <div className="grid gap-12 min-[960px]:grid-cols-[0.84fr_1.16fr] min-[960px]:gap-20">
              <div>
                <span className={siteEyebrow("white")}>Kort tidslinje</span>
                <h2 className="mt-3 text-[clamp(38px,5.5vw,68px)] leading-[0.98] font-extrabold tracking-[-0.05em] text-balance">
                  Fra første version til i dag.
                </h2>
                <p className="mt-6 max-w-[45ch] text-[18px] leading-[1.6] text-pretty text-white/68">
                  Jonathan Bangert begyndte på BetterLectio, fordi han var
                  frustreret over Lectios brugerflade. På Sorø Akademi så han
                  samtidig elever omkring sig betale for en anden app for at få
                  en bedre oplevelse på telefonen.
                </p>
                <p className="mt-4 max-w-[45ch] text-[15px] leading-[1.6] text-pretty text-white/52">
                  Det begyndte som et værktøj til ham selv. Venner bad om at få
                  adgang, og kort efter brugte en stor del af hans klasse det.
                </p>
              </div>

              <ol className="border-t border-white/15">
                {[
                  [
                    "December 2025",
                    "Bygget til eget brug",
                    "Jonathan begynder at bygge browserudvidelsen i sit første år på Sorø Akademi.",
                  ],
                  [
                    "Marts 2026",
                    "Første offentlige udgivelse",
                    "Browserudvidelsen bliver gjort offentligt tilgængelig.",
                  ],
                  [
                    "Sommer 2026",
                    "BetterLectio kommer på mobil",
                    "iOS- og Android-apps bliver lanceret. Elliott Friedrich bidrager væsentligt til iOS-appen.",
                  ],
                  [
                    updated,
                    `${students} elevprofiler`,
                    `Registrerede profiler fra ${schools} skoler. Jonathan leder fortsat projektet fra UWC Red Cross Nordic i Norge.`,
                  ],
                ].map(([date, title, body], index) => (
                  <li
                    key={title}
                    className="grid gap-3 border-b border-white/15 py-6 min-[620px]:grid-cols-[150px_1fr] min-[620px]:gap-7"
                  >
                    <div className="flex items-center gap-3 font-mono text-xs tracking-[0.04em] text-white/45 uppercase">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-ink tabular-nums">
                        {index + 1}
                      </span>
                      {date}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.02em]">
                        {title}
                      </h3>
                      <p className="mt-1.5 max-w-[48ch] leading-[1.5] text-pretty text-white/62">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section
          id="beskrivelse"
          className={cn(
            siteContainerClass,
            "scroll-mt-8 py-16 min-[720px]:py-24"
          )}
        >
          <div className="max-w-[760px]">
            <span className={siteEyebrow()}>Om BetterLectio</span>
            <h2 className="mt-3 text-[clamp(34px,5vw,60px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
              Hvad produktet er, og ikke er.
            </h2>
          </div>

          <div className="mt-9 grid overflow-hidden rounded-[28px] border border-line bg-line min-[900px]:grid-cols-2">
            <article className="bg-grey p-7 min-[720px]:p-10">
              <h3 className="text-xl font-extrabold tracking-[-0.02em]">
                Kort fortalt
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-pretty text-ink-muted">
                BetterLectio viser indhold fra Lectio i en anden brugerflade.
                Det findes som app til iOS og Android og som browserudvidelse
                til Chrome, Firefox og Edge.
              </p>
              <ul className="mt-6 space-y-2 text-[15px] font-semibold">
                <li>Gratis og uden annoncer</li>
                <li>Bygget af elever</li>
                <li>Installeres af den enkelte elev</li>
              </ul>
            </article>
            <article className="bg-white p-7 min-[720px]:p-10">
              <h3 className="text-xl font-extrabold tracking-[-0.02em]">
                Forholdet til Lectio
              </h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-pretty text-ink-muted">
                Skolerne fortsætter med at bruge Lectio som administrativt
                system. BetterLectio ændrer brugeroplevelsen, men bestemmer ikke
                skema, karakterer, fravær eller andre oplysninger i Lectio.
              </p>
              <p className="mt-5 border-l-2 border-ink pl-5 font-bold text-pretty">
                BetterLectio er ikke tilknyttet, godkendt eller drevet af MaCom
                A/S. Ingen skoler har officielt anbefalet eller frarådet
                projektet.
              </p>
            </article>
          </div>

          <div className="mt-14 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className={siteEyebrow()}>Tekst til omtale</span>
              <h3 className="mt-3 text-[clamp(28px,4vw,44px)] leading-none font-extrabold tracking-[-0.04em] text-balance">
                Klar til at kopiere.
              </h3>
            </div>
            <p className="max-w-[430px] text-sm leading-[1.55] text-pretty text-ink-muted">
              Teksterne må bruges direkte eller tilpasses. Bevar oplysningen om
              BetterLectios uafhængighed fra MaCom.
            </p>
          </div>

          <div className="mt-7 divide-y divide-line border-y border-line">
            {[
              ["Kort", shortDescription],
              ["Udvidet", fullDescription],
            ].map(([title, text]) => (
              <article
                key={title}
                className="grid gap-5 py-7 min-[900px]:grid-cols-[180px_1fr_auto] min-[900px]:items-start min-[900px]:gap-8"
              >
                <h4 className="font-extrabold">{title}</h4>
                <p className="max-w-[720px] text-[17px] leading-[1.6] text-pretty text-ink-muted">
                  {text}
                </p>
                <PressCopyButton text={text} />
              </article>
            ))}
          </div>
        </section>

        <section
          id="materialer"
          className={cn(
            siteContainerClass,
            "scroll-mt-8 py-16 min-[720px]:py-24"
          )}
        >
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className={siteEyebrow()}>Pressebilleder og logoer</span>
              <h2 className="mt-3 text-[clamp(34px,5vw,60px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
                Klar til redaktionel brug.
              </h2>
            </div>
            <p className="max-w-[430px] text-sm leading-[1.55] text-pretty text-ink-muted">
              Må bruges redaktionelt med krediteringen “BetterLectio”. Beskæring
              er tilladt; logoet må ikke ændres.
            </p>
          </div>

          <div className="mt-9 grid gap-6 rounded-[30px] bg-ink p-7 text-white min-[780px]:grid-cols-[1fr_auto] min-[780px]:items-center min-[780px]:p-10">
            <div>
              <p className="font-mono text-[11px] font-bold tracking-[0.06em] text-white/45 uppercase">
                40 filer · original opløsning
              </p>
              <h3 className="mt-2 text-[clamp(28px,4vw,44px)] leading-none font-extrabold tracking-[-0.04em] text-balance">
                Hent hele pressepakken.
              </h3>
              <p className="mt-4 max-w-[55ch] text-sm leading-[1.55] text-pretty text-white/60">
                Alle logoer, produktbilleder, stifterportrættet og en kort
                brugsvejledning samlet i én mappe. Enkeltsamlinger kan også
                hentes separat.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 min-[780px]:max-w-[330px] min-[780px]:justify-end">
              <a
                href="/press/betterlectio-complete-press-kit.zip"
                download
                className={siteButton(
                  "ghost",
                  "border-white/20 px-5 active:scale-[0.96]"
                )}
              >
                Hele pakken · 11,4 MB <DownloadIcon className="size-[18px]" />
              </a>
              <a
                href="/press/betterlectio-logos.zip"
                download
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold text-white/65 transition-colors duration-150 hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
              >
                Kun logoer · 140 KB
              </a>
              <a
                href="/press/betterlectio-product-images.zip"
                download
                className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold text-white/65 transition-colors duration-150 hover:text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
              >
                Kun billeder · 11,2 MB
              </a>
            </div>
          </div>

          <div className="mt-14">
            <CollectionHeader
              label="01 · Anbefalet"
              title="Tre billeder til de fleste artikler."
              description="Et hovedbillede, en direkte sammenligning og et stående mobilformat. Alle viser produktet med demodata."
            />
            <div className="mt-7 grid gap-5 min-[700px]:grid-cols-2 min-[1080px]:grid-cols-3">
              {[
                EDITORIAL_ASSETS[0],
                EDITORIAL_ASSETS[1],
                EDITORIAL_ASSETS[4],
              ].map((asset) => (
                <AssetCard key={asset.src} {...asset} />
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-line pt-14">
            <CollectionHeader
              label="02 · Logoer"
              title="Logoer til lyse og mørke flader."
              description="SVG anbefales til tryk og stor gengivelse. PNG-filerne er 1024 × 1024 px med transparent baggrund, hvor det er angivet."
            />
            <div className="mt-7 grid gap-5 min-[620px]:grid-cols-2 min-[1080px]:grid-cols-4">
              {LOGO_ASSETS.map((asset) => (
                <AssetCard key={asset.title} {...asset} fit="contain" />
              ))}
            </div>
          </div>

          <details className="group mt-12 border-t border-line pt-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              <div>
                <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                  03 · Flere pressebilleder · 3 filer
                </p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">
                  Flere formater
                </h3>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-grey text-2xl font-light transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none">
                +
              </span>
            </summary>
            <div className="grid gap-5 pt-4 pb-8 min-[700px]:grid-cols-2 min-[1080px]:grid-cols-3">
              {[
                EDITORIAL_ASSETS[2],
                EDITORIAL_ASSETS[3],
                EDITORIAL_ASSETS[5],
              ].map((asset) => (
                <AssetCard key={asset.src} {...asset} />
              ))}
            </div>
          </details>

          <details className="group border-t border-line pt-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              <div>
                <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                  04 · Browser · 11 filer
                </p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">
                  Hele browseroplevelsen
                </h3>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-grey text-2xl font-light transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none">
                +
              </span>
            </summary>
            <div className="pt-4 pb-8">
              <p className="mb-7 max-w-[66ch] text-sm leading-[1.55] text-pretty text-ink-muted">
                Fire rene 1280 × 800-skærmbilleder, de samme fire i en
                præsentationsklar ramme, et bredt browserpanorama og to
                versioner af browserbutikkens lille promobillede.
              </p>
              <div className="grid gap-5 min-[700px]:grid-cols-2 min-[1080px]:grid-cols-3">
                {WEB_ASSETS.map(([file, title, caption]) => (
                  <AssetCard
                    key={file}
                    src={`/press/product/web/${file}`}
                    alt={`${title} i BetterLectios browserudvidelse med demodata`}
                    title={`Web: ${title}`}
                    detail={`PNG · 1280 × 800 · ${caption}`}
                  />
                ))}
                {WEB_ASSETS.map(([file, title]) => {
                  const framedFile = file.replace(".png", "-framed.png")
                  return (
                    <AssetCard
                      key={framedFile}
                      src={`/press/product/web/${framedFile}`}
                      alt={`${title} i BetterLectios browserudvidelse, indrammet med demodata`}
                      title={`${title} · indrammet`}
                      detail="PNG · 1280 × 800 · klar til omtale"
                    />
                  )
                })}
                <AssetCard
                  src="/press/product/web/browser-panorama.png"
                  alt="Bred komposition af BetterLectios browseroplevelse"
                  title="Browserpanorama"
                  detail="PNG · 1400 × 560 · bred komposition"
                  aspect="wide"
                  className="min-[700px]:col-span-2 min-[1080px]:col-span-3"
                />
                <AssetCard
                  src="/press/product/web/promo-small-1024.png"
                  alt="BetterLectios lille promobillede til browserbutikker i høj opløsning"
                  title="Promo small · stor"
                  detail="PNG · 1024 × 500 · høj opløsning"
                  aspect="banner"
                />
                <AssetCard
                  src="/press/product/web/promo-small.png"
                  alt="BetterLectios lille promobillede til browserbutikker"
                  title="Promo small · original"
                  detail="PNG · 440 × 280 · browserformat"
                  aspect="landscape"
                />
              </div>
            </div>
          </details>

          <details className="group border-t border-line pt-2">
            <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              <div>
                <p className="font-mono text-[11px] font-bold tracking-[0.05em] text-ink-muted uppercase">
                  05 · Mobil · 7 filer
                </p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">
                  Kampagnebilleder til mobil
                </h3>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-grey text-2xl font-light transition-transform duration-200 ease-out group-open:rotate-45 motion-reduce:transition-none">
                +
              </span>
            </summary>
            <div className="pt-4 pb-8">
              <p className="mb-7 max-w-[66ch] text-sm leading-[1.55] text-pretty text-ink-muted">
                Seks færdige 1080 × 1920-kompositioner med skema, beskeder,
                lektier, opgaver, klasse og fravær samt et samlet panorama.
              </p>
              <div className="grid gap-5 min-[580px]:grid-cols-2 min-[900px]:grid-cols-3">
                {MOBILE_ASSETS.map(([file, title, caption]) => (
                  <AssetCard
                    key={file}
                    src={`/press/product/mobile/${file}`}
                    alt={`${title}: ${caption} med demodata`}
                    title={title}
                    detail={`PNG · 1080 × 1920 · ${caption}`}
                    aspect="portrait"
                    fit="contain"
                    surface="neutral"
                  />
                ))}
                <AssetCard
                  src="/press/product/mobile/android-panorama.png"
                  alt="Seks BetterLectio-mobilbilleder samlet i et panorama"
                  title="Android-panorama"
                  detail="PNG · 6480 × 1920 · komplet serie"
                  aspect="wide"
                  className="min-[580px]:col-span-2 min-[900px]:col-span-3"
                />
              </div>
            </div>
          </details>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
            <p className="max-w-[62ch] text-sm leading-[1.5] text-pretty text-ink-muted">
              Mangler du en særlig beskæring, video eller teknisk baggrund?
              Skriv til os, så hjælper vi med det originale materiale.
            </p>
            <ProtectedPressEmail tone="link" />
          </div>
        </section>

        <section
          id="stifter"
          className={cn(
            siteContainerClass,
            "scroll-mt-8 pb-16 min-[720px]:pb-24"
          )}
        >
          <div className="grid overflow-hidden rounded-[32px] bg-white shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_1px_2px_-1px_oklch(0_0_0/0.06),0_8px_28px_-18px_oklch(0_0_0/0.18)] min-[900px]:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[460px] overflow-hidden bg-grey min-[900px]:min-h-[640px]">
              <Image
                src="/press/founder/jonathan-bangert-portrait.jpeg"
                alt="Portræt af BetterLectios stifter Jonathan Bangert"
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                className="object-cover object-center outline -outline-offset-1 outline-black/10"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 bg-gradient-to-t from-black/72 via-black/28 to-transparent px-6 pt-24 pb-6 text-white min-[500px]:flex-row min-[500px]:items-end min-[500px]:justify-between min-[720px]:px-8 min-[720px]:pb-8">
                <div>
                  <p className="text-lg font-extrabold tracking-[-0.02em]">
                    Jonathan Bangert
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white/70">
                    Stifter og udvikler
                  </p>
                </div>
                <a
                  href="/press/founder/jonathan-bangert-portrait.jpeg"
                  download
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold text-ink transition-[transform,opacity] duration-150 ease-out hover:opacity-90 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  Hent portræt <DownloadIcon className="size-4" />
                </a>
              </div>
            </div>
            <div className="p-8 min-[720px]:p-12 min-[1000px]:p-14">
              <span className={siteEyebrow()}>Stifteren</span>
              <h2 className="mt-3 text-[clamp(32px,4.5vw,52px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
                Jonathan Bangert
              </h2>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-pretty text-ink-muted">
                Jonathan skabte BetterLectio i sit første år på Sorø Akademi.
                Han var frustreret over brugerfladen i et system, han selv
                skulle bruge flere gange om dagen, og begyndte derfor at bygge
                en browserudvidelse til sig selv. Da venner og siden en stor del
                af klassen tog den i brug, gjorde han projektet offentligt.
              </p>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-pretty text-ink-muted">
                I dag er han elev på UWC Red Cross Nordic i Norge og leder og
                vedligeholder fortsat BetterLectio. Tidligere byggede han og
                Elliott Friedrich skoleplatformen Akademia, som de præsenterede
                i <em>Løvens Hule Junior</em> på dansk tv.
              </p>
              <div className="mt-7 border-l-2 border-ink pl-5">
                <p className="font-extrabold">Bygget af elever</p>
                <p className="mt-1 max-w-[50ch] text-sm leading-[1.55] text-pretty text-ink-muted">
                  Jonathan startede og leder projektet. Elliott Friedrich har
                  bidraget væsentligt til udviklingen af iOS-appen.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ProtectedPressEmail />
                <a
                  href={FOUNDER_WEBSITE}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={siteButton(
                    "secondary",
                    "pr-5 pl-6 active:scale-[0.96]"
                  )}
                >
                  jonathanbangert.com <ArrowUpRight className="size-[18px]" />
                </a>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                Interview kan foregå på dansk eller engelsk. Se også projektets{" "}
                <a
                  href="https://github.com/jonbng/betterlectio"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink"
                >
                  offentlige kildekode
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="bg-grey py-16 min-[720px]:py-24">
          <div className={siteContainerClass}>
            <div className="grid gap-8 min-[900px]:grid-cols-[0.72fr_1.28fr] min-[900px]:gap-16">
              <div>
                <span className={siteEyebrow()}>Spørgsmål og svar</span>
                <h2 className="mt-3 text-[clamp(34px,5vw,58px)] leading-none font-extrabold tracking-[-0.045em] text-balance">
                  Ofte stillede spørgsmål.
                </h2>
              </div>

              <dl className="divide-y divide-line border-y border-line">
                {[
                  [
                    "Er BetterLectio en del af Lectio?",
                    "Nej. BetterLectio er et selvstændigt projekt og er ikke tilknyttet, godkendt eller drevet af MaCom A/S.",
                  ],
                  [
                    `Hvad betyder ${students} elevprofiler?`,
                    "Det er profiler registreret i BetterLectio. Tallet er ikke et downloadtal og siger ikke, hvor mange der er aktive på en bestemt dag.",
                  ],
                  [
                    `Betyder ${schools} skoler, at skolerne har valgt BetterLectio?`,
                    "Nej. En skole tælles med, når mindst én registreret elevprofil er knyttet til den. Det er ikke det samme som et samarbejde med eller en anbefaling fra skolen.",
                  ],
                  [
                    "Hvad koster BetterLectio?",
                    "BetterLectio er gratis, uden annoncer og uden abonnement. Kildekoden er offentlig på GitHub.",
                  ],
                  [
                    "Hvem står bag BetterLectio?",
                    "Jonathan Bangert skabte projektet og leder og vedligeholder det fortsat. Elliott Friedrich har bidraget væsentligt til iOS-appen.",
                  ],
                  [
                    "Hvordan er projektet finansieret?",
                    "BetterLectio har ingen omsætning og er selvfinansieret. Holdet har indtil videre brugt cirka 1.000 kr. på projektet.",
                  ],
                  [
                    "Hvor kommer navnet og logoet fra?",
                    "Navnet og logoet stammer fra et tidligere, uafhængigt projekt med samme navn, som ikke længere virkede efter en ændring i Lectio. Holdet bag det nuværende BetterLectio kontaktede den tidligere skaber og overtog navnet og logoet med vedkommendes tilladelse.",
                  ],
                ].map(([question, answer]) => (
                  <div
                    key={question}
                    className="grid gap-2 py-6 min-[720px]:grid-cols-[0.82fr_1.18fr] min-[720px]:gap-8"
                  >
                    <dt className="font-extrabold text-pretty">{question}</dt>
                    <dd className="leading-[1.55] text-pretty text-ink-muted">
                      {answer}
                    </dd>
                  </div>
                ))}
                <div className="grid gap-2 py-6 min-[720px]:grid-cols-[0.82fr_1.18fr] min-[720px]:gap-8">
                  <dt className="font-extrabold text-pretty">
                    Hvordan håndterer BetterLectio data?
                  </dt>
                  <dd className="leading-[1.55] text-pretty text-ink-muted">
                    Databehandlingen og de anvendte tjenester er beskrevet på{" "}
                    <Link
                      href="/privatliv"
                      className="font-bold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-ink"
                    >
                      privatlivssiden
                    </Link>
                    , og kildekoden kan gennemgås offentligt.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section
          id="kontakt"
          className="scroll-mt-8 bg-ink py-16 text-white min-[720px]:py-24"
        >
          <div className={cn(siteContainerClass, "text-center")}>
            <span className={siteEyebrow("white")}>Pressekontakt</span>
            <h2 className="mx-auto mt-3 max-w-[14ch] text-[clamp(38px,6vw,72px)] leading-[0.96] font-extrabold tracking-[-0.05em] text-balance">
              Kontakt Jonathan.
            </h2>
            <p className="mx-auto mt-6 max-w-[590px] text-[18px] leading-[1.55] text-pretty text-white/65">
              Skriv om interview, dokumentation, tekniske spørgsmål eller
              materiale i et andet format. Henvendelser kan være på dansk eller
              engelsk.
            </p>
            <ProtectedPressEmail
              tone="ghost"
              className="mt-8 border-white/20 px-7"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
