"use client"

import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionBlogsProps {
  blogs: {
    id: string;
    title: string;
    description: string | null;
    url: string;
    author: string | null;
  }[];
}

export default function SectionBlogs({ blogs }: SectionBlogsProps) {
  const handleBlogClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => handleBlogClick(blog.url)}
          className={cn(
            "p-4 rounded-xl",
            "bg-white/50 dark:bg-gray-900/50",
            "border border-gray-200/50 dark:border-gray-700/50",
            "hover:bg-gray-50 dark:hover:bg-gray-800/70",
            "transition-all duration-200 cursor-pointer",
            "group"
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="space-y-1.5">
              <h4 className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {blog.title}
              </h4>
              {blog.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {blog.description}
                </p>
              )}
              {blog.author && (
                <p className="text-sm text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  By {blog.author}
                </p>
              )}
            </div>
            
            <div className="flex justify-end">
              <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors duration-200">
                <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

