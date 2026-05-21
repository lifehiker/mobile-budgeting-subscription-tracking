import { NextResponse } from "next/server";

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: true, mode: "fallback", portalUrl: "/app/settings" });
  }
  return NextResponse.json({ ok: true, mode: "configured", portalUrl: "/app/settings" });
}
