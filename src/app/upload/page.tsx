"use client";

import React, { useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader, History, Output } from "@/components";

export default function Upload() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const resetOutput = () => {
    setResponse("");
  };

  const handleUploadAudio = async (formData: FormData) => {
    setShowOutput(true);
    setIsLoading(true);

    try {
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("data", data.summary);
      setResponse(data.summary);
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

      {showOutput ? (
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
