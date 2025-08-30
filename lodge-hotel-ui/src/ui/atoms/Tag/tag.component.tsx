import type { FC, ReactNode } from "react";

interface TagProps {
  type: "blue" | "green" | "silver";
  children: ReactNode;
}

const Tag: FC<TagProps> = ({ type, children }) => {
  const variation = {
    blue: "text-blue-700 bg-blue-100",
    green: "text-green-700 bg-green-100",
    silver: "text-slate-700 bg-slate-100",
  };
  return (
    <span
      className={`w-fit uppercase text-md font-semibold py-1.5 px-5 rounded-[100px] ${variation[type]}`}
    >
      {children}
    </span>
  );
};
export default Tag;
