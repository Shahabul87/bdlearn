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
    <div className="relative p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      {isUpdating && (
        <div className="absolute h-full w-full bg-gray-900/50 top-0 right-0 rounded-xl flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-purple-500" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <LayoutList className="h-5 w-5 text-purple-400" />
          <div>
            <h2 className="text-gray-200">
              Post Chapters
            </h2>
            <p className="text-sm text-gray-400">
              Add and reorder your post chapters
            </p>
          </div>
        </div>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
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
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-purple-500/50"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              variant="ghost"
              className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
            >
              Create
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className={cn(
          "mt-4",
          !initialData.postchapter.length && "text-sm italic text-gray-500"
        )}>
          {!initialData.postchapter.length && "No chapters"}
          <PostChapterList
            onEdit={onEdit}
            onReorder={onReorder}
            onDelete={onDelete}
            items={initialData.postchapter || []}
          />
        </div>
      )}
    </div>
  );
};