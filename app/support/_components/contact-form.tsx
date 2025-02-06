"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  subject: z.string().min(1, "Subject is required"),
  category: z.string().min(1, "Category is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactFormProps {
  userId: string;
}

export const ContactForm = ({ userId }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      category: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/support/tickets", {
        ...values,
        userId,
      });
      toast.success("Support ticket submitted successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit support ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <Select
            onValueChange={(value) => form.setValue("category", value)}
            defaultValue={form.watch("category")}
          >
            <SelectTrigger 
              className={cn(
                "w-full h-9 sm:h-10",
                "bg-white/50 dark:bg-gray-800/50",
                "border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-100",
                "text-sm",
                "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
                "placeholder:text-gray-500 dark:placeholder:text-gray-400"
              )}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className={cn(
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700"
            )}>
              <SelectItem 
                value="technical"
                className="text-gray-900 dark:text-gray-100"
              >
                Technical Issue
              </SelectItem>
              <SelectItem 
                value="billing"
                className="text-gray-900 dark:text-gray-100"
              >
                Billing
              </SelectItem>
              <SelectItem 
                value="account"
                className="text-gray-900 dark:text-gray-100"
              >
                Account
              </SelectItem>
              <SelectItem 
                value="course"
                className="text-gray-900 dark:text-gray-100"
              >
                Course Related
              </SelectItem>
              <SelectItem 
                value="other"
                className="text-gray-900 dark:text-gray-100"
              >
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <Input
            {...form.register("subject")}
            placeholder="Brief description of your issue"
            className={cn(
              "w-full h-9 sm:h-10",
              "bg-white/50 dark:bg-gray-800/50",
              "border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-gray-100",
              "text-sm",
              "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400"
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <Textarea
            {...form.register("message")}
            placeholder="Describe your issue in detail..."
            className={cn(
              "min-h-[150px] sm:min-h-[200px]",
              "bg-white/50 dark:bg-gray-800/50",
              "border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-gray-100",
              "text-sm",
              "focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "resize-y"
            )}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="sm"
        className={cn(
          "w-full h-9 sm:h-10",
          "bg-purple-600 hover:bg-purple-700",
          "dark:bg-purple-500 dark:hover:bg-purple-600",
          "text-white",
          "text-xs sm:text-sm",
          "font-medium",
          "transition-colors"
        )}
      >
        {isSubmitting ? "Submitting..." : "Submit Ticket"}
      </Button>
    </form>
  );
}; 