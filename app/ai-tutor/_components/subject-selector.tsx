"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "programming", name: "Programming" },
  { id: "language", name: "Languages" }
];

export const SubjectSelector = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          onClick={() => setSelectedSubject(subject.id)}
          className={cn(
            "p-4 rounded-lg border transition-colors",
            selectedSubject === subject.id 
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
              : "border-gray-200 dark:border-gray-800"
          )}
        >
          {subject.name}
          {selectedSubject === subject.id && (
            <Check className="w-4 h-4 text-purple-500 ml-2 inline" />
          )}
        </button>
      ))}
    </div>
  );
}; 