import { addDays, format } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-job-secret");
  if (process.env.REMINDER_JOB_SECRET && secret !== process.env.REMINDER_JOB_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const targetThreeDay = format(addDays(new Date(), 3), "yyyy-MM-dd");
  const targetSameDay = format(new Date(), "yyyy-MM-dd");
  const configured = Boolean(process.env.RESEND_API_KEY);

  return NextResponse.json({
    ok: true,
    mode: configured ? "configured" : "fallback",
    targets: { threeDay: targetThreeDay, sameDay: targetSameDay },
    message: configured ? "Reminder job accepted." : "Resend is not configured. Reminder job dry-run completed."
  });
}
