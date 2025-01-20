"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layout, FolderOpen, PlayCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: any;
  progressCount: number;
  onSelectContent: (type: string, id: string | null) => void;
}

export const CourseSidebar = ({
  course,
  progressCount,
  onSelectContent,
}: CourseSidebarProps) => {
  const searchParams = useSearchParams();
  const activeType = searchParams.get('type') || "overview";
  const activeSectionId = searchParams.get('sectionId');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <button
          onClick={() => onSelectContent("overview", null)}
          className={cn(
            "w-full p-2 flex items-center gap-2 rounded-lg",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-800/80",
            "transition-colors duration-200",
            activeType === "overview" && "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
          )}
        >
          <Layout className="h-4 w-4" />
          Course Overview
        </button>

        <div className="space-y-6">
          {course.chapters.map((chapter: {
            id: string;
            title: string;
            sections: any[];
          }) => (
            <div key={chapter.id}>
              <h3 className="text-xs uppercase font-semibold px-2 mb-2 text-gray-500 dark:text-gray-400">
                {chapter.title}
              </h3>
              <div className="space-y-1">
                {chapter.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => onSelectContent("section", section.id)}
                    className={cn(
                      "w-full p-2 flex items-center gap-2 rounded-lg",
                      "text-sm text-gray-700 dark:text-gray-300",
                      "hover:bg-gray-100 dark:hover:bg-gray-800/80",
                      "transition-colors duration-200",
                      activeSectionId === section.id && "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                    )}
                  >
                    <PlayCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 