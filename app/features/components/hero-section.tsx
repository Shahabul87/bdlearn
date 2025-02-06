"use client";

import { motion } from "framer-motion";

export const HeroSection = () => {
  const firstText = "Build Real Skills for ";
  const secondText = "Real Growth";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 via-gray-800/95 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            initial={{ display: "inline-block" }}
            animate={{ display: "inline-block" }}
          >
            {Array.from(firstText).map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <br className="md:hidden" />
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 ml-0 md:ml-2"
            initial={{ display: "inline-block" }}
            animate={{ display: "inline-block" }}
          >
            {Array.from(secondText).map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: (index + firstText.length) * 0.05
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-gray-200 text-lg max-w-2xl mx-auto"
        >
          A platform designed for practical skill development, not just theoretical knowledge.
          Learn, practice, and master the skills that matter in today&apos;s world.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
        >
          Start Your Journey
        </motion.button>
      </motion.div>
    </div>
  );
}; 