"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PostCommentProps {
  initialData: Post;
  postId: string;
  commentId: string; // Added to pass commentId for replying to a specific comment
  onSave: () => void; // Added prop to signal when reply is saved
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

export const ReplyComment = ({
  initialData,
  postId,
  commentId,
  onSave, // Receive onSave prop
}: PostCommentProps) => {
  
    //console.log(commentId)
 
    const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleComment = () => setIsCommenting((current) => !current);
  const toggleEmojiPicker = () => setShowEmojiPicker((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      replyContent: "", // Initialize with an empty string for new replies
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting reply values:", values); // Log the values for clarity
    try {
      // Send the reply text (with emojis) to the server
      const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/replies`, values);
      toast.success("Reply added");
      onSave(); // Call onSave to close the reply box
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error adding reply:", error.response?.data || error.message);
      } else {
        console.error("Error adding reply:", error);
      }
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
    <div className={cn(
      "mt-4 pt-4",
      "border-t border-gray-200/50 dark:border-gray-700/50",
      "bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-800/30 dark:to-gray-900/30",
      "backdrop-blur-sm",
      "rounded-xl",
      "transition-all duration-300"
    )}>
      <div className="flex items-center space-x-3 px-4">
        <Image 
          src="/path/to/avatar.jpg"
          alt="User avatar"
          width={40}
          height={40}
          className={cn(
            "rounded-full",
            "ring-2 ring-purple-500/20",
            "transition-all duration-300",
            "group-hover:ring-purple-500/40"
          )}
        />
        <Button 
          onClick={toggleComment} 
          variant="ghost" 
          className={cn(
            "text-gray-600 dark:text-gray-400",
            "hover:text-gray-700 hover:bg-gray-100/50",
            "dark:hover:text-gray-300 dark:hover:bg-gray-800/50",
            "transition-colors duration-200"
          )}
        >
          Write a reply...
        </Button>
      </div>

      {isCommenting && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 px-4 pb-4"
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
                      className={cn(
                        "bg-white/80 dark:bg-gray-900/50",
                        "text-gray-700 dark:text-gray-200",
                        "border border-gray-200/50 dark:border-gray-700/50",
                        "rounded-full px-4 py-2 w-full",
                        "placeholder:text-gray-500",
                        "focus:ring-2 focus:ring-purple-500/20",
                        "hover:bg-white dark:hover:bg-gray-900/70",
                        "transition-all duration-200"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-2 mt-2 relative">
              <Button
                type="button"
                onClick={toggleEmojiPicker}
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-gray-700 hover:bg-gray-100/50",
                  "dark:hover:text-gray-300 dark:hover:bg-gray-800/50",
                  "transition-colors duration-200"
                )}
              >
                😊 Reaction
              </Button>
              
              {showEmojiPicker && (
                <div className={cn(
                  "absolute bottom-full mb-2",
                  "bg-white/95 dark:bg-gray-900/95",
                  "border border-gray-200/50 dark:border-gray-700/50",
                  "rounded-md shadow-lg",
                  "p-2 flex gap-2 flex-wrap max-w-xs",
                  "backdrop-blur-sm"
                )}>
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleReactionSelect(emoji)}
                      className={cn(
                        "text-lg p-1 rounded",
                        "hover:bg-gray-100/80 dark:hover:bg-gray-700/80",
                        "transition-all duration-200"
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
                  "text-gray-600 dark:text-gray-400",
                  "hover:text-gray-700 hover:bg-gray-100/50",
                  "dark:hover:text-gray-300 dark:hover:bg-gray-800/50",
                  "transition-colors duration-200"
                )}
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className={cn(
                  "bg-blue-500 hover:bg-blue-600",
                  "dark:bg-blue-600 dark:hover:bg-blue-700",
                  "text-white font-medium",
                  "px-4 py-2 rounded-full",
                  "shadow-lg shadow-blue-500/10",
                  "hover:shadow-blue-500/20",
                  "transition-all duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "disabled:hover:shadow-none"
                )}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
