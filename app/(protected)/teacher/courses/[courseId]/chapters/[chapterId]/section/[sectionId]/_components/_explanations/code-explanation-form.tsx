"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Code2, BookOpen, Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExplanationForm } from "./components/explanation-form";


interface CodeExplanationFormProps {
  courseId: string;
  chapterId: string;
  sectionId: string;
  initialData: {
    codeExplanations?: {
      id: string;
      heading: string | null;
      code: string | null;
      explanation: string | null;
    }[];
  };
}

const formSchema = z.object({
  heading: z.string().min(1, {
    message: "Heading is required",
  }),
  code: z.string().optional(),
  explanation: z.string().optional(),
});

// Add this helper component for preview
const ExplanationPreview = ({ content }: { content: string }) => (
  <div className={cn(
    "mt-4 p-4 rounded-lg",
    "bg-white/80 dark:bg-gray-800/50",
    "border border-gray-200 dark:border-gray-700",
    "prose prose-gray dark:prose-invert max-w-none"
  )}>
    <ReactMarkdown
      className={cn(
        "text-gray-700 dark:text-gray-300",
        "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
        "prose-code:text-pink-500 dark:prose-code:text-pink-400",
        "prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/90",
        "prose-pre:text-sm prose-pre:leading-relaxed"
      )}
      components={{
        span: ({ node, ...props }) => {
          return <span {...props} style={{ ...props.style }} />;
        }
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content || 'Preview will appear here...'}
    </ReactMarkdown>
  </div>
);

export const CodeExplanationForm = ({
  courseId,
  chapterId,
  sectionId,
  initialData
}: CodeExplanationFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "explanation">("code");
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add theme detection
  useEffect(() => {
    // Check if dark mode is preferred
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      code: "",
      explanation: "",
    },
  });

  const { isSubmitting: formIsSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/explanations`,
        values
      );
      toast.success("Explanation added");
      setIsCreating(false);
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const detectLanguage = (code: string) => {
    if (code.includes('function') || code.includes('const') || code.includes('let')) return 'javascript';
    if (code.includes('<div') || code.includes('</div>')) return 'markup';
    if (code.includes('import') || code.includes('from')) return 'typescript';
    return 'typescript';
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/explanations/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/explanations/${id}`);
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={cn(
      "p-4 mt-4 rounded-xl",
      "border border-gray-200 dark:border-gray-700/50",
      "bg-white/50 dark:bg-gray-800/40",
      "hover:bg-gray-50 dark:hover:bg-gray-800/60",
      "transition-all duration-200",
      "backdrop-blur-sm"
    )}>
      {/* Header section */}
      <div className="font-medium flex items-center justify-between mb-6">
        <div className="flex items-center gap-x-2">
          <div className={cn(
            "p-2 w-fit rounded-lg",
            "bg-indigo-50 dark:bg-indigo-500/10"
          )}>
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
              Code Explanations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add code snippets with detailed explanations
            </p>
          </div>
        </div>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          variant="ghost"
          size="sm"
          className={cn(
            "bg-indigo-50 dark:bg-indigo-500/10",
            "text-indigo-700 dark:text-indigo-300",
            "hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
            "hover:text-indigo-800 dark:hover:text-indigo-200",
            "transition-all duration-200"
          )}
        >
          {isCreating ? (
            "Cancel"
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add explanation
            </>
          )}
        </Button>
      </div>

      {/* Form section */}
      {isCreating ? (
        <div className="space-y-4">
          <ExplanationForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>
      ) : (
        <div className="flex items-center justify-center py-6">
          <Button
            onClick={() => setIsCreating(true)}
            variant="ghost"
            className={cn(
              "bg-indigo-50 dark:bg-indigo-500/10",
              "text-indigo-700 dark:text-indigo-300",
              "hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
              "hover:text-indigo-800 dark:hover:text-indigo-200",
              "transition-all duration-200",
              "w-full max-w-md"
            )}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add new explanation
          </Button>
        </div>
      )}
    </div>
  );
}; 