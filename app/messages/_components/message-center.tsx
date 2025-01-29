"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  Users, 
  Star, 
  Archive,
  Settings,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatList } from "./chat-list";
import { ChatView } from "./chat-view";
import { NewMessageDialog } from "./new-message-dialog";

interface MessageCenterProps {
  userId: string | undefined;
}

export const MessageCenter = ({ userId }: MessageCenterProps) => {
  if (!userId) return null;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-80 flex flex-col bg-gray-900/50 rounded-xl border border-gray-700/50"
      >
        {/* Search and New Message */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex gap-2">
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 text-gray-200"
              icon={<Search className="w-4 h-4" />}
            />
            <Button
              onClick={() => setIsNewMessageOpen(true)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation - Updated this section */}
        <div className="p-2 border-b border-gray-700/50">
          <nav className="grid grid-cols-2 gap-1">
            {[
              { icon: MessageCircle, label: "All" },
              { icon: Users, label: "Groups" },
              { icon: Star, label: "Starred" },
              { icon: Archive, label: "Archived" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-200 px-2 py-1.5"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* Chat List */}
        <ChatList
          searchQuery={searchQuery}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
        />
      </motion.div>

      {/* Main Chat View */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-gray-900/50 rounded-xl border border-gray-700/50"
      >
        {activeChat ? (
          <ChatView chatId={activeChat} userId={userId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a conversation to start messaging
          </div>
        )}
      </motion.div>

      <NewMessageDialog
        open={isNewMessageOpen}
        onClose={() => setIsNewMessageOpen(false)}
        userId={userId}
      />
    </div>
  );
}; 