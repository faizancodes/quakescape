import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { ReverseGeocodeResult } from "@/lib/types";

const QuerySchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

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
    const parsed = QuerySchema.safeParse({
      latitude: request.nextUrl.searchParams.get("latitude"),
      longitude: request.nextUrl.searchParams.get("longitude"),
    });

    if (!parsed.success) {
      return withCors({ error: "Invalid request" }, { status: 400 });
    }

    const { latitude, longitude } = parsed.data;
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("lat", String(latitude));
    url.searchParams.set("lon", String(longitude));
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("zoom", "10");

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": "Quakescape/1.0" },
      next: { revalidate: 600 },
    });
    if (!response.ok) {
      return withCors({ error: "Unable to reverse geocode" }, { status: 502 });
    }

    const place = await response.json();
    return withCors({ latitude, longitude, places: [place] } as ReverseGeocodeResult);
  } catch {
    return withCors({ error: "Unable to reverse geocode" }, { status: 500 });
  }
}
