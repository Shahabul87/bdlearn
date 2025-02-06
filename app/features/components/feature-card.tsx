"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 hover:bg-white/10 
        shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        border border-white/10 backdrop-blur-sm
        dark:bg-gray-900/30 dark:hover:bg-gray-800/40"
    >
      <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-purple-500 to-blue-500 
        transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 
            ring-1 ring-purple-500/20 backdrop-blur-sm">
            <Icon className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400" />
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent 
            dark:from-white dark:to-gray-300">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 
        rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 group-hover:opacity-75 transition-opacity" />
    </motion.div>
  );
}; 