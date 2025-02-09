"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CourseOutcomesProps {
  chapters: {
    id: string;
    title: string;
    description: string | null;
    learningOutcomes: string | null;
  }[];
}

export const CourseOutcomes = ({ chapters }: CourseOutcomesProps) => {
  const [activeChapter, setActiveChapter] = useState(chapters[0]?.id);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Chapter List - Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="space-y-2 sticky top-20">
            {chapters.map((chapter) => (
              <motion.button
                key={chapter.id}
                onClick={() => setActiveChapter(chapter.id)}
                className={cn(
                  "w-full text-left px-4 py-4 rounded-xl transition-all duration-200",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  "border dark:border-gray-800",
                  activeChapter === chapter.id
                    ? "bg-gradient-to-br from-rose-50 to-cyan-50 dark:from-rose-500/10 dark:to-cyan-500/10 border-rose-200/50 dark:border-rose-800/50 shadow-md"
                    : "bg-white dark:bg-gray-900 hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center border",
                    activeChapter === chapter.id
                      ? "bg-rose-500/10 border-rose-200 dark:border-rose-800"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  )}>
                    <BookOpen className={cn(
                      "h-5 w-5",
                      activeChapter === chapter.id
                        ? "text-rose-500"
                        : "text-gray-500 dark:text-gray-400"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-medium truncate",
                      activeChapter === chapter.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-200"
                    )}>
                      {chapter.title}
                    </h3>
                  </div>
                  <ChevronRight className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                    activeChapter === chapter.id
                      ? "text-rose-500 rotate-90"
                      : "text-gray-400"
                  )} />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Learning Outcomes Display */}
        <div className="lg:col-span-8 xl:col-span-9 relative min-h-[400px]">
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeChapter === chapter.id ? 1 : 0,
                y: activeChapter === chapter.id ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute w-full transition-all duration-200",
                activeChapter === chapter.id ? "visible" : "invisible"
              )}
            >
              <div className="bg-gradient-to-br from-rose-50/80 to-cyan-50/80 dark:from-rose-500/5 dark:to-cyan-500/5 rounded-2xl p-6 lg:p-8 border border-rose-100/50 dark:border-rose-800/50 shadow-xl dark:shadow-2xl backdrop-blur-sm">
                <h2 className="text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-4">
                  {chapter.title}
                </h2>
                {chapter.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                    {chapter.description}
                  </p>
                )}
                <div className="space-y-4">
                  {(chapter.learningOutcomes?.split(',') || []).map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-white/80 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="bg-rose-50 dark:bg-rose-500/10 p-2 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-rose-500" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 text-lg">
                        {outcome.trim()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 