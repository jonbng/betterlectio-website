import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { FeedbackReply } from "@/components/site/feedback-reply"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { siteContainerClass, siteMainClass } from "@/components/site/styles"
import {
  conversationStatus,
  feedbackStatus,
  feedbackTitle,
  getMyFeedbackThread,
} from "@/lib/feedback"
import { getWebsiteSession } from "@/lib/supabase-auth"

export const dynamic = "force-dynamic"

export default async function FeedbackThreadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  if (!(await getWebsiteSession())) redirect("/feedback")
  const { id } = await params
  const thread = await getMyFeedbackThread(id)
  if (!thread) notFound()

  return (
    <div className="site">
      <SiteNav />
      <main className={`${siteMainClass} ${siteContainerClass} pt-8 pb-24`}>
        <div className="mx-auto max-w-[760px]">
          <Link
            href="/feedback"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink-muted no-underline hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Alle beskeder
          </Link>
          <header className="mt-5 rounded-[24px] border border-line bg-white p-5 min-[640px]:p-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-ink-muted">
              <span className="rounded-full bg-grey px-2.5 py-1">
                {conversationStatus(thread.item.conversation_state)}
              </span>
              <span className="rounded-full bg-grey px-2.5 py-1">
                {feedbackStatus(thread.item.status)}
              </span>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-balance text-ink">
              {feedbackTitle(thread.item)}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-pretty whitespace-pre-wrap text-ink">
              {thread.item.message}
            </p>
            <time className="mt-4 block text-xs text-ink-muted tabular-nums">
              Sendt{" "}
              {new Date(thread.item.created_at).toLocaleDateString("da-DK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </header>

          {thread.status_events.length > 1 ? (
            <section
              className="mt-6 rounded-[20px] border border-line bg-grey/45 p-4"
              aria-labelledby="progress-heading"
            >
              <h2
                id="progress-heading"
                className="text-sm font-extrabold text-ink"
              >
                Forløb
              </h2>
              <ol className="mt-3 space-y-2">
                {thread.status_events.map((event) => (
                  <li
                    key={event.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="font-semibold text-ink">
                      {feedbackStatus(event.to_status)}
                    </span>
                    <time className="shrink-0 text-xs text-ink-muted tabular-nums">
                      {new Date(event.created_at).toLocaleDateString("da-DK", {
                        day: "numeric",
                        month: "short",
                      })}
                    </time>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section className="my-6 space-y-3" aria-label="Samtale">
            {thread.comments.map((comment) => {
              const mine = comment.author_kind === "user"
              return (
                <article
                  key={comment.id}
                  className={`max-w-[88%] rounded-[20px] px-4 py-3 text-sm shadow-sm ${mine ? "ml-auto rounded-br-md bg-ink text-white" : "rounded-bl-md border border-line bg-white text-ink"}`}
                >
                  <div className="mb-1 flex items-center justify-between gap-4 text-xs opacity-65">
                    <span>{mine ? "Dig" : "BetterLectio"}</span>
                    <time className="tabular-nums">
                      {new Date(comment.created_at).toLocaleString("da-DK", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <p className="leading-relaxed text-pretty whitespace-pre-wrap">
                    {comment.body}
                  </p>
                </article>
              )
            })}
          </section>
          <FeedbackReply id={id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
