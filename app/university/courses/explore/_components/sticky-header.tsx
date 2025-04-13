"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StickyHeaderProps {
  isScrolled: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resetFilters: () => void;
}

const StickyHeader = ({
  isScrolled,
  searchTerm,
  setSearchTerm,
  resetFilters,
}: StickyHeaderProps) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 py-3 transform transition-all duration-300 ${
      isScrolled ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xl font-bold text-gray-900 dark:text-white">কোর্স এক্সপ্লোর</div>
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="কোর্স খুঁজুন..."
                className="pl-10 pr-3 py-1 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetFilters}
              className="h-9"
            >
              রিসেট
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyHeader; 