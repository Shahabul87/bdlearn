import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { currentUser } from '@/lib/auth'
import { Footer } from "@/app/(homepage)/footer";
import { GradientDivider } from "@/components/border";
import Image from "next/image";
import { SocialMediaShare } from "./_components/social-media-sharing";
import { PostComment } from "./_components/add-comments";
import CommentDisplay from "./_components/comment-display";
import { transformPostChapters } from "./_components/transform-post-chapter";
import ReadingModes from "./_components/reading-mode";
import { Heading } from "@/components/heading";
import { Clock, Calendar, User as UserIcon, Tag, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeaturedImage } from "./_components/featured-image";

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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8 w-[90%] pt-20">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </span>
            </div>
          )}

          {/* Post Title - Made responsive for wider layouts */}
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 leading-tight max-w-[80%]">
            {post.title || "Untitled Post"}
          </h1>

          {/* Author Info - Improved spacing for wider layouts */}
          <div className="flex items-center gap-6 mb-6 text-gray-400">
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm">{post.user?.name || "Unknown Author"}</span>
            </div>
            <div className="h-4 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm">{formattedDate(post.createdAt)}</span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 mb-8" />

          {/* Metadata and Share Section - Adjusted for wider layouts */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
            <div className="space-y-2 lg:space-y-4">
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                <span>Created: {formattedDate(post.createdAt)}</span>
              </div>
              {post.updatedAt && (
                <div className="flex items-center text-sm text-gray-400">
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  <span>Updated: {formattedDate(post.updatedAt)}</span>
                </div>
              )}
            </div>
            <SocialMediaShare postTitle={post.title} />
          </div>

          {/* Featured Image with Toggle */}
          {post.imageUrl && (
            <div className="mb-8">
              <FeaturedImage imageUrl={post.imageUrl} title={post.title} />
            </div>
          )}

          {/* Reading Modes - Added container for better content organization */}
          <div className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
            <ReadingModes post={post} />
          </div>

          {/* Comments Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Comments
              </h2>
              <div className="h-px w-full max-w-[200px] mx-auto bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-4" />
            </div>

            {/* Comment Form */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <PostComment initialData={post} postId={params.postId} />
            </div>

            {/* Comments Display */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
              <CommentDisplay initialData={post} postId={params.postId} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PostIdPage;
