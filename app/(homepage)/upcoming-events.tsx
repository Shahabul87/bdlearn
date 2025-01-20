"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Advanced JavaScript Workshop",
    date: new Date("2024-04-15"),
    time: "14:00 - 16:00",
    location: "Online (Zoom)",
    attendees: 24,
    groupName: "JavaScript Enthusiasts",
    groupId: "js-group",
  },
  {
    id: "2",
    title: "Machine Learning Study Group",
    date: new Date("2024-04-18"),
    time: "18:00 - 20:00",
    location: "Tech Hub, Room 203",
    attendees: 15,
    groupName: "AI & ML Community",
    groupId: "ai-ml-group",
  },
  {
    id: "3",
    title: "Web Development Hackathon",
    date: new Date("2024-04-20"),
    time: "09:00 - 17:00",
    location: "Innovation Center",
    attendees: 32,
    groupName: "Web Dev Masters",
    groupId: "webdev-group",
  },
  {
    id: "4",
    title: "Data Science Workshop",
    date: new Date("2024-04-22"),
    time: "15:00 - 17:00",
    location: "Online (Google Meet)",
    attendees: 28,
    groupName: "Data Science Network",
    groupId: "data-science-group",
  },
  {
    id: "5",
    title: "Mobile App Development Meetup",
    date: new Date("2024-04-25"),
    time: "19:00 - 21:00",
    location: "Tech Cafe",
    attendees: 20,
    groupName: "Mobile Developers",
    groupId: "mobile-dev-group",
  },
  {
    id: "6",
    title: "Cloud Computing Seminar",
    date: new Date("2024-04-28"),
    time: "13:00 - 15:00",
    location: "Online (Microsoft Teams)",
    attendees: 45,
    groupName: "Cloud Tech Community",
    groupId: "cloud-tech-group",
  },
];

export const UpcomingEvents = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Upcoming Events
        </h2>
        <Link href="/events">
          <Button variant="ghost" className="text-purple-600 dark:text-purple-400">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UPCOMING_EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {format(event.date, "MMMM d, yyyy")}
              </span>
            </div>
            
            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            
            <Link 
              href={`/groups/${event.groupId}`}
              className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >
              {event.groupName}
            </Link>

            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{event.attendees} attending</span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Join Event
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}; 