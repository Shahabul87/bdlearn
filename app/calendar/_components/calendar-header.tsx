"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, LayoutGrid, Layout, CalendarDays } from "lucide-react";

interface CalendarHeaderProps {
  view: "month" | "week" | "day";
  onViewChange: (view: "month" | "week" | "day") => void;
}

export const CalendarHeader = ({ view, onViewChange }: CalendarHeaderProps) => {
  const views = [
    { id: "month", label: "Month", icon: Calendar },
    { id: "week", label: "Week", icon: LayoutGrid },
    { id: "day", label: "Day", icon: Layout },
  ] as const;

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Calendar
      </h1>
      
      <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
        {views.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium",
              "transition-all duration-200",
              view === id
                ? "bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 