import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_LIMIT } from "@/lib/constants";
import type { UsgsEarthquakeFeed } from "@/lib/types";

const USGS_FEED_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

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

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = Math.min(Number(limitParam ?? DEFAULT_LIMIT) || DEFAULT_LIMIT, 100);
    const response = await fetch(USGS_FEED_URL, { next: { revalidate: 60 } });
    if (!response.ok) {
      return withCors({ error: "Unable to load earthquake feed" }, { status: 502 });
    }

    const feed = (await response.json()) as UsgsEarthquakeFeed;
    return withCors({
      ...feed,
      features: feed.features.slice(0, limit),
    });
  } catch {
    return withCors({ error: "Unable to load earthquake feed" }, { status: 500 });
  }
}
