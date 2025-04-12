"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "সক্রিয় শিক্ষার্থী",
    value: "২৫,০০০+",
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100/70 dark:bg-blue-900/30",
  },
  {
    icon: BookOpen,
    label: "মোট কোর্স",
    value: "১৫০+",
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100/70 dark:bg-emerald-900/30",
  },
  {
    icon: Award,
    label: "সফল শিক্ষার্থী",
    value: "৯৮%",
    color: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100/70 dark:bg-amber-900/30",
  },
  {
    icon: Star,
    label: "গড় রেটিং",
    value: "৪.৮/৫",
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100/70 dark:bg-purple-900/30",
  },
];

export default function CollegeStats() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
            আমাদের সাফল্য
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            হাজার হাজার শিক্ষার্থী আমাদের প্লাটফর্মে সাফল্যের সাথে পড়াশোনা করে থাকে
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden"
            >
              <div className={`absolute -top-6 -right-6 w-12 h-12 sm:w-16 sm:h-16 ${stat.color} opacity-10 rounded-full`}></div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg xl:rounded-xl ${stat.bgColor} flex items-center justify-center mb-3 sm:mb-4`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 