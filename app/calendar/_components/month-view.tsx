"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonthViewProps {
  selectedDate: Date;
  events: any[];
  onSelectDate: (date: Date) => void;
  onEventMove?: (eventId: string, newDate: Date) => void;
  onEventClick?: (event: any) => void;
}

export const MonthView = ({ 
  selectedDate, 
  events, 
  onSelectDate,
  onEventMove,
  onEventClick
}: MonthViewProps) => {
  const monthDays = useMemo(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    return eachDayOfInterval({ start, end });
  }, [selectedDate]);

  const handleDateClick = (date: Date) => {
    onSelectDate(date);
  };

  const EventsList = ({ dayEvents }: { dayEvents: any[] }) => (
    <div className="w-64 p-2 space-y-1">
      {dayEvents.map((event) => (
        <div
          key={event.id}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick?.(event);
          }}
          className={cn(
            "p-2 rounded",
            "bg-purple-50 dark:bg-purple-900/20",
            "hover:bg-purple-100 dark:hover:bg-purple-900/30",
            "cursor-pointer",
            "transition-colors"
          )}
        >
          <div className="font-medium text-sm text-purple-700 dark:text-purple-300">
            {event.title}
          </div>
          {!event.isAllDay && (
            <div className="text-xs text-purple-600 dark:text-purple-400">
              {format(new Date(event.startDate), "h:mm a")}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {monthDays.map((day) => {
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.startDate), day)
        );

        return (
          <div
            key={day.toISOString()}
            onClick={() => handleDateClick(day)}
            className={cn(
              "relative min-h-[100px] p-2",
              "border border-gray-200 dark:border-gray-700",
              "rounded-lg transition-colors cursor-pointer",
              isSameMonth(day, selectedDate)
                ? "bg-white dark:bg-gray-800"
                : "bg-gray-50 dark:bg-gray-800/50",
              "hover:border-purple-200 dark:hover:border-purple-700"
            )}
          >
            <div className="flex justify-between items-start">
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "w-6 h-6 text-sm rounded-full",
                  isSameDay(day, new Date())
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {format(day, "d")}
              </span>

              {dayEvents.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          "w-6 h-6 rounded-full text-xs font-medium",
                          "bg-purple-100 dark:bg-purple-900/30",
                          "text-purple-600 dark:text-purple-300",
                          "hover:bg-purple-200 dark:hover:bg-purple-900/50",
                          "transition-colors cursor-pointer"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dayEvents.length === 1) {
                            onEventClick?.(dayEvents[0]);
                          }
                        }}
                      >
                        {dayEvents.length}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      align="start"
                      className="p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                    >
                      <EventsList dayEvents={dayEvents} />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 