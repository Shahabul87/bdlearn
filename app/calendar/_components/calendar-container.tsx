"use client";

import { useState, useEffect } from "react";
import { OptimizedCalendar } from "./optimized-calendar";
import { NewEventDialog } from "./new-event-dialog";
import { handleCalendarError } from "../_lib/error-handler";
import { toast } from "sonner";
import { EventDetailsDialog } from "./event-details-dialog";
import { EditEventDialog } from "./edit-event-dialog";

interface CalendarContainerProps {
  userId: string;
  filters: any;
  settings: any;
}

export const CalendarContainer = ({
  userId,
  filters,
  settings,
}: CalendarContainerProps) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isNewEventOpen, setIsNewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [userId, filters]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams({
        userId,
        ...(filters.dateRange && {
          date: filters.dateRange.start?.toISOString(),
        }),
      });

      const response = await fetch(`/api/calendar/events?${searchParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch events");
      }

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      handleCalendarError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    console.log("Date selected:", date);
    setSelectedDate(date);
    setIsNewEventOpen(true);
  };

  const handleEventMove = async (eventId: string, newDate: Date) => {
    try {
      const response = await fetch(`/api/calendar/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: newDate }),
      });

      if (!response.ok) throw new Error("Failed to update event");

      toast.success("Event moved successfully");
      fetchEvents();
    } catch (error) {
      handleCalendarError(error);
    }
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleEventEdit = () => {
    setIsEditOpen(true);
  };

  const handleEventDelete = () => {
    fetchEvents();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <>
      <OptimizedCalendar
        events={events}
        filters={filters}
        onEventMove={handleEventMove}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate || new Date()}
        onEventClick={handleEventClick}
      />

      <NewEventDialog
        open={isNewEventOpen}
        onClose={() => {
          setIsNewEventOpen(false);
          setSelectedDate(null);
        }}
        selectedDate={selectedDate}
        userId={userId}
        onEventCreated={fetchEvents}
      />

      {selectedEvent && (
        <>
          <EventDetailsDialog
            event={selectedEvent}
            open={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            onEdit={handleEventEdit}
            onDelete={handleEventDelete}
          />

          <EditEventDialog
            event={selectedEvent}
            open={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedEvent(null);
            }}
            onEventUpdated={fetchEvents}
          />
        </>
      )}
    </>
  );
}; 