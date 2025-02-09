"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Sun, Moon, Type, AlignLeft, AlignCenter, Minus, Plus, Layout, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { StickyScroll } from "./sticky-scroll-reveal";
import PostChapterCard from "./post-chapter-card";
import PostCardModelTwo from "./post-card-model-two";
import { PostCardCarouselDemo } from "./post-card-carousel-model-demo";
import { transformPostChapters } from "./transform-post-chapter";

interface ReadingModesProps {
  post: any;
}

const ReadingModes = ({ post }: ReadingModesProps) => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [alignment, setAlignment] = useState<'left' | 'center'>('left');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeMode, setActiveMode] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  // All hooks must be before any conditional returns
  useEffect(() => {
    setMounted(true);
    // Set initial mode based on screen size
    if (typeof window !== 'undefined') {
      const isLargeScreen = window.innerWidth >= 1024;
      setActiveMode(isLargeScreen ? 1 : 3);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      if (!isLargeScreen && (activeMode === 1 || activeMode === 2)) {
        setActiveMode(3); // Switch to Normal mode on smaller screens
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeMode]);

  // Handle font size change from slider
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(Math.min(Math.max(value[0], 12), 24)); // Clamp between 12 and 24
  };

  // Handle increment/decrement
  const incrementFontSize = () => {
    setFontSize(prev => Math.min(prev + 1, 24));
  };

  const decrementFontSize = () => {
    setFontSize(prev => Math.max(prev - 1, 12));
  };

  const content = transformPostChapters(post.postchapter);

  // Conditional return after all hooks
  if (!mounted) {
    return null;
  }

  const readingModes = [
    { id: 1, name: "Sticky Scroll", icon: Layout, desktopOnly: true },
    { id: 2, name: "Chapter Cards", icon: Book, desktopOnly: true },
    { id: 3, name: "Normal", icon: Layout, desktopOnly: false },
    { id: 4, name: "Carousel", icon: Layout, desktopOnly: false },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Reading Controls */}
      <div className="w-full px-2 sm:px-4 py-2">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 md:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm"
        >
          {/* Mode Selection */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs md:text-lg font-medium text-gray-900 dark:text-gray-100">
                  Reading Mode
                </span>
              </div>
              
            </div>

            <div className="grid grid-cols-2 sm:flex gap-1 sm:gap-2">
              {readingModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveMode(mode.id)}
                  className={cn(
                    "h-8 sm:h-9 px-2 sm:px-3 text-xs md:text-lg transition-all duration-200",
                    mode.desktopOnly ? "hidden lg:flex" : "flex",
                    activeMode === mode.id 
                      ? "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  )}
                >
                  <mode.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  <span className="truncate">{mode.name}</span>
                </Button>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full overflow-hidden">
        <div 
          className="mx-auto px-2 sm:px-2 md:px-6 py-4 max-w-full"
          style={{ 
            fontSize: `${fontSize}px`,
            width: "100%"
          }}
        >
          <div className="relative w-full overflow-hidden">
            {activeMode === 1 && (
              <div className="hidden lg:block w-full overflow-hidden">
                <StickyScroll content={content} />
              </div>
            )}
            {activeMode === 2 && (
              <div className="hidden lg:grid grid-cols-1 gap-4 sm:gap-6 w-full overflow-hidden">
                {post.postchapter.map((chapter: any, index: any) => (
                  <PostChapterCard
                    key={index}
                    title={chapter.title}
                    description={chapter.description}
                    imageUrl={chapter.imageUrl}
                  />
                ))}
              </div>
            )}
            {activeMode === 3 && (
              <div className="w-full overflow-hidden">
                <PostCardModelTwo data={post.postchapter} />
              </div>
            )}
            {activeMode === 4 && (
              <div className="w-full text-center p-4 overflow-hidden">
                <PostCardCarouselDemo postchapter={post.postchapter} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingModes;
