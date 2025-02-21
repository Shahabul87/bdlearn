"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size="sm"
      className={cn(
        "flex items-center gap-2 group",
        "text-sm sm:text-base font-medium",
        "px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg",
        "bg-white/50 dark:bg-gray-800/50",
        "text-gray-700 dark:text-gray-300",
        "border border-gray-200/50 dark:border-gray-700/50",
        "hover:bg-gray-100/50 dark:hover:bg-gray-700/50",
        "hover:text-gray-900 dark:hover:text-gray-100",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "focus:ring-gray-400/50 dark:focus:ring-gray-500/50",
        "transition-all duration-200"
      )}
    >
      <ArrowLeft className={cn(
        "h-4 w-4 transition-transform duration-200",
        "group-hover:-translate-x-0.5"
      )} />
      <span className="relative">
        {/* Text shadow for better readability */}
        <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 blur-[0.5px]">
          Back to post
        </span>
        <span className="relative">Back to post</span>
      </span>
    </Button>
  );
}; 