import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SectionSidebar } from "./section-sidebar";

import { Chapter, Course, Section } from "@prisma/client";

interface ChaptersFormProps {
    course: Course & { chapters: (Chapter & { sections: Section[] })[] };
  }

export const SectionMobileSidebar = ({ course }: ChaptersFormProps) => {
    return (
      <Sheet>
        <SheetTrigger>
          <Menu className="text-white" />
        </SheetTrigger>
        <SheetContent className="p-0 z-[100]" side="left">
          <SectionSidebar course={course} /> {/* Pass the course prop */}
        </SheetContent>
      </Sheet>
    );
  };