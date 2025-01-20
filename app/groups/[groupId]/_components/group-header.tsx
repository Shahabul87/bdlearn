"use client";

import { motion } from "framer-motion";
import { Users, Lock, Globe, UserPlus, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NotificationsBell } from "./notifications-bell";
import { GroupSearch } from "./group-search";

interface GroupHeaderProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const GroupHeader = ({ group, currentUser, isGroupMember }: GroupHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative h-48 rounded-xl overflow-hidden">
        {group.imageUrl ? (
          <img
            src={group.imageUrl}
            alt={group.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500" />
        )}
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {group.name}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{group.members.length} members</span>
            </div>
            <div className="flex items-center gap-1">
              {group.privacy === "public" ? (
                <Globe className="w-4 h-4" />
              ) : group.privacy === "private" ? (
                <Lock className="w-4 h-4" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              <span className="capitalize">{group.privacy}</span>
            </div>
            {group.course && (
              <div className="flex items-center gap-1">
                <Book className="w-4 h-4" />
                <span>{group.course.title}</span>
              </div>
            )}
          </div>
        </div>

        {!isGroupMember && (
          <Button
            className={cn(
              "bg-purple-600 hover:bg-purple-700",
              "text-white",
              "shadow-lg shadow-purple-600/20"
            )}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Join Group
          </Button>
        )}
      </div>

      {group.description && (
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {group.description}
        </p>
      )}

      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1">
          <GroupSearch group={group} />
        </div>
        {isGroupMember && (
          <NotificationsBell
            notifications={[]} // TODO: Fetch notifications
            onMarkAsRead={(id) => {
              // TODO: Implement mark as read
            }}
          />
        )}
      </div>
    </motion.div>
  );
}; 