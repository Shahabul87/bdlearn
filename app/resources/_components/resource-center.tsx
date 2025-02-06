"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Video, 
  FileText, 
  Bookmark,
  Download,
  Share2,
  Search,
  Filter,
  Grid,
  List,
  LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResourceGrid } from "./resource-grid";
import { ResourceList } from "./resource-list";
import { ResourceFilters } from "./resource-filters";
import { Resource } from "./types";
import { cn } from "@/lib/utils";

interface ResourceCenterProps {
  userId: string;
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Complete guide to get started with our platform",
    type: "guide",
    icon: Book,
    downloadUrl: "/guides/getting-started.pdf",
    category: "Guides",
    tags: ["beginner", "tutorial"],
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Video Tutorial Series",
    description: "Step-by-step video tutorials for all features",
    type: "video",
    icon: Video,
    downloadUrl: "/tutorials/complete-series.zip",
    category: "Tutorials",
    tags: ["video", "tutorial"],
    createdAt: new Date(),
  },
  // Add more resources...
];

export const ResourceCenter = ({ userId }: ResourceCenterProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Example categories and types - replace with your actual data
  const categories = ["Documentation", "Tutorials", "Tools", "Templates"];
  const types = ["Video", "Article", "Guide", "Code"];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 text-transparent bg-clip-text mb-2">
          Resource Center
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Explore our collection of resources to help you get started
        </p>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
        <ResourceFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          types={types}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        <div className="flex gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("grid")}
            className={cn(
              "h-9 sm:h-10",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              viewMode === "grid" && "border-purple-500 text-purple-600 dark:text-purple-400"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("list")}
            className={cn(
              "h-9 sm:h-10",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              viewMode === "list" && "border-purple-500 text-purple-600 dark:text-purple-400"
            )}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Resources Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === "grid" ? (
          <ResourceGrid
            resources={resources}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
          />
        ) : (
          <ResourceList
            resources={resources}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
          />
        )}

        {/* Empty State */}
        {resources.length === 0 && (
          <div className={cn(
            "text-center py-12 sm:py-16",
            "bg-gray-50/50 dark:bg-gray-800/50",
            "border border-gray-200/50 dark:border-gray-700/50",
            "rounded-lg"
          )}>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              No resources found. Try adjusting your filters.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}; 