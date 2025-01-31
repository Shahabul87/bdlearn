"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const ValueCard = ({ icon: Icon, title, description, index }: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => {
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
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}; 