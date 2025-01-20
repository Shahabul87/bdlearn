"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { Users2, Star } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  category: string;
}

export const CourseCardHome = ({
  id,
  title,
  description,
  imageUrl,
  chaptersLength,
  price,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`} prefetch={true}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 h-[420px] w-full"
      >
        {/* Image Container with Hover Effect */}
        <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-40 dark:opacity-60" />
          
          {/* Price Tag */}
          <div className="absolute top-4 right-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/90 to-cyan-500/90 backdrop-blur-sm text-white font-medium text-sm shadow-lg"
            >
              {price ? `$${price}` : "Free"}
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[calc(420px-192px)]">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-cyan-600 dark:group-hover:from-purple-400 dark:group-hover:to-cyan-400 transition-all duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium line-clamp-2 mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300 flex-grow">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800/50 pt-4 mt-auto">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Users2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="font-medium">
                {0} learners
              </span>
            </motion.div>

            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <span className="font-medium">
                {4.5}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-cyan-500/5 dark:from-purple-400/10 dark:via-transparent dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Action Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium tracking-wide hover:from-purple-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-purple-500/25"
          >
            Enroll Now
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};
