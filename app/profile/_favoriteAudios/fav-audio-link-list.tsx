"use client";

import { FavoriteAudio } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteAudioListProps {
  items: FavoriteAudio[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const FavoriteAudioList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: FavoriteAudioListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteAudios, setFavoriteAudios] = useState<FavoriteAudio[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [audioToDelete, setAudioToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setFavoriteAudios(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedAudios = Array.from(favoriteAudios);
    const [movedAudio] = reorderedAudios.splice(result.source.index, 1);
    reorderedAudios.splice(result.destination.index, 0, movedAudio);

    const updatedAudios = reorderedAudios.map((audio, index) => ({
      ...audio,
      position: index,
    }));
    setFavoriteAudios(updatedAudios);

    const bulkUpdateData = updatedAudios.map((audio) => ({
      id: audio.id,
      position: audio.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setAudioToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (audioToDelete) {
      onDelete(audioToDelete);
      setShowDeleteModal(false);
      setAudioToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteAudios">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {favoriteAudios.map((audio, index) => (
                  <Draggable key={audio.id} draggableId={audio.id} index={index}>
                    {(provided) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "flex items-center gap-x-2",
                          "bg-white/60 dark:bg-gray-800/60",
                          "border-gray-200/50 dark:border-gray-700/50 border",
                          "rounded-lg mb-4 text-sm overflow-hidden backdrop-blur-sm",
                          "transition-all duration-200 group",
                          "hover:border-emerald-500/50 dark:hover:border-emerald-400/50"
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <div
                          className={cn(
                            "px-2 py-3 border-r",
                            "border-r-gray-200/50 dark:border-r-gray-700/50",
                            "hover:bg-gray-100/50 dark:hover:bg-gray-700/50",
                            "rounded-l-lg transition"
                          )}
                          {...provided.dragHandleProps}
                        >
                          <Grip className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4 px-4 py-3 flex-grow">
                          <div className="flex flex-col gap-2">
                            <span className="font-medium text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text">
                              {audio.title}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Platform: <span className="text-emerald-600 dark:text-emerald-400">{audio.platform}</span>
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(audio.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <a
                              href={audio.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <Music2 className="h-3 w-3" />
                              <span className="truncate">{audio.url}</span>
                            </a>
                          </div>
                        </div>
                        <div className="ml-auto pr-4 flex items-center gap-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(audio.id)}
                            className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => confirmDelete(audio.id)}
                            className="flex items-center gap-1.5 text-red-600 dark:text-rose-400 hover:text-red-700 dark:hover:text-rose-300 transition-colors"
                          >
                            <Trash className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Delete Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={cn(
              "p-6 rounded-xl max-w-md w-full mx-4",
              "bg-white dark:bg-gray-800",
              "border border-gray-200 dark:border-gray-700",
              "shadow-xl"
            )}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this favorite audio? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="bg-red-600 dark:bg-rose-500 hover:bg-red-700 dark:hover:bg-rose-600 text-white"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
