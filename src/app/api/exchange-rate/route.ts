import { NextResponse } from "next/server";
import { getRate } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = (url.searchParams.get("from") || "USD") as CurrencyCode;
  const to = (url.searchParams.get("to") || "USD") as CurrencyCode;
  return NextResponse.json({
    ok: true,
    from,
    to,
    rate: getRate(from, to),
    source: process.env.EXCHANGE_RATE_API_KEY ? "configured-provider" : "local-fallback-snapshot"
  });
}
