import { clsx, type ClassValue } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "XAF";
    notation?: Intl.NumberFormatOptions["notation"];
    locale?: string;
  } = {},
) {
  // Default to XAF and Cameroon locale
  const { currency = "XAF", notation = "compact", locale = "fr-CM" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
    currencyDisplay: "symbol", // Will show FCFA if supported by the locale
  }).format(numericPrice);
}

export function constructMetadata({
  title = "FrameitUp - Your favorite moments deserve more than just a digital screen.",
  description = " With FrameitUp , we bring your photos to life with high-quality",
  image = "/thumbnail.png",
  keywords = "FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp, FrameitUp",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@_frameitup",
    },
    icons,
    metadataBase: new URL("https://frameitup.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
