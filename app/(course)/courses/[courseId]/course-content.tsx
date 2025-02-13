"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronUp, PlayCircle, BookOpen, 
  Clock, Award, Lock, CheckCircle, Info, ExternalLink,
  BookOpenCheck, Sparkles, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { Chapter, Section } from '@prisma/client';
import { cn } from "@/lib/utils";
import { ChapterSection } from './_components/chapter-section';

interface CourseContentProps {
  chapters: (Chapter & {
    sections: Section[];
  })[] | undefined;
}

export const CourseContent: React.FC<CourseContentProps> = ({ chapters }) => {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const toggleChapter = (index: number) => {
    setExpandedChapter(index === expandedChapter ? null : index);
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpandedChapter(expandAll ? null : -1);
  };

  const getDifficultyColor = (difficulty: string | null | undefined) => {
    if (!difficulty) return "text-slate-500 dark:text-slate-400";
    
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "text-teal-600 dark:text-teal-400";
      case "intermediate":
        return "text-indigo-600 dark:text-indigo-400";
      case "advanced":
        return "text-rose-600 dark:text-rose-400";
      default:
        return "text-slate-500 dark:text-slate-400";
    }
  };

  const textGradients: { [key: number]: string } = {
    0: "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent",
    1: "bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent",
    2: "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent",
    3: "bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent",
    4: "bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"
  };

  return (
    <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-white/50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 shadow-xl rounded-2xl backdrop-blur-sm">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-300 dark:to-violet-300 text-transparent bg-clip-text tracking-tight">
            Course Structure
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4" />
              <span>{chapters?.length || 0} chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>
                {chapters?.reduce((acc, chapter) => acc + (chapter.sections?.length || 0), 0)} sections
              </span>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleExpandAll}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                   hover:bg-gray-50 dark:hover:bg-gray-750 text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all duration-200"
        >
          {expandAll ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand All
            </>
          )}
        </motion.button>
      </div>

      {/* Chapter Loop */}
      <div className="space-y-3 sm:space-y-4">
        {chapters?.map((chapter, index) => (
          <motion.div 
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200/50 dark:border-gray-800/50 rounded-xl overflow-hidden bg-white/80 dark:bg-gray-900/50"
          >
            {/* Chapter Header */}
            <motion.div
              className={cn(
                "flex justify-between items-center p-3 sm:p-4 cursor-pointer transition-colors duration-200",
                "hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
              )}
              onClick={() => toggleChapter(index)}
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className={cn(
                    "font-bold text-lg sm:text-xl truncate",
                    textGradients[index % 5]
                  )}>
                    {chapter.title}
                  </h3>
                  {chapter.status === "Published" && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300">
                      Published
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{chapter.estimatedTime || 'Duration varies'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className={getDifficultyColor(chapter.difficulty)}>
                      {chapter.difficulty || 'All Levels'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{chapter.sections?.length || 0} sections</span>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: (expandedChapter === index || expandAll) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-4"
              >
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </motion.div>

            {/* Chapter Sections */}
            <AnimatePresence>
              {(expandedChapter === index || expandAll) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200 dark:border-gray-800"
                >
                  <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                    {chapter.prerequisites && (
                      <div className="mb-4 p-3 rounded-lg bg-indigo-50/80 dark:bg-indigo-500/5 border border-indigo-200 dark:border-indigo-500/20">
                        <div className="flex items-center gap-2 mb-1 font-medium text-indigo-800 dark:text-indigo-300">
                          <Info className="w-4 h-4" />
                          Prerequisites
                        </div>
                        <p className="text-sm text-indigo-700 dark:text-indigo-300">
                          {chapter.prerequisites}
                        </p>
                      </div>
                    )}
                    
                    {chapter.sections?.map((section) => (
                      <ChapterSection key={section.id} section={section} />
                    ))}
                  </div>

                  {chapter.resources && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-200">
                          <ExternalLink className="w-4 h-4" />
                          Additional Resources
                        </div>
                        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                          {JSON.parse(chapter.resources).map((resource: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                              <Sparkles className="w-3 h-3" />
                              {resource}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
