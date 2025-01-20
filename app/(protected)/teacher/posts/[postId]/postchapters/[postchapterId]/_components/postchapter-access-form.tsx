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
    <div className="p-4 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-200">
      <div className="font-medium flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            {initialData.isFree ? (
              <Unlock className="h-4 w-4 text-emerald-400" />
            ) : (
              <Lock className="h-4 w-4 text-purple-400" />
            )}
            <p className="text-lg font-medium text-gray-200">Access Settings</p>
          </div>
          <p className="text-sm text-gray-400">
            Control who can access this chapter
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          className="text-purple-400 hover:text-purple-300"
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700/50 p-4 bg-gray-900/20">
                  <div className="space-y-0.5">
                    <div className="font-medium text-gray-200">
                      Free Chapter
                    </div>
                    <FormDescription className="text-gray-400">
                      Make this chapter free for preview
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                      className={cn(
                        field.value && "bg-emerald-500",
                        "data-[state=checked]:bg-emerald-500"
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
                className="bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}; 