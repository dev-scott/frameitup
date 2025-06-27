import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <MaxWidthWrapper className=" h-[60vh] mt-10  flex justify-center items-center py-5">
      <div className=" gap-y-6 flex justify-center items-center flex-col ">
        <span className="font-light text-center text-[14px] text-secondary">
          Earn More. Become a Pillar of Art with FrameItUp !
        </span>
        <h1 className="text-center font-semibold text-4xl ">
          Join the FrameItUp Agent Team and Earn by Sharing Beauty..
        </h1>
        <p className="text-center  ">
          As a FrameItUp agent, your role will be to showcase our unique frame
          collections on social media, blogs, forums,
          <br /> and to your personal network. You&apos;ll be an ambassador for
          our brand, presenting the quality, elegance and diversity <br /> of
          our products to an audience eager to beautify their homes.
        </p>
        <Link target="_blank" href="https://forms.gle/k9scR3Q7YSPaRoUc9">
          <Button
            className="px-6 py-3 text-white bg-secondary hover:text-secondary hover:bg-none hover:border hover:border-2px hover:border-secondary"
            variant="ghost"
          >
            Click here to register
          </Button>
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
