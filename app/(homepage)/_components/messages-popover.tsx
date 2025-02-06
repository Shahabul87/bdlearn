"use client"

import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMessages } from "@/store/use-messages"

export const MessagesPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, unreadCount, fetchMessages, markAsRead } = useMessages();

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, fetchMessages]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200 transition-colors dark:text-white text-gray-900 relative"
      >
        <MessageSquare className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 rounded-lg dark:bg-gray-900 bg-white border dark:border-gray-800 border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b dark:border-gray-800 border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold">Messages</h3>
              <Link href="/messages" className="text-sm text-purple-500 hover:text-purple-600">
                View All
              </Link>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`p-4 border-b dark:border-gray-800 border-gray-200 ${
                    !message.read ? 'bg-gray-50 dark:bg-gray-800/50' : ''
                  }`}
                  onClick={() => markAsRead(message.id)}
                >
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.sender.image || undefined} />
                      <AvatarFallback>{message.sender.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{message.sender.name}</h4>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 