"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MindCard } from "./mind-card";
import { NewMindDialog } from "./new-mind-dialog";
import { MindFilterDialog } from "./mind-filter-dialog";
import { MindMapEditor } from "./mind-map-editor";

interface Mind {
  id: string;
  title: string;
  description: string;
  content: any;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  createdAt: Date;
  likes: number;
  views: number;
  shares: number;
  visibility: "public" | "private" | "collaborative";
  _count: {
    mindLikes: number;
    collaborators: number;
  };
}

export const MindsContent = ({ userId }: { userId: string }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewMindOpen, setIsNewMindOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingMind, setEditingMind] = useState<Mind | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "name">("recent");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    visibility: "all",
  });

  // Mock data - replace with API call
  const mockMinds: Mind[] = [
    {
      id: "1",
      title: "Learning Roadmap",
      description: "A comprehensive learning path for web development",
      content: { /* Mind map structure */ },
      category: "Education",
      tags: ["Learning", "Web Development"],
      status: "published",
      createdAt: new Date(),
      likes: 42,
      views: 156,
      shares: 12,
      visibility: "public",
      _count: {
        mindLikes: 42,
        collaborators: 3,
      },
    },
    // Add more mock minds
  ];

  const filteredMinds = mockMinds.filter(mind => {
    const matchesSearch = mind.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mind.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mind.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filters.status === "all" || mind.status === filters.status;
    const matchesCategory = filters.category === "all" || mind.category === filters.category;
    const matchesVisibility = filters.visibility === "all" || mind.visibility === filters.visibility;

    return matchesSearch && matchesStatus && matchesCategory && matchesVisibility;
  });

  const sortedMinds = [...filteredMinds].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "popular":
        return b._count.mindLikes - a._count.mindLikes;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Add this function to handle mind map saving
  const handleSaveMindMap = async (content: any) => {
    try {
      const response = await fetch(`/api/minds/${editingMind?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save mind map');
      }

      // Refresh the mind maps list
      // You can implement this by refetching the data or updating the local state
    } catch (error) {
      console.error('Error saving mind map:', error);
      // You might want to show a toast notification here
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Made responsive */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center bg-white/50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
            Mind Maps
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            Organize and visualize your thoughts
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button 
            onClick={() => setIsNewMindOpen(true)}
            className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium shadow-lg shadow-purple-600/20"
          >
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">New Mind Map</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>

      {/* Search and Sort - Made responsive */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white/30 dark:bg-gray-900/30 p-3 sm:p-4 rounded-lg">
        <div className="flex-1">
          <Input
            placeholder="Search mind maps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 transition-colors"
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
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

      {/* Content Grid - Made responsive */}
      {sortedMinds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedMinds.map((mind) => (
            <MindCard 
              key={mind.id} 
              mind={mind}
              onEdit={() => setEditingMind(mind)}
              onDelete={() => {}}
              onShare={() => {}}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full text-center py-8 sm:py-16 px-4 bg-white/30 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-800"
        >
          <Brain className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-purple-500 dark:text-purple-400 opacity-50" />
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4">
            No mind maps found. Start by creating your first mind map!
          </p>
          <Button 
            variant="outline" 
            className="border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 font-medium"
            onClick={() => setIsNewMindOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Mind Map
          </Button>
        </motion.div>
      )}

      {/* Dialogs */}
      <NewMindDialog
        open={isNewMindOpen}
        onClose={() => setIsNewMindOpen(false)}
        userId={userId}
      />
      <MindFilterDialog
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
      {editingMind && (
        <MindMapEditor
          mind={editingMind}
          onClose={() => setEditingMind(null)}
          onSave={handleSaveMindMap}
        />
      )}
    </div>
  );
}; 