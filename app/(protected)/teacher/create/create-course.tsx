import React from "react";
import { CreateCourseInputSection } from "./create-course-input";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export const CreateNewCoursePage = () => {
  return (
    <section className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full space-y-6">
          {/* Header Section */}
          <div className={cn(
            "rounded-xl p-6 backdrop-blur-sm",
            "bg-white/50 dark:bg-gray-800/40",
            "border border-gray-200/50 dark:border-gray-700/50"
          )}>
            <div className="flex items-center gap-x-3 mb-8">
              <div className="p-2 w-fit rounded-md bg-purple-500/10">
                <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Create Your Course
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Share your knowledge and inspire others
                </p>
              </div>
            </div>
            
            <div className={cn(
              "rounded-lg p-4",
              "bg-purple-50 dark:bg-purple-500/5",
              "border border-purple-200/50 dark:border-purple-500/10"
            )}>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Ready to create something amazing? Start by giving your course a name. 
                Don&apos;t worry about making it perfect - you can always change it later.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className={cn(
            "rounded-xl backdrop-blur-sm",
            "bg-white/50 dark:bg-gray-800/40",
            "border border-gray-200/50 dark:border-gray-700/50"
          )}>
            <CreateCourseInputSection />
          </div>
        </div>
      </div>
    </section>
  );
}