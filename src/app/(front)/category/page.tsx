import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { cn } from "@/lib/utils";
import React from "react";

type Param = string | string[] | undefined;
interface PageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const Page = async ({ searchParams }: PageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);
  console.log("category", category);

  const categoryData = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category,
  );

  return (
    <MaxWidthWrapper>
      <div
        className={cn(
          "h-[600px]  flex justify-start items-center relative overflow-hidden px-4",
          categoryData?.bgColor,
        )}
      >
        <div className=" w-full md:max-w-lg text-left ml-0 md:ml-16 z-50">
          <h1 className="text-3xl font-bold mb-4  text-white">
            {categoryData?.label}
          </h1>
          <p className=" mb-8 text-white font-bold text-6xl">
            {categoryData?.description}
          </p>
        </div>
        {/* image here */}
        <div className=" z-40 absolute -bottom-20 right-20 w-1/2 h-full hidden lg:block">
          <img
            src={categoryData?.img}
            alt={categoryData?.label}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <ProductReel
          title={categoryData?.label ?? "Browse high-quality assets"}
          query={{
            category,
            limit: 40,
            sort: sort === "desc" || sort === "asc" ? sort : undefined,
          }}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
