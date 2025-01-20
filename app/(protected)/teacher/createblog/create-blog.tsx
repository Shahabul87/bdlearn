import React from "react";
import Link from "next/link";
import { CreateBlogInputSection } from "./create-blog-input";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const CreateNewBlogPage = () => {
  return (
    <section className={cn(
      "rounded-xl px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16",
      "bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
      "border border-gray-200/50 dark:border-gray-700/50",
      "shadow-xl backdrop-blur-sm text-center"
    )}>
      <div className="mx-auto max-w-screen-lg">
        {/* Notification Banner */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className={cn(
            "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full",
            "bg-purple-50 dark:bg-purple-500/10",
            "text-purple-600 dark:text-purple-400",
            "border border-purple-200/20 dark:border-purple-500/20",
            "backdrop-blur-sm flex items-center gap-2",
            "transform hover:scale-105 transition-transform duration-200"
          )}>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">
              Share your knowledge beyond limits!
            </span>
          </div>
        </div>
        
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 px-4">
            Create Your Blog Post
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto px-4">
            What would you like to name your blog? Don&apos;t worry, you can change this later.
          </p>
        </div>
        
        <div className={cn(
          "rounded-xl overflow-hidden mx-auto max-w-4xl",
          "bg-white/40 dark:bg-gray-800/40",
          "border border-gray-200/50 dark:border-gray-700/50",
          "shadow-lg backdrop-blur-sm"
        )}>
          <CreateBlogInputSection />
        </div>
      </div>
    </section>
  );
}
