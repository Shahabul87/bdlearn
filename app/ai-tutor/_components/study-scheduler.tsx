"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudySession {
  id: string;
  subject: string;
  date: Date;
  duration: number;
  completed: boolean;
}

export const StudyScheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [showAddSession, setShowAddSession] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Study Schedule</h2>
        <Button onClick={() => setShowAddSession(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-4">Today's Sessions</h3>
            {sessions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No sessions scheduled</p>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{session.subject}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {session.duration} minutes
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={session.completed ? "text-green-500" : ""}
                    >
                      {session.completed ? "Completed" : "Start"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 