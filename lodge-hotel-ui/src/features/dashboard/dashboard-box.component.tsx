import type { FC, ReactNode } from "react";

interface DashboardBoxProps {
  children: ReactNode;
  additionalStyles?: string;
}

const DashboardBox: FC<DashboardBoxProps> = ({
  children,
  additionalStyles = "",
}) => {
  return (
    <div
      className={`bg-white border border-solid border-gray-100 rounded-md p-12 flex flex-col gap-8 ${additionalStyles}`}
    >
      {children}
    </div>
  );
};

export default DashboardBox;
