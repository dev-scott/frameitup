import { z } from "zod";

export const OrderFormSchema = z.object({
  phone: z.string().regex(/^6\d{8}$/, "Invalid phone number"),

  address: z.string().min(8, {
    message: "Address must be at least 8 characters long.",
  }),
});
