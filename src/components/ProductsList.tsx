import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import React from "react";
import Pretitle from "./Pretitle";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ArrowRightToLineIcon, CheckCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsListProps {
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 10;

const ProductsList = (props: ProductsListProps) => {
  const { query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products && products.length) {
    //@ts-ignore
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  map = [...map, ...map, ...map, ...map, ...map];

  return (
    <section className="h-fit w-full pt-16 xl:pt-16 ">
      <div className="container mx-auto">
        <div className="text-center max-w-[540px] mx-auto xl:mb-20">
          <Pretitle text="List of Products" center />
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Discover our products
          </h1>
          <p className="mb-11 max-w-[480px] mx-auto ">
            {" "}
            Providing expert services designer to deliver quality and
            innovations in every project we undertakes{" "}
          </p>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {[...map].map((product, index) => {
          if (!product) return <ProductPlaceholder key={index} />;

          const validUrls = product.images
            .map(({ image }) => (typeof image === "string" ? image : image.url))
            .filter(Boolean) as string[];

          return (
            <SwiperSlide key={index} className="w-full max-w-[400px] h-[450px]">
              <div className="w-full h-[450px] flex-1 relative overflow-hidden group flex justify-center">
                <Image
                  src={validUrls[0] || ""}
                  fill
                  className="object-cover"
                  alt="product image"
                  quality={100}
                />
                <div className="w-[90%] h-[84px] bg-black absolute bottom-4 flex justify-between items-center text-white md:translate-y-[108px] md:group-hover:translate-y-0 transition-all duration-500">
                  <div className="pl-8">
                    <h4 className="text-white font-normal font-semibold tracking-[1px] uppercase">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="text-[#e7c819] text-xl" />
                      <p>{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="w-[44px] xl:w-[60px] xl:h-[68px] h-[44px] bg-[#e7c819] text-black text-2xl flex items-center justify-center absolute right-3"
                  >
                    <ArrowRightToLineIcon />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {/* pagination */}
      </Swiper>
    </section>
  );
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductsList;
