"use client";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';  // Use bubble theme for preview

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface PreviewEditorProps {
  content: string;
}

export const PreviewEditor = ({ content }: PreviewEditorProps) => {
  return (
    <div className="bg-transparent">
      <ReactQuill
        theme="bubble"
        value={content}
        readOnly={true}
        modules={{ toolbar: false }}
      />
    </div>
  );
}; 