"use client";

import { useState } from "react";
import { MoreVertical, Edit, Trash, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EventActionsProps {
  eventId: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const EventActions = ({ eventId, onEdit, onDelete }: EventActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/calendar/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Event deleted");
        onDelete();
      } else {
        throw new Error("Failed to delete event");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-1 rounded-lg",
          "text-gray-500 dark:text-gray-400",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "transition-colors"
        )}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "absolute right-0 mt-1 w-36",
                "bg-white dark:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                "rounded-lg shadow-lg",
                "overflow-hidden",
                "z-50"
              )}
            >
              <button
                onClick={() => {
                  onEdit();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center w-full px-4 py-2",
                  "text-sm text-gray-700 dark:text-gray-300",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "transition-colors"
                )}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Event
              </button>
              <button
                onClick={handleDelete}
                className={cn(
                  "flex items-center w-full px-4 py-2",
                  "text-sm text-red-600 dark:text-red-400",
                  "hover:bg-red-50 dark:hover:bg-red-900/20",
                  "transition-colors"
                )}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Event
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 