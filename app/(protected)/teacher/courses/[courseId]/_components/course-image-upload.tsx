"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CourseImageUploadProps {
  courseId: string;
  initialImage?: string | null;
}

export const CourseImageUpload = ({
  courseId,
  initialImage
}: CourseImageUploadProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/courses/${courseId}/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      await fetch(`/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl: data.url })
      });

      toast.success("Image uploaded!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
      setIsEditing(false);
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
            <div className="p-2 w-fit rounded-md bg-blue-50 dark:bg-blue-500/10">
              <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Course Image
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload an attractive course thumbnail
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                variant="ghost"
                size="sm"
                className={cn(
                  "text-rose-700 dark:text-rose-300",
                  "hover:text-rose-800 dark:hover:text-rose-200",
                  "hover:bg-rose-50 dark:hover:bg-rose-500/10",
                  "w-full sm:w-auto",
                  "justify-center"
                )}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => document.getElementById('imageUpload')?.click()}
                variant="ghost"
                size="sm"
                className={cn(
                  "text-blue-700 dark:text-blue-300",
                  "hover:text-blue-800 dark:hover:text-blue-200",
                  "hover:bg-blue-50 dark:hover:bg-blue-500/10",
                  "w-full sm:w-auto",
                  "justify-center"
                )}
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <>
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Select Image
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className={cn(
                "text-blue-700 dark:text-blue-300",
                "hover:text-blue-800 dark:hover:text-blue-200",
                "hover:bg-blue-50 dark:hover:bg-blue-500/10",
                "w-full sm:w-auto",
                "justify-center"
              )}
              disabled={uploading}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {initialImage ? "Change Image" : "Add Image"}
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className={cn(
                "flex flex-col items-center justify-center gap-4",
                "w-full p-6 sm:p-8",
                "border-2 border-dashed rounded-xl",
                "border-blue-200 dark:border-blue-500/20",
                "bg-blue-50/50 dark:bg-blue-500/5",
                "cursor-pointer",
                "hover:border-blue-300 dark:hover:border-blue-500/30",
                "hover:bg-blue-50 dark:hover:bg-blue-500/10",
                "transition-all duration-200"
              )}
            >
              <div className="p-4 rounded-full bg-blue-100/50 dark:bg-blue-500/10">
                <ImagePlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Click to upload an image
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Maximum file size: 5MB
                </p>
              </div>
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      {initialImage && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/50">
            <Image
              src={initialImage}
              alt="Course image"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}; 