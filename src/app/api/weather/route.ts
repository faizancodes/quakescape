import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import type { WeatherSummary } from "@/lib/types";

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
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("hourly", "temperature_2m,precipitation_probability,precipitation,wind_speed_10m,wind_gusts_10m");
    url.searchParams.set("timezone", "auto");

    const response = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!response.ok) {
      return withCors({ error: "Unable to load weather data" }, { status: 502 });
    }

    const data = (await response.json()) as WeatherSummary;
    return withCors({ latitude, longitude, current: data.current, hourly: data.hourly });
  } catch {
    return withCors({ error: "Unable to load weather data" }, { status: 500 });
  }
}
