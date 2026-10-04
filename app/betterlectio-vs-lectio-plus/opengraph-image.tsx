import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image"

export const alt = "BetterLectio vs. Lectio+: en ærlig sammenligning"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return renderOgImage({
    eyebrow: "Sammenligning · 2026",
    title: "BetterLectio vs. Lectio+",
    subtitle: "Pris, platforme og funktioner, dokumenteret punkt for punkt.",
  })
}
