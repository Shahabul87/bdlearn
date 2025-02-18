"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
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
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { currentUser } from '@/lib/auth'
import { ReplyModal } from "./reply-modal";
import { Textarea } from "@/components/ui/textarea";
import { CommentHeader } from "./comments/comment-header";
import { CommentContent } from "./comments/comment-content";
import { CommentActions } from "./comments/comment-actions";
import { CommentReplies } from "./comments/comment-replies";

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
const sortByDate = <T extends { createdAt: Date }>(items: T[] | undefined | null): T[] => {
  if (!Array.isArray(items)) return [];
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
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [activeComment, setActiveComment] = useState<string | null>(null);

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
      // Make sure we're sending the correct data structure
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/replies`, {
        content: values.replyContent, // Changed from replyContent to content
        postId: postId,
        commentId: commentId,
      });

      if (response.data) {
        // Update the local state with the new reply
        setComments(prevComments => 
          prevComments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: Array.isArray(comment.replies) 
                  ? [...comment.replies, response.data]
                  : [response.data]
              };
            }
            return comment;
          })
        );

        toast.success("Reply added successfully");
        form.reset();
        setReplyModalOpen(false);
        setActiveComment(null);
        router.refresh(); // Refresh the page to get updated data
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply");
    }
  };

  const handleReactionSelect = (emoji: string) => {
    const currentReply = form.getValues("replyContent");
    form.setValue("replyContent", `${currentReply} ${emoji}`);
    setShowEmojiPicker(false);
  };

  const reactions = [
    {
      type: "👍",
      name: "THUMBSUP",
      color: "blue",
      label: "Like",
      activeClass: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      hoverClass: "hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-300"
    },
    {
      type: "❤️",
      name: "HEART",
      color: "red",
      label: "Love",
      activeClass: "bg-red-500/10 text-red-500 dark:text-red-400",
      hoverClass: "hover:bg-red-500/5 hover:text-red-600 dark:hover:text-red-300"
    }
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
    if (!reply) return null;  // Add this check

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
            {reactions.map(({ type, name, label, activeClass, hoverClass }) => (
              <motion.button
                key={type}
                onClick={() => handleReplyReaction(postId, reply.id, name, reply, session)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full",
                  "font-medium text-sm",
                  "transition-all duration-300",
                  "border border-transparent",
                  reply.reactions.some(r => r.user?.id === session?.user?.id && r.type === name)
                    ? activeClass
                    : cn(
                        "text-gray-600 dark:text-gray-400",
                        hoverClass,
                        "hover:border-gray-200 dark:hover:border-gray-700"
                      )
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="text-lg"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {type}
                </motion.span>
                <span className="relative top-px">
                  {label}
                  {reply.reactions.filter(r => r.type === name).length > 0 && (
                    <span className="ml-1 text-xs">
                      {reply.reactions.filter(r => r.type === name).length}
                    </span>
                  )}
                </span>
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

  const handleReaction = async (commentId: string, reactionType: string) => {
    const user = await currentUser();

    if (!user?.id) {
      toast.error("You must be logged in to react");
      return;
    }

    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/reactions`, {
        type: reactionType,
        user: {
          id: user.id as string,
          name: user.name || null,
          email: user.email || null
        }
      });

      // Update local state
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          if (response.data.action === 'remove') {
            // Remove the reaction (decrement)
            comment.reactions = comment.reactions.filter(
              r => !(r.user.id === (user.id as string) && r.type === reactionType)
            );
          } else {
            // Add new reaction (increment)
            comment.reactions.push({
              id: Date.now().toString(),
              type: reactionType,
              user: {
                id: user.id as string,
                name: user.name || null,
                email: user.email || null
              }
            });
          }
        }
        return comment;
      }));

      router.refresh();
    } catch (error) {
      console.error("Error adding reaction:", error);
      toast.error("Something went wrong");
    }
  };

  // Add this effect to sync comments with initialData
  useEffect(() => {
    setComments(initialData.comments);
  }, [initialData.comments]);

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="group">
            <CommentHeader 
              userImage={comment.user?.image}
              userName={comment.user?.name}
              createdAt={comment.createdAt}
            />

            <CommentContent content={comment.comments || ""} />

            <CommentActions 
              comment={comment}
              session={session}
              postId={postId}
              onReplyClick={() => {
                setActiveComment(comment.id);
                setReplyModalOpen(true);
              }}
            />

            <ReplyModal
              isOpen={replyModalOpen && activeComment === comment.id}
              onClose={() => {
                setReplyModalOpen(false);
                setActiveComment(null);
                form.reset();
              }}
              onSubmit={(values) => onSubmit(values, comment.id)}
              form={form}
              title={`Reply to ${comment.user?.name || 'Comment'}`}
              isSubmitting={isSubmitting}
              isValid={isValid}
            >
              <FormField
                control={form.control}
                name="replyContent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Write your reply..."
                        className="resize-none min-h-[150px] bg-background/50 focus:bg-background transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ReplyModal>

            <CommentReplies 
              replies={sortByDate(comment.replies)}
              commentId={comment.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentDisplay;
