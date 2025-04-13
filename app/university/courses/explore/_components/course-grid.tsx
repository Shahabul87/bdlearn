"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./course-card";

interface Course {
  id: number;
  title: string;
  university: string;
  faculty: string;
  duration: string;
  totalSeats: string;
  rating: number;
  image: string;
  description: string;
  featured?: boolean;
  popular?: boolean;
  admissionStatus: string;
}

interface CourseGridProps {
  filteredCourses: Course[];
  resetFilters: () => void;
}

const CourseGrid = ({ filteredCourses, resetFilters }: CourseGridProps) => {
  return (
    <section className="py-16 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-indigo-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <AnimatePresence>
          {filteredCourses.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 bg-gradient-to-r from-white/80 to-white/40 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-indigo-100/30 dark:border-indigo-900/30 shadow-md shadow-indigo-500/5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 dark:from-primary-light dark:to-indigo-400 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary dark:text-primary-light" />
                    কোর্সসমূহ
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 rounded-full border border-indigo-100 dark:border-indigo-800/30 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary/80 dark:text-primary-light/80" />
                    {filteredCourses.length} টি কোর্স পাওয়া গেছে
                  </p>
                </div>
                <div className="mt-2 h-1.5 w-24 bg-gradient-to-r from-primary via-indigo-500 to-purple-500 rounded-full"></div>
              </div>
              
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="transform-gpu"
                  >
                    <CourseCard course={course} index={index} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="py-20 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-full blur-xl"></div>
                <div className="inline-flex items-center justify-center p-8 mb-6 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-full border border-indigo-100 dark:border-indigo-900/50 shadow-xl shadow-indigo-500/10 relative">
                  <GraduationCap className="w-16 h-16 text-indigo-400 dark:text-indigo-500" />
                </div>
              </motion.div>
              <h3 className="mt-8 text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-white">কোন কোর্স পাওয়া যায়নি</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md mx-auto">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন অথবা অন্য কোর্স খুঁজুন</p>
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="mt-8 px-6 py-5 border-indigo-200 bg-white hover:bg-indigo-50 hover:text-primary hover:border-primary dark:bg-gray-800 dark:border-indigo-800/50 dark:hover:border-primary-light dark:hover:bg-indigo-950/30 shadow-md shadow-indigo-500/5 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                সব ফিল্টার রিসেট করুন
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CourseGrid; 