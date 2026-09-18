import "server-only"

import { createSupabaseServerClient } from "@/lib/supabase-auth"

export type MyFeedbackItem = {
  id: string
  created_at: string
  last_public_activity_at: string
  category: string
  status: string
  conversation_state: string
  title: string | null
  message: string
  platform: string
  is_unread: boolean
  last_reply: string | null
}

export type FeedbackComment = {
  id: string
  created_at: string
  updated_at: string
  author_kind: "user" | "admin"
  body: string
}

export type MyFeedbackThread = {
  item: MyFeedbackItem & { duplicate_of: string | null; updated_at: string }
  comments: FeedbackComment[]
  status_events: Array<{
    id: string
    created_at: string
    from_status: string | null
    to_status: string
    note: string | null
  }>
}

export async function listMyFeedback(): Promise<MyFeedbackItem[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("list_my_feedback")
  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as MyFeedbackItem[]
}

export async function getMyFeedbackThread(
  id: string
): Promise<MyFeedbackThread | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("get_my_feedback_thread", {
    p_feedback_id: id,
  })
  if (error || !data) return null
  return data as unknown as MyFeedbackThread
}

export function feedbackTitle(item: { title: string | null; message: string }) {
  if (item.title?.trim()) return item.title.trim()
  const firstLine = item.message.trim().split("\n")[0] || "Feedback"
  return firstLine.length > 72 ? `${firstLine.slice(0, 69)}…` : firstLine
}

export function feedbackStatus(status: string) {
  return (
    (
      {
        pending: "Modtaget",
        review: "Vi undersøger det",
        planned: "Planlagt",
        in_progress: "I gang",
        completed: "Udgivet",
        declined: "Ikke planlagt",
        duplicate: "Knyttet til anden sag",
      } as Record<string, string>
    )[status] ?? status
  )
}

export function conversationStatus(state: string) {
  return (
    (
      {
        awaiting_staff: "Venter på BetterLectio",
        awaiting_user: "Venter på dig",
        resolved: "Løst",
      } as Record<string, string>
    )[state] ?? state
  )
}
