"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Target, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/50 dark:bg-gray-800/50 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-500" />
            Create Course
          </CardTitle>
          <CardDescription>Start teaching and sharing your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-purple-500 hover:bg-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-gray-800/50 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-500" />
            Enroll in Courses
          </CardTitle>
          <CardDescription>Find courses that match your goals</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 border-purple-200 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-500/10">
            Browse Courses
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/50 dark:bg-gray-800/50 hover:shadow-md transition-all border border-gray-200 dark:border-gray-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Set Goals
          </CardTitle>
          <CardDescription>Define your learning objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 border-purple-200 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-500/10">
            Create Goals
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 