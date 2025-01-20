"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const MyCourseCard = ({ course }: any) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-xl overflow-hidden h-full group",
          "border transition-colors",
          "dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-gray-700",
          "bg-white border-gray-200 hover:border-gray-300",
          "backdrop-blur-sm"
        )}
      >
        <div className="aspect-video relative">
          <div className={cn(
            "absolute inset-0",
            "dark:bg-gray-950/50 bg-gray-100/50"
          )}>
            {course.imageUrl && (
              <motion.img
                src={course.imageUrl}
                alt={course.title}
                className="object-cover w-full h-full rounded-t-xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        <div className="p-4">
          <motion.h3 
            className={cn(
              "text-lg font-semibold line-clamp-2 mb-2 transition-colors duration-300",
              "bg-clip-text",
              "dark:group-hover:text-transparent dark:group-hover:bg-gradient-to-r dark:group-hover:from-purple-400 dark:group-hover:to-pink-400",
              "group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600",
              "dark:text-gray-200 text-gray-800"
            )}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {course.title}
          </motion.h3>

          <div className="space-y-2">
            <motion.div 
              className={cn(
                "flex items-center gap-x-2 text-sm",
                "dark:text-gray-400 text-gray-600"
              )}
              whileHover={{ x: 2 }}
            >
              <Clock className="h-4 w-4" />
              <span>
                {course.chapters?.length || 0} {course.chapters?.length === 1 ? "Chapter" : "Chapters"}
              </span>
            </motion.div>

            <motion.div 
              className={cn(
                "flex items-center gap-x-2 text-sm",
                "dark:text-gray-400 text-gray-600"
              )}
              whileHover={{ x: 2 }}
            >
              <BookOpen className="h-4 w-4" />
              <span>
                {course.sections?.length || 0} {course.sections?.length === 1 ? "Section" : "Sections"}
              </span>
            </motion.div>

            <div className={cn(
              "flex items-center justify-between",
              "dark:text-gray-300 text-gray-700"
            )}>
              <motion.p 
                className="text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Progress: {course.progress || 0}%
              </motion.p>
              <motion.p 
                className={cn(
                  "text-sm font-semibold",
                  course.price === 0 
                    ? "dark:text-emerald-400 text-emerald-600" 
                    : "dark:text-purple-400 text-purple-600"
                )}
                whileHover={{ scale: 1.05 }}
              >
                {course.price === 0 ? "Free" : formatPrice(course.price)}
              </motion.p>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </motion.div>
    </Link>
  );
};

export default MyCourseCard;
