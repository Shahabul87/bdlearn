"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { File, Loader2, PlusCircle, X, FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/fileupload/file-upload";
import { cn } from "@/lib/utils";

interface AttachmentFormProps {
  initialData: {
    attachments: {
      id: string;
      name: string;
      url: string;
    }[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course attachment added");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
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
              <File className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Course Attachments
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add resources for your students
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "text-blue-700 dark:text-blue-300",
            "hover:text-blue-800 dark:hover:text-blue-200",
            "hover:bg-blue-50 dark:hover:bg-blue-500/10",
            "w-full sm:w-auto",
            "justify-center"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add file
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4"
          >
            <div className={cn(
              "p-4 rounded-lg",
              "bg-white dark:bg-gray-900/50",
              "border border-gray-200 dark:border-gray-700/50"
            )}>
              <FileUpload
                onChange={(files) => {
                  if (files?.[0]) {
                    onSubmit({ url: URL.createObjectURL(files[0]) });
                  }
                }}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                Add PDF files, documents, or other resources for your students.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2 mt-4"
        >
          {initialData.attachments.length === 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic text-center">
              No attachments yet
            </p>
          )}
          {initialData.attachments.map((attachment) => (
            <motion.div
              key={attachment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn(
                "flex items-center p-3 w-full",
                "bg-white/50 dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700/50",
                "rounded-lg",
                "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                "group transition-all",
                deletingId === attachment.id && "opacity-50"
              )}
            >
              <div className="flex items-center gap-x-2 flex-1">
                <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-500/10">
                  <FileIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {attachment.name}
                </p>
              </div>
              <Button
                onClick={() => onDelete(attachment.id)}
                disabled={deletingId === attachment.id}
                variant="ghost"
                size="sm"
                className={cn(
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "text-gray-700 dark:text-gray-300",
                  "hover:text-red-700 dark:hover:text-red-400"
                )}
              >
                {deletingId === attachment.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};