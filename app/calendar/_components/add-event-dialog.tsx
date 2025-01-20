"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DateTimePicker } from "./date-time-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  isAllDay: z.boolean(),
  location: z.string().optional(),
  notification: z.boolean(),
  notificationTime: z.number().min(0),
});

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  selectedDate?: Date;
}

export const AddEventDialog = ({ 
  open, 
  onClose, 
  userId,
  selectedDate 
}: AddEventDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: selectedDate || new Date(),
      endDate: selectedDate || new Date(),
      isAllDay: false,
      location: "",
      notification: true,
      notificationTime: 30,
    },
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post(`/api/calendar/events`, {
        ...values,
        userId,
      });
      toast.success("Event created successfully");
      onClose();
      form.reset();
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 max-w-md w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-200">
            Add New Event
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-130px)] pr-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Input
                {...form.register("title")}
                placeholder="Event Title"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
              
              <Textarea
                {...form.register("description")}
                placeholder="Description"
                className="bg-gray-800 border-gray-700 text-gray-200 min-h-[100px] resize-none"
              />

              <div className="grid grid-cols-1 gap-4">
                <DateTimePicker
                  label="Start"
                  date={form.watch("startDate")}
                  onChange={(date) => form.setValue("startDate", date)}
                />
                <DateTimePicker
                  label="End"
                  date={form.watch("endDate")}
                  onChange={(date) => form.setValue("endDate", date)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-gray-200">All Day</span>
                <Switch
                  checked={form.watch("isAllDay")}
                  onCheckedChange={(checked) => form.setValue("isAllDay", checked)}
                />
              </div>

              <Input
                {...form.register("location")}
                placeholder="Location"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-200">Notification</span>
                  <Switch
                    checked={form.watch("notification")}
                    onCheckedChange={(checked) => form.setValue("notification", checked)}
                  />
                </div>

                {form.watch("notification") && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      {...form.register("notificationTime", { valueAsNumber: true })}
                      className="bg-gray-800 border-gray-700 text-gray-200"
                    />
                    <span className="text-gray-400 whitespace-nowrap">minutes before</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-700 text-gray-200 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-purple-500 hover:bg-purple-600"
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}; 