import React from "react";
import Link from "next/link";

import { Facebook, Instagram, Twitter } from "lucide-react";
import { anton } from "@/lib/font";

const socials = [
  { icon: <Facebook className="w-5 h-5" />, path: "/" },
  { icon: <Instagram className="w-5 h-5" />, path: "/" },
  { icon: <Twitter className="w-5 h-5" />, path: "/" },
];

const Socials = ({ containerStyles, iconsStyles }) => {
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
