import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CourseContentWrapper } from "./_components/course-content-wrapper";

const CourseLearnPage = async ({
  params,
  searchParams
}: {
  params: { courseId: string }
  searchParams: { type?: string; sectionId?: string }
}) => {
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

  return (
    <div className="flex-1">
      <CourseContentWrapper course={course} />
    </div>
  );
};

export default CourseLearnPage; 