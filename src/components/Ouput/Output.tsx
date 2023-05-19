import styles from "./Output.module.css";
import { FC } from "react";

type OutputProps = {
  response: string;
};

export const Output: FC<OutputProps> = ({ response }) => {
  return (
    <>
      <div className={styles.outputContainer}>
        {!response ? (
          "Esperando Resumen"
        ) : (
          <div dangerouslySetInnerHTML={{ __html: String(response) }} />
        )}
      </div>
    </>
  );
};
