"use client";

import { EnrolledCourseCard } from "./enrolled-course-card";
import { cn } from "@/lib/utils";

interface DashboardContentProps {
  enrolledCourses: any[];
}

export const DashboardContent = ({ enrolledCourses }: DashboardContentProps) => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className={cn(
          "rounded-xl p-8",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200/50 dark:border-gray-700/50",
          "backdrop-blur-sm"
        )}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Learning Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Track your progress and continue learning
          </p>
          
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl text-gray-700 dark:text-gray-300">
                You haven&apos;t enrolled in any courses yet.
              </h2>
              <a 
                href="/courses" 
                className={cn(
                  "inline-block mt-4 px-6 py-3 rounded-lg",
                  "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700",
                  "text-white",
                  "transition-colors"
                )}
              >
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((enrollment) => (
                <EnrolledCourseCard 
                  key={enrollment.id}
                  enrollment={enrollment}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Section */}
        {enrolledCourses.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cn(
              "rounded-xl p-6",
              "bg-white/50 dark:bg-gray-800/50",
              "border border-gray-200/50 dark:border-gray-700/50",
              "backdrop-blur-sm"
            )}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Total Courses
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {enrolledCourses.length}
              </p>
            </div>
            <div className={cn(
              "rounded-xl p-6",
              "bg-white/50 dark:bg-gray-800/50",
              "border border-gray-200/50 dark:border-gray-700/50",
              "backdrop-blur-sm"
            )}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                In Progress
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {enrolledCourses.filter(e => e.progress && e.progress < 100).length}
              </p>
            </div>
            <div className={cn(
              "rounded-xl p-6",
              "bg-white/50 dark:bg-gray-800/50",
              "border border-gray-200/50 dark:border-gray-700/50",
              "backdrop-blur-sm"
            )}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Completed
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {enrolledCourses.filter(e => e.progress === 100).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 