import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Trophy } from "lucide-react";

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

        // Find the first incomplete chapter, or use the first chapter if all are complete
        const nextChapter = enrollment.course.chapters.find((chapter: any) => 
          !chapter.userProgress?.[0]?.isCompleted
        ) || enrollment.course.chapters[0];

        return (
          <Link 
            href={`/courses/${enrollment.course.id}/learn`}
            key={enrollment.courseId}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Course Image */}
            <div className="aspect-video relative">
              <Image
                src={enrollment.course.imageUrl || "/default-course.jpg"}
                alt={enrollment.course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-semibold text-lg line-clamp-2">
                  {enrollment.course.title}
                </h3>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-4">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Your Progress
                  </span>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{enrollment.course.chapters.length} Chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{enrollment.course.estimatedHours}h</span>
                </div>
                {progress === enrollment.course.chapters.length && (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <Trophy className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}; 