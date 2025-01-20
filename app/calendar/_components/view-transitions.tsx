"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ViewTransitionProps {
  view: "month" | "week" | "day";
  children: React.ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export const ViewTransition = ({ view, children }: ViewTransitionProps) => {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={view}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className={cn(
            "w-full",
            "absolute top-0 left-0",
            view === "month" && "relative"
          )}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}; 