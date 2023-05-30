import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div>
      <nav className={styles.headerContainer}>
        <h1 className={styles.logo}>ConsizeGPT</h1>
        <h2 className={styles.login}></h2>
      </nav>
    </div>
  );
};
