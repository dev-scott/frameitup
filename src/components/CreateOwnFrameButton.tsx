"use client";
import React from "react";
import { Button } from "./ui/button";
import { Ban } from "lucide-react";

const CreateOwnFrameButton = () => {
  const countryCode = "237";

  const phoneNumber = "689502147";

  const prefilledMessage =
    "Bonjour, je souhaite commander un cadre personnalisé.";

  const openWhatsap = () => {
    const whatsappUrl = "https://wa.me/";
    const encodedMessage = encodeURIComponent(prefilledMessage);

    return `${whatsappUrl}${countryCode}${phoneNumber}?text=${encodedMessage}`;
  };

  const handleOpenWhatsapp = () => {
    window.open(openWhatsap(), "_blank");
  };

  return (
    // <Button
    //   className=" block  lg:hidden gap-1.5 relative  border hover:border-secondary border-gray-700 text-gray-900  rounded-sm  cursor-pointer hover:bg-secondary hover:text-white "
    //   variant={"ghost"}
    //   // disabled={true}
    //   onClick={handleOpenWhatsapp}
    // >
    //   Create your own frame
    //   {/* <Ban
    //     className="absolute -top-[5px] -right-[8px] text-red-500 "
    //     size={30}
    //   /> */}
    // </Button>

    <Button
      className="gap-1.5 relative  border  border-gray-700 text-gray-700  rounded-sm  cursor-pointer   "
      variant={"ghost"}
      onClick={handleOpenWhatsapp}
    >
      Create your own frame
    </Button>
  );
};

export default CreateOwnFrameButton;
