import type { FC, ReactElement, ReactNode } from "react";

// ---------- CHILDREN COMPONENTS -----
interface ListProps {
  children: ReactNode;
}
const List: FC<ListProps> = ({ children }) => (
  <ul className="flex items-center gap-2 justify-end">{children}</ul>
);
interface ButtonProps {
  icon: ReactElement;
  onClick?: () => void;
  displayText: string;
  disabled?: boolean;
}
const Button: FC<ButtonProps> = ({ icon, onClick, displayText, disabled }) => (
  <li className="relative group">
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="bg-none p-2 text-lg hover:bg-primary-100 border border-gray-300 rounded-md [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-gray-400 [&_svg]:transition-all"
    >
      {icon}
    </button>
    <div className="absolute hidden group-hover:block -left-1/2 -top-2 transform -translate-x-1/6 -translate-y-full w-24 px-2 py-1 bg-gray-500 rounded-lg text-center text-white text-xs after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-500">
      {displayText}
    </div>
  </li>
);

// ---------- PARENT COMPONENT -----

interface StackProps {
  children: ReactNode;
}

interface IconStackComponent extends FC<StackProps> {
  Button: FC<ButtonProps>;
  List: FC<ListProps>;
}

const IconStackMenu: IconStackComponent = ({ children }) => {
  return <div>{children}</div>;
};

IconStackMenu.Button = Button;
IconStackMenu.List = List;

export default IconStackMenu;
