"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, BookOpen, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ChapterLearningOutcomeFormProps {
  initialData: {
    learningOutcomes: string | null;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  learningOutcomes: z.string().min(1, {
    message: "Learning outcomes are required",
  }),
});

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
    ['link']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link'
];

export const ChapterLearningOutcomeForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterLearningOutcomeFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState(initialData.learningOutcomes || "");
  const router = useRouter();

  useEffect(() => {
    const truncateHtml = (html: string, maxLength: number) => {
      const div = document.createElement('div');
      div.innerHTML = html || '';
      const text = div.textContent || div.innerText;
      if (text.length <= maxLength) return html;
      return text.substring(0, maxLength).trim() + '...';
    };

    if (initialData.learningOutcomes) {
      setTruncatedContent(isExpanded 
        ? initialData.learningOutcomes 
        : truncateHtml(initialData.learningOutcomes, 150)
      );
    }
  }, [isExpanded, initialData.learningOutcomes]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningOutcomes: initialData.learningOutcomes || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={cn(
      "p-4 mt-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-x-2">
            <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Learning Outcomes
            </p>
          </div>
          {!isEditing && (
            <div className="mt-2">
              {!initialData.learningOutcomes ? (
                <p className="text-sm italic text-slate-600 dark:text-slate-400">
                  No learning outcomes defined yet
                </p>
              ) : (
                <div className="space-y-2">
                  <div 
                    className={cn(
                      "text-slate-800 dark:text-slate-200",
                      "prose prose-sm max-w-none",
                      "prose-headings:text-slate-900 dark:prose-headings:text-slate-100",
                      "prose-p:text-slate-800 dark:prose-p:text-slate-200",
                      "prose-strong:text-slate-900 dark:prose-strong:text-white",
                      "prose-ul:text-slate-800 dark:prose-ul:text-slate-200",
                      "prose-li:text-slate-800 dark:prose-li:text-slate-200",
                      "prose-a:text-purple-600 dark:prose-a:text-purple-400"
                    )}
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  />
                  {initialData.learningOutcomes.length > 150 && (
                    <Button
                      onClick={() => setIsExpanded(!isExpanded)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-purple-700 dark:text-purple-300",
                        "hover:text-purple-800 dark:hover:text-purple-200",
                        "p-0 h-auto",
                        "text-sm font-medium"
                      )}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "text-purple-700 dark:text-purple-300",
            "hover:text-purple-800 dark:hover:text-purple-200",
            "hover:bg-purple-50 dark:hover:bg-purple-500/10",
            "w-full sm:w-auto",
            "justify-center",
            "transition-all duration-200"
          )}
        >
          {isEditing ? (
            <span className="text-rose-700 dark:text-rose-300">Cancel</span>
          ) : (
            <div className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </div>
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
              name="learningOutcomes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className={cn(
                      "rounded-lg",
                      "border border-gray-200 dark:border-gray-700/50",
                      "bg-white dark:bg-gray-900/50"
                    )}>
                      <ReactQuill
                        {...field}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        readOnly={isSubmitting}
                        placeholder="List the learning outcomes for this chapter..."
                        className={cn(
                          "!text-gray-900 dark:!text-gray-200",
                          "[&]:text-gray-900 dark:[&]:text-gray-200",
                          "[&_.ql-editor]:min-h-[200px]",
                          "[&_.ql-editor]:text-sm sm:[&_.ql-editor]:text-base",
                          "[&_.ql-editor]:!text-gray-900 dark:[&_.ql-editor]:!text-gray-200",
                          "[&_.ql-container]:!bg-white dark:[&_.ql-container]:!bg-gray-900/50",
                          "[&_.ql-editor]:!bg-white dark:[&_.ql-editor]:!bg-gray-900/50",
                          "[&_.ql-toolbar]:!border-gray-200 dark:[&_.ql-toolbar]:!border-gray-700/50",
                          "[&_.ql-toolbar]:!bg-gray-50 dark:[&_.ql-toolbar]:!bg-gray-800/50",
                          "[&_.ql-container]:!border-gray-200 dark:[&_.ql-container]:!border-gray-700/50",
                          "[&_.ql-editor.ql-blank::before]:!text-gray-500 dark:[&_.ql-editor.ql-blank::before]:!text-gray-400",
                          "[&_.ql-picker-label]:!text-gray-700 dark:[&_.ql-picker-label]:!text-gray-300",
                          "[&_.ql-stroke]:!stroke-gray-700 dark:[&_.ql-stroke]:!stroke-gray-300",
                          "[&_.ql-fill]:!fill-gray-700 dark:[&_.ql-fill]:!fill-gray-300",
                          "[&_.ql-picker-item]:!text-gray-700 dark:[&_.ql-picker-item]:!text-gray-300",
                          "[&_.ql-picker-options]:!bg-white dark:[&_.ql-picker-options]:!bg-gray-800",
                          "[&_.ql-snow.ql-toolbar]:!rounded-t-lg",
                          "[&_.ql-toolbar.ql-snow_.ql-formats]:!mr-2"
                        )}
                      />
                    </div>
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
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-700 dark:text-purple-300",
                  "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                  "hover:text-purple-800 dark:hover:text-purple-200",
                  "border border-purple-200/20 dark:border-purple-500/20",
                  "w-full sm:w-auto",
                  "justify-center",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-600 dark:border-purple-400 border-t-transparent" />
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