import { NextRequest, NextResponse } from "next/server";

import type { UsgsEarthquakeFeature } from "@/lib/types";

const USGS_DETAIL_BASE = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=";

function withCors<T>(payload: T, init?: ResponseInit): NextResponse<T> {
  return NextResponse.json(payload, {
    ...init,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      ...(init?.headers ?? {}),
    },
  });
}

export async function OPTIONS() {
  return withCors({ success: true });
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ eventId: string }> }) {
  try {
    const { eventId } = await params;
    const response = await fetch(`${USGS_DETAIL_BASE}${encodeURIComponent(eventId)}`, { next: { revalidate: 60 } });
    if (!response.ok) {
      return withCors({ error: "Unable to load earthquake event" }, { status: 502 });
    }

    const feature = (await response.json()) as UsgsEarthquakeFeature;
    return withCors(feature);
  } catch {
    return withCors({ error: "Unable to load earthquake event" }, { status: 500 });
  }
}
