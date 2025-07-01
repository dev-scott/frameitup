// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
// import sharp from "sharp"; // Commentez ou supprimez temporairement

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      console.log("DEBUG: Middleware executed in core.ts");
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("DEBUG: onUploadComplete started in core.ts");
      console.log("DEBUG: Uploaded file URL:", file.url);
      console.log("DEBUG: Metadata input:", metadata.input);

      // Commentez toute la logique de fetch et sharp pour le test
      // const res = await fetch(file.url);
      // const buffer = await res.arrayBuffer();
      // const imgMetadata = await sharp(buffer).metadata();
      // const { width, height } = imgMetadata;

      // Simplifie le retour
      console.log("DEBUG: onUploadComplete returning success.");
      return {
        configId: metadata.input?.configId || "default_id_from_server",
        uploadedFileUrl: file.url,
        debugMessage: "Upload successful, no image processing done for now.",
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
