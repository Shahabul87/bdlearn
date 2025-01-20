"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface WeekViewProps {
  selectedDate: Date;
  events: any[];
  onSelectDate: (date: Date) => void;
}

export const WeekView = ({ selectedDate, events, onSelectDate }: WeekViewProps) => {
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Week Day Headers */}
      {weekDays.map((date) => (
        <div
          key={date.toString()}
          className="text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          {format(date, "EEE")}
        </div>
      ))}

      {/* Time Slots */}
      {Array.from({ length: 24 }, (_, hour) => (
        <div key={hour} className="col-span-7 grid grid-cols-7 gap-2">
          {weekDays.map((date) => {
            const dayEvents = events.filter((event) => {
              const eventDate = new Date(event.startDate);
              return (
                isSameDay(eventDate, date) &&
                new Date(event.startTime).getHours() === hour
              );
            });

            return (
              <div
                key={date.toString()}
                className={cn(
                  "relative h-12 border-t border-gray-200 dark:border-gray-700",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  "transition-colors"
                )}
                onClick={() => onSelectDate(date)}
              >
                {/* Time Label */}
                {hour === 0 && (
                  <div className="absolute -top-6 left-2 text-xs text-gray-500">
                    {format(date, "d")}
                  </div>
                )}

                {/* Events */}
                {dayEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "absolute inset-x-1 p-1 rounded",
                      "bg-purple-100 dark:bg-purple-900/30",
                      "border border-purple-200 dark:border-purple-700",
                      "text-xs text-purple-700 dark:text-purple-300",
                      "truncate cursor-pointer",
                      "hover:bg-purple-200 dark:hover:bg-purple-800/30"
                    )}
                  >
                    {event.title}
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}; 