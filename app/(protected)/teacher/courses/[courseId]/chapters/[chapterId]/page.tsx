import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";


import { ChapterActions } from "./_components/chapter-actions";
import { ChapterLearningOutcomeForm } from "./_components/chapter-learning-outcome-form";
import { ChaptersSectionForm } from "./_components/chapter-section-form";
import { ListChecks } from "lucide-react";
import { ChaptersForm } from "../../_components/chapters-form";


const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
    const user = await currentUser();

    if (!user?.id) {
        return redirect("/");
      }

  //const userId = user?.id;
  


  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include:{
      sections:{
        orderBy:{
          position:"asc"
        }
      }
    }
  });

  //console.log(chapter)

  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.learningOutcomes,
    chapter.sections.some(section => section.isPublished),
  ];



  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  //const isComplete = requiredFields.every(Boolean);
  const isComplete = requiredFields.filter(item=>item==true)
 

  return (
    <>
        {!user? (
                            <>
                                <div className="">
                                <Header />
                                </div>
                        </> ):
                        (
                            <>
                            <HeaderAfterLogin />
                            </>
               )}
    <SidebarDemo>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="px-2">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <Link
                href={`/teacher/courses/${params.courseId}`}
                className="flex items-center text-xl text-white/90 hover:opacity-75 transition mb-6 "
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to course setup
              </Link>
              <div className="flex items-center justify-between w-full bg-gray-700 p-2 px-10 border border-[#94a3b8] rounded-md">
                  <div className="flex flex-col gap-y-2 ">
                    <h1 className="text-2xl font-medium text-white">
                      Chapter Creation
                    </h1>
                    <span className="text-sm text-cyan-500">
                      Complete all fields {completionText}
                    </span>
                  </div>
                  <ChapterActions
                    disabled={!isComplete}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    isPublished={chapter.isPublished}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-16 bg-gray-800 p-4 rounded-md">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl text-white/90 font-semibold">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterLearningOutcomeForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl text-white/90 font-semibold">
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl text-white/90 font-semibold">
                Add Sections
              </h2>
            </div>
            {/* <ChapterYoutubeVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            /> */}
            <ChaptersSectionForm 
              chapter={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
      </SidebarDemo>
    </>
   );
}
 
export default ChapterIdPage;