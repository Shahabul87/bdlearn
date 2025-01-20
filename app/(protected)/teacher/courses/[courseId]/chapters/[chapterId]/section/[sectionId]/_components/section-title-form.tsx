"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, FileText, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const SectionTitleForm = ({
  initialData,
  courseId,
  chapterId,
  sectionId,
}: SectionTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}`, values);
      toast.success("Section updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={cn(
      "p-4 mt-4 rounded-lg",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex items-center gap-x-2">
          <div className={cn(
            "p-2 w-fit rounded-lg",
            "bg-cyan-50 dark:bg-cyan-500/10"
          )}>
            <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Section Title
          </h3>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "bg-cyan-50 dark:bg-cyan-500/10",
            "text-cyan-700 dark:text-cyan-300",
            "hover:bg-cyan-100 dark:hover:bg-cyan-500/20",
            "hover:text-cyan-800 dark:hover:text-cyan-200",
            "w-full sm:w-auto",
            "justify-center",
            "transition-all duration-200"
          )}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-sm sm:text-base mt-2",
            "text-gray-700 dark:text-gray-300"
          )}
        >
          {initialData.title}
        </motion.p>
      )}
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
            <div className="flex items-center gap-x-2">
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
                  "transition-all duration-200",
                  !isValid && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="h-4 w-4" />
                    </motion.div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};