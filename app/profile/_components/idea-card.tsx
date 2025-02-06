"use client";

import { motion } from "framer-motion";
import { 
  MoreVertical, 
  MessageCircle, 
  Heart, 
  Users, 
  Globe, 
  Lock, 
  Users2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    status: "draft" | "published" | "archived";
    createdAt: Date;
    likes: number;
    comments: number;
    collaborators: number;
    visibility: "public" | "private" | "collaborative";
  };
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export const IdeaCard = ({ idea, onEdit, onDelete, onShare }: IdeaCardProps) => {
  const getVisibilityIcon = () => {
    switch (idea.visibility) {
      case "public": return <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "private": return <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "collaborative": return <Users2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default: return <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (idea.status) {
      case "published": return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "draft": return "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case "archived": return "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400";
      default: return "bg-gray-50 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "border transition-all duration-300",
        "bg-white/50 dark:bg-gray-800/50",
        "border-gray-200 dark:border-gray-700",
        "hover:border-purple-500/50 dark:hover:border-purple-500/50",
        "hover:shadow-lg hover:shadow-purple-500/10"
      )}
    >
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <span className={cn(
            "px-2.5 sm:px-3 py-1 rounded-full",
            "text-[10px] sm:text-xs font-medium",
            "w-fit",
            getStatusColor()
          )}>
            {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
          </span>
          <div className={cn(
            "flex items-center gap-1.5 sm:gap-2",
            "px-2.5 sm:px-3 py-1 rounded-full",
            "text-[10px] sm:text-xs",
            "bg-gray-50 dark:bg-gray-800",
            "text-gray-600 dark:text-gray-300",
            "w-fit"
          )}>
            {getVisibilityIcon()}
            <span className="capitalize">{idea.visibility}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {idea.tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "px-2 py-0.5 sm:py-1 rounded-md",
                "text-[10px] sm:text-xs font-medium",
                "bg-purple-50 dark:bg-purple-500/10",
                "text-purple-600 dark:text-purple-400"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {idea.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {idea.comments}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {idea.collaborators}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        "p-4 sm:p-6"
      )}>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-4">
          <button
            onClick={onEdit}
            className={cn(
              "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg",
              "text-xs sm:text-sm",
              "bg-purple-600 dark:bg-purple-500 text-white",
              "hover:bg-purple-700 dark:hover:bg-purple-600",
              "transition-colors"
            )}
          >
            Edit Idea
          </button>
          <button
            onClick={onShare}
            className={cn(
              "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg",
              "text-xs sm:text-sm",
              "bg-gray-100 dark:bg-gray-700",
              "text-gray-700 dark:text-gray-200",
              "hover:bg-gray-200 dark:hover:bg-gray-600",
              "transition-colors"
            )}
          >
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 