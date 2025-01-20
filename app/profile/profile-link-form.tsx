"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProfileLink } from "@prisma/client";
import { ProfileLinkList } from "./profileLinkList";

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
import { motion } from "framer-motion";

interface ProfileLinkFormProps {
  userId: string;
  profileLinks?: ProfileLink[];
}

const formSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
});

export const ProfileLinkForm = ({
  userId,
  profileLinks = [],
}: ProfileLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingLinkId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      url: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = !!watchedValues.platform && !!watchedValues.url;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/users/${userId}/profile-links`, values);
      toast.success("Profile link created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingLinkId) return;
    
    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/profile-links/${editingLinkId}`, values);
      toast.success("Profile link updated");
      setEditMode(false);
      setEditingLinkId(null);
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
      await axios.put(`/api/users/${userId}/profile-links/reorder`, {
        list: updateData,
      });
      toast.success("Profile links reordered");
      router.refresh();
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const linkToEdit = profileLinks.find((link) => link.id === id);
    if (linkToEdit) {
      setEditMode(true);
      setEditingLinkId(id);
      form.setValue("platform", linkToEdit.platform);
      form.setValue("url", linkToEdit.url);
    }
  };

  const onDelete = async (profileLinkId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/profile-links/${profileLinkId}`);
      toast.success("Profile link deleted");
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
            <Loader2 className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Profile Links
        </h3>
        <Button
          onClick={toggleCreating}
          variant="ghost"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }}>
              <PlusCircle className="h-4 w-4" />
              Add profile link
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
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., Twitter)"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-purple-500/50 transition-all"
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
                      placeholder="Profile URL"
                      className={cn(
                        "bg-white/50 dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:border-purple-500/50 transition-all"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white transition-colors"
              >
                {editMode ? "Save Changes" : "Create Link"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={cancelEditMode}
                  disabled={isSubmitting || isUpdating}
                  className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            profileLinks.length === 0 && "text-gray-500 dark:text-gray-400 italic"
          )}>
            {profileLinks.length === 0 && "No profile links"}
            {profileLinks.length > 0 && (
              <ProfileLinkList
                onEdit={onEdit}
                onReorder={onReorder}
                onDelete={onDelete}
                items={profileLinks}
              />
            )}
          </div>
          {profileLinks.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
              Drag and drop to reorder your profile links
            </p>
          )}
        </>
      )}
    </div>
  );
};
