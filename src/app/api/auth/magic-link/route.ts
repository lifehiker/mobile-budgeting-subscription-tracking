import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = emailSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });

  const hasProvider = Boolean(process.env.RESEND_API_KEY && process.env.AUTH_SECRET);
  if (!hasProvider) {
    return NextResponse.json({
      ok: true,
      mode: "fallback",
      message: "Magic-link email provider is not configured. Local demo session may continue."
    });
  }

  return NextResponse.json({ ok: true, mode: "queued" });
}
