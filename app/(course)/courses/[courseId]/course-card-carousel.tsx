"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Carousel, Card } from "@/components/cardscarousel/cards-carousel";
import { Chapter, Section } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Clock, ChevronRight, Layers, PlayCircle, CheckCircle2 } from "lucide-react";
import parse from 'html-react-parser';

interface CourseContentProps {
  chapters: (Chapter & {
    sections: Section[];
    learningOutcomes: string | null;
  })[] | undefined;
}

// Update the gradient colors array for better light mode contrast
const chapterGradients = [
  "from-purple-500/10 to-purple-900/10 dark:from-purple-500/20 dark:to-purple-900/20 border-purple-500/20 dark:border-purple-500/30",
  "from-blue-500/10 to-blue-900/10 dark:from-blue-500/20 dark:to-blue-900/20 border-blue-500/20 dark:border-blue-500/30",
  "from-cyan-500/10 to-cyan-900/10 dark:from-cyan-500/20 dark:to-cyan-900/20 border-cyan-500/20 dark:border-cyan-500/30",
  "from-emerald-500/10 to-emerald-900/10 dark:from-emerald-500/20 dark:to-emerald-900/20 border-emerald-500/20 dark:border-emerald-500/30",
  "from-rose-500/10 to-rose-900/10 dark:from-rose-500/20 dark:to-rose-900/20 border-rose-500/20 dark:border-rose-500/30",
  "from-amber-500/10 to-amber-900/10 dark:from-amber-500/20 dark:to-amber-900/20 border-amber-500/20 dark:border-amber-500/30",
];

export const CourseCardsCarousel: React.FC<CourseContentProps> = ({ chapters }) => {
  const [selectedChapter, setSelectedChapter] = useState<(Chapter & { sections: Section[] }) | null>(null);

  if (!chapters) return null;

  const cards = chapters.map((chapter, index) => (
    <div 
      key={chapter.id} 
      onClick={() => setSelectedChapter(chapter)}
      className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[400px] sm:h-[450px] md:h-[500px] cursor-pointer"
    >
      <div className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${chapterGradients[index % chapterGradients.length]} border backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
        <div className="p-4 sm:p-6">
          <ChapterPreview 
            title={chapter.title} 
            description={chapter.description}
            sectionCount={chapter.sections.length}
            colorIndex={index % chapterGradients.length}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div className="relative">
      <div className="container w-full h-full py-3 sm:py-5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Carousel items={cards} />
        </div>
      </div>

      <AnimatePresence>
        {selectedChapter && (
          <ChapterModal 
            chapter={selectedChapter} 
            onClose={() => setSelectedChapter(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ChapterModal = ({ chapter, onClose }: { 
  chapter: Chapter & { sections: Section[] }, 
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {chapter.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <DummyContent description={chapter.description} sections={chapter.sections} chapter={chapter} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Updated Preview component for the card
const ChapterPreview: React.FC<{ 
  title: string; 
  description: string | null;
  sectionCount: number;
  colorIndex: number;
}> = ({ title, description, sectionCount, colorIndex }) => {
  const cleanDescription = description
    ? description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
    : "No description available.";

  const colors = [
    "text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/20 dark:border-purple-500/30",
    "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20 dark:border-blue-500/30",
    "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/20 dark:border-cyan-500/30",
    "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20 dark:border-emerald-500/30",
    "text-rose-600 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/20 dark:border-rose-500/30",
    "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/20 dark:border-amber-500/30",
  ];

  const currentColor = colors[colorIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Chapter Number Badge */}
      <div className="mb-4 sm:mb-6">
        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${currentColor}`}>
          <Layers className="w-3 h-3 sm:w-4 sm:h-4 inline-block mr-1.5 sm:mr-2" />
          {sectionCount} Sections
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2 sm:mb-4 text-gray-800 dark:text-white/90 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-white/70 line-clamp-3 sm:line-clamp-4 flex-grow leading-relaxed">
        {cleanDescription}
      </p>

      {/* View Details Button */}
      <motion.button 
        className={`mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium
                   transition-all duration-300 flex items-center justify-center gap-2
                   group border ${currentColor}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Chapter Details
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

      {/* Additional Info */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-400/10 dark:border-white/10 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-white/60">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Multiple Lessons</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Interactive Content</span>
        </div>
      </div>
    </div>
  );
};

// Existing DummyContent component remains the same
interface DummyContentProps {
  description: string | null;
  sections: Section[];
  chapter: Chapter & {
    sections: Section[];
    learningOutcomes: string | null;
  };
}

const DummyContent: React.FC<DummyContentProps> = ({ description, sections, chapter }) => {
  return (
    <div>
      {/* Display the chapter description */}
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-6 rounded-3xl mb-4">
        <div className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto space-y-4">
          <span className="font-bold text-neutral-700 dark:text-neutral-200 block mb-2">
            Description:
          </span>
          {description ? (
            <div className="prose dark:prose-invert max-w-none">
              {parse(description)}
            </div>
          ) : (
            "No description available for this chapter."
          )}
        </div>
      </div>

      {/* Display list of sections as bullet points without duration */}
      <div className="bg-[#EDEDED] dark:bg-neutral-700 p-4 md:p-6 rounded-3xl">
        <h3 className="text-neutral-800 dark:text-neutral-100 text-lg font-semibold mb-3">Sections:</h3>
        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <span className="text-neutral-800 dark:text-neutral-100 font-semibold lg:text-[17px]">
                {section.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* New Learning Outcomes Section */}
      {chapter.learningOutcomes && (
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-purple-50/50 to-rose-50/50 dark:from-purple-900/10 dark:to-rose-900/10 rounded-2xl p-6">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-purple-500" />
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-rose-600 dark:from-purple-400 dark:to-rose-400 text-transparent bg-clip-text">
                Chapter Learning Outcomes
              </span>
            </h4>
            <ul className="list-disc space-y-4 pl-8">
              {chapter.learningOutcomes
                .split(/(?<=[.!?])\s+/)  // Split on sentence endings
                .filter(Boolean)  // Remove empty strings
                .map((outcome: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-[15px] leading-[1.8] tracking-wide lg:text-[17px] text-gray-700 dark:text-gray-200 marker:text-purple-500 pl-2 py-2 break-normal hyphens-none prose dark:prose-invert"
                  >
                    {parse(outcome.trim())}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

