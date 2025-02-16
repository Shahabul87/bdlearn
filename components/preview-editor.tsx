"use client";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css'; // Use bubble theme for preview
import './preview-editor.css'; // Import the custom styles

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface PreviewEditorProps {
  content: string;
}

export const PreviewEditor = ({ content }: PreviewEditorProps) => {
  if (!content) return null;

  return (
    <div className="bg-transparent prose prose-sm dark:prose-invert max-w-none">
      <div className="[&_.ql-editor]:!text-black dark:[&_.ql-editor]:!text-gray-200">
        <ReactQuill
          theme="bubble"
          value={content}
          readOnly={true}
          modules={{ toolbar: false }}
        />
      </div>
    </div>
  );
};
