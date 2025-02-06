"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  RotateCcw, 
  Settings,
  Timer,
  XCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

// Add props interface
interface QuizGeneratorProps {
  subject: string;
  topic: string;
}

export const QuizGenerator = ({ subject, topic }: QuizGeneratorProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const dummyQuestions: Question[] = [
    {
      id: "1",
      text: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
    },
    // Add more questions...
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{subject} Quiz - {topic}</h2>
        <Button variant="outline" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Timer and Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-purple-500" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
          <Progress value={(currentQuestion / dummyQuestions.length) * 100} className="w-1/3" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">
            {dummyQuestions[currentQuestion].text}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dummyQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={cn(
                  "justify-start h-auto p-4 text-left",
                  selectedAnswer === index && "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                )}
                variant="outline"
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="text-gray-500">
            <HelpCircle className="w-4 h-4 mr-2" />
            Hint
          </Button>
          <Button 
            onClick={() => setIsAnswered(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Check Answer
          </Button>
        </div>
      </motion.div>

      {/* Score Card */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current Score</h3>
            <p className="text-3xl font-bold text-purple-600">{score}/{dummyQuestions.length}</p>
          </div>
          <Button variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </Button>
        </div>
      </motion.div>
    </div>
  );
};