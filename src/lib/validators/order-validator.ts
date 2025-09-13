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
  // productIds: z.object({ productIds: z.array(z.string()) }),
  address: z.string().min(8, {
    message: "Address must be at least 8 characters long.",
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      size: z.string(),
      price: z.number(),
    }),
  ),
});

export const ConfigurationSchema = z.object({
  // imageUrl doit être une chaîne de caractères (string)
  // Elle est rendue optionnelle et peut être vide si nécessaire,
  // ou vous pouvez la rendre requise (z.string().url()) si elle doit toujours être une URL valide.
  imageUrl: z
    .string()
    .url("L'URL de l'image n'est pas valide.")
    .min(1, "L'URL de l'image ne peut pas être vide."),

  // height doit être un nombre entier et est optionnel.
  // S'il est absent ou null, il prendra une valeur par défaut lors de l'utilisation.
  height: z.number().int("La hauteur doit être un nombre entier.").optional(),

  // width doit être un nombre entier et est optionnel.
  // S'il est absent ou null, il prendra une valeur par défaut lors de l'utilisation.
  width: z.number().int("La largeur doit être un nombre entier.").optional(),
  phone: z.string().regex(/^6\d{8}$/, "Invalid phone number"),
  address: z.string().min(8, {
    message: "Address must be at least 8 characters long.",
  }),
});

// export type ExtendedOrderFormSchema = z.infer<typeof OrderFormSchema> & {
//   // productIds: z.infer<typeof OrderFormSchema>["productIds"];
//   phone: z.infer<typeof OrderFormSchema>["phone"];
//   address: z.infer<typeof OrderFormSchema>["address"];
// };
