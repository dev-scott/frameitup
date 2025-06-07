"use client";
import { BentoCard } from "@/components/magicui/bento-grid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  ArrowRight,
  CheckCircle,
  FileTextIcon,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  buttonVariantsForMotion,
  cardVariants,
  childVariants,
  divVariants,
  parentVariants,
} from "@/lib/motion-variants";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { festive, goblin_one } from "@/lib/font";
import Pretitle from "@/components/Pretitle";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import ProductsList from "@/components/ProductsList";
import { fadeIn } from "@/lib/motion-variants";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
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
  const handleBrowserProducts = () => {
    window.location.href = "/products";
  };

  return (
    <>
      <section className=" h-[70vh] bg-hero py-20 w-full bg-no-repeat relative">
        <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50 to-black/70 z-10"></div>
        <div className="container mx-auto h-full flex items-center relative">

          <div className="z-20 relative text-white text-center xl:text-left mx-auto xl:mx-0 flex flex-col items-center xl:items-start max-w-[608px] ">
            <motion.h1
              variants={fadeIn({ direction: "up", delay: 0.2 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="font-bold line-clamp-2 text-4xl text-white mb-4"
            >
              <span className="text-[#e7c819]  ">Your favorite </span>
              moments deserve more than just a{" "}
              <span className="text-secondary">digital screen</span>
            </motion.h1>
            <motion.p
              variants={fadeIn({ direction: "up", delay: 0.4 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="mb-8 "
            >
              Celebrate icons, honor memories, and showcase your unique style.
              Built for elegance and impact. Bring personality to every corner
              of your space ...
            </motion.p>
            <motion.div
              variants={fadeIn({ direction: "up", delay: 0.6 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
            >
              <Button
                className=" flex items-center w-[210px] h-[54px] justify-center gap-2 group py-[10px] pl-[10px] pr-[10px] bg-secondary hover:bg-[#e7c819] rounded-[2px]"
                variant={"ghost"}
                onClick={() => handleBrowserProducts()}
              >
                <div className="flex-1 text-center tracking-[1.2px]">
                  Browse products
                </div>
                <div className="p-2 bg-black rounded-md">
                  <ArrowRight className=" group-hover:rotate-45 group-hover:text-white transition-all duration-200 " />
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductsList query={{ sort: "asc", limit: 4 }} />

      {/* <MaxWidthWrapper>

   
        <ProductReel
          query={{ category: "wood_frame", limit: 4 }}
          href="/products"
          title="Lacquered wood frame"
          subtitle="See all your favorite  Lacquered wood frame in this section"
        />
      </MaxWidthWrapper> */}
      <MaxWidthWrapper className="">
        <section className="py-16 xl:pt-32 w-full">
          <div className="container pl-0 mx-auto">
            <div className="flex flex-col gap-12 xl:gap-0 xl:flex-row xl:items-center">
              <div className="flex-1">
                <div className="max-w-[500px]">
                  <Pretitle text={"About us"} />
                  <motion.h2
                    variants={fadeIn({ direction: "left", delay: 0.2 })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className="font-bold text-4xl mb-6"
                  >
                    {" "}
                    Crafted With Passion, Framed With Purpose{" "}
                  </motion.h2>
                  <motion.p
                    variants={fadeIn({ direction: "left", delay: 0.4 })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    className={cn("font-light  mb-11")}
                  >
                    We turn art, icons, and personal moments into timeless
                    framed pieces. From legendary characters to your own
                    portrait, every creation is designed with care, style, and
                    soul. Our commitment to quality ensures that each frame is
                    made to last and inspire. Because your walls deserve more
                    than decoration—they deserve meaning.
                  </motion.p>
                  <div className="w-max flex flex-col text-right mb-10">
                    <motion.p
                      variants={fadeIn({ direction: "left", delay: 0.6 })}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: false, amount: 0.1 }}
                      className={cn("font-bold text-4xl", festive.className)}
                    >
                      {" "}
                      Frameit UP
                    </motion.p>
                  </div>
                  <motion.div
                    variants={fadeIn({ direction: "left", delay: 0.8 })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                  >
                    <Button className="flex items-center w-[210px] h-[54px] justify-center gap-2 group py-[10px] pl-[10px] pr-[10px] bg-secondary hover:bg-[#e7c819] rounded-[2px]">
                      {" "}
                      <Link href="mailto:frameitup05@gmail.com">
                        Contact us
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
              <div className="flex-1 xl:flex xl:justify-center">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.4 }}
                  variants={{
                    hidden: { opacity: 0, y: -30 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.1,
                        ease: "easeInOut",
                      },
                    },
                  }}
                  className="xl:w-full xl:h-full relative flex justify-center items-center"
                >
                  <div className="absolute hidden xl:flex w-[444px] h-[444px] bg-gradient-to-t from-[#f16028] to-[#7a3012] -top-4 -left-4 -z-10"></div>
                  <HeroVideoDialog
                    className="block dark:hidden h-full w-full"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                  />
                  <HeroVideoDialog
                    className="hidden dark:block h-full w-full"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                  />
                  {/* <Image
                    src="/category_frame/frame1.jpg"
                    alt="about us"
                    width={444}
                    height={493}
                  /> */}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      <motion.section
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="border-t border-gray-200 bg-gray-50"
      >
        {/* <SmoothCursor /> */}

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
