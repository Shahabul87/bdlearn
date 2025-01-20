"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Carousel, Card } from "@/components/cardscarousel/cards-carousel";
import { Chapter, Section } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Clock, ChevronRight, Layers } from "lucide-react";

interface CourseContentProps {
  chapters: (Chapter & {
    sections: Section[];
  })[] | undefined;
}

// Add an array of gradient colors for different chapters
const chapterGradients = [
  "from-purple-500/20 to-purple-900/20 border-purple-500/30",
  "from-blue-500/20 to-blue-900/20 border-blue-500/30",
  "from-cyan-500/20 to-cyan-900/20 border-cyan-500/30",
  "from-emerald-500/20 to-emerald-900/20 border-emerald-500/30",
  "from-rose-500/20 to-rose-900/20 border-rose-500/30",
  "from-amber-500/20 to-amber-900/20 border-amber-500/30",
];

export const CourseCardsCarousel: React.FC<CourseContentProps> = ({ chapters }) => {
  const [selectedChapter, setSelectedChapter] = useState<(Chapter & { sections: Section[] }) | null>(null);

  if (!chapters) return null;

  const cards = chapters.map((chapter, index) => (
    <div 
      key={chapter.id} 
      onClick={() => setSelectedChapter(chapter)}
      className="w-[400px] h-[500px] cursor-pointer"
    >
      <div className={`relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${chapterGradients[index % chapterGradients.length]} border backdrop-blur-sm shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
        <div className="p-6">
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
      <div className="container w-full h-full py-5">
        <div className="max-w-[1400px] mx-auto">
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
          <DummyContent description={chapter.description} sections={chapter.sections} />
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
    "text-purple-400 bg-purple-500/20 border-purple-500/30",
    "text-blue-400 bg-blue-500/20 border-blue-500/30",
    "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
    "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
    "text-rose-400 bg-rose-500/20 border-rose-500/30",
    "text-amber-400 bg-amber-500/20 border-amber-500/30",
  ];

  const currentColor = colors[colorIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Chapter Number Badge */}
      <div className="mb-6">
        <span className={`px-4 py-2 rounded-full text-sm font-medium border ${currentColor}`}>
          <Layers className="w-4 h-4 inline-block mr-2" />
          {sectionCount} Sections
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-3xl mb-4 text-white/90 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/70 line-clamp-4 text-base flex-grow leading-relaxed">
        {cleanDescription}
      </p>

      {/* View Details Button */}
      <motion.button 
        className={`mt-6 px-6 py-3 rounded-xl font-medium text-base
                   transition-all duration-300 flex items-center justify-center gap-2
                   group border ${currentColor}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Chapter Details
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </motion.button>

      {/* Additional Info */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-white/60">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Multiple Lessons</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
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
}

const DummyContent: React.FC<DummyContentProps> = ({ description, sections }) => {
  // Remove all HTML tags and replace HTML entities like &nbsp;
  const cleanDescription = description
    ? description
        .replace(/<[^>]*>/g, "")    // Remove all HTML tags
        .replace(/&nbsp;/g, " ")     // Replace &nbsp; with a space
    : "No description available for this chapter.";

  return (
    <div>
      {/* Display the chapter description */}
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-6 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            Description:
          </span>{" "}
          {cleanDescription}
        </p>
      </div>

      {/* Display list of sections as bullet points without duration */}
      <div className="bg-[#EDEDED] dark:bg-neutral-700 p-4 md:p-6 rounded-3xl">
        <h3 className="text-neutral-800 dark:text-neutral-100 text-lg font-semibold mb-3">Sections:</h3>
        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400">
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <span className="text-neutral-800 dark:text-neutral-100 font-semibold">
                {section.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Dummy data array for the cards (you can replace this with actual data or remove it if it's no longer needed)
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent description="AI course description" sections={[]} />, // Example usage
  },
  // Add more items as needed
];

