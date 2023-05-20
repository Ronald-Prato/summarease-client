"use client";

import React from "react";
import { useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader, History, Output } from "@/components";

export default function Upload() {
  const [response, setResponse] = useState("");
  const showOutput = response ? true : false;
  const [isLoading, setIsLoading] = useState(false);
  const resetOutput = () => {
    setResponse("");
  };

  const handleUploadAudio = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://173.255.198.22:9000/api/upload-audio",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setResponse(data);
    } catch (err) {
      console.log("Hubo un error D: ", err);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.uploadSide}>
        {" "}
        <h1 className={styles.logo}>SummarEase</h1>
        <AudioUploader
          handleUploadAudio={handleUploadAudio}
          isLoading={isLoading}
        />
        <hr className={styles.line} />
        <History />
      </div>
      {!showOutput ? (
        <Output response={response} isLoading={isLoading} />
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
