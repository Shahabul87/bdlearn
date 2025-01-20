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
      <div className="w-full h-full py-8">
        <div className="space-y-2 mb-8">
          <h2 className={cn(
            "max-w-7xl pl-4 mx-auto",
            "text-2xl md:text-4xl lg:text-5xl font-bold",
            "bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200",
            "bg-clip-text text-transparent",
            "tracking-tight leading-tight",
            "font-heading"
          )}>
            Explore Chapters
          </h2>
          <p className={cn(
            "max-w-7xl pl-4 mx-auto",
            "text-sm md:text-base",
            "text-gray-400/80",
            "font-light tracking-wide"
          )}>
            Click on any chapter to view full details
          </p>
        </div>
        <Carousel items={cards} />
      </div>

      {/* Modal */}
      {showModal && selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-6xl mx-4" style={{ marginTop: "calc(64px + 2rem)" }}>
            <div className="relative w-full rounded-2xl bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-gray-700/30 shadow-2xl backdrop-blur-sm">
              <div className="sticky top-0 z-50 w-full flex justify-end bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-transparent backdrop-blur-sm">
                <button
                  onClick={() => setShowModal(false)}
                  className={cn(
                    "m-4",
                    "p-2 rounded-full",
                    "bg-gray-800/80 hover:bg-gray-700/80",
                    "text-gray-400 hover:text-gray-200",
                    "transition-all duration-200",
                    "shadow-lg ring-1 ring-gray-700/50"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 lg:p-10 space-y-6 -mt-14">
                <div className="flex items-center gap-4 pt-14">
                  <span className={cn(
                    "text-sm font-medium",
                    "bg-gradient-to-r from-purple-500/90 to-blue-500/90",
                    "px-3 py-1 rounded-full",
                    "text-white/95",
                    "shadow-lg shadow-purple-500/10",
                    "border border-purple-400/20"
                  )}>
                    Chapter {selectedChapter.position || 1}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-transparent" />
                </div>

                <h3 className={cn(
                  "text-3xl lg:text-4xl xl:text-5xl font-bold",
                  "bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200",
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
                  "prose prose-invert max-w-none",
                  "text-base lg:text-lg",
                  "text-gray-300/90",
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
                    <div className="h-1 w-1 rounded-full bg-purple-400/50" />
                    <div className="h-1 w-1 rounded-full bg-blue-400/50" />
                    <div className="h-1 w-1 rounded-full bg-cyan-400/50" />
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
        "bg-gradient-to-r from-purple-200/80 to-blue-200/80",
        "bg-clip-text text-transparent",
        "font-medium"
      )}>
        No chapter data available.
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-gradient-to-br from-gray-900/90 to-gray-800/90",
      "backdrop-blur-sm",
      "p-8 md:p-14 rounded-3xl mb-4",
      "border border-gray-700/50"
    )}>
      <div className="flex items-center gap-4 mb-6">
        <span className={cn(
          "text-sm font-medium",
          "bg-gradient-to-r from-purple-400/80 to-blue-400/80",
          "px-3 py-1 rounded-full",
          "text-white/90"
        )}>
          Chapter {chapter.position || 1}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent" />
      </div>

      <div className={cn(
        "prose prose-invert max-w-4xl mx-auto",
        "text-base md:text-lg lg:text-xl",
        "font-light tracking-wide",
        "leading-relaxed"
      )}>
        <div
          dangerouslySetInnerHTML={{
            __html: chapter.description || "No description available",
          }}
          className={cn(
            "text-gray-300/90",
            "text-justify"
          )}
        />
      </div>

      {chapter.imageUrl && (
        <div className="relative w-full h-[30rem] mt-8 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl z-10" />
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
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl z-20" />
        </div>
      )}

      <div className="hidden lg:block mt-6">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-purple-400/50" />
          <div className="h-1 w-1 rounded-full bg-blue-400/50" />
          <div className="h-1 w-1 rounded-full bg-cyan-400/50" />
        </div>
      </div>
    </div>
  );
};

export default PostCardCarouselDemo;
  



