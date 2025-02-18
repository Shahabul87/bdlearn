"use client";

import { RenderReply } from "./render-reply";

interface CommentRepliesProps {
  replies: any[];
  commentId: string;
}

export const CommentReplies = ({ replies, commentId }: CommentRepliesProps) => {
  return (
    <div className="mt-6 ml-14 space-y-4">
      {Array.isArray(replies) && replies.length > 0 && 
        replies.map((reply) => (
          <RenderReply 
            key={reply.id}
            reply={reply}
            commentId={commentId}
            level={0}
          />
        ))
      }
    </div>
  );
}; 