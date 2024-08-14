"use client";
import { InfiniteMovingCardsDemo } from "./infinite-moving-cards-demo";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import Link from "next/link";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "iSham",
      className: "text-blue-500 dark:text-blue-500"
    },
    {
      text: "Learning",
    },
    {
      text: "Paradigm.",
      className: "text-blue-500 dark:text-blue-500",
    },
    
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[30rem]">
      
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mt-20 ">
      Every lesson is a brushstroke on the canvas of our minds.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="w-80 flex items-center justify-center rounded-xl bg-blue-500 hover:bg-violet-700 border dark:border-white border-transparent text-white text-2xl p-4">
        Get started with learning
        </div>
        <div className="w-80 flex items-center justify-center rounded-xl bg-slate-700 hover:bg-violet-700 border dark:border-white border-transparent text-white text-2xl p-4">
        Get started with learning
        </div>
        </div>
   
    </div>
  );
}
