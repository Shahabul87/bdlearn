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
  );
}; 