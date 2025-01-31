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
    <div className="relative mb-12 mt-10 px-8">
      <div className="flex items-center gap-3 max-w-[1800px] mx-auto">
        {/* Decorative line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50px] h-[2px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        
        {/* Content with left padding for the line */}
        <div className="pl-16">
          <div className="flex items-center gap-3">
            <h1 
              className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} text-transparent bg-clip-text tracking-tight`}
            >
              {text}
            </h1>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className={`${iconColor}`}
            >
              <ArrowRight className="w-8 h-8" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientHeading; 