"use client";

import {ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Chapter, Course, Section } from "@prisma/client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface ChaptersFormProps {
  course: Course & { chapters: (Chapter & { sections: Section[] })[] };
}

export const ChaptersFormCourseHome = ({ course }: ChaptersFormProps) => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);


  const toggleSections = (chapterId: string) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  };


  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
  };

  return (
    <div className="course-chapters p-4 ">
      {course.chapters.map((chapter) => (
        <div key={chapter.id} className="chapter mb-4">
          <div
            className="chapter-title flex items-center cursor-pointer"
            onClick={() => toggleSections(chapter.id)}
          >
            {visibleSections[chapter.id] ? (
              <ChevronUp className="h-4 w-4 mr-2" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-2" />
            )}
            <h2 className="font-semibold text-slate-600">{chapter.title}</h2>
          </div>
          <Separator className ="mt-2 mb-1"/>
          {visibleSections[chapter.id] && (
            <div className="chapter-sections ml-6 mt-2">
              {chapter.sections.map((section) => (
                <Link href={`/courses/${course.id}/chapters/sections/${section.id}`} key={section.id}>
                 <div
                    className={`mb-2 flex items-center cursor-pointer ${
                      selectedSectionId === section.id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleSectionClick(section.id)}
                  >
                    <h3 className="hover:text-blue-500 hover:underline">{section.title}</h3>
                  </div>
                  <Separator className="mt-2 mb-1" />
                </Link>
              ))}
            </div> 
          )}
        </div>
      ))}
    </div>
  );;
};
