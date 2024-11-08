"use client";

import React, { useState } from "react";
import axios from "axios";
import { FileUpload } from "@/fileupload/file-upload";

// Define the type for each uploaded file
interface UploadedFile {
  publicId: string;
  url: string;
}

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadedFile[] | null>(null); // Define the correct type

  // Handle file selection
  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  // Handle file submission using Axios
  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("No files selected!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    // Append each file to formData
    files.forEach((file) => {
      formData.append("file", file); // Make sure the key matches the API expectation
    });

    try {
      // Send POST request to your API using Axios
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Handle success response from API
        const result = response.data;
        setUploadResponse(result.uploadedFiles); // Store the uploaded files information
        alert("Files uploaded successfully!");
        console.log("Uploaded files: ", result.uploadedFiles);
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred during file upload.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        {/* FileUpload Component */}
        <FileUpload onChange={handleFileUpload} />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Show Uploaded Files Response */}
      {uploadResponse && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Uploaded Files:</h2>
          <ul>
            {uploadResponse.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.publicId}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

