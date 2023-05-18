"use client";

import React from "react";
import { useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader } from "@/components";
import { History } from "@/components/History";

export default function Upload() {
  const [response, setResponse] = useState("");

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

      <div className={styles.summarySide}>
        <div className={styles.summary}>
          <p>Upload an audio to get your summary</p>
        </div>
      </div>
    </div>
  );
}
