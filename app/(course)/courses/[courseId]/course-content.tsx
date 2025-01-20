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

  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'text-emerald-400';
      case 'intermediate': return 'text-amber-400';
      case 'advanced': return 'text-rose-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 p-6 shadow-xl rounded-2xl backdrop-blur-sm">
      {/* Summary Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-4 border-b border-gray-700/50">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
            Course Structure
          </h2>
          <div className="flex items-center gap-4 text-gray-400">
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
          className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-750 
                     text-gray-300 flex items-center gap-2 transition-all duration-200"
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
      <div className="space-y-4">
        {chapters?.map((chapter, index) => (
          <motion.div 
            key={chapter.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-800/50 rounded-xl overflow-hidden bg-gray-900/50"
          >
            {/* Chapter Header */}
            <motion.div
              className={cn(
                "flex justify-between items-center p-4 cursor-pointer transition-colors duration-200",
                "hover:bg-gray-800/50"
              )}
              onClick={() => toggleChapter(index)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-xl text-gray-100">
                    {chapter.title}
                  </h3>
                  {chapter.status === "Published" && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      Published
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{chapter.estimatedTime || 'Duration varies'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span className={getDifficultyColor(chapter.difficulty)}>
                      {chapter.difficulty || 'All Levels'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{chapter.sections?.length || 0} sections</span>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: (expandedChapter === index || expandAll) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
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
                  className="border-t border-gray-800"
                >
                  <div className="p-4 space-y-2">
                    {chapter.prerequisites && (
                      <div className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <div className="flex items-center gap-2 mb-1 font-medium">
                          <Info className="w-4 h-4" />
                          Prerequisites
                        </div>
                        <p className="text-sm text-blue-300">{chapter.prerequisites}</p>
                      </div>
                    )}
                    
                    {chapter.sections?.map((section) => (
                      <motion.div
                        key={section.id}
                        whileHover={{ x: 4 }}
                        className={cn(
                          "flex justify-between items-center p-3 rounded-lg",
                          "bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-800">
                            {section.type === 'Video' ? (
                              <PlayCircle className="w-5 h-5 text-blue-400" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-emerald-400" />
                            )}
                          </div>
                          
                          <div>
                            <Link 
                              href={`/${section.id}`}
                              className="font-medium text-gray-200 hover:text-white transition-colors duration-200"
                            >
                              {section.title}
                            </Link>
                            {section.type && (
                              <div className="text-sm text-gray-400">
                                {section.type} • {section.duration || 'Duration varies'}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {section.isPreview ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                              Preview
                            </span>
                          ) : (
                            <Lock className="w-4 h-4 text-gray-500" />
                          )}
                          
                          {section.completionStatus === 'Completed' && (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {chapter.resources && (
                    <div className="px-4 pb-4">
                      <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                        <div className="flex items-center gap-2 mb-2 text-gray-300">
                          <ExternalLink className="w-4 h-4" />
                          Additional Resources
                        </div>
                        <div className="text-sm text-gray-400">
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
