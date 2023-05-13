import { Header } from "@/components";
import styles from "./landing.module.css";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.landingLayout}>
      <Header />
      {children}
    </div>
  );
}
