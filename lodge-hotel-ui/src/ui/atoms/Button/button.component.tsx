import type { FC, ReactNode } from "react";

const sizes = {
  small: "text-large px-2 py-3 font-semibold text-center",
  medium: "text-large px-2 py-4 font-medium",
  large: "text-large px-3 py-5 font-medium",
};

const variations = {
  primary: "text-gray-50 bg-primary hover:bg-primary-700",
  secondary:
    "text-gray-600 bg-white border border-solid border-gray-200 hover:bg-gray-50",
  danger: "text-red-100 bg-red-600 hover:bg-red-700",
};

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({
  type = "button",
  variation = "primary",
  size = "small",
  disabled,
  onClick,
  children,
}) => {
  const sizeStyle = size ? sizes[size] : "";

  const variationStyle = variations[variation];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-none rounded-md shadow-xs hover:cursor-pointer ${sizeStyle} ${variationStyle}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
