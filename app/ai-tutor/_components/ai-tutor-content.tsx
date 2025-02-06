"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Brain, 
  Clock, 
  Code, 
  FileText, 
  History,
  Languages, 
  Layout, 
  MessageSquare, 
  Settings,
  Sparkles,
  Target,
  LineChart,
  Library,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "./chat-interface";
import { ResourceLibrary } from "./resource-library";
import { SubjectSelector } from "./subject-selector";
import { LearningStyleSelector } from "./learning-style-selector";
import { SettingsDialog } from "./settings-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QuizGenerator } from "./quiz-generator";
import { cn } from "@/lib/utils";

type View = "chat" | "quiz" | "progress" | "resources";

interface NavItem {
  id: View;
  label: string;
  icon: any;
}

export const AiTutorContent = () => {
  const [currentView, setCurrentView] = useState<View>("chat");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: "chat", label: "AI Chat", icon: MessageSquare },
    { id: "quiz", label: "Practice Quiz", icon: Brain },
    { id: "progress", label: "Progress", icon: LineChart },
    { id: "resources", label: "Resources", icon: Library }
  ];

  const renderContent = () => {
    switch (currentView) {
      case "quiz":
        return <QuizGenerator subject={selectedSubject} topic="Selected Topic" />;
      case "chat":
        return <ChatInterface subject={selectedSubject} learningStyle={learningStyle} />;
      case "progress":
        return (
          <div className="text-center py-12">
            <LineChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">Progress tracking coming soon...</p>
          </div>
        );
      case "resources":
        return <ResourceLibrary />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className={cn(
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700",
          "p-4 sm:p-6 rounded-xl",
          "backdrop-blur-sm"
        )}>
          <div>
            <h1 className={cn(
              "text-2xl sm:text-3xl font-bold",
              "bg-gradient-to-r from-purple-600 to-indigo-600",
              "dark:from-purple-400 dark:to-indigo-400",
              "text-transparent bg-clip-text"
            )}>
              AI Tutor
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
              Your personalized learning companion powered by AI
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSettingsOpen(true)}
              className={cn(
                "h-9 sm:h-10",
                "border-gray-200 dark:border-gray-700",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentView(currentView === "chat" ? "resources" : "chat")}
              className={cn(
                "h-9 sm:h-10",
                "bg-purple-600 hover:bg-purple-700",
                "dark:bg-purple-500 dark:hover:bg-purple-600",
                "text-white"
              )}
            >
              {currentView === "chat" ? (
                <>
                  <Library className="w-4 h-4 mr-2" />
                  Resources
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className={cn(
              "bg-white/50 dark:bg-gray-800/50",
              "border border-gray-200 dark:border-gray-700",
              "rounded-xl p-4",
              "backdrop-blur-sm"
            )}>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    currentView === "chat"
                      ? "bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => setCurrentView("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Tutor
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    currentView === "resources"
                      ? "bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => setCurrentView("resources")}
                >
                  <Library className="w-4 h-4 mr-2" />
                  Resources
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 dark:text-gray-300"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Practice Quiz
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-700 dark:text-gray-300"
                >
                  <Book className="w-4 h-4 mr-2" />
                  Study Notes
                </Button>
              </div>
            </div>

            {/* Current Progress */}
            <div className={cn(
              "bg-white/50 dark:bg-gray-800/50",
              "border border-gray-200 dark:border-gray-700",
              "rounded-xl p-4",
              "backdrop-blur-sm"
            )}>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                Current Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Study Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">2.5 hrs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Topics Covered</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">12</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Achievements</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <SettingsDialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}; 