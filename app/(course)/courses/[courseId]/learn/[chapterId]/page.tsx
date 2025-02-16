import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { CourseNavbar } from "../_components/course-navbar";
import { CourseSidebar } from "../_components/course-sidebar";
import { ChapterContent } from "../_components/course-content";
import ConditionalHeader from "@/app/(homepage)/user-header";

interface ChapterPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
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

  // Fetch course with chapters and sections
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
      reviews: true,
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        include: {
          sections: true,
        },
      },
    },
  });

  //console.log("Chapter sections:", course?.chapters.find(c => c.id === params.chapterId)?.sections);

  if (!course || !course.chapters.length) {
    return redirect("/");
  }
  //console.log(course);

  const chapter = course.chapters.find(chapter => chapter.id === params.chapterId);

  if (!chapter) {
    return redirect(`/courses/${params.courseId}`);
  }

  return (
    <>
      <ConditionalHeader user={user} />
      <div className="h-full mt-20">
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar 
            course={course}
            currentChapterId={params.chapterId}
          />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
          <ChapterContent 
            chapter={chapter}
            course={course}
            userId={user.id}
          />
        </main>
      </div>
    </>
  );
} 