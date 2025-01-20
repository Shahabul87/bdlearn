"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast.success("Chapter published");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(
      "flex flex-col sm:flex-row lg:flex-row",
      "items-center lg:items-start",
      "justify-center lg:justify-end",
      "w-full",
      "gap-2"
    )}>
      <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-row items-center lg:items-start gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={disabled || isLoading}
              variant="ghost"
              size="sm"
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                "backdrop-blur-sm border shadow-lg",
                "w-full lg:w-auto",
                "h-9 lg:h-10",
                "text-xs lg:text-sm",
                isPublished 
                  ? "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-200 border-amber-200/20 dark:border-amber-500/20" 
                  : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-200 border-emerald-200/20 dark:border-emerald-500/20",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
            >
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="h-3 w-3 lg:h-4 lg:w-4 animate-spin" />
                    <span className="font-medium">{isPublished ? "Unpublishing..." : "Publishing..."}</span>
                  </>
                ) : (
                  <>
                    {isPublished ? (
                      <>
                        <EyeOff className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span className="font-medium">Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span className="font-medium">Publish</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </Button>
          </AlertDialogTrigger>
          
          <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                {isPublished ? "Unpublish chapter?" : "Publish chapter?"}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                {isPublished 
                  ? "This chapter will no longer be visible in the course."
                  : "This will make the chapter visible to enrolled students."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={cn(
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-900 dark:text-white",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "border-gray-200 dark:border-gray-700"
              )}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onPublish}
                className={cn(
                  "border-0 text-white font-medium",
                  isPublished 
                    ? "bg-amber-600 hover:bg-amber-700" 
                    : "bg-emerald-600 hover:bg-emerald-700"
                )}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isDeleting}
              variant="ghost"
              size="sm"
              className={cn(
                "bg-rose-50 dark:bg-rose-500/10",
                "text-rose-700 dark:text-rose-300",
                "hover:bg-rose-100 dark:hover:bg-rose-500/20",
                "hover:text-rose-800 dark:hover:text-rose-200",
                "border border-rose-200/20 dark:border-rose-500/20",
                "shadow-lg",
                "w-full lg:w-auto",
                "h-9 lg:h-10",
                "flex items-center justify-center"
              )}
            >
              {isDeleting ? (
                <Loader2 className="h-3 w-3 lg:h-4 lg:w-4 animate-spin" />
              ) : (
                <>
                  <Trash className="h-3 w-3 lg:h-4 lg:w-4" />
                  <span className="ml-2 lg:hidden">Delete</span>
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900 dark:text-white">
                Delete chapter?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete the chapter
                and all of its data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={cn(
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-900 dark:text-white",
                "hover:bg-gray-200 dark:hover:bg-gray-700",
                "border-gray-200 dark:border-gray-700"
              )}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className={cn(
                  "bg-rose-600 hover:bg-rose-700",
                  "text-white font-medium",
                  "border-0"
                )}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};