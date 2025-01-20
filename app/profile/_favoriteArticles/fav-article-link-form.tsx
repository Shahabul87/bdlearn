"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteArticle } from "@prisma/client";
import { FavoriteArticleList } from "./fav-article-link-list";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FavoriteArticleLinkFormProps {
  userId: string;
  favoriteArticles?: FavoriteArticle[];
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

const articleCategories = [
  "Academic Research",
  "Scientific Papers",
  "Technology News",
  "Business Analysis",
  "Industry Reports",
  "Case Studies",
  "Educational Resources",
  "Professional Development",
  "Career Advice",
  "Leadership Insights",
  "Market Research",
  "Data Analysis",
  "Technical Documentation",
  "White Papers",
  "Research Journals",
  "Medical Studies",
  "Legal Analysis",
  "Policy Papers",
  "Economic Reports",
  "Social Studies",
  "Environmental Research",
  "Psychology Studies",
  "Historical Analysis",
  "Literature Reviews",
  "Conference Papers",
  "Expert Opinions",
  "Industry Trends",
  "Innovation Studies",
  "Sustainability Reports",
  "Cultural Analysis"
] as const;

export const FavoriteArticleLinkForm = ({
  userId,
  favoriteArticles = [],
}: FavoriteArticleLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [articleId, setEditingArticleId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingArticleId(null);
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
      await axios.post(`/api/users/${userId}/favorite-articles`, values);
      toast.success("Favorite article added");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!articleId) return;

    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/favorite-articles/${articleId}`, values);
      toast.success("Favorite article updated");
      setEditMode(false);
      setEditingArticleId(null);
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
      await axios.put(`/api/users/${userId}/favorite-articles/reorder`, {
        list: updateData,
      });
      toast.success("Favorite articles reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const articleToEdit = favoriteArticles.find((article) => article.id === id);
    if (articleToEdit) {
      setEditMode(true);
      setEditingArticleId(id);
      form.setValue("title", articleToEdit.title);
      form.setValue("platform", articleToEdit.platform);
      form.setValue("url", articleToEdit.url);
    }
  };

  const onDelete = async (articleId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/favorite-articles/${articleId}`);
      toast.success("Favorite article deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
            <Loader2 className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Favorite Articles
        </h3>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
        >
          {isCreating ? (
            <span className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200">Cancel</span>
          ) : (
            <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
              <PlusCircle className="h-4 w-4" />
              <span className="text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200">Add favorite article</span>
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
                      placeholder="Article Title"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-indigo-500/50 transition-all"
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
                      placeholder="Platform (e.g., Medium)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-indigo-500/50 transition-all"
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
                      placeholder="Article URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-indigo-500/50 transition-all"
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
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className={cn(
                        "bg-white/50 dark:bg-gray-800",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200"
                      )}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        {articleCategories.map((category) => (
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
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
                className={cn(
                  "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium transition-colors",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400"
                )}
              >
                {editMode ? "Save Changes" : "Add Article"}
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
            favoriteArticles.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {favoriteArticles.length === 0 && "No favorite articles"}
            {favoriteArticles.length > 0 && (
              <FavoriteArticleList
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={favoriteArticles}
              />
            )}
          </div>
          {favoriteArticles.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your favorite articles
            </p>
          )}
        </>
      )}
    </div>
  );
};
