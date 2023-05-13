import { FC } from "react";
import { ButtonProps } from "./contracts";
import styles from "./Header.module.css";

export const Button: FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.buttonContainer}
    >
      {children}
    </button>
  );
};
