"use client";

import React from "react";
import { useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader, History, Output } from "@/components";

export default function Upload() {
  const [response, setResponse] = useState("");
  const showOutput = response ? true : false;
  const resetOutput = () => {
    setResponse("");
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadSide}>
        {" "}
        <h1 className={styles.logo}>SummarEase</h1>
        <AudioUploader
          handleResponse={(res) => {
            setResponse(res);
          }}
        />
        <hr className={styles.line} />
        <History />
      </div>
      {showOutput ? (
        <Output response={response} />
      ) : (
        <div className={styles.outputContainer}>
          <div className={styles.output}>
            Upload an audio to get your summary.
          </div>
        </div>
      )}
    </div>
  );
}
