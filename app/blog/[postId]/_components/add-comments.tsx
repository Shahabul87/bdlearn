"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import { cn } from "@/lib/utils";
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

interface PostCommentProps {
  initialData: Post;
  postId: string;
}

const formSchema = z.object({
  comment: z.string().min(1, {
    message: "Comment is required",
  }),
});

const emojiOptions = [
  "👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "😍", "😆", "😎",
  "😱", "🎉", "💯", "😅", "🥳", "😤", "😋", "😡", "😴", "🤔"
];

export const PostComment = ({
  initialData,
  postId
}: PostCommentProps) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleComment = () => setIsCommenting((current) => !current);
  const toggleEmojiPicker = () => setShowEmojiPicker((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "", // Initialize with an empty string for new comments
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Send the comment text (with emojis) to the server
      console.log(values)
      await axios.post(`/api/posts/${postId}/comments`, values);
      toast.success("Comment added");
      toggleComment();
      router.refresh();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Something went wrong");
    }
  };

  const handleReactionSelect = (emoji: string) => {
    // Add the selected emoji to the current comment value
    const currentComment = form.getValues("comment");
    form.setValue("comment", `${currentComment} ${emoji}`);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  return (
    <div className="mt-6 border-t border-gray-200/50 dark:border-gray-800/50 pt-6 mb-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="relative group">
          <Image
            src="/default-avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <Button 
          onClick={toggleComment} 
          variant="ghost" 
          className={cn(
            "text-gray-600 dark:text-gray-400/90 lg:text-lg",
            "font-light tracking-wide",
            "hover:text-gray-700 hover:bg-gray-100/50 dark:hover:text-gray-300 dark:hover:bg-gray-800/50",
            "transition-all duration-300"
          )}
        >
          Add a comment...
        </Button>
      </div>

      {isCommenting && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Write your comment here..."
                      className={cn(
                        "text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50",
                        "border border-gray-200/50 dark:border-gray-700/50",
                        "rounded-xl px-4 py-3",
                        "text-base placeholder:text-gray-500",
                        "focus:ring-2 focus:ring-purple-500/20",
                        "transition-all duration-300",
                        "hover:bg-gray-50/70 dark:hover:bg-gray-800/70"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400/90" />
                </FormItem>
              )}
            />
            <div className="flex justify-end items-center gap-3 relative">
              <Button
                type="button"
                onClick={toggleEmojiPicker}
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "transition-all duration-300"
                )}
              >
                😊 Reaction
              </Button>
              
              {showEmojiPicker && (
                <div className={cn(
                  "absolute bottom-full mb-2",
                  "bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm",
                  "rounded-xl shadow-xl",
                  "p-3 border border-gray-200/50 dark:border-gray-700/50",
                  "flex gap-2 flex-wrap max-w-xs",
                  "animate-in fade-in-50 slide-in-from-bottom-2"
                )}>
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReactionSelect(emoji)}
                      className={cn(
                        "text-lg hover:scale-110",
                        "transition-transform duration-200",
                        "p-1 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              
              <Button
                type="button"
                onClick={toggleComment}
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                  "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                  "transition-all duration-300"
                )}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className={cn(
                  "bg-gradient-to-r from-purple-500 to-blue-500",
                  "text-white font-medium",
                  "px-6 py-2.5 rounded-xl",
                  "shadow-lg shadow-purple-500/10",
                  "hover:shadow-purple-500/20",
                  "transition-all duration-300",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "disabled:hover:shadow-none"
                )}
              >
                Comment
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
