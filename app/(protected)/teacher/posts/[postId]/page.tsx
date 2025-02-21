import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import ConditionalHeader from "@/app/(homepage)/user-header";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { PostTitleForm } from "./_components/post-title-form";
import { PostImageUpload } from "./_components/post-image-upload";
import { Heading } from "@/components/heading";
import { PostChaptersForm } from "./_components/post-section-creation";
import { Footer } from "@/app/(homepage)/footer";
import { Banner } from "@/components/banner";
import { PostActions } from "./_components/post-actions";
import { PostCategory } from "./_components/post-category";
import { PostDescription } from "./_components/post-description";
import { Layout, BookOpen, FileText, ImageIcon } from "lucide-react";

const PostEditPage = async ({params}: {params: { postId: string; }}) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      comments: {
        orderBy: {
          createdAt: "asc",
        },
      },
      reactions: true,
      tags: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      postchapter: {
        orderBy: {
          position: "asc",
        },
      },
      imageSections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const user = await currentUser();
  
  if(!user?.id) return redirect("/");
  if (!post) return redirect("/");

  const requiredFields = [
    post.title,
    post.description,
    post.imageUrl,
    post.category,
    post.postchapter.some(chapter => chapter.isPublished),
  ];
  
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  const leftColumnSections = [
    {
      title: "Post Title & Category",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <PostTitleForm initialData={post} postId={post.id} />
          <PostCategory initialData={post} postId={post.id} />
        </div>
      ),
    },
    {
      title: "Post Description",
      icon: Layout,
      content: <PostDescription initialData={post} postId={post.id} />,
    },
  ];

  const rightColumnSections = [
    {
      title: "Post Content",
      icon: BookOpen,
      content: <PostChaptersForm initialData={post} postId={post.id} />,
    },
    {
      title: "Post Image",
      icon: ImageIcon,
      content: <PostImageUpload initialData={post} postId={post.id} />,
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        <ConditionalHeader user={user} />
      </div>
      <SidebarDemo>
        <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
          <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <Heading 
                tag="h1" 
                text="Edit Your Post" 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              />
            </div>

            {/* Banner & Actions */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {!post.published && (
                <Banner label="This post is unpublished. It will not be visible to readers." />
              )}
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 lg:p-6 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Post Setup
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Complete all sections <span className="text-blue-600 dark:text-blue-400">{completionText}</span>
                    </p>
                  </div>
                  <PostActions
                    disabled={!isComplete}
                    postId={params.postId}
                    isPublished={post.published}
                  />
                </div>
              </div>
            </div>

            {/* Main Content - Full Width Layout */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                {/* Left Column */}
                <div className="space-y-4 sm:space-y-6">
                  {leftColumnSections.map((section) => (
                    <div 
                      key={section.title}
                      className="bg-white/50 dark:bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:bg-white/60 dark:hover:bg-gray-800/40 transition-colors duration-200"
                    >
                      <div className="bg-gray-50/80 dark:bg-gray-800/80 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <section.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                            {section.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 lg:p-6 text-gray-700 dark:text-gray-300">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4 sm:space-y-6">
                  {rightColumnSections.map((section) => (
                    <div 
                      key={section.title}
                      className="bg-white/50 dark:bg-gray-800/30 rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:bg-white/60 dark:hover:bg-gray-800/40 transition-colors duration-200"
                    >
                      <div className="bg-gray-50/80 dark:bg-gray-800/80 px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <section.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                            {section.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 lg:p-6 text-gray-700 dark:text-gray-300">
                        {section.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                All changes are automatically saved
              </p>
            </div>
          </div>
        </div>
      </SidebarDemo>
      <Footer />
    </>
  );
}

export default PostEditPage;