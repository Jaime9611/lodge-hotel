import type { FC, JSX, ReactNode } from "react";

interface DataItemProps {
  icon: JSX.Element;
  label: string;
  children: ReactNode;
}

const DataItem: FC<DataItemProps> = ({ icon, label, children }) => (
  <div className="flex items-center gap-6 py-3 px-0">
    <span className="flex items-center gap-3 font-medium [&_svg]:h-8 [&_svg]:w-8 [&_svg]:text-primary-600">
      {icon}
      <span>{label}</span>
    </span>
    {children}
  </div>
);

export default DataItem;
