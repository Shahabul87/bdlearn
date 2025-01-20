"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Clock, MessageCircle } from "lucide-react";

interface MyPostCardProps {
  post: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    published: boolean;
    category: string | null;
    createdAt: string;
    comments?: {
      length: number;
    };
  };
}

const MyPostCard: React.FC<MyPostCardProps> = ({ post }) => {
  const router = useRouter();

  return (
    <Link href={`/blog/${post.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-xl bg-white border border-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 dark:border-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl dark:hover:shadow-purple-500/10 dark:hover:border-purple-500/20 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
        </div>

        {/* Content Container */}
        <div className="p-5 space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-purple-600 dark:text-transparent dark:bg-gradient-to-br dark:from-white dark:to-gray-300 dark:bg-clip-text dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-300"
          >
            {post.title}
          </motion.h2>

          {post.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 font-medium group-hover:dark:text-gray-300 transition-colors duration-300"
            >
              {post.description}
            </motion.p>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800/50">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/40 text-purple-600 dark:text-purple-100 font-semibold text-sm tracking-wide group-hover:bg-purple-200 dark:group-hover:bg-purple-500/60 transition-colors duration-300"
            >
              {post.category || "Uncategorized"}
            </motion.span>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-cyan-500 dark:text-cyan-400/80" />
              <span className="font-medium text-gray-600 dark:text-gray-400">
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-2xl dark:group-hover:opacity-75 transition-all duration-500" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-0 left-0 -mb-6 -ml-6 h-24 w-24 rounded-full bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-2xl dark:group-hover:opacity-75 transition-all duration-500" 
        />

        {/* Hover Overlay - Dark mode only */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
};

export default MyPostCard;
