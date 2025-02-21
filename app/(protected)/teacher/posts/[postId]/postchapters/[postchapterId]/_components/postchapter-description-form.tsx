"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
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

// Dynamic import for React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link'],
    ['clean']
  ],
};

// Add this custom module to handle editor styles
const customModules = {
  ...modules,
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'link'
];

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
    <div className="relative">
      {!isEditing ? (
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
              Chapter Description
            </p>
            <div 
              className={cn(
                "text-sm break-words prose dark:prose-invert max-w-none",
                !initialData.description && "italic text-gray-500 dark:text-gray-400"
              )}
              dangerouslySetInnerHTML={{
                __html: initialData.description || "No description provided"
              }}
            />
          </div>
          <Button 
            onClick={() => setIsEditing(true)} 
            variant="ghost"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
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
                    <div className="w-full 
                      [&_.ql-container]:!bg-white [&_.ql-container]:!text-gray-900 [&_.ql-container.ql-snow]:!border-gray-200 
                      [&_.ql-toolbar.ql-snow]:!bg-white [&_.ql-toolbar.ql-snow]:!border-gray-200 
                      [&_.ql-editor]:!min-h-[200px] [&_.ql-editor]:!text-gray-900 
                      [&_.ql-editor.ql-blank::before]:!text-gray-500 
                      [&_.ql-snow_.ql-stroke]:!stroke-gray-700
                      [&_.ql-snow_.ql-fill]:!fill-gray-700
                      [&_.ql-snow_.ql-picker]:!text-gray-700
                      [&_.ql-snow_.ql-picker-label]:!text-gray-700
                      [&_.ql-snow_.ql-picker-item]:!text-gray-700
                      [&_.ql-snow_.ql-picker-options]:!bg-white
                      [&_.ql-snow_.ql-picker-options]:!border-gray-200
                      [&_.ql-toolbar_.ql-formats_button]:!text-gray-700
                      [&_.ql-toolbar_.ql-formats_button:hover]:!text-gray-900
                      [&_.ql-snow_.ql-picker-label:hover]:!text-gray-900
                      [&_.ql-snow_.ql-picker-item:hover]:!text-gray-900
                      dark:[&_.ql-container]:!bg-gray-800 dark:[&_.ql-container]:!text-gray-100 dark:[&_.ql-container.ql-snow]:!border-gray-700
                      dark:[&_.ql-toolbar.ql-snow]:!bg-gray-800 dark:[&_.ql-toolbar.ql-snow]:!border-gray-700
                      dark:[&_.ql-editor]:!text-gray-100
                      dark:[&_.ql-editor.ql-blank::before]:!text-gray-400
                      dark:[&_.ql-snow_.ql-stroke]:!stroke-gray-300
                      dark:[&_.ql-snow_.ql-fill]:!fill-gray-300
                      dark:[&_.ql-snow_.ql-picker]:!text-gray-300
                      dark:[&_.ql-snow_.ql-picker-label]:!text-gray-300
                      dark:[&_.ql-snow_.ql-picker-item]:!text-gray-300
                      dark:[&_.ql-snow_.ql-picker-options]:!bg-gray-800
                      dark:[&_.ql-snow_.ql-picker-options]:!border-gray-700
                      dark:[&_.ql-toolbar_.ql-formats_button]:!text-gray-300
                      dark:[&_.ql-toolbar_.ql-formats_button:hover]:!text-gray-100
                      dark:[&_.ql-snow_.ql-picker-label:hover]:!text-gray-100
                      dark:[&_.ql-snow_.ql-picker-item:hover]:!text-gray-100">
                      <ReactQuill
                        {...field}
                        modules={customModules}
                        formats={formats}
                        theme="snow"
                        placeholder="Write a detailed description of your chapter..."
                      />
                    </div>
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
                size="sm"
                className={cn(
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-600 dark:text-purple-400",
                  "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                  "hover:text-purple-700 dark:hover:text-purple-300",
                  "focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/20",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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