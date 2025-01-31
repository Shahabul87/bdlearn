"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

interface CodeExplanationProps {
  item: {
    id: string;
    heading: string;
    code: string;
    explanation: string;
  };
}

const detectLanguage = (code: string) => {
  if (code.includes('function') || code.includes('const') || code.includes('let')) return 'javascript';
  if (code.includes('<div') || code.includes('</div>')) return 'markup';
  if (code.includes('import') || code.includes('from')) return 'typescript';
  return 'typescript';
};

export function CodeExplanation({ item }: CodeExplanationProps) {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden",
        "bg-white dark:bg-gray-900/50",
        "border border-gray-200 dark:border-gray-700/50",
        "shadow-sm"
      )}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-800/50">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {item.heading}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700/50">
        {/* Code Column */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 lg:text-lg">
            <SyntaxHighlighter
              language={detectLanguage(item.code || '')}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: '#1a1b26',
                fontSize: '0.98rem',
                lineHeight: '1.5rem',
                borderRadius: '0.5rem',
              }}
              showLineNumbers
              wrapLines
              wrapLongLines
              lineNumberStyle={{
                minWidth: '2.5em',
                paddingRight: '1em',
                color: '#565f89',
                backgroundColor: '#16161e',
                borderRight: '1px solid #2a2e3f',
              }}
            >
              {item.code || '// No code provided'}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Explanation Column */}
        <div className={cn(
          "p-4 max-h-[500px] overflow-y-auto custom-scrollbar",
          "bg-white dark:bg-gray-900/50 lg:text-lg text-justify"
        )}>
          <ReactMarkdown
            className={cn(
              "prose dark:prose-invert prose-sm max-w-none",
              "prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
              "prose-p:text-gray-600 dark:prose-p:text-gray-300",
              "prose-strong:text-gray-900 dark:prose-strong:text-gray-100",
              "prose-code:text-pink-600 dark:prose-code:text-pink-400",
              "prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800",
              "prose-a:text-blue-600 dark:prose-a:text-blue-400",
              "prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400",
              "prose-blockquote:border-l-4 prose-blockquote:border-gray-200 dark:prose-blockquote:border-gray-700"
            )}
          >
            {item.explanation || 'No explanation provided'}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 