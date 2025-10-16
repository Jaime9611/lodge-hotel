import type { FC } from "react";

import styles from "./file-input.module.css";

type FileInputProps = {
  register?: {};
  id?: string;
  accept: string;
};

const FileInput: FC<FileInputProps> = ({ register, id, accept }) => {
  return (
    <input
      data-testid="file-input"
      className={styles.fileInput}
      type="file"
      id={id}
      accept={accept}
      {...register}
    />
  );
};
export default FileInput;
