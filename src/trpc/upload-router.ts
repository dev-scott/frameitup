// src/trpc/upload-router.ts
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { TRPCError } from "@trpc/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadRouter = router({
  // Test endpoint
  testConfig: publicProcedure.query(() => {
    return {
      status: "ok",
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      hasApiKey: !!process.env.CLOUDINARY_API_KEY,
      hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    };
  }),

  // Upload via base64
  uploadImage: privateProcedure
    .input(
      z.object({
        base64Image: z.string(),
        fileName: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("🚀 Starting Cloudinary upload via tRPC...");
        console.log("👤 User:", ctx.user.email);
        console.log("📁 File name:", input.fileName);

        // Vérifier la configuration
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Cloudinary not configured",
          });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(input.base64Image, {
          folder: "custom_frames",
          resource_type: "image",
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        });

        console.log("✅ Upload successful:", result.public_id);

        return {
          success: true,
          publicId: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
        };
      } catch (error: any) {
        console.error("❌ Upload error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Upload failed: ${error.message}`,
        });
      }
    }),
});

// Puis dans src/trpc/index.ts, ajoutez :
// import { uploadRouter } from './upload-router';
//
// export const appRouter = router({
//   upload: uploadRouter,
//   // ... autres routers
// });
