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

  const sections = [
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
      <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      <ConditionalHeader user={user} />
      </div>
      <SidebarDemo>
        <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8">
              <Heading 
                tag="h1" 
                text="Edit Your Post" 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent"
              />
            </div>

            {/* Banner & Actions */}
            <div className="space-y-4 mb-8">
              {!post.published && (
                <Banner label="This post is unpublished. It will not be visible to readers." />
              )}
              <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-800/60 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                      Post Setup
                    </h2>
                    <p className="text-sm text-gray-400/90">
                      Complete all sections <span className="text-cyan-400/90">{completionText}</span>
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

            {/* Main Content */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div 
                  key={section.title}
                  className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden hover:bg-gray-800/40 transition-colors duration-200"
                >
                  <div className="bg-gradient-to-r from-gray-800/80 to-gray-800/60 px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-purple-400/90" />
                      <h3 className="text-lg font-medium bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 text-gray-300/90 hover:text-gray-200/90 transition-colors duration-200">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500/80 italic">
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