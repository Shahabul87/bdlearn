"use client";

import { motion } from "framer-motion";
import { 
  MoreVertical, 
  Eye, 
  Heart, 
  Share2, 
  Users, 
  Globe, 
  Lock, 
  Users2,
  Tag,
  ThumbsUp,
  Clock,
  Network
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MindCardProps {
  mind: {
    id: string;
    title: string;
    description: string;
    content: any;
    category: string;
    tags: string[];
    status: "draft" | "published" | "archived";
    createdAt: Date;
    likes: number;
    views: number;
    shares: number;
    visibility: "public" | "private" | "collaborative";
    _count: {
      mindLikes: number;
      collaborators: number;
    };
  };
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export const MindCard = ({ mind, onEdit, onDelete, onShare }: MindCardProps) => {
  const getVisibilityIcon = () => {
    switch (mind.visibility) {
      case "public": return <Globe className="w-4 h-4" />;
      case "private": return <Lock className="w-4 h-4" />;
      case "collaborative": return <Users2 className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = () => {
    switch (mind.status) {
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
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {mind.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                getStatusColor()
              )}>
                {mind.status.charAt(0).toUpperCase() + mind.status.slice(1)}
              </span>
              <span className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-xs",
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-600 dark:text-gray-300"
              )}>
                {getVisibilityIcon()}
                <span className="capitalize">{mind.visibility}</span>
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <DropdownMenuItem 
                onClick={onEdit}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onShare}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
              >
                Share
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {mind.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mind.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1",
                "bg-purple-50 dark:bg-purple-500/10",
                "text-purple-600 dark:text-purple-300",
                "hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-colors"
              )}
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ThumbsUp className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
              {mind._count.mindLikes}
            </span>
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
              {mind.views}
            </span>
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Share2 className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
              {mind.shares}
            </span>
            {mind._count.collaborators > 0 && (
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1 text-purple-500 dark:text-purple-400" />
                {mind._count.collaborators}
              </span>
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1 text-purple-500 dark:text-purple-400" />
            {formatDistanceToNow(mind.createdAt, { addSuffix: true })}
          </div>
        </div>
      </div>

      {/* Preview Overlay */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        "p-6"
      )}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
        >
          <Network className="w-4 h-4 mr-2" />
          View Mind Map
        </Button>
      </div>
    </motion.div>
  );
}; 