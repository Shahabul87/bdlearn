"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostChapterSection } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/fileupload/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


// Define the type for each uploaded file
interface UploadedFile {
  publicId: string;
  url: string;
}

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  postId: string;
  chapterId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const PostChapterImageUpload = ({ initialData, postId, chapterId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadedFile[] | null>(null);
  const router = useRouter();
  const [urlsArray, setUrlsArray] = useState<string[]>([]);

  // State to manage form values based on Zod schema
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>({
    imageUrl: initialData.imageUrl || "", // Initial value from props or empty
  });

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

  const handleCombinedSubmit = async () => {
    if (files.length === 0) {
      toast.error("No files selected!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      // First execute handleSubmit to upload files
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setUploadResponse(result.uploadedFiles);

        // Now proceed to execute onSubmit logic
        const firstImageUrl = result.uploadedFiles.length > 0 ? result.uploadedFiles[0].url : null;

        if (!firstImageUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }

        // Update formValues with the first image URL
        const updatedValues = {
          ...formValues,
          imageUrl: firstImageUrl, // Assign first image URL to form data
        };

        // Submit the updated values to the API
        await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}`, updatedValues);

        toast.success("Post chapter updated successfully");

        // Clear files and toggle edit state after successful operations
        setFiles([]);
        toggleEdit();
        router.refresh();
      } else {
        toast.error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Something went wrong during the submission process.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-500/20">
              <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                Chapter Image
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload a cover image for your chapter
              </p>
            </div>
          </div>
        </div>
        <Button 
          onClick={toggleEdit} 
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              {initialData.imageUrl ? "Change Image" : "Add Image"}
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="mt-6 flex flex-col items-center justify-center h-40 sm:h-60 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200/50 dark:border-gray-700/50">
            <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No image uploaded yet
            </p>
          </div>
        ) : (
          <div className="mt-6 relative aspect-video rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-200" />
            <Image
              alt="Chapter Cover"
              fill
              className="object-cover"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}

      {isEditing && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-full max-w-4xl mx-auto">
              <FileUpload 
                onChange={handleFileUpload}
                className="min-h-[150px] sm:min-h-[200px] flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-200/50 dark:border-gray-700/50 rounded-lg bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              />
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={handleCombinedSubmit}
                disabled={isSubmitting || files.length === 0}
                className={cn(
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-600 dark:text-purple-400",
                  "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                  "hover:text-purple-700 dark:hover:text-purple-300",
                  "focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/20",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "transition-all duration-200",
                  "w-full sm:w-auto"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-200/50 dark:border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100/50 dark:bg-purple-500/20 rounded-lg">
                  <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300 truncate">
                    {files[0].name}
                  </p>
                  <p className="text-xs text-purple-600/70 dark:text-purple-400/70">
                    {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};