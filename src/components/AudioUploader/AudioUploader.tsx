"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Button, LoadingSpinner } from "@/components";
import CheckIcon from "../../assets/checkIcon.svg";
import styles from "./AudioUploader.module.css";
import { NO_FILE_SELECTED_COPY } from "@/constants";
import DownloadIcon from "../../assets/downloadIcon.svg";

export const AudioUploader = ({
  handleUploadAudio,
  isLoading,
}: {
  handleUploadAudio: (formData: FormData) => void;
  isLoading: boolean;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [filename, setFilename] = useState(NO_FILE_SELECTED_COPY);
  const [isDragging, setIsDragging] = useState(false); // Add state for dragging

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setFilename(file ? file.name : NO_FILE_SELECTED_COPY);
  }

  function handleUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("audio", selectedFile);
    handleUploadAudio(formData);
  }
  // HANDLEDRAG FUNCTIONS
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setFilename(file ? file.name : NO_FILE_SELECTED_COPY);
    setIsDragging(false); // Reset dragging state
  }
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true); // Set dragging state
  }
  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }
  function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";
  }
  function handleDragEnd(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.clearData();
    setIsDragging(false); // Reset dragging state
  }

  return (
    <label htmlFor="file-upload-input">
      <div
        className={`${styles.dropArea} ${
          isDragging ? styles.dragging : styles.notDragging
        }`} // Add class based on dragging state
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave}
      >
        {!selectedFile ? (
          <div className={styles.uploaderContainer}>
            <Image
              src={DownloadIcon}
              alt="Download Icon"
              className={styles.icon}
            />
            <h3>Upload your Audio</h3>
            <h5>(Max 10 MB)</h5>
            <input
              id="file-upload-input"
              type="file"
              accept=".mp3,.wav"
              onChange={handleFileSelect}
              className={styles.hidden}
            />
            <p>{filename}</p>
          </div>
        ) : (
          <div className={styles.uploaderContainer}>
            <Image src={CheckIcon} alt="Check icon" className={styles.icon} />
            <p>{filename}</p>
            <h3>Uploaded</h3>
            <Button onClick={handleUpload} disabled={isLoading}>
              {!isLoading ? "Summarize" : <LoadingSpinner />}
            </Button>
          </div>
        )}
      </div>
    </label>
  );
};
