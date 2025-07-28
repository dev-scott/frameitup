import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

console.log("uploadthing route is working");

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
