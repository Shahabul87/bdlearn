"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Clock, MapPin, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewEventDialog } from "./new-event-dialog";
import { format, isFuture, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EventsProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const Events = ({ group, currentUser, isGroupMember }: EventsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/groups/${group.id}/events`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [group.id]);

  const upcomingEvents = events.filter(event => isFuture(new Date(event.date)));
  const pastEvents = events.filter(event => isPast(new Date(event.date)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Events
        </h2>
        {isGroupMember && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Event
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h3>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No upcoming events scheduled</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {event.title}
                  </h4>
                  {event.description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {event.description}
                    </p>
                  )}
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(event.date), "MMMM d, yyyy")}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.startTime} - {event.endTime}
                    </div>
                    {event.location && (
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        {event.isOnline ? (
                          <Video className="w-4 h-4 mr-2" />
                        ) : (
                          <MapPin className="w-4 h-4 mr-2" />
                        )}
                        {event.location}
                      </div>
                    )}
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      {event._count.attendees} attending
                    </div>
                  </div>
                  {isGroupMember && (
                    <Button
                      className="mt-4 w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => {/* Handle RSVP */}}
                    >
                      RSVP
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">
            Past Events
          </h3>
          {pastEvents.length === 0 ? (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p>No past events</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Similar structure to upcoming events but with past events */}
            </div>
          )}
        </div>
      </div>

      <NewEventDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        groupId={group.id}
        currentUser={currentUser}
        onSuccess={() => {
          setIsDialogOpen(false);
          fetchEvents();
        }}
      />
    </motion.div>
  );
}; 