"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Assuming you already have the form schema and the courseId
const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "Image is required" }),
  // Add other fields as necessary
});

export function FileUploadDemo({ courseId }: { courseId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  // onSubmit method
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      // Append form values to FormData
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key as keyof typeof values]);
      });

      // Append uploaded file(s) to FormData (assuming a single file for simplicity)
      if (files.length > 0) {
        formData.append("file", files[0]); // Change this if you handle multiple files
      }

      // Send form data via axios
      await axios.patch(`/api/courses/${courseId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Course updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
      
      {/* Trigger onSubmit manually, e.g., with a button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => onSubmit({ imageUrl: "some-url" })} // Pass your form values
      >
        Submit
      </button>
    </div>
  );
}
