"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseSidebar } from "./course-sidebar";
import { CourseContentClient } from "./course-content-client";
import { cn } from "@/lib/utils";
import { Course, Chapter, Section } from "@prisma/client";

interface CourseContentWrapperProps {
  course: Course & {
    chapters: (Chapter & {
      sections: Section[];
    })[];
  };
  initialSectionData: any;
  initialType: string;
  initialSectionId: string | null;
}

export const CourseContentWrapper = ({ 
  course, 
  initialSectionData,
  initialType,
  initialSectionId 
}: CourseContentWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(288);
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const [activeContent, setActiveContent] = useState<{
    type: string;
    id: string | null;
  }>({
    type: initialType,
    id: initialSectionId
  });

  const handleContentSelect = (type: string, id: string | null) => {
    // Update state first
    setActiveContent({ type, id });
    
    // Create new URLSearchParams
    const params = new URLSearchParams();
    params.set('type', type);
    if (id) {
      params.set('sectionId', id);
    } else {
      params.delete('sectionId');
    }
    
    // Use router.push instead of replace to update URL
    router.push(`${window.location.pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const type = searchParams.get('type') || "overview";
    const id = searchParams.get('sectionId') || null;
    setActiveContent({ type, id });
  }, [searchParams]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle sidebar resize
  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e: MouseEvent) => {
    if (isResizing && resizeRef.current) {
      const newWidth = e.clientX;
      if (newWidth >= 240 && newWidth <= 480) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResizing]);

  // Add window width listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Set initial width
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slideVariants = {
    hidden: { 
      x: "-100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="h-full flex relative">
      {/* Desktop Sidebar */}
      <aside 
        ref={resizeRef}
        style={{ 
          width: isDesktopSidebarOpen ? `${sidebarWidth}px` : '0',
          minWidth: isDesktopSidebarOpen ? '240px' : '0',
          maxWidth: isDesktopSidebarOpen ? '480px' : '0',
        }}
        className={cn(
          "hidden md:block",
          "h-full",
          "border-r border-gray-200/80 dark:border-gray-700/50",
          "bg-white/90 dark:bg-gray-900/90",
          "overflow-y-auto",
          "transition-all duration-300 ease-in-out",
          !isDesktopSidebarOpen && "w-0 opacity-0"
        )}
      >
        <div className="relative h-full">
          <CourseSidebar 
            course={course}
            progressCount={0}
            onSelectContent={handleContentSelect}
          />
          
          {/* Resize Handle */}
          {isDesktopSidebarOpen && (
            <div
              onMouseDown={startResizing}
              className={cn(
                "absolute top-0 right-0 h-full w-1",
                "cursor-col-resize",
                "hover:bg-purple-500/20",
                isResizing && "bg-purple-500/20",
                "transition-colors"
              )}
            />
          )}
        </div>
      </aside>

      {/* Toggle Button - Always visible on desktop */}
      <button
        onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
        className={cn(
          "hidden md:flex",
          "fixed",
          "items-center justify-center",
          "z-50",
          isDesktopSidebarOpen 
            ? "left-[240px] hover:left-[238px]" 
            : "left-4",
          "top-24",
          "p-1.5 rounded-full",
          "bg-white dark:bg-gray-900",
          "border border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-md",
          "hover:bg-gray-50 dark:hover:bg-gray-800",
          "transition-all duration-300"
        )}
      >
        {isDesktopSidebarOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Main Content */}
      <main 
        style={{ 
          width: isDesktopSidebarOpen && windowWidth >= 768 
            ? `calc(100% - ${sidebarWidth}px)` 
            : '100%'
        }}
        className={cn(
          "h-full",
          "transition-all duration-300",
          "relative",
          "w-full md:w-auto"
        )}
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden absolute left-4 top-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg bg-white/90 dark:bg-gray-900/90 shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={cn(
                  "fixed left-0 top-0 h-full w-[80%] max-w-[320px]",
                  "bg-white dark:bg-gray-900",
                  "border-r border-gray-200 dark:border-gray-700",
                  "z-50 md:hidden",
                  "overflow-y-auto",
                  "shadow-xl"
                )}
              >
                {/* Add Close Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "absolute right-2 top-2",
                    "p-2 rounded-lg",
                    "bg-gray-100 dark:bg-gray-800",
                    "hover:bg-gray-200 dark:hover:bg-gray-700",
                    "transition-colors duration-200"
                  )}
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>

                <CourseSidebar 
                  course={course}
                  progressCount={0}
                  onSelectContent={(type, id) => {
                    handleContentSelect(type, id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <CourseContentClient
          course={course}
          chapters={course.chapters}
          activeContent={activeContent}
          sectionData={initialSectionData}
        />
      </main>
    </div>
  );
}; 