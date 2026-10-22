import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { DOWNLOAD_LINKS } from "@/lib/download-links"
import { getPublicStats } from "@/lib/public-stats"

export const metadata: Metadata = {
  title: "The BetterLectio project",
  description:
    "A quick explanation of why I made BetterLectio and what it changes.",
  alternates: {
    canonical: "/stardance",
  },
  robots: {
    index: false,
    follow: false,
  },
}

const comparisons = [
  {
    title: "Home",
    before: "/stardance/raw-forside.png",
    after: "/stardance/bl-forside.png",
  },
  {
    title: "Schedule",
    before: "/stardance/raw-skema.png",
    after: "/stardance/bl-skema.png",
  },
  {
    title: "Homework",
    before: "/stardance/raw-lektier.png",
    after: "/stardance/bl-lektier.png",
  },
  {
    title: "Assignments",
    before: "/stardance/raw-opgaver.png",
    after: "/stardance/bl-opgaver.png",
  },
] as const

const number = new Intl.NumberFormat("en-US")

export default async function StardancePage() {
  const stats = await getPublicStats()
  const reach = [
    {
      value: number.format(stats.totalStudents),
      label: "registered student profiles",
    },
    ...(stats.weeklyActiveStudents == null
      ? []
      : [
          {
            value: number.format(stats.weeklyActiveStudents),
            label: "active student profiles in the past 7 days",
          },
        ]),
    {
      value: number.format(stats.totalSchools),
      label: "schools those profiles come from",
    },
  ]

  return (
    <main
      lang="en"
      className="min-h-screen bg-white px-5 py-12 text-neutral-950 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1500px]">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center text-sm text-neutral-500 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Go to the BetterLectio website →
        </Link>

        <header className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h1 className="max-w-[16ch] text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            My school used a platform called Lectio. I rebuilt its interface.
          </h1>

          <p className="max-w-[58ch] text-pretty text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:pt-1">
            At many Danish upper-secondary schools, Lectio is where students
            check their schedules, homework, grades, messages, and most of the
            practical information around school. I used it several times a day
            and thought it was pretty difficult to navigate.
          </p>
        </header>

        <section className="mt-12 max-w-[58ch] text-pretty text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:ml-[calc(50%+2rem)]">
            <p>
              I started changing the pages with a browser extension, mostly for
              myself. A few friends wanted it too, so I kept working on it.
            </p>
            <p className="mt-4">
              The difficult part is that BetterLectio still has to use Lectio
              underneath. It changes the interface, not the school&apos;s system or
              its data. Later, we also made iOS and Android apps.
            </p>
            <a
              href={DOWNLOAD_LINKS.chrome}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block py-2 text-base font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Chrome Web Store page ↗
            </a>
        </section>

        <p className="mt-14 text-base text-neutral-600">
          It ended up getting much bigger than I expected:
        </p>
        <dl
          aria-label="Project reach"
          className={`mt-4 grid border-y border-neutral-200 sm:divide-x sm:divide-y-0 sm:divide-neutral-200 ${
            reach.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {reach.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-neutral-200 py-5 last:border-b-0 sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:pr-0"
            >
              <dd className="text-2xl font-semibold tracking-[-0.02em] tabular-nums">
                {stat.value}
              </dd>
              <dt className="mt-1 text-sm text-neutral-500">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <section
          aria-labelledby="screenshots-heading"
          className="mt-14 border-t border-neutral-200 pt-10 sm:mt-16"
        >
          <h2
            id="screenshots-heading"
            className="text-3xl font-semibold tracking-[-0.03em]"
          >
            What it changes
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-7 text-neutral-600">
            These are the same pages and information. BetterLectio is turned
            on in the screenshots on the right.
          </p>
          <aside className="mt-4 max-w-[62ch] border-l-2 border-neutral-200 pl-3 text-sm leading-6 text-neutral-500">
            The screenshots are in Danish because BetterLectio is made for
            Danish students.
          </aside>

          <div className="mt-10 space-y-20 sm:space-y-24">
            {comparisons.map((comparison, index) => (
              <section key={comparison.title}>
                <div
                  className={`mb-5 ${index === 0 ? "" : "border-t border-neutral-200 pt-5"}`}
                >
                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {comparison.title}
                  </h3>
                </div>

                <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
                  <ComparisonImage
                    label="Original Lectio"
                    detail="Extension off"
                    src={comparison.before}
                    alt={`${comparison.title} in Lectio without BetterLectio`}
                  />
                  <ComparisonImage
                    label="BetterLectio"
                    detail="Extension on"
                    enhanced
                    src={comparison.after}
                    alt={`${comparison.title} in Lectio with BetterLectio`}
                  />
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function ComparisonImage({
  label,
  detail,
  src,
  alt,
  enhanced = false,
}: {
  label: string
  detail: string
  src: string
  alt: string
  enhanced?: boolean
}) {
  return (
    <figure>
      <figcaption
        className={`mb-3 flex items-baseline justify-between gap-4 border-b pb-2 text-sm ${
          enhanced
            ? "border-blue-600 text-blue-700"
            : "border-neutral-300 text-neutral-700"
        }`}
      >
        <span className="font-semibold">{label}</span>
        <span className={enhanced ? "text-blue-600" : "text-neutral-500"}>
          {detail}
        </span>
      </figcaption>
      <Image
        src={src}
        alt={alt}
        width={2560}
        height={1424}
        quality={95}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="h-auto w-full rounded-sm outline-1 outline-black/10"
      />
    </figure>
  )
}
