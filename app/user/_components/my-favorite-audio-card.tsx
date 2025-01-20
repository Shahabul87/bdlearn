"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Music2, 
  Clock, 
  ExternalLink, 
  Headphones,
  Music,
  Radio,
  Mic
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioCardProps {
  audio: {
    id: string;
    title: string;
    platform: string;
    url: string;
    category: string | null;
    createdAt: Date;
  }
}

const MyFavoriteAudioCard = ({ audio }: AudioCardProps) => {
  // Function to determine the appropriate icon based on platform
  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('spotify')) return Music2;
    if (p.includes('podcast')) return Mic;
    if (p.includes('radio')) return Radio;
    return Music;
  };

  const PlatformIcon = getPlatformIcon(audio.platform);

  // Ensure URL has protocol
  const getValidUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch {
      return `https://${url}`;
    }
  };

  return (
    <motion.div
      onClick={() => window.open(getValidUrl(audio.url), '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative rounded-xl overflow-hidden cursor-pointer",
        "border transition-all duration-300",
        "dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-gray-700",
        "bg-white border-gray-200 hover:border-gray-300",
        "hover:shadow-lg p-4"
      )}
    >
      {/* Platform and Category Section */}
      <div className="flex items-center justify-between mb-4">
        {/* Platform Badge */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full",
          "dark:bg-gray-800/50 bg-gray-100",
          "dark:text-gray-200 text-gray-700",
          "transition-colors duration-300"
        )}>
          <PlatformIcon className="w-4 h-4" />
          <span className="text-xs font-medium capitalize">{audio.platform}</span>
        </div>

        {/* Category Badge */}
        {audio.category && (
          <div className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium",
            "dark:bg-purple-500/20 bg-purple-100",
            "dark:text-purple-300 text-purple-600",
            "transition-colors duration-300"
          )}>
            {audio.category}
          </div>
        )}
      </div>

      {/* Audio Icon */}
      <div className="flex justify-center mb-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={cn(
            "p-4 rounded-full",
            "dark:bg-gray-800/50 bg-gray-100",
            "dark:text-purple-400 text-purple-600",
            "transition-colors duration-300"
          )}
        >
          <Headphones className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Title */}
      <motion.h3 
        className={cn(
          "text-lg font-semibold text-center line-clamp-2 mb-4",
          "dark:text-gray-200 text-gray-800",
          "group-hover:text-transparent group-hover:bg-clip-text",
          "group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600",
          "dark:group-hover:from-purple-400 dark:group-hover:to-pink-400",
          "transition-colors duration-300"
        )}
      >
        {audio.title}
      </motion.h3>

      {/* Date and External Link */}
      <div className="flex items-center justify-between">
        <div className={cn(
          "flex items-center gap-2 text-sm",
          "dark:text-gray-400 text-gray-600"
        )}>
          <Clock className="w-4 h-4" />
          <span>
            {new Date(audio.createdAt).toLocaleDateString()}
          </span>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={cn(
            "flex items-center gap-2",
            "dark:text-gray-400 text-gray-600",
            "transition-colors duration-300"
          )}
        >
          <ExternalLink className="w-4 h-4" />
        </motion.div>
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

export default MyFavoriteAudioCard;
