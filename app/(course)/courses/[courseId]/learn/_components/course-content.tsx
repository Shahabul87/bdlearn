"use client";

import { useState } from "react";
import { Course, Chapter, Section } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import parse from 'html-react-parser';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChapterContentProps {
  chapter: Chapter & {
    sections: Section[];
  };
  course: Course & {
    chapters: (Chapter & {
      sections: Section[];
    })[];
  };
  userId: string;
}

export const ChapterContent = ({
  chapter,
  course,
  userId
}: ChapterContentProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);

  const currentIndex = course.chapters.findIndex(c => c.id === chapter.id);
  const nextChapter = course.chapters[currentIndex + 1];
  const previousChapter = course.chapters[currentIndex - 1];

  const parseOptions = {
    replace: (domNode: any) => {
      if (domNode.type === 'tag') {
        // Handle nested content recursively
        const getContent = (node: any): string => {
          if (!node.children) return '';
          return node.children.map((child: any) => {
            if (child.type === 'text') return child.data;
            if (child.type === 'tag') {
              const innerContent = getContent(child);
              switch (child.name) {
                case 'strong':
                  return `<strong>${innerContent}</strong>`;
                case 'em':
                  return `<em>${innerContent}</em>`;
                case 'code':
                  return `<code>${innerContent}</code>`;
                case 'a':
                  return `<a href="${child.attribs.href}">${innerContent}</a>`;
                default:
                  return innerContent;
              }
            }
            return '';
          }).join('');
        };

        const content = getContent(domNode);

        switch (domNode.name) {
          case 'h1':
            return (
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {parse(content)}
              </h1>
            );
          case 'h2':
            return (
              <h2 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">
                {parse(content)}
              </h2>
            );
          case 'p':
            return (
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {parse(content)}
              </p>
            );
          case 'ul':
            return (
              <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {domNode.children
                  .filter((child: any) => child.type === 'tag' && child.name === 'li')
                  .map((child: any, index: number) => (
                    <li key={index}>{parse(getContent(child))}</li>
                  ))}
              </ul>
            );
          case 'ol':
            return (
              <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                {domNode.children
                  .filter((child: any) => child.type === 'tag' && child.name === 'li')
                  .map((child: any, index: number) => (
                    <li key={index}>{parse(getContent(child))}</li>
                  ))}
              </ol>
            );
          case 'strong':
            return (
              <strong className="font-bold text-gray-900 dark:text-gray-100">
                {parse(content)}
              </strong>
            );
          case 'em':
            return (
              <em className="italic text-gray-800 dark:text-gray-200">
                {parse(content)}
              </em>
            );
          case 'a':
            return (
              <a 
                href={domNode.attribs.href}
                className="text-purple-600 dark:text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {parse(content)}
              </a>
            );
          case 'code':
            return (
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md font-mono text-sm text-purple-600 dark:text-purple-400">
                {parse(content)}
              </code>
            );
          case 'pre':
            return (
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                {parse(content)}
              </pre>
            );
          case 'blockquote':
            return (
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4">
                {parse(content)}
              </blockquote>
            );
          default:
            return parse(content);
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Chapter Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            {chapter.title}
          </h1>
        </div>

        {/* Chapter Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 leading-relaxed text-base lg:text-lg"
          >
            {chapter.description && parse(chapter.description, parseOptions)}
          </motion.div>
        </div>

        {/* Sections List */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">Chapter Sections</h2>
          <div className="space-y-4">
            {chapter.sections?.map((section, index) => (
              <Link 
                key={section.id}
                href={`/courses/${course.id}/learn/${chapter.id}/sections/${section.id}`}
              >
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-3">
                        <span className="flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 w-7 h-7 rounded-full text-purple-600 dark:text-purple-400 text-sm font-semibold">
                          {index + 1}
                        </span>
                        {section.title}
                      </h3>
                      {section.type && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-10">
                          {section.type}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 border-t dark:border-gray-800 pt-4">
          <div className="flex items-center gap-x-2">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Chapter {currentIndex + 1} of {course.chapters.length}
            </span>
          </div>
          
          {previousChapter && (
            <Link 
              href={`/courses/${course.id}/learn/${previousChapter.id}`}
              className="group flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Previous Chapter
            </Link>
          )}
          
          {nextChapter && (
            <Link 
              href={`/courses/${course.id}/learn/${nextChapter.id}`}
              className="group flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Next Chapter
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}; 