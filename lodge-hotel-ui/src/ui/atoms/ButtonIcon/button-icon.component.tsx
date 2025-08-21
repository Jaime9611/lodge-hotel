import type { FC, ReactNode } from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}
const ButtonIcon: FC<ButtonProps> = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type="button"
    className="bg-none p-2 text-lg hover:bg-primary-100 border-none rounded-sm transition-all [&_svg]:w-7 [&_svg]:h-7 [&_svg]:text-prmary-600  "
  >
    {children}
  </button>
);

export default ButtonIcon;
