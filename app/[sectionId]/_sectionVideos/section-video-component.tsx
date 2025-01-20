"use client"

import { Video, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionVideosProps {
  videos: {
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    clarityRating: number | null;
  }[];
}

const RatingStars = ({ rating }: { rating: number | null }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={cn(
          "h-3.5 w-3.5",
          star <= (rating || 0) 
            ? "text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" 
            : "text-gray-400 dark:text-gray-600"
        )}
      />
    ))}
  </div>
);

export default function SectionVideos({ videos }: SectionVideosProps) {
  const handleVideoClick = (url: string | null) => {
    if (!url) return;
    window.open(url, '_blank');
  };

  return (
    <>
      {videos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => handleVideoClick(video.url)}
          className={cn(
            "p-4 rounded-xl",
            "bg-white/50 dark:bg-gray-900/50",
            "border border-gray-200/50 dark:border-gray-700/50",
            "hover:bg-gray-50 dark:hover:bg-gray-800/70",
            "transition-all duration-200 cursor-pointer",
            "group"
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <h4 className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {video.title}
              </h4>
              {video.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {video.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <RatingStars rating={video.clarityRating} />
              <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors duration-200">
                <Video className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
