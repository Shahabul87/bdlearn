"use client";

import { motion } from "framer-motion";
import { 
  Book, 
  Video, 
  FileText, 
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using our platform",
    icon: Book,
    link: "/guides/getting-started",
    type: "guide"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides for common tasks",
    icon: Video,
    link: "/tutorials",
    type: "video"
  },
  {
    title: "Documentation",
    description: "Detailed technical documentation and API references",
    icon: FileText,
    link: "/docs",
    type: "docs"
  },
  // Add more resources as needed
];

export const ResourceSection = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {resources.map((resource, index) => (
        <motion.a
          key={resource.title}
          href={resource.link}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            "bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80",
            "border border-gray-200 dark:border-gray-700",
            "p-4 sm:p-6",
            "transition-all duration-200"
          )}
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className={cn(
              "p-2.5 sm:p-3 rounded-lg",
              "bg-purple-50 dark:bg-purple-500/10",
              "group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20",
              "transition-colors"
            )}>
              <resource.icon className={cn(
                "w-5 h-5 sm:w-6 sm:h-6",
                "text-purple-600 dark:text-purple-400",
                "group-hover:text-purple-700 dark:group-hover:text-purple-300",
                "transition-colors"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-base sm:text-lg font-semibold",
                "text-gray-900 dark:text-gray-100",
                "group-hover:text-purple-600 dark:group-hover:text-purple-400",
                "transition-colors",
                "line-clamp-1 mb-1"
              )}>
                {resource.title}
              </h3>
              <p className={cn(
                "text-sm",
                "text-gray-600 dark:text-gray-300",
                "line-clamp-2 mb-3"
              )}>
                {resource.description}
              </p>

              <div className={cn(
                "flex items-center text-sm",
                "text-purple-600 dark:text-purple-400",
                "group-hover:text-purple-700 dark:group-hover:text-purple-300"
              )}>
                <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="text-xs sm:text-sm">View Resource</span>
                <ExternalLink className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity"
                )} />
              </div>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}; 