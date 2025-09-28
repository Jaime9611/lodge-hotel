import type { FC, ReactNode } from "react";

interface StatProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  color: string;
}

const Stat: FC<StatProps> = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white border border-solid border-gray-100 rounded-md p-6 grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-2">
      <div
        className={`row-span-full aspect-[1]  rounded-full flex items-center justify-center bg-${color}-100 [&_svg]:w-12 [&_svg]:h-12 [&_svg]:text-${color}-700 `}
        color={color}
      >
        {icon}
      </div>
      <h5 className="self-end text-xl uppercase font-semibold text-gray-500 tracking-tight">
        {title}
      </h5>
      <p className="text-4xl font-medium leading-none">{value}</p>
    </div>
  );
};

export default Stat;
