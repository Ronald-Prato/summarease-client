import { FC, useEffect, useState } from "react";
import styles from "./LoadingText.module.css";

export const LoadingText: FC = () => {
  const texts = [
    "Analizando Audio",
    "Transcribiendo Audio",
    "Generando Resumen",
    "Creando Bullet Points",
    "Buscando Links de Referencia",
    "Convirtiendo ondas en bits",
    "Entrenando a los hámsters generadores de resúmenes",
    "Destilando la esencia del audio en palabras",
    "Convocando a los enlaces mágicos de referencia",
    "Enviando el resumen por lechuza",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [texts.length]);

  return (
    <div className={styles.textContainer}>
      <h2 key={texts[currentIndex]} className={styles.fadeInOut}>
        {texts[currentIndex]}
      </h2>
    </div>
  );
};

export default LoadingText;
