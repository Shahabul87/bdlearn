"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Trash } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface SectionActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  sectionId: string;
  isPublished: boolean;
}

export const SectionActions = ({
  disabled,
  courseId,
  chapterId,
  sectionId,
  isPublished,
}: SectionActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/unpublish`);
        toast.success("Section unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/publish`);
        toast.success("Section published");
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}`);
      toast.success("Section deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn(
      "flex flex-col sm:flex-row lg:flex-row",
      "items-center lg:items-start",
      "justify-center lg:justify-end",
      "w-full",
      "gap-2"
    )}>
      <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-center lg:items-start gap-2">
        <Button
          onClick={onClick}
          disabled={disabled || isLoading}
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-x-2",
            "px-3 py-2 rounded-lg",
            "transition-all duration-200",
            "border",
            "w-full lg:w-auto",
            "h-9 lg:h-10",
            "text-xs lg:text-sm",
            isPublished
              ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-200 border-amber-200/20 dark:border-amber-500/20"
              : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-200 border-emerald-200/20 dark:border-emerald-500/20",
            disabled && "opacity-75 cursor-not-allowed hover:bg-transparent"
          )}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-3 w-3 lg:h-4 lg:w-4" />
            </motion.div>
          ) : isPublished ? (
            <>
              <EyeOff className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>Unpublish</span>
            </>
          ) : (
            <>
              <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
              <span>Publish</span>
            </>
          )}
        </Button>
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isLoading}
              variant="ghost"
              size="sm"
              className={cn(
                "bg-rose-50 dark:bg-rose-500/10",
                "text-rose-700 dark:text-rose-300",
                "hover:bg-rose-100 dark:hover:bg-rose-500/20",
                "hover:text-rose-800 dark:hover:text-rose-200",
                "border border-rose-200/20 dark:border-rose-500/20",
                "rounded-lg",
                "transition-all duration-200",
                "w-full lg:w-auto",
                "h-9 lg:h-10",
                "flex items-center justify-center gap-x-2"
              )}
            >
              <Trash className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="lg:hidden">Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className={cn(
            "bg-white dark:bg-gray-900",
            "border border-gray-200 dark:border-gray-800",
            "backdrop-blur-sm"
          )}>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
                Delete Section
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400 text-base">
                Are you sure you want to delete this section? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={cn(
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-900 dark:text-gray-100",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "border-gray-200 dark:border-gray-700",
                "transition-colors"
              )}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className={cn(
                  "bg-rose-50 dark:bg-rose-500/10",
                  "text-rose-700 dark:text-rose-300",
                  "hover:bg-rose-100 dark:hover:bg-rose-500/20",
                  "hover:text-rose-800 dark:hover:text-rose-200",
                  "border border-rose-200/20 dark:border-rose-500/20",
                  "transition-all duration-200"
                )}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};