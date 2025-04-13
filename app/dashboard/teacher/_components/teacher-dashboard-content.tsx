"use client";

import { StatsCards } from "./stats-cards";
import { RecentCourses } from "./recent-courses";
import { TeacherAnalytics } from "./teacher-analytics";
import { QuickActions } from "./quick-actions";
import { cn } from "@/lib/utils";
import { SidebarDemo } from "@/components/ui/sidebar-demo";

interface TeacherDashboardContentProps {
  courses: any[];
}

export const TeacherDashboardContent = ({ courses }: TeacherDashboardContentProps) => {
  return (
    <SidebarDemo>
      <div className="pt-8 mt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className={cn(
            "rounded-xl p-8 mb-8",
            "bg-gradient-to-r from-blue-600 to-indigo-700",
            "shadow-xl"
          )}>
            <h1 className="text-3xl font-bold text-white mb-1.5">
              শিক্ষক ড্যাশবোর্ড
            </h1>
            <p className="text-lg text-white/90 mb-1">
              আপনার শিক্ষাদান কার্যক্রমের সকল তথ্য এবং পরিসংখ্যান এখানে দেখুন
            </p>
            <p className="text-sm text-white/70">
              Teacher Dashboard - View all your teaching activities and statistics here
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                দ্রুত পদক্ষেপ
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quick Actions
              </p>
            </div>
            <QuickActions />
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                পরিসংখ্যান এবং তথ্য
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Statistics and Information
              </p>
            </div>
            <StatsCards courses={courses} />
          </div>

          {/* Recent Courses & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  সাম্প্রতিক কোর্সসমূহ
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recent Courses
                </p>
              </div>
              <RecentCourses courses={courses} />
            </div>
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  শিক্ষক বিশ্লেষণ
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Teacher Analytics
                </p>
              </div>
              <TeacherAnalytics courses={courses} />
            </div>
          </div>
          
          {/* Upcoming Schedule */}
          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                আগামী সময়সূচি
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upcoming Schedule
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-center h-40">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    <span className="block text-lg font-medium">আগামী সময়সূচি এখানে দেখানো হবে</span>
                    <span className="block text-sm mt-2">Upcoming schedule will be shown here</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarDemo>
  );
}; 