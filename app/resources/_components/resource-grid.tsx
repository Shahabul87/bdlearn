"use client";

import { motion } from "framer-motion";
import { 
  Book, 
  Video, 
  FileText, 
  Link as LinkIcon,
  ExternalLink 
} from "lucide-react";
import Image from "next/image";
import { Resource } from "./types";

interface ResourceGridProps {
  resources: Resource[];
  selectedCategory: string;
  selectedType: string;
}

export const ResourceGrid = ({ resources, selectedCategory, selectedType }: ResourceGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all duration-200"
        >
          <div className="relative aspect-video mb-4 rounded-t-lg overflow-hidden">
            {resource.imageUrl ? (
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center">
                {resource.type === 'video' && <Video className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
                {resource.type === 'document' && <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
                {resource.type === 'book' && <Book className="w-8 h-8 text-gray-400 dark:text-gray-500" />}
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {resource.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                {resource.category}
              </span>
              <a 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group/link"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">View Resource</span>
                <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 