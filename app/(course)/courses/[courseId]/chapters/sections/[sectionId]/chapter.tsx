"use client"
import { useState } from 'react';
import Link from 'next/link';
import { MinusCircle, PlusCircle, ChevronDown,ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import Sections from './section';
import { Chapter, Course, Section } from "@prisma/client";
import { useCallback } from 'react';

interface ChaptersFormProps {
    chapter: Chapter & { sections: Section[] };
    course: Course & { chapters: (Chapter & { sections: Section[] })[] };
    selectedSectionId: string|null;
    handleSectionClick: (sectionId: string, event: React.MouseEvent) => void;
  }

const Chapters = ({ chapter, course, selectedSectionId, handleSectionClick }:ChaptersFormProps) => {
  const [isVisible, setIsVisible] = useState(false);

//   const toggleSections = () => {
//     setIsVisible(!isVisible);
//   };
const toggleSections = useCallback(() => {
    setIsVisible((prevIsVisible) => !prevIsVisible);
  }, []);

  return (
    <div key={chapter.id} className="chapter mb-4">
      <div
        className="chapter-title flex items-center cursor-pointer"
        onClick={toggleSections}
      >
        {isVisible ? (
          <ChevronUp className="h-4 w-4 mr-2 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 mr-2 text-white" />
        )}
        <h2 className="font-semibold text-yellow-500">{chapter.title}</h2>
      </div>
      <Separator className="mt-2 mb-1" />
      {isVisible && (
        <div className="chapter-sections ml-6 mt-2 pl-3">
          {chapter.sections.map((section) => (
                                <Sections
                                    key={section.id}
                                    section={section}
                                    courseId={course.id}
                                    selectedSectionId={selectedSectionId}
                                    handleSectionClick={handleSectionClick}
                                />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chapters;
