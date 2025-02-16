"use client";

import { useEffect, useRef, useState } from "react";
import { CodeExplanation as CodeExplanationType } from "@prisma/client";
import { Code, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import parse from 'html-react-parser';

interface CodeExplanationProps {
  content: CodeExplanationType[];
  courseId: string;
  chapterId: string;
  sectionId: string;
}

export const CodeExplanation = ({ content }: CodeExplanationProps) => {
  const [codeHeights, setCodeHeights] = useState<{ [key: string]: number }>({});
  const codeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Create a reversed copy of the content array
  const reversedContent = [...content].reverse();

  useEffect(() => {
    const updateHeights = () => {
      const newHeights: { [key: string]: number } = {};
      reversedContent.forEach((codeExp) => {
        if (codeRefs.current[codeExp.id]) {
          newHeights[codeExp.id] = codeRefs.current[codeExp.id]?.offsetHeight || 0;
        }
      });
      setCodeHeights(newHeights);
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [reversedContent]);

  return (
    <div className="w-full px-4 md:px-6 lg:px-6 xl:px-8 py-4 sm:py-6 md:py-8">
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {reversedContent.map((codeExp, index) => (
          <motion.div
            key={codeExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-4 sm:p-4 md:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {codeExp.heading}
                </h3>
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Code Column */}
                <div 
                  ref={(el) => {
                    if (el) codeRefs.current[codeExp.id] = el;
                  }}
                  className="rounded-lg overflow-hidden"
                >
                  <div className="text-sm lg:text-base">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem'
                      }}
                      showLineNumbers
                    >
                      {(codeExp.code || '').toString()}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* Explanation Column */}
                <div 
                  style={{ height: codeHeights[codeExp.id] || 'auto' }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 sm:p-5 md:p-6 overflow-y-auto custom-scrollbar"
                >
                  <div className="prose prose-sm sm:prose-base lg:prose-lg md:text-lg text-relaxed dark:prose-invert max-w-none">
                    {parse(codeExp.explanation || '', {
                      replace: (domNode: any) => {
                        if (domNode.name === 'code') {
                          return (
                            <code className="bg-gray-100 dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-1 py-0.5 rounded">
                              {domNode.children[0].data}
                            </code>
                          );
                        }
                      }
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
                  Added {format(new Date(codeExp.createdAt), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 