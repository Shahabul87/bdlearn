"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock, Unlock, Loader2 } from "lucide-react";
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

interface SectionAccessFormProps {
  initialData: {
    isFree: boolean;
    isPublished: boolean;
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const SectionAccessForm = ({
  initialData,
  courseId,
  chapterId,
  sectionId,
}: SectionAccessFormProps) => {
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
      console.log("Updating section access:", {
        sectionId,
        values
      });
      
      const response = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}`, 
        values
      );

      console.log("Section access update response:", response.data);
      toast.success("Section access updated");
      setIsEditing(false);
      router.refresh();
    } catch (error: any) {
      console.error("Section access update error:", error);
      toast.error(error.response?.data || "Failed to update section access");
    }
  };

  const Icon = form.getValues("isFree") ? Unlock : Lock;

  return (
    <div className={cn(
      "p-4 mt-4 rounded-lg",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm"
    )}>
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex items-center gap-x-2">
          <div className={cn(
            "p-2 w-fit rounded-lg transition-all duration-200",
            form.getValues("isFree")
              ? "bg-emerald-50 dark:bg-emerald-500/10"
              : "bg-amber-50 dark:bg-amber-500/10"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              form.getValues("isFree")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            )} />
          </div>
          <div>
            <h3 className={cn(
              "text-base sm:text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
              form.getValues("isFree")
                ? "from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400"
                : "from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400"
            )}>
              Section Access Settings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Control who can access this section
            </p>
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
            form.getValues("isFree")
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 hover:text-emerald-800 dark:hover:text-emerald-200"
              : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-200"
          )}
        >
          {isEditing ? "Cancel" : "Edit access"}
        </Button>
      </div>
      {!isEditing && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-sm sm:text-base mt-2",
            form.getValues("isFree")
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-amber-700 dark:text-amber-300"
          )}
        >
          This section is {form.getValues("isFree") ? "free for preview" : "only for enrolled students"}
        </motion.p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className={cn(
                  "p-4 rounded-lg space-y-3",
                  "border border-gray-200 dark:border-gray-700/50",
                  "bg-white/50 dark:bg-gray-900/50"
                )}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-2">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={cn(
                          "data-[state=checked]:bg-emerald-600 dark:data-[state=checked]:bg-emerald-500",
                          "data-[state=unchecked]:bg-amber-600 dark:data-[state=unchecked]:bg-amber-500"
                        )}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900 dark:text-gray-200">
                        Free Section Preview
                      </p>
                      <FormDescription className="text-gray-600 dark:text-gray-400">
                        Make this section free for preview
                      </FormDescription>
                    </div>
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
                    : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-200 border border-amber-200/20 dark:border-amber-500/20"
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
};