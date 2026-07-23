import { DOWNLOAD_LINKS } from "@/lib/download-links"

/** A concrete platform we can detect from the user agent. */
export type DetectedPlatform =
  | "chrome"
  | "firefox"
  | "edge"
  | "ios"
  | "android"
  | "safari"
  | "unknown"

/** Whether the visitor is most likely on a phone or a computer. */
export type DeviceKind = "mobile" | "desktop" | "unknown"

/**
 * Best-effort platform detection from the user agent. Client-only, returns
 * "unknown" during SSR so CTAs render a sensible, JS-free fallback.
 */
export function detectPlatform(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown"
  const ua = navigator.userAgent
  const platform = navigator.platform || ""
  const maxTouchPoints = navigator.maxTouchPoints || 0

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) || (platform === "MacIntel" && maxTouchPoints > 1)
  if (isIOS) return "ios"

  if (/Android/i.test(ua)) return "android"
  if (/Edg\//.test(ua)) return "edge"
  if (/Firefox\//.test(ua)) return "firefox"
  if (/Chrome\//.test(ua) || /Chromium\//.test(ua)) return "chrome"
  if (/Safari\//.test(ua)) return "safari"

  return "unknown"
}

export function deviceKind(p: DetectedPlatform): DeviceKind {
  if (p === "ios" || p === "android" || p === "safari") return "mobile"
  if (p === "chrome" || p === "firefox" || p === "edge") return "desktop"
  return "unknown"
}

export type InstallTarget = {
  /** Short button label, e.g. "Tilføj til Chrome". */
  label: string
  href: string
  /** Value sent to analytics + used as a key. */
  platform: string
  external: boolean
}

const BROWSER_TARGETS: Record<"chrome" | "firefox" | "edge", InstallTarget> = {
  chrome: { label: "Tilføj til Chrome", href: DOWNLOAD_LINKS.chrome, platform: "chrome", external: true },
  firefox: { label: "Tilføj til Firefox", href: DOWNLOAD_LINKS.firefox, platform: "firefox", external: true },
  edge: { label: "Tilføj til Edge", href: DOWNLOAD_LINKS.edge, platform: "edge", external: true },
}

const IOS_TARGET: InstallTarget = {
  label: "Hent i App Store",
  href: "/download/ios",
  platform: "ios",
  external: false,
}
const ANDROID_TARGET: InstallTarget = {
  label: "Hent i Google Play",
  href: DOWNLOAD_LINKS.android,
  platform: "android",
  external: true,
}
const GENERIC_BROWSER: InstallTarget = {
  label: "Hent til browser",
  href: "/download",
  platform: "browser",
  external: false,
}
const GENERIC_APP: InstallTarget = {
  label: "Hent app",
  href: "/download",
  platform: "app",
  external: false,
}

/**
 * The recommended primary/secondary install pair for a platform. Primary is the
 * obvious install for the current device; secondary points at the other form
 * factor (app ⇄ browser) so both are always one tap away.
 */
export function installFor(p: DetectedPlatform): {
  primary: InstallTarget
  secondary: InstallTarget
} {
  if (p === "ios" || p === "safari") return { primary: IOS_TARGET, secondary: GENERIC_BROWSER }
  if (p === "android") return { primary: ANDROID_TARGET, secondary: GENERIC_BROWSER }
  if (p === "chrome" || p === "firefox" || p === "edge")
    return { primary: BROWSER_TARGETS[p], secondary: GENERIC_APP }
  return { primary: GENERIC_BROWSER, secondary: GENERIC_APP }
}
