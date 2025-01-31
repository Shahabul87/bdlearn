"use client";

import { CourseTabs } from "./course-tab";
import { Chapter } from "@prisma/client";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

// Update color schemes for better contrast in both modes
const cardThemes = [
  {
    gradient: "from-purple-100 to-purple-50 dark:from-purple-950 dark:to-purple-900",
    iconBg: "bg-purple-500/5 dark:bg-purple-500/10",
    iconBorder: "border-purple-500/10 dark:border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    titleGradient: "from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400",
  },
  {
    gradient: "from-blue-100 to-blue-50 dark:from-blue-950 dark:to-blue-900",
    iconBg: "bg-blue-500/5 dark:bg-blue-500/10",
    iconBorder: "border-blue-500/10 dark:border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleGradient: "from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400",
  },
  {
    gradient: "from-emerald-100 to-emerald-50 dark:from-emerald-950 dark:to-emerald-900",
    iconBg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    iconBorder: "border-emerald-500/10 dark:border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    titleGradient: "from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400",
  },
  {
    gradient: "from-rose-100 to-rose-50 dark:from-rose-950 dark:to-rose-900",
    iconBg: "bg-rose-500/5 dark:bg-rose-500/10",
    iconBorder: "border-rose-500/10 dark:border-rose-500/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    titleGradient: "from-rose-600 via-pink-600 to-purple-600 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400",
  },
];

interface CourseTabsDemoProps {
  chapters: Chapter[];
}

export function CourseTabsDemo({ chapters }: CourseTabsDemoProps) {
  const tabs = chapters.map((chapter, index) => {
    const theme = cardThemes[index % cardThemes.length];
    
    return {
      title: `Chapter ${index + 1}`,
      value: chapter.title,
      content: (
        <div className={`w-full overflow-hidden relative h-full rounded-2xl p-8 bg-gradient-to-br ${theme.gradient} border border-gray-200/50 dark:border-gray-800/50 shadow-lg dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-xl`}>
          {/* Darker overlay - only in dark mode */}
          <div className="absolute inset-0 bg-black/0 dark:bg-black/40 backdrop-blur-xl" />
          
          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Chapter Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-12 w-12 rounded-full ${theme.iconBg} flex items-center justify-center border ${theme.iconBorder}`}>
                <BookOpen className={`h-6 w-6 ${theme.iconColor}`} />
              </div>
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${theme.titleGradient} text-transparent bg-clip-text tracking-tight`}>
                {chapter.title}
              </h2>
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-4 flex items-center gap-2">
                <CheckCircle2 className={`h-5 w-5 ${theme.iconColor}`} />
                Learning Outcomes
              </h3>
              <LearningOutcomes 
                outcomes={chapter.learningOutcomes} 
                accentColor={theme.iconColor}
                borderColor={theme.iconBorder}
                bgColor={theme.iconBg}
              />
            </div>
          </div>

          {/* Decorative Elements */}
          <div className={`absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br opacity-10 dark:opacity-5 blur-3xl rounded-full ${theme.gradient}`} />
          <div className={`absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr opacity-10 dark:opacity-5 blur-3xl rounded-full ${theme.gradient}`} />
        </div>
      ),
    };
  });

  return (
    <div className="h-[20rem] md:h-[35rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
      <CourseTabs tabs={tabs} />
    </div>
  );
}

// Update LearningOutcomes component for better contrast
const LearningOutcomes = ({ 
  outcomes,
  accentColor,
  borderColor,
  bgColor
}: { 
  outcomes?: string | null;
  accentColor: string;
  borderColor: string;
  bgColor: string;
}) => {
  if (!outcomes) return (
    <p className="text-gray-500 dark:text-white/60 italic">No specific learning outcomes provided.</p>
  );

  const points = outcomes.includes("<p>")
    ? outcomes.match(/<p>(.*?)<\/p>/g)?.map((item) => item.replace(/<\/?p>/g, "").trim())
    : outcomes.split(".").map((item) => item.trim()).filter(Boolean);

  return (
    <motion.ul 
      className="grid gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {points?.map((point, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-3 group"
        >
          <span className={`w-6 h-6 rounded-full ${bgColor} border ${borderColor} flex items-center justify-center flex-shrink-0 mt-1`}>
            <span className={`text-sm font-medium ${accentColor}`}>{index + 1}</span>
          </span>
          <p className="text-lg text-gray-700 dark:text-white/80 leading-relaxed font-medium tracking-wide group-hover:text-gray-900 dark:group-hover:text-white/90 transition-colors duration-300">
            {point}
          </p>
        </motion.li>
      )) || (
        <li className="text-gray-500 dark:text-white/60 italic">
          No specific learning outcomes available.
        </li>
      )}
    </motion.ul>
  );
};

