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
    <div className="relative flex items-center">
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

      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-4">
          <TabsTrigger 
            value="todos"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Todo List
          </TabsTrigger>
        
          <TabsTrigger 
            value="courses"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger 
            value="posts"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger 
            value="social"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Social Links
          </TabsTrigger>
          <TabsTrigger 
            value="videos"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Favorite Videos
          </TabsTrigger>
          <TabsTrigger 
            value="audios"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Favorite Audios
          </TabsTrigger>
          <TabsTrigger 
            value="blogs"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Favorite Blogs
          </TabsTrigger>
          <TabsTrigger 
            value="articles"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Favorite Articles
          </TabsTrigger>
          <TabsTrigger 
            value="subscriptions"
            className="px-4 py-2 data-[state=active]:bg-primary/10 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            Subscriptions
          </TabsTrigger>
        </div>
      </div>

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