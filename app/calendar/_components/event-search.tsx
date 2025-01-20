"use client";

import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EventSearchProps {
  onSearch: (query: string) => void;
  onFilter: (filters: EventFilters) => void;
}

interface EventFilters {
  categories: string[];
  status: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
}

export const EventSearch = ({ onSearch, onFilter }: EventSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<EventFilters>({
    categories: [],
    status: [],
    dateRange: { start: null, end: null },
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (newFilters: Partial<EventFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
        <Input
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search events..."
          className="pl-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => handleSearch("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "gap-2",
              Object.values(filters).some((f) => 
                Array.isArray(f) ? f.length > 0 : f
              ) && "text-purple-600 border-purple-200 bg-purple-50"
            )}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {["Meeting", "Personal", "Work", "Other"].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className={cn(
                      filters.categories.includes(category) &&
                      "bg-purple-50 text-purple-600 border-purple-200"
                    )}
                    onClick={() => {
                      const newCategories = filters.categories.includes(category)
                        ? filters.categories.filter((c) => c !== category)
                        : [...filters.categories, category];
                      handleFilterChange({ categories: newCategories });
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Status</h4>
              <div className="flex flex-wrap gap-2">
                {["Upcoming", "Past", "Cancelled"].map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    size="sm"
                    className={cn(
                      filters.status.includes(status) &&
                      "bg-purple-50 text-purple-600 border-purple-200"
                    )}
                    onClick={() => {
                      const newStatus = filters.status.includes(status)
                        ? filters.status.filter((s) => s !== status)
                        : [...filters.status, status];
                      handleFilterChange({ status: newStatus });
                    }}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Date Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
                  onChange={(e) => handleFilterChange({
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value ? new Date(e.target.value) : null,
                    },
                  })}
                />
                <Input
                  type="date"
                  value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
                  onChange={(e) => handleFilterChange({
                    dateRange: {
                      ...filters.dateRange,
                      end: e.target.value ? new Date(e.target.value) : null,
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}; 