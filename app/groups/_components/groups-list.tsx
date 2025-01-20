"use client";

import { Group, User, Category } from "@prisma/client";
import { motion } from "framer-motion";
import { Users, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface GroupWithRelations extends Group {
  _count: {
    members: number;
    discussions: number;
    events: number;
  };
  categoryRef: Category | null;
  creator: {
    name: string | null;
    image: string | null;
  } | null;
}

interface GroupsListProps {
  groups: GroupWithRelations[];
}

export const GroupsList = ({ groups }: GroupsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          {/* Group Card Content */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
            {group.categoryRef && (
              <span className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-2 py-1 rounded-full mb-3">
                {group.categoryRef.name}
              </span>
            )}
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {group.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {group._count.members}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {group._count.discussions}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {group._count.events}
              </div>
            </div>

            {/* Action Button */}
            <Link href={`/groups/${group.id}`} className="block">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Group
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 