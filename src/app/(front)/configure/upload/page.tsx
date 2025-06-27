"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Page = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  return (
    <div className="w-full  bg-yellow-600  h-fit">
      <div
        className={cn(
          "h-[700px] bg-emerald-600 relative flex-1 roundedxl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl  flex justify-center items-center",
          {
            "ring-blue-900/25 bg-blue-900/10": isDragOver,
          },
        )}
      >
        <div className="relative flex flex-1 flex-col items-center justify-center w-full">
            
        </div>
      </div>
    </div>
  );
};

export default Page;
