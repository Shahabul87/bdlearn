"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/fileupload/file-upload";
import { cn } from "@/lib/utils";

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageFormCombined = ({
  initialData,
  courseId,
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course image updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn(
      "p-4 mt-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/50",
      "hover:bg-gray-50 dark:hover:bg-gray-800/70",
      "backdrop-blur-sm",
      "transition-all duration-200"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Course Image
            </p>
            {!initialData.imageUrl && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                "text-rose-700 dark:text-rose-400",
                "bg-rose-100 dark:bg-rose-500/10"
              )}>
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This image will be displayed in the course card
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "text-purple-700 dark:text-purple-300",
            "hover:text-purple-800 dark:hover:text-purple-200",
            "hover:bg-purple-50 dark:hover:bg-purple-500/10",
            "w-full sm:w-auto",
            "justify-center"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              {initialData.imageUrl ? (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Change
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add
                </>
              )}
            </>
          )}
        </Button>
      </div>

      {!isEditing && initialData.imageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <Image
              alt="Upload"
              fill
              className="object-cover"
              src={initialData.imageUrl}
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity opacity-0 group-hover:opacity-100" />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-4"
          >
            <div className={cn(
              "p-6 rounded-xl",
              "bg-white dark:bg-gray-900/50",
              "border border-gray-200 dark:border-gray-700/50"
            )}>
              <FileUpload
                onChange={(files: File[]) => {
                  if (files?.[0]) {
                    const fileUrl = URL.createObjectURL(files[0]);
                    onSubmit({ imageUrl: fileUrl });
                  }
                }}
              />
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                16:9 aspect ratio recommended. Max file size: 5MB
              </div>
            </div>
            {isSubmitting && (
              <div className="flex items-center justify-center p-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 dark:border-purple-400 border-t-transparent" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isEditing && !initialData.imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "flex flex-col items-center justify-center p-8 mt-6 rounded-xl",
            "border-2 border-dashed",
            "border-gray-200 dark:border-gray-700/50",
            "bg-gray-50 dark:bg-gray-900/30"
          )}
        >
          <ImageIcon className="h-10 w-10 text-gray-500 dark:text-gray-400 mb-2" />
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
            No image has been uploaded yet
          </p>
        </motion.div>
      )}
    </div>
  );
};
