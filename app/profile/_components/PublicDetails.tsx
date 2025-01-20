"use client";

import React, { useState } from 'react';
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { 
  User, MapPin, Briefcase, GraduationCap, Edit2, Camera, 
  Github, Linkedin, Twitter, Globe, Plus, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PublicDetailsProps {
  userDetails: any;
}

const formSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  location: z.string().optional(),
  bio: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  education: z.string().optional(),
  githubUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  websiteUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export const PublicDetails = ({ userDetails }: PublicDetailsProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userDetails?.name || "",
      username: userDetails?.username || "",
      location: userDetails?.location || "",
      bio: userDetails?.bio || "",
      jobTitle: userDetails?.jobTitle || "",
      company: userDetails?.company || "",
      education: userDetails?.education || "",
      githubUrl: userDetails?.githubUrl || "",
      linkedinUrl: userDetails?.linkedinUrl || "",
      twitterUrl: userDetails?.twitterUrl || "",
      websiteUrl: userDetails?.websiteUrl || "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userDetails.id}/profile`, values);
      toast.success("Profile updated successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
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
            <Loader2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </motion.div>
        </div>
      )}

      <div className="flex items-center gap-6 mb-8">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700">
            <AvatarImage src={userDetails?.image} />
            <AvatarFallback>
              <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Public Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your public profile information
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting || isUpdating}
                        placeholder="Full Name"
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting || isUpdating}
                        placeholder="Username"
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
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        disabled={isSubmitting || isUpdating}
                        placeholder="Location"
                        className={cn(
                          "bg-white/50 dark:bg-gray-900/50",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200",
                          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                          "focus:border-purple-500/50 transition-all"
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting || isUpdating}
                      placeholder="Tell us about yourself..."
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
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="Job Title"
                          className={cn(
                            "bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting || isUpdating}
                        placeholder="Company"
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
            </div>
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        disabled={isSubmitting || isUpdating}
                        placeholder="Education"
                        className={cn(
                          "bg-white/50 dark:bg-gray-900/50",
                          "border-gray-200 dark:border-gray-700",
                          "text-gray-900 dark:text-gray-200",
                          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                          "focus:border-purple-500/50 transition-all"
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-rose-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="GitHub URL"
                          className={cn(
                            "bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="LinkedIn URL"
                          className={cn(
                            "bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twitterUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="Twitter URL"
                          className={cn(
                            "bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          disabled={isSubmitting || isUpdating}
                          placeholder="Personal Website URL"
                          className={cn(
                            "bg-white/50 dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:border-purple-500/50 transition-all"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-rose-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              disabled={!isValid || isSubmitting || isUpdating}
              type="submit"
              className={cn(
                "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600",
                "text-white font-medium transition-colors",
                "disabled:bg-gray-200 dark:disabled:bg-gray-700",
                "disabled:text-gray-500 dark:disabled:text-gray-400"
              )}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}; 