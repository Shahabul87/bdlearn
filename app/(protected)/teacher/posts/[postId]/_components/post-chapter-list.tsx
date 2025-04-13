"use client";

import { useEffect, useState } from "react";
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult 
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PostChapter {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  isFree: boolean;
  postId: string;
}

interface PostChapterListProps {
  items: PostChapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PostChapterList({
  items,
  onReorder,
  onEdit,
  onDelete
}: PostChapterListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id)
    }));

    onReorder(bulkUpdateData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable 
                key={chapter.id} 
                draggableId={chapter.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50",
                      "rounded-lg mb-4 text-sm",
                      "hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors duration-200",
                      chapter.isPublished && "bg-purple-50/50 dark:bg-purple-500/5 border-purple-200/50 dark:border-purple-500/20"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-gray-200/50 dark:border-r-gray-700/50",
                        "hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-l-lg transition-colors cursor-grab",
                        "flex items-center justify-center"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip 
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" 
                      />
                    </div>
                    <div className="flex-1 px-2 py-3 text-gray-700 dark:text-gray-200">
                      {chapter.title}
                    </div>
                    <div className="flex items-center gap-x-2 pr-2">
                      <Badge
                        variant={chapter.isPublished ? "default" : "secondary"}
                        className={cn(
                          "hidden sm:flex",
                          chapter.isPublished && "bg-green-600 hover:bg-green-700 text-white"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Button 
                        onClick={() => onEdit(chapter.id)} 
                        variant="ghost"
                        className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit chapter</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete chapter</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
                              Delete Chapter
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                              Are you sure you want to delete this chapter? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-gray-600 dark:text-gray-300">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(chapter.id)}
                              className="bg-rose-500 text-white hover:bg-rose-600 dark:hover:bg-rose-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
} 