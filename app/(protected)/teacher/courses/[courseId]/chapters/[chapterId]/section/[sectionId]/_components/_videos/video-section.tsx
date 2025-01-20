"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Video, Loader2, Star } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@prisma/client";

interface VideoSectionFormProps {
  chapter: {
    id: string;
    title: string;
    sections: {
      id: string;
      videos: {
        id: string;
        title: string;
        description: string | null;
        url: string | null;
        clarityRating: number | null;
      }[];
    }[];
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  videoUrl: z.string().min(1, {
    message: "Video URL is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  rating: z.string().min(1, {
    message: "Rating is required",
  }),
});

const RatingStars = ({ rating }: { rating: number | null }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-3.5 w-3.5",
            star <= (rating || 0) 
              ? "text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" 
              : "text-gray-400 dark:text-gray-600"
          )}
        />
      ))}
      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 ml-1">
        {rating}/5
      </span>
    </div>
  );
};

export const VideoSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId,
}: VideoSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      description: "",
      rating: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/videos`, values);
      toast.success("Video added successfully");
      form.reset();
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

  const handleVideoClick = (url: string | null) => {
    if (!url) {
      toast.error("Invalid video URL");
      return;
    }

    try {
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer');
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      toast.error("Unable to open video URL");
    }
  };

  return (
    <div className={cn(
      "p-4 mt-4 rounded-xl",
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
            "bg-blue-50 dark:bg-blue-500/10"
          )}>
            <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Additional Video Resources
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add helpful video resources for better understanding
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          variant="ghost"
          size="sm"
          className={cn(
            "bg-blue-50 dark:bg-blue-500/10",
            "text-blue-700 dark:text-blue-300",
            "hover:bg-blue-100 dark:hover:bg-blue-500/20",
            "hover:text-blue-800 dark:hover:text-blue-200",
            "w-full sm:w-auto",
            "justify-center",
            "transition-all duration-200"
          )}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <Video className="h-4 w-4 mr-2" />
              Add video
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Video title"
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-blue-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="YouTube video URL"
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-blue-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  {field.value && (
                    <div className="mt-4">
                      <div className="relative w-full sm:w-[80%] mx-auto">
                        <div className={cn(
                          "relative aspect-video rounded-lg overflow-hidden",
                          "border border-gray-200 dark:border-gray-700/50",
                          "bg-gray-100 dark:bg-gray-900/50",
                          "shadow-lg group"
                        )}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                            src={`https://www.youtube.com/embed/${getVideoId(field.value)}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Video description and key points..."
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-blue-500/20",
                        "text-sm sm:text-base font-medium",
                        "min-h-[100px]",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center gap-x-2">
                        <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                        <FormDescription className="text-gray-600 dark:text-gray-400">
                          Rate this video&apos;s explanation (1-5)
                        </FormDescription>
                      </div>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="5"
                        disabled={isSubmitting}
                        placeholder="Rating (1-5)"
                        className={cn(
                          "bg-white dark:bg-gray-900/50",
                          "border-gray-200 dark:border-gray-700/50",
                          "text-gray-900 dark:text-gray-200",
                          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                          "focus:ring-blue-500/20",
                          "text-sm sm:text-base font-medium",
                          "transition-all duration-200"
                        )}
                      />
                    </div>
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
                  "bg-blue-50 dark:bg-blue-500/10",
                  "text-blue-700 dark:text-blue-300",
                  "hover:bg-blue-100 dark:hover:bg-blue-500/20",
                  "hover:text-blue-800 dark:hover:text-blue-200",
                  "border border-blue-200/20 dark:border-blue-500/20",
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
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add video"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Display added videos */}
      {chapter.sections.map((section) => (
        section.videos.length > 0 && (
          <div key={section.id} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {section.videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleVideoClick(video.url)}
                  className={cn(
                    "group p-4 rounded-lg",
                    "bg-white/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700/50",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/70",
                    "transition-all duration-300",
                    "cursor-pointer",
                    "overflow-hidden"
                  )}
                >
                  <div className="flex flex-col gap-4">
                    {/* Title and Description */}
                    <div className="space-y-2">
                      <h4 className={cn(
                        "text-sm sm:text-base font-medium",
                        "text-gray-900 dark:text-gray-200",
                        "group-hover:text-blue-700 dark:group-hover:text-blue-300",
                        "transition-colors duration-300",
                        "line-clamp-1"
                      )}>
                        {video.title}
                      </h4>
                      <p className={cn(
                        "text-sm",
                        "text-gray-600 dark:text-gray-400",
                        "group-hover:text-gray-700 dark:group-hover:text-gray-300",
                        "transition-colors duration-300",
                        "line-clamp-2 sm:line-clamp-1"
                      )}>
                        {video.description}
                      </p>
                    </div>

                    {/* Rating and Video Icon */}
                    <div className={cn(
                      "flex items-center justify-between",
                      "pt-2 border-t",
                      "border-gray-200 dark:border-gray-700/50"
                    )}>
                      <RatingStars rating={video.clarityRating} />
                      <div className={cn(
                        "p-1.5 rounded-md",
                        "bg-blue-50 dark:bg-blue-500/10",
                        "group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20",
                        "transition-colors duration-300"
                      )}>
                        <Video className={cn(
                          "h-4 w-4",
                          "text-blue-600 dark:text-blue-400",
                          "group-hover:text-blue-700 dark:group-hover:text-blue-300",
                          "transition-colors duration-300"
                        )} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};
