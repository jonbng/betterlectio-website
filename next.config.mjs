import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Repo has a lockfile at both the root and in website/. Pin the workspace
  // root so Turbopack stops warning and always treats website/ as the app root.
  turbopack: {
    root: __dirname,
  },
  images: {
    // UI-heavy press previews need less compression than photographic assets;
    // small labels and timetable text otherwise become visibly soft.
    qualities: [75, 95],
  },
}

export default nextConfig
