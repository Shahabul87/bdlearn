"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
import { useRouter } from "next/navigation";
import { Post, PostChapterSection } from "@prisma/client";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { PostChaptersListPage } from "./post-chapter-creation";
import { ConfirmModal } from "@/components/modals/confirm-modal";


interface PostsFormProps {
  initialData: Post & { postchapter:  PostChapterSection[] };
  postId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

export const PostChaptersForm = ({ initialData, postId }: PostsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  }

  //console.log(initialData)

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
      toast.success("Post Chapter Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/posts/${postId}/postchapters/reorder`, {list: updateData});
      toast.success("Post Chapters Reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/posts/${postId}/postchapters/${id}`);
  }

  const onDelete = async (postchapterId: string) => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/posts/${postId}/postchapters/${postchapterId}`);

      toast.success("Post chapter deleted");
      router.refresh();
      router.push(`/teacher/posts/${postId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Post Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Post Chapter
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
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the mind health'"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create Section
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn("text-sm mt-2", !initialData.postchapter.length && "text-cyan-500 italic font-semibold")}>
          {!initialData.postchapter.length && "No chapters"}
              <PostChaptersListPage
                onEdit={onEdit}
                onDelete={onDelete}
                onReorder={onReorder}
                items={initialData.postchapter || []}
              />
        </div>
      )}

      {!isCreating && (
        <p className="text-xs mt-4 text-white/90">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  )
}