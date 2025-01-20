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
                      "flex items-center gap-x-2 bg-gray-800/50 border border-gray-700/50 text-gray-200",
                      "rounded-lg mb-4 text-sm",
                      "hover:bg-gray-800/70 transition-colors duration-200",
                      chapter.isPublished && "bg-purple-500/5 border-purple-500/20"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className="px-2 py-3 border-r border-r-gray-700/50 hover:bg-gray-700/50 rounded-l-lg transition-colors cursor-grab"
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex-1 px-2">{chapter.title}</div>
                    <div className="flex items-center gap-x-2 pr-2">
                      <Badge variant={chapter.isPublished ? "success" : "secondary"}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Button onClick={() => onEdit(chapter.id)} variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => onDelete(chapter.id)} variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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