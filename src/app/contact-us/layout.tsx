import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = constructMetadata({
  title: "Contact U | FrameitUp",
  description:
    "Get in touch with FrameitUp today and let us know how we can help you make your photos shine. We're here to help you create memories that last a lifetime.",
  keywords:
    "FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp , Scott , Design",
  image: "/thumbnail.png",
  icons: "/favicon.ico",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
