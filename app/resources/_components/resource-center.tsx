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
  List
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResourceGrid } from "./resource-grid";
import { ResourceList } from "./resource-list";
import { ResourceFilters } from "./resource-filters";

interface ResourceCenterProps {
  userId: string;
}

const resources = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Complete guide to get started with our platform",
    type: "guide",
    icon: Book,
    downloadUrl: "/guides/getting-started.pdf",
    category: "Guides",
    tags: ["beginner", "tutorial"],
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
  },
  // Add more resources...
];

export const ResourceCenter = ({ userId }: ResourceCenterProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">Resource Center</h1>
          <p className="text-gray-400">Access all learning materials and resources</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-gray-700 text-gray-400 hover:text-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("grid")}
              className={view === "grid" ? "bg-gray-700" : ""}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-gray-700" : ""}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border-gray-700 text-gray-200"
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ResourceFilters />
        </motion.div>
      )}

      {/* Resource Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {view === "grid" ? (
          <ResourceGrid resources={resources} />
        ) : (
          <ResourceList resources={resources} />
        )}
      </motion.div>
    </div>
  );
}; 