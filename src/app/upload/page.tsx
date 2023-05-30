"use client";

import React, { useEffect, useState } from "react";
import styles from "./upload.module.css";
import { AudioUploader, History, Output } from "@/components";

import { db } from "@/firebase-init";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { getRandomId } from "@/utils/getRandomId";
import { useOggToMp3Converter } from "@/hooks/useMp3Convertion";

type StatesType = 0 | 1;

export default function Upload() {
  const uid = "pepito123";
  const [response, setResponse] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [currentState, setCurrentState] = useState<StatesType>(0);

  const { convertOggToMp3 } = useOggToMp3Converter();

  const resetOutput = () => {
    setResponse("");
    setCurrentState(0);
  };

  useEffect(() => {
    if (!documentId) return;

    const unsub = onSnapshot(
      doc(db, "users", uid, "summaries", documentId),
      (doc) => {
        const data = doc.data();
        console.log("Data in subscription", data);
        if (data?.summary) {
          setResponse(data.summary);
          setIsLoading(false);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [documentId]);

  const createSummaryInFirestate = async (audioName: string) => {
    const id = getRandomId(20);
    const uid = "pepito123";
    const data = {
      uid: "pepito123",
      audioName,
      summary: "",
      transcription: "",
      createdAt: new Date(),
      finishedAt: null,
    };

    try {
      await setDoc(doc(db, "users", uid, "summaries", id), data);
      console.log("Summary written in db");
      return id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return null;
    }
  };

  const handleUploadAudio = async (formData: FormData) => {
    setShowOutput(true);
    setIsLoading(true);

    const file = formData.get("file") as File;

    try {
      const newDocumentId = await createSummaryInFirestate(
        formData.get("fileName") as string
      );

      if (!newDocumentId) {
        setIsLoading(false);
        return;
      }

      if (file.type.includes("ogg")) {
        const mp3File = await convertOggToMp3(file);
        formData.set("file", mp3File);
        formData.append("fileName", mp3File.name);
      }

      setDocumentId(newDocumentId);
      formData.append("documentId", newDocumentId);
      const response = await fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data === "ok";
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
