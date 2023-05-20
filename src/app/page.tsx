import { Header } from "@/components";
import Landing from "./landing/page";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Landing />
    </main>
  );
}
