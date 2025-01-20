"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ScrollableTabs = () => {
  const scrollLeft = () => {
    const tabsList = document.querySelector('[role="tablist"]');
    if (tabsList) {
      tabsList.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const tabsList = document.querySelector('[role="tablist"]');
    if (tabsList) {
      tabsList.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
          bg-white/10 backdrop-blur-sm border border-gray-200/20
          dark:bg-gray-800/50 dark:border-gray-700/50
          hover:bg-white/20 dark:hover:bg-gray-700/50
          transition-all duration-200
          md:hidden"
      >
        <ChevronLeft className="w-4 h-4 dark:text-gray-400 text-gray-600" />
      </button>

      <TabsList className="flex items-center justify-start gap-1 p-1 
        dark:bg-slate-100/10 bg-slate-100/80
        dark:border-slate-200/10 border-slate-300
        rounded-lg border mb-8 backdrop-blur-sm
        overflow-x-auto no-scrollbar w-full
        scroll-smooth"
      >
        <div className="flex items-center gap-1 min-w-max px-8">
          <TabsTrigger 
            value="courses"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            My Courses
          </TabsTrigger>

          <TabsTrigger 
            value="posts"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            My Posts
          </TabsTrigger>

          <TabsTrigger 
            value="social"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Social Links
          </TabsTrigger>

          <TabsTrigger 
            value="videos"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Favorite Videos
          </TabsTrigger>

          <TabsTrigger 
            value="audios"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Favorite Audios
          </TabsTrigger>

          <TabsTrigger 
            value="blogs"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Favorite Blogs
          </TabsTrigger>

          <TabsTrigger 
            value="articles"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Favorite Articles
          </TabsTrigger>

          <TabsTrigger 
            value="subscriptions"
            className="px-4 py-2 text-sm font-medium whitespace-nowrap
              dark:text-slate-300 text-slate-700
              dark:data-[state=active]:bg-slate-200/10 data-[state=active]:bg-white
              dark:data-[state=active]:text-indigo-300 data-[state=active]:text-indigo-700
              dark:hover:text-indigo-200 hover:text-indigo-600 transition-colors"
          >
            Subscriptions
          </TabsTrigger>
        </div>
      </TabsList>

      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
          bg-white/10 backdrop-blur-sm border border-gray-200/20
          dark:bg-gray-800/50 dark:border-gray-700/50
          hover:bg-white/20 dark:hover:bg-gray-700/50
          transition-all duration-200
          md:hidden"
      >
        <ChevronRight className="w-4 h-4 dark:text-gray-400 text-gray-600" />
      </button>
    </div>
  );
}; 