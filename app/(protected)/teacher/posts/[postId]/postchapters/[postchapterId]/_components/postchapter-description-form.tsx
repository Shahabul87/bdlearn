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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface PostchapterDescriptionFormProps {
  initialData: {
    description: string | null;
  };
  postId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const PostchapterDescriptionForm = ({
  initialData,
  postId,
  chapterId,
}: PostchapterDescriptionFormProps) => {
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
      await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}`, values);
      toast.success("Description updated");
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
            <p className="text-lg font-medium text-gray-200">Description</p>
            <p className={cn(
              "text-sm",
              initialData.description ? "text-gray-400" : "text-gray-500 italic"
            )}>
              {initialData.description || "No description provided"}
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)} variant="ghost" className="text-purple-400 hover:text-purple-300">
            <Pencil className="h-4 w-4 mr-2" />
            {initialData.description ? "Edit" : "Add"}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter description"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 min-h-[150px] resize-y"
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