import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Inbox, Plus } from "lucide-react"

import { FeedbackCompose } from "@/components/site/feedback-compose"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import {
  siteButton,
  siteContainerClass,
  siteMainClass,
} from "@/components/site/styles"
import {
  conversationStatus,
  feedbackStatus,
  feedbackTitle,
  listMyFeedback,
} from "@/lib/feedback"
import { getWebsiteSession } from "@/lib/supabase-auth"

export const metadata: Metadata = {
  title: "Min feedback",
  description: "Følg dine beskeder til BetterLectio.",
}
export const dynamic = "force-dynamic"

export default async function FeedbackPage() {
  const user = await getWebsiteSession()
  const items = user ? await listMyFeedback().catch(() => []) : []

  return (
    <div className="site">
      <SiteNav />
      <main className={`${siteMainClass} ${siteContainerClass} pt-8 pb-24`}>
        <header className="mx-auto max-w-[760px] py-10">
          <p className="font-mono text-xs tracking-wide text-ink-muted uppercase">
            Hjælp & feedback
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-[clamp(34px,5vw,52px)] leading-tight font-extrabold tracking-[-0.04em] text-balance">
                Dine beskeder
              </h1>
              <p className="mt-2 max-w-[52ch] text-base text-pretty text-ink-muted">
                Følg status, læs vores svar og tilføj flere oplysninger.
              </p>
            </div>
            {user ? (
              <a
                href="#new"
                className={siteButton(
                  "secondary",
                  "min-h-11 px-5 py-2.5 text-sm"
                )}
              >
                <Plus className="size-4" /> Ny besked
              </a>
            ) : null}
          </div>
        </header>

        {!user ? (
          <section className="mx-auto max-w-[620px] rounded-[24px] border border-line bg-white p-8 text-center">
            <Inbox
              className="mx-auto size-9 text-ink-muted"
              strokeWidth={1.7}
            />
            <h2 className="mt-4 text-xl font-extrabold">
              Log ind for at se din feedback
            </h2>
            <p className="mx-auto mt-2 max-w-[44ch] text-sm text-ink-muted">
              Dine beskeder er private og følger din BetterLectio-konto på tværs
              af platforme.
            </p>
            <Link
              href="/auth/login?next=/feedback"
              className={siteButton("primary", "mt-6")}
            >
              Log ind med BetterLectio
            </Link>
          </section>
        ) : (
          <div className="mx-auto grid max-w-[760px] gap-8">
            <section aria-labelledby="requests-heading">
              <h2
                id="requests-heading"
                className="mb-3 text-sm font-bold text-ink"
              >
                Tidligere beskeder
              </h2>
              {items.length ? (
                <div className="overflow-hidden rounded-[24px] border border-line bg-white">
                  {items.map((item, index) => (
                    <Link
                      key={item.id}
                      href={`/feedback/${item.id}`}
                      className={`group flex min-h-24 items-center gap-4 px-5 py-4 no-underline transition-colors hover:bg-grey/60 ${index ? "border-t border-line" : ""}`}
                    >
                      <span
                        className={`size-2.5 shrink-0 rounded-full ${item.is_unread ? "bg-brand" : "bg-line"}`}
                        aria-label={item.is_unread ? "Ulæst svar" : undefined}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-sm font-extrabold text-ink">
                            {feedbackTitle(item)}
                          </h3>
                          {item.is_unread ? (
                            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-bold text-brand-deep">
                              Nyt svar
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 truncate text-sm text-ink-muted">
                          {item.last_reply ?? item.message}
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-ink-muted">
                          <span>
                            {conversationStatus(item.conversation_state)}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span>{feedbackStatus(item.status)}</span>
                        </p>
                      </div>
                      <ArrowRight className="size-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-dashed border-line bg-grey/40 p-8 text-center text-sm text-ink-muted">
                  Du har ikke sendt noget endnu.
                </div>
              )}
            </section>
            <FeedbackCompose />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
