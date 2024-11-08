"use client";

import { FavoriteVideo } from "@prisma/client"; // Import FavoriteVideo type from Prisma
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

interface FavoriteVideoListProps {
  items: FavoriteVideo[]; // Accept array of FavoriteVideo type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const FavoriteVideoList = ({
  items,
  onReorder,
  onEdit,
}: FavoriteVideoListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteVideos, setFavoriteVideos] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setFavoriteVideos(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(favoriteVideos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedVideos = reorderedVideos.slice(startIndex, endIndex + 1);

    setFavoriteVideos(reorderedVideos);

    const bulkUpdateData = updatedVideos.map((video) => ({
      id: video.id,
      position: reorderedVideos.findIndex((item) => item.id === video.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favoriteVideos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {favoriteVideos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
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
                      <span className="font-medium">{video.title}</span>
                      <span className="text-xs text-gray-500">
                        Platform: {video.platform}
                      </span>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        {video.url}
                      </a>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(video.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span
                        className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(video.id)}
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
