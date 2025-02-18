"use client";

import { Post } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostComment } from "./add-comments";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CommentModalProps {
  post: Post;
  postId: string;
}

export const CommentModal = ({ post, postId }: CommentModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "px-6 py-6 h-auto",
            "bg-gradient-to-r from-blue-600 to-indigo-600",
            "dark:from-blue-500 dark:to-indigo-500",
            "hover:from-blue-700 hover:to-indigo-700",
            "dark:hover:from-blue-600 dark:hover:to-indigo-600",
            "text-white font-medium",
            "shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",
            "dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
            "transition-all duration-300",
            "rounded-xl",
            "flex items-center gap-2",
            "group"
          )}
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-lg">Add Your Comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Share Your Thoughts
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <PostComment 
            initialData={post} 
            postId={postId} 
            onCommentAdded={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}; 