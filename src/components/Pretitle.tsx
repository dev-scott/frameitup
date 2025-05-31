import React from "react";
type Props = {
  text: string;
  center?: boolean;
};
const Pretitle = ({ text, center }: Props) => {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${center && "justify-center"}`}
    >
      <div className="w-2 h-2 bg-[#e7c819]"></div>
      <p className="font-secondary tracking-[3.2px] uppercase ">{text}</p>
      <div className="w-2 h-2 bg-[#e7c819]"></div>
    </div>
  );
};

export default Pretitle;
