"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  id:string;
  src: string;
  title: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn(
            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden",
            "bg-gradient-to-l from-white/20 to-transparent dark:from-gray-900/20 dark:to-transparent"
          )} />

          <div className={cn(
            "flex flex-row justify-start gap-4 pl-4",
            "max-w-7xl mx-auto"
          )}>
            {items.map((item, index) => (
              <motion.div
                key={`card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className={cn(
              "relative z-40 h-10 w-10 rounded-full",
              "bg-white dark:bg-gray-800",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200",
              "border border-gray-200 dark:border-gray-700"
            )}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            className={cn(
              "relative z-40 h-10 w-10 rounded-full",
              "bg-white dark:bg-gray-800",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200",
              "border border-gray-200 dark:border-gray-700"
            )}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
    card,
    index,
    layout = false,
  }: {
    card: Omit<Card, 'category'>;
    index: number;
    layout?: boolean;
  }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose } = useContext(CarouselContext);
  
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
          handleClose();
        }
      }
  
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
  
    useOutsideClick(containerRef, () => handleClose());
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      onCardClose(index);
    };
  
    return (
      <>
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto pt-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-md"
                onClick={handleClose}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                ref={containerRef}
                className={cn(
                  "relative w-full max-w-5xl mx-4",
                  "max-h-[85vh] overflow-y-auto",
                  "bg-white dark:bg-gray-800",
                  "rounded-2xl shadow-2xl",
                  "border border-gray-200/50 dark:border-gray-700/50",
                  "my-4"
                )}
              >
                <div className="sticky top-0 z-50 flex justify-end p-4 bg-gradient-to-b from-white/90 dark:from-gray-800/90 to-transparent backdrop-blur-sm">
                  <button
                    onClick={handleClose}
                    className={cn(
                      "p-2 rounded-full",
                      "bg-gray-100 dark:bg-gray-700",
                      "hover:bg-gray-200 dark:hover:bg-gray-600",
                      "transition-colors duration-200"
                    )}
                  >
                    <IconX className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                </div>
                
                <div className="p-6 md:p-8">
                  <motion.h2
                    layoutId={layout ? `title-${card.title}` : undefined}
                    className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6"
                  >
                    {card.title}
                  </motion.h2>
                  <div className={cn(
                    "prose max-w-none",
                    "prose-headings:text-gray-900 dark:prose-headings:text-white",
                    "prose-p:text-gray-700 dark:prose-p:text-gray-100",
                    "prose-strong:text-gray-900 dark:prose-strong:text-white",
                    "prose-em:text-gray-800 dark:prose-em:text-gray-100",
                    "prose-li:text-gray-700 dark:prose-li:text-gray-100",
                    "prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300",
                    "dark:prose-invert"
                  )}>
                    {card.content}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.button
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          className={cn(
            "rounded-3xl overflow-hidden",
            "bg-white dark:bg-gray-900",
            "h-80 w-56 md:h-[40rem] md:w-96",
            "flex flex-col items-start justify-start",
            "relative z-10",
            "border border-gray-200 dark:border-gray-800",
            "transition-transform duration-200 hover:scale-[1.02]"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-20" />
          <div className="relative z-30 p-8">
            <motion.h3
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance]"
            >
              {card.title}
            </motion.h3>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0 z-10 transition-transform duration-500 group-hover:scale-105"
          />
        </motion.button>
      </>
    );
  };
  
  

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
