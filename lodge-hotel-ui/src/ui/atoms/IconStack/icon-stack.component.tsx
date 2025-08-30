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
}
const Button: FC<ButtonProps> = ({ icon, onClick, displayText }) => (
  <li className="relative group">
    <button
      onClick={onClick}
      type="button"
      className="bg-none p-2 text-lg hover:bg-primary-100 border border-gray-300 rounded-md [&_svg]:w-4 [&_svg]:h-4 [&_svg]:text-gray-400 [&_svg]:transition-all"
    >
      {icon}
    </button>
    <div className="absolute w-24 bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-primary-600 text-white text-xs text-center rounded px-2 py-2">
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
