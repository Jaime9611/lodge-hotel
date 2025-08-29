import type { FC, ReactNode } from "react";

interface StackedProps {
  children: ReactNode;
}

const Stacked: FC<StackedProps> = ({ children }) => {
  return (
    <div
      className={`flex flex-col gap-1 [&_span:first-child]:font-medium [&_span:last-child]:text-gray-500 [&_span:first-child]:text-xl`}
    >
      {children}
    </div>
  );
};

export default Stacked;
