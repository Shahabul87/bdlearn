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
      case "public": return <Globe className="w-4 h-4" />;
      case "private": return <Lock className="w-4 h-4" />;
      case "collaborative": return <Users2 className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (idea.status) {
      case "published": return "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300";
      case "draft": return "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300";
      case "archived": return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "border transition-all duration-300",
        "bg-white dark:bg-gray-900",
        "border-gray-200 dark:border-gray-800",
        "hover:border-purple-500/50 dark:hover:border-purple-500/50",
        "hover:shadow-lg hover:shadow-purple-500/10"
      )}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            getStatusColor()
          )}>
            {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
          </span>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full text-xs",
            "bg-gray-100 dark:bg-gray-800",
            "text-gray-600 dark:text-gray-300"
          )}>
            {getVisibilityIcon()}
            <span className="capitalize">{idea.visibility}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.map((tag, index) => (
            <span
              key={index}
              className={cn(
                "px-2 py-1 rounded-md text-xs font-medium",
                "bg-purple-50 dark:bg-purple-500/10",
                "text-purple-600 dark:text-purple-300"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {idea.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {idea.comments}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {idea.collaborators}
            </span>
          </div>
          <span>
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        "p-6"
      )}>
        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-purple-500 text-white",
              "hover:bg-purple-600 dark:hover:bg-purple-400",
              "transition-colors"
            )}
          >
            Edit Idea
          </button>
          <button
            onClick={onShare}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-gray-100 dark:bg-gray-800",
              "text-gray-700 dark:text-gray-200",
              "hover:bg-gray-200 dark:hover:bg-gray-700",
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