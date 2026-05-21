import { z } from "zod";
import { currencies } from "./currency";

export const emailSchema = z.object({
  email: z.string().email()
});

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(),
  currency: z.enum(currencies as [string, ...string[]]),
  date: z.string().min(1),
  envelopeId: z.string().min(1),
  merchant: z.string().min(1).max(80),
  note: z.string().max(240).optional(),
  recurring: z.boolean()
});

export const subscriptionSchema = z.object({
  name: z.string().min(1).max(80),
  amount: z.coerce.number().positive(),
  currency: z.enum(currencies as [string, ...string[]]),
  frequency: z.enum(["monthly", "annual"]),
  nextDueDate: z.string().min(1),
  envelopeId: z.string().min(1)
});
