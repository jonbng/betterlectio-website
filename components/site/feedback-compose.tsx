"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Bug, Lightbulb, MessageCircleQuestion, Send } from "lucide-react"

import { submitFeedback } from "@/app/feedback/actions"
import { siteButton } from "@/components/site/styles"
import { cn } from "@/lib/utils"

const categories = [
  { id: "bug" as const, label: "Fejl", icon: Bug },
  { id: "idea" as const, label: "Idé", icon: Lightbulb },
  { id: "other" as const, label: "Spørgsmål", icon: MessageCircleQuestion },
]

export function FeedbackCompose() {
  const router = useRouter()
  const [category, setCategory] =
    useState<(typeof categories)[number]["id"]>("bug")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  return (
    <form
      id="new"
      className="rounded-[24px] border border-line bg-white p-5 shadow-[0_20px_50px_-38px_oklch(0_0_0_/_0.45)] min-[640px]:p-7"
      onSubmit={(event) => {
        event.preventDefault()
        setError(null)
        startTransition(async () => {
          const result = await submitFeedback({ category, title, message })
          if (!result.ok) {
            setError(
              result.error === "rate_limited"
                ? "Du har sendt for mange beskeder. Prøv igen senere."
                : "Kunne ikke sende. Prøv igen."
            )
            return
          }
          setTitle("")
          setMessage("")
          router.push(`/feedback/${result.id}`)
        })
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold tracking-[-0.025em] text-ink">
            Ny besked
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Fortæl os, hvad vi kan hjælpe med.
          </p>
        </div>
        <div className="flex rounded-full bg-grey p-1" aria-label="Kategori">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={cn(
                "flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-bold transition-[background-color,color,box-shadow]",
                category === id
                  ? "bg-white text-ink shadow-sm"
                  : "text-ink-muted hover:text-ink"
              )}
              aria-pressed={category === id}
            >
              <Icon className="size-4" strokeWidth={2} /> {label}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-xs font-semibold text-ink-muted">
          Titel (valgfri)
        </span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={200}
          disabled={pending}
          placeholder="Kort overskrift"
          className="min-h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm outline-none focus:border-ink/40 focus:ring-3 focus:ring-brand-soft"
        />
      </label>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold text-ink-muted">
          Besked
        </span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={4000}
          required
          rows={5}
          disabled={pending}
          placeholder={
            category === "bug"
              ? "Hvad gik galt, og hvad lavede du lige inden?"
              : category === "idea"
                ? "Hvad mangler eller kunne fungere bedre?"
                : "Hvad kan vi hjælpe med?"
          }
          className="w-full resize-y rounded-xl border border-line bg-white px-3.5 py-3 text-sm leading-relaxed outline-none focus:border-ink/40 focus:ring-3 focus:ring-brand-soft"
        />
      </label>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-ink-muted tabular-nums">
          {message.length}/4000
        </span>
        <button
          type="submit"
          disabled={pending || !message.trim()}
          className={cn(
            siteButton("primary", "min-h-11 py-2.5 text-sm"),
            "disabled:pointer-events-none disabled:opacity-45"
          )}
        >
          <Send className="size-4" /> {pending ? "Sender…" : "Send"}
        </button>
      </div>
      {error ? (
        <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
    </form>
  )
}
