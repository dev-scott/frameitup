import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete", metadata, file);
        const { configId } = metadata.input;

        const res = await fetch(file.url);
        const buffer = await res.arrayBuffer();

        let width = 500;
        let height = 500;

        try {
          const imgMetadata = await sharp(buffer).metadata();
          width = imgMetadata.width || width;
          height = imgMetadata.height || height;
        } catch (error) {
          console.warn(
            "⚠️ Failed to extract image metadata with sharp:",
            error
          );
        }

        if (!configId) {
          const configuration = await db.configuration.create({
            data: {
              imageUrl: file.url,
              height: height || 500,
              width: width || 500,
            },
          });

          return { configId: configuration.id };
        } else {
          const updatedConfiguration = await db.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url,
            },
          });

          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        console.log("UploadThing onUploadComplete error", error);
        return { configId: null };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
