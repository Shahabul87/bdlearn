"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

interface PostchapterAccessFormProps {
  initialData: {
    isFree: boolean;
    isPublished: boolean;
  };
  postId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const PostchapterAccessForm = ({
  initialData,
  postId,
  chapterId,
}: PostchapterAccessFormProps) => {
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
      await axios.patch(`/api/posts/${postId}/postchapters/${chapterId}`, values);
      toast.success("Access settings updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            {initialData.isFree ? (
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 ring-1 ring-emerald-100 dark:ring-emerald-500/20">
                <Unlock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-500/20">
                <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            )}
            <div>
              <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                Access Settings
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Control who can access this chapter
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200/50 dark:border-gray-700/50 p-4 bg-white/50 dark:bg-gray-900/50">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      Free Chapter
                    </div>
                    <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                      Make this chapter free for preview
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                      className={cn(
                        "data-[state=checked]:bg-emerald-500 dark:data-[state=checked]:bg-emerald-600",
                        "data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700",
                        "transition-colors"
                      )}
                    />
                  </FormControl>
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
                  "bg-purple-50 dark:bg-purple-500/10",
                  "text-purple-600 dark:text-purple-400",
                  "hover:bg-purple-100 dark:hover:bg-purple-500/20",
                  "hover:text-purple-700 dark:hover:text-purple-300",
                  "focus:ring-2 focus:ring-offset-2 focus:ring-purple-500/30 dark:focus:ring-purple-500/20",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  "transition-all duration-200"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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