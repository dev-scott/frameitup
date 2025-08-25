import React from "react";
import Link from "next/link";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { anton } from "@/lib/font";

const socials = [
  { icon: <Facebook className="w-5 h-5" />, path: "/" },
  { icon: <Instagram className="w-5 h-5" />, path: "https://www.instagram.com/frameitup05/" },
  { icon: <Twitter className="w-5 h-5" />, path: "https://x.com/_Frameitup" },
];
interface Props {
  containerStyles?: string;
  iconsStyles?: string;
}
const Socials = ({ containerStyles, iconsStyles }: Props) => {
  return (
    <div className={`${containerStyles}`}>
      {socials.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.path}
            className={`${iconsStyles} ${anton.className}`}
            target="_blank"
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
