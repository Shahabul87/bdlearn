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
import { MessageCircle, Smile, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

interface PostCommentProps {
  initialData: Post;
  postId: string;
  onCommentAdded?: () => void;
}

const formSchema = z.object({
  comments: z.string().min(1, {
    message: "Comment is required",
  }),
});

const emojiOptions = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  // Secondary emojis
  { emoji: "🔥", label: "Fire" },
  { emoji: "👏", label: "Clap" },
  { emoji: "🎉", label: "Party" },
  { emoji: "💯", label: "Perfect" },
  { emoji: "🤔", label: "Thinking" },
  { emoji: "😍", label: "Heart Eyes" },
];

export const PostComment = ({
  initialData,
  postId,
  onCommentAdded
}: PostCommentProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/posts/${postId}/comments`, values);
      toast.success("Comment added successfully");
      form.reset();
      router.refresh();
      onCommentAdded?.();
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleReactionSelect = (emoji: string) => {
    const currentComment = form.getValues("comments");
    form.setValue("comments", `${currentComment}${emoji}`);
  };

  const handleClose = () => {
    onCommentAdded?.();
  };

  return (
    <Card className="border-none shadow-lg bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Write your comment here..."
                      className="resize-none min-h-[150px] bg-background/50 focus:bg-background transition-all duration-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className={cn(
            "flex justify-between items-center",
            "border-t border-gray-200 dark:border-gray-700/50",
            "pt-4 pb-2",
            "bg-gradient-to-b from-transparent to-gray-50/50",
            "dark:to-gray-800/50"
          )}>
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="h-8 w-8"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add emoji</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {showEmojiPicker && (
                <Card className="absolute bottom-full left-0 mb-2 p-3 w-[360px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl border border-gray-200/50 dark:border-gray-700/50 z-50">
                  <div className="grid grid-cols-6 gap-1">
                    {emojiOptions.slice(0, 6).map(({ emoji, label }) => (
                      <Button
                        key={emoji}
                        type="button"
                        variant="ghost"
                        className="relative group h-14 w-14 p-0 hover:bg-accent/50 rounded-xl overflow-hidden"
                        onClick={() => {
                          handleReactionSelect(emoji);
                          setShowEmojiPicker(false);
                        }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span className="text-2xl transform group-hover:scale-0 group-hover:-translate-y-10 transition-transform duration-200">
                            {emoji}
                          </span>
                          <span className="absolute text-3xl transform scale-0 translate-y-10 group-hover:scale-125 group-hover:translate-y-0 transition-all duration-200 group-hover:animate-bounce">
                            {emoji}
                          </span>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-200">
                          <span className="text-xs font-medium px-2 py-1 rounded-md bg-black/80 text-white whitespace-nowrap">
                            {label}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Button>
                    ))}
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="grid grid-cols-6 gap-1">
                    {emojiOptions.slice(6).map(({ emoji, label }) => (
                      <Button
                        key={emoji}
                        type="button"
                        variant="ghost"
                        className="relative group h-14 w-14 p-0 hover:bg-accent/50 rounded-xl overflow-hidden"
                        onClick={() => {
                          handleReactionSelect(emoji);
                          setShowEmojiPicker(false);
                        }}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span className="text-2xl transform group-hover:scale-0 group-hover:-translate-y-10 transition-transform duration-200">
                            {emoji}
                          </span>
                          <span className="absolute text-3xl transform scale-0 translate-y-10 group-hover:scale-125 group-hover:translate-y-0 transition-all duration-200 group-hover:animate-bounce">
                            {emoji}
                          </span>
                        </div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-200">
                          <span className="text-xs font-medium px-2 py-1 rounded-md bg-black/80 text-white whitespace-nowrap">
                            {label}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Button>
                    ))}
                  </div>
                </Card>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className={cn(
                  "h-9 px-4 font-medium",
                  "bg-white dark:bg-gray-800/50",
                  "border-gray-300 dark:border-gray-700",
                  "text-gray-800 dark:text-gray-200",
                  "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                  "hover:text-gray-900 dark:hover:text-white",
                  "hover:border-gray-400 dark:hover:border-gray-600",
                  "transition-all duration-300",
                  "backdrop-blur-sm",
                  "shadow-sm hover:shadow-md",
                  "active:scale-95"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </span>
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={cn(
                  "h-9 px-6 font-medium",
                  "bg-gradient-to-r from-blue-600 to-indigo-600",
                  "dark:from-blue-500 dark:to-indigo-500",
                  "text-white",
                  "hover:from-blue-700 hover:to-indigo-700",
                  "dark:hover:from-blue-600 dark:hover:to-indigo-600",
                  "disabled:from-gray-300 disabled:to-gray-400",
                  "disabled:dark:from-gray-700 disabled:dark:to-gray-800",
                  "disabled:text-gray-500 dark:disabled:text-gray-400",
                  "disabled:cursor-not-allowed disabled:opacity-70",
                  "transition-all duration-300",
                  "shadow-md hover:shadow-lg",
                  "shadow-blue-500/20 hover:shadow-blue-500/30",
                  "dark:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
                  "active:scale-95",
                  "disabled:hover:shadow-none disabled:active:scale-100",
                  "disabled:border disabled:border-gray-200 dark:disabled:border-gray-700"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4" />
                      Post Comment
                    </>
                  )}
                </span>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
