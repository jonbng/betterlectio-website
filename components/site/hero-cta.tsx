"use client"

import Link from "next/link"

import { Star } from "@/components/site/icons"
import { siteButton, type SiteButtonVariant } from "@/components/site/styles"
import { DOWNLOAD_LINKS } from "@/lib/download-links"
import { type InstallTarget, installFor } from "@/lib/platform"
import { captureDownloadClicked } from "@/lib/posthog"
import { usePlatform } from "@/lib/use-platform"

function CtaButton({
  cta,
  variant,
  source,
}: {
  cta: InstallTarget
  variant: SiteButtonVariant
  source: string
}) {
  const className = siteButton(variant)
  const onClick = () =>
    captureDownloadClicked(cta.platform, { source, cta: cta.label })

  if (cta.external) {
    return (
      <a
        href={cta.href}
        className={className}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
      >
        {cta.label}
      </a>
    )
  }
  return (
    <Link href={cta.href} className={className} onClick={onClick}>
      {cta.label}
    </Link>
  )
}

export function HeroCta() {
  // `null` until hydration → render the platform-neutral default pair.
  const detected = usePlatform()
  const { primary, secondary } = installFor(detected ?? "unknown")

  return (
    <>
      <div className="mt-9 flex flex-wrap gap-3.5">
        <CtaButton cta={primary} variant="primary" source="hero_primary" />
        <CtaButton cta={secondary} variant="secondary" source="hero_secondary" />
      </div>

      <a
        href={DOWNLOAD_LINKS.chrome}
        className="mt-[18px] inline-flex items-center gap-2.5 text-sm font-medium text-ink-muted no-underline transition-transform hover:-translate-y-px focus-visible:rounded-md focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-brand"
        target="_blank"
        rel="noreferrer"
        onClick={() => captureDownloadClicked("chrome", { source: "hero_rating" })}
      >
        <span className="flex items-center gap-0.5 text-ink [&_svg]:size-[15px]" aria-hidden="true">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </span>
        <span>
          <b className="font-bold text-ink">4,9</b> i gennemsnit · 500+ elever
        </span>
      </a>
    </>
  )
}
