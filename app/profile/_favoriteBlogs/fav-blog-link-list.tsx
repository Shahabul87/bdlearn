"use client";

import { FavoriteBlog } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash, Newspaper, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FavoriteBlogListProps {
  items: FavoriteBlog[];
  userId: string;
  onEdit: (id: string, data: {
    title: string;
    platform: string;
    url: string;
    category?: string;
  }) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onDelete: (id: string) => void;
}

export const FavoriteBlogList = ({
  items,
  userId,
  onEdit,
  onReorder,
  onDelete
}: FavoriteBlogListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteBlogs, setFavoriteBlogs] = useState<FavoriteBlog[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    platform: "",
    url: "",
    category: "",
  });
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setFavoriteBlogs(
      [...items].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    );
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBlogs = Array.from(favoriteBlogs);
    const [movedBlog] = reorderedBlogs.splice(result.source.index, 1);
    reorderedBlogs.splice(result.destination.index, 0, movedBlog);

    const updatedBlogs = reorderedBlogs.map((blog, index) => ({
      ...blog,
      position: index,
    }));
    setFavoriteBlogs(updatedBlogs);

    const bulkUpdateData = updatedBlogs.map((blog) => ({
      id: blog.id,
      position: blog.position,
    }));
    onReorder(bulkUpdateData);
  };

  const confirmDelete = (id: string) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (blogToDelete) {
      onDelete(blogToDelete);
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await axios.patch(`/api/users/${userId}/favorite-blogs/${id}`, {
        title: editData.title,
        platform: editData.platform,
        url: editData.url,
        category: editData.category,
      });

      toast.success("Blog link updated");
      setEditingId(null);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="favoriteBlogs">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {favoriteBlogs.map((blog, index) => (
                  <Draggable key={blog.id} draggableId={blog.id} index={index}>
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
                          "hover:border-amber-500/50 dark:hover:border-amber-400/50"
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
                            <span className="font-medium text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text">
                              {blog.title}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Platform: <span className="text-amber-600 dark:text-amber-400">{blog.platform}</span>
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <a
                              href={blog.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <Globe className="h-3 w-3" />
                              <span className="truncate">{blog.url}</span>
                            </a>
                          </div>
                        </div>
                        <div className="ml-auto pr-4 flex items-center gap-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(blog.id, {
                              title: blog.title,
                              platform: blog.platform,
                              url: blog.url,
                              category: blog.category || undefined,
                            })}
                            className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => confirmDelete(blog.id)}
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
              Are you sure you want to delete this favorite blog? This action cannot be undone.
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
