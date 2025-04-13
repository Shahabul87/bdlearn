"use client";

import { motion } from "framer-motion";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { University, Faculty } from "../_data";

interface FilterBarProps {
  universities: University[];
  faculties: Faculty[];
  searchTerm: string;
  selectedUniversity: string;
  selectedFaculty: string;
  setSearchTerm: (value: string) => void;
  setSelectedUniversity: (value: string) => void;
  setSelectedFaculty: (value: string) => void;
  resetFilters: () => void;
}

const FilterBar = ({
  universities,
  faculties,
  searchTerm,
  selectedUniversity,
  selectedFaculty,
  setSearchTerm,
  setSelectedUniversity,
  setSelectedFaculty,
  resetFilters,
}: FilterBarProps) => {
  return (
    <section className="py-10 bg-gradient-to-r from-white via-[#f8f9ff] to-white dark:from-gray-900 dark:via-gray-800/90 dark:to-gray-900 backdrop-blur-sm border-y border-[#e0e7ff] dark:border-gray-700/60">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full md:w-auto">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] dark:from-[#818cf8] dark:to-[#60a5fa] flex items-center mb-4">
              <div className="p-1.5 mr-2 rounded-md bg-indigo-50 dark:bg-indigo-900/30">
                <Filter className="w-5 h-5 text-[#4f46e5] dark:text-[#818cf8]" />
              </div>
              ফিল্টার করুন
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
              আপনার পছন্দের কোর্স খুঁজে নিতে ফিল্টার করুন
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-[#4f46e5] dark:text-[#818cf8]" />
              </div>
              <Input
                type="text"
                placeholder="কোর্স খুঁজুন..."
                className="pl-10 border-[#e0e7ff] dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#4f46e5] dark:focus:border-[#818cf8] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="border-[#e0e7ff] dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 focus:border-[#4f46e5] dark:focus:border-[#818cf8] transition-colors">
                <SelectValue placeholder="বিশ্ববিদ্যালয় নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-[#e0e7ff] dark:border-gray-700">
                <SelectItem value="all" className="text-gray-700 dark:text-gray-200 focus:bg-[#f0f4ff] dark:focus:bg-gray-700/50">
                  বিশ্ববিদ্যালয় নির্বাচন করুন
                </SelectItem>
                {universities.map((uni) => (
                  <SelectItem 
                    key={uni.id} 
                    value={uni.name}
                    className="text-gray-700 dark:text-gray-200 focus:bg-[#f0f4ff] dark:focus:bg-gray-700/50"
                  >
                    {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
              <SelectTrigger className="border-[#e0e7ff] dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 focus:border-[#4f46e5] dark:focus:border-[#818cf8] transition-colors">
                <SelectValue placeholder="ফ্যাকাল্টি নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-[#e0e7ff] dark:border-gray-700">
                <SelectItem value="all" className="text-gray-700 dark:text-gray-200 focus:bg-[#f0f4ff] dark:focus:bg-gray-700/50">
                  ফ্যাকাল্টি নির্বাচন করুন
                </SelectItem>
                {faculties.map((faculty) => (
                  <SelectItem 
                    key={faculty.id} 
                    value={faculty.name}
                    className="text-gray-700 dark:text-gray-200 focus:bg-[#f0f4ff] dark:focus:bg-gray-700/50"
                  >
                    {faculty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={resetFilters}
              variant="outline"
              className="border-[#e0e7ff] dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-[#f5f7ff] dark:hover:bg-gray-700/60 hover:text-[#4f46e5] hover:border-[#4f46e5] dark:hover:text-[#818cf8] dark:hover:border-[#818cf8] transition-all"
            >
              <span className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                ফিল্টার রিসেট
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilterBar; 