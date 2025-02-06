"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Book, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full p-4">
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Resource cards will go here */}
      </div>
    </div>
  );
}; 