"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Clock, MapPin, Bell, Calendar, Trash, Edit } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EventDetailsDialogProps {
  event: any;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const EventDetailsDialog = ({
  event,
  open,
  onClose,
  onEdit,
  onDelete,
}: EventDetailsDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/calendar/events/${event.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      toast.success("Event deleted successfully");
      onDelete();
      onClose();
    } catch (error) {
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Time */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 mt-1 text-gray-500" />
            <div>
              <p className="font-medium">
                {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
              </p>
              {!event.isAllDay && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(event.startDate), "h:mm a")} - 
                  {format(new Date(event.endDate), "h:mm a")}
                </p>
              )}
              {event.isAllDay && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All day
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-gray-500" />
              <p>{event.location}</p>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="border-t pt-4">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* Notification */}
          {event.notification && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Bell className="w-4 h-4" />
              <p>{event.notificationTime} minutes before</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => {
                onClose();
                onEdit();
              }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 