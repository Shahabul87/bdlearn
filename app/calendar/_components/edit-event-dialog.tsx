"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Calendar, MapPin, Bell, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditEventDialogProps {
  open: boolean;
  onClose: () => void;
  event: any;
  onEventUpdated: () => void;
}

export const EditEventDialog = ({
  open,
  onClose,
  event,
  onEventUpdated
}: EditEventDialogProps) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
    startTime: event.startTime,
    endTime: event.endTime,
    isAllDay: event.isAllDay,
    notification: event.notification,
    notificationTime: event.notificationTime,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/calendar/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Event updated");
        onEventUpdated();
        onClose();
      } else {
        throw new Error("Failed to update event");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/calendar/events/${event.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Event deleted");
        onEventUpdated();
        onClose();
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-4">
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-lg font-medium"
              placeholder="Event title"
            />

            {/* Date and Time */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-2 text-gray-500" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4">
                  <Input
                    type="date"
                    value={format(formData.startDate, "yyyy-MM-dd")}
                    onChange={(e) => setFormData({
                      ...formData,
                      startDate: new Date(e.target.value)
                    })}
                  />
                  {!formData.isAllDay && (
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({
                        ...formData,
                        startTime: e.target.value
                      })}
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.isAllDay}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      isAllDay: checked
                    })}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    All day
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-2 text-gray-500" />
              <Input
                value={formData.location}
                onChange={(e) => setFormData({
                  ...formData,
                  location: e.target.value
                })}
                placeholder="Add location"
              />
            </div>

            {/* Description */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-2 text-gray-500" />
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({
                  ...formData,
                  description: e.target.value
                })}
                placeholder="Add description"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Event
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 