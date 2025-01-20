"use client";

import { memo } from "react";
import { ViewTransition } from "./view-transitions";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";
import { DayView } from "./day-view";
import { useCalendarStore } from "../_lib/calendar-store";

interface OptimizedCalendarProps {
  events: any[];
  filters: any;
  onEventMove: (eventId: string, newDate: Date) => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
  onEventClick: (event: any) => void;
}

export const OptimizedCalendar = memo(({ 
  events, 
  filters, 
  onEventMove,
  onDateSelect,
  selectedDate,
  onEventClick
}: OptimizedCalendarProps) => {
  const { view } = useCalendarStore();

  return (
    <ViewTransition view={view}>
      {view === "month" && (
        <MonthView
          selectedDate={selectedDate}
          events={events}
          onSelectDate={onDateSelect}
          onEventMove={onEventMove}
          onEventClick={onEventClick}
        />
      )}
      {view === "week" && (
        <WeekView
          selectedDate={selectedDate}
          events={events}
          onSelectDate={onDateSelect}
          onEventMove={onEventMove}
          onEventClick={onEventClick}
        />
      )}
      {view === "day" && (
        <DayView
          selectedDate={selectedDate}
          events={events}
          onTimeSelect={onDateSelect}
          onEventClick={onEventClick}
        />
      )}
    </ViewTransition>
  );
});

OptimizedCalendar.displayName = "OptimizedCalendar"; 