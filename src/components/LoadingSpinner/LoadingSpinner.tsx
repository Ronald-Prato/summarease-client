import styles from "./LoadingSpinner.module.css";
import { FC } from "react";

type SpinnerProps = {
  color: "white" | "black";
};

export const LoadingSpinner: FC<SpinnerProps> = ({ color }) => {
  const spinnerStyle = {
    "--spinner-background": color === "white" ? "whitesmoke" : "black",
  } as React.CSSProperties;

  return (
    <div className={styles.ldsEllipsis} style={spinnerStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
