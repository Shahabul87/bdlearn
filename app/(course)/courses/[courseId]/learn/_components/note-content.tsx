"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Editor } from "@/components/editor";

interface NoteContentProps {
  noteId: string;
}

export const NoteContent = ({ noteId }: NoteContentProps) => {
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${noteId}`);
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Note content not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">{note.title}</h1>
      <div className="prose prose-invert max-w-none">
        <Editor 
          initialContent={note.content}
          editable={false}
        />
      </div>
    </div>
  );
}; 