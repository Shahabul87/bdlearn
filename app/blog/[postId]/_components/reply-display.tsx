"use client";

import React, { useState } from "react";
import { ReplyComment } from "./reply-comments";
import { Post, Reply } from "@prisma/client";

interface ReplyDisplayProps {
  initialData: Post & { reply: Array<Reply & { user: { name: string; image: string | null }; reactions: Array<{ type: string; user?: { name: string } }> }> };
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
    <div className="mb-6">
      <div className="flex gap-4">
        <div>
          {reply.map((singleReply) => (
            <div key={singleReply.id} className="mb-4 border border-gray-700 p-3 rounded-lg bg-gray-700">
              <p className="text-gray-300">{singleReply.replyContent || "No content"}</p>

              {/* Reaction emojis with count */}
              <div className="flex items-center gap-4 mt-2 text-gray-400">
                <span className="flex items-center">
                  👍 {getReactionCount(singleReply.reactions, "like")}
                </span>
                <span className="flex items-center">
                  👎 {getReactionCount(singleReply.reactions, "dislike")}
                </span>
                <span className="flex items-center">
                  ❤️ {getReactionCount(singleReply.reactions, "love")}
                </span>
                {/* Reply button */}
                <button
                  className="text-sm text-sky-500 ml-4 hover:underline"
                  onClick={() => setActiveReply(activeReply === singleReply.id ? null : singleReply.id)}
                >
                  Reply
                </button>
              </div>

              {/* Render ReplyComment component if this reply's reply button was clicked */}
              {activeReply === singleReply.id && (
                <ReplyComment
                  initialData={initialData}
                  postId={postId}
                  commentId={singleReply.commentId}
                  onSave={handleReplySave} // Pass the handleReplySave function as a prop
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReplyDisplay;









