"use client";

import Image from "next/image";
import { Button } from "@/components";

import styles from "./landing.module.css";
import Astro from "../../assets/astronaut1.png";
import GoogleIcon from "../../assets/googleIcon.svg";
import { useAuth } from "@/hooks/useAuth";
import { usePersistence } from "@/hooks/usePersistence";

// exportar como default
export default function Landing() {
  const { handleGoogleSignup } = useAuth();
  usePersistence({ isLoggedPath: "/upload" });

  return (
    <div className={styles.landingContainer}>
      <div className={styles.imageSide}>
        <Image src={Astro} alt="Cute Astronaut" className={styles.astroImage} />
      </div>
      <div className={styles.textSide}>
        <p>
          {" "}
          Obtén la <b> transcripción </b> con <b>puntos clave</b> y crea{" "}
          <strong>resúmenes</strong> de tus <b>audios</b>, usando el poder de la{" "}
          <b>IA</b>.
        </p>
        <Button onClick={handleGoogleSignup}>
          <Image
            className={styles.google}
            src={GoogleIcon}
            alt="logo de google"
            width={25}
          />{" "}
          Ingresa
        </Button>
      </div>
    </div>
  );
}
