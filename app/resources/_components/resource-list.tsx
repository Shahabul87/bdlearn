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

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string;
  link: string;
  category: string;
  createdAt: Date;
}

interface ResourceListProps {
  resources: Resource[];
}

export const ResourceList = ({ resources }: ResourceListProps) => {
  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 hover:border-purple-500/50 transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  {resource.type === 'video' && <Video className="w-5 h-5 text-blue-400" />}
                  {resource.type === 'document' && <FileText className="w-5 h-5 text-green-400" />}
                  {resource.type === 'book' && <Book className="w-5 h-5 text-purple-400" />}
                </div>
                <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
              
              <div className="flex items-center space-x-4">
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>

            <a 
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors group ml-4"
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