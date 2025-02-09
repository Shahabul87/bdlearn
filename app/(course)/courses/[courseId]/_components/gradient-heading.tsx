"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface GradientHeadingProps {
  text: string;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  iconColor: string;
}

const GradientHeading = ({ 
  text, 
  gradientFrom, 
  gradientVia, 
  gradientTo,
  iconColor 
}: GradientHeadingProps) => {
  return (
    <div className="relative mb-4 sm:mb-6 md:mb-6 mt-6 sm:mt-8 md:mt-10 px-4 sm:px-4 md:px-6">
      <div className="flex items-center gap-2 sm:gap-3 max-w-[1800px] mx-auto">
        <div className="pl-4 sm:pl-8 md:pl-10 lg:pl-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} text-transparent bg-clip-text tracking-tight`}
            >
              {text}
            </h1>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className={`${iconColor}`}
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientHeading; 