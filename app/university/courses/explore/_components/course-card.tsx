"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, GraduationCap, Star, ChevronRight, School, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Course } from "../_data";

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 dark:hover:bg-gray-800 border-indigo-100/60 dark:border-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-700/50 relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-white/0 dark:from-indigo-950/20 dark:to-gray-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {(course.featured || course.popular) && (
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {course.featured && (
              <Badge className="bg-gradient-to-r from-indigo-600 to-primary shadow-lg shadow-indigo-500/20 text-white font-medium px-2.5 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                ফিচার্ড
              </Badge>
            )}
            {course.popular && (
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-orange-500/20 text-white font-medium px-2.5 py-1">
                <Star className="w-3 h-3 mr-1 fill-white" />
                জনপ্রিয়
              </Badge>
            )}
          </div>
        )}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 px-2.5 py-1.5 rounded-full flex items-center shadow-md border border-yellow-100 dark:border-yellow-900/30">
            <Star className="w-3.5 h-3.5 text-yellow-500 mr-1.5 flex-shrink-0 fill-yellow-500" />
            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">{course.rating}</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-xs bg-white/90 dark:bg-gray-800/90 px-2.5 py-1.5 rounded-full text-gray-700 dark:text-gray-300 shadow-md border border-indigo-100 dark:border-indigo-900/30">
                <Clock className="h-3 w-3 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                {course.duration}
              </div>
              <div className="flex items-center text-xs bg-white/90 dark:bg-gray-800/90 px-2.5 py-1.5 rounded-full text-gray-700 dark:text-gray-300 shadow-md border border-indigo-100 dark:border-indigo-900/30">
                <Users className="h-3 w-3 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                সিট: {course.totalSeats}
              </div>
            </div>
          </div>
        </div>
        <CardHeader className="pb-2 pt-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-700 dark:from-white dark:to-gray-200 line-clamp-2 leading-tight">
              {course.title}
            </CardTitle>
          </div>
          <CardDescription className="flex items-center mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
            <School className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
            {course.university}
          </CardDescription>
          <CardDescription className="flex items-center mt-1.5 text-gray-600 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-500 dark:text-gray-500" />
            {course.faculty}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {course.description}
          </p>
          <div className="flex items-center gap-2 mt-3 bg-indigo-50/70 dark:bg-indigo-950/30 px-3 py-2 rounded-lg border border-indigo-100/50 dark:border-indigo-800/20">
            <GraduationCap className="h-4 w-4 text-primary dark:text-primary-light flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{course.faculty}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t border-indigo-100 dark:border-indigo-900/30 pt-3 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/80">
          <span className={`text-xs font-medium px-3 py-1.5 rounded-full shadow-sm ${
            course.admissionStatus === "আবেদন চলছে" 
              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/40 dark:to-emerald-900/40 dark:text-green-400 border border-green-200 dark:border-green-800/30" 
              : "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30"
          }`}>
            {course.admissionStatus}
          </span>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-white hover:bg-primary rounded-full px-4 shadow-sm shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 -mr-2">
            <Link href={`/university/courses/${course.id}`}>
              <motion.span 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                বিস্তারিত
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard; 