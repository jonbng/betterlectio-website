"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Close } from "@/components/site/icons"
import { installFor } from "@/lib/platform"
import { captureDownloadClicked } from "@/lib/posthog"
import { usePlatform } from "@/lib/use-platform"
import { cn } from "@/lib/utils"

const DISMISS_KEY = "bl-sticky-cta-dismissed"

/**
 * Slim, dismissible, platform-aware install prompt. Appears only after the
 * visitor scrolls past the hero, and stays hidden for the session once closed.
 */
export function StickyCta() {
  const detected = usePlatform()
  const [scrolledPast, setScrolledPast] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    // Read the per-session dismissal + subscribe to scroll (external systems).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1")
    const onScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(DISMISS_KEY, "1")
    } catch {
      // storage unavailable — dismissal just won't persist
    }
  }

  const visible = scrolledPast && !dismissed
  const { primary } = installFor(detected ?? "unknown")

  const onInstall = () =>
    captureDownloadClicked(primary.platform, { source: "sticky_cta" })

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[440px] items-center gap-3 rounded-2xl border border-line bg-white/90 p-2.5 pl-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-300 min-[720px]:inset-x-auto min-[720px]:right-5 min-[720px]:mx-0",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <p className="flex-1 text-sm font-semibold text-ink">
        Hent BetterLectio — gratis
      </p>

      {primary.external ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noreferrer"
          onClick={onInstall}
          className="rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white no-underline transition-opacity hover:opacity-90"
        >
          {primary.label}
        </a>
      ) : (
        <Link
          href={primary.href}
          onClick={onInstall}
          className="rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white no-underline transition-opacity hover:opacity-90"
        >
          {primary.label}
        </Link>
      )}

      <button
        type="button"
        onClick={dismiss}
        aria-label="Luk"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-grey hover:text-ink [&_svg]:size-4"
      >
        <Close />
      </button>
    </div>
  )
}
