"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChapterActionsProps {
  disabled: boolean;
  postId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  postId,
  chapterId,
  isPublished
}: ChapterActionsProps) => {
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
    <div className="flex items-center gap-x-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={disabled || isLoading}
            variant="ghost"
            className={cn(
              "bg-gray-800/50 border border-gray-700/50 transition-all duration-200",
              isPublished 
                ? "text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
                : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10",
              disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPublished ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-900 border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {isPublished ? "Unpublish chapter?" : "Publish chapter?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {isPublished 
                ? "This chapter will no longer be visible in the post."
                : "This will make the chapter visible to readers."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onClick}
              className={cn(
                "border-0",
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
    </div>
  );
}; 