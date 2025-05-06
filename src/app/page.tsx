"use client";
import { BentoCard } from "@/components/magicui/bento-grid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, CheckCircle, FileTextIcon, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  cardVariants,
  childVariants,
  divVariants,
  parentVariants,
} from "@/lib/motion-variants";
import { DotPattern } from "@/components/magicui/dot-pattern";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

const borderedFrameData = {
  Image: (
    <Image
      src="/category_frame/frame1.jpg"
      fill
      alt="platics frames"
      className="object-cover"
    />
  ),
  name: "Bordered Frame",
  description:
    "A frame with a border around your photo , perfect for your memories.",
  href: "/products?category=bordered_frame",
  cta: "Browse products",
  background: <img className="absolute -right-20 -top-20 opacity-60" />,
  className: "w-full h-full ",
};
const woodFrameData = {
  Image: (
    <Image
      src="/category_frame/frame1.jpg"
      fill
      alt="Wood frames"
      className="object-cover"
    />
  ),
  name: "Lacquered wood frame",
  description: " frame with wood and lacquer , perfect for your memories.",
  href: "/products?category=wood_frame",
  cta: "Browse products",
  background: <img className="absolute -right-20 -top-20 opacity-60" />,
  className: "w-full h-full  ",
};

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <motion.div
          variants={divVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-20 mx-auto relative text-center flex flex-col items-center max-w-3xl"
        >
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] -z-10"
            )}
          />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your favorite moments deserve more than just a{" "}
            <span className="text-secondary">digital screen</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            With FrameitUp , we bring your photos to life with high-quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </motion.div>

        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products?sort=recent"
          title="Brand new"
          subtitle="Brand new is good category"
        />
        <ProductReel
          query={{ category: "wood_frame", limit: 4 }}
          href="/products"
          title="Lacquered wood frame"
          subtitle="See all your favorite  Lacquered wood frame in this section"
        />
      </MaxWidthWrapper>

      <motion.section
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="border-t border-gray-200 bg-gray-50"
      >
        <MaxWidthWrapper className="py-20">
          <motion.div
            className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0"
            variants={parentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {perks.map((perk) => (
              <motion.div
                key={perk.name}
                variants={childVariants}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </motion.section>
    </>
  );
}
