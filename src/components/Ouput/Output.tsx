"use client";

import styles from "./Output.module.css";
import { FC } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import LoadingText from "../LoadingText/LoadingText";

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
            <LoadingText />
          </>
        ) : !response ? (
          <div className={styles.output}>Waiting Audio to Summarize</div>
        ) : (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: response }}
          />
        )}
      </div>
    </>
  );
};
