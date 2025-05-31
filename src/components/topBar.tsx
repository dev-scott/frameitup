import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Mail, Phone } from "lucide-react";
import Socials from "./Socials";
import { anton } from "@/lib/font";
import { cn } from "@/lib/utils";

const TopBar = () => {
  return (
    <section
      className="py-4 xl:h-16 xl:py-0 bg-gradient-to-t from-[#000000] to-[#000000] flex items-center"
      id="home"
    >
      <MaxWidthWrapper className="flex justify-start items-center">
        <div className="container pl-1  mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className=" hidden xl:flex  items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 items-center justify-center">
                  <Phone className="w-4 h-4  text-primary " />
                </div>
                <p className={cn("font-medium text-white", anton.className)}>
                  +237 654544544
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <p className={cn("font-medium text-white", anton.className)}>
                  frameitup@gmail.com
                </p>
              </div>
            </div>

            {/* socials */}
            <Socials
              containerStyles="flex item-center gap-8 mx-auto xl:mx-0"
              iconsStyles="text-white"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TopBar;
