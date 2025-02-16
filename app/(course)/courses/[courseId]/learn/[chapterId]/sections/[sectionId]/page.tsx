import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SectionContent } from "@/app/(course)/courses/[courseId]/learn/_components/section-content";
import { getCourse } from "@/actions/get-course";
import { getChapter } from "@/actions/get-chapter";
import { getSection } from "@/actions/get-section";
import { db } from "@/lib/db";

interface SectionPageProps {
  params: {
    courseId: string;
    chapterId: string;
    sectionId: string;
  };
}

const SectionPage = async ({ params }: SectionPageProps) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/auth/login");
  }

  // Verify enrollment (keeping this as is for access control)
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

  // Fetch course, chapter and section data using actions
  const { course, error: courseError } = await getCourse(params.courseId);
  
  if (courseError) {
    console.error("[COURSE_ERROR]", courseError);
    return redirect("/error");
  }

  const { chapter, error: chapterError } = await getChapter(params.chapterId, params.courseId);
  
  if (chapterError) {
    console.error("[CHAPTER_ERROR]", chapterError);
    return redirect("/error");
  }

  const { section, nextSection, prevSection, error: sectionError } = await getSection(
    params.sectionId,
    params.chapterId,
    params.courseId
  );

  if (sectionError) {
    console.error("[SECTION_ERROR]", sectionError);
    return redirect("/error");
  }

  if (!course || !chapter || !section) {
    return redirect("/");
  }

  return (
    <>
      <HeaderAfterLogin user={user} />
      <SectionContent
        courseId={params.courseId}
        chapterId={params.chapterId}
        section={section}
        
      />
    </>
  );
};

export default SectionPage; 