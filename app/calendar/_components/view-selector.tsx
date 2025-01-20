"use client";

import { Button } from "@/components/ui/button";

interface ViewSelectorProps {
  view: "month" | "week" | "day";
  onChange: (view: "month" | "week" | "day") => void;
}

export const ViewSelector = ({ view, onChange }: ViewSelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-1">
      <Button
        variant={view === "month" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("month")}
        className={view === "month" ? "bg-purple-500" : "text-gray-400"}
      >
        Month
      </Button>
      <Button
        variant={view === "week" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("week")}
        className={view === "week" ? "bg-purple-500" : "text-gray-400"}
      >
        Week
      </Button>
      <Button
        variant={view === "day" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("day")}
        className={view === "day" ? "bg-purple-500" : "text-gray-400"}
      >
        Day
      </Button>
    </div>
  );
}; 