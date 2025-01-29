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

// Import ReactQuill dynamically with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Optional loading component
});

interface EditorProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
}

export const Editor = ({ onChange, disabled, placeholder, value }: EditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={disabled}
      />
    </div>
  );
};


