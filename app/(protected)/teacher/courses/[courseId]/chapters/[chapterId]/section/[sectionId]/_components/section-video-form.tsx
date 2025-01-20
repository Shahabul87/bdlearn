"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Video, Loader2, Youtube } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionYoutubeVideoFormProps {
  initialData: {
    videoUrl: string | null;
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1, {
    message: "Video URL is required",
  }),
});

export const SectionYoutubeVideoForm = ({
  initialData,
  courseId,
  chapterId,
  sectionId,
}: SectionYoutubeVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData?.videoUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}`, values);
      toast.success("Section video updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const getVideoId = (url: string) => {
    try {
      return new URL(url).searchParams.get("v");
    } catch {
      return null;
    }
  };

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
            "p-2 w-fit rounded-lg",
            "bg-rose-50 dark:bg-rose-500/10"
          )}>
            <Youtube className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
              Section Video URL
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add a YouTube video URL for this section
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className={cn(
            "bg-rose-50 dark:bg-rose-500/10",
            "text-rose-700 dark:text-rose-300",
            "hover:bg-rose-100 dark:hover:bg-rose-500/20",
            "hover:text-rose-800 dark:hover:text-rose-200",
            "w-full sm:w-auto",
            "justify-center",
            "transition-all duration-200"
          )}
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          {initialData.videoUrl ? (
            <div className="w-full max-w-3xl mx-auto">
              <div className={cn(
                "relative aspect-video rounded-xl overflow-hidden",
                "border border-gray-200 dark:border-gray-700/50",
                "bg-gray-100 dark:bg-gray-900/50",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-200"
              )}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getVideoId(initialData.videoUrl)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto">
              <div className={cn(
                "flex flex-col items-center justify-center",
                "h-48 sm:h-60 md:h-[400px]",
                "bg-white/40 dark:bg-gray-900/40",
                "rounded-xl",
                "border border-dashed",
                "border-gray-200 dark:border-gray-700/50",
                "transition-all duration-200"
              )}>
                <Video className="h-12 w-12 mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-base text-gray-600 dark:text-gray-400 italic">
                  No video has been added yet
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-rose-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
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
                  "bg-rose-50 dark:bg-rose-500/10",
                  "text-rose-700 dark:text-rose-300",
                  "hover:bg-rose-100 dark:hover:bg-rose-500/20",
                  "hover:text-rose-800 dark:hover:text-rose-200",
                  "border border-rose-200/20 dark:border-rose-500/20",
                  "w-full sm:w-auto",
                  "justify-center",
                  "transition-all duration-200",
                  !isValid && "opacity-50 cursor-not-allowed"
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
