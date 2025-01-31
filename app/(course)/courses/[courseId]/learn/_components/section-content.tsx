import { db } from "@/lib/db";
import { Loader2, Video, BookOpen, FileText, Code } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { cn } from "@/lib/utils";
import SectionHeroPage from "@/app/[sectionId]/_components/section-hero-page";
import SectionVideos from "@/app/[sectionId]/_sectionVideos/section-video-component";
import SectionBlogs from "@/app/[sectionId]/_sectionBlogs/section-blog-component";
import { CodeExplanation } from "./code-explanation";

interface SectionContentProps {
  sectionId: string;
  section: any; // Type this properly based on your data structure
}

export function SectionContent({ sectionId, section }: SectionContentProps) {
  if (!section) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  const hasAdditionalContent = 
    (section.videos?.length > 0) ||
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
          description={section.type || null}
          videoUrl={section.videoUrl}
          isFree={section.isFree}
          courseTitle={section.chapter.course.title}
          chapterTitle={section.chapter.title}
        />
      </div>

      {section.codeExplanations && section.codeExplanations.length > 0 && (
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
            {section.codeExplanations.map((item: any) => (
              <CodeExplanation key={item.id} item={item} />
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
} 