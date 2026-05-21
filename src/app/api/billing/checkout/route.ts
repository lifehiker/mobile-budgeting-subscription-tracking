import { NextResponse } from "next/server";

export async function POST() {
  const configured = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_PRO_MONTHLY && process.env.STRIPE_PRICE_PRO_ANNUAL);
  if (!configured) {
    return NextResponse.json({
      ok: true,
      mode: "fallback",
      checkoutUrl: "/app/settings",
      message: "Stripe is not configured. The app can use local Pro fallback for demo and testing."
    });
  }

  return NextResponse.json({ ok: true, mode: "configured", checkoutUrl: "/app/settings" });
}
