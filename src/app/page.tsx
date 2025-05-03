import { BentoCard } from "@/components/magicui/bento-grid";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, CheckCircle, FileTextIcon, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
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
        </div>

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

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
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
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto h-[800px] ">
          {/* <div className="w-full md:flex md:items-center md:justify-between mb-4">
            <div className="max-w-2xl lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Browse by Category
              </h1>
              <p className="mt-1 text-lg max-w-prose text-muted-foreground">
                With FrameitUp , we bring your photos to life with high-quality
              </p>
            </div>
          </div> */}
          <div className="relative grid grid-cols-3 gap-4 grid-rows-2 w-full   aspect-square h-full">
            <div className="bg-gray-200 col-span-2 col-start-1 row-start-1 row-span-2 w-full h-full relative flex flex-col justify-between items-center rounded-xl  ">
              <div className="flex items-center flex-col justify-center py-4 gap-4 mt-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Plastic frame
                </h1>
                <span>
                  Discover quality frame that reflect your style and make
                  everyday enjoyable
                </span>
                <div className=" md:block">
                  <Link
                    href="/products?category=plastic_frame"
                    className={cn(buttonVariants(), "w-full")} // {buttonVariants("")}
                  >
                    Browse Trending ...
                  </Link>
                </div>
              </div>
              <div className="abosolute -bottom-10  w-2/4 h-[400px] relative">
                <Image
                  src="/category_frame/frame1.jpg"
                  fill
                  alt="platics frames"
                  className="object-cover"
                />
              </div>
            </div>

            <div className=" col-span-1 col-start-3 row-start-1 row-span-1 w-full h-full">
              <BentoCard key={borderedFrameData.name} {...borderedFrameData} />
            </div>

            <div className=" col-span-1 col-start-3 row-start-2 row-span-1 w-full h-full ">
              <BentoCard key={woodFrameData.name} {...woodFrameData} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
