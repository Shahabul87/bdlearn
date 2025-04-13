"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, School, BookOpen } from "lucide-react";

interface HeroSectionProps {
  textVariants: {
    hidden: { opacity: number; y: number };
    visible: (i: number) => {
      opacity: number;
      y: number;
      transition: {
        delay: number;
        duration: number;
        ease: number[];
      };
    };
  };
}

const HeroSection = ({ textVariants }: HeroSectionProps) => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-[#f8f9ff] dark:bg-gradient-to-b dark:from-gray-900/80 dark:via-gray-900 dark:to-gray-950">
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-[0.03] dark:opacity-[0.05]"></div>
        
        {/* Animated decorative circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.8 }}
          className="absolute top-40 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.8, delay: 0.2 }}
          className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#3b82f6]/10 to-[#8b5cf6]/10 blur-3xl"
        />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]">
          <div className="w-full h-full" 
            style={{ 
              backgroundImage: `radial-gradient(#4f46e5 0.5px, transparent 0.5px), radial-gradient(#4f46e5 0.5px, transparent 0.5px)`,
              backgroundSize: `20px 20px`,
              backgroundPosition: `0 0, 10px 10px` 
            }}>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#6366f1] rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="mb-6 pt-2"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              <span className="text-[#4f46e5] dark:text-[#a5b4fc]">
                বিশ্ববিদ্যালয় কোর্স এক্সপ্লোর
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="max-w-3xl mx-auto mb-12 text-lg text-gray-600 dark:text-gray-300"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            বাংলাদেশের বিভিন্ন বিশ্ববিদ্যালয়ের সকল কোর্স সম্পর্কে জানুন এবং আপনার পছন্দের কোর্স খুঁজে নিন। বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি, কোর্স সিলেকশন, এবং ক্যারিয়ার প্ল্যানিং সম্পর্কে বিস্তারিত তথ্য পাবেন এখানেই।
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.05)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-[#e0e7ff] dark:bg-gray-800/80 dark:border-gray-700"
            >
              <div className="p-1.5 rounded-full bg-[#4f46e5]/10 dark:bg-[#4f46e5]/20">
                <GraduationCap className="w-5 h-5 text-[#4f46e5]" />
              </div>
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">১০০+ কোর্স</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-[#e0e7ff] dark:bg-gray-800/80 dark:border-gray-700"
            >
              <div className="p-1.5 rounded-full bg-[#8b5cf6]/10 dark:bg-[#8b5cf6]/20">
                <School className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">৫০+ বিশ্ববিদ্যালয়</span>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)" }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-sm border border-[#e0e7ff] dark:bg-gray-800/80 dark:border-gray-700"
            >
              <div className="p-1.5 rounded-full bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20">
                <BookOpen className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">১৫+ ফ্যাকাল্টি</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 -z-10 opacity-30 dark:opacity-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <Image
            src="/assets/decoration-1.svg"
            alt="Decoration"
            width={400}
            height={400}
            className="w-56 h-56 md:w-72 md:h-72"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-20 right-10 -z-10 opacity-30 dark:opacity-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src="/assets/decoration-2.svg"
            alt="Decoration"
            width={400}
            height={400}
            className="w-56 h-56 md:w-72 md:h-72"
          />
        </motion.div>
      </div>
      
      {/* Floating Particles */}
      <motion.div 
        className="absolute top-1/3 left-20"
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-6 rounded-full bg-[#4f46e5]/20 dark:bg-[#4f46e5]/30 blur-sm"></div>
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-1/4"
        animate={{
          y: [0, -20, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-4 h-4 rounded-full bg-[#8b5cf6]/20 dark:bg-[#8b5cf6]/30 blur-sm"></div>
      </motion.div>
      <motion.div 
        className="absolute top-2/3 right-20"
        animate={{
          y: [0, 12, 0],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[#3b82f6]/20 dark:bg-[#3b82f6]/30 blur-sm"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 