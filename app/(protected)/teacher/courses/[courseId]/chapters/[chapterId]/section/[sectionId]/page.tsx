import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner"

// import { ChapterActions } from "./_components/chapter-actions";
// import { ListChecks } from "lucide-react";

import { SectionTitleForm } from "./_components/section-title-form";
import { SectionAccessForm } from "./_components/section-access-form";
import { SectionYoutubeVideoForm } from "./_components/section-video-form";
import { SectionActions } from "./_components/sections-actions";

const SectionIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string; sectionId:string }
}) => {
    const user = await currentUser();

    if (!user?.id) {
        return redirect("/");
      }

  //const userId = user?.id;
  


  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      chapterId: params.chapterId
    },
  });


  if (!section) {
    return redirect("/")
  }

  const requiredFields = [
    section.title,
    section.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This section is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between bg-red-400">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
              className="flex items-center text-xl hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter page
            </Link>
            <div className="flex items-center justify-between w-full bg-blue-500 rounded-md p-4">
                <div className="flex flex-col gap-y-2 ">
                  <h1 className="text-2xl font-medium">
                    Section Creation
                  </h1>
                  <span className="text-sm text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                <SectionActions
                  disabled={!isComplete}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  sectionId={params.sectionId}
                  isPublished={section.isPublished}
                />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mt-16 bg-blue-500 p-4 rounded-md">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your chapter section
                </h2>
              </div>
              <SectionTitleForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
        
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <SectionAccessForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add Sections Video Link
              </h2>
            </div>
            <SectionYoutubeVideoForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
            />
          </div>
        </div>
      </div>
    </>
   );
}
 
export default SectionIdPage;