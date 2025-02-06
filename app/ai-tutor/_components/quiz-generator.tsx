"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2,
  XCircle,
  Timer,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Award,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

interface QuizGeneratorProps {
  subject: string;
  topic: string;
}

export const QuizGenerator = ({
  subject,
  topic
}: QuizGeneratorProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Mock questions - replace with AI-generated questions
  const mockQuestions: Question[] = [
    {
      id: "1",
      text: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To handle side effects in functional components",
        "To create new components",
        "To style components",
        "To handle routing"
      ],
      correctAnswer: 0,
      explanation: "useEffect is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
      difficulty: "medium",
      points: 10
    },
    // Add more questions...
  ];

  const startQuiz = () => {
    setQuestions(mockQuestions);
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + questions[currentQuestion].points);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="space-y-6">
      {!quizStarted ? (
        <div className={cn(
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700",
          "rounded-xl p-6 text-center"
        )}>
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-purple-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This quiz will test your understanding of {topic} in {subject}
          </p>
          <Button
            onClick={startQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Start Quiz
          </Button>
        </div>
      ) : (
        <div className={cn(
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700",
          "rounded-xl p-4 sm:p-6"
        )}>
          {!quizCompleted ? (
            <>
              {/* Quiz Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Question {currentQuestion + 1} of {questions.length}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {questions[currentQuestion].points} points
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress 
                value={(currentQuestion / questions.length) * 100}
                className="mb-6"
              />

              {/* Question */}
              <div className="mb-6">
                <h4 className="text-lg text-gray-900 dark:text-gray-100 mb-4">
                  {questions[currentQuestion].text}
                </h4>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={cn(
                        "w-full p-4 rounded-lg text-left transition-all",
                        "border-2",
                        selectedAnswer === null
                          ? "border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500"
                          : selectedAnswer === index
                            ? index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-500/10"
                              : "border-red-500 bg-red-50 dark:bg-red-500/10"
                            : index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-500/10"
                              : "border-gray-200 dark:border-gray-700"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-gray-900 dark:text-gray-100",
                          selectedAnswer !== null && index === questions[currentQuestion].correctAnswer && "text-green-700 dark:text-green-300"
                        )}>
                          {option}
                        </span>
                        {selectedAnswer !== null && (
                          index === questions[currentQuestion].correctAnswer ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-5 h-5 text-red-500" />
                          ) : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-lg mb-6",
                    "bg-gray-50 dark:bg-gray-800/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        Explanation
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex justify-end">
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Award className="w-16 h-16 mx-auto mb-4 text-purple-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Quiz Completed!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You scored {score} out of {questions.reduce((acc, q) => acc + q.points, 0)} points
              </p>
              <Button
                onClick={startQuiz}
                variant="outline"
                className="mx-auto"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};