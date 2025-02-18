"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentActionsProps {
  comment: any;
  session: any;
  postId: string;
  onReplyClick: () => void;
}

export const CommentActions = ({
  comment,
  session,
  postId,
  onReplyClick
}: CommentActionsProps) => {
  return (
    <div className="flex items-center gap-3 ml-14">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReplyClick}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          "font-medium text-sm",
          "transition-all duration-300",
          "text-blue-600 dark:text-blue-400",
          "hover:bg-blue-500/5 hover:text-blue-700 dark:hover:text-blue-300",
          "border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
        )}
      >
        <MessageCircle className="w-4 h-4" />
        <span className="relative top-px">Reply</span>
      </motion.button>
    </div>
  );
}; 