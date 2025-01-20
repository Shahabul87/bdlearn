"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PostCardModelTwoProps {
  data: any[];
}

export const PostCardModelTwo = ({ data }: PostCardModelTwoProps) => {
  return (
    <div className="space-y-8">
      {data.map((chapter, index) => (
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "group relative overflow-hidden rounded-xl",
            "border border-gray-700/50 bg-gray-900/50",
            "backdrop-blur-sm transition-all duration-300",
            "p-6 lg:p-8"
          )}
        >
          <div className="flex flex-col gap-8">
            {/* Content Section */}
            <div className="space-y-6">
              {/* Chapter Number */}
              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-sm font-medium",
                  "bg-gradient-to-r from-purple-400/80 to-blue-400/80",
                  "px-3 py-1 rounded-full",
                  "text-white/90"
                )}>
                  Chapter {index + 1}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent" />
              </div>

              {/* Title */}
              <h3 className={cn(
                "text-2xl lg:text-3xl font-semibold",
                "bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200",
                "bg-clip-text text-transparent",
                "tracking-tight leading-tight"
              )}>
                {chapter.title}
              </h3>

              {/* Image Section - Now below title */}
              {chapter.imageUrl && (
                <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
                  <Image
                    src={chapter.imageUrl}
                    alt={chapter.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-500",
                      "group-hover:scale-105",
                      "rounded-xl"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
              )}

              {/* Description */}
              <p className={cn(
                "text-base lg:text-lg",
                "text-gray-300/90 leading-relaxed",
                "tracking-wide font-light",
                "text-justify mt-4"
              )}>
                {chapter.description}
              </p>

              {/* Decorative Elements */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400/50" />
                  <div className="h-1 w-1 rounded-full bg-blue-400/50" />
                  <div className="h-1 w-1 rounded-full bg-cyan-400/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-blue-500/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostCardModelTwo;
