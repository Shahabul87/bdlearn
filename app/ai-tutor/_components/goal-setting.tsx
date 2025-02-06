"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  BarChart,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  category: string;
  priority: "low" | "medium" | "high";
  milestones: Milestone[];
  status: "active" | "completed" | "overdue";
}

interface Milestone {
  id: string;
  title: string;
  isCompleted: boolean;
}

export const GoalSetting = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddGoal = (newGoal: Omit<Goal, "id" | "progress" | "status">) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      progress: 0,
      status: "active",
    };
    setGoals([goal, ...goals]);
    setShowNewGoalDialog(false);
  };

  const handleUpdateProgress = (goalId: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, progress } : goal
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Learning Goals</h2>
          <p className="text-gray-500 dark:text-gray-400">Track your learning objectives and progress</p>
        </div>
        <Button
          onClick={() => setShowNewGoalDialog(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Goals", value: goals.filter(g => g.status === "active").length, icon: Target },
          { label: "Completed", value: goals.filter(g => g.status === "completed").length, icon: CheckCircle2 },
          { label: "Overall Progress", value: `${Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / Math.max(goals.length, 1))}%`, icon: TrendingUp },
          { label: "Achievements", value: "3", icon: Award }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-xl",
              "bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700"
            )}
          >
            <stat.icon className="w-8 h-8 text-purple-500 mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={cn(
                "p-4 rounded-xl",
                "bg-white dark:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                "hover:border-purple-500 dark:hover:border-purple-400",
                "transition-all duration-200"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{goal.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                    {goal.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <BarChart className="w-4 h-4 mr-1" />
                      {goal.priority}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{goal.progress}% Complete</span>
                  <span className="text-xs text-gray-500">{goal.milestones.filter(m => m.isCompleted).length}/{goal.milestones.length} Milestones</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Goal Dialog */}
      <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Learning Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Goal Title" />
            <Input placeholder="Description" />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewGoalDialog(false)}>
                Cancel
              </Button>
              <Button>Create Goal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 