"use client";

import { motion } from "framer-motion";
import { 
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  Brain,
  Star,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressStats {
  totalHours: number;
  streakDays: number;
  completedTopics: number;
  masteryLevel: number;
  nextMilestone: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlockedAt?: Date;
  progress: number;
}

export const ProgressTracker = () => {
  // Mock data - replace with real data
  const stats: ProgressStats = {
    totalHours: 45,
    streakDays: 7,
    completedTopics: 12,
    masteryLevel: 4,
    nextMilestone: 75,
    achievements: [
      {
        id: "quick-learner",
        name: "Quick Learner",
        description: "Complete 5 lessons in one day",
        icon: Brain,
        unlockedAt: new Date(),
        progress: 100
      },
      {
        id: "consistent",
        name: "Consistency Master",
        description: "Maintain a 7-day learning streak",
        icon: Calendar,
        unlockedAt: new Date(),
        progress: 100
      },
      {
        id: "expert",
        name: "Subject Expert",
        description: "Achieve 90% mastery in any subject",
        icon: Award,
        progress: 65
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className={cn(
        "bg-white/50 dark:bg-gray-800/50",
        "border border-gray-200 dark:border-gray-700",
        "rounded-xl p-4 sm:p-6"
      )}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Learning Progress
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={cn(
            "p-4 rounded-lg",
            "bg-purple-50 dark:bg-purple-500/10",
            "border border-purple-100 dark:border-purple-500/20"
          )}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Study Time
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {stats.totalHours}h
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg",
            "bg-blue-50 dark:bg-blue-500/10",
            "border border-blue-100 dark:border-blue-500/20"
          )}>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Streak
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {stats.streakDays} days
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg",
            "bg-green-50 dark:bg-green-500/10",
            "border border-green-100 dark:border-green-500/20"
          )}>
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Topics Completed
              </span>
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {stats.completedTopics}
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg",
            "bg-orange-50 dark:bg-orange-500/10",
            "border border-orange-100 dark:border-orange-500/20"
          )}>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                Mastery Level
              </span>
            </div>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              Level {stats.masteryLevel}
            </div>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress to Next Level</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{stats.nextMilestone}%</span>
          </div>
          <Progress value={stats.nextMilestone} className="h-2" />
        </div>
      </div>

      {/* Achievements */}
      <div className={cn(
        "bg-white/50 dark:bg-gray-800/50",
        "border border-gray-200 dark:border-gray-700",
        "rounded-xl p-4 sm:p-6"
      )}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "p-4 rounded-lg",
                "border transition-all duration-200",
                achievement.unlockedAt
                  ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10 border-orange-200 dark:border-orange-500/20"
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  achievement.unlockedAt
                    ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                )}>
                  <achievement.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={cn(
                    "font-medium mb-1",
                    achievement.unlockedAt
                      ? "text-orange-900 dark:text-orange-300"
                      : "text-gray-900 dark:text-gray-100"
                  )}>
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  <Progress 
                    value={achievement.progress} 
                    className={cn(
                      "h-1",
                      achievement.unlockedAt && "bg-orange-100 dark:bg-orange-500/20"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};