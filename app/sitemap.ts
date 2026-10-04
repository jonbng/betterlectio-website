import type { MetadataRoute } from "next"

import { getAllSchoolsForSeo } from "@/lib/schools"

const SITE_URL = "https://betterlectio.dk"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/download`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/stats`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/skoler`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/presse`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privatliv`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/roadmap`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/betterlectio-vs-lectio-plus`,
      lastModified: new Date("2026-10-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const schools = await getAllSchoolsForSeo()
  const schoolEntries: MetadataRoute.Sitemap = schools.map((s) => ({
    url: `${SITE_URL}/skoler/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...baseEntries, ...schoolEntries]
}
