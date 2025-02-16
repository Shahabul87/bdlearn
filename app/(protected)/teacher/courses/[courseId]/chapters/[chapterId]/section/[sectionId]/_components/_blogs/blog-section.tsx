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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DisplayBlogs } from "./display-blogs";

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
});

const descriptionOptions = [
  "Comprehensive blog post explaining core concepts with detailed examples",
  "In-depth analysis of advanced topics with practical implementations",
  "Step-by-step guide covering fundamental principles and best practices",
  "Technical deep-dive with code examples and performance considerations",
  "Practical tutorial with real-world applications and use cases",
];

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
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [blogs, setBlogs] = useState(
    chapter.sections.find(section => section.id === sectionId)?.blogs || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      blogUrl: "",
      description: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/blogs`,
        {
          ...values,
          rating: selectedRating,
        }
      );
      setBlogs(prevBlogs => [...prevBlogs, response.data]);
      toast.success("Blog added successfully");
      form.reset();
      setSelectedRating(0);
      setIsCreating(false);
    } catch (error: any) {
      console.error("Blog creation error:", error);
      toast.error(error.response?.data || "Failed to add blog");
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
    <div className="relative mt-6 border bg-white dark:bg-gray-800 rounded-md p-4">
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
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-pink-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400" />
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
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-pink-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  {field.value && (
                    <div className={cn(
                      "mt-2 p-3 rounded-lg",
                      "bg-gray-50 dark:bg-gray-900/50",
                      "border border-gray-200/50 dark:border-gray-700/50"
                    )}>
                      <a 
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-2 text-pink-600 dark:text-pink-300 hover:text-pink-700 dark:hover:text-pink-200 transition-colors"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span className="text-sm underline decoration-pink-500/30 hover:decoration-pink-500/50">
                          {field.value}
                        </span>
                      </a>
                    </div>
                  )}
                  <FormMessage className="text-rose-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a comment about the blog explanation " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {descriptionOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Blog Rating</FormLabel>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={cn(
                      "w-6 h-6 cursor-pointer transition-colors",
                      rating <= (hoveredRating || selectedRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    )}
                    onMouseEnter={() => setHoveredRating(rating)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setSelectedRating(rating)}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedRating > 0 ? `You rated this blog ${selectedRating} stars` : 'Click to rate this blog'}
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                disabled={isSubmitting || selectedRating === 0 || !form.getValues('title') || !form.getValues('blogUrl') || !form.getValues('description')}
                type="submit"
                className={cn(
                  "bg-pink-500/10 text-pink-300 hover:bg-blue-500/20 hover:text-blue-300 border border-pink-500/20 transition-all duration-200",
                  (isSubmitting || selectedRating === 0 || !form.getValues('title') || !form.getValues('blogUrl') || !form.getValues('description')) && "opacity-50 cursor-not-allowed"
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

      {!isCreating && (
        <div className="mt-6">
          <DisplayBlogs
            items={blogs}
            onEdit={(id) => {}}
            onDelete={(id) => {}}
          />
        </div>
      )}
    </div>
  );
};
