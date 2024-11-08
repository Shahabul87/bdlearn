"use client";

import { FavoriteBlog } from "@prisma/client"; // Import FavoriteBlog type from Prisma
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

interface FavoriteBlogListProps {
  items: FavoriteBlog[]; // Accept array of FavoriteBlog type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const FavoriteBlogList = ({
  items,
  onReorder,
  onEdit,
}: FavoriteBlogListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteBlogs, setFavoriteBlogs] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setFavoriteBlogs(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBlogs = Array.from(favoriteBlogs);
    const [movedBlog] = reorderedBlogs.splice(result.source.index, 1);
    reorderedBlogs.splice(result.destination.index, 0, movedBlog);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedBlogs = reorderedBlogs.slice(startIndex, endIndex + 1);

    setFavoriteBlogs(reorderedBlogs);

    const bulkUpdateData = updatedBlogs.map((blog) => ({
      id: blog.id,
      position: reorderedBlogs.findIndex((item) => item.id === blog.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favoriteBlogs">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {favoriteBlogs.map((blog, index) => (
              <Draggable key={blog.id} draggableId={blog.id} index={index}>
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
                      <span className="font-medium">{blog.title}</span>
                      <span className="text-xs text-gray-500">
                        Platform: {blog.platform}
                      </span>
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        {blog.url}
                      </a>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span
                        className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(blog.id)}
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
