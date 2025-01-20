"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Users, Lock, Globe, UserPlus, Image as ImageIcon } from "lucide-react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string(),
  privacy: z.enum(["public", "private", "invite-only"]),
  rules: z.array(z.string()),
  tags: z.array(z.string()),
  courseId: z.string().optional().nullable(),
});

interface CreateGroupFormProps {
  userId: string;
  enrolledCourses: {
    id: string;
    title: string;
    imageUrl?: string | null;
  }[];
}

export const CreateGroupForm = ({ userId, enrolledCourses }: CreateGroupFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      category: "general",
      privacy: "public",
      rules: [],
      tags: [],
      courseId: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create group");
      }

      const group = await response.json();
      toast.success("Group created successfully!");
      router.push(`/groups/${group.id}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-6 rounded-xl",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg"
      )}
    >
      <div className="space-y-6">
        <div>
          <h1 className={cn(
            "text-2xl font-bold mb-2",
            "bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400",
            "bg-clip-text text-transparent"
          )}>
            Create a New Group
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details below to create your group
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Group Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Group Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter group name"
                      disabled={isSubmitting}
                      className={cn(
                        "bg-white dark:bg-gray-900",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "border-gray-200 dark:border-gray-700",
                        "focus:border-purple-500 dark:focus:border-purple-400"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your group..."
                      disabled={isSubmitting}
                      className={cn(
                        "resize-none",
                        "bg-white dark:bg-gray-900",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "border-gray-200 dark:border-gray-700",
                        "focus:border-purple-500 dark:focus:border-purple-400"
                      )}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Category & Privacy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      Category
                    </FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectItem value="general" className="text-gray-900 dark:text-gray-100">General</SelectItem>
                        <SelectItem value="technology" className="text-gray-900 dark:text-gray-100">Technology</SelectItem>
                        <SelectItem value="education" className="text-gray-900 dark:text-gray-100">Education</SelectItem>
                        <SelectItem value="gaming" className="text-gray-900 dark:text-gray-100">Gaming</SelectItem>
                        <SelectItem value="art" className="text-gray-900 dark:text-gray-100">Art & Design</SelectItem>
                        <SelectItem value="other" className="text-gray-900 dark:text-gray-100">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="privacy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      Privacy
                    </FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                          <SelectValue placeholder="Select privacy" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectItem 
                          value="public" 
                          className="text-gray-900 dark:text-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>Public</span>
                          </div>
                        </SelectItem>
                        <SelectItem 
                          value="private"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>Private</span>
                          </div>
                        </SelectItem>
                        <SelectItem 
                          value="invite-only"
                          className="text-gray-900 dark:text-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>Invite Only</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Tags Input */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Tags
                  </FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag, index) => (
                      <span
                        key={index}
                        className={cn(
                          "px-2 py-1 rounded-full text-sm",
                          "bg-purple-100 dark:bg-purple-900/30",
                          "text-purple-600 dark:text-purple-300",
                          "border border-purple-200 dark:border-purple-700/50"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                    <Input
                      placeholder="Add tags..."
                      className={cn(
                        "flex-1",
                        "bg-white dark:bg-gray-900",
                        "text-gray-900 dark:text-gray-100",
                        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                        "border-gray-200 dark:border-gray-700"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          e.preventDefault();
                          const newTag = e.currentTarget.value.trim();
                          if (newTag && !field.value.includes(newTag)) {
                            field.onChange([...field.value, newTag]);
                          }
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Add Course Selection Field */}
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Associated Course (Optional)
                  </FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={(value) => field.onChange(value === "none" ? null : value)}
                    value={field.value || "none"}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem 
                        value="none"
                        className="text-gray-900 dark:text-gray-100"
                      >
                        No Course
                      </SelectItem>
                      {enrolledCourses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            {course.imageUrl && (
                              <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            )}
                            <span>{course.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    Create a study group for a specific course
                  </FormDescription>
                  <FormMessage className="text-red-500 dark:text-red-400" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full sm:w-auto",
                "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500",
                "text-white dark:text-gray-100",
                "border border-purple-600 dark:border-purple-500",
                "shadow-lg shadow-purple-600/20 dark:shadow-purple-500/20"
              )}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 animate-spin" />
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Create Group
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}; 