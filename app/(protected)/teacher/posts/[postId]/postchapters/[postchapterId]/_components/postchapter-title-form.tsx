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
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      {!isEditing ? (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-medium text-gray-200">Title</p>
            <p className="text-sm text-gray-400">{initialData.title}</p>
          </div>
          <Button onClick={() => setIsEditing(true)} variant="ghost" className="text-purple-400 hover:text-purple-300">
            <Pencil className="h-4 w-4 mr-2" />
            Edit
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
                      placeholder="Enter title"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
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