import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner"
import { SectionTitleForm } from "./_components/section-title-form";
import { SectionAccessForm } from "./_components/section-access-form";
import { SectionYoutubeVideoForm } from "./_components/section-video-form";
import { SectionActions } from "./_components/sections-actions";
import { VideoSectionForm } from "./_components/_videos/video-section";
import { BlogSectionForm } from "./_components/_blogs/blog-section";
import { GradientDivider } from "@/components/border";
import { cn } from "@/lib/utils";
import { CodeExplanationForm } from "./_components/_explanations/code-explanation-form";

const SectionIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string; sectionId:string }
}) => {
    const user = await currentUser();

    if (!user?.id) {
        return redirect("/");
      }
  

      const section = await db.section.findFirst({
        where: {
          id: params.sectionId,
          chapterId: params.chapterId,
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
          }
        },
      });

      const chapter = await db.chapter.findFirst({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        include: {
          sections: {
            orderBy: {
              position: "asc",
            },
            include: {
              videos: true,
              blogs: true,
              articles: true,
              notes: true,
              codeExplanations: true,
            },
          },
        },
      });
      

      //console.log(section)


  if (!section) {
    return redirect("/")
  }

  if (!chapter) {
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
      {!user ? (
        <div>
          <Header />
        </div>
      ) : (
        <HeaderAfterLogin user={user} />
      )}
      <SidebarDemo>
        <div className={cn(
          "min-h-screen pt-20",
          "bg-white/50 dark:bg-gray-900",
          "transition-colors duration-300"
        )}>
          {!section.isPublished && (
            <Banner
              variant="warning"
              label="This section is unpublished. It will not be visible in the course"
            />
          )}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="px-2">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <Link
                    href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
                    className={cn(
                      "inline-flex items-center mb-6",
                      "px-4 py-2 text-sm sm:text-base font-medium",
                      "bg-white/40 dark:bg-gray-800/40",
                      "hover:bg-purple-50 dark:hover:bg-purple-500/20",
                      "text-gray-900 dark:text-gray-200",
                      "rounded-lg",
                      "border border-gray-200 dark:border-gray-700/50",
                      "transition-all duration-200",
                      "backdrop-blur-sm",
                      "shadow-lg hover:shadow-purple-500/20"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to chapter page
                  </Link>

                  <div className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between",
                    "w-full p-4 sm:p-6",
                    "bg-white/40 dark:bg-gray-800/60",
                    "border border-gray-200 dark:border-gray-700/50",
                    "rounded-xl backdrop-blur-sm"
                  )}>
                    <div className="flex flex-col gap-y-2 mb-4 sm:mb-0 max-w-[300px]">
                      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
                        Section Creation
                      </h1>
                      <span className="text-sm text-cyan-600 dark:text-cyan-400 font-medium tracking-wide">
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className={cn(
                  "p-4 sm:p-6 rounded-xl",
                  "bg-white/40 dark:bg-gray-800/40",
                  "border border-gray-200 dark:border-gray-700/50",
                  "backdrop-blur-sm"
                )}>
                  <div className="flex items-center gap-x-3 mb-4">
                    <div className={cn(
                      "p-2 w-fit rounded-lg",
                      "bg-purple-50 dark:bg-purple-500/10"
                    )}>
                      <LayoutDashboard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      Customize Your Chapter Section
                    </h2>
                  </div>
                  <SectionTitleForm
                    initialData={section}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    sectionId={params.sectionId}
                  />
                </div>
                 <div className={cn(
                  "p-4 sm:p-6 rounded-xl",
                  "bg-white/40 dark:bg-gray-800/40",
                  "border border-gray-200 dark:border-gray-700/50",
                  "backdrop-blur-sm"
                )}>
                  <div className="flex items-center gap-x-3 mb-4">
                    <div className={cn(
                      "p-2 w-fit rounded-lg",
                      "bg-cyan-50 dark:bg-cyan-500/10"
                    )}>
                      <Eye className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
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

              <div className="space-y-6">
               
                <div className={cn(
                  "p-4 sm:p-6 rounded-xl",
                  "bg-white/40 dark:bg-gray-800/40",
                  "border border-gray-200 dark:border-gray-700/50",
                  "backdrop-blur-sm"
                )}>
                  <div className="flex items-center gap-x-3 mb-4">
                    <div className={cn(
                      "p-2 w-fit rounded-lg",
                      "bg-emerald-50 dark:bg-emerald-500/10"
                    )}>
                      <Video className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
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
            <div>
            <div className="space-y-6">
                <div className="text-center space-y-4 mt-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 dark:from-purple-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent">
                      Add Resources For This Section
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                      You can add different videos and blogs that helps you to understand this section concept clearly. 
                      Also you can give each video a rating about their explanation and clear concept.
                    </p>
                  </div>
                  <GradientDivider />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                  <div className={cn(
                    "p-4 sm:p-6 rounded-xl",
                    "bg-white/40 dark:bg-gray-800/40",
                    "border border-gray-200 dark:border-gray-700/50",
                    "backdrop-blur-sm"
                  )}>
                    <div className="flex items-center gap-x-3 mb-4">
                      <div className={cn(
                        "p-2 w-fit rounded-lg",
                        "bg-blue-50 dark:bg-blue-500/10"
                      )}>
                        <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        Add Video Links
                      </h2>
                    </div>
                    <VideoSectionForm 
                      chapter={chapter}
                      courseId={params.courseId}
                      chapterId={params.chapterId}
                      sectionId={params.sectionId}
                    />
                  </div>

                  <div className={cn(
                    "p-4 sm:p-6 rounded-xl",
                    "bg-white/40 dark:bg-gray-800/40",
                    "border border-gray-200 dark:border-gray-700/50",
                    "backdrop-blur-sm"
                  )}>
                    <div className="flex items-center gap-x-3 mb-4">
                      <div className={cn(
                        "p-2 w-fit rounded-lg",
                        "bg-pink-50 dark:bg-pink-500/10"
                      )}>
                        <Video className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Add Blog Links
                      </h2>
                    </div>
                    <BlogSectionForm 
                      chapter={chapter}
                      courseId={params.courseId}
                      chapterId={params.chapterId}
                      sectionId={params.sectionId}
                    />
                  </div>
                  </div>
                </div>
            </div>
            <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-600 dark:from-purple-400 dark:via-cyan-400 dark:to-emerald-400 bg-clip-text text-transparent mt-10 p-2 flex items-center justify-center">
                      Add Code Explanation
              </h1>
              <CodeExplanationForm 
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
                initialData={section}
              />
            </div>

           

            
          </div>
        </div>
      </SidebarDemo>
    </>
  );
}

export default SectionIdPage;