"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface ChatViewProps {
  chatId: string;
  userId: string;
}

export const ChatView = ({ chatId, userId }: ChatViewProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey there! How's it going?",
      timestamp: new Date(Date.now() - 3600000),
      sender: {
        id: "2",
        name: "John Doe",
        avatar: "https://ui-avatars.com/api/?name=John+Doe",
      },
    },
    {
      id: "2",
      content: "I'm doing great, thanks! How about you?",
      timestamp: new Date(Date.now() - 3500000),
      sender: {
        id: "1",
        name: "You",
        avatar: "https://ui-avatars.com/api/?name=You",
      },
    },
    // Add more mock messages
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: {
        id: userId,
        name: "You",
        avatar: "/avatars/default.png",
      },
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="Chat Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-medium text-gray-200">John Doe</h3>
            <span className="text-sm text-gray-400">Online</span>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender.id === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[70%] ${message.sender.id === userId ? 'flex-row-reverse' : ''}`}>
              <Image
                src={message.sender.avatar}
                alt={message.sender.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <div
                  className={`p-3 rounded-lg ${
                    message.sender.id === userId
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {message.content}
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${
                  message.sender.id === userId ? 'text-right' : ''
                }`}>
                  {format(message.timestamp, 'HH:mm')}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5 text-gray-400" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
          <Button variant="ghost" size="icon">
            <Smile className="w-5 h-5 text-gray-400" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 