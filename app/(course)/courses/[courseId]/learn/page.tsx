import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CourseContentWrapper } from "./_components/course-content-wrapper";

interface CoursePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    type?: string;
    sectionId?: string;
  };
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  // Check if user is enrolled
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user?.id || '',
        courseId: params.courseId,
      },
    },
  });

  if (!enrollment) {
    return redirect(`/courses/${params.courseId}`);
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          sections: {
            where: {
              isPublished: true,
            },
            include: {
              videos: true,
              blogs: true,
              articles: true,
              notes: true,
              codeExplanations: {
                select: {
                  id: true,
                  heading: true,
                  code: true,
                  explanation: true,
                }
              },
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  // Pre-fetch section data if needed
  let sectionData = null;
  if (searchParams.type === 'section' && searchParams.sectionId) {
    sectionData = await db.section.findUnique({
      where: { id: searchParams.sectionId },
      include: {
        chapter: {
          include: {
            course: true
          }
        },
        videos: true,
        articles: true,
        codeExplanations: true,
      }
    });
  }

  return (
    <div className="flex-1">
      <CourseContentWrapper 
        course={course} 
        initialSectionData={sectionData}
        initialType={searchParams.type || 'overview'}
        initialSectionId={searchParams.sectionId || null}
      />
    </div>
  );
} 