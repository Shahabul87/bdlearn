"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Book, Microscope, Calculator, Languages, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CATEGORIES = [
  {
    icon: Code,
    name: "Computer Science",
    description: "Programming, Web Development, AI & more",
    color: "bg-blue-500",
  },
  {
    icon: Book,
    name: "Literature",
    description: "Classic Literature, Poetry, Creative Writing",
    color: "bg-purple-500",
  },
  {
    icon: Calculator,
    name: "Mathematics",
    description: "Algebra, Calculus, Statistics",
    color: "bg-green-500",
  },
  {
    icon: Microscope,
    name: "Science",
    description: "Physics, Chemistry, Biology",
    color: "bg-red-500",
  },
  {
    icon: Languages,
    name: "Languages",
    description: "English, Spanish, Mandarin & more",
    color: "bg-yellow-500",
  },
  {
    icon: Music,
    name: "Arts",
    description: "Music, Visual Arts, Performance",
    color: "bg-pink-500",
  },
];

export default function PopularCategories() {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Popular Categories
        </h2>
        <Link href="/groups">
          <Button variant="ghost" className="text-purple-600 dark:text-purple-400">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg transition-shadow"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${category.color}`} />
            <div className="relative">
              <category.icon className={`w-8 h-8 ${category.color} text-white rounded-lg p-1.5`} />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {category.description}
              </p>
              <Button
                variant="ghost"
                className="mt-4 text-purple-600 dark:text-purple-400 p-0 hover:bg-transparent group-hover:translate-x-2 transition-transform"
              >
                Browse Groups
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 