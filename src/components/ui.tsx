import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-moss text-white hover:bg-ink",
    secondary: "bg-white text-ink border border-ink/15 hover:border-moss",
    ghost: "bg-transparent text-ink hover:bg-ink/5",
    danger: "bg-coral text-white hover:bg-ink"
  };
  return (
    <button
      className={`tap inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function LinkButton({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: ButtonProps["variant"]; className?: string }) {
  const variants = {
    primary: "bg-moss text-white hover:bg-ink",
    secondary: "bg-white text-ink border border-ink/15 hover:border-moss",
    ghost: "bg-transparent text-ink hover:bg-ink/5",
    danger: "bg-coral text-white hover:bg-ink"
  };
  return (
    <Link href={href} className={`tap inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      {detail ? <p className="mt-1 text-sm text-ink/60">{detail}</p> : null}
    </div>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="text-sm font-semibold text-ink">{children}</label>;
}
