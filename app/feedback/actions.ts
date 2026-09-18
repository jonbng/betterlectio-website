"use server"

import { revalidatePath } from "next/cache"
import {
  createSupabaseServerClient,
  getLinkedStudent,
} from "@/lib/supabase-auth"

export type FeedbackActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string }

async function authenticatedContext() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  const student = await getLinkedStudent(data.user.id)
  return student ? { supabase, student } : null
}

export async function submitFeedback(input: {
  category: "bug" | "idea" | "other"
  title: string
  message: string
}): Promise<FeedbackActionResult> {
  const context = await authenticatedContext()
  if (!context) return { ok: false, error: "not_signed_in" }
  const message = input.message.trim()
  if (!message || message.length > 4000)
    return { ok: false, error: "invalid_message" }

  const { data, error } = await context.supabase.rpc("submit_feedback", {
    p_student_id: context.student.id,
    p_school_id: context.student.schoolId,
    p_category: input.category,
    p_message: message,
    p_platform: "web",
    p_context: {
      title: input.title.trim().slice(0, 200) || null,
      locale: "da",
      app_version: "website",
    },
  })
  if (error)
    return {
      ok: false,
      error: /rate limit/i.test(error.message)
        ? "rate_limited"
        : "submit_failed",
    }
  revalidatePath("/feedback")
  return { ok: true, id: String(data) }
}

export async function replyToFeedback(
  id: string,
  body: string
): Promise<FeedbackActionResult> {
  const context = await authenticatedContext()
  if (!context) return { ok: false, error: "not_signed_in" }
  const message = body.trim()
  if (!message || message.length > 4000)
    return { ok: false, error: "invalid_message" }
  const { data, error } = await context.supabase.rpc("reply_to_feedback", {
    p_feedback_id: id,
    p_body: message,
  })
  if (error)
    return {
      ok: false,
      error: /rate limit/i.test(error.message)
        ? "rate_limited"
        : "reply_failed",
    }
  revalidatePath("/feedback")
  revalidatePath(`/feedback/${id}`)
  return { ok: true, id: String(data) }
}
