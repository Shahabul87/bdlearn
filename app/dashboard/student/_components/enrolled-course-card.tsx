"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface EnrolledCourseCardProps {
  enrollment: any; // Type this properly based on your Prisma schema
}

export const EnrolledCourseCard = ({ enrollment }: EnrolledCourseCardProps) => {
  const { course } = enrollment;
  
  // You can add progress tracking later
  const progress = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "shadow-lg hover:shadow-purple-500/10",
        "transition-all duration-300"
      )}
    >
      <div className="relative h-48">
        <Image
          src={course.imageUrl || "/placeholder-course.jpg"}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        {course.category && (
          <span className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-sm",
            "bg-purple-500/80 backdrop-blur-sm",
            "text-white"
          )}>
            {course.category.name}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Course Progress</span>
            <span>{progress}%</span>
          </div>
          
          <Progress value={progress} className="h-2 bg-gray-100 dark:bg-gray-700" />
          
          <Link 
            href={`/courses/${course.id}/learn`}
            className={cn(
              "block w-full text-center px-4 py-2 rounded-lg",
              "bg-purple-600 hover:bg-purple-700",
              "dark:bg-purple-600 dark:hover:bg-purple-700",
              "text-white",
              "transition-colors"
            )}
          >
            {progress > 0 ? "Continue Learning" : "Start Learning"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}; 