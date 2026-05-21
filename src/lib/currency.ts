import type { CurrencyCode } from "./types";

export const currencies: CurrencyCode[] = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "MXN", "SGD"];

export const currencySymbols: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  JPY: "¥",
  MXN: "$",
  SGD: "S$"
};

const fallbackRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 1.08,
  GBP: 1.27,
  CAD: 0.73,
  AUD: 0.66,
  JPY: 0.0064,
  MXN: 0.059,
  SGD: 0.74
};

export function getRate(from: CurrencyCode, to: CurrencyCode) {
  if (from === to) return 1;
  return Number((fallbackRates[from] / fallbackRates[to]).toFixed(4));
}

export function convertAmount(amount: number, from: CurrencyCode, to: CurrencyCode) {
  const rate = getRate(from, to);
  return { rate, baseAmount: Number((amount * rate).toFixed(2)) };
}

export function money(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2
  }).format(amount || 0);
}
