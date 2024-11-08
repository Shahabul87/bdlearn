"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

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
      // Log the full error response for debugging
      console.error("Error adding reply:", error.response?.data || error.message);
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
    <div className="mt-4 border-t border-gray-700 pt-4">
      <div className="flex items-center space-x-3">
        <img
          src="/path/to/avatar.jpg" // Placeholder for user's avatar image
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />
        <Button onClick={toggleComment} variant="ghost" className="text-gray-400">
          Write a reply...
        </Button>
      </div>

      {isCommenting && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
                onClick={toggleComment}
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
    </div>
  );
};
