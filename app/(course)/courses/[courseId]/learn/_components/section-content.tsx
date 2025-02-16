"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Video, FileText, Code, CheckCircle } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "./video-player";
import { BlogContent } from "./blog-content";
import { CodeExplanation } from "./code-explanation";
import { NoteContent } from "./note-content";
import { cn } from "@/lib/utils";
import { Section, Chapter, Video as VideoType, Blog, Article, Note, CodeExplanation as CodeExplanationType, UserProgress } from "@prisma/client";
import { VideoContent } from "./video-content";
import { useRouter } from "next/navigation";

interface SectionWithRelations extends Section {
  chapter: Chapter & {
    sections: Section[];
  };
  videos: VideoType[];
  blogs: Blog[];
  articles: Article[];
  notes: Note[];
  codeExplanations: CodeExplanationType[];
  userProgress: UserProgress[];
}

interface SectionContentProps {
  courseId: string;
  chapterId: string;
  section: SectionWithRelations;
}

export const SectionContent = ({
  courseId,
  chapterId,
  section,
}: SectionContentProps) => {
  const router = useRouter();

  // Calculate next and prev sections from chapter's sections array
  const currentSectionIndex = section.chapter.sections.findIndex(
    (s) => s.id === section.id
  );

  const nextSection = section.chapter.sections[currentSectionIndex + 1] || null;
  const prevSection = section.chapter.sections[currentSectionIndex - 1] || null;

  const getContentIcon = () => {
    switch (section.type) {
      case "video":
        return <Video className="h-6 w-6 text-purple-500" />;
      case "article":
        return <FileText className="h-6 w-6 text-blue-500" />;
      case "blog":
        return <BookOpen className="h-6 w-6 text-pink-500" />;
      case "code":
        return <Code className="h-6 w-6 text-green-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  // Handle navigation with loading state
  const handleNavigation = (path: string) => {
    try {
      // Show loading state if needed
      router.push(path);
    } catch (error) {
      console.error("Navigation failed:", error);
      // Fallback to window.location
      window.location.href = path;
    }
  };

  return (
    <div className="max-w-5xl lg:max-w-7xl mx-auto p-6 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Back to Chapter Link */}
        <div className="flex items-center justify-between">
          <Link 
            href={`/courses/${courseId}/learn/${chapterId}`}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chapter
          </Link>
        </div>

        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {getContentIcon()}
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              {section.title}
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize pl-9">
            {section.videoUrl && (
              <VideoPlayer 
                videoUrl={section.videoUrl}
                courseId={courseId}
                chapterId={chapterId}
                sectionId={section.id}
              />
            )}
          </div>
        </div>

        

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {prevSection && (
            <Link
              href={`/courses/${courseId}/learn/${chapterId}/sections/${prevSection.id}`}
              className="group flex items-start gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 p-4 rounded-lg transition-all"
            >
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Previous</div>
                <div className="text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-purple-400">
                  {prevSection.title}
                </div>
              </div>
            </Link>
          )}

          {nextSection && (
            <Link
              href={`/courses/${courseId}/learn/${chapterId}/sections/${nextSection.id}`}
              className="group flex items-start gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 p-4 rounded-lg transition-all text-right"
            >
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Next</div>
                <div className="text-base font-medium text-slate-700 dark:text-slate-300 group-hover:text-purple-700 dark:group-hover:text-purple-400">
                  {nextSection.title}
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          )}
        </div>
        {/* Section Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <div className="mb-8 mx-auto flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 bg-clip-text text-transparent inline-flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-500" />
                Additional Resources
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Explore supplementary materials to enhance your learning experience
              </p>
            </div>
            
            {section.videos && (
              <VideoContent 
                content={section.videos}
                courseId={courseId}
                chapterId={chapterId}
                sectionId={section.id}
              />
            )}
            
            {section.blogs && (
              <BlogContent 
                content={section.blogs}
                courseId={courseId}
                chapterId={chapterId}
                sectionId={section.id}
              />
            )}

          </div>
        </motion.div>
        {/* Code Explanation Section*/}
        {section.codeExplanations && section.codeExplanations.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="mb-8 mx-auto flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 bg-clip-text text-transparent inline-flex items-center gap-2">
                  <Code className="h-6 w-6 text-purple-500" />
                  Code Explanations
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Detailed explanations of code implementations and examples
                </p>
              </div>
              
              <CodeExplanation 
                content={section.codeExplanations}
                courseId={courseId}
                chapterId={chapterId}
                sectionId={section.id}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}; 