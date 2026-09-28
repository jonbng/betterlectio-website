import { NextResponse, type NextRequest } from "next/server"

import { getSupabaseAdmin } from "@/lib/supabase"
import { getWebsiteSession } from "@/lib/supabase-auth"

export const dynamic = "force-dynamic"

function eventsOrigin() {
  return (
    process.env.BETTERLECTIO_EVENTS_URL || "https://events.betterlectio.dk"
  ).replace(/\/$/, "")
}

/**
 * Bridge an extension-verified BetterLectio/Supabase identity into the Events
 * subdomain without sharing the website session cookie between subdomains.
 * The generated token is short-lived, single-use, and redeemed by Events.
 */
export async function GET(request: NextRequest) {
  const user = await getWebsiteSession()
  if (!user?.email) {
    const login = new URL("/auth/login", request.url)
    login.searchParams.set("next", "/auth/events")
    return NextResponse.redirect(login)
  }

  const admin = getSupabaseAdmin()
  const { data, error } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: user.email,
  })

  if (error || !data.properties?.hashed_token) {
    console.error("[auth/events] Could not mint Events handoff", error)
    return NextResponse.redirect(
      new URL("/login?error=handoff", eventsOrigin())
    )
  }

  const callback = new URL("/auth/callback", eventsOrigin())
  callback.searchParams.set("token_hash", data.properties.hashed_token)
  callback.searchParams.set("type", "magiclink")
  callback.searchParams.set("next", "/dashboard")

  const response = NextResponse.redirect(callback)
  response.headers.set("Cache-Control", "no-store")
  return response
}
