"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Image from "next/image";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar: string;
  online: boolean;
}

interface ChatListProps {
  searchQuery: string;
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
}

export const ChatList = ({ searchQuery, activeChat, onChatSelect }: ChatListProps) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, how's it going?",
      timestamp: new Date(),
      unread: 2,
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
      online: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "The project is looking great!",
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
      online: false,
    },
    // Add more mock chats
  ]);

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat, index) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onChatSelect(chat.id)}
          className={`
            p-4 cursor-pointer transition-all
            ${activeChat === chat.id ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'}
            ${index !== chats.length - 1 ? 'border-b border-gray-700/50' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={chat.avatar}
                alt={chat.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-200 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-400">
                  {format(chat.timestamp, 'HH:mm')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 