"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Book, Video, Link as LinkIcon, Image, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewResourceDialog } from "./new-resource-dialog";
import { ResourceCard } from "./resource-card";
import { cn } from "@/lib/utils";

interface ResourcesProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const Resources = ({ group, currentUser, isGroupMember }: ResourcesProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const resourceTypes = [
    { value: "all", label: "All", icon: File },
    { value: "document", label: "Documents", icon: FileText },
    { value: "video", label: "Videos", icon: Video },
    { value: "image", label: "Images", icon: Image },
    { value: "link", label: "Links", icon: LinkIcon },
    { value: "book", label: "Books", icon: Book },
  ];

  const filteredResources = selectedType && selectedType !== "all"
    ? group.resources.filter((resource: any) => resource.type === selectedType)
    : group.resources;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {resourceTypes.map((type) => (
            <Button
              key={type.value}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedType(type.value)}
              className={cn(
                "flex items-center gap-2",
                selectedType === type.value && "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
              )}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </Button>
          ))}
        </div>
        {isGroupMember && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource: any) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            currentUser={currentUser}
            groupId={group.id}
          />
        ))}
      </div>

      <NewResourceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        groupId={group.id}
        currentUser={currentUser}
        onSuccess={() => {
          setIsDialogOpen(false);
          window.location.reload();
        }}
      />
    </motion.div>
  );
}; 