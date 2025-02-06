"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Plus, 
  Search, 
  FolderOpen,
  Tag,
  Edit,
  Trash2,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  lastModified: Date;
}

export const NotesManager = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Notes List */}
      <div className="md:col-span-1 space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[600px] rounded-md border p-4">
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No notes yet. Create one!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer",
                    "border border-gray-200 dark:border-gray-700",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    selectedNote?.id === note.id && "bg-purple-50 dark:bg-purple-900/20"
                  )}
                  onClick={() => setSelectedNote(note)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="font-medium mb-1">{note.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <span>
                      {new Date(note.lastModified).toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Note Editor */}
      <div className="md:col-span-2">
        {selectedNote ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-between">
              <Input
                value={selectedNote.title}
                disabled={!isEditing}
                className="text-xl font-bold bg-transparent border-none"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <textarea
              className={cn(
                "w-full h-[500px] p-4 rounded-lg",
                "bg-white dark:bg-gray-800",
                "border border-gray-200 dark:border-gray-700",
                !isEditing && "cursor-not-allowed"
              )}
              disabled={!isEditing}
              value={selectedNote.content}
            />
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Select a note to view or edit</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 