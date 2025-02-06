"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileQuestion, 
  Book, 
  Video,
  Headphones,
  MessageSquare,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FAQSection } from "./faq-section";
import { ContactForm } from "./contact-form";
import { ResourceSection } from "./resource-section";
import { cn } from "@/lib/utils";

interface SupportContentProps {
  userId: string;
}

export const SupportContent = ({ userId }: SupportContentProps) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'resources'>('faq');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className={cn(
          "text-2xl sm:text-3xl font-bold",
          "bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300",
          "text-transparent bg-clip-text"
        )}>
          How can we help you?
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
          Get help with your account, technical issues, or find answers to common questions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-4">
        <Button
          onClick={() => setActiveTab('faq')}
          variant={activeTab === 'faq' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            "w-full xs:w-auto h-9 sm:h-10",
            activeTab === 'faq' 
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
            "text-xs sm:text-sm"
          )}
        >
          <FileQuestion className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          FAQs
        </Button>
        <Button
          onClick={() => setActiveTab('contact')}
          variant={activeTab === 'contact' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            "w-full xs:w-auto h-9 sm:h-10",
            activeTab === 'contact'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
            "text-xs sm:text-sm"
          )}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Contact Us
        </Button>
        <Button
          onClick={() => setActiveTab('resources')}
          variant={activeTab === 'resources' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            "w-full xs:w-auto h-9 sm:h-10",
            activeTab === 'resources'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300",
            "text-xs sm:text-sm"
          )}
        >
          <Book className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Resources
        </Button>
      </div>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-xl",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700",
          "backdrop-blur-sm",
          "p-4 sm:p-6"
        )}
      >
        {activeTab === 'faq' && <FAQSection />}
        {activeTab === 'contact' && <ContactForm userId={userId} />}
        {activeTab === 'resources' && <ResourceSection />}
      </motion.div>
    </div>
  );
}; 