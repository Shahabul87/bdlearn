"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Star, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface RecentCoursesProps {
  courses: any[];
}

export const RecentCourses = ({ courses }: RecentCoursesProps) => {
  const recentCourses = courses.slice(0, 5); // Show only 5 most recent courses

  return (
    <div className={cn(
      "rounded-xl p-6",
      "bg-white/50 dark:bg-gray-800/50",
      "border border-gray-200/50 dark:border-gray-700/50",
      "backdrop-blur-sm",
      "h-full"
    )}>
      {recentCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
            কোন কোর্স পাওয়া যায়নি
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            No courses found
          </p>
          <Link 
            href="/dashboard/teacher/create"
            className={cn(
              "px-4 py-2 rounded-lg",
              "text-base font-medium",
              "bg-purple-600",
              "text-white",
              "hover:bg-purple-700",
              "transition-colors duration-200"
            )}
          >
            <span className="block text-center">নতুন কোর্স তৈরি করুন</span>
            <span className="block text-xs text-center">Create New Course</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={`/dashboard/teacher/courses/${course.id}`}
                  className={cn(
                    "group block p-4 rounded-lg",
                    "bg-gray-50 dark:bg-gray-800/50",
                    "border border-gray-200/50 dark:border-gray-700/50",
                    "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                    "transition-all duration-200"
                  )}
                >
                  <div className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={course.imageUrl || "/placeholder-course.jpg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {course.title}
                      </h3>
                      
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Users className="w-4 h-4 mr-1" />
                          <span className="text-xs">{course.enrollments.length} শিক্ষার্থী</span>
                        </div>
                        
                        {course.reviews.length > 0 && (
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            <span className="text-xs">
                              {(course.reviews.reduce((acc: number, review: any) => 
                                acc + review.rating, 0) / course.reviews.length
                              ).toFixed(1)} রেটিং
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-xs">
                            {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link 
            href="/dashboard/teacher/courses"
            className={cn(
              "block mt-6 text-center py-2 rounded-lg",
              "bg-purple-50 dark:bg-purple-900/20",
              "hover:bg-purple-100 dark:hover:bg-purple-900/40",
              "transition-colors duration-200"
            )}
          >
            <span className="block text-base font-medium text-purple-600 dark:text-purple-400">সমস্ত কোর্স দেখুন</span>
            <span className="block text-xs text-purple-500 dark:text-purple-500">View All Courses</span>
          </Link>
        </>
      )}
    </div>
  );
}; 