"use client";

import React from "react";
import Image from "next/image";
import { useState, FC } from "react";
import styles from "./AudioUploader.module.css";
import CheckIcon from "../../assets/checkIcon.svg";
import { NO_FILE_SELECTED_COPY } from "@/constants";
import { Button, LoadingSpinner } from "@/components";
import DownloadIcon from "../../assets/downloadIcon.svg";

type UploaderProps = {
  handleUploadAudio: (formData: FormData) => void;
  resetOutput: () => void;
  isLoading: boolean;
  response: string;
};

export const AudioUploader: FC<UploaderProps> = ({
  handleUploadAudio,
  isLoading,
  response,
  resetOutput,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [filename, setFilename] = useState(NO_FILE_SELECTED_COPY);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setFilename(file ? file.name : NO_FILE_SELECTED_COPY);
  }

  function handleUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("uid", "pepito123");
    formData.append("file", selectedFile);
    formData.append("fileName", selectedFile.name);

    if (response) {
      resetOutput();
      setSelectedFile(null);
      setFilename(NO_FILE_SELECTED_COPY);
    } else {
      handleUploadAudio(formData);
    }
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
        }
        ${!selectedFile ? styles.withoutButton : ""}
        `} // Add class based on dragging state
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
              {!isLoading ? (
                response ? (
                  "Make new summary"
                ) : (
                  "Summarize"
                )
              ) : (
                <LoadingSpinner color="white" />
              )}
            </Button>
          </div>
        )}
      </div>
    </label>
  );
};
