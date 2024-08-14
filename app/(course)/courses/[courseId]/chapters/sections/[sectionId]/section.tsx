import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { Section } from "@prisma/client";


interface ChaptersFormProps {
    section:Section;
    courseId: string;
    selectedSectionId: string|null;
    handleSectionClick: (sectionId: string, event: React.MouseEvent) => void;
  }

const Sections = ({ section, courseId, selectedSectionId, handleSectionClick }: ChaptersFormProps) => {
  return (
    <Link href={`/courses/${courseId}/chapters/sections/${section.id}`}>
      <span
        className={`mb-2 flex items-center cursor-pointer pl-1 ${
          selectedSectionId === section.id ? "bg-gray-200" : ""
        }`}
        onClick={(event) => handleSectionClick(section.id, event)}
      >
        <span className="inline-block w-2 h-2 mr-2 bg-white rounded-full"></span>
        <h3 className="hover:text-blue-500 hover:underline text-white">{section.title}</h3>
      </span>
      <Separator className="mt-2 mb-1" />
    </Link>
  );
};

export default Sections;