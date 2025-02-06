"use client";

import { motion } from "framer-motion";
import { 
  Book, 
  Video, 
  FileText, 
  Link as LinkIcon,
  ExternalLink,
  Calendar 
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Resource } from "./types";
import { cn } from "@/lib/utils";

interface ResourceListProps {
  resources: Resource[];
  selectedCategory: string;
  selectedType: string;
}

export const ResourceList = ({ resources, selectedCategory, selectedType }: ResourceListProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            "border border-gray-200 dark:border-gray-700/50",
            "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
            "hover:border-purple-500/50 dark:hover:border-purple-400/50",
            "transition-all duration-200",
            "p-4 sm:p-6"
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700/50">
                  {resource.type === 'video' && (
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400" />
                  )}
                  {resource.type === 'document' && (
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 dark:text-green-400" />
                  )}
                  {resource.type === 'book' && (
                    <Book className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 dark:text-purple-400" />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {resource.title}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3">
                <span className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-full",
                  "bg-purple-100 dark:bg-purple-500/10",
                  "text-purple-600 dark:text-purple-400"
                )}>
                  {resource.category}
                </span>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-3 mt-3 sm:mt-0">
              <a 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center text-sm",
                  "text-gray-600 dark:text-gray-300",
                  "hover:text-purple-600 dark:hover:text-purple-400",
                  "transition-colors group/link"
                )}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">View Resource</span>
                <span className="sm:hidden">View</span>
                <ExternalLink className="w-4 h-4 ml-1 sm:ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 