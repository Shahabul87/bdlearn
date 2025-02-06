"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const NavigationArrows = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const tabsList = document.querySelector('[role="tablist"]')?.parentElement;
    if (tabsList) {
      setShowLeftArrow(tabsList.scrollLeft > 0);
      setShowRightArrow(
        tabsList.scrollLeft < tabsList.scrollWidth - tabsList.clientWidth
      );
    }
  };

  useEffect(() => {
    const tabsList = document.querySelector('[role="tablist"]')?.parentElement;
    if (tabsList) {
      tabsList.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
    }

    return () => {
      tabsList?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    const tabsList = document.querySelector('[role="tablist"]')?.parentElement;
    if (tabsList) {
      tabsList.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const tabsList = document.querySelector('[role="tablist"]')?.parentElement;
    if (tabsList) {
      tabsList.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      {showLeftArrow && (
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
            bg-white/80 backdrop-blur-sm border border-gray-200
            dark:bg-gray-800/90 dark:border-gray-700
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-all duration-200
            shadow-md
            md:hidden"
          onClick={scrollLeft}
        >
          <ChevronLeft className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
      )}

      {showRightArrow && (
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
            bg-white/80 backdrop-blur-sm border border-gray-200
            dark:bg-gray-800/90 dark:border-gray-700
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-all duration-200
            shadow-md
            md:hidden"
          onClick={scrollRight}
        >
          <ChevronRight className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
      )}
    </>
  );
}; 