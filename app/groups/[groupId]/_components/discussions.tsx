"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewDiscussionDialog } from "./new-discussion-dialog";
import { DiscussionCard } from "./discussion-card";
import { cn } from "@/lib/utils";

interface DiscussionsProps {
  group: any;
  currentUser: any;
  isGroupMember: boolean;
}

export const Discussions = ({ group, currentUser, isGroupMember }: DiscussionsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log("Group discussions:", group.discussions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {isGroupMember && (
        <div className="flex justify-end">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Discussion
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {!group.discussions || group.discussions.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No discussions yet. Be the first to start one!</p>
          </div>
        ) : (
          group.discussions.map((discussion: any) => (
            <DiscussionCard
              key={discussion.id}
              discussion={discussion}
              currentUser={currentUser}
              groupId={group.id}
            />
          ))
        )}
      </div>

      <NewDiscussionDialog
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