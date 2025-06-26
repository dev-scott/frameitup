"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-[100%]   min-h-screen  flex justify-center items-center  ">
      <div className="  flex flex-col justify-center items-center gap-y-5">
        <h2 className="text-5xl font-bold font-serif">404</h2>
        <p className="text-center">
          The page you are looking for might have been removed had its <br />{" "}
          name changed or is temporarily unavailable
        </p>
        <Button
          className=" flex items-center w-[210px] h-[54px] justify-center gap-2 group py-[10px] pl-[10px] pr-[10px] bg-secondary hover:bg-[#e7c819] text-white hover:text-white rounded-[2px]"
          variant={"ghost"}
          onClick={() => router.push("/")}
        >
          <div className="flex-1 text-center tracking-[1.2px]">Home Page</div>
        </Button>
      </div>
    </div>
  );
}
