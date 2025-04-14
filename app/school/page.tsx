import React from "react";
import { StatisticsGrid } from "./components/statistics-grid";
import { WelcomeBanner } from "./components/welcome-banner";
import { EducationCategories } from "./components/education-categories";
import { EducationalResources } from "./components/educational-resources";
import { UpcomingEvents } from "./components/upcoming-events";
import { Achievements } from "./components/achievements";

export default function SchoolPage() {
  return (
    <div className="space-y-6 w-full bg-gray-50 dark:bg-gray-900 p-[5px]">
      {/* Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
        <StatisticsGrid />
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-xl shadow-sm">
        <WelcomeBanner />
      </div>

      {/* Education Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
        <EducationCategories />
      </div>

      {/* Featured Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
        <EducationalResources />
      </div>

      {/* Upcoming Events and News */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 lg:col-span-1">
          <UpcomingEvents />
        </div>
        
        {/* Recognition & Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6 lg:col-span-2">
          <Achievements />
        </div>
      </div>
    </div>
  );
} 