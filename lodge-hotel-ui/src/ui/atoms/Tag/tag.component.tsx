import type { FC, ReactNode } from "react";

const variation = {
  blue: "text-blue-700 bg-blue-100",
  green: "text-green-700 bg-green-100",
  silver: "text-silver-700 bg-silver-100",
};

interface TagProps {
  type: string;
  children: ReactNode;
}

const Tag: FC<TagProps> = ({ type, children }) => {
  const variationStyle = variation[type];

  return (
    <span
      className={`w-fit uppercase text-lg font-semibold py-1.5 px-5 rounded-[100px] ${variationStyle}`}
    >
      {children}
    </span>
  );
};
export default Tag;
