"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { University, Faculty } from "../_data";

interface CourseFiltersProps {
  universities: University[];
  faculties: Faculty[];
  searchTerm: string;
  selectedUniversity: string;
  selectedFaculty: string;
  handleSearch: (value: string) => void;
  handleUniversityChange: (value: string) => void;
  handleFacultyChange: (value: string) => void;
  resetFilters: () => void;
  totalResults: number;
}

const CourseFilters = ({
  universities,
  faculties,
  searchTerm,
  selectedUniversity,
  selectedFaculty,
  handleSearch,
  handleUniversityChange,
  handleFacultyChange,
  resetFilters,
  totalResults,
}: CourseFiltersProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hasFilters, setHasFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHasFilters(
      searchTerm !== "" || 
      selectedUniversity !== "all" || 
      selectedFaculty !== "all"
    );
  }, [searchTerm, selectedUniversity, selectedFaculty]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6 w-full shadow-sm ${
        isSticky
          ? "lg:sticky lg:top-20 lg:z-10"
          : ""
      }`}
    >
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
            কোর্স ফিল্টার
          </h3>
          {hasFilters && (
            <div className="ml-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="h-8 text-xs flex items-center gap-1 rounded-full"
              >
                <X className="h-3 w-3" /> ফিল্টার রিসেট
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="কোর্স খুঁজুন..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              বিশ্ববিদ্যালয়
            </label>
            <Select
              value={selectedUniversity}
              onValueChange={handleUniversityChange}
            >
              <SelectTrigger className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="সকল বিশ্ববিদ্যালয়" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল বিশ্ববিদ্যালয়</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university.id} value={university.name}>
                    {university.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              অনুষদ
            </label>
            <Select
              value={selectedFaculty}
              onValueChange={handleFacultyChange}
            >
              <SelectTrigger className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="সকল অনুষদ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সকল অনুষদ</SelectItem>
                {faculties.map((faculty) => (
                  <SelectItem key={faculty.id} value={faculty.name}>
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          মোট {totalResults}টি কোর্স পাওয়া গেছে
        </div>
      </div>
    </motion.div>
  );
};

export default CourseFilters; 