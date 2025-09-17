import type { FC } from "react";

interface InputProps {
  register?: {};
  type: string;
  id?: string;
  value?: string;
  defaultValue?: string | number;
  onChange?: (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  disabled?: boolean;
  readOnly?: boolean;
}

const Input: FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  disabled,
  defaultValue,
  register,
  readOnly,
}) => (
  <input
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    type={type}
    id={id}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    disabled={disabled}
    readOnly={readOnly}
    {...register}
  />
);

export default Input;
