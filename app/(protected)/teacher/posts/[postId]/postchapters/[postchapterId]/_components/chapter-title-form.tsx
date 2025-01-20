"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChapterTitleFormProps {
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

export const ChapterTitleForm = ({
  initialData,
  postId,
  chapterId,
}: ChapterTitleFormProps) => {
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
      toast.success("Chapter updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      <div className="font-medium flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-gray-200 flex items-center gap-x-2">
            <span>Chapter Title</span>
            {!initialData.title && (
              <span className="text-xs text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                Required
              </span>
            )}
          </div>
          {!isEditing && (
            <p className="text-sm text-gray-400">
              {initialData.title || "No title set"}
            </p>
          )}
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {isEditing && (
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
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
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