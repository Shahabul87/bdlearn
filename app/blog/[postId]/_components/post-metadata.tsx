"use client";

import { Clock } from "lucide-react";
import { SocialMediaShare } from "./social-media-sharing";

interface PostMetadataProps {
  title: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export const PostMetadata = ({ title, createdAt, updatedAt }: PostMetadataProps) => {
  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center 
      mb-8 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl 
      p-4 sm:p-5 md:p-6 lg:p-8
      border border-gray-200 dark:border-gray-700/50 
      backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300
      gap-4 lg:gap-8"
    >
      {/* Metadata Section */}
      <div className="w-full lg:w-auto">
        <div className="space-y-3 md:space-y-4">
          {/* Created Date */}
          <div className="group flex items-center text-gray-600 dark:text-gray-400 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Clock className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-500 dark:text-blue-400
              group-hover:text-blue-600 dark:group-hover:text-blue-300" 
            />
            <span className="text-base md:text-xl lg:text-2xl font-medium">
              Created: {formattedDate(createdAt)}
            </span>
          </div>

          {/* Updated Date */}
          {updatedAt && (
            <div className="group flex items-center text-gray-600 dark:text-gray-400
              hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              <Clock className="w-5 h-5 md:w-6 md:h-6 mr-3 text-purple-500 dark:text-purple-400
                group-hover:text-purple-600 dark:group-hover:text-purple-300" 
              />
              <span className="text-base md:text-xl lg:text-2xl font-medium">
                Updated: {formattedDate(updatedAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider for mobile */}
      <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

      {/* Share Section */}
      <div className="w-full lg:w-auto flex justify-center lg:justify-end">
        <SocialMediaShare postTitle={title} />
      </div>
    </div>
  );
}; 