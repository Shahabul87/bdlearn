"use client";

import { useEffect, useState } from "react";
import { Loader2, Video, BookOpen, FileText, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { cn } from "@/lib/utils";
import SectionHeroPage from "@/app/[sectionId]/_components/section-hero-page";
import SectionVideos from "@/app/[sectionId]/_sectionVideos/section-video-component";
import SectionBlogs from "@/app/[sectionId]/_sectionBlogs/section-blog-component";

interface SectionContentProps {
  sectionId: string;
  initialData: {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string | null;
    isFree: boolean;
    chapterTitle: string;
    courseTitle: string;
    videos: any[];
    blogs: any[];
    articles: any[];
    codeExplanations: {
      id: string;
      heading: string | null;
      code: string | null;
      explanation: string | null;
    }[];
  };
}

export const SectionContent = ({ sectionId, initialData }: SectionContentProps) => {
  const [section, setSection] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [theme] = useState<'light' | 'dark'>('dark');

  const detectLanguage = (code: string) => {
    if (code.includes('function') || code.includes('const') || code.includes('let')) return 'javascript';
    if (code.includes('<div') || code.includes('</div>')) return 'markup';
    if (code.includes('import') || code.includes('from')) return 'typescript';
    return 'typescript';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500 dark:text-purple-400" />
      </div>
    );
  }

  const hasAdditionalContent = 
    (section.videos?.length > 0) ||
    (section.blogs?.length > 0) ||
    (section.articles?.length > 0);

  return (
    <div className="space-y-12">
      <div className={cn(
        "rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-purple-50/50 to-pink-50/50",
        "dark:from-purple-900/10 dark:to-pink-900/10",
        "border border-purple-100/50 dark:border-purple-800/20"
      )}>
        <SectionHeroPage 
          title={section.title}
          description={section.description}
          videoUrl={section.videoUrl}
          isFree={section.isFree}
          courseTitle={section.courseTitle}
          chapterTitle={section.chapterTitle}
        />
      </div>

      {section.codeExplanations?.length > 0 && (
        <div className={cn(
          "rounded-2xl",
          "bg-white/80 dark:bg-gray-800/50",
          "border border-gray-200/50 dark:border-gray-700/50",
          "p-8 backdrop-blur-sm"
        )}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Code Examples & Explanations
            </h2>
          </div>

          <div className="space-y-8">
            {section.codeExplanations.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "rounded-xl overflow-hidden",
                  "bg-gray-50/50 dark:bg-gray-900/50",
                  "border border-gray-200/50 dark:border-gray-700/50"
                )}
              >
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {item.heading}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200/50 dark:divide-gray-700/50">
                  {/* Code Column */}
                  <div className="p-4 bg-gray-50/80 dark:bg-gray-900/80">
                    <SyntaxHighlighter
                      language={detectLanguage(item.code || '')}
                      style={theme === 'dark' ? atomDark : prism}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: theme === 'dark' ? '#1a1b26' : '#f8fafc',
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
                        color: theme === 'dark' ? '#565f89' : '#94a3b8',
                        backgroundColor: theme === 'dark' ? '#16161e' : '#f1f5f9',
                        borderRight: theme === 'dark' ? '1px solid #2a2e3f' : '1px solid #e2e8f0',
                      }}
                    >
                      {item.code || '// No code provided'}
                    </SyntaxHighlighter>
                  </div>

                  {/* Explanation Column */}
                  <div className={cn(
                    "p-4 max-h-[500px] overflow-y-auto custom-scrollbar",
                    "bg-white/50 dark:bg-gray-900/50"
                  )}>
                    <ReactMarkdown
                      className={cn(
                        "prose prose-gray dark:prose-invert max-w-none",
                        "text-gray-700 dark:text-gray-300",
                        "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
                        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
                        "prose-code:text-pink-600 dark:prose-code:text-pink-400",
                        "prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800",
                        "prose-pre:text-sm prose-pre:leading-relaxed",
                        "prose-a:text-blue-600 dark:prose-a:text-blue-400",
                        "prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400",
                        "prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700"
                      )}
                      components={{
                        code({ className, children, ...props }: React.HTMLProps<HTMLElement>) {
                          return (
                            <code
                              className={cn(
                                "bg-gray-800",
                                "text-pink-400",
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
            ))}
          </div>
        </div>
      )}

      {hasAdditionalContent && (
        <div className={cn(
          "rounded-2xl",
          "bg-white/80 dark:bg-gray-800/50",
          "border border-gray-200/50 dark:border-gray-700/50",
          "p-8 backdrop-blur-sm"
        )}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Additional Learning Resources
            </h2>
          </div>
          
          <div className="space-y-8">
            {section.videos && section.videos.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Video className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Additional Videos</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionVideos videos={section.videos} />
                </div>
              </div>
            )}
            
            {section.blogs && section.blogs.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Related Blog Posts</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionBlogs blogs={section.blogs} />
                </div>
              </div>
            )}

            {section.articles && section.articles.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Recommended Articles</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.articles.map((article: any) => (
                    <div 
                      key={article.id}
                      className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/30 hover:bg-gray-900/70 transition-all duration-200"
                    >
                      <h4 className="text-lg font-medium text-white mb-2">
                        {article.title}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 