
"use client";

import { TypewriterEffectSmoothDemo } from "@/components/typewriterdemo"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"



const words = [
  {
    text: "Welcome",
  },
  {
    text: "to",
  },
  {
    text: "iSham",
    className: "text-fuchsia-500 dark:text-blue-500"
  },
  {
    text: "Learning",
  },
  {
    text: "Paradigm.",
    className: "text-cyan-400 dark:text-blue-500",
  },
  
];

export const HomeComponentOne = ()=> {
    return (
        <>
          <div className="min-h-max md:h-[600px] mt-5 md:mt-[80px] ">    
            <div className="flex flex-col items-center justify-center md:h-[30rem] lg:h-[35rem]  lg:space-y-5 bg-gray-800">
              
              <p className="text-center text-white font-semibold dark:text-neutral-200 text-md sm:text-base md:text-xl lg:text-2xl mt-10 md:mt-20 px-4 ">
                Every lesson is a brushstroke on the canvas of our minds.
              </p>
              <h2 className="text-2xl md:text-5xl lg:text-8xl font-bold">
              <TypewriterEffectSmooth words={words} />
            </h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mb-4">
              <button className="w-40 h-10 rounded-xl bg-gray-700  border dark:border-white border-white/30 text-white text-sm">
                Join now
              </button>
              <button className="w-40 h-10 rounded-xl bg-blue-500 text-white border border-white/30  text-sm">
                Signup
              </button>
            </div>
        
          </div>  
          </div>
          
        </>
    )
}