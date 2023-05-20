import styles from "./Output.module.css";
import { FC } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

type OutputProps = {
  response: string;
  isLoading: boolean;
};

export const Output: FC<OutputProps> = ({ response, isLoading }) => {
  return (
    <>
      <div className={styles.outputContainer}>
        {isLoading ? (
          <>
            <LoadingSpinner color="black" />
            <h2>Transcribing</h2>
            <h3>Generating Summary</h3>
            <h4>Generating Bullet Points</h4>
          </>
        ) : !response ? (
          <div className={styles.output}>Waiting Audio to Summarize</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: response }} />
        )}
      </div>
    </>
  );
};
