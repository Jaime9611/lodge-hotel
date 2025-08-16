import type { FC, ReactNode } from "react";

interface RowProps {
  children: ReactNode;
  type?: "horizontal" | "vertical";
}

const Row: FC<RowProps> = ({ type = "horizontal", children }) => {
  const horizontalStyles = "justify-between items-center";
  const verticalStyles = "flex-col gap-6";

  return (
    <div
      className={`flex ${
        type === "horizontal" ? horizontalStyles : verticalStyles
      }`}
    >
      {children}
    </div>
  );
};

export default Row;
