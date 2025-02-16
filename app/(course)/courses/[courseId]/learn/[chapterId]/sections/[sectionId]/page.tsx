import { SectionContent } from "@/app/(course)/courses/[courseId]/learn/_components/section-content";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { currentUser } from "@/lib/auth";

interface SectionPageProps {
  params: {
    courseId: string;
    chapterId: string;
    sectionId: string;
  };
}

const SectionPage = async ({ params }: SectionPageProps) => {
  const user = await currentUser();
  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
    },
    include: {
      chapter: {
        include: {
          sections: {
            orderBy: {
              position: 'asc'
            }
          }
        }
      },
      // Include all related content
      videos: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      blogs: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      articles: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      notes: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      codeExplanations: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      userProgress: {
        where: {
          sectionId: params.sectionId
        }
      }
    }
  });

  if (!section) {
    return redirect(`/courses/${params.courseId}`);
  }
  console.log(section);
  // Get the current section index for navigation
  const currentSectionIndex = section.chapter.sections.findIndex(
    (s) => s.id === section.id
  );


  const nextSection = section.chapter.sections[currentSectionIndex + 1];
  const prevSection = section.chapter.sections[currentSectionIndex - 1];

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <HeaderAfterLogin user={user} />
      <SectionContent
        courseId={params.courseId}
        chapterId={params.chapterId}
        section={section}
        nextSection={nextSection}
        prevSection={prevSection}
      />
    </>
  );
};

export default SectionPage; 