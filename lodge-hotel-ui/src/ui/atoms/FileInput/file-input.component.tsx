import type { FC } from "react";

type FileInputProps = {
  register?: {};

  id?: string;
  value?: string;
  defaultValue?: string | number;
  onChange?: (() => void) | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  disabled?: boolean;
};
const FileInput: FC<FileInputProps> = ({
  register,
  id,
  value,
  defaultValue,
  disabled,
}) => {
  return (
    <input
      type="file"
      id={id}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      {...register}
    />
  );
};
export default FileInput;
