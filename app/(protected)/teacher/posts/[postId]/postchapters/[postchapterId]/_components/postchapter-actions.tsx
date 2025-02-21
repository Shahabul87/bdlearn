"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PostchapterActionsProps {
  disabled: boolean;
  postId: string;
  chapterId: string;
  isPublished: boolean;
}

export const PostchapterActions = ({
  disabled,
  postId,
  chapterId,
  isPublished
}: PostchapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}/unpublish`);
        toast.success("Chapter unpublished");
      } else {
        await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}/publish`);
        toast.success("Chapter published");
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="ghost"
      size="sm"
      className={cn(
        "relative overflow-hidden w-full sm:w-auto",
        "px-4 sm:px-6 py-2 sm:py-2.5",
        "text-sm sm:text-base font-medium rounded-lg",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        isPublished ? [
          "bg-amber-50 dark:bg-amber-500/10",
          "text-amber-600 dark:text-amber-400",
          "border border-amber-200/50 dark:border-amber-500/20",
          "hover:bg-amber-100 dark:hover:bg-amber-500/20",
          "hover:text-amber-700 dark:hover:text-amber-300",
          "focus:ring-amber-500/30 dark:focus:ring-amber-500/20",
          "disabled:bg-amber-50/50 dark:disabled:bg-amber-500/5"
        ].join(" ") : [
          "bg-emerald-50 dark:bg-emerald-500/10",
          "text-emerald-600 dark:text-emerald-400",
          "border border-emerald-200/50 dark:border-emerald-500/20",
          "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
          "hover:text-emerald-700 dark:hover:text-emerald-300",
          "focus:ring-emerald-500/30 dark:focus:ring-emerald-500/20",
          "disabled:bg-emerald-50/50 dark:disabled:bg-emerald-500/5"
        ].join(" "),
        "disabled:cursor-not-allowed disabled:opacity-60"
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isPublished ? (
          <>
            <EyeOff className="h-4 w-4" />
            <span>Unpublish</span>
          </>
        ) : (
          <>
            <Eye className="h-4 w-4" />
            <span>Publish</span>
          </>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}; 