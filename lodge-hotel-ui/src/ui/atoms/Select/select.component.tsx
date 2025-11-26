import type { FC } from "react";

interface SelectProps {
  register?: {};
  id?: string;
  value?: string;
  defaultValue?: string | number;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  defaultValue,
  id,
  disabled,
  register,
}) => {
  return (
    <select
      id={id}
      className="text-md px-3 py-3 border border-solid border-gray-100 rounded-sm bg-white font-medium shadow-sm"
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      data-testid="select-component"
      {...register}
    >
      {options.map((option) => (
        <option key={`${id}-option-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
