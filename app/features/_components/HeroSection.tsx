"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/hero-bg.jpg" // Add your hero background image
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Learn. Build.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Master.
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            A platform designed for practical skill development, not just theoretical knowledge.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg"
          >
            Start Learning Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}; 