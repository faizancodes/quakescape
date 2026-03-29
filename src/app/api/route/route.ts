import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { RouteResponse } from "@/lib/types";

const QuerySchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
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
      origin: request.nextUrl.searchParams.get("origin"),
      destination: request.nextUrl.searchParams.get("destination"),
    });

    if (!parsed.success) {
      return withCors({ error: "Invalid request" }, { status: 400 });
    }

    const url = new URL("https://router.project-osrm.org/route/v1/driving/");
    url.pathname = `/route/v1/driving/${encodeURIComponent(parsed.data.origin)};${encodeURIComponent(parsed.data.destination)}`;
    url.searchParams.set("overview", "full");
    url.searchParams.set("geometries", "geojson");
    url.searchParams.set("steps", "true");

    const response = await fetch(url.toString(), { next: { revalidate: 600 } });
    if (!response.ok) {
      return withCors({ error: "Unable to calculate route" }, { status: 502 });
    }

    const data = await response.json();
    const route = data.routes?.[0];
    if (!route) {
      return withCors({ error: "Unable to calculate route" }, { status: 404 });
    }

    return withCors({
      origin: { latitude: 0, longitude: 0 },
      destination: { latitude: 0, longitude: 0 },
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      geometry: route.geometry,
      legs: route.legs,
    } satisfies RouteResponse);
  } catch {
    return withCors({ error: "Unable to calculate route" }, { status: 500 });
  }
}
