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
          <div className={styles.output}>"Esperando Resumen"</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: response }} />
        )}
      </div>
    </>
  );
};
