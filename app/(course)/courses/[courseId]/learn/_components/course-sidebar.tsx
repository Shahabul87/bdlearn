"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layout, FolderOpen, PlayCircle, Lock, CheckCircle } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course, Chapter, Section } from "@prisma/client";
import Link from "next/link";

interface CourseSidebarProps {
  course: Course & {
    chapters: Chapter[];
  };
  currentChapterId?: string;
}

export const CourseSidebar = ({ course, currentChapterId }: CourseSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      {/* Course Title Section */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="font-heading text-2xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-bold">
          {course.title}
        </h2>
      </div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {course.chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/courses/${course.id}/learn/${chapter.id}`}
              className={cn(
                "flex items-center p-3 text-sm transition-all rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80",
                "border border-transparent hover:border-gray-200 dark:hover:border-gray-700",
                "group relative",
                pathname.includes(chapter.id) && 
                "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                {chapter.isPublished ? (
                  <CheckCircle className={cn(
                    "h-5 w-5 transition-colors",
                    pathname.includes(chapter.id) 
                      ? "text-purple-600 dark:text-purple-400" 
                      : "text-emerald-500"
                  )} />
                ) : (
                  <Lock className="h-5 w-5 text-slate-500" />
                )}
                <div className="flex flex-col">
                  <span className={cn(
                    "font-medium transition-colors",
                    pathname.includes(chapter.id) 
                      ? "text-purple-700 dark:text-purple-300" 
                      : "text-gray-700 dark:text-gray-300"
                  )}>
                    {chapter.title}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-purple-100/0 dark:bg-purple-900/0 transition-colors"
                whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.05)" }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 