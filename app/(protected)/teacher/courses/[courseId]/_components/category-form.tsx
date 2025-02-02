"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, ListFilter } from "lucide-react";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  initialData: {
    categoryId: string | null;
  };
  courseId: string;
  options: { label: string; value: string; }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting category:", values);
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      console.log("Response:", response.data);
      
      toast.success("Category updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Category update error:", error);
      toast.error("Something went wrong");
    }
  }

  const selectedOption = options.find(option => option.value === initialData.categoryId);

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
            <ListFilter className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Course Category
            </p>
            {!initialData.categoryId && (
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
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              {selectedOption ? (
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-700 dark:text-purple-300",
                  "border border-purple-200/20 dark:border-purple-500/20"
                )}>
                  {selectedOption.label}
                </span>
              ) : (
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">
                  No category selected
                </p>
              )}
            </motion.div>
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
              {initialData.categoryId ? "Change" : "Add"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "bg-white dark:bg-gray-900/50",
                          "border-gray-200 dark:border-gray-700/50",
                          "text-gray-900 dark:text-gray-200",
                          "focus:ring-purple-500/20",
                          "h-10 sm:h-12",
                          "transition-all duration-200",
                          !field.value && "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        {options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className={cn(
                              "text-gray-900 dark:text-gray-200",
                              "focus:bg-purple-50 dark:focus:bg-purple-500/10",
                              "focus:text-purple-700 dark:focus:text-purple-300",
                              "hover:bg-purple-50 dark:hover:bg-purple-500/10",
                              "hover:text-purple-700 dark:hover:text-purple-300",
                              "cursor-pointer transition-colors"
                            )}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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