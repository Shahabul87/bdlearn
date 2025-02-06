"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ResourceFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const ResourceFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  types,
  selectedType,
  onTypeChange,
}: ResourceFiltersProps) => {
  return (
    <div className="flex flex-col xs:flex-row gap-2 sm:gap-4 w-full xs:w-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(
              "w-full xs:w-auto h-9 sm:h-10",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700/50"
            )}
          >
            <span className="text-xs sm:text-sm">Category: {selectedCategory || "All"}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start"
          className={cn(
            "w-[200px]",
            "bg-white dark:bg-gray-800",
            "border-gray-200 dark:border-gray-700"
          )}
        >
          <DropdownMenuItem 
            onClick={() => onCategoryChange("")}
            className={cn(
              "text-sm",
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "focus:text-gray-900 dark:focus:text-white",
              "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <span>All Categories</span>
            {selectedCategory === "" && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />}
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "text-sm",
                "text-gray-700 dark:text-gray-300",
                "hover:text-gray-900 dark:hover:text-white",
                "focus:text-gray-900 dark:focus:text-white",
                "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <span>{category}</span>
              {selectedCategory === category && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            size="sm"
            className={cn(
              "w-full xs:w-auto h-9 sm:h-10",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700/50"
            )}
          >
            <span className="text-xs sm:text-sm">Type: {selectedType || "All"}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 sm:ml-2 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start"
          className={cn(
            "w-[200px]",
            "bg-white dark:bg-gray-800",
            "border-gray-200 dark:border-gray-700"
          )}
        >
          <DropdownMenuItem 
            onClick={() => onTypeChange("")}
            className={cn(
              "text-sm",
              "text-gray-700 dark:text-gray-300",
              "hover:text-gray-900 dark:hover:text-white",
              "focus:text-gray-900 dark:focus:text-white",
              "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <span>All Types</span>
            {selectedType === "" && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />}
          </DropdownMenuItem>
          {types.map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => onTypeChange(type)}
              className={cn(
                "text-sm",
                "text-gray-700 dark:text-gray-300",
                "hover:text-gray-900 dark:hover:text-white",
                "focus:text-gray-900 dark:focus:text-white",
                "hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <span>{type}</span>
              {selectedType === type && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}; 