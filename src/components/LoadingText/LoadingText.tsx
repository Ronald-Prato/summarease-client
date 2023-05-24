import { FC } from "react";
import styles from "./LoadingText.module.css";

export const LoadingText: FC<{ currentIndex: number }> = ({ currentIndex }) => {
  const texts = ["Transcribiendo audio", "Generando Resumen"];

  return (
    <div className={styles.textContainer}>
      <h2 key={texts[currentIndex]} className={styles.fadeInOut}>
        {texts[currentIndex]}
      </h2>
    </div>
  );
};

export default LoadingText;
