"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Code2, BookOpen, Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/explanations`,
        values
      );
      toast.success("Code explanation added");
      setIsCreating(false);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const detectLanguage = (code: string) => {
    if (code.includes('function') || code.includes('const') || code.includes('let')) return 'javascript';
    if (code.includes('<div') || code.includes('</div>')) return 'markup';
    if (code.includes('import') || code.includes('from')) return 'typescript';
    return 'typescript';
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
      <div className="font-medium flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2">
        <div className="flex items-center gap-x-2">
          <div className={cn(
            "p-2 w-fit rounded-lg",
            "bg-indigo-50 dark:bg-indigo-500/10"
          )}>
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
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
            "w-full sm:w-auto",
            "justify-center",
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

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="heading"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter a heading for this explanation"
                      className={cn(
                        "bg-white dark:bg-gray-900/50",
                        "border-gray-200 dark:border-gray-700/50",
                        "text-gray-900 dark:text-gray-200",
                        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        "focus:ring-indigo-500/20",
                        "text-sm sm:text-base font-medium",
                        "transition-all duration-200"
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                </FormItem>
              )}
            />

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "code" | "explanation")}>
              <TabsList className="w-full">
                <TabsTrigger value="code" className="w-full">Code</TabsTrigger>
                <TabsTrigger value="explanation" className="w-full">Explanation</TabsTrigger>
              </TabsList>
              <TabsContent value="code">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isSubmitting}
                          placeholder="Enter your code snippet here..."
                          className={cn(
                            "min-h-[300px] font-mono",
                            "bg-white dark:bg-gray-900/50",
                            "border-gray-200 dark:border-gray-700/50",
                            "text-gray-900 dark:text-gray-200",
                            "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            "focus:ring-indigo-500/20",
                            "text-sm sm:text-base",
                            "transition-all duration-200"
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="explanation">
                <FormField
                  control={form.control}
                  name="explanation"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-4">
                        <FormControl>
                          <Textarea
                            {...field}
                            disabled={isSubmitting}
                            placeholder={`Write your explanation here...

Available formatting:
**bold text**
*italic text*
# Heading 1
## Heading 2
- List item
\`inline code\`
> Quote

Color examples:
<span style="color: #ef4444">Red text</span>
<span style="color: #22c55e">Green text</span>
<span style="color: #3b82f6">Blue text</span>
<span style="color: #f59e0b">Orange text</span>
`}
                            className={cn(
                              "min-h-[200px] font-mono",
                              "bg-white dark:bg-gray-900/50",
                              "border-gray-200 dark:border-gray-700/50",
                              "text-gray-900 dark:text-gray-200",
                              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                              "focus:ring-indigo-500/20",
                              "text-sm sm:text-base",
                              "transition-all duration-200"
                            )}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500 dark:text-rose-400 text-sm" />
                        
                        {/* Live Preview */}
                        {field.value && (
                          <>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Preview:
                            </div>
                            <ExplanationPreview content={field.value} />
                          </>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant="ghost"
                size="sm"
                className={cn(
                  "bg-indigo-50 dark:bg-indigo-500/10",
                  "text-indigo-700 dark:text-indigo-300",
                  "hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
                  "hover:text-indigo-800 dark:hover:text-indigo-200",
                  "border border-indigo-200/20 dark:border-indigo-500/20",
                  "transition-all duration-200",
                  !isValid && "opacity-50 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Save explanation"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* Display existing explanations */}
      {(initialData.codeExplanations?.length ?? 0) > 0 && (
        <div className="mt-6 space-y-6">
          {initialData.codeExplanations?.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-lg",
                "bg-white/50 dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700/50",
                "hover:bg-gray-50 dark:hover:bg-gray-800/70",
                "transition-all duration-200"
              )}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
                {item.heading}
              </h4>
              
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Code Column */}
                <div className={cn(
                  "rounded-lg",
                  "bg-gray-100 dark:bg-gray-800/90",
                  "border border-gray-200 dark:border-gray-700",
                  "overflow-hidden"
                )}>
                  <SyntaxHighlighter
                    language={detectLanguage(item.code || '')}
                    style={theme === 'dark' ? atomDark : prism}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      background: theme === 'dark' ? '#1a1b26' : '#f5f7ff',
                      fontSize: '0.875rem',
                      lineHeight: '1.5rem',
                      borderRadius: '0.5rem',
                    }}
                    showLineNumbers
                    wrapLines
                    wrapLongLines
                    lineNumberStyle={{
                      minWidth: '2.5em',
                      paddingRight: '1em',
                      color: theme === 'dark' ? '#565f89' : '#666',
                      backgroundColor: theme === 'dark' ? '#16161e' : '#edf2fc',
                      borderRight: theme === 'dark' ? '1px solid #2a2e3f' : '1px solid #e2e8f0',
                    }}
                  >
                    {item.code || '// No code provided'}
                  </SyntaxHighlighter>
                </div>

                {/* Explanation Column */}
                <div className={cn(
                  "rounded-lg",
                  "bg-white/80 dark:bg-gray-800/50",
                  "border border-gray-200 dark:border-gray-700",
                  "prose prose-gray dark:prose-invert max-w-none",
                  "max-h-[300px] lg:max-h-[400px]",
                  "overflow-y-auto",
                  "custom-scrollbar"
                )}>
                  <div className="p-4">
                    <ReactMarkdown
                      className={cn(
                        "text-gray-700 dark:text-gray-300",
                        "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
                        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
                        "prose-code:text-pink-500 dark:prose-code:text-pink-400",
                        "prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/90",
                        "prose-pre:text-sm prose-pre:leading-relaxed",
                        "prose-a:text-blue-600 dark:prose-a:text-blue-400",
                        "prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400",
                        "prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700",
                        "prose-img:rounded-lg"
                      )}
                      components={{
                        code({ className, children, ...props }) {
                          return (
                            <code
                              className={cn(
                                "bg-gray-100 dark:bg-gray-800",
                                "text-pink-500 dark:text-pink-400",
                                "rounded px-1.5 py-0.5",
                                "text-sm",
                                className
                              )}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        span: ({ node, ...props }) => {
                          return <span {...props} style={{ ...props.style }} />;
                        }
                      }}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item.explanation || 'No explanation provided'}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 