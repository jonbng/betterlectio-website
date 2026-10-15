import type { NextRequest } from "next/server"

import { handleMobileAppDownload } from "@/lib/mobile-app-download-server"

export async function GET(request: NextRequest) {
  return handleMobileAppDownload(request)
}
