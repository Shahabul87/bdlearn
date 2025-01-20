"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  ExternalLink, 
  MessageCircle,
  ThumbsUp,
  Share2,
  BookOpen,
  Image as ImageIcon,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    comments: any[];
    reactions: any[];
    imageSections: {
      id: string;
      url: string;
      postId: string;
    }[];
    postchapter: any[];
    user: {
      name: string;
      image: string;
    }
    imageUrl?: string;
  }
}

const MyPostCard = ({ post }: PostCardProps) => {
  const getCoverImage = () => {
    if (post.imageUrl) return post.imageUrl;
    if (post.imageSections && post.imageSections.length > 0) {
      return post.imageSections[0].url;
    }
    return null;
  };

  const coverImage = getCoverImage();

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "border transition-all duration-300",
        "dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-gray-700",
        "bg-white border-gray-200 hover:border-gray-300",
        "hover:shadow-lg"
      )}
    >
      {/* Cover Image Section */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        ) : (
          <div className={cn(
            "absolute inset-0 flex items-center justify-center",
            "dark:bg-gray-800 bg-gray-100"
          )}>
            <ImageIcon className="w-12 h-12 dark:text-gray-700 text-gray-300" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium",
          post.published ? (
            "dark:bg-green-500/20 bg-green-100 dark:text-green-300 text-green-600"
          ) : (
            "dark:bg-yellow-500/20 bg-yellow-100 dark:text-yellow-300 text-yellow-600"
          )
        )}>
          {post.published ? 'Published' : 'Draft'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/blog/${post.id}`}>
          <h3 className={cn(
            "text-lg font-semibold line-clamp-2 mb-2",
            "dark:text-gray-200 text-gray-800",
            "group-hover:text-transparent group-hover:bg-clip-text",
            "group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600",
            "dark:group-hover:from-purple-400 dark:group-hover:to-pink-400"
          )}>
            {post.title}
          </h3>
        </Link>

        {/* Content Preview */}
        <p className={cn(
          "text-sm line-clamp-3 mb-4",
          "dark:text-gray-400 text-gray-600"
        )}>
          {post.content}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            {/* Comments Count */}
            <div className={cn(
              "flex items-center gap-1",
              "dark:text-gray-400 text-gray-600"
            )}>
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments.length}</span>
            </div>

            {/* Reactions Count */}
            <div className={cn(
              "flex items-center gap-1",
              "dark:text-gray-400 text-gray-600"
            )}>
              <Heart className="w-4 h-4" />
              <span>{post.reactions.length}</span>
            </div>

            {/* Chapters Count */}
            <div className={cn(
              "flex items-center gap-1",
              "dark:text-gray-400 text-gray-600"
            )}>
              <BookOpen className="w-4 h-4" />
              <span>{post.postchapter.length}</span>
            </div>
          </div>

          {/* Date */}
          <div className={cn(
            "flex items-center gap-2",
            "dark:text-gray-400 text-gray-600"
          )}>
            <Clock className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className={cn(
        "p-4 border-t",
        "dark:border-gray-800 border-gray-200"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.user.image && (
              <Image
                src={post.user.image}
                alt={post.user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium dark:text-gray-300 text-gray-700">
              {post.user.name}
            </span>
          </div>
          <Link href={`/blog/${post.id}`}>
            <motion.div
              whileHover={{ x: 3 }}
              className="dark:text-gray-400 text-gray-600 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"
      )} />
    </motion.div>
  );
};

export default MyPostCard;
