"use client";

import { Video } from "@prisma/client"; // Import Video type from Prisma
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

interface VideoSectionListProps {
  items: Video[]; // Accept array of Video type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const VideoSectionList = ({
  items,
  onReorder,
  onEdit,
}: VideoSectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [videos, setVideos] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setVideos(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedVideos = reorderedVideos.slice(startIndex, endIndex + 1);

    setVideos(reorderedVideos);

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
      <Droppable droppableId="videos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      video.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        video.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span>{video.title}</span>
                      <span className="text-xs text-gray-500">
                        Duration: {video.duration} sec | Clarity: {video.clarityRating}/5
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          video.isPublished && "bg-sky-700"
                        )}
                      >
                        {video.isPublished ? "Published" : "Draft"}
                      </Badge>
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


