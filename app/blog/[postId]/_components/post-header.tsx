"use client";

import { Tag, User as UserIcon, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostHeaderProps {
  title: string;
  category: string | null | undefined;
  authorName: string | null | undefined;
  createdAt: Date;
}

export const PostHeader = ({
  title,
  category,
  authorName,
  createdAt
}: PostHeaderProps) => {
  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4 mb-4">
      {/* Category Badge */}
      {category && (
        <div className="mb-2 lg:mb-4 mt-2">
          <span className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-sm md:text-2xl font-medium bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
            <Tag className="w-4 h-4 mr-2" />
            {category}
          </span>
        </div>
      )}

      {/* Post Title */}
      <h1 className={cn(
        "text-2xl md:text-4xl lg:text-6xl font-bold",
        "text-gray-900 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent",
        "mb-4 leading-tight"
      )}>
        {title || "Untitled Post"}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-6 mb-6 text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <UserIcon className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="text-sm sm:text:md md:text-2xl">{authorName || "Unknown Author"}</span>
        </div>
        <div className="h-4 w-px bg-gray-200 dark:bg-gradient-to-b dark:from-blue-500/50 dark:to-purple-500/50" />
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400 sm:text:md md:text-2xl" />
          <span className="text-sm sm:text:md md:text-2xl">{formattedDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}; 