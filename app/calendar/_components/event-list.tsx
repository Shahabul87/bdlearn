"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Clock, MapPin, Bell, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventActions } from "./event-actions";

interface EventListProps {
  userId: string;
  selectedDate?: Date;
}

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  notification: boolean;
  notificationTime: number;
}

export const EventList = ({ userId, selectedDate }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/calendar/events?userId=${userId}&date=${selectedDate?.toISOString()}`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [userId, selectedDate]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800 h-24"
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <CalendarIcon className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          No events scheduled
        </p>
      </div>
    );
  }

  const handleDelete = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleEdit = (event: Event) => {
    // We'll implement this when we add edit functionality
    console.log("Edit event:", event);
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "p-4 rounded-lg",
            "bg-white dark:bg-gray-800",
            "border border-gray-200 dark:border-gray-700",
            "hover:shadow-md",
            "transition-all duration-200"
          )}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              {event.title}
            </h3>
            <EventActions
              eventId={event.id}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event.id)}
            />
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 mr-2" />
              {event.isAllDay ? (
                <span>All day</span>
              ) : (
                <span>
                  {event.startTime} - {event.endTime}
                </span>
              )}
            </div>

            {event.location && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
            )}

            {event.notification && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Bell className="w-4 h-4 mr-2" />
                {event.notificationTime} minutes before
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 