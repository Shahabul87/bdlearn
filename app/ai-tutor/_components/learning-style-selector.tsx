"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  { id: "visual", name: "Visual" },
  { id: "auditory", name: "Auditory" },
  { id: "reading", name: "Reading" },
  { id: "kinesthetic", name: "Hands-on" }
];

export const LearningStyleSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => setSelectedStyle(style.id)}
          className={cn(
            "p-4 rounded-lg border transition-colors",
            selectedStyle === style.id 
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" 
              : "border-gray-200 dark:border-gray-800"
          )}
        >
          {style.name}
        </button>
      ))}
    </div>
  );
}; 