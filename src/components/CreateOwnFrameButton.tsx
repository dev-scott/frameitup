// src/components/CreateOwnFrameButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const CreateOwnFrameButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/configure/upload");
  };

  return (
    <Button
      className="gap-1.5 relative border border-gray-700 text-gray-700 rounded-sm cursor-pointer"
      variant="ghost"
      onClick={handleClick}
    >
      Create your own frame
    </Button>
  );
};

export default CreateOwnFrameButton;
