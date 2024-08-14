
import { Chapter, Course, Section } from "@prisma/client";
import Chapters from "./chapter";

interface ChaptersFormProps {
    course: Course & { chapters: (Chapter & { sections: Section[] })[] };
    selectedSectionId: string|null;
    handleSectionClick: (sectionId: string, event: React.MouseEvent) => void;
  }
const CourseContent = ({ course, selectedSectionId, handleSectionClick }: ChaptersFormProps) => {
    return (
      <div className="p-4">
        {course.chapters.map((chapter) => (
          <Chapters
            key={chapter.id}
            chapter={chapter}
            course={course}
            selectedSectionId={selectedSectionId}
            handleSectionClick={handleSectionClick}
          />
        ))}
      </div>
    );
  };
  
  export default CourseContent;