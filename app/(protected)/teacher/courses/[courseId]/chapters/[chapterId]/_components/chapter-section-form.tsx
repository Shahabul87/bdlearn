"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter, Section } from "@prisma/client";

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
import { ChapterSectionList } from "./chapter-section-list";

interface ChaptersSectionFormProps {
  chapter: Chapter & { 
    sections: Section[] 
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const ChaptersSectionForm = ({
  chapter,
  courseId,
  chapterId,
}: ChaptersSectionFormProps) => {
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
      console.log("Submitting section:", values);
      
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/sections`, 
        values
      );
      
      console.log("Section creation response:", response.data);
      
      toast.success("Section created");
      setIsCreating(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Section creation error:", error);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/sections/reorder`, {
        list: updateData
      });
      toast.success("Sections reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (sectionId: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}`);
  };

  const onDelete = async (sectionId: string) => {
    try {
      console.log("Deleting section:", sectionId);
      
      const response = await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}`
      );
      
      console.log("Delete response:", response.data);
      toast.success("Section deleted");
      router.refresh();
    } catch (error: any) {
      console.error("Delete error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to delete section");
    }
  };

  return (
    <div className={cn(
      "relative p-4 sm:p-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm",
      "overflow-x-auto",
      "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
      "scrollbar-track-transparent"
    )}>
      <div className="min-w-[600px] sm:min-w-full">
        {isUpdating && (
          <div className="absolute h-full w-full bg-white/10 dark:bg-gray-900/20 top-0 right-0 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Loader2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400 animate-spin" />
          </div>
        )}
        <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              <div className="p-2 w-fit rounded-md bg-cyan-50 dark:bg-cyan-500/10">
                <LayoutGrid className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                  Chapter Sections
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                  Add and organize your course content
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsCreating(!isCreating)}
            variant="ghost"
            size="sm"
            className={cn(
              "transition-all duration-200",
              "w-full sm:w-auto",
              "justify-center",
              isCreating
                ? "text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                : "text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-500/10"
            )}
          >
            {isCreating ? (
              "Cancel"
            ) : (
              <div className="flex items-center gap-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Section</span>
              </div>
            )}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
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
                            placeholder="e.g. 'Introduction to the topic'"
                            className={cn(
                              "bg-white dark:bg-gray-900/50",
                              "border-gray-200 dark:border-gray-700/50",
                              "text-gray-900 dark:text-gray-200",
                              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                              "focus:ring-cyan-500/20",
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
                      "bg-cyan-50 dark:bg-cyan-500/10",
                      "text-cyan-700 dark:text-cyan-300",
                      "hover:bg-cyan-100 dark:hover:bg-cyan-500/20",
                      "hover:text-cyan-800 dark:hover:text-cyan-200",
                      "border border-cyan-200/20 dark:border-cyan-500/20",
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
            <ChapterSectionList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={chapter.sections || []}
            />
            {chapter.sections.length === 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 italic text-center mt-4">
                No sections yet
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
