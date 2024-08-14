"use client";

import { useState, useCallback } from "react";
import { Chapter, Course, Section } from "@prisma/client";
import CourseContent from "./course-content";
import React from "react";

interface ChaptersFormProps {
  course: Course & { chapters: (Chapter & { sections: Section[] })[] };
}

const SectionSidebarComponent = ({ course }: ChaptersFormProps) => {
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const toggleSections = useCallback((chapterId: string) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  }, []);

  const handleSectionClick = useCallback((sectionId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Stop the event from propagating to the parent div
    setSelectedSectionId(sectionId);
  }, []);

  return (
    <>
      <CourseContent
        course={course}
        selectedSectionId={selectedSectionId}
        handleSectionClick={handleSectionClick}
      />
    </>
  );
};

const SectionSidebar = React.memo(SectionSidebarComponent);
SectionSidebar.displayName = "SectionSidebar";

export { SectionSidebar };




 // return (
  //   <div className="course-chapters p-4 ">
  //     {course.chapters.map((chapter) => (
  //       <div key={chapter.id} className="chapter mb-4">
  //         <div
  //           className="chapter-title flex items-center cursor-pointer"
  //           onClick={() => toggleSections(chapter.id)}
  //         >
  //           {visibleSections[chapter.id] ? (
  //             <ChevronUp className="h-4 w-4 mr-2 text-white" />
  //           ) : (
  //             <ChevronDown className="h-4 w-4 mr-2 text-white" />
  //           )}
  //           <h2 className="font-semibold text-yellow-500">{chapter.title}</h2>
  //         </div>
  //         <Separator className ="mt-2 mb-1"/>
  //         {visibleSections[chapter.id] && (
  //           <div className="chapter-sections ml-6 mt-2 pl-3">
  //             {chapter.sections.map((section) => (
  //               <Link href={`/courses/${course.id}/chapters/sections/${section.id}`} key={section.id}>
                 
  //                <span
  //                   className={`mb-2 flex items-center cursor-pointer pl-1 ${
  //                     selectedSectionId === section.id ? "bg-gray-200" : ""
  //                   }`}
  //                   onClick={(event) => handleSectionClick(section.id, event)}
  //                 >
  //                   <span className="inline-block w-2 h-2 mr-2 bg-white rounded-full"></span>
  //                   <h3 className="hover:text-blue-500 hover:underline text-white">{section.title}</h3>
  //                 </span>
  //                 <Separator className="mt-2 mb-1" />
  //               </Link>
  //             ))}
  //           </div> 
  //         )}
  //       </div>
  //     ))}
  //   </div>
  // );

