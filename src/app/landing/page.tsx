import styles from "./landing.module.css";
import Astro from "../../assets/astronaut1.png";
import Image from "next/image";
import { Button } from "@/components";
// exportar como default
export default function Landing() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.imageSide}>
        <Image src={Astro} alt="Cute Astronaut" className={styles.astroImage} />
      </div>
      <div className={styles.textSide}>
        <p>
          Obtén la <b> transcripción </b> con <b>puntos clave</b> y{" "}
          <p>
            Crea <strong>resúmenes</strong> de tus <b>audios</b>.
          </p>
          <b> links de referencia</b> usando el poder de la <b>IA</b>.
        </p>
        <Button>COMIENZA</Button>
      </div>
    </div>
  );
}
