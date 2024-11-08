"use client";

import { FavoriteAudio } from "@prisma/client"; // Import FavoriteAudio type from Prisma
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

interface FavoriteAudioListProps {
  items: FavoriteAudio[]; // Accept array of FavoriteAudio type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const FavoriteAudioList = ({
  items,
  onReorder,
  onEdit,
}: FavoriteAudioListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteAudios, setFavoriteAudios] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setFavoriteAudios(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedAudios = Array.from(favoriteAudios);
    const [movedAudio] = reorderedAudios.splice(result.source.index, 1);
    reorderedAudios.splice(result.destination.index, 0, movedAudio);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedAudios = reorderedAudios.slice(startIndex, endIndex + 1);

    setFavoriteAudios(reorderedAudios);

    const bulkUpdateData = updatedAudios.map((audio) => ({
      id: audio.id,
      position: reorderedAudios.findIndex((item) => item.id === audio.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favoriteAudios">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {favoriteAudios.map((audio, index) => (
              <Draggable key={audio.id} draggableId={audio.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className="px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{audio.title}</span>
                      <span className="text-xs text-gray-500">
                        Platform: {audio.platform}
                      </span>
                      <a
                        href={audio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        {audio.url}
                      </a>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(audio.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span
                        className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(audio.id)}
                      >
                        <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                        Edit
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
