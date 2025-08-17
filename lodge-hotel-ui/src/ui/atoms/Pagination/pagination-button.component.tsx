import type { FC, ReactNode } from "react";
import styles from "./button.module.css";

interface PaginationButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}
const PaginationButton: FC<PaginationButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.btn}
    >
      {children}
    </button>
  );
};
export default PaginationButton;
