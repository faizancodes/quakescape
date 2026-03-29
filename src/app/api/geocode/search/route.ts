import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { GeocodeQueryResult, NominatimPlace } from "@/lib/types";

const QuerySchema = z.object({
  q: z.string().min(1),
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
    const parsed = QuerySchema.safeParse({ q: request.nextUrl.searchParams.get("q") });
    if (!parsed.success) {
      return withCors({ error: "Invalid request" }, { status: 400 });
    }

    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("q", parsed.data.q);
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "10");

    const response = await fetch(url.toString(), {
      headers: { "User-Agent": "Quakescape/1.0" },
      next: { revalidate: 600 },
    });
    if (!response.ok) {
      return withCors({ error: "Unable to search places" }, { status: 502 });
    }

    const places = (await response.json()) as NominatimPlace[];
    return withCors({ query: parsed.data.q, places } satisfies GeocodeQueryResult);
  } catch {
    return withCors({ error: "Unable to search places" }, { status: 500 });
  }
}
