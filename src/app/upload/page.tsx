"use client";

import React, { useEffect, useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader, History, Output } from "@/components";
import { useSocketIO } from "@/hooks/useSocketIO";

type StatesType = 0 | 1;

export default function Upload() {
  const { socket } = useSocketIO();

  const [socketId, setSocketId] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [currentState, setCurrentState] = useState<StatesType>(0);

  useEffect(() => {
    if (socket) {
      socket.on("socket-id", (newSocketId) => {
        console.log("Your socket id is ", newSocketId);
        setSocketId(newSocketId);
      });

      socket.on("status-changed", (newStatus: StatesType) => {
        setCurrentState(newStatus);
      });
    }
  }, [socket]);

  const resetOutput = () => {
    setResponse("");
    setCurrentState(0);
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
        <h1 className={styles.logo}>ConsizeGPT</h1>
        <AudioUploader
          handleUploadAudio={handleUploadAudio}
          isLoading={isLoading}
          socketId={socketId}
          resetOutput={resetOutput}
          response={response}
        />
        <hr className={styles.line} />
        <History />
      </div>

      {showOutput ? (
        <Output response={response} isLoading={isLoading} />
      ) : (
        <div className={styles.outputContainer}>
          <div className={styles.output}>
            Sube un audio para obtener el resumen.
          </div>
        </div>
      )}
    </div>
  );
}
