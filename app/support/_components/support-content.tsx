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

interface SupportContentProps {
  userId: string;
}

export const SupportContent = ({ userId }: SupportContentProps) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'resources'>('faq');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-200">
          How can we help you?
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get help with your account, technical issues, or find answers to common questions.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setActiveTab('faq')}
          variant={activeTab === 'faq' ? 'default' : 'outline'}
          className={activeTab === 'faq' ? 'bg-purple-500' : 'border-gray-700'}
        >
          <FileQuestion className="w-4 h-4 mr-2" />
          FAQs
        </Button>
        <Button
          onClick={() => setActiveTab('contact')}
          variant={activeTab === 'contact' ? 'default' : 'outline'}
          className={activeTab === 'contact' ? 'bg-purple-500' : 'border-gray-700'}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Us
        </Button>
        <Button
          onClick={() => setActiveTab('resources')}
          variant={activeTab === 'resources' ? 'default' : 'outline'}
          className={activeTab === 'resources' ? 'bg-purple-500' : 'border-gray-700'}
        >
          <Book className="w-4 h-4 mr-2" />
          Resources
        </Button>
      </div>

      {/* Content Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'faq' && <FAQSection />}
        {activeTab === 'contact' && <ContactForm userId={userId} />}
        {activeTab === 'resources' && <ResourceSection />}
      </motion.div>
    </div>
  );
}; 