"use client"

import { useEffect, useRef, useState } from "react"

type PressCopyButtonProps = {
  text: string
  label?: string
  className?: string
}

function CopyIcon({ className }: { className?: string }) {
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
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

export function PressCopyButton({
  text,
  label = "Kopiér",
  className = "",
}: PressCopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current)
    },
    []
  )

  async function copy() {
    const copyWithSelection = () => {
      const textarea = document.createElement("textarea")
      textarea.value = text
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
        await navigator.clipboard.writeText(text)
      } else if (!copyWithSelection()) return
    } catch {
      if (!copyWithSelection()) return
    }

    setCopied(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-white transition-[transform,opacity] duration-150 ease-out hover:opacity-85 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand active:scale-[0.96] motion-reduce:transition-none motion-reduce:active:scale-100 ${className}`}
      aria-live="polite"
    >
      <span className="relative size-4">
        <CheckIcon
          className={`absolute inset-0 size-4 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
            copied
              ? "blur-0 scale-100 opacity-100"
              : "scale-[0.25] opacity-0 blur-[4px]"
          }`}
        />
        <CopyIcon
          className={`size-4 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
            copied
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "blur-0 scale-100 opacity-100"
          }`}
        />
      </span>
      <span>{copied ? "Kopieret" : label}</span>
    </button>
  )
}
