"use client";

import { Course, Chapter } from "@prisma/client";
import { SectionContent } from "./section-content";
import { cn } from "@/lib/utils";

interface CourseContentProps {
  course: any;
  chapters: any[];
  activeContent: {
    type: string;
    id: string | null;
  };
}

export const CourseContent = ({
  course,
  chapters,
  activeContent
}: CourseContentProps) => {
  const activeSection = activeContent.type === "section" && activeContent.id
    ? chapters.flatMap(chapter => 
        chapter.sections.map((section: { 
          id: string;
          title: string;
          chapterTitle?: string;
          courseTitle?: string;
        }) => ({
          ...section,
          chapterTitle: chapter.title,
          courseTitle: course.title
        }))
      ).find(section => section.id === activeContent.id)
    : null;

  return (
    <div className={cn(
      "h-full w-full overflow-y-auto",
      "px-5 mt-10 sm:mt-0 sm:px-6 lg:px-8",
      "py-4 sm:py-6 lg:py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto",
        "space-y-4 sm:space-y-6 lg:space-y-8"
      )}>
        {activeContent.type === "overview" ? (
          <div className="space-y-4 sm:space-y-6">
            <div className={cn(
              "p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl",
              "bg-gradient-to-br from-purple-50 to-pink-50",
              "dark:from-purple-900/10 dark:to-pink-900/10",
              "border border-purple-100/50 dark:border-purple-800/20"
            )}>
              <h1 className={cn(
                "text-2xl sm:text-3xl lg:text-4xl font-bold",
                "text-gray-900 dark:text-white",
                "mb-2 sm:mb-4"
              )}>
                Welcome to {course.title}
              </h1>
              <p className={cn(
                "text-base sm:text-lg",
                "text-gray-600 dark:text-gray-300"
              )}>
                {course.description}
              </p>
            </div>

            <div className={cn(
              "p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl",
              "bg-white dark:bg-gray-800/50",
              "border border-gray-200/50 dark:border-gray-700/50"
            )}>
              <h2 className={cn(
                "text-xl sm:text-2xl font-semibold",
                "text-gray-900 dark:text-white",
                "mb-4 sm:mb-6"
              )}>
                Course Overview
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className={cn(
                    "flex items-start gap-3",
                    "p-3 sm:p-4 rounded-lg sm:rounded-xl",
                    "bg-gray-50 dark:bg-gray-800/50",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "transition-colors duration-200"
                  )}>
                    <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0" />
                    <div>
                      <h3 className={cn(
                        "font-medium",
                        "text-gray-900 dark:text-white",
                        "text-sm sm:text-base"
                      )}>
                        {chapter.title}
                      </h3>
                      <p className={cn(
                        "text-xs sm:text-sm",
                        "text-gray-500 dark:text-gray-400",
                        "mt-1"
                      )}>
                        {chapter.sections.length} sections
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeContent.type === "section" && activeSection ? (
          <SectionContent 
            sectionId={activeContent.id!}
            initialData={activeSection}
          />
        ) : null}
      </div>
    </div>
  );
}; 