"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
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
  initialData: Post;
  postId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const PostImageUpload = ({ initialData, postId }: ImageFormProps) => {
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
        await axios.patch(`/api/posts/${postId}`, updatedValues);

        toast.success("Post updated successfully");

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
    <div className="p-4 sm:p-6 bg-white/50 dark:bg-gray-800/40 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/50 transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl">
            <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Post Image
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload a cover image for your post
            </p>
          </div>
        </div>
        <Button 
          onClick={toggleEdit} 
          variant="ghost"
          className="w-full sm:w-auto text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:text-purple-300 dark:hover:bg-purple-500/10"
        >
          {isEditing ? (
            <>Cancel</>
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
          <div className="flex flex-col items-center justify-center h-40 sm:h-60 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl border-2 border-dashed border-gray-200/50 dark:border-gray-700/50">
            <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No image uploaded yet
            </p>
          </div>
        ) : (
          <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-200" />
            <Image
              alt="Post Cover"
              fill
              className="object-cover"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}

      {isEditing && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-full max-w-4xl mx-auto">
              <FileUpload 
                onChange={handleFileUpload}
                className="min-h-[150px] sm:min-h-[200px] flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-200/50 dark:border-gray-700/50 rounded-lg sm:rounded-xl bg-white/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              />
            </div>

            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={handleCombinedSubmit}
                disabled={isSubmitting || files.length === 0}
                className={cn(
                  "bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700",
                  "disabled:text-gray-500 dark:disabled:text-gray-400",
                  "transition-all duration-200",
                  "w-full sm:w-auto"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <>Upload Image</>
                )}
              </Button>
            </div>
          </div>

          {files.length > 0 && (
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-500/10 rounded-lg sm:rounded-xl border border-purple-200/50 dark:border-purple-500/20">
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
