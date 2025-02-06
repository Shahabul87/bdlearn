"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  BarChart,
  Target,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface Feedback {
  id: string;
  content: string;
  type: "strength" | "improvement";
  score: number;
}

export const AIFeedback = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [submission, setSubmission] = useState("");

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setFeedback([
        {
          id: "1",
          content: "Clear explanation of concepts",
          type: "strength",
          score: 85
        },
        {
          id: "2",
          content: "Could improve code organization",
          type: "improvement",
          score: 65
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Feedback</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Get personalized feedback on your work
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <BarChart className="w-4 h-4 mr-2" />
            History
          </Button>
        </div>
      </div>

      {/* Submission Area */}
      <div className="space-y-4">
        <Textarea
          placeholder="Paste your code or write your answer here..."
          className="min-h-[200px]"
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isAnalyzing || !submission}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get Feedback
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Feedback Display */}
      {feedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-4 rounded-xl",
                  "bg-white dark:bg-gray-800",
                  "border border-gray-200 dark:border-gray-700"
                )}
              >
                <div className="flex items-start gap-3">
                  {item.type === "strength" ? (
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <ThumbsDown className="w-5 h-5 text-amber-500" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm mb-2">{item.content}</p>
                    <Progress
                      value={item.score}
                      className={cn(
                        "h-1",
                        item.type === "strength" ? "bg-green-100" : "bg-amber-100"
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 