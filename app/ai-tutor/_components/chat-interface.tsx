"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Mic, 
  Image as ImageIcon,
  FileText,
  Code,
  Bot,
  StopCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatInterfaceProps {
  subject: string;
  learningStyle: string;
}

export const ChatInterface = ({
  subject,
  learningStyle
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock AI response - replace with actual API call
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a mock AI response. Replace with actual AI integration.",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-[calc(100vh-16rem)]",
      "bg-white/50 dark:bg-gray-800/50",
      "border border-gray-200 dark:border-gray-700",
      "rounded-xl overflow-hidden"
    )}>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "mb-4 max-w-[80%]",
              message.role === "user" ? "ml-auto" : "mr-auto"
            )}
          >
            <div className={cn(
              "rounded-lg p-4",
              message.role === "user"
                ? "bg-purple-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            )}>
              {message.content}
            </div>
            <div className={cn(
              "text-xs mt-1",
              "text-gray-500 dark:text-gray-400",
              message.role === "user" ? "text-right" : "text-left"
            )}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-800/50">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your question..."
            className={cn(
              "min-h-[60px] max-h-[200px]",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "text-gray-900 dark:text-gray-100",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "resize-none"
            )}
          />
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsRecording(!isRecording)}
              className={cn(
                "border-gray-200 dark:border-gray-700",
                isRecording && "text-red-500 dark:text-red-400"
              )}
            >
              {isRecording ? (
                <StopCircle className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Image
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400"
          >
            <FileText className="w-4 h-4 mr-1" />
            File
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 dark:text-gray-400"
          >
            <Code className="w-4 h-4 mr-1" />
            Code
          </Button>
        </div>
      </div>
    </div>
  );
};