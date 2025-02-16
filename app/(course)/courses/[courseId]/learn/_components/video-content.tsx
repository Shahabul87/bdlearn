"use client";

import { Video } from "@prisma/client";
import { ExternalLink, Star, Calendar, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface VideoContentProps {
  content: Video[];
  courseId: string;
  chapterId: string;
  sectionId: string;
}

export const VideoContent = ({ content }: VideoContentProps) => {
  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {content.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleVideoClick(video.url || video.youtubeUrl || '')}
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-100 dark:hover:border-purple-900/50"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2">
                  {video.title}
                </h3>
                <PlayCircle className="h-5 w-5 text-gray-400 group-hover:text-purple-500 shrink-0 ml-2" />
              </div>
              
              {video.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {video.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (video.rating || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(video.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 