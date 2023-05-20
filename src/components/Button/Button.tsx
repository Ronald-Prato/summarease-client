import { FC } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./contracts";

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
