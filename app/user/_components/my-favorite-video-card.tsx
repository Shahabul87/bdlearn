"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Heart, ExternalLink, Youtube, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    platform: string;
    url: string;
    category: string | null;
    createdAt: Date;
  }
}

const MyFavoriteVideoCard = ({ video }: VideoCardProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Function to extract video ID and thumbnail from URL
  const getVideoInfo = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      try {
        const urlObj = new URL(url);
        const videoId = url.includes('youtu.be') 
          ? urlObj.pathname.slice(1)
          : urlObj.searchParams.get('v');
        return {
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`,
          isYoutube: true
        };
      } catch {
        return {
          thumbnailUrl: "/images/video-placeholder.jpg",
          embedUrl: null,
          isYoutube: false
        };
      }
    }
    return {
      thumbnailUrl: "/images/video-placeholder.jpg",
      embedUrl: null,
      isYoutube: false
    };
  };

  const { thumbnailUrl, embedUrl, isYoutube } = getVideoInfo(video.url);
  const PlatformIcon = video.platform.toLowerCase() === 'youtube' ? Youtube : Video;

  const handleMouseEnter = () => {
    if (isYoutube && embedUrl) {
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, 1000); // 1 second delay before showing preview
      return () => clearTimeout(timer);
    }
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
    setPreviewLoaded(false);
  };

  return (
    <motion.div
      onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative rounded-xl overflow-hidden cursor-pointer",
        "border transition-all duration-300",
        "dark:bg-gray-900/50 dark:border-gray-800 dark:hover:border-gray-700",
        "bg-white border-gray-200 hover:border-gray-300",
        "hover:shadow-lg"
      )}
    >
      {/* Thumbnail/Preview Section */}
      <div className="aspect-video relative">
        <div className={cn(
          "absolute inset-0",
          "dark:bg-gray-950/50 bg-gray-100/50"
        )}>
          {/* Thumbnail Image */}
          <motion.img
            src={thumbnailUrl}
            alt={video.title}
            className={cn(
              "object-cover w-full h-full",
              showPreview && previewLoaded && "opacity-0"
            )}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: showPreview && previewLoaded ? 0 : 0.8 }}
          />

          {/* Video Preview */}
          <AnimatePresence>
            {showPreview && embedUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setPreviewLoaded(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Platform Badge */}
          <div className={cn(
            "absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full",
            "dark:bg-black/60 bg-black/50 backdrop-blur-sm",
            "dark:text-gray-200 text-white"
          )}>
            <PlatformIcon className="w-4 h-4" />
            <span className="text-xs font-medium">{video.platform}</span>
          </div>

          {/* Category Badge */}
          {video.category && (
            <div className={cn(
              "absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full text-xs font-medium",
              "dark:bg-purple-500/20 bg-purple-500/10",
              "dark:text-purple-300 text-purple-600",
              "backdrop-blur-sm"
            )}>
              {video.category}
            </div>
          )}

          {/* Play Button Overlay (only show when preview is not active) */}
          {(!showPreview || !isYoutube) && (
            <div className={cn(
              "absolute inset-0 flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            )}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "p-3 rounded-full",
                  "dark:bg-purple-500/20 bg-purple-500/10",
                  "dark:text-purple-400 text-purple-600"
                )}
              >
                <Play className="w-8 h-8" />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <motion.h3 
          className={cn(
            "text-lg font-semibold line-clamp-2 mb-2",
            "dark:text-gray-200 text-gray-800",
            "group-hover:text-transparent group-hover:bg-clip-text",
            "group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600",
            "dark:group-hover:from-purple-400 dark:group-hover:to-pink-400"
          )}
        >
          {video.title}
        </motion.h3>

        <div className="flex items-center justify-between mt-4">
          <div className={cn(
            "flex items-center gap-2 text-sm",
            "dark:text-gray-400 text-gray-600"
          )}>
            <Clock className="w-4 h-4" />
            <span>
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
              "flex items-center gap-2",
              "dark:text-gray-400 text-gray-600"
            )}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
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

export default MyFavoriteVideoCard;
