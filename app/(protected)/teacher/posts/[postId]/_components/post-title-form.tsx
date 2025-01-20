"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner";
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

interface TitleFormProps {
  initialData: {
    title: string;
  };
  postId: string;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const PostTitleForm = ({
  initialData,
  postId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log("Submitting values:", values);
    // console.log("Post ID:", postId);
  
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Post updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      {!isEditing ? (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="font-medium text-gray-200 flex items-center gap-x-2">
              <span>Post Title</span>
              {!initialData.title && (
                <span className="text-xs text-rose-500">(required)</span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {initialData.title || "No title set"}
            </p>
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to Programming'"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-purple-500/50 focus:border-purple-500/50"
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
}