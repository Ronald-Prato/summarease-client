import { FC } from "react";
import { HeaderProps } from "./contracts";
import styles from "./Header.module.css";

export const Header: FC<HeaderProps> = () => {
  return <header className={styles.headerContainer}></header>;
};
