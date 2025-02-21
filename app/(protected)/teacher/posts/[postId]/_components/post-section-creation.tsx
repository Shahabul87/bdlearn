"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, LayoutList } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post, Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostChapterList from "./post-chapter-list";

interface ChaptersFormProps {
  initialData: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    postchapter: {
      id: string;
      title: string;
      description: string | null;
      position: number;
      isPublished: boolean;
      createdAt: Date;
      updatedAt: Date;
      isFree: boolean;
      postId: string;
    }[];
  };
  postId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const PostChaptersForm = ({
  initialData,
  postId
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/posts/${postId}/postchapters`, values);
      toast.success("Chapter created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/posts/${postId}/postchapters/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (postchapterId: string) => {
    router.push(`/teacher/posts/${postId}/postchapters/${postchapterId}`);
  };

  const onDelete = async (postchapterId: string) => {
    try {
      await axios.delete(`/api/posts/${postId}/postchapters/${postchapterId}`);
      toast.success("Chapter deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative p-3 sm:p-4 lg:p-6 bg-white/50 dark:bg-gray-800/40 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/50 transition-all duration-200">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-50/50 dark:bg-gray-900/50 top-0 right-0 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Loader2 className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
        </div>
      )}
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-x-2">
          <LayoutList className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
          <div>
            <h2 className="text-base sm:text-lg text-gray-900 dark:text-gray-200">
              Post Chapters
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add and reorder your post chapters
            </p>
          </div>
        </div>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="w-full sm:w-auto text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:text-purple-300 dark:hover:bg-purple-500/10"
        >
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the topic'"
                      className="bg-white dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-200 focus:ring-purple-500/20 dark:focus:ring-purple-500/30 focus:border-purple-500/30 dark:focus:border-purple-500/30 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                className="bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300 w-full sm:w-auto"
              >
                Create
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={toggleCreating}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className={cn(
          "mt-4",
          !initialData.postchapter.length && "text-sm italic text-gray-500 dark:text-gray-400"
        )}>
          {!initialData.postchapter.length && "No chapters"}
          <div className="mt-2">
            <PostChapterList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={initialData.postchapter || []}
            />
          </div>
        </div>
      )}
    </div>
  );
};