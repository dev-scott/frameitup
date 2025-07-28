import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();






// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { z } from "zod";
// import sharp from "sharp";
// import { getPayloadClient } from "@/get-payload";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .input(z.object({ configId: z.string().optional() }))
//     .middleware(async ({ input }) => {
//       console.log("input", input);
//       return { input };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       const payload = await getPayloadClient();

//       try {
//         console.log("here is the metadata", metadata);
//         const { configId } = metadata.input;
//         console.log("file data", file);
//         const res = await fetch(file.url);
//         console.log("image i fetch from uploadthing", res);
//         const buffer = await res.arrayBuffer();

//         const imgMetadata = await sharp(buffer).metadata();
//         const { width, height } = imgMetadata;

//         if (!configId) {
//           //   const configuration = await db.configuration.create({
//           //     data: {
//           //       imageUrl: file.url,
//           //       height: height || 500,
//           //       width: width || 500,
//           //     },
//           //   });

//           const configuration = await payload.create({
//             collection: "configuration",
//             data: {
//               imageUrl: file.url,
//               height: height ? height : 0,
//               width: width ? width : 0,
//             },
//           });

//           return { configId: configuration.id };
//         } else {
//           //   const updatedConfiguration = await db.configuration.update({
//           //     where: {
//           //       id: configId,
//           //     },
//           //     data: {
//           //       croppedImageUrl: file.url,
//           //     },
//           //   });

//           const configuration = await payload.update({
//             collection: "configuration",
//             id: configId,
//             data: {},
//           });
//           console.log("configuration i wanna update", configuration);

//           return { configId: configuration.id };
//         }
//       } catch (error) {
//         console.log("UploadComplete error", error);
//       }
//     }),
// };

// export type OurFileRouter = typeof ourFileRouter;
