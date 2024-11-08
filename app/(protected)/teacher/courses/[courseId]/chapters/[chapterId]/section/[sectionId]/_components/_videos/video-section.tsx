"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter, Section, Video, Blog, Article, Note } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { VideoSectionList } from "./video-section-list";

// interface VideoSectionFormProps {
//   chapter: Chapter & { sections?: (Section & { videos: Video[] })[] };
//   courseId: string;
//   chapterId: string;
//   sectionId: string; // Add sectionId here
// }

interface VideoSectionFormProps {
  chapter: Chapter & {
    sections?: (Section & {
      videos: Video[];
      blogs: Blog[];
      articles: Article[];
      notes: Note[];
    })[];
  };
  courseId: string;
  chapterId: string;
  sectionId: string; // Add sectionId here
}


const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Enter a valid URL"),
  duration: z.number().positive("Duration must be positive"),
  clarityRating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  position: z.number().positive("Position must be positive"),
});

export const VideoSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId, // Add sectionId to function parameters
}: VideoSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      duration: undefined,
      clarityRating: undefined,
      position: undefined,
    },
    mode: "onChange", // Ensure validation runs on each change
  });

  const { isSubmitting, isValid } = form.formState;

  // Watch values to check if form is complete
  const watchedValues = form.watch();

  const isFormComplete =
    !!watchedValues.title &&
    !!watchedValues.url &&
    watchedValues.duration !== undefined &&
    watchedValues.duration > 0 &&
    watchedValues.clarityRating !== undefined &&
    watchedValues.clarityRating >= 1 &&
    watchedValues.clarityRating <= 5 &&
    watchedValues.position !== undefined &&
    watchedValues.position > 0;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/video`,
        values
      );
      toast.success("Video section created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(
      `/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/video/${id}`
    );
  };

  const allVideos = chapter && chapter.sections
  ? chapter.sections.flatMap((section) => section.videos)
  : [];

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Video section
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add video link details
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Title"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Description"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                      disabled={isSubmitting}
                      placeholder="Video URL"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Duration (seconds)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clarityRating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Clarity Rating (1-5)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Position"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isFormComplete || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            allVideos.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {allVideos.length === 0 && "No video sections"}
          {allVideos.length > 0 && (
            <VideoSectionList
              onEdit={onEdit}
              onReorder={onReorder}
              items={allVideos}
            />
          )}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder the video sections
        </p>
      )}
    </div>
  );
};


