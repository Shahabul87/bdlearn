"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean;
    isPublished: boolean;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
      toast.success("Chapter access updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={cn(
      "p-4 sm:p-6 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <div className={cn(
              "p-2 w-fit rounded-md transition-colors",
              initialData.isFree 
                ? "bg-emerald-50 dark:bg-emerald-500/10" 
                : "bg-purple-50 dark:bg-purple-500/10"
            )}>
              {initialData.isFree ? (
                <Unlock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div>
              <h3 className={cn(
                "text-base sm:text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                initialData.isFree 
                  ? "from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400"
                  : "from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
              )}>
                Chapter Access
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Control access settings for this chapter
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "transition-all duration-200",
            "w-full sm:w-auto",
            "justify-center",
            initialData.isFree 
              ? "text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
              : "text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-purple-50 dark:hover:bg-purple-500/10"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            "Edit access"
          )}
        </Button>
      </div>
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className={cn(
                    "p-4 rounded-lg",
                    "border border-gray-200 dark:border-gray-700/50",
                    "bg-white/50 dark:bg-gray-900/20",
                    "backdrop-blur-sm space-y-2"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
                      <div className="space-y-1">
                        <p className={cn(
                          "font-semibold tracking-wide text-sm sm:text-base",
                          field.value 
                            ? "text-emerald-700 dark:text-emerald-300" 
                            : "text-purple-700 dark:text-purple-300"
                        )}>
                          Free Preview
                        </p>
                        <FormDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                          Make this chapter available as a free preview to attract potential students
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                          className={cn(
                            "data-[state=checked]:bg-gradient-to-r",
                            field.value 
                              ? "data-[state=checked]:from-emerald-500 data-[state=checked]:to-cyan-500"
                              : "data-[state=checked]:from-purple-500 data-[state=checked]:to-cyan-500"
                          )}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    "w-full sm:w-auto",
                    "justify-center",
                    form.getValues("isFree")
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-200 border border-emerald-200/20 dark:border-emerald-500/20"
                      : "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 hover:text-purple-800 dark:hover:text-purple-200 border border-purple-200/20 dark:border-purple-500/20"
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-x-2">
                      <div className={cn(
                        "h-4 w-4 animate-spin rounded-full border-2 border-t-transparent",
                        form.getValues("isFree")
                          ? "border-emerald-600 dark:border-emerald-400"
                          : "border-purple-600 dark:border-purple-400"
                      )} />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      )}
    </div>
  );
};