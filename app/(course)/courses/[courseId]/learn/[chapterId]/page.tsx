import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CourseNavbar } from "../_components/course-navbar";
import { CourseSidebar } from "../_components/course-sidebar";
import { ChapterContent } from "../_components/course-content";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { getCourse } from "@/actions/get-course";

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterPageProps) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/auth/login");
  }

  // Verify enrollment
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: params.courseId,
      }
    }
  });

  if (!enrollment) {
    return redirect(`/courses/${params.courseId}`);
  }

  // Fetch course with chapters and sections using the action
  const { course, error } = await getCourse(params.courseId);

  if (error) {
    console.error("[COURSE_FETCH_ERROR]", error);
    return redirect("/error");
  }

  if (!course || !course.chapters.length) {
    return redirect("/");
  }

  const chapter = course.chapters.find(chapter => chapter.id === params.chapterId);

  if (!chapter) {
    return redirect(`/courses/${params.courseId}`);
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <div className="h-full">
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50 mt-[70px]">
          <CourseSidebar
            course={course}
            currentChapterId={params.chapterId}
          />
        </div>
        <div className="md:ml-80 h-full">
          <div className="h-full flex flex-col">
            <div className="h-full flex flex-col">
              <main className="md:pl-75 pt-[80px] h-full">
                <ChapterContent 
                  chapter={chapter}
                  course={course}
                  userId={user.id}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage; 