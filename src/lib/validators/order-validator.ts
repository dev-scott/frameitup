import { z } from "zod";

export const OrderFormSchema = z.object({
  phone: z.string().regex(/^6\d{8}$/, "Invalid phone number"),
  // productIds: z.object({ productIds: z.array(z.string()) }),
  address: z.string().min(8, {
    message: "Address must be at least 8 characters long.",
  }),
});
export const ExtendedOrderFormSchema = z.object({
  phone: z.string().regex(/^6\d{8}$/, "Invalid phone number"),
  productIds: z.object({ productIds: z.array(z.string()) }),
  address: z.string().min(8, {
    message: "Address must be at least 8 characters long.",
  }),
});

// export type ExtendedOrderFormSchema = z.infer<typeof OrderFormSchema> & {
//   // productIds: z.infer<typeof OrderFormSchema>["productIds"];
//   phone: z.infer<typeof OrderFormSchema>["phone"];
//   address: z.infer<typeof OrderFormSchema>["address"];
// };
