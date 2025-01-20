"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Grip, Pencil, Lock, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChaptersListProps {
  items: {
    id: string;
    title: string;
    position: number;
    description: string | null;
    isPublished: boolean;
    isFree: boolean;
    courseGoals: string | null;
    learningOutcomes: string | null;
    sectionCount: number | null;
    totalDuration: number | null;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};

export const ChaptersList = ({
  items,
  onReorder,
  onEdit
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

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

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef} 
            className={cn(
              "space-y-3",
              "overflow-x-auto pb-4",
              "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
              "scrollbar-track-transparent"
            )}
          >
            <div className="min-w-[600px] sm:min-w-full">
              {chapters.map((chapter, index) => (
                <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 mb-3",
                        "bg-white/50 dark:bg-gray-900/50 border",
                        "border-gray-200 dark:border-gray-700/50 rounded-xl",
                        "text-gray-900 dark:text-gray-100",
                        "shadow-sm backdrop-blur-sm",
                        "transition-all duration-200",
                        chapter.isPublished && "bg-purple-50/50 dark:bg-purple-900/20 border-purple-200/50 dark:border-purple-500/30"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-3 py-4 border-r transition-colors",
                          "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                          "rounded-l-xl cursor-grab",
                          "border-gray-200 dark:border-gray-700/50",
                          chapter.isPublished && "border-purple-200/50 dark:border-purple-500/30"
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1 flex items-center justify-between px-2">
                        <p className="text-sm sm:text-base font-medium line-clamp-1 text-gray-900 dark:text-gray-100 min-w-[120px]">
                          {chapter.title}
                        </p>
                        <div className="flex items-center gap-x-2 sm:gap-x-3">
                          {chapter.isFree ? (
                            <div className="flex items-center justify-center gap-x-1 text-emerald-700 dark:text-emerald-400 min-w-[40px]">
                              <Unlock className="h-4 w-4" />
                              <span className="text-xs font-medium hidden sm:inline">Free</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center min-w-[40px]">
                              <Lock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                          )}
                          <Badge className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium min-w-[70px] text-center",
                            chapter.isPublished 
                              ? "bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-500/30"
                              : "bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50"
                          )}>
                            {chapter.isPublished ? "Published" : "Draft"}
                          </Badge>
                          <button
                            onClick={() => onEdit(chapter.id)}
                            className={cn(
                              "flex items-center justify-center gap-x-1.5 px-2 py-1 rounded-md min-w-[40px]",
                              "text-gray-700 dark:text-gray-300",
                              "hover:text-gray-900 dark:hover:text-gray-100",
                              "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                              "transition-colors"
                            )}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}