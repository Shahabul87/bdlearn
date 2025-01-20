"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PostDataTableWrapperProps {
  posts: any[];
  categories: string[];
}

export const PostDataTableWrapper = ({ posts, categories }: PostDataTableWrapperProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter posts based on search query and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      post.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Filter out null categories and ensure unique values
  const validCategories = Array.from(new Set(
    categories.filter(category => category != null)
  ));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className={cn(
        "flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between",
        "p-4 sm:p-6 rounded-xl",
        "bg-white/30 dark:bg-gray-900/50",
        "border border-gray-200/50 dark:border-gray-800"
      )}>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Blog Posts
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm sm:text-base">
            Manage your blog posts and articles
          </p>
        </div>
        <Link href="/teacher/createblog">
          <Button className={cn(
            "w-full sm:w-auto",
            "bg-purple-600 hover:bg-purple-700",
            "dark:bg-purple-500 dark:hover:bg-purple-600",
            "text-white text-sm sm:text-base"
          )}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className={cn(
        "flex flex-col sm:flex-row gap-4",
        "p-4 rounded-lg",
        "bg-white/20 dark:bg-gray-900/30"
      )}>
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "pl-9 w-full",
              "text-sm sm:text-base",
              "h-9 sm:h-10",
              "bg-white dark:bg-gray-900/50",
              "border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-white",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:ring-purple-500"
            )}
          />
        </div>

        {/* Category Filter */}
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className={cn(
            "w-full sm:w-[180px]",
            "h-9 sm:h-10",
            "text-sm sm:text-base",
            "bg-white dark:bg-gray-900/50",
            "border-gray-200 dark:border-gray-700",
            "text-gray-900 dark:text-white"
          )}>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <SelectItem 
              value="all"
              className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              All Categories
            </SelectItem>
            {validCategories.map((category) => (
              <SelectItem 
                key={category}
                value={category?.toLowerCase() ?? ''}
                className="text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Results Count */}
        <div className={cn(
          "text-sm text-gray-500 dark:text-gray-400",
          "hidden sm:block",
          "min-w-[120px] text-right"
        )}>
          {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
        </div>
      </div>

      {/* Table */}
      <div className={cn(
        "rounded-xl overflow-hidden",
        "bg-white/50 dark:bg-gray-800/50",
        "border border-gray-200 dark:border-gray-700"
      )}>
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={filteredPosts} />
        </div>
      </div>

      {/* Mobile Results Count */}
      <div className={cn(
        "text-sm text-gray-500 dark:text-gray-400",
        "sm:hidden",
        "text-center"
      )}>
        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
      </div>
    </div>
  );
}; 