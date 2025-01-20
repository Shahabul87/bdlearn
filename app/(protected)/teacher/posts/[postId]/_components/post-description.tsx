"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, AlignLeft } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  initialData: Post;
  postId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const PostDescription = ({
  initialData,
  postId
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Description updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      {!isEditing ? (
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
              <AlignLeft className="w-4 h-4 text-purple-400" />
              <span className="font-medium text-gray-200">Description</span>
              {!initialData.description && (
                <span className="text-xs text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              {initialData.description ? (
                <div className="prose prose-gray prose-sm dark:prose-invert">
                  {initialData.description}
                </div>
              ) : (
                <p className="italic text-gray-500">
                  No description provided. Click edit to add one.
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="text-gray-400">
                    Write a compelling description for your post
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 'This post explores the fascinating world of...'"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-purple-500/50 min-h-[150px] resize-y"
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
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-300"
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
