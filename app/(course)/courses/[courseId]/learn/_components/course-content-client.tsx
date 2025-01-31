"use client";

import { Course, Chapter, Section } from "@prisma/client";
import { Suspense } from "react";
import { CourseContent } from "./course-content";

interface CourseContentClientProps {
  course: Course & {
    chapters: (Chapter & {
      sections: Section[];
    })[];
  };
  chapters: (Chapter & {
    sections: Section[];
  })[];
  activeContent: {
    type: string;
    id: string | null;
  };
  sectionData: any;
}

export function CourseContentClient({ course, chapters, activeContent, sectionData }: CourseContentClientProps) {
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    }>
      <CourseContent
        course={course}
        chapters={chapters}
        activeContent={activeContent}
        sectionData={sectionData}
      />
    </Suspense>
  );
} 