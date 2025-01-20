"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, AlignLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

interface ChapterDescriptionFormProps {
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

export const ChapterDescriptionForm = ({
  initialData,
  postId,
  chapterId,
}: ChapterDescriptionFormProps) => {
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
          <div className="flex items-center gap-x-2">
            <AlignLeft className="h-4 w-4 text-purple-400" />
            <span className="text-gray-200">Chapter Description</span>
            {!initialData.description && (
              <span className="text-xs text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                Required
              </span>
            )}
          </div>
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "text-sm",
                !initialData.description && "text-gray-500 italic",
                initialData.description && "text-gray-400 leading-relaxed"
              )}
            >
              {initialData.description || "No description provided"}
            </motion.div>
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
              {initialData.description ? "Edit" : "Add"}
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="e.g. 'In this chapter, we will explore...'"
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
              </div>
            </form>
          </Form>
        </motion.div>
      )}
    </div>
  );
}; 