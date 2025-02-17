import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { Editor } from '@monaco-editor/react';
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dynamic import for React Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// Quill modules configuration
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    ['blockquote', 'code-block', 'code'],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    matchVisual: true
  },
  keyboard: {
    bindings: {
      tab: false,
      'indent backwards': false
    }
  }
};

const languageOptions = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
  { value: 'go', label: 'Go' },
];

interface ExplanationFormFieldsProps {
  form: UseFormReturn<{
    heading: string;
    code: string;
    explanation: string;
  }>;
  isSubmitting: boolean;
}

export const ExplanationFormFields = ({ form, isSubmitting }: ExplanationFormFieldsProps) => {
  const [language, setLanguage] = useState('typescript');

  return (
    <>
      <FormField
        control={form.control}
        name="heading"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Heading</FormLabel>
            <FormControl>
              <Input {...field} disabled={isSubmitting} placeholder="Explanation heading" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Column */}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center justify-between h-[30px]">
                <FormLabel>Code</FormLabel>
                <Select
                  value={language}
                  onValueChange={setLanguage}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormControl>
                <div className="border rounded-lg overflow-hidden h-[400px]">
                  <Editor
                    height="400px"
                    defaultLanguage="typescript"
                    language={language}
                    value={field.value}
                    onChange={(value) => field.onChange(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      readOnly: isSubmitting,
                      wordWrap: 'on',
                      automaticLayout: true,
                      scrollBeyondLastLine: false,
                      padding: { top: 16, bottom: 16 },
                    }}
                    loading={<div className="text-sm text-muted-foreground">Loading editor...</div>}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Explanation Column */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <div className="h-[30px]">
                <FormLabel>Explanation</FormLabel>
              </div>
              <FormControl>
                <div className={cn(
                  "border rounded-md overflow-hidden h-[400px]",
                  "bg-white dark:bg-gray-900",
                  "[&_.ql-editor]:!text-black dark:[&_.ql-editor]:!text-white",
                  "[&_.ql-editor]:min-h-[300px] [&_.ql-editor]:max-h-[500px]",
                  "[&_.ql-editor]:overflow-y-auto",
                  "[&_.ql-editor]:text-sm",
                  "[&_.ql-editor_p]:!text-black dark:[&_.ql-editor_p]:!text-white",
                  "[&_.ql-editor_*]:!text-black dark:[&_.ql-editor_*]:!text-white",
                  "[&_.ql-picker-options]:bg-white dark:[&_.ql-picker-options]:bg-gray-800",
                  "[&_.ql-picker-item]:hover:text-blue-500",
                  "[&_.ql-picker-label]:hover:text-blue-500",
                  "[&_.ql-picker-item]:text-gray-800 dark:[&_.ql-picker-item]:text-gray-200",
                  "[&_.ql-align-center]:text-center",
                  "[&_.ql-align-right]:text-right",
                  "[&_.ql-align-justify]:text-justify",
                  "[&_.ql-size-small]:text-sm",
                  "[&_.ql-size-large]:text-lg",
                  "[&_.ql-size-huge]:text-xl",
                  "[&_.ql-blank::before]:text-gray-500",
                  "[&_.ql-toolbar]:border-gray-200 dark:[&_.ql-toolbar]:border-gray-700",
                  "[&_.ql-toolbar]:bg-gray-50 dark:[&_.ql-toolbar]:bg-gray-800",
                  "[&_.ql-container]:border-gray-200 dark:[&_.ql-container]:border-gray-700",
                  "[&_.ql-stroke]:stroke-black dark:[&_.ql-stroke]:stroke-white",
                  "[&_.ql-fill]:fill-black dark:[&_.ql-fill]:fill-white",
                  "[&_.ql-tooltip]:bg-white dark:[&_.ql-tooltip]:bg-gray-800",
                  "[&_.ql-tooltip]:text-sm",
                  "[&_.ql-tooltip]:shadow-md",
                  "[&_.ql-tooltip]:rounded-md",
                  "[&_.ql-tooltip]:p-2",
                  "[&_.ql-tooltip]:z-50",
                  "[&_.ql-editor]:prose dark:[&_.ql-editor]:prose-invert",
                  "[&_.ql-editor_span]:!text-inherit",
                  "[&_.ql-editor_span]:!bg-inherit",
                  "[&_.ql-color-picker]:!text-inherit",
                  "[&_.ql-picker]:!text-inherit",
                  "[&_.ql-snow_*]:!text-inherit",
                  "[&_.ql-snow_span]:!text-inherit",
                  "[&_.ql-toolbar]:p-3",
                  "[&_.ql-toolbar_button]:!w-8 [&_.ql-toolbar_button]:!h-8",
                  "[&_.ql-toolbar_button_svg]:!w-5 [&_.ql-toolbar_button_svg]:!h-5",
                  "[&_.ql-toolbar_.ql-picker-label]:!text-base",
                  "[&_.ql-toolbar_.ql-picker]:!h-8",
                  "[&_.ql-toolbar_.ql-picker-label]:!h-8 [&_.ql-toolbar_.ql-picker-label]:!leading-8",
                  "[&_.ql-toolbar]:flex [&_.ql-toolbar]:flex-wrap [&_.ql-toolbar]:items-center [&_.ql-toolbar]:gap-1",
                  "[&_.ql-formats]:flex [&_.ql-formats]:items-center [&_.ql-formats]:gap-1"
                )}>
                  <div className="border rounded-md overflow-hidden h-[400px]">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter explanation here"
                      className="!h-[400px]"
                      style={{ 
                        height: '400px',
                        minHeight: '400px',
                        maxHeight: '400px'
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}; 