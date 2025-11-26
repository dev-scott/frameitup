// src/trpc/custom-frame-router.ts
import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CustomFrameSchema = z.object({
  originalImageUrl: z.string(),
  processedImageUrl: z.string(),
  cloudinaryPublicId: z.string(),
  size: z.string(),
  frameStyle: z.string(),
  filter: z.string().optional(),
  adjustments: z.object({
    brightness: z.number().optional(),
    contrast: z.number().optional(),
    saturation: z.number().optional(),
  }),
  price: z.number(),
  phone: z.string(),
  address: z.string(),
});

export const customFrameRouter = router({
  createCustomFrame: privateProcedure
    .input(CustomFrameSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const payload = await getPayloadClient();

      try {
        const customFrame = await payload.create({
          collection: "custom_frames",
          data: {
            user: user.id,
            originalImageUrl: input.originalImageUrl,
            processedImageUrl: input.processedImageUrl,
            cloudinaryPublicId: input.cloudinaryPublicId,
            size: input.size,
            frameStyle: input.frameStyle,
            filter: input.filter || "none",
            adjustments: input.adjustments,
            price: input.price,
            phone: input.phone,
            address: input.address,
            status: "pending",
            isPaid: false,
          } as any,
        });

        // Send confirmation email
        await resend.emails.send({
          from: "FrameitUp <support@mail.frameitup.store>",
          //@ts-ignore
          to: [user.email],
          subject: "Votre cadre personnalisé a été créé !",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>Merci pour votre commande !</h2>
              <p>Votre cadre personnalisé a été créé avec succès.</p>
              <p><strong>Numéro de commande:</strong> ${customFrame.id}</p>
              <p><strong>Prix total:</strong> ${input.price} FCFA</p>
              <p><strong>Statut:</strong> En attente de production</p>
              <img src="${input.processedImageUrl}" alt="Votre cadre" style="max-width: 400px; margin: 20px 0;" />
              <p>Nous commencerons la production de votre cadre sous peu.</p>
              <p>Cordialement,<br/>L'équipe FrameitUp</p>
            </div>
          `,
        });

        return {
          success: true,
          frameId: customFrame.id,
          url: `/thank-you?frameId=${customFrame.id}`,
        };
      } catch (error) {
        console.error("Error creating custom frame:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create custom frame",
        });
      }
    }),

  getUserFrames: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const payload = await getPayloadClient();

    const { docs: frames } = await payload.find({
      collection: "custom_frames",
      where: {
        user: {
          equals: user.id,
        },
      },
      sort: "-createdAt",
    });

    return frames;
  }),
});
