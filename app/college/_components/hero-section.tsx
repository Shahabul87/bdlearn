"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Clock, Award, ArrowRight } from "lucide-react";

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const highlightVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.4
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8
    }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export default function HeroSection() {
  return (
    <section className="relative py-12 lg:py-20 overflow-hidden">
      {/* Background pattern/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"></div>
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5 dark:opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 mt-8 lg:mt-0">
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
            >
              আপনার {" "}
              <motion.span 
                variants={highlightVariants}
                initial="hidden"
                animate="visible"
                className="text-emerald-500 inline-block"
              >
                কলেজ শিক্ষা
              </motion.span>{" "}
              <br className="hidden sm:block" />
              আধুনিক রূপে
            </motion.h1>
            
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl"
            >
              বাংলাদেশের শ্রেষ্ঠ শিক্ষকদের সাথে অনলাইনে শিখুন, HSC পরীক্ষায় সফলতা অর্জন করুন, এবং উজ্জ্বল ভবিষ্যত গড়ুন।
            </motion.p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link href="/courses/college/hsc">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm sm:text-base">HSC কোর্স দেখুন</span>
                </motion.button>
              </Link>
              <Link href="/college/admission">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="px-4 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-md flex items-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-sm sm:text-base">ভর্তি তথ্য</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Features */}
            <motion.div 
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              <motion.div variants={featureItemVariants} className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">অভিজ্ঞ শিক্ষক</span>
              </motion.div>
              <motion.div variants={featureItemVariants} className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">24/7 সাপোর্ট</span>
              </motion.div>
              <motion.div variants={featureItemVariants} className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">সার্টিফিকেট</span>
              </motion.div>
              <motion.div variants={featureItemVariants} className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">রিসোর্স সমূহ</span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/college-students.webp" 
                alt="বাংলাদেশী কলেজ শিক্ষার্থী" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              
              {/* Floating stats card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-3">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center sm:text-left"
                  >
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">সর্বমোট শিক্ষার্থী</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">১৫,০০০+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-center"
                  >
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">কোর্স সংখ্যা</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">৫০+</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="w-full sm:w-auto flex justify-center"
                  >
                    <Link 
                      href="/courses/college" 
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
                    >
                      সকল কোর্স <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-amber-400 dark:bg-amber-600 rounded-full blur-2xl"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 w-24 h-24 sm:w-40 sm:h-40 bg-blue-500 dark:bg-blue-700 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 