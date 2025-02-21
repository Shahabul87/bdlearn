"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostchapterTitleFormProps {
  initialData: {
    title: string;
  };
  postId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const PostchapterTitleForm = ({
  initialData,
  postId,
  chapterId,
}: PostchapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}`, values);
      toast.success("Title updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative">
      {!isEditing ? (
        <div className="flex items-start justify-between group">
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
              Chapter Title
            </p>
            <p className={cn(
              "text-sm break-words leading-relaxed",
              !initialData.title && "italic",
              initialData.title 
                ? "text-gray-700 dark:text-gray-300 font-medium" 
                : "text-gray-500 dark:text-gray-400"
            )}>
              {initialData.title || "No title provided"}
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2" />
            {initialData.title ? "Edit" : "Add"}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter chapter title..."
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200/50 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "focus:ring-2 focus:ring-offset-2",
                        "focus:ring-purple-500/30 dark:focus:ring-purple-500/20",
                        "focus:border-purple-500/30 dark:focus:border-purple-500/30",
                        "font-medium text-base"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                size="sm"
                className={cn(
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-600 dark:text-purple-400",
                  "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                  "hover:text-purple-700 dark:hover:text-purple-300",
                  "focus:ring-2 focus:ring-offset-2",
                  "focus:ring-purple-500/30 dark:focus:ring-purple-500/20",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}; 