"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IdeaCard } from "./idea-card";
import { NewIdeaDialog } from "./new-idea-dialog";
import { IdeaFilterDialog } from "./idea-filter-dialog";

interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  createdAt: Date;
  likes: number;
  comments: number;
  collaborators: number;
  visibility: "public" | "private" | "collaborative";
}

export const IdeasContent = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewIdeaOpen, setIsNewIdeaOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "name">("recent");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    visibility: "all",
  });

  // Mock data - replace with API call
  const mockIdeas: Idea[] = [
    {
      id: "1",
      title: "AI-Powered Learning Assistant",
      description: "Create an intelligent learning assistant that adapts to each student's learning style and pace, providing personalized recommendations and support.",
      category: "Education",
      tags: ["AI", "EdTech", "Personalization"],
      status: "published",
      createdAt: new Date(),
      likes: 42,
      comments: 12,
      collaborators: 3,
      visibility: "public",
    },
    {
      id: "2",
      title: "Community Knowledge Hub",
      description: "A platform where experts can share their knowledge through interactive sessions and collaborative projects.",
      category: "Community",
      tags: ["Knowledge Sharing", "Collaboration"],
      status: "draft",
      createdAt: new Date(Date.now() - 86400000),
      likes: 28,
      comments: 8,
      collaborators: 0,
      visibility: "private",
    },
    // Add more mock ideas
  ];

  const filteredIdeas = mockIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filters.status === "all" || idea.status === filters.status;
    const matchesCategory = filters.category === "all" || idea.category === filters.category;
    const matchesVisibility = filters.visibility === "all" || idea.visibility === filters.visibility;

    return matchesSearch && matchesStatus && matchesCategory && matchesVisibility;
  });

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "popular":
        return b.likes - a.likes;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            My Ideas
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Share and collaborate on innovative ideas
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button 
            onClick={() => setIsNewIdeaOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium shadow-lg shadow-purple-600/20 dark:shadow-purple-500/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Idea
          </Button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-white/30 dark:bg-gray-900/30 p-4 rounded-lg backdrop-blur-sm">
        <Input
          placeholder="Search ideas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 max-w-full sm:max-w-xs bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 transition-colors"
          icon={<Search className="w-4 h-4 text-gray-400" />}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="w-full sm:w-auto bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-md px-4 py-2 focus:border-purple-500 transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Content */}
      {sortedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedIdeas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IdeaCard 
                idea={idea}
                onEdit={() => {}}
                onDelete={() => {}}
                onShare={() => {}}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center py-12 sm:py-16 bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800 backdrop-blur-sm"
        >
          <Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-purple-500 dark:text-purple-400 opacity-50" />
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4">
            No ideas found. Start by creating your first idea!
          </p>
          <Button 
            variant="outline" 
            className="border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 font-medium"
            onClick={() => setIsNewIdeaOpen(true)}
          >
            Create Your First Idea
          </Button>
        </motion.div>
      )}

      {/* Dialogs */}
      <NewIdeaDialog
        open={isNewIdeaOpen}
        onClose={() => setIsNewIdeaOpen(false)}
        userId={userId}
      />
      <IdeaFilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}; 