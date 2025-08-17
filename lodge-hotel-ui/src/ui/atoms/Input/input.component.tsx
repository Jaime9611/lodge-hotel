import type { FC } from "react";

interface InputProps {
  register?: {};
  type: string;
  id?: string;
  value?: string;
  defaultValue?: string | number;
  onChange?: (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  disabled,
  defaultValue,
  register,
}) => (
  <input
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    type={type}
    id={id}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    disabled={disabled}
    {...register}
  />
);

export default Input;
