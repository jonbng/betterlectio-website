"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Close, Menu } from "@/components/site/icons"
import { SiteLogoMark } from "@/components/site/site-logo"
import { siteButton, siteContainerClass } from "@/components/site/styles"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/stats", label: "Impact" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/feedback", label: "Feedback" },
  { href: "/privatliv", label: "Privatliv" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  return (
    <nav
      className={cn(
        siteContainerClass,
        "z-50 flex h-[76px] items-center justify-between gap-3 min-[720px]:h-24"
      )}
      aria-label="Primær"
    >
      <Link
        href="/"
        aria-label="BetterLectio: forside"
        className="group inline-flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-ink no-underline"
      >
        <SiteLogoMark
          size={34}
          className="block shrink-0 rounded-[9px] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [--logo-badge:var(--ink)] [--logo-glyph:#fff] group-hover:scale-105 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0"
        />
        <span className="hidden min-[380px]:inline">
          Better<span className="text-ink-muted">Lectio</span>
        </span>
      </Link>

      <div className="hidden items-center gap-1 min-[900px]:flex">
        {NAV_LINKS.map((link) => {
          const active =
            !link.href.includes("#") && pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-bold no-underline transition-colors",
                active ? "bg-grey text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/download"
          className={siteButton(
            "primary",
            "px-4 py-2.5 text-sm min-[480px]:px-6 min-[480px]:py-[11px] min-[480px]:text-[15px]"
          )}
        >
          <span className="min-[480px]:hidden">Hent</span>
          <span className="hidden min-[480px]:inline">Hent gratis</span>
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-mobile-menu"
          aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-grey focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand min-[900px]:hidden"
        >
          {menuOpen ? (
            <Close className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="site-mobile-menu"
          className="absolute top-[calc(100%-6px)] right-[22px] left-[22px] z-50 grid gap-1 rounded-[22px] border border-line bg-white p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] min-[720px]:right-10 min-[720px]:left-10 min-[900px]:hidden"
        >
          {NAV_LINKS.map((link) => {
            const active =
              !link.href.includes("#") && pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex min-h-11 items-center rounded-2xl px-4 text-base font-bold no-underline transition-colors",
                  active
                    ? "bg-grey text-ink"
                    : "text-ink-muted hover:bg-grey/60 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </nav>
  )
}
