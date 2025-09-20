import type { FC } from "react";

type FileInputProps = {
  register?: {};
  id?: string;
  accept: string;
};

const FileInput: FC<FileInputProps> = ({ register, id, accept }) => {
  return <input type="file" id={id} accept={accept} {...register} />;
};
export default FileInput;
