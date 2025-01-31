"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Layout, FolderOpen, PlayCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Course, Chapter, Section } from "@prisma/client";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      sections: Section[];
    })[];
  };
  progressCount: number;
  onSelectContent: (type: string, id: string | null) => void;
}

export const CourseSidebar = ({
  course,
  progressCount,
  onSelectContent,
}: CourseSidebarProps) => {
  const [openChapters, setOpenChapters] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  const searchParams = useSearchParams();
  const activeType = searchParams.get('type') || "overview";
  const activeSectionId = searchParams.get('sectionId');

  // Handle initial load and localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(`course-${course.id}-chapters`);
    if (saved) {
      setOpenChapters(JSON.parse(saved));
    }
  }, [course.id]);

  // Save to localStorage when chapters change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(`course-${course.id}-chapters`, JSON.stringify(openChapters));
    }
  }, [openChapters, course.id, isClient]);

  const toggleChapter = (e: React.MouseEvent, chapterId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setOpenChapters(current => 
      current.includes(chapterId) 
        ? current.filter(id => id !== chapterId)
        : [...current, chapterId]
    );
  };

  const handleClick = (type: string, id: string | null) => {
    // Call parent handler
    onSelectContent(type, id);
    
    // Update URL directly as backup
    const params = new URLSearchParams(window.location.search);
    params.set('type', type);
    if (id) {
      params.set('sectionId', id);
    } else {
      params.delete('sectionId');
    }
    
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <div className="p-4 flex-1 overflow-y-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick("overview", null);
          }}
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

        <div className="mt-8 space-y-4">
          {course.chapters?.map((chapter) => (
            <div key={chapter.id}>
              <button
                onClick={(e) => toggleChapter(e, chapter.id)}
                className="w-full p-2 flex items-center justify-between group"
              >
                <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">
                  {chapter.title}
                </h3>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    openChapters.includes(chapter.id) ? "transform rotate-180" : ""
                  )}
                />
              </button>
              <AnimatePresence>
                {openChapters.includes(chapter.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-1 pt-2 px-2">
                      {chapter.sections?.filter(section => section.isPublished).map((section) => (
                        <button
                          key={section.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick("section", section.id);
                          }}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 