"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { NewEventDialog } from "./new-event-dialog";
import { EventList } from "./event-list";
import { CalendarHeader } from "./calendar-header";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  userId: string;
}

export const CalendarView = ({ userId }: CalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [view, setView] = useState<"month" | "week" | "day">("month");

  return (
    <div className="pt-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            <button
              onClick={() => setIsNewEventOpen(true)}
              className={cn(
                "w-full py-3 px-4 rounded-lg",
                "bg-purple-600 hover:bg-purple-700",
                "text-white font-medium",
                "shadow-lg shadow-purple-600/20",
                "transition-all duration-200"
              )}
            >
              Create Event
            </button>
            <EventList userId={userId} selectedDate={selectedDate} />
          </div>

          {/* Main Calendar */}
          <div className="flex-1">
            <CalendarHeader view={view} onViewChange={setView} />
            <div className="mt-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsNewEventOpen(true);
                }}
                className={cn(
                  "rounded-lg border border-gray-200 dark:border-gray-800",
                  "p-4",
                  "bg-white dark:bg-gray-900"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <NewEventDialog
        open={isNewEventOpen}
        onClose={() => setIsNewEventOpen(false)}
        selectedDate={selectedDate}
        userId={userId}
      />
    </div>
  );
}; 