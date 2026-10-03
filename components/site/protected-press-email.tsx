"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import { siteButton } from "@/components/site/styles"
import { cn } from "@/lib/utils"

const LOCAL_PART = [106, 111, 110, 97, 116, 104, 97, 110]
const DOMAIN_PART = [
  98, 101, 116, 116, 101, 114, 108, 101, 99, 116, 105, 111, 46, 100, 107,
]

function decode(part: number[]) {
  return String.fromCharCode(...part)
}

const subscribeToHydration = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function CopyIcon({ copied }: { copied: boolean }) {
  return (
    <span className="relative size-[18px]" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute inset-0 size-[18px] transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          copied
            ? "blur-0 scale-100 opacity-100"
            : "scale-[0.25] opacity-0 blur-[4px]"
        )}
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute inset-0 size-[18px] transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
          copied
            ? "scale-[0.25] opacity-0 blur-[4px]"
            : "blur-0 scale-100 opacity-100"
        )}
      >
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </svg>
    </span>
  )
}

export function ProtectedPressEmail({
  tone = "primary",
  className,
}: {
  tone?: "primary" | "ghost" | "link"
  className?: string
}) {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  )
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [])

  async function copyAddress() {
    const local = decode(LOCAL_PART)
    const domain = decode(DOMAIN_PART)
    const address = `${local}${String.fromCharCode(64)}${domain}`

    const fallbackCopy = () => {
      const textarea = document.createElement("textarea")
      textarea.value = address
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      const succeeded = document.execCommand("copy")
      textarea.remove()
      return succeeded
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(address)
      } else if (!fallbackCopy()) return
    } catch {
      if (!fallbackCopy()) return
    }

    setCopied(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 1800)
  }

  const label = mounted
    ? `${decode(LOCAL_PART)} [at] ${decode(DOMAIN_PART)}`
    : "Vis pressekontakt"

  return (
    <button
      type="button"
      onClick={copyAddress}
      aria-label="Kopiér presse-emailadresse"
      aria-live="polite"
      className={cn(
        tone === "link"
          ? "inline-flex min-h-11 items-center gap-2 font-bold underline decoration-current/20 decoration-2 underline-offset-4 transition-[color,transform] duration-150 hover:decoration-current active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100"
          : siteButton(
              tone,
              "pr-5 pl-6 active:scale-[0.96] motion-reduce:active:scale-100"
            ),
        className
      )}
    >
      <span className="grid min-w-[205px] text-center">
        <span
          className={cn(
            "col-start-1 row-start-1",
            copied ? "invisible" : "visible"
          )}
          aria-hidden={copied}
        >
          {label}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1",
            copied ? "visible" : "invisible"
          )}
          aria-hidden={!copied}
        >
          Kopieret
        </span>
      </span>
      <CopyIcon copied={copied} />
    </button>
  )
}
