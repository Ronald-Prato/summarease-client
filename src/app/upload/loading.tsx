import styles from "./upload.module.css";
export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <p>Cargando...</p>;
    </div>
  );
}
