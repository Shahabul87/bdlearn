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
      // Add API endpoint for handling support tickets
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
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <Select
          onValueChange={(value) => form.setValue("category", value)}
          defaultValue={form.watch("category")}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="technical">Technical Issue</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="account">Account</SelectItem>
            <SelectItem value="course">Course Related</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Input
          {...form.register("subject")}
          placeholder="Subject"
          className="bg-gray-800 border-gray-700 text-gray-200"
        />

        <Textarea
          {...form.register("message")}
          placeholder="Describe your issue..."
          className="bg-gray-800 border-gray-700 text-gray-200 min-h-[200px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-500 hover:bg-purple-600"
      >
        {isSubmitting ? "Submitting..." : "Submit Ticket"}
      </Button>
    </form>
  );
}; 