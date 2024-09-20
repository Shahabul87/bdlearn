"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[];
}

export const ChaptersListCourseHome = ({ items }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  // Handle the drag end event
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If there's no destination (dropped outside a valid droppable area), return
    if (!destination) return;

    // If the item was dropped in the same place, no need to reorder
    if (source.index === destination.index) return;

    // Create a new order of chapters by reordering them
    const reorderedChapters = Array.from(chapters);
    const [movedChapter] = reorderedChapters.splice(source.index, 1);
    reorderedChapters.splice(destination.index, 0, movedChapter);

    setChapters(reorderedChapters);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge className={cn("bg-slate-500", chapter.isPublished && "bg-sky-700")}>
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <span className="flex items-center justify-between cursor-pointer hover:opacity-75 transition">
                        <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" /> Edit
                      </span>
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
};
