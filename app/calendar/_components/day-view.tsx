"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DayViewProps {
  selectedDate: Date;
  events: any[];
  onTimeSelect: (date: Date) => void;
  onEventClick: (event: any) => void;
}

export const DayView = ({ selectedDate, events, onTimeSelect, onEventClick }: DayViewProps) => {
  return (
    <div className="space-y-2">
      {/* Day Header */}
      <div className="text-center py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {format(selectedDate, "EEEE, MMMM d")}
        </h2>
      </div>

      {/* Time Slots */}
      <div className="space-y-1">
        {Array.from({ length: 24 }, (_, hour) => {
          const hourEvents = events.filter(
            (event) => new Date(event.startTime).getHours() === hour
          );

          return (
            <div
              key={hour}
              className={cn(
                "group relative h-16",
                "border-l-2 border-gray-200 dark:border-gray-700",
                "hover:border-purple-500 dark:hover:border-purple-400",
                "transition-colors"
              )}
              onClick={() => onTimeSelect(new Date(new Date(selectedDate).setHours(hour)))}
            >
              {/* Time Label */}
              <div className="absolute -left-16 top-0 w-14 text-right">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date().setHours(hour), "ha")}
                </span>
              </div>

              {/* Events */}
              {hourEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "absolute left-2 right-2 p-2 rounded",
                    "bg-purple-100 dark:bg-purple-900/30",
                    "border border-purple-200 dark:border-purple-700",
                    "text-sm text-purple-700 dark:text-purple-300",
                    "hover:bg-purple-200 dark:hover:bg-purple-800/30",
                    "cursor-pointer"
                  )}
                >
                  <div className="font-medium">{event.title}</div>
                  {event.location && (
                    <div className="text-xs text-purple-600 dark:text-purple-400">
                      {event.location}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 