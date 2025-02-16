"use client";

// import React, { useState } from 'react';
// // import dynamic from "next/dynamic";
// // import { useMemo } from "react";
// import ReactQuill from 'react-quill';
// import "react-quill/dist/quill.snow.css";


// interface EditorProps {
//   onChange: (value: string) => void;
//   value: string;
// };

// export const Editor = ({
//   onChange,
//   value,
// }: EditorProps) => {
//   //const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
//  // const [value, setValue] = useState(value);
//   return (
//     <div className="bg-white">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   );
// };


import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Import ReactQuill dynamically with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  placeholder?: string;
}

export const Editor = ({ onChange, value, disabled, placeholder }: EditorProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "bg-white dark:bg-gray-900 transition-colors duration-200",
      "explanation-editor"
    )}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"],
          ],
        }}
      />
    </div>
  );
};


