"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Post, Comment, ReactionType } from "@prisma/client";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThumbsUp, ThumbsDown } from 'lucide-react';

// Define the component props with replies as a separate field on initialData
interface ReplyType {
  id: string;
  userId: string;
  replyContent: string | null;
  commentId: string;
  postId: string;
  parentReplyId: string | null;
  createdAt: Date;
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
  childReplies?: ReplyType[]; // Add this for nested replies
}

interface CommentDisplayProps {
  initialData: Post & {
    comments: Array<Comment & {
      user: {
        id: string;
        name: string | null;
        image: string | null;
        email: string | null;
      };
      reactions: Array<{
        id: string;
        type: string;
        user: {
          id: string;
          name: string | null;
          email: string | null;
        };
      }>;
      replies: ReplyType[]; // Changed from reply to replies to match schema
    }>;
  };
  postId: string;
}

const formSchema = z.object({
  replyContent: z.string().min(1, {
    message: "Reply is required",
  }),
});

const emojiOptions = [
  "👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "😍", "😆", "😎",
  "😱", "🎉", "💯", "😅", "🥳", "😤", "😋", "😡", "😴", "🤔"
];

// Add this type for nested reply submission
interface NestedReplyValues {
  replyContent: string;
}

// Add this sorting function at the top level
const sortByDate = <T extends { createdAt: Date }>(items: T[] | null | undefined): T[] => {
  if (!items) return [];
  return [...items].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Update the helper function to return separate counts
const getCommentCounts = (comments: any[] | null | undefined, replies: ReplyType[] | null | undefined) => {
  return {
    comments: comments?.length || 0,
    replies: replies?.length || 0,
    total: (comments?.length || 0) + (replies?.length || 0)
  };
};

// Add these types
interface ReactionButtonProps {
  type: '👍' | '❤️';  // Changed from 'like' | 'love' to emoji types
  count: number;
  isActive: boolean;
  onClick: () => void;
}

// Replace the existing ReactionButton component with this one
const ReactionButton = ({ type, count, isActive, onClick }: ReactionButtonProps) => {
  const isLove = type === '❤️';
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "transition-all duration-200",
        isActive 
          ? isLove ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
          : "hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg">{type}</span>
      {count > 0 && (
        <span className={cn(
          "text-sm",
          isActive 
            ? isLove ? "text-red-400" : "text-blue-400"
            : "text-gray-400"
        )}>
          {count}
        </span>
      )}
    </motion.button>
  );
};

// Add this type for reply reactions
interface ReplyReaction {
  id: string;
  type: string;
  userId: string;
  user: {
    id: string;  // Add this line
    name: string | null;
  };
}

// Add this type for replies
interface Reply {
  id: string;
  replyContent: string | null;  // Change this to match ReplyType
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
  reactions: ReplyReaction[];
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ initialData, postId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialData.comments);
  const [reply, setReply] = useState(initialData.comments.flatMap(comment => comment.replies) || []);
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<Record<string, string>>({});
  const [selectedReplyReaction, setSelectedReplyReaction] = useState<Record<string, string>>({});
  const [activeNestedReply, setActiveNestedReply] = useState<{
    commentId: string;
    replyId: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      replyContent: "",
    },
  });

  const nestedReplyForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      replyContent: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const toggleEmojiPicker = () => setShowEmojiPicker((current) => !current);

  const getReactionCount = (reactions: Array<{ type: string }>, type: string) =>
    reactions.filter((reaction) => reaction.type === type).length;

  const onSubmit = async (values: z.infer<typeof formSchema>, commentId: string) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/replies`, values);
      const newReply = response.data;

      setReply((prevReplies) => [...prevReplies, newReply]);
      toast.success("Reply added");
      setActiveReply(null);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleReactionSelect = (emoji: string) => {
    const currentReply = form.getValues("replyContent");
    form.setValue("replyContent", `${currentReply} ${emoji}`);
    setShowEmojiPicker(false);
  };

  const reactions = [
    { type: '👍', name: 'THUMBSUP', color: 'text-blue-400' },
    { type: '❤️', name: 'HEART', color: 'text-red-400' }
  ];

  const handleReplyReaction = async (postId: string, replyId: string, type: string, reply: Reply, session: any) => {
    try {
      const hasReaction = reply.reactions.some(
        r => r.user?.id === session?.user?.id && r.type === type
      );
      
      const action = hasReaction ? 'remove' : 'add';
      const response = await axios.post(
        `/api/posts/${postId}/replies/${replyId}/reactions`,
        { type, action }
      );

      if (response.status === 200) {
        router.refresh();
        if (action === 'add') {
          toast.success('Reaction added');
        } else {
          toast.success('Reaction removed');
        }
      }
    } catch (error) {
      toast.error('Failed to add/remove reaction');
    }
  };

  const RenderReply = ({ 
    reply, 
    commentId, 
    level = 0 
  }: { 
    reply: ReplyType; 
    commentId: string;
    level?: number;
  }) => {
    const maxNestingLevel = 3; // Limit nesting depth

    return (
      <div 
        className="space-y-4"
        style={{ marginLeft: level > 0 ? `${level * 2}rem` : undefined }}
      >
        <div className="bg-gray-900/30 rounded-lg border border-gray-700/30 p-4 backdrop-blur-sm 
          transition-all duration-300 hover:bg-gray-900/50">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src={reply.user?.image || "/default-avatar.png"}
              alt={reply.user?.name || "Anonymous"}
              width={32}
              height={32}
              className="rounded-full ring-1 ring-blue-500/20"
            />
            <div>
              <span className="font-medium text-base bg-gradient-to-r from-blue-100 to-blue-300 bg-clip-text text-transparent">
                {reply.user?.name || "Anonymous"}
              </span>
              <p className="text-gray-300 text-sm leading-relaxed tracking-wide font-light mt-1">
                {reply.replyContent}
              </p>
            </div>
          </div>

          {/* Reply Actions */}
          <div className="flex items-center gap-3 mt-3">
            {reactions.map(({ type, name, color }) => (
              <motion.button
                key={type}
                onClick={() => handleReplyReaction(postId, reply.id, name, reply, session)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
                  "transition-all duration-300",
                  reply.reactions.some(r => r.user?.id === session?.user?.id && r.type === name)
                    ? name === 'HEART' 
                      ? "bg-red-500/10 text-red-400" 
                      : "bg-blue-500/10 text-blue-400"
                    : "hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                )}
              >
                <motion.span
                  className="text-base"
                  whileHover={{ 
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                >
                  {type}
                </motion.span>
                {reply.reactions.filter(r => r.type === name).length > 0 && (
                  <span className={cn(
                    "text-[10px]",
                    reply.reactions.some(r => r.user?.id === session?.user?.id && r.type === name)
                      ? name === 'HEART' ? "text-red-400" : "text-blue-400"
                      : "text-gray-400"
                  )}>
                    {reply.reactions.filter(r => r.type === name).length}
                  </span>
                )}
              </motion.button>
            ))}

            {/* Reply button for nested replies */}
            {level < 3 && ( // Limit nesting depth
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                onClick={() => setActiveNestedReply({
                  commentId,
                  replyId: reply.id
                })}
              >
                Reply
              </motion.button>
            )}
          </div>

          {/* Nested Reply Form */}
          {activeNestedReply?.replyId === reply.id && (
            <div className="mt-4">
              <Form {...nestedReplyForm}>
                <form
                  onSubmit={nestedReplyForm.handleSubmit((values) => 
                    onNestedReplySubmit(values, commentId, reply.id)
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={nestedReplyForm.control}
                    name="replyContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isSubmitting}
                            placeholder="Write your reply..."
                            className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:border-blue-500/50 focus:ring-blue-500/20 
                              placeholder:text-gray-500 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      onClick={() => setActiveNestedReply(null)}
                      variant="ghost"
                      className="text-gray-400 hover:text-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={!nestedReplyForm.formState.isValid || isSubmitting}
                      type="submit"
                      className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 
                        hover:text-blue-200 transition-all duration-200 
                        border border-blue-500/20"
                    >
                      Reply
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* Render child replies */}
          {reply.childReplies && reply.childReplies.length > 0 && (
            <div className="mt-4">
              {reply.childReplies.map((childReply) => (
                <RenderReply
                  key={childReply.id}
                  reply={childReply}
                  commentId={commentId}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const onNestedReplySubmit = async (
    values: NestedReplyValues,
    commentId: string,
    parentReplyId: string
  ) => {
    try {
      const response = await axios.post(
        `/api/posts/${postId}/comments/${commentId}/replies`,
        {
          ...values,
          parentReplyId,
        }
      );

      // Update the reply state to include the new nested reply
      setReply((prevReplies) => [
        ...prevReplies,
        {
          ...response.data,
          user: response.data.user,
          reactions: [],
          childReplies: []
        }
      ]);

      toast.success("Reply added");
      setActiveNestedReply(null);
      nestedReplyForm.reset();
      router.refresh();
    } catch (error) {
      console.error("Error adding nested reply:", error);
      toast.error("Something went wrong");
    }
  };

  const handleReaction = async (commentId: string, reactionType: 'THUMBSUP' | 'HEART') => {
    try {
      if (!session?.user) {
        toast.error("Please sign in to react");
        return;
      }

      // Find if user already has this reaction
      const comment = comments.find(c => c.id === commentId);
      const existingReaction = comment?.reactions.find(
        r => r.user.id === session.user.id && r.type === reactionType
      );

      // If reaction exists, remove it (decrement)
      // If it doesn't exist, add it (increment)
      const action = existingReaction ? 'remove' : 'add';

      await axios.post(`/api/posts/${postId}/comments/${commentId}/reactions`, {
        type: reactionType,
        action
      });
      
      // Update local state
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          if (action === 'remove') {
            // Remove the reaction (decrement)
            comment.reactions = comment.reactions.filter(
              r => !(r.user.id === session.user.id && r.type === reactionType)
            );
          } else {
            // Add new reaction (increment)
            comment.reactions.push({
              id: Date.now().toString(),
              type: reactionType,
              user: {
                id: session.user.id,
                name: session.user.name || null,
                email: session.user.email || null
              }
            });
          }
        }
        return comment;
      }));

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Updated Comments Counter */}
      <div className="flex items-center gap-4 text-gray-400">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {getCommentCounts(initialData.comments, initialData.comments.flatMap(comment => comment.replies)).comments}
          </span>
          <span className="text-sm">
            {getCommentCounts(initialData.comments, initialData.comments.flatMap(comment => comment.replies)).comments === 1 
              ? 'Comment' 
              : 'Comments'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {getCommentCounts(initialData.comments, initialData.comments.flatMap(comment => comment.replies)).replies}
          </span>
          <span className="text-sm">
            {getCommentCounts(initialData.comments, initialData.comments.flatMap(comment => comment.replies)).replies === 1 
              ? 'Reply' 
              : 'Replies'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Total:</span>
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
            {getCommentCounts(initialData.comments, initialData.comments.flatMap(comment => comment.replies)).total}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-6">
          {/* Sort comments by most recent */}
          {sortByDate(initialData.comments).map((comment) => (
            <div 
              key={comment.id}
              className="group bg-gray-800/30 rounded-xl border border-gray-700/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/50"
            >
              {/* Comment Header */}
              <div className="flex items-center gap-4 mb-3">
                <div className="relative">
                  <Image
                    src={comment.user?.image || "/default-avatar.png"}
                    alt={comment.user?.name || "Anonymous"}
                    width={40}
                    height={40}
                    className="rounded-full ring-2 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <span className="font-semibold text-lg bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                    {comment.user?.name || "Anonymous"}
                  </span>
                  <p className="text-gray-400 text-sm font-medium tracking-wide">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-gray-300 text-base leading-relaxed tracking-wide font-light ml-14 mb-4">
                {comment.comments}
              </p>

              {/* Reactions and Reply Button */}
              <div className="flex items-center gap-3">
                {reactions.map(({ type, name, color }) => (
                  <motion.button
                    key={type}
                    onClick={() => handleReaction(comment.id, name as 'THUMBSUP' | 'HEART')}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
                      "transition-all duration-300",
                      comment.reactions.some(r => r.user?.id === session?.user?.id && r.type === name)
                        ? name === 'HEART' 
                          ? "bg-red-500/10 text-red-400" 
                          : "bg-blue-500/10 text-blue-400"
                        : "hover:bg-gray-800/50 text-gray-400 hover:text-gray-300"
                    )}
                  >
                    <motion.span
                      className="text-base"
                      whileHover={{ 
                        scale: 1.3,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {type}
                    </motion.span>
                    {comment.reactions.filter(r => r.type === name).length > 0 && (
                      <span className={cn(
                        "text-[10px]",
                        comment.reactions.some(r => r.user?.id === session?.user?.id && r.type === name)
                          ? name === 'HEART' ? "text-red-400" : "text-blue-400"
                          : "text-gray-400"
                      )}>
                        {comment.reactions.filter(r => r.type === name).length}
                      </span>
                    )}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium ml-2"
                  onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                >
                  Reply
                </motion.button>
              </div>

              {/* Reply Form */}
              {activeReply === comment.id && (
                <div className="mt-4 ml-14">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit((values) => onSubmit(values, comment.id))}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="replyContent"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isSubmitting}
                                placeholder="Write your reply..."
                                className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:border-blue-500/50 focus:ring-blue-500/20 
                                  placeholder:text-gray-500 transition-all"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-between">
                        <Button
                          type="button"
                          onClick={toggleEmojiPicker}
                          variant="ghost"
                          className="text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          😊 Add Reaction
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            onClick={() => setActiveReply(null)}
                            variant="ghost"
                            className="text-gray-400 hover:text-gray-300"
                          >
                            Cancel
                          </Button>
                          <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 
                              transition-all duration-200 border border-blue-500/20"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                      {showEmojiPicker && (
                        <div className="absolute mt-2 bg-gray-800/95 rounded-lg border border-gray-700/50 
                          shadow-lg p-3 backdrop-blur-sm z-10">
                          <div className="grid grid-cols-6 gap-2">
                            {emojiOptions.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleReactionSelect(emoji)}
                                className="text-xl hover:scale-125 transition-transform p-1"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </form>
                  </Form>
                </div>
              )}

              {/* Replies Section - Sort replies by most recent */}
              <div className="mt-6 ml-14 space-y-4">
                {sortByDate(
                  comment.replies
                ).map((reply) => {
                  // Find child replies for this reply
                  const childReplies = comment.replies.filter(
                    (r) => r.parentReplyId === reply.id
                  );
                  
                  return (
                    <RenderReply 
                      key={reply.id}
                      reply={{
                        ...reply,
                        childReplies // Pass child replies to the component
                      }}
                      commentId={comment.id}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentDisplay;
