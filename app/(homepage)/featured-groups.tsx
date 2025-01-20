"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FEATURED_GROUPS = [
  {
    id: "1",
    name: "Computer Science Hub",
    description: "A community for CS students to discuss algorithms, programming, and more.",
    members: 234,
    imageUrl: "/images/cs-group.jpg",
    category: "Computer Science",
  },
  // Add more featured groups...
];

export const FeaturedGroups = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Featured Study Groups
        </h2>
        <Link href="/groups">
          <Button variant="ghost" className="text-purple-600 dark:text-purple-400">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_GROUPS.map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="h-48 relative">
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">
                  {group.name}
                </h3>
                <div className="flex items-center mt-1 text-sm text-gray-200">
                  <Users className="w-4 h-4 mr-1" />
                  {group.members} members
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {group.description}
              </p>
              <Link href={`/groups/${group.id}`}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Join Group
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}; 