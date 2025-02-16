import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const CourseLearningPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/auth/login");
  }

  // Check if user is enrolled
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: params.courseId
      }
    },
    include: {
      course: {
        include: {
          chapters: {
            include: {
              userProgress: {
                where: {
                  userId: user.id
                }
              }
            },
            orderBy: {
              position: 'asc'
            }
          }
        }
      }
    }
  });

  if (!enrollment) {
    return redirect(`/courses/${params.courseId}`);
  }

  // Find the first incomplete chapter or default to first chapter
  const firstChapter = enrollment.course.chapters[0];
  const nextChapter = enrollment.course.chapters.find(chapter => 
    !chapter.userProgress?.[0]?.isCompleted
  ) || firstChapter;

  if (!nextChapter) {
    return redirect(`/courses/${params.courseId}`);
  }

  // Redirect to the specific chapter learning page
  return redirect(`/courses/${params.courseId}/learn/${nextChapter.id}`);
};

export default CourseLearningPage; 