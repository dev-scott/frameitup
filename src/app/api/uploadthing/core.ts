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
        console.log("here is the metadata", metadata);
        const { configId } = metadata.input;
console.log("file data",file)
        const res = await fetch(file.url);
        console.log("image i fetch from uploadthing", res);
        const buffer = await res.arrayBuffer();

        const imgMetadata = await sharp(buffer).metadata();
        const { width, height } = imgMetadata;

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
        console.log("UploadComplete error", error);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
