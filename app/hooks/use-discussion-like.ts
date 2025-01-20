import { useState } from "react";
import { toast } from "sonner";

interface UseDiscussionLikeProps {
  groupId: string;
  discussionId: string;
  initialIsLiked?: boolean;
  onSuccess?: () => void;
}

export const useDiscussionLike = ({
  groupId,
  discussionId,
  initialIsLiked = false,
  onSuccess,
}: UseDiscussionLikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/groups/${groupId}/discussions/${discussionId}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle like");
      }

      const data = await response.json();
      setIsLiked(data.liked);
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    isLoading,
    toggleLike,
  };
}; 