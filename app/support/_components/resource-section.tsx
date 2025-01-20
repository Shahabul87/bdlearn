"use client";

import { motion } from "framer-motion";
import { 
  Book, 
  Video, 
  FileText, 
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource, index) => (
        <motion.div
          key={resource.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-lg bg-gray-900/50 border border-gray-700/50 p-6 hover:bg-gray-900/70 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <resource.icon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-400">
                {resource.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:text-purple-300">
            <LinkIcon className="w-4 h-4 mr-2" />
            <span>View Resource</span>
            <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 