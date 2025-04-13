import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy, ChevronRight, Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoursesListProps {
  courses: any[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((enrollment) => {
        const progress = enrollment.course.chapters.reduce((acc: number, chapter: any) => {
          const isCompleted = chapter.userProgress?.[0]?.isCompleted;
          return isCompleted ? acc + 1 : acc;
        }, 0);

        const progressPercentage = (progress / enrollment.course.chapters.length) * 100;
        const isCompleted = progress === enrollment.course.chapters.length;

        // Find the first incomplete chapter, or use the first chapter if all are complete
        const nextChapter = enrollment.course.chapters.find((chapter: any) => 
          !chapter.userProgress?.[0]?.isCompleted
        ) || enrollment.course.chapters[0];

        // Get category or default
        const category = enrollment.course.category?.name || "General";

        return (
          <div 
            key={enrollment.courseId}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1"
          >
            {/* Course Image with Overlay */}
            <div className="aspect-video relative">
              <Image
                src={enrollment.course.imageUrl || "/default-course.jpg"}
                alt={enrollment.course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 group-hover:from-black/80 transition-colors" />
              
              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                  {category}
                </span>
              </div>
              
              {/* Bookmark button - decorative */}
              <button className="absolute top-4 right-4 p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition">
                <Bookmark className="w-4 h-4" />
              </button>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-white/90 transition">
                  {enrollment.course.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="w-4 h-4 text-yellow-400" 
                        fill={star <= (enrollment.course.courseRatings || 4) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-white/80 text-xs ml-2">
                    {enrollment.course.courseRatings || "4.0"} • {enrollment.course.activeLearners || "150"}+ learners
                  </span>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-5 flex-1 flex flex-col">
              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-base font-medium text-gray-800 dark:text-gray-200 block">
                      আপনার অগ্রগতি
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 block">
                      Your Progress
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${isCompleted ? 'text-green-600 dark:text-green-400' : 'text-indigo-600 dark:text-indigo-400'}`}>
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress 
                  value={progressPercentage} 
                  className={cn(
                    "h-2 bg-gray-100 dark:bg-gray-700",
                    isCompleted 
                      ? "[&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500"
                      : "[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-600"
                  )}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-5">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span className="text-base">{enrollment.course.chapters.length} অধ্যায়</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 pl-6">
                    {enrollment.course.chapters.length} Chapters
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="text-base">{enrollment.course.estimatedHours || '৫'} ঘণ্টা</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 pl-6">
                    {enrollment.course.estimatedHours || '5'} Hours
                  </span>
                </div>
              </div>

              {/* Continue/Complete Button */}
              <div className="mt-auto">
                {isCompleted ? (
                  <div className="flex flex-col items-center justify-center p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span className="font-medium text-base">কোর্স সম্পন্ন!</span>
                    </div>
                    <span className="text-xs mt-0.5">Course Completed!</span>
                  </div>
                ) : (
                  <Link 
                    href={`/courses/${enrollment.course.id}/learn`}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="font-medium text-base mr-1">শিক্ষা চালিয়ে যান</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <span className="text-xs">Continue Learning</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 