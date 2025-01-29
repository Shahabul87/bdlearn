"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Carousel, Card } from "./post-card-carousel-model";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ChapterData {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  postId: string;
  isPublished: boolean;
  isFree: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

interface PostCardModelTwoProps {
  postchapter: ChapterData[];
}

export const PostCardCarouselDemo: React.FC<PostCardModelTwoProps> = ({ postchapter }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const placeholderImage = 'https://via.placeholder.com/300';

  const data = postchapter.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    src: chapter.imageUrl || placeholderImage,
    content: (
      <div onClick={() => {
        setSelectedChapter(chapter);
        setShowModal(true);
      }}>
        <DummyContent postchapter={[chapter]} />
      </div>
    ),
  }));

  const cards = data.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));

  return (
    <>
      <div className="w-full h-full py-2">
        <div className="space-y-2 mb-2">
          <h2 className={cn(
            "max-w-7xl pl-4 mx-auto",
            "text-2xl md:text-4xl lg:text-5xl font-bold",
            "bg-gradient-to-r dark:from-purple-100 dark:via-blue-100 dark:to-cyan-100 from-indigo-700 via-blue-700 to-cyan-700",
            "bg-clip-text text-transparent",
            "tracking-tight leading-tight",
            "font-heading"
          )}>
            Explore Chapters
          </h2>
          <p className={cn(
            "max-w-7xl pl-4 mx-auto",
            "text-sm md:text-base",
            "text-gray-600 dark:text-gray-400/80",
            "font-light tracking-wide"
          )}>
            Click on any chapter to view full details
          </p>
        </div>
        <Carousel items={cards} />
      </div>

      {/* Modal */}
      {showModal && selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-white/90 dark:bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl mx-4" style={{ marginTop: "calc(64px + 2rem)" }}>
            <div className="relative w-full rounded-2xl bg-gradient-to-br from-gray-50/95 via-gray-100/95 to-gray-50/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 border border-gray-200/30 dark:border-gray-700/30 shadow-2xl backdrop-blur-sm">
              <div className="sticky top-0 z-50 w-full flex justify-end bg-gradient-to-b from-gray-50/95 via-gray-50/80 to-transparent dark:from-gray-900/95 dark:via-gray-900/80 dark:to-transparent backdrop-blur-sm">
                <button
                  onClick={() => setShowModal(false)}
                  className={cn(
                    "m-4",
                    "p-2 rounded-full",
                    "bg-gray-200/80 hover:bg-gray-300/80 dark:bg-gray-800/80 dark:hover:bg-gray-700/80",
                    "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
                    "transition-all duration-200",
                    "shadow-lg ring-1 ring-gray-300/50 dark:ring-gray-700/50"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 lg:p-10 space-y-6 -mt-14">
                <div className="flex items-center gap-4 pt-14">
                  <span className={cn(
                    "text-sm font-medium",
                    "bg-gradient-to-r from-purple-500/90 to-blue-500/90 dark:from-purple-500/90 dark:to-blue-500/90",
                    "px-3 py-1 rounded-full",
                    "text-white/95",
                    "shadow-lg shadow-purple-500/10",
                    "border border-purple-400/20"
                  )}>
                    Chapter {selectedChapter.position || 1}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 dark:from-purple-500/30 via-blue-500/10 dark:via-blue-500/20 to-transparent" />
                </div>

                <h3 className={cn(
                  "text-3xl lg:text-4xl xl:text-5xl font-bold",
                  "bg-gradient-to-r dark:from-purple-100 dark:via-blue-100 dark:to-cyan-100 from-indigo-700 via-blue-700 to-cyan-700",
                  "bg-clip-text text-transparent",
                  "tracking-tight leading-tight",
                  "font-heading",
                  "drop-shadow-sm"
                )}>
                  {selectedChapter.title}
                </h3>

                {selectedChapter.imageUrl && (
                  <div className="relative w-full h-[40vh] lg:h-[50vh] rounded-xl overflow-hidden">
                    <Image
                      src={selectedChapter.imageUrl}
                      alt={selectedChapter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={cn(
                  "prose dark:prose-invert max-w-none",
                  "text-base lg:text-lg",
                  "text-gray-700 dark:text-gray-300/90",
                  "leading-relaxed tracking-wide"
                )}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedChapter.description || "No description available",
                    }}
                    className="text-justify"
                  />
                </div>

                <div className="hidden lg:block">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-400/30 dark:bg-purple-400/50" />
                    <div className="h-1 w-1 rounded-full bg-blue-400/30 dark:bg-blue-400/50" />
                    <div className="h-1 w-1 rounded-full bg-cyan-400/30 dark:bg-cyan-400/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DummyContent: React.FC<{ postchapter: ChapterData[] }> = ({ postchapter }) => {
  const chapter = postchapter[0];

  if (!chapter) {
    return (
      <div className={cn(
        "text-center",
        "bg-gradient-to-r from-purple-600/80 to-blue-600/80 dark:from-purple-200/80 dark:to-blue-200/80",
        "bg-clip-text text-transparent",
        "font-medium"
      )}>
        No chapter data available.
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-gray-50/90 to-gray-100/90 dark:from-gray-900/90 dark:to-gray-800/90",
      "backdrop-blur-sm",
      "p-8 md:p-14 rounded-3xl mb-4",
      "border border-gray-200/50 dark:border-gray-700/50"
    )}>
      <div className="flex items-center gap-4 mb-6">
        <span className={cn(
          "text-sm font-medium",
          "bg-gradient-to-r from-purple-500/90 to-blue-500/90 dark:from-purple-400/80 dark:to-blue-400/80",
          "px-3 py-1 rounded-full",
          "text-white"
        )}>
          Chapter {chapter.position || 1}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent" />
      </div>

      <div className={cn(
        "prose max-w-4xl mx-auto",
        "text-base md:text-lg lg:text-xl",
        "font-light tracking-wide",
        "leading-relaxed"
      )}>
        <div
          dangerouslySetInnerHTML={{
            __html: chapter.description || "No description available",
          }}
          className={cn(
            "text-gray-700 dark:text-gray-200",
            "text-justify",
            "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
            "prose-strong:text-gray-800 dark:prose-strong:text-white",
            "prose-em:text-gray-700 dark:prose-em:text-gray-200",
            "prose-code:text-gray-800 dark:prose-code:text-gray-200",
            "prose-a:text-blue-600 dark:prose-a:text-blue-400",
            "hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300"
          )}
        />
      </div>

      {chapter.imageUrl && (
        <div className="relative w-full h-[30rem] mt-8 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 dark:from-purple-500/10 to-blue-500/5 dark:to-blue-500/10 rounded-xl z-10" />
          <Image
            src={chapter.imageUrl}
            alt={chapter.title || "Chapter image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover rounded-xl",
              "transition-transform duration-500",
              "group-hover:scale-105"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 dark:from-gray-900/50 to-transparent rounded-xl z-20" />
        </div>
      )}

      <div className="hidden lg:block mt-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-purple-400/30 dark:bg-purple-400/50" />
          <div className="h-1 w-1 rounded-full bg-blue-400/30 dark:bg-blue-400/50" />
          <div className="h-1 w-1 rounded-full bg-cyan-400/30 dark:bg-cyan-400/50" />
        </div>
      </div>
    </div>
  );
};

export default PostCardCarouselDemo;
  



