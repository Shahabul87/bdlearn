"use client";

import React, { useState } from "react";
import { ReplyComment } from "./reply-comments";
import { Post, Reply } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ReplyDisplayProps {
  initialData: Post & { reply: Array<Reply & { user: { name: string; image: string | null }; reactions: Array<{ type: string; user?: { name: string } }> }> }
  postId: string;
}

const ReplyDisplay: React.FC<ReplyDisplayProps> = ({ initialData, postId }) => {
  // Destructure replies directly from initialData, defaulting to an empty array if undefined
  const { reply = [] } = initialData;
  const [activeReply, setActiveReply] = useState<string | null>(null); // Tracks the active reply for further response

  const getReactionCount = (reactions: Array<{ type: string }>, type: string) =>
    reactions.filter((reaction) => reaction.type === type).length;
 
  // Function to hide the reply input
  const handleReplySave = () => setActiveReply(null);

  return (
    <div className={cn(
      "mb-6",
      "bg-gray-100/80 dark:bg-gray-900/80",
      "backdrop-blur-sm",
      "rounded-xl",
      "p-4"
    )}>
      <div className="flex gap-4">
        <div className="w-full">
          {reply.map((singleReply) => (
            <div 
              key={singleReply.id} 
              className={cn(
                "mb-4 p-4 rounded-lg",
                "bg-white/80 dark:bg-gray-800/80",
                "border border-gray-200/50 dark:border-gray-700/50",
                "backdrop-blur-sm",
                "transition-all duration-200",
                "hover:bg-gray-50/90 dark:hover:bg-gray-800/90"
              )}
            >
              <p className={cn(
                "text-gray-700 dark:text-gray-200",
                "text-base leading-relaxed",
                "tracking-wide"
              )}>
                {singleReply.replyContent || "No content"}
              </p>

              {/* Reaction emojis with count */}
              <div className="flex items-center gap-4 mt-3 text-gray-500 dark:text-gray-400">
                <span className={cn(
                  "flex items-center",
                  "hover:text-gray-700 dark:hover:text-gray-300",
                  "transition-colors duration-200"
                )}>
                  👍 {getReactionCount(singleReply.reactions, "like")}
                </span>
                <span className={cn(
                  "flex items-center",
                  "hover:text-gray-700 dark:hover:text-gray-300",
                  "transition-colors duration-200"
                )}>
                  👎 {getReactionCount(singleReply.reactions, "dislike")}
                </span>
                <span className={cn(
                  "flex items-center",
                  "hover:text-gray-700 dark:hover:text-gray-300",
                  "transition-colors duration-200"
                )}>
                  ❤️ {getReactionCount(singleReply.reactions, "love")}
                </span>
                {/* Reply button */}
                <button
                  className={cn(
                    "text-sm ml-4",
                    "text-blue-600 dark:text-blue-400",
                    "hover:text-blue-700 dark:hover:text-blue-300",
                    "hover:underline",
                    "transition-colors duration-200"
                  )}
                  onClick={() => setActiveReply(activeReply === singleReply.id ? null : singleReply.id)}
                >
                  Reply
                </button>
              </div>

              {/* Render ReplyComment component if this reply's reply button was clicked */}
              {activeReply === singleReply.id && (
                <div className={cn(
                  "mt-3 pl-4",
                  "border-l-2 border-gray-200/50 dark:border-gray-700/50"
                )}>
                  <ReplyComment
                    initialData={initialData}
                    postId={postId}
                    commentId={singleReply.commentId}
                    onSave={handleReplySave}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReplyDisplay;









