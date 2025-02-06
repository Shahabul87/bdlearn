"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Database,
  Network,
  Lock,
  CheckCircle,
  Star,
  Zap,
  ArrowRight,
  Plus,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
  status: "locked" | "inProgress" | "completed";
  level: number;
  position: number;
  dependencies: string[];
  subskills: string[];
  xp: number;
}

export const SkillTree = () => {
  const [skills] = useState<Skill[]>([
    {
      id: "html",
      title: "HTML",
      description: "Structure of web pages",
      icon: Code,
      progress: 100,
      status: "completed",
      level: 1,
      position: 1,
      dependencies: [],
      subskills: ["html-forms", "html-semantics"],
      xp: 100
    },
    {
      id: "css",
      title: "CSS",
      description: "Styling web pages",
      icon: Code,
      progress: 75,
      status: "inProgress",
      level: 1,
      position: 2,
      dependencies: ["html"],
      subskills: ["css-flexbox", "css-grid"],
      xp: 75
    },
    {
      id: "js",
      title: "JavaScript",
      description: "Programming for the web",
      icon: Code,
      progress: 0,
      status: "locked",
      level: 2,
      position: 1,
      dependencies: ["html", "css"],
      subskills: [],
      xp: 0
    }
  ]);

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const renderSkillNode = (skill: Skill) => (
    <motion.div
      key={skill.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative p-4 rounded-lg cursor-pointer",
        "border-2",
        skill.status === "locked" 
          ? "border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50"
          : skill.status === "completed"
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
        "transition-all duration-200"
      )}
      onClick={() => setSelectedSkill(skill)}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          skill.status === "locked" 
            ? "bg-gray-200 dark:bg-gray-700"
            : "bg-purple-100 dark:bg-purple-900/40"
        )}>
          <skill.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{skill.title}</h3>
            {skill.status === "locked" ? (
              <Lock className="w-4 h-4 text-gray-400" />
            ) : skill.status === "completed" ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Badge variant="secondary" className="text-xs">
                In Progress
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {skill.description}
          </p>
          {skill.status !== "locked" && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Progress</span>
                <span className="text-xs text-gray-500">{skill.progress}%</span>
              </div>
              <Progress value={skill.progress} className="h-1" />
            </div>
          )}
        </div>
      </div>
      {skill.subskills.length > 0 && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Skill Tree</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Visualize your learning path and progress
          </p>
        </div>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total XP", value: "450", icon: Star },
          { label: "Skills Mastered", value: "3/12", icon: CheckCircle },
          { label: "Current Streak", value: "5 days", icon: Zap }
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
          >
            <stat.icon className="w-8 h-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Skill Tree Visualization */}
      <ScrollArea className="h-[500px] rounded-lg border">
        <div className="p-6 min-w-[800px]">
          <div className="space-y-12">
            {[1, 2].map((level) => (
              <div key={level} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  Level {level}
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {skills
                    .filter(skill => skill.level === level)
                    .map(renderSkillNode)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{selectedSkill.title}</h3>
              <p className="text-gray-500">{selectedSkill.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSkill(null)}
            >
              <Plus className="w-4 h-4 rotate-45" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 