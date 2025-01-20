"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const CreateBlogInputSection = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   console.log(values)
    try {
      const response = await axios.post("/api/posts", values);
      router.push(`/teacher/posts/${response.data.id}`);
      toast.success("Post created");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return ( 
    <div className="w-full p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-3 sm:space-y-4">
                  <FormLabel className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent inline-block">
                    Blog Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Human mind is the most dangerous weapon in this world'"
                      {...field}
                      className={cn(
                        "w-full h-10 sm:h-12 px-3 sm:px-4",
                        "text-sm sm:text-base md:text-lg rounded-lg",
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-white",
                        "placeholder:text-gray-500",
                        "focus:ring-2 focus:ring-purple-500/50",
                        "focus:border-purple-500/50",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />
            <div className={cn(
              "flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 sm:pt-6",
              "border-t border-gray-200/50 dark:border-gray-700/50",
              "sm:justify-end"
            )}>
              <Link href="/" className="w-full sm:w-auto">
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "w-full sm:w-auto text-sm sm:text-base",
                    "text-gray-600 dark:text-gray-400",
                    "hover:text-gray-900 dark:hover:text-white",
                    "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                    "transition-colors duration-200"
                  )}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={cn(
                  "w-full sm:w-auto px-4 sm:px-6 py-2 h-10 sm:h-11",
                  "text-sm sm:text-base font-medium rounded-lg",
                  "bg-gradient-to-r from-purple-600 to-cyan-600",
                  "dark:from-purple-500 dark:to-cyan-500",
                  "text-white shadow-lg",
                  "hover:from-purple-700 hover:to-cyan-700",
                  "dark:hover:from-purple-600 dark:hover:to-cyan-600",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Blog"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
 