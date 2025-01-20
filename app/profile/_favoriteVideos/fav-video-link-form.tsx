"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteVideo } from "@prisma/client";
import { FavoriteVideoList } from "./fav-video-link-list";
import { motion } from "framer-motion";

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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FavoriteVideoLinkFormProps {
  userId: string;
  favoriteVideos?: FavoriteVideo[];
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
  category: z.string().optional()
});

const videoCategories = [
  "Educational",
  "Tutorial",
  "Programming",
  "Technology",
  "Science",
  "Mathematics",
  "Language Learning",
  "History",
  "Business",
  "Personal Development",
  "Motivation",
  "Health & Fitness",
  "Art & Design",
  "Music",
  "Cooking",
  "Travel",
  "Career Development",
  "Finance",
  "Digital Marketing",
  "Productivity",
  "Leadership",
  "Public Speaking",
  "Writing",
  "Photography",
  "Film Making",
] as const;

interface FormData {
  title: string;
  platform: string;
  url: string;
  category?: string;
}

export const FavoriteVideoLinkForm = ({
  userId,
  favoriteVideos = [],
}: FavoriteVideoLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    platform: "",
    url: "",
    category: "",
  });

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingVideoId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      platform: "",
      url: "",
      category: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = !!watchedValues.title && !!watchedValues.platform && !!watchedValues.url;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting values:", values);
      
      if (editMode) {
        const response = await axios.patch(`/api/users/${userId}/favorite-videos/${editingVideoId}`, values);
        console.log("Update response:", response.data);
      } else {
        const response = await axios.post(`/api/users/${userId}/favorite-videos`, values);
        console.log("Create response:", response.data);
      }
      router.refresh();
      toggleCreating();
    } catch (error) {
      console.error("Detailed error:", error);
      toast.error("Something went wrong!");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingVideoId) return;

    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/favorite-videos/${editingVideoId}`, values);
      toast.success("Favorite video updated");
      setEditMode(false);
      setEditingVideoId(null);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/users/${userId}/favorite-videos/reorder`, {
        list: updateData,
      });
      toast.success("Favorite videos reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const videoToEdit = favoriteVideos.find((video) => video.id === id);
    if (videoToEdit) {
      setEditMode(true);
      setEditingVideoId(id);
      form.setValue("title", videoToEdit.title);
      form.setValue("platform", videoToEdit.platform);
      form.setValue("url", videoToEdit.url);
    }
  };

  const onDelete = async (videoId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/favorite-videos/${videoId}`);
      toast.success("Favorite video deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editMode && editingVideoId) {
      const videoToEdit = favoriteVideos.find((video) => video.id === editingVideoId);
      if (videoToEdit) {
        form.reset({
          title: videoToEdit.title,
          platform: videoToEdit.platform,
          url: videoToEdit.url,
          category: videoToEdit.category || "",
        });
      }
    }
  }, [editMode, editingVideoId, favoriteVideos, form]);

  return (
    <div className={cn(
      "relative mt-6 rounded-xl p-6 backdrop-blur-sm",
      "bg-white/30 dark:bg-gray-800/50",
      "border border-gray-200/50 dark:border-gray-700/50"
    )}>
      {isUpdating && (
        <div className="absolute inset-0 bg-black/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-6 w-6 text-rose-500 dark:text-rose-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
          Favorite Videos
        </h3>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors"
        >
          {isCreating ? (
            <span className="text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-rose-200">Cancel</span>
          ) : (
            <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
              <PlusCircle className="h-4 w-4" />
              <span className="text-rose-600 dark:text-rose-300 hover:text-rose-700 dark:hover:text-rose-200">Add favorite video</span>
            </motion.div>
          )}
        </Button>
      </div>

      {(isCreating || editMode) && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Video Title"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-rose-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., YouTube)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-rose-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
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
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Video URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-rose-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-200">Category (Optional)</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger className={cn(
                  "bg-white/50 dark:bg-gray-800",
                  "border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-200"
                )}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {videoCategories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
                className={cn(
                  "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-medium transition-colors",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400"
                )}
              >
                {editMode ? "Save Changes" : "Create Video"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={cancelEditMode}
                  disabled={isSubmitting || isUpdating}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}

      {!isCreating && !editMode && (
        <>
          <div className={cn(
            "mt-4",
            favoriteVideos.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {favoriteVideos.length === 0 && "No favorite videos"}
            {favoriteVideos.length > 0 && (
              <FavoriteVideoList
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={favoriteVideos}
              />
            )}
          </div>
          {favoriteVideos.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your favorite videos
            </p>
          )}
        </>
      )}
    </div>
  );
};
