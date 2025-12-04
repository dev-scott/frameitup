import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";
import { orderRouter } from "./order-router";
import { Resend } from "resend";
import { customFrameRouter } from "./custom-frame-router";
import { uploadRouter } from "./upload-router";

const resend = new Resend(process.env.RESEND_API_KEY);

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  order: orderRouter,
  customFrame: customFrameRouter,
  upload: uploadRouter,

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      }),
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),

  sendMail: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), message: z.string() }),
    )
    .mutation(async ({ input }) => {
      try {
        const { name, email, message } = input;
        console.log(name, email, message);

        const data = await resend.emails.send({
          from: `FrameitUp <support@mail.frameitup.store>`,
          to: "frameitup05@gmail.com",
          subject: "FrameitUp Support",
          html: `
          
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
      <h2 style="color: #111;">📬 Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="white-space: pre-line;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #777;">Cet e-mail a été généré automatiquement depuis le formulaire de contact du site FrameitUp.</p>
    </div>          
          
          `,
        });

        return { success: true };
      } catch (error) {
        console.log("error occurred", error);
        // return { success: false };
      }
    }),
});

export type AppRouter = typeof appRouter;
