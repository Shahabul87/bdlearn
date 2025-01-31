"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const WhatInspiredMe = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 relative overflow-hidden px-4 py-16 sm:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 dark:from-purple-500/5" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 dark:from-blue-500/5" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Having 12 years of teaching experience inspired me to build this plaform
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0"
          >
            Dedicated to transforming education through innovative teaching methods and personalized learning experiences. My journey has been about inspiring students and making complex concepts accessible to all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-base sm:text-lg flex items-center gap-2 hover:shadow-lg transition-shadow dark:shadow-purple-500/20"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative dots - Responsive positioning */}
          <div className="absolute top-5 sm:top-10 left-5 sm:left-10 grid grid-cols-3 gap-1 sm:gap-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-purple-500 dark:bg-purple-400"
              />
            ))}
          </div>
          <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 grid grid-cols-3 gap-1 sm:gap-2">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-blue-500 dark:bg-blue-400"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 