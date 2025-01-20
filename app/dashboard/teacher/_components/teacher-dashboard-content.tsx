"use client";

import { StatsCards } from "./stats-cards";
import { RecentCourses } from "./recent-courses";
import { TeacherAnalytics } from "./teacher-analytics";
import { QuickActions } from "./quick-actions";
import { cn } from "@/lib/utils";

interface TeacherDashboardContentProps {
  courses: any[];
}

export const TeacherDashboardContent = ({ courses }: TeacherDashboardContentProps) => {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className={cn(
          "rounded-xl p-8 mb-8",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200/50 dark:border-gray-700/50",
          "backdrop-blur-sm"
        )}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your courses and track your teaching progress
          </p>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Stats Overview */}
        <StatsCards courses={courses} />

        {/* Recent Courses & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <RecentCourses courses={courses} />
          <TeacherAnalytics courses={courses} />
        </div>
      </div>
    </div>
  );
}; 