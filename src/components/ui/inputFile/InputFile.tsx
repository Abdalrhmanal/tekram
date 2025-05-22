"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { CustomButton } from "../button";

interface InputFileProps {
  children?: React.ReactNode;
  label: string;
  name: string;
  accept?: string;
  currentFile?: string | null;
  maxSizeInMB?: number;
  onFileChange?: (file: File | null) => void;
  onClearFile?: () => void;
  isLoading?: boolean;
}

const InputFile: React.FC<InputFileProps> = ({
  children,
  label,
  name,
  accept,
  currentFile,
  maxSizeInMB = 5, // Default max size of 5MB
  onFileChange,
  onClearFile,
  isLoading = false,
}) => {
  const [fileName, setFileName] = useState<string>("No File Chosen");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update filename when external file changes
  useEffect(() => {
    if (currentFile) {
      // Extract filename from path
      const parts = currentFile.split("/");
      const name = parts[parts.length - 1];
      setFileName(name || "Current Image");
    } else {
      setFileName("No File Chosen");
    }
  }, [currentFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setError(null);

    if (file) {
      // Check file size
      if (maxSizeInMB && file.size > maxSizeInMB * 1024 * 1024) {
        setError(`File size exceeds maximum of ${maxSizeInMB}MB`);
        return;
      }

      setFileName(file.name);
      if (onFileChange) {
        onFileChange(file);
      }
    } else {
      setFileName("No File Chosen");
      if (onFileChange) {
        onFileChange(null);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileName("No File Chosen");
    setError(null);
    if (onClearFile) {
      onClearFile();
    }
  };

  const isImage = currentFile?.match(/\.(jpeg|jpg|gif|png)$/i) !== null;

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
        {label}
      </Typography>

      {/* Display current image if it exists and is an image */}
      {currentFile && isImage && (
        <Box mb={2}>
          <img
            src={currentFile}
            alt="Current file"
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              objectFit: "contain",
              border: "1px solid #eee",
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CustomButton
          variant="outlined"
          color="primary.main"
          onClick={handleButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Choose File"
          )}
        </CustomButton>

        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          accept={accept}
          name={name}
          onChange={handleFileChange}
        />

        <Typography variant="body2" color="text.primary">
          {fileName}
        </Typography>

        {/* Clear button */}
        {(fileName !== "No File Chosen" || currentFile) && !isLoading && (
          <CustomButton
            variant="outlined"
            color="error.main"
            onClick={handleClearFile}
            sx={{ ml: 1 }}
          >
            Clear
          </CustomButton>
        )}
      </Box>

      {/* Error message */}
      {error && (
        <Typography variant="body2" color="error.main" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default InputFile;
