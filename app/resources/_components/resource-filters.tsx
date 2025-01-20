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
    <div className="flex flex-wrap gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
            Category: {selectedCategory || "All"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem 
            onClick={() => onCategoryChange("")}
            className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-700"
          >
            <span>All Categories</span>
            {selectedCategory === "" && <Check className="w-4 h-4 ml-2" />}
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
              className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-700"
            >
              <span>{category}</span>
              {selectedCategory === category && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
            Type: {selectedType || "All"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 border-gray-700">
          <DropdownMenuItem 
            onClick={() => onTypeChange("")}
            className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-700"
          >
            <span>All Types</span>
            {selectedType === "" && <Check className="w-4 h-4 ml-2" />}
          </DropdownMenuItem>
          {types.map((type) => (
            <DropdownMenuItem
              key={type}
              onClick={() => onTypeChange(type)}
              className="text-gray-300 hover:text-white focus:text-white focus:bg-gray-700"
            >
              <span>{type}</span>
              {selectedType === type && <Check className="w-4 h-4 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}; 