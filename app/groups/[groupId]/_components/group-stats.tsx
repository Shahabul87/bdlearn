"use client";

import { motion } from "framer-motion";
import { Users, MessageSquare, FileText, Calendar } from "lucide-react";

interface GroupStatsProps {
  stats: {
    members: number;
    discussions: number;
    resources: number;
    events: number;
  };
}

export const GroupStats = ({ stats }: GroupStatsProps) => {
  const statItems = [
    { icon: Users, label: "Members", value: stats.members },
    { icon: MessageSquare, label: "Discussions", value: stats.discussions },
    { icon: FileText, label: "Resources", value: stats.resources },
    { icon: Calendar, label: "Events", value: stats.events },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statItems.map((item) => (
        <div
          key={item.label}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2">
            <item.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {item.value}
          </p>
        </div>
      ))}
    </motion.div>
  );
}; 