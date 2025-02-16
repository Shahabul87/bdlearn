"use client";

import { motion } from "framer-motion";
import { Video as VideoIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisplayVideosProps {
  chapter: {
    id: string;
    title: string;
    sections: {
      id: string;
      videos: {
        id: string;
        title: string;
        description: string | null;
        url: string | null;
        rating: number | null;
      }[];
    }[];
  };
  sectionId: string;
  onVideoClick: (url: string) => void;
}

export const DisplayVideos = ({
  chapter,
  sectionId,
  onVideoClick,
}: DisplayVideosProps) => {
  const currentSection = chapter.sections.find(
    (section) => section.id === sectionId
  );

  if (!currentSection?.videos.length) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        No videos added to this section yet
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4">
        {currentSection.videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => video.url && onVideoClick(video.url)}
            className={cn(
              "group p-4 rounded-lg",
              "bg-white/50 dark:bg-gray-900/50",
              "border border-gray-200 dark:border-gray-700/50",
              "hover:bg-gray-50 dark:hover:bg-gray-800/70",
              "transition-all duration-300",
              "cursor-pointer",
              "overflow-hidden"
            )}
          >
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <h4 className={cn(
                  "text-sm sm:text-base font-medium",
                  "text-gray-900 dark:text-gray-200",
                  "group-hover:text-blue-700 dark:group-hover:text-blue-300",
                  "transition-colors duration-300",
                  "line-clamp-1"
                )}>
                  {video.title}
                </h4>
                <p className={cn(
                  "text-sm",
                  "text-gray-600 dark:text-gray-400",
                  "group-hover:text-gray-700 dark:group-hover:text-gray-300",
                  "transition-colors duration-300",
                  "line-clamp-2 sm:line-clamp-1"
                )}>
                  {video.description}
                </p>
              </div>

              <div className={cn(
                "flex items-center justify-between",
                "pt-2 border-t",
                "border-gray-200 dark:border-gray-700/50"
              )}>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        star <= (video.rating || 0)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <div className={cn(
                  "p-1.5 rounded-md",
                  "bg-blue-50 dark:bg-blue-500/10",
                  "group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20",
                  "transition-colors duration-300"
                )}>
                  <VideoIcon className={cn(
                    "h-4 w-4",
                    "text-blue-600 dark:text-blue-400",
                    "group-hover:text-blue-700 dark:group-hover:text-blue-300",
                    "transition-colors duration-300"
                  )} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 