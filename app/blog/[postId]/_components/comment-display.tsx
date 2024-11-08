"use client";

import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Post, Comment, Reply, ReactionType } from "@prisma/client";
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

// Define the component props with replies as a separate field on initialData
interface CommentDisplayProps {
    initialData: Post & {
      comments: Array<Comment & {
        user: {
          name: string;
          image: string | null;
        };
        reactions: Array<{
          type: string;
          user?: {
            name: string;
          };
        }>;
      }>;
      reply: Array<Reply & {
        user: {
          name: string;
          image: string | null;
        };
        reactions: Array<{
          type: ReactionType; // Use the ReactionType enum for consistency
          user?: {
            name: string;
          };
        }>;
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

const CommentDisplay: React.FC<CommentDisplayProps> = ({ initialData, postId }) => {
    const [comments, setComments] = useState(initialData.comments); // Use local state for comments
    const [reply, setReply] = useState<Array<Reply & { user: { name: string; image: string | null }; reactions: Array<{ type: ReactionType; user?: { name: string } }> }>>(initialData.reply || []);
 // Initialize with an empty array if undefined
    const [activeReply, setActiveReply] = useState<string | null>(null); // Tracks the active comment for reply
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
    const router = useRouter();
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        replyContent: "", // Initialize with an empty string for new replies
      },
    });
  
    const { isSubmitting, isValid } = form.formState;
  
    const toggleEmojiPicker = () => setShowEmojiPicker((current) => !current);
  
    const getReactionCount = (reactions: Array<{ type: string }>, type: string) =>
      reactions.filter((reaction) => reaction.type === type).length;
  
    const onSubmit = async (values: z.infer<typeof formSchema>, commentId: string) => {
      try {
        // Send the reply text (with emojis) to the server
        const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/replies`, values);
        const newReply = response.data;
  
        // Add the new reply to the replies state
        setReply((prevReplies: Reply[]) => [...prevReplies, newReply]);
  
        toast.success("Reply added");
        setActiveReply(null); // Hide reply input form after saving
        form.reset(); // Reset the reply form
        router.refresh();
      } catch (error) {
        console.error("Error adding reply:", error);
        toast.error("Something went wrong. Please try again.");
      }
    };
  
    const handleReactionSelect = (emoji: string) => {
      // Add the selected emoji to the current reply content value
      const currentReply = form.getValues("replyContent");
      form.setValue("replyContent", `${currentReply} ${emoji}`);
      setShowEmojiPicker(false); // Close emoji picker after selection
    };
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-sky-500 mb-2">Comments</h3>
        <div className="flex gap-4">
        <div>
  {comments
    .slice()
    .reverse()
    .map((comment) => (
      <div
        key={comment.id}
        className="mb-4 border border-gray-700 p-3 rounded-lg bg-gray-700"
      >
        <div className="flex items-center gap-3 mb-2">
        <Image
            src={comment.user.image || "/default-avatar.png"}
            alt={comment.user.name}
            width={32} // Set the width explicitly to match "w-8" (8 * 4 = 32px)
            height={32} // Set the height explicitly to match "h-8" (8 * 4 = 32px)
            className="rounded-full"
          />
          <span className="text-gray-200 font-semibold">
            {comment.user.name}
          </span>
        </div>
        <p className="text-gray-300">{comment.comments || "No content"}</p>

        {/* Reaction emojis with count */}
        <div className="flex items-center gap-4 mt-2 text-gray-400">
          <span className="flex items-center">
            👍 {getReactionCount(comment.reactions, "like")}
          </span>
          <span className="flex items-center">
            👎 {getReactionCount(comment.reactions, "dislike")}
          </span>
          <span className="flex items-center">
            ❤️ {getReactionCount(comment.reactions, "love")}
          </span>
          {/* Reply button */}
          <button
            className="text-sm text-sky-500 ml-4 hover:underline"
            onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
          >
            Reply
          </button>
        </div>

        {/* Reply input form - always above replies */}
        {activeReply === comment.id && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => onSubmit(values, comment.id))}
              className="mt-2"
            >
              <FormField
                control={form.control}
                name="replyContent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Write your reply here..."
                        className="text-white bg-gray-800 rounded-full px-4 py-2 w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-x-2 mt-2 relative">
                <Button
                  type="button"
                  onClick={toggleEmojiPicker}
                  variant="ghost"
                  className="text-gray-400"
                >
                  😊 Reaction
                </Button>

                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2 bg-gray-700 rounded-md shadow-lg p-2 flex gap-2 flex-wrap max-w-xs">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReactionSelect(emoji)}
                        className="text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => setActiveReply(null)}
                  variant="ghost"
                  className="text-gray-400"
                >
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )}

        {/* Display replies below the reply input form */}
        <div className="mt-4">
          {(reply || [])
            .filter((reply) => reply.commentId === comment.id)
            .slice()
            .reverse() // Reverse replies to show recent ones at the top
            .map((reply) => (
              <div
                key={reply.id}
                className="flex flex-col gap-2 mb-3 ml-6 border-l border-gray-600 pl-3"
              >
                <div className="flex items-start gap-3">
                <Image
                    src={reply.user?.image || "/default-avatar.png"}
                    alt={reply.user?.name || "User avatar"}
                    width={24} // Set the width explicitly
                    height={24} // Set the height explicitly
                    className="rounded-full"
                  />
                  <div>
                    <span className="text-gray-200 font-semibold">
                      {reply.user?.name || "Anonymous"}
                    </span>
                    <p className="text-gray-300">{reply.replyContent}</p>
                  </div>
                </div>

                {/* Reactions for each reply */}
                <div className="flex items-center gap-4 mt-1 text-gray-400 ml-9">
                  <span className="flex items-center">
                    👍 {getReactionCount(reply.reactions || [], "like")}
                  </span>
                  <span className="flex items-center">
                    👎 {getReactionCount(reply.reactions || [], "dislike")}
                  </span>
                  <span className="flex items-center">
                    ❤️ {getReactionCount(reply.reactions || [], "love")}
                  </span>
                  {/* Reply button for each reply */}
                  <button
                    className="text-sm text-sky-500 ml-4 hover:underline"
                    onClick={() => setActiveReply(activeReply === reply.id ? null : reply.id)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
        ))}
    </div>

        </div>
      </div>
    );
  };
  
  export default CommentDisplay;
  







