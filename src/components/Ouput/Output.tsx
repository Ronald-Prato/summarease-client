"use client";

import styles from "./Output.module.css";
import { FC, useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import LoadingText from "../LoadingText/LoadingText";

type OutputProps = {
  currentStep: 0 | 1;
  response: string;
  isLoading: boolean;
};

export const Output: FC<OutputProps> = ({
  response,
  isLoading,
  currentStep,
}) => {
  return (
    <>
      <div className={styles.outputContainer}>
        {isLoading ? (
          <>
            <LoadingSpinner color="black" />
            <LoadingText currentIndex={currentStep} />
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
