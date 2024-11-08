"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  postId: string;
  postchapterId: string;
  isPublished: boolean;
};

export const PostChapterActions = ({
  disabled,
  postId,
  postchapterId,
  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/posts/${postId}/postchapters/${postchapterId}/unpublish`);
        toast.success("Post chapter unpublished");
      } else {
        await axios.patch(`/api/posts/${postId}/postchapters/${postchapterId}/publish`);
        toast.success("Post chapter published");
        confetti.onOpen();
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
      setIsLoading(true);

      await axios.delete(`/api/posts/${postId}/postchapters/${postchapterId}`);

      toast.success("Post chapter deleted");
      router.refresh();
      router.push(`/teacher/posts/${postId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="success"
        size="lg"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="md" disabled={isLoading} variant="createcourse">
          <Trash className="h-6 w-6 text-white" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

