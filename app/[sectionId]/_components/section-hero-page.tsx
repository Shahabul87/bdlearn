"use client";

import { cn } from "@/lib/utils";

interface SectionHeroPageProps {
  title: string;
  description: string | null;
  videoUrl: string | null;
  isFree: boolean;
  courseTitle: string;
  chapterTitle: string;
}

export default function SectionHeroPage({
  title,
  description,
  videoUrl,
  courseTitle,
  chapterTitle,
}: SectionHeroPageProps) {
  const getVideoId = (url: string | null) => {
    if (!url) return null;
    try {
      if (url.includes('youtu.be')) {
        return url.split('youtu.be/')[1]?.split('?')[0];
      }
      if (url.includes('youtube.com')) {
        return url.split('v=')[1]?.split('&')[0];
      }
      return null;
    } catch {
      return null;
    }
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0&showinfo=0` : null;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Course Navigation */}
        <div className={cn(
          "flex items-center gap-2 text-xs sm:text-sm",
          "text-gray-600 dark:text-gray-400"
        )}>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            {courseTitle}
          </span>
          <span>/</span>
          <span className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            {chapterTitle}
          </span>
        </div>

        {/* Title and Description */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className={cn(
            "text-xl sm:text-2xl md:text-3xl font-bold",
            "text-gray-900 dark:text-white",
            "leading-tight"
          )}>
            {title}
          </h1>
          {description && (
            <p className={cn(
              "text-sm sm:text-base",
              "text-gray-600 dark:text-gray-400",
              "leading-relaxed"
            )}>
              {description}
            </p>
          )}
        </div>

        {/* Video Section */}
        {embedUrl && (
          <div className={cn(
            "relative w-full overflow-hidden rounded-lg sm:rounded-xl",
            "border border-gray-200 dark:border-gray-700/50",
            "aspect-video",
            "bg-gray-100 dark:bg-gray-800/50",
            "shadow-lg"
          )}>
            <iframe
              className="absolute top-0 left-0 h-full w-full"
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
}

