"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteBlog } from "@prisma/client";
import { FavoriteBlogList } from "./fav-blog-link-list"; // Assuming this is a component to list favorite blogs
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface FavoriteBlogLinkFormProps {
  userId: string;
  favoriteBlogs?: FavoriteBlog[];
}

interface FormData {
  title: string;
  platform: string;
  url: string;
  category?: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  platform: z.string().min(1, {
    message: "Platform is required.",
  }),
  url: z.string().min(1, {
    message: "URL is required.",
  }),
  category: z.string().optional(),
});

const blogCategories = [
  "Technology",
  "Programming",
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Mobile Development",
  "Software Engineering",
  "UI/UX Design",
  "Business",
  "Productivity",
  "Career Development",
  "Personal Growth",
  "Tutorial",
  "Case Study",
  "Best Practices",
  "Industry News",
  "Opinion",
  "Research",
] as const;

export const FavoriteBlogLinkForm = ({
  userId,
  favoriteBlogs = [],
}: FavoriteBlogLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [blogId, setEditingBlogId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingBlogId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      platform: "",
      url: "",
      category: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = !!watchedValues.title && !!watchedValues.platform && !!watchedValues.url;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      await axios.post(`/api/users/${userId}/favorite-blogs`, {
        title: values.title,
        platform: values.platform,
        url: values.url,
        category: values.category,
      });

      toast.success("Blog link added successfully");
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!blogId) return;

    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/favorite-blogs/${blogId}`, values);
      toast.success("Favorite blog updated");
      setEditMode(false);
      setEditingBlogId(null);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/users/${userId}/favorite-blogs/reorder`, {
        list: updateData,
      });
      toast.success("Favorite blogs reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string, data: {
    title: string;
    platform: string;
    url: string;
    category?: string;
  }) => {
    const blogToEdit = favoriteBlogs.find((blog) => blog.id === id);
    if (blogToEdit) {
      setEditMode(true);
      setEditingBlogId(id);
      form.reset({
        title: data.title,
        platform: data.platform,
        url: data.url,
        category: data.category || "",
      });
    }
  };

  const onDelete = async (blogId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/favorite-blogs/${blogId}`);
      toast.success("Favorite blog deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    platform: "",
    url: "",
    category: "",
  });

  return (
    <div className={cn(
      "relative mt-6 rounded-xl p-6 backdrop-blur-sm",
      "bg-white/30 dark:bg-gray-800/50",
      "border border-gray-200/50 dark:border-gray-700/50"
    )}>
      {isUpdating && (
        <div className="absolute inset-0 bg-black/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-6 w-6 text-amber-500 dark:text-amber-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
          Favorite Blogs
        </h3>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
        >
          {isCreating ? (
            <span className="text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-rose-200">Cancel</span>
          ) : (
            <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
              <PlusCircle className="h-4 w-4" />
              <span className="text-purple-600 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-200">Add favorite blog</span>
            </motion.div>
          )}
        </Button>
      </div>

      {(isCreating || editMode) && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)}
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
                      disabled={isSubmitting || isUpdating}
                      placeholder="Blog Title"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-amber-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., WordPress)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-amber-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
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
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Blog URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-amber-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">Category (Optional)</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="bg-white/50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      {blogCategories.map((category) => (
                        <SelectItem 
                          key={category} 
                          value={category}
                          className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
                className={cn(
                  "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium transition-colors",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400"
                )}
              >
                {editMode ? "Save Changes" : "Add Blog"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={cancelEditMode}
                  disabled={isSubmitting || isUpdating}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}

      {!isCreating && !editMode && (
        <>
          <div className={cn(
            "mt-4",
            favoriteBlogs.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {favoriteBlogs.length === 0 && "No favorite blogs"}
            {favoriteBlogs.length > 0 && (
              <FavoriteBlogList
                userId={userId}
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={favoriteBlogs}
              />
            )}
          </div>
          {favoriteBlogs.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your favorite blogs
            </p>
          )}
        </>
      )}
    </div>
  );
};
