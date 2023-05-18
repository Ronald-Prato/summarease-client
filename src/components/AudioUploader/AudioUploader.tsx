"use client";

import React from "react";
import { useState } from "react";
import styles from "./AudioUploader.module.css";
import { NO_FILE_SELECTED_COPY } from "@/constants";
import DownloadIcon from "../../assets/downloadIcon.svg";
import Image from "next/image";
import { LoadingSpinner } from "@/components";

export const AudioUploader = ({
  handleResponse,
}: {
  handleResponse: (response: string) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState(NO_FILE_SELECTED_COPY);
  const [isDragging, setIsDragging] = useState(false); // Add state for dragging

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    setFilename(file ? file.name : NO_FILE_SELECTED_COPY);
  }

  function handleUpload() {
    if (!selectedFile) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("audio", selectedFile);

    fetch("http://173.255.198.22:9000/api/upload-audio", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => handleResponse(data.response))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

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
        {isLoading ? (
          <LoadingSpinner /> // Render the LoadingSpinner component if isLoading is true
        ) : (
          <>
            <Image src={DownloadIcon} alt="Download Icon" />
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
          </>
        )}
      </div>
    </label>
  );
};
