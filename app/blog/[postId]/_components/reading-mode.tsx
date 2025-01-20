"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Sun, Moon, Type, AlignLeft, AlignCenter, Minus, Plus, Layout } from "lucide-react";
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
  const [fontSize, setFontSize] = useState(16);
  const [alignment, setAlignment] = useState<'left' | 'center'>('left');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeMode, setActiveMode] = useState(1); // Default to first mode

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const content = transformPostChapters(post.postchapter);

  const readingModes = [
    { id: 1, name: "Sticky Scroll", icon: Layout },
    { id: 2, name: "Chapter Cards", icon: Book },
    { id: 3, name: "Model Two", icon: Layout },
    { id: 4, name: "Carousel", icon: Layout },
  ];

  return (
    <div className="space-y-6">
      {/* Reading Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Reading Mode
            </span>
          </div>
          
          <div className="h-4 w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50" />
          
          {/* Mode Selection */}
          <div className="flex items-center gap-2">
            {readingModes.map((mode) => (
              <Button
                key={mode.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveMode(mode.id)}
                className={cn(
                  "transition-all duration-200",
                  activeMode === mode.id 
                    ? "bg-purple-500/20 text-purple-300" 
                    : "text-gray-400 hover:text-gray-300"
                )}
              >
                <mode.icon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{mode.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme and Alignment Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={cn(
                "transition-all duration-200",
                theme === 'light' ? "text-yellow-400 hover:text-yellow-300" : "text-blue-400 hover:text-blue-300"
              )}
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAlignment(alignment === 'left' ? 'center' : 'left')}
              className="text-gray-400 hover:text-gray-300 transition-all duration-200"
            >
              {alignment === 'left' ? <AlignLeft className="w-4 h-4" /> : <AlignCenter className="w-4 h-4" />}
            </Button>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-400" />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="text-gray-400 hover:text-gray-300"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-sm font-medium text-gray-300 min-w-[2rem] text-center">
                {fontSize}px
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="text-gray-400 hover:text-gray-300"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Display */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "prose prose-invert max-w-none",
          theme === 'light' && "prose-light",
          alignment === 'center' && "text-center"
        )}
        style={{ 
          fontSize: `${fontSize}px`,
          backgroundColor: theme === 'light' ? 'rgb(255, 255, 255, 0.05)' : 'transparent',
          padding: '2rem',
          borderRadius: '0.75rem',
          border: '1px solid rgba(107, 114, 128, 0.1)',
        }}
      >
        {activeMode === 1 && <StickyScroll content={content} />}
        {activeMode === 2 && (
          <div className="space-y-6">
            {post.postchapter.map((chapter: any, index: number) => (
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
          <div className="p-10">
            <PostCardModelTwo data={post.postchapter} />
          </div>
        )}
        {activeMode === 4 && (
          <div className="p-10">
            <PostCardCarouselDemo postchapter={post.postchapter} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ReadingModes;
