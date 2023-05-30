"use client";

import React, { useEffect, useState } from "react";
import { setDoc, doc, onSnapshot } from "firebase/firestore";

import { db } from "@/firebase-init";
import { getRandomId } from "@/utils/getRandomId";
import { RootState, useAppSelector } from "@/store";
import { usePersistence } from "@/hooks/usePersistence";
import { AudioUploader, History, Output } from "@/components";

import styles from "./upload.module.css";

export default function Upload() {
  const [response, setResponse] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { isSingedIn } = usePersistence({ isNotLoggedPath: "/" });
  const uid = useAppSelector((state: RootState) => state.user.uid);

  const resetOutput = () => {
    setResponse("");
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
    const data = {
      uid,
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

    try {
      const newDocumentId = await createSummaryInFirestate(
        formData.get("fileName") as string
      );

      if (!newDocumentId) {
        setIsLoading(false);
        return;
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
  };

  if (!isSingedIn) {
    return <div>Validando Sesión...</div>;
  }

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
