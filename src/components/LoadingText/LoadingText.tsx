import { FC, useEffect, useState } from "react";
import styles from "./LoadingText.module.css";

export const LoadingText: FC = () => {
  const texts = [
    "Analizando Audio",
    "Transcribiendo Audio",
    "Generando Resumen",
    "Creando Bullet Points",
    "Buscando Links de Referencia",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change the duration of each text here (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [texts.length]);

  return (
    <div className={styles.textContainer}>
      <div className={styles.textsWrapper}>
        {texts.map((text, index) => (
          <h2
            key={index}
            className={index === currentIndex ? styles.fadeIn : styles.fadeOut}
          >
            {text}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default LoadingText;
