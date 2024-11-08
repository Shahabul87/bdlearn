"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/fileupload/file-upload";
import { Button } from "@/components/ui/button";
import FirstImageComponent from "./image-url";

// Define the type for each uploaded file
interface UploadedFile {
  publicId: string;
  url: string;
}

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageFormNew = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadedFile[] | null>(null);
  const router = useRouter();
  const [urlsArray, setUrlsArray] = useState<string[]>([]);

  // useEffect to update urlsArray when uploadResponse changes
  useEffect(() => {
    if (uploadResponse) {
      const urls = uploadResponse.map((file) => file.url);
      setUrlsArray(urls);
    }
  }, [uploadResponse]);

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

        // Clear the files array and toggle editing mode
        
        toggleEdit(); // Toggles editing state
        console.log("Uploaded files: ", result.uploadedFiles);
      } else {
        alert("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred during file upload.");
    } finally {
      setFiles([]); // Clears the selected files
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-white/90">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
         
          <FirstImageComponent uploadedFiles={uploadResponse} />

        )
      )}
      {isEditing && (
        <div>
          <div className="p-2">
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
          </div>
        </div>
      )}
    </div>
  );
};
