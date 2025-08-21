import type { FC } from "react";

interface TextAreaProps {
  register?: {};
  id?: string;
  defaultValue?: string | number;
  disabled?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  disabled,
  defaultValue,
  register,
}) => (
  <textarea
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    id={id}
    defaultValue={defaultValue}
    disabled={disabled}
    {...register}
  />
);

export default TextArea;
