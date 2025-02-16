import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface DisplayExplanationsProps {
  items: {
    id: string;
    heading: string | null;
    code: string | null;
    explanation: string | null;
  }[];
  onCreateClick: () => void;
}

export const DisplayExplanations = ({ items, onCreateClick }: DisplayExplanationsProps) => {
  return (
    <div className="mt-6 space-y-6">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Code2 className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No explanations yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-4">
            Add your first code explanation to help others understand the concepts better.
          </p>
          <Button
            onClick={onCreateClick}
            variant="ghost"
            className={cn(
              "bg-indigo-50 dark:bg-indigo-500/10",
              "text-indigo-700 dark:text-indigo-300",
              "hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
              "hover:text-indigo-800 dark:hover:text-indigo-200",
              "transition-all duration-200"
            )}
          >
            Add explanation
          </Button>
        </div>
      ) : (
        items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Code Section */}
              <div className="rounded-lg overflow-hidden">
                <SyntaxHighlighter
                  language="typescript"
                  style={atomDark}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                  }}
                  showLineNumbers
                >
                  {(item.code || '').toString()}
                </SyntaxHighlighter>
              </div>

              {/* Explanation Section */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {item.explanation || ''}
                </ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}; 