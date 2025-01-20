"use client";

import { FavoriteArticle } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteArticleListProps {
  items: FavoriteArticle[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string, data: {
    title: string;
    platform: string;
    url: string;
    category?: string;
  }) => void;
  onDelete: (id: string) => void;
}

export const FavoriteArticleList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: FavoriteArticleListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useState<FavoriteArticle[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setFavoriteArticles(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedArticles = Array.from(favoriteArticles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);

    const updatedArticles = reorderedArticles.map((article, index) => ({
      ...article,
      position: index,
    }));
    setFavoriteArticles(updatedArticles);

    const bulkUpdateData = updatedArticles.map((article) => ({
      id: article.id,
      position: article.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (articleToDelete) {
      onDelete(articleToDelete);
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteArticles">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {favoriteArticles.map((article, index) => (
                  <Draggable key={article.id} draggableId={article.id} index={index}>
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
                          "hover:border-indigo-500/50 dark:hover:border-indigo-400/50"
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
                            <span className="font-medium text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text">
                              {article.title}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Platform: <span className="text-indigo-600 dark:text-indigo-400">{article.platform}</span>
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(article.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <BookOpen className="h-3 w-3" />
                              <span className="truncate">{article.url}</span>
                            </a>
                            {article.category && (
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 w-fit">
                                {article.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-auto pr-4 flex items-center gap-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(article.id, {
                              title: article.title,
                              platform: article.platform,
                              url: article.url,
                              category: article.category || undefined,
                            })}
                            className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => confirmDelete(article.id)}
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
              Are you sure you want to delete this favorite article? This action cannot be undone.
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
