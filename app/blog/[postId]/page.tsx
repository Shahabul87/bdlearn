import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import { Footer } from "@/app/(homepage)/footer";
import { PostComment } from "./_components/add-comments";
import CommentDisplay from "./_components/comment-display";
import { transformPostChapters } from "./_components/transform-post-chapter";
import ReadingModes from "./_components/reading-mode";
import { FeaturedImage } from "./_components/featured-image";
import { Metadata } from "next";
import { PostHeader } from "./_components/post-header";
import { PostMetadata } from "./_components/post-metadata";

const PostIdPage = async ({params}: {params: { postId: string; }}) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: true,
      tags: true,
      comments: {
        include: {
          user: true,
          reactions: {
            include: {
              user: true,
            },
          },
          replies: {
            include: {
              user: true,
              reactions: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
      replies: {
        include: {
          user: true,
          reactions: {
            include: {
              user: true,
            },
          },
        },
      },
      reactions: {
        include: {
          user: true,
        },
      },
      postchapter: {
        where: {
          isPublished: true,
        },
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

  const user:any = await currentUser();

  if (!post) {
    return redirect("/");
  }

  const content = transformPostChapters(post.postchapter);
  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200 mt-20">
        <div className="w-full max-w-[2000px] mx-auto">
          <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 mx-auto">
            <div className="mx-auto w-full lg:px-4 lg:py-8">
              <PostHeader
                title={post.title}
                category={post.category}
                authorName={post.user?.name}
                createdAt={post.createdAt}
              />

              <div className="h-px w-full bg-gray-200 dark:bg-gradient-to-r dark:from-blue-500/50 dark:via-purple-500/50 dark:to-blue-500/50 mb-8" />

              {/* Metadata and Share Section */}
              <PostMetadata 
                title={post.title}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
              />

              {/* Featured Image with Toggle */}
              {post.imageUrl && (
                <div className="mb-8">
                  <FeaturedImage imageUrl={post.imageUrl} title={post.title} />
                </div>
              )}

              {/* Reading Modes */}
              <div className="mb-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl lg:p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
                <ReadingModes post={post} />
              </div>

              {/* Comments Section */}
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
                    Comments
                  </h2>
                  <div className="h-px w-full max-w-[200px] mx-auto bg-gray-200 dark:bg-gradient-to-r dark:from-transparent dark:via-purple-500/50 dark:to-transparent mt-4" />
                </div>

                {/* Comment Form */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
                  <PostComment initialData={post} postId={params.postId} />
                </div>

                {/* Comments Display */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
                  <CommentDisplay initialData={post} postId={params.postId} />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostIdPage;

export async function generateMetadata({ params }: { params: { postId: string } }): Promise<Metadata> {
  const post = await db.post.findUnique({
    where: {
      id: params.postId
    },
    select: {
      title: true,
      description: true
    }
  });

  return {
    title: post?.title || "Blog Post",
    description: post?.description || "No description available"
  };
}
