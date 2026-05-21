"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { AppStoreProvider, useAppStore } from "@/components/app-store";
import { Button, LinkButton } from "@/components/ui";

function LoginInner() {
  const router = useRouter();
  const { signIn } = useAppStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function submit() {
    await fetch("/api/auth/magic-link", { method: "POST", body: JSON.stringify({ email }) });
    signIn(email);
    setSent(true);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <div className="card space-y-4 p-5">
        <LinkButton href="/" variant="ghost" className="px-0">EnvelopeFlow</LinkButton>
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-ink/65">Enter your email to receive a magic link. In this credential-free build, the app starts a local demo session immediately.</p>
        {sent ? <p className="rounded-lg bg-leaf/15 p-3 text-sm font-semibold text-moss">Magic-link fallback recorded. Continue to your budget.</p> : null}
        <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        <Button onClick={submit} disabled={!email.includes("@")} className="w-full"><Mail size={18} /> Send magic link</Button>
        <Button variant="secondary" onClick={() => router.push("/app/onboarding")} className="w-full">Continue setup</Button>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <AppStoreProvider><LoginInner /></AppStoreProvider>;
}
