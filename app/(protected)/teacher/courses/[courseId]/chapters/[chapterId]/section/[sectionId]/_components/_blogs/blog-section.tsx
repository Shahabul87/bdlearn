"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter, Section, Blog } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { BlogSectionList } from "./blog-section-list";

interface BlogSectionFormProps {
  chapter: Chapter & {
    sections?: (Section & {
      blogs: Blog[];
    })[];
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Enter a valid URL"),
  author: z.string().min(1, "Author is required"), // Add author field
  category: z.string().min(1, "Category is required"), // Add category field
});

export const BlogSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId,
}: BlogSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      author: "", // Default for author
      category: "", // Default for category
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const watchedValues = form.watch();

  const isFormComplete =
    !!watchedValues.title &&
    !!watchedValues.url &&
    !!watchedValues.author &&
    !!watchedValues.category; // Adjust to check category and author

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/blog`,
        values
      );
      toast.success("Blog section created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
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
    router.push(
      `/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/blog/${id}`
    );
  };

  const allBlogs = chapter && chapter.sections
    ? chapter.sections.flatMap((section) => section.blogs)
    : [];

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Blog section
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add blog link details
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Title"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Description"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Blog URL"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Author"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Category"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isFormComplete || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            allBlogs.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {allBlogs.length === 0 && "No blog sections"}
          {allBlogs.length > 0 && (
            <BlogSectionList
              onEdit={onEdit}
              onReorder={onReorder}
              items={allBlogs}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder the blog sections
        </p>
      )}
    </div>
  );
};
