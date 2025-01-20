"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, BookOpen, Loader2, Star, Link as LinkIcon, ExternalLink } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@prisma/client";

interface BlogSectionFormProps {
  chapter: {
    id: string;
    title: string;
    sections: {
      id: string;
      videos: any[];
      articles: any[];
      notes: any[];
      blogs: {
        id: string;
        title: string;
        description: string | null;
        url: string;
        category: string | null;
        position: number | null;
        isPublished: boolean;
        createdAt: Date;
        updatedAt: Date;
        sectionId: string | null;
        userId: string;
        author: string | null;
        publishedAt: Date | null;
        rating?: number | null;
      }[];
    }[];
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  blogUrl: z.string().min(1, {
    message: "Blog URL is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  rating: z.string().min(1, {
    message: "Rating is required",
  }),
});

const RatingStars = ({ rating }: { rating: number | null | undefined }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= (rating || 0) 
              ? "text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" 
              : "text-gray-400 dark:text-gray-600"
          )}
        />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 ml-1">
        {rating || 0}/5
      </span>
    </div>
  );
};

export const BlogSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId,
}: BlogSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      blogUrl: "",
      description: "",
      rating: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/blogs`, values);
      toast.success("Blog added successfully");
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleBlogClick = (url: string) => {
    if (!url) {
      toast.error("Invalid blog URL");
      return;
    }

    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      toast.error("Unable to open blog URL");
    }
  };

  return (
    <div className={cn(
      "p-4 mt-4 rounded-xl",
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
            "bg-pink-50 dark:bg-pink-500/10"
          )}>
            <BookOpen className="h-5 w-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
              Additional Blog Resources
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add helpful blog articles for deeper understanding
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          variant="ghost"
          size="sm"
          className={cn(
            "bg-pink-50 dark:bg-pink-500/10",
            "text-pink-700 dark:text-pink-300",
            "hover:bg-pink-100 dark:hover:bg-pink-500/20",
            "hover:text-pink-800 dark:hover:text-pink-200",
            "w-full sm:w-auto",
            "justify-center",
            "transition-all duration-200"
          )}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <BookOpen className="h-4 w-4 mr-2" />
              Add blog
            </>
          )}
        </Button>
      </div>

      {isCreating && (
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
                      placeholder="Blog title"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-pink-500/20 
                        text-base font-medium placeholder:text-gray-500/80 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blogUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Blog URL"
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-pink-500/20 
                        text-base font-medium placeholder:text-gray-500/80 transition-all duration-200"
                    />
                  </FormControl>
                  {field.value && (
                    <div className="mt-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                      <a 
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 text-pink-300 hover:text-pink-200 transition-colors"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm underline decoration-pink-500/30 hover:decoration-pink-500/50">
                          {field.value}
                        </span>
                      </a>
                    </div>
                  )}
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Blog description and key takeaways..."
                      className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-pink-500/20 
                        text-base font-medium placeholder:text-gray-500/80 transition-all duration-200 min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <FormDescription className="text-gray-400">
                          Rate this blog&apos;s explanation (1-5)
                        </FormDescription>
                      </div>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="5"
                        disabled={isSubmitting}
                        placeholder="Rating (1-5)"
                        className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-pink-500/20 
                          text-base font-medium placeholder:text-gray-500/80 transition-all duration-200"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-rose-400" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className={cn(
                  "bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 hover:text-pink-200 border border-pink-500/20 transition-all duration-200",
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
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add blog"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Display added blogs */}
      {chapter.sections.map((section) => (
        section.blogs.length > 0 && (
          <div key={section.id} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {section.blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleBlogClick(blog.url)}
                  className={cn(
                    "group p-4 rounded-lg",
                    "bg-white/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700/50",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/70",
                    "transition-all duration-300",
                    "cursor-pointer",
                    "overflow-hidden"
                  )}
                >
                  <div className="flex flex-col gap-4">
                    {/* Title and Description */}
                    <div className="space-y-2">
                      <h4 className={cn(
                        "text-sm sm:text-base font-medium",
                        "text-gray-900 dark:text-gray-200",
                        "group-hover:text-pink-700 dark:group-hover:text-pink-300",
                        "transition-colors duration-300",
                        "line-clamp-1"
                      )}>
                        {blog.title}
                      </h4>
                      <p className={cn(
                        "text-sm",
                        "text-gray-600 dark:text-gray-400",
                        "group-hover:text-gray-700 dark:group-hover:text-gray-300",
                        "transition-colors duration-300",
                        "line-clamp-2 sm:line-clamp-1"
                      )}>
                        {blog.description}
                      </p>
                    </div>

                    {/* Rating and Link Icon */}
                    <div className={cn(
                      "flex items-center justify-between",
                      "pt-2 border-t",
                      "border-gray-200 dark:border-gray-700/50"
                    )}>
                      <RatingStars rating={blog.rating} />
                      <div className={cn(
                        "p-1.5 rounded-md",
                        "bg-pink-50 dark:bg-pink-500/10",
                        "group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20",
                        "transition-colors duration-300"
                      )}>
                        <ExternalLink className={cn(
                          "h-4 w-4",
                          "text-pink-600 dark:text-pink-400",
                          "group-hover:text-pink-700 dark:group-hover:text-pink-300",
                          "transition-colors duration-300"
                        )} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};
