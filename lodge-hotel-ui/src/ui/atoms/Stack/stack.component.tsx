import type { FC, ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  columns: string;
}

const Stack: FC<StackProps> = ({ columns, children }) => {
  return (
    <div
      className={`grid items-center grid-cols-[${columns.replace(
        " ",
        "_"
      )}] gap-8 py-5 px-0 [&:has(button)]:flex [&:has(button)]:justify-end [&:has(button)]:gap-4`}
    >
      {children}
    </div>
  );
};

export default Stack;
