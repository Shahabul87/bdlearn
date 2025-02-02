"use client";

import { Video } from "@prisma/client"; // Import Video type from Prisma
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface VideoSectionListProps {
  items: {
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    duration: number | null;
    rating: number | null;  // Updated from clarityRating
    position: number;
    isPublished: boolean;
    sectionId: string;
  }[];
  sectionId: string;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

// Helper function to format duration
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} min ${remainingSeconds} sec`;
};

export const VideoSectionList = ({
  items,
  sectionId,
  onReorder,
  onEdit,
  onDelete,
}: VideoSectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [videos, setVideos] = useState<{
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    duration: number | null;
    rating: number | null;  // Updated from clarityRating
    position: number;
    isPublished: boolean;
    sectionId: string;
  }[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  // Filter videos by the provided sectionId
  const filteredVideos = items.filter((video) => video.sectionId === sectionId);

  useEffect(() => {
    setIsMounted(true);
    setVideos(
      [...filteredVideos].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [filteredVideos]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);

    const updatedVideos = reorderedVideos.map((video, index) => ({
      ...video,
      position: index,
    }));
    setVideos(updatedVideos);

    const bulkUpdateData = updatedVideos.map((video) => ({
      id: video.id,
      position: video.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setVideoToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (videoToDelete) {
      onDelete(videoToDelete);
      setShowDeleteModal(false);
      setVideoToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {videos.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className={cn(
                        "mb-4 p-4 rounded-lg",
                        "border border-gray-200 dark:border-gray-700/50",
                        "bg-white/50 dark:bg-gray-800/40",
                        "hover:bg-gray-50 dark:hover:bg-gray-800/60",
                        "transition-all duration-200",
                        "backdrop-blur-sm"
                      )}
                    >
                      <div className="flex items-center gap-x-2">
                        <div
                          {...provided.dragHandleProps}
                          className={cn(
                            "p-2 rounded-lg",
                            "hover:bg-gray-100 dark:hover:bg-gray-700/50",
                            "transition-colors"
                          )}
                        >
                          <Grip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                            {video.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {video.description}
                          </p>
                          <span className="text-xs text-gray-500">
                            Duration: {video.duration !== null ? formatDuration(video.duration) : "Unknown"} | Rating: {video.rating}/5
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
                          <span
                            className="flex items-center justify-between cursor-pointer hover:opacity-75 transition text-red-600"
                            onClick={() => confirmDelete(video.id)}
                          >
                            <Trash className="w-4 h-4 cursor-pointer hover:opacity-75 transition mr-1" />{" "}
                            Delete
                          </span>
                        </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this video section?
            </p>
            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="text-black">
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
