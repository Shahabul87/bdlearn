import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks, Video } from "lucide-react";

import { PostchapterTitleForm } from "./_components/postchapter-title-form";
import { PostchapterDescriptionForm } from "./_components/postchapter-description-form";
import { PostchapterAccessForm } from "./_components/postchapter-access-form";
import { PostchapterActions } from "./_components/postchapter-actions";
import { PostChapterImageUpload } from "./_components/post-chapter-image-upload";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { BackButton } from "./_components/back-button";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

interface PageProps {
  params: {
    postId: string;
    postchapterId: string;
  };
}

const PostChapterIdPage = async ({ params }: PageProps) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const userForHeader = user ? {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    isOAuth: user.isOAuth
  } : null;

  const chapter = await db.postChapterSection.findUnique({
    where: {
      id: params.postchapterId,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.imageUrl,
    true
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <ConditionalHeader user={userForHeader} />
      <SidebarDemo>
        <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8">
              <BackButton />
              <PostchapterActions
                disabled={!isComplete}
                postId={params.postId}
                chapterId={params.postchapterId}
                isPublished={chapter.isPublished}
              />
            </div>

            {/* Chapter Completion Status */}
            <div className="mb-8">
              <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-6 shadow-sm dark:shadow-gray-900/20">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-500/20">
                    <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                      Chapter Completion
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Complete all fields {completionText}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700/50 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-500 dark:to-purple-400 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(completedFields / totalFields) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Warning Banner */}
            {!chapter.isPublished && (
              <div className="mb-8">
                <Banner
                  variant="warning"
                  label="This chapter is unpublished. It will not be visible in the post."
                />
              </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-x-3 pb-2 border-b border-gray-200/60 dark:border-gray-700/40">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-500/20">
                    <LayoutDashboard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                    Customize your chapter
                  </h2>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-6 shadow-sm dark:shadow-gray-900/20">
                  <PostchapterTitleForm
                    initialData={chapter}
                    postId={params.postId}
                    chapterId={params.postchapterId}
                  />
                </div>

                <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-6 shadow-sm dark:shadow-gray-900/20">
                  <PostchapterDescriptionForm
                    initialData={chapter}
                    postId={params.postId}
                    chapterId={params.postchapterId}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-x-3 pb-2 border-b border-gray-200/60 dark:border-gray-700/40">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-500/20">
                    <ListChecks className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100">
                    Chapter Setup
                  </h2>
                </div>

                <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-6 shadow-sm dark:shadow-gray-900/20">
                  <PostchapterAccessForm
                    initialData={chapter}
                    postId={params.postId}
                    chapterId={params.postchapterId}
                  />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 p-6 shadow-sm dark:shadow-gray-900/20">
                  <PostChapterImageUpload
                    initialData={chapter}
                    postId={params.postId}
                    chapterId={params.postchapterId}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </SidebarDemo>
    </>
  );
};

export default PostChapterIdPage;