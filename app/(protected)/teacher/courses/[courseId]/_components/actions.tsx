"use client";

import axios from "axios";
import { Trash, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  courseId,
  isPublished
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isPublishLoading, setIsPublishLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsPublishLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsPublishLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <div className={cn(
      "flex items-center justify-center md:justify-start",
      "w-full md:w-auto",
      "gap-2 sm:gap-x-2"
    )}>
      <Button
        onClick={onClick}
        disabled={disabled || isPublishLoading}
        variant="ghost"
        size="sm"
        className={cn(
          "bg-purple-500/10 hover:bg-purple-500/20",
          "text-purple-700 dark:text-purple-300",
          "hover:text-purple-800 dark:hover:text-purple-200",
          "border border-purple-200/20 dark:border-purple-500/20",
          "transition-all duration-200",
          "text-xs sm:text-sm",
          "h-8 sm:h-9",
          "px-2 sm:px-4",
          "flex items-center justify-center",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {isPublishLoading ? (
          <div className="flex items-center gap-x-2">
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            <span>{isPublished ? "Unpublishing..." : "Publishing..."}</span>
          </div>
        ) : (
          <>
            {isPublished ? (
              <>
                <EyeOff className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Publish
              </>
            )}
          </>
        )}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button 
          disabled={isDeleteLoading} 
          variant="ghost"
          size="sm"
          className={cn(
            "bg-rose-500/10 hover:bg-rose-500/20",
            "text-rose-700 dark:text-rose-300",
            "hover:text-rose-800 dark:hover:text-rose-200",
            "border border-rose-200/20 dark:border-rose-500/20",
            "transition-all duration-200",
            "h-8 sm:h-9",
            "px-2 sm:px-3",
            "flex items-center justify-center",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {isDeleteLoading ? (
            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
          ) : (
            <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </Button>
      </ConfirmModal>
    </div>
  )
}