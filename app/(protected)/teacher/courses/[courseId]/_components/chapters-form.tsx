"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter, Course } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChaptersList } from "./chapters-list";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const ChaptersForm = ({
  initialData,
  courseId,
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
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created");
      setIsCreating(false);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
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

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className={cn(
      "relative p-4 mt-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/50",
      "hover:bg-gray-50 dark:hover:bg-gray-800/70",
      "backdrop-blur-sm",
      "transition-all duration-200"
    )}>
      {isUpdating && (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600 dark:text-purple-400" />
        </div>
      )}
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <div className="p-2 w-fit rounded-md bg-purple-50 dark:bg-purple-500/10">
              <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Course Chapters
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Organize your course content
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          variant="ghost"
          size="sm"
          className={cn(
            "text-purple-700 dark:text-purple-300",
            "hover:text-purple-800 dark:hover:text-purple-200",
            "hover:bg-purple-50 dark:hover:bg-purple-500/10",
            "w-full sm:w-auto",
            "justify-center"
          )}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add chapter
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
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
                          placeholder="e.g. 'Introduction to the course'"
                          className={cn(
                            "bg-white dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700/50",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:ring-purple-500/20",
                            "text-sm sm:text-base font-medium",
                            "transition-all duration-200"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "bg-purple-50 dark:bg-purple-500/10",
                    "text-purple-700 dark:text-purple-300",
                    "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                    "hover:text-purple-800 dark:hover:text-purple-200",
                    "w-full sm:w-auto",
                    "justify-center",
                    "transition-all duration-200"
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    "Create"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
          {initialData.chapters.length === 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic text-center mt-4">
              No chapters yet
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};