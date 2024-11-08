"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User, ProfileLink } from "@prisma/client";

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
import { ProfileLinksListPage } from "./profile-links-lists";

interface ProfileLinkCreationPageProps {
  userDetails: User & { profileLinks: ProfileLink[] };
}

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  platform: z.string().min(1, "Please enter a platform name"),
});

export const ProfileLinkCreationPage = ({ userDetails }: ProfileLinkCreationPageProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      platform: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/user/profileLinks`, values);
      toast.success("Profile link added successfully");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/user/profileLinks/reorder`, { list: updateData });
      toast.success("Profile links reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/user/profileLinks/${id}`);
  };

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Profile Links
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add new profile link
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g., Twitter, LinkedIn"
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
                      placeholder="e.g., https://twitter.com/yourprofile"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn("text-sm mt-2", !userDetails.profileLinks.length && "text-cyan-500 italic font-semibold")}>
          {!userDetails.profileLinks.length ? "No profile links available" : ""}
          <ProfileLinksListPage
            onEdit={onEdit}
            onReorder={onReorder}
            items={userDetails.profileLinks || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs mt-4 text-white/90">
          Drag and drop to reorder the profile links
        </p>
      )}
    </div>
  );
};

export default ProfileLinkCreationPage;
