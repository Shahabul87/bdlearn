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
}

export const ResourceGrid = ({ resources }: ResourceGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-purple-500/50 transition-all group"
        >
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
            {resource.imageUrl ? (
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
                {resource.type === 'video' && <Video className="w-8 h-8 text-gray-400" />}
                {resource.type === 'document' && <FileText className="w-8 h-8 text-gray-400" />}
                {resource.type === 'book' && <Book className="w-8 h-8 text-gray-400" />}
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{resource.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
              {resource.category}
            </span>
            <a 
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors group"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              <span>View Resource</span>
              <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 