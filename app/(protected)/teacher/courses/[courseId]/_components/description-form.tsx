"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Layout } from "lucide-react";
import { useState } from "react";
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

// Dynamic import for React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface DescriptionFormProps {
  initialData: {
    description: string | null;
  };
  courseId: string;
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
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link'
];

export const DescriptionForm = ({
  initialData,
  courseId
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const cleanDescription = cleanHtml(values.description);
      
      await axios.patch(`/api/courses/${courseId}`, {
        description: values.description,
        cleanDescription: cleanDescription
      });
      
      toast.success("Course description updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const cleanHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, ' ').trim();
  };

  return (
    <div className={cn(
      "p-4 mt-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/50",
      "hover:bg-gray-50 dark:hover:bg-gray-800/70",
      "backdrop-blur-sm",
      "transition-all duration-200"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <Layout className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Course Description
            </p>
            {!initialData.description && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                "text-rose-700 dark:text-rose-400",
                "bg-rose-100 dark:bg-rose-500/10"
              )}>
                Required
              </span>
            )}
          </div>
          {!isEditing && (
            <div 
              className={cn(
                "text-sm sm:text-base font-medium line-clamp-3",
                "text-gray-700 dark:text-gray-300",
                !initialData.description && "text-gray-500 dark:text-gray-400 italic"
              )}
              dangerouslySetInnerHTML={{
                __html: initialData.description || "No description set"
              }}
            />
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
            "justify-center"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
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
                      "rounded-lg",
                      "border border-gray-200 dark:border-gray-700/50",
                      "bg-white dark:bg-gray-900/50",
                      "[&_.ql-toolbar]:border-gray-200 dark:[&_.ql-toolbar]:border-gray-700/50",
                      "[&_.ql-container]:border-gray-200 dark:[&_.ql-container]:border-gray-700/50"
                    )}>
                      <ReactQuill
                        {...field}
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        readOnly={isSubmitting}
                        placeholder="Write a detailed description of your course..."
                        className={cn(
                          "text-gray-900 dark:text-gray-200",
                          "[&_.ql-editor]:min-h-[200px]",
                          "[&_.ql-editor]:text-sm sm:[&_.ql-editor]:text-base",
                          "[&_.ql-editor_p]:text-gray-900 dark:[&_.ql-editor_p]:text-gray-200",
                          "[&_.ql-snow.ql-toolbar_button]:text-gray-600 dark:[&_.ql-snow.ql-toolbar_button]:text-gray-400",
                          "[&_.ql-snow.ql-toolbar_button:hover]:text-purple-600 dark:[&_.ql-snow.ql-toolbar_button:hover]:text-purple-400"
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
                  "w-full sm:w-auto",
                  "justify-center",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />
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
}