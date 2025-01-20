import { redirect } from "next/navigation";
import { ArrowLeft, LayoutDashboard, ListChecks, Video } from "lucide-react";

import { PostchapterTitleForm } from "./_components/postchapter-title-form";
import { PostchapterDescriptionForm } from "./_components/postchapter-description-form";
import { PostchapterAccessForm } from "./_components/postchapter-access-form";
import { PostchapterActions } from "./_components/postchapter-actions";
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
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <ConditionalHeader user={userForHeader} />
      <SidebarDemo>
        <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header & Actions */}
            <div className="flex items-center justify-between mb-8">
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
              <div className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-4">
                <div className="flex items-center gap-x-2 mb-2">
                  <div className="p-2 w-fit rounded-md bg-purple-500/10">
                    <Video className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      Chapter Completion
                    </h3>
                    <p className="text-xs text-gray-400">
                      Complete all fields {completionText}
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full mt-4">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <LayoutDashboard className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Customize your chapter
                  </h2>
                </div>

                <PostchapterTitleForm
                  initialData={chapter}
                  postId={params.postId}
                  chapterId={params.postchapterId}
                />
                <PostchapterDescriptionForm
                  initialData={chapter}
                  postId={params.postId}
                  chapterId={params.postchapterId}
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-x-2">
                  <ListChecks className="h-5 w-5 text-purple-400" />
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Chapter Setup
                  </h2>
                </div>

                <PostchapterAccessForm
                  initialData={chapter}
                  postId={params.postId}
                  chapterId={params.postchapterId}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarDemo>
    </>
  );
};

export default PostChapterIdPage;