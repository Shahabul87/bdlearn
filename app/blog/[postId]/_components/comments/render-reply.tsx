"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ReplyType {
  id: string;
  content: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  reactions: Array<{
    id: string;
    type: string;
    userId: string;
    user: {
      id: string;
      name: string | null;
    };
  }>;
  createdAt: Date;
}

interface RenderReplyProps {
  reply: ReplyType;
  commentId: string;
  level?: number;
}

export const RenderReply = ({ reply, commentId, level = 0 }: RenderReplyProps) => {
  if (!reply) return null;

  return (
    <div 
      className="space-y-4"
      style={{ marginLeft: level > 0 ? `${level * 2}rem` : undefined }}
    >
      <div className={cn(
        "rounded-xl p-4",
        "bg-white/50 dark:bg-gray-800/50",
        "border border-gray-200/50 dark:border-gray-700/50",
        "backdrop-blur-sm",
        "transition-all duration-300",
        "hover:bg-gray-50/80 dark:hover:bg-gray-800/70"
      )}>
        <div className="flex items-center gap-3 mb-2">
          <Image
            src={reply.user?.image || "/default-avatar.png"}
            alt={reply.user?.name || "Anonymous"}
            width={32}
            height={32}
            className="rounded-full ring-1 ring-blue-500/20"
          />
          <div className="flex-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {reply.user?.name || "Anonymous"}
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {reply.content}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 ml-11">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(reply.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}; 