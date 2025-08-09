import type { FC, ReactNode } from "react";

const sizes = {
  small: "text-xl px-1.5 py-3 font-semibold text-center",
  medium: "text-xl px-2 py-4 font-medium",
  large: "text-large px-3 py-5 font-medium",
};

const variations = {
  primary: "text-gray-50 bg-blue-600 hover:bg-blue-700",
  secondary: "",
  danger: "",
};

const getSize = (key: keyof typeof sizes | undefined) =>
  key ? sizes[key] : "";

const getVariation = (key: keyof typeof variations | undefined) =>
  key ? variations[key] : variations["primary"];

type ButtonProps = {
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: ReactNode;
};

const Button: FC<ButtonProps> = ({ variation, size, disabled, children }) => {
  return (
    <button
      className={`border-none rounded-md shadow-xs hover:cursor-pointer ${getSize(
        size
      )} ${getVariation(variation)}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
