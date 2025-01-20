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
  { label: "Technology", value: "technology" },
  { label: "Science", value: "science" },
  { label: "Programming", value: "programming" },
  { label: "AI & ML", value: "ai-ml" },
  { label: "Web Development", value: "web-dev" },
  { label: "Data Science", value: "data-science" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Cloud Computing", value: "cloud" },
];

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
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      {!isEditing ? (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              <Tag className="w-4 h-4 text-purple-400" />
              <span className="font-medium text-gray-200">Category</span>
              {!initialData.category && (
                <span className="text-xs text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                  Required
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {initialData.category ? (
                <span className="text-sm px-2.5 py-0.5 bg-purple-500/10 text-purple-300 rounded-full">
                  {initialData.category}
                </span>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No category selected
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
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
                  <FormDescription className="text-gray-400">
                    Select a category that best describes your post
                  </FormDescription>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-900/50 border-gray-700/50 text-gray-200 focus:ring-purple-500/50">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.value} 
                          value={category.value}
                          className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
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
                className="text-gray-400 hover:text-gray-300"
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