"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, AlignLeft, FileText } from "lucide-react";
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

interface ChapterDescriptionFormProps {
  initialData: {
    description: string | null;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'code-block',
  'color', 'background',
  'link', 'image'
];

export const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [truncatedContent, setTruncatedContent] = useState(initialData.description || "");
  const router = useRouter();

  useEffect(() => {
    const truncateHtml = (html: string, maxLength: number) => {
      const div = document.createElement('div');
      div.innerHTML = html || '';
      const text = div.textContent || div.innerText;
      if (text.length <= maxLength) return html;
      return text.substring(0, maxLength).trim() + '...';
    };

    if (initialData.description) {
      setTruncatedContent(isExpanded 
        ? initialData.description 
        : truncateHtml(initialData.description, 150)
      );
    }
  }, [isExpanded, initialData.description]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || "",
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
      "backdrop-blur-sm",
      "group"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-x-2">
            <div className="p-2 w-fit rounded-md bg-cyan-50 dark:bg-cyan-500/10">
              <FileText className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
              Chapter Description
            </p>
          </div>
          {!isEditing && (
            <div className="mt-2">
              {!initialData.description ? (
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  No description provided yet
                </p>
              ) : (
                <div className="space-y-2">
                  <div 
                    className={cn(
                      "text-gray-700 dark:text-gray-300 prose prose-sm max-w-none",
                      "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
                      "prose-p:text-gray-700 dark:prose-p:text-gray-300",
                      "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
                      "prose-ul:text-gray-700 dark:prose-ul:text-gray-300",
                      "prose-blockquote:text-gray-900 dark:prose-blockquote:text-gray-100",
                      "prose-blockquote:border-l-cyan-600 dark:prose-blockquote:border-l-cyan-400",
                      "prose-blockquote:bg-cyan-50 dark:prose-blockquote:bg-cyan-500/5",
                      "prose-code:text-gray-900 dark:prose-code:text-gray-100",
                      "prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900/50",
                      "prose-a:text-cyan-600 dark:prose-a:text-cyan-400",
                      "prose-img:rounded-lg",
                      "prose-hr:border-gray-200 dark:prose-hr:border-gray-700"
                    )}
                    dangerouslySetInnerHTML={{ __html: truncatedContent }}
                  />
                  {initialData.description.length > 150 && (
                    <Button
                      onClick={() => setIsExpanded(!isExpanded)}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-cyan-700 dark:text-cyan-300",
                        "hover:text-cyan-800 dark:hover:text-cyan-200",
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
            "text-cyan-700 dark:text-cyan-300",
            "hover:text-cyan-800 dark:hover:text-cyan-200",
            "hover:bg-cyan-50 dark:hover:bg-cyan-500/10",
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className={cn(
                      "rounded-lg shadow-lg",
                      "border border-gray-200 dark:border-gray-700/50",
                      "bg-white dark:bg-gray-900/50"
                    )}>
                      <ReactQuill
                        {...field}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        readOnly={isSubmitting}
                        placeholder="Write a detailed description of your chapter..."
                        className={cn(
                          "[&_.ql-editor]:min-h-[200px]",
                          "[&_.ql-editor]:text-sm sm:[&_.ql-editor]:text-base",
                          "[&_.ql-toolbar]:!border-gray-200 dark:[&_.ql-toolbar]:!border-gray-700/50",
                          "[&_.ql-toolbar]:!bg-gray-50 dark:[&_.ql-toolbar]:!bg-gray-800",
                          "[&_.ql-container]:!border-gray-200 dark:[&_.ql-container]:!border-gray-700/50",
                          "[&_.ql-editor]:!text-gray-900 dark:[&_.ql-editor]:!text-gray-100",
                          "[&_.ql-editor]:!prose [&_.ql-editor]:!prose-gray dark:[&_.ql-editor]:!prose-invert",
                          "[&_.ql-editor]:!bg-white dark:[&_.ql-editor]:!bg-gray-900",
                          "[&_.ql-editor]:!p-4",
                          "[&_.ql-editor.ql-blank::before]:!text-gray-500 dark:[&_.ql-editor.ql-blank::before]:!text-gray-400",
                          "[&_.ql-picker-label]:!text-gray-900 dark:[&_.ql-picker-label]:!text-gray-100",
                          "[&_.ql-stroke]:!stroke-gray-900 dark:[&_.ql-stroke]:!stroke-gray-100",
                          "[&_.ql-fill]:!fill-gray-900 dark:[&_.ql-fill]:!fill-gray-100",
                          "[&_.ql-picker-item]:!text-gray-900 dark:[&_.ql-picker-item]:!text-gray-100",
                          "[&_.ql-picker-options]:!bg-white dark:[&_.ql-picker-options]:!bg-gray-800",
                          "[&_.ql-snow.ql-toolbar]:!rounded-t-lg",
                          "[&_.ql-toolbar.ql-snow_.ql-formats]:!mr-2",
                          "[&_.ql-snow_.ql-tooltip]:!bg-white dark:[&_.ql-snow_.ql-tooltip]:!bg-gray-800",
                          "[&_.ql-snow_.ql-tooltip]:!text-gray-900 dark:[&_.ql-snow_.ql-tooltip]:!text-gray-100",
                          "[&_.ql-snow]:!text-gray-900 dark:[&_.ql-snow]:!text-gray-100",
                          "[&_.ql-editor_strong]:!text-cyan-700 dark:[&_.ql-editor_strong]:!text-cyan-300",
                          "[&_.ql-editor_em]:!text-cyan-700 dark:[&_.ql-editor_em]:!text-cyan-300",
                          "[&_.ql-editor_u]:!text-cyan-700 dark:[&_.ql-editor_u]:!text-cyan-300",
                          "[&_.ql-editor_blockquote]:!text-cyan-700 dark:[&_.ql-editor_blockquote]:!text-cyan-300",
                          "[&_.ql-editor_blockquote]:!border-l-4",
                          "[&_.ql-editor_blockquote]:!border-cyan-600 dark:[&_.ql-editor_blockquote]:!border-cyan-400",
                          "[&_.ql-editor_blockquote]:!bg-cyan-50 dark:[&_.ql-editor_blockquote]:!bg-cyan-500/5",
                          "[&_.ql-editor_blockquote]:!px-4",
                          "[&_.ql-editor_code-block]:!text-cyan-700 dark:[&_.ql-editor_code-block]:!text-cyan-300",
                          "[&_.ql-editor_code-block]:!bg-gray-50 dark:[&_.ql-editor_code-block]:!bg-gray-800",
                          "[&_.ql-editor_code-block]:!p-4",
                          "[&_.ql-editor_code-block]:!rounded-md",
                          "[&_.ql-editor_a]:!text-cyan-600 dark:[&_.ql-editor_a]:!text-cyan-400",
                          "[&_.ql-editor_img]:!max-w-full",
                          "[&_.ql-container.ql-snow]:!bg-white dark:[&_.ql-container.ql-snow]:!bg-gray-900",
                          "[&_.ql-toolbar_.ql-formats_button]:!text-gray-900 dark:[&_.ql-toolbar_.ql-formats_button]:!text-gray-100",
                          "[&_.ql-toolbar_.ql-formats_button:hover]:!text-cyan-600 dark:[&_.ql-toolbar_.ql-formats_button:hover]:!text-cyan-400",
                          "[&_.ql-formats_button.ql-active]:!text-cyan-600 dark:[&_.ql-formats_button.ql-active]:!text-cyan-400",
                          "[&_.ql-picker-label:hover]:!text-cyan-600 dark:[&_.ql-picker-label:hover]:!text-cyan-400",
                          "[&_.ql-picker.ql-expanded_.ql-picker-label]:!text-cyan-600 dark:[&_.ql-picker.ql-expanded_.ql-picker-label]:!text-cyan-400",
                          "[&_.ql-picker-item:hover]:!text-cyan-600 dark:[&_.ql-picker-item:hover]:!text-cyan-400",
                          "[&_.ql-picker-item.ql-selected]:!text-cyan-600 dark:[&_.ql-picker-item.ql-selected]:!text-cyan-400",
                          "hover:[&_.ql-stroke]:!stroke-cyan-600 dark:hover:[&_.ql-stroke]:!stroke-cyan-400",
                          "hover:[&_.ql-fill]:!fill-cyan-600 dark:hover:[&_.ql-fill]:!fill-cyan-400"
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
                  "bg-cyan-50 dark:bg-cyan-500/10",
                  "text-cyan-700 dark:text-cyan-300",
                  "hover:bg-cyan-100 dark:hover:bg-cyan-500/20",
                  "hover:text-cyan-800 dark:hover:text-cyan-200",
                  "border border-cyan-200/20 dark:border-cyan-500/20",
                  "w-full sm:w-auto",
                  "justify-center",
                  "transition-all duration-200",
                  "shadow-lg"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-600 dark:border-cyan-400 border-t-transparent" />
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