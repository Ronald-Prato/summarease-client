import styles from "./upload.module.css";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.uploadLayout}>{children}</div>;
}
