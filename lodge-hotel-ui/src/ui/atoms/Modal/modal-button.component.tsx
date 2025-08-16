import { type FC, type ReactNode } from "react";

interface ModalButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const ModalButton: FC<ModalButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-none border-none p-1.5 rounded-sm translate-x-3 transition-all absolute top-4 right-6 hover:bg-gray-100 [&_svg]:w-8 [&_svg]:h-8 fill-gray-500 [&_svg]:stroke-gray-500 [&_svg]:text-gray-500"
    >
      {children}
    </button>
  );
};

export default ModalButton;
