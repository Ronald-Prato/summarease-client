import Landing from "./landing/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Landing />
    </main>
  );
}
