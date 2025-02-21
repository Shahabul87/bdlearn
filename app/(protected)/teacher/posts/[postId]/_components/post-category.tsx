"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Post } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

interface CategoryFormProps {
  initialData: Post;
  postId: string;
}

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required",
  }),
});

const categories = [
  { label: "AI & ML", value: "ai-ml" },
  { label: "Architecture", value: "architecture" },
  { label: "Art & Design", value: "art-design" },
  { label: "Biology", value: "biology" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Business & Entrepreneurship", value: "business" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Cloud Computing", value: "cloud" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Data Science", value: "data-science" },
  { label: "DevOps", value: "devops" },
  { label: "Digital Marketing", value: "digital-marketing" },
  { label: "Engineering", value: "engineering" },
  { label: "Environmental Science", value: "environmental" },
  { label: "Game Development", value: "game-dev" },
  { label: "Health & Medicine", value: "health" },
  { label: "IoT", value: "iot" },
  { label: "Mathematics", value: "mathematics" },
  { label: "Mobile Development", value: "mobile-dev" },
  { label: "Music & Audio", value: "music" },
  { label: "Photography", value: "photography" },
  { label: "Physics", value: "physics" },
  { label: "Programming", value: "programming" },
  { label: "Psychology", value: "psychology" },
  { label: "Science", value: "science" },
  { label: "Space & Astronomy", value: "astronomy" },
  { label: "Technology", value: "technology" },
  { label: "UI/UX Design", value: "ui-ux" },
  { label: "Web Development", value: "web-dev" },
  { label: "Writing & Literature", value: "writing" }
].sort((a, b) => a.label.localeCompare(b.label));

export const PostCategory = ({
  initialData,
  postId
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialData.category || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}`, values);
      toast.success("Category updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-white/50 dark:bg-gray-800/40 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/50 transition-all duration-200">
      {!isEditing ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
              <Tag className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-gray-900 dark:text-gray-200 text-sm sm:text-base">
                Category
              </span>
              {!initialData.category && (
                <span className="text-xs text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {initialData.category ? (
                <span className="text-sm px-2.5 py-0.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 rounded-full">
                  {initialData.category}
                </span>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  No category selected
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            className="w-full sm:w-auto text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:text-purple-300 dark:hover:bg-purple-500/10"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Select a category that best describes your post
                  </FormDescription>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        className="bg-white dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-gray-200 focus:ring-purple-500/20 dark:focus:ring-purple-500/30 focus:border-purple-500/30 dark:focus:border-purple-500/30"
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent 
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    >
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                className="bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 dark:hover:bg-purple-500/20 hover:text-purple-700 dark:hover:text-purple-300 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 w-full sm:w-auto"
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