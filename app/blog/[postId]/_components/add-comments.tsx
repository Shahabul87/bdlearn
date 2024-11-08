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
    <div className="mt-4 border-t border-gray-700 pt-4">
      <div className="flex items-center space-x-3">
        <img
          src="/path/to/avatar.jpg" // Placeholder for user's avatar image
          alt="User Avatar"
          className="h-8 w-8 rounded-full"
        />
        <Button onClick={toggleComment} variant="ghost" className="text-gray-400">
          Add a comment...
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
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Write your comment here..."
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
                Comment
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
