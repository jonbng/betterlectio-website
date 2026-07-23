import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

import { LOGIN_STATE_COOKIE } from "@/lib/auth-constants"

/**
 * Consume the extension-minted magic-link token_hash and establish a
 * Supabase SSR session on betterlectio.dk.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const tokenHash = url.searchParams.get("token_hash")
  const type = url.searchParams.get("type")
  const state = url.searchParams.get("state")
  const origin = url.origin

  const roadmapOk = new URL("/roadmap?login=ok", origin)
  const roadmapErr = (reason: string) =>
    new URL(`/roadmap?login=error&reason=${encodeURIComponent(reason)}`, origin)

  if (!tokenHash || type !== "magiclink" || !state) {
    return NextResponse.redirect(roadmapErr("missing_params"))
  }

  const store = await cookies()
  const expected = store.get(LOGIN_STATE_COOKIE)?.value
  store.delete(LOGIN_STATE_COOKIE)

  if (!expected || expected !== state) {
    return NextResponse.redirect(roadmapErr("invalid_state"))
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) {
    console.error("[auth/callback] missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
    return NextResponse.redirect(roadmapErr("config"))
  }

  const redirect = NextResponse.redirect(roadmapOk)
  const supabase = createServerClient(supabaseUrl, anonKey, {
    cookies: {
      getAll() {
        return store.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          redirect.cookies.set(name, value, options)
        }
      },
    },
  })

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "magiclink",
  })

  if (error) {
    console.error("[auth/callback] verifyOtp failed", error.message)
    return NextResponse.redirect(roadmapErr("verify_failed"))
  }

  return redirect
}
