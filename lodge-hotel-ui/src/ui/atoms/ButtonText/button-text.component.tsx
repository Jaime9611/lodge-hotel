import type { FC, ReactNode } from "react";

interface ButtonTextProps {
  onClick: () => void;
  children: ReactNode;
}

const ButtonText: FC<ButtonTextProps> = ({ onClick, children }) => {
  return (
    <button
      className={`text-primary-600 font-medium text-center 
         transition-all bg-none border-none rounded-sm 
        hover:text-primary-700 active:text-primary-700`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonText;
