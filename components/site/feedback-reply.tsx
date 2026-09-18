"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Send } from "lucide-react"

import { replyToFeedback } from "@/app/feedback/actions"
import { siteButton } from "@/components/site/styles"

export function FeedbackReply({ id }: { id: string }) {
  const router = useRouter()
  const [body, setBody] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  return (
    <form
      className="rounded-[20px] border border-line bg-white p-4"
      onSubmit={(event) => {
        event.preventDefault()
        setError(null)
        startTransition(async () => {
          const result = await replyToFeedback(id, body)
          if (!result.ok) {
            setError("Kunne ikke sende svaret. Prøv igen.")
            return
          }
          setBody("")
          router.refresh()
        })
      }}
    >
      <label htmlFor="reply" className="text-sm font-bold text-ink">
        Skriv et svar
      </label>
      <textarea
        id="reply"
        value={body}
        onChange={(event) => setBody(event.target.value)}
        maxLength={4000}
        rows={4}
        disabled={pending}
        placeholder="Tilføj flere detaljer eller svar på vores spørgsmål…"
        className="mt-2 w-full resize-y rounded-xl border border-line px-3.5 py-3 text-sm leading-relaxed outline-none focus:border-ink/40 focus:ring-3 focus:ring-brand-soft"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-muted tabular-nums">
          {body.length}/4000
        </span>
        <button
          type="submit"
          disabled={pending || !body.trim()}
          className={siteButton(
            "primary",
            "min-h-11 px-5 py-2.5 text-sm disabled:pointer-events-none disabled:opacity-45"
          )}
        >
          <Send className="size-4" /> {pending ? "Sender…" : "Send svar"}
        </button>
      </div>
      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
    </form>
  )
}
