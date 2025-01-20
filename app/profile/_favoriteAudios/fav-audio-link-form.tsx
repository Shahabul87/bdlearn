"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteAudio } from "@prisma/client";
import { FavoriteAudioList } from "./fav-audio-link-list";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FavoriteAudioLinkFormProps {
  userId: string;
  favoriteAudios?: FavoriteAudio[];
}

const audioCategories = [
  "Educational Podcasts",
  "Learning Courses",
  "Motivational Talks",
  "Language Learning",
  "Business & Finance",
  "Technology & Science",
  "Self Development",
  "Meditation & Mindfulness",
  "History & Culture",
  "Storytelling",
  "Audiobooks",
  "Music Education",
  "Career Development",
  "Leadership Talks",
  "Health & Wellness",
  "Study Music",
  "Focus Music",
  "Productivity",
  "Interview Series",
  "Expert Discussions",
  "Conference Talks",
  "Research Presentations",
  "Guided Learning",
  "Industry Insights",
  "Creative Arts",
  "Nature Sounds",
  "Ambient Music",
  "Classical Music",
  "Jazz Studies",
  "Music Theory"
] as const;

interface FormData {
  title: string;
  platform: string;
  url: string;
  category?: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
  category: z.string().optional(),
});

export const FavoriteAudioLinkForm = ({
  userId,
  favoriteAudios = [],
}: FavoriteAudioLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingAudioId, setEditingAudioId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingAudioId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      platform: "",
      url: "",
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
      await axios.post(`/api/users/${userId}/favorite-audios`, values);
      toast.success("Favorite audio added");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingAudioId) return;

    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/favorite-audios/${editingAudioId}`, values);
      toast.success("Favorite audio updated");
      setEditMode(false);
      setEditingAudioId(null);
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
      await axios.put(`/api/users/${userId}/favorite-audios/reorder`, {
        list: updateData,
      });
      toast.success("Favorite audios reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const audioToEdit = favoriteAudios.find((audio) => audio.id === id);
    if (audioToEdit) {
      setEditMode(true);
      setEditingAudioId(id);
      form.setValue("title", audioToEdit.title);
      form.setValue("platform", audioToEdit.platform);
      form.setValue("url", audioToEdit.url);
    }
  };

  const onDelete = async (audioId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/favorite-audios/${audioId}`);
      toast.success("Favorite audio deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

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
            <Loader2 className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
          Favorite Audios
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
              <span className="text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-cyan-200">Add favorite audio</span>
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
                      placeholder="Audio Title"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-emerald-500/50 transition-all"
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
                      placeholder="Platform (e.g., Spotify)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-emerald-500/50 transition-all"
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
                      placeholder="Audio URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-emerald-500/50 transition-all"
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
                <SelectTrigger className="bg-white/50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {audioCategories.map((category) => (
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
                  "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white font-medium transition-colors",
                  "disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:text-gray-500 dark:disabled:text-gray-400"
                )}
              >
                {editMode ? "Save Changes" : "Add Audio"}
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
            favoriteAudios.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {favoriteAudios.length === 0 && "No favorite audios"}
            {favoriteAudios.length > 0 && (
              <FavoriteAudioList
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={favoriteAudios}
              />
            )}
          </div>
          {favoriteAudios.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your favorite audios
            </p>
          )}
        </>
      )}
    </div>
  );
};
