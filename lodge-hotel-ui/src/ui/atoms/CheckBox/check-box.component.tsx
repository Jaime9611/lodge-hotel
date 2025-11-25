import type { FC, ReactNode } from "react";

import styles from "./check-box.module.css";

interface CheckBoxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  id: string;
  children: ReactNode;
  value?: boolean;
}

const CheckBox: FC<CheckBoxProps> = ({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        // className="w-[100px] border border-blue-100"
        // style={{ width: 25, height: 25 }}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </div>
  );
};

export default CheckBox;
