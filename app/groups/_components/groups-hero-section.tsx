"use client";

import { motion } from "framer-motion";
import { Search, Users2, Sparkles, Target } from "lucide-react";

export const GroupsHeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25px 25px, purple 2%, transparent 0%)",
          backgroundSize: "50px 50px"
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Learning{" "}
            <span className="text-purple-600 dark:text-purple-400">Communities</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Join groups that match your interests, collaborate with peers, and enhance your learning journey
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {[
            {
              icon: Users2,
              title: "Collaborative Learning",
              description: "Learn together with peers who share your interests and goals"
            },
            {
              icon: Sparkles,
              title: "Engaging Discussions",
              description: "Participate in meaningful conversations and knowledge sharing"
            },
            {
              icon: Target,
              title: "Focused Study Groups",
              description: "Join groups specific to your subjects and learning objectives"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 inline-block mb-4">
                <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 dark:via-purple-800 to-transparent" />
    </div>
  );
}; 