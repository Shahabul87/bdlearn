"use client";

import { motion } from 'framer-motion';
import { PlayCircle, BookOpen, Lock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@prisma/client';
import { cn } from "@/lib/utils";

interface ChapterSectionProps {
  section: Section;
}

export const ChapterSection = ({ section }: ChapterSectionProps) => {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className={cn(
        "flex justify-between items-center p-3 rounded-lg",
        "bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50/80 dark:hover:bg-gray-800 transition-colors duration-200"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
          {section.type === 'Video' ? (
            <PlayCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          ) : (
            <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          )}
        </div>
        
        <div>
          <Link 
            href={`/${section.id}`}
            className="font-medium tracking-tight text-slate-900 dark:text-slate-50 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            {section.title}
          </Link>
          {section.type && (
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 tracking-tight">
              <span className="text-indigo-600/80 dark:text-indigo-400/80">{section.type}</span>
              <span className="mx-2 text-slate-400 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-slate-500">{section.duration || 'Duration varies'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {section.isPreview ? (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
            Preview
          </span>
        ) : (
          <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
        
        {section.completionStatus === 'Completed' && (
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        )}
      </div>
    </motion.div>
  );
}; 