"use client"

import { useEffect } from "react"

/** If this tab was opened as the Lectio login popup, close it after success. */
export function LoginPopupCloser({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active) return
    if (typeof window === "undefined" || !window.opener) return
    try {
      window.opener.location.reload()
    } catch {
      // Cross-origin opener access can fail; parent also polls popup.closed.
    }
    window.close()
  }, [active])
  return null
}
