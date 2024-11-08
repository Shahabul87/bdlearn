"use client";

import { FavoriteArticle } from "@prisma/client"; // Import FavoriteArticle type from Prisma
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";

interface FavoriteArticleListProps {
  items: FavoriteArticle[]; // Accept array of FavoriteArticle type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const FavoriteArticleList = ({
  items,
  onReorder,
  onEdit,
}: FavoriteArticleListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useState(items);
  console.log(items)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setFavoriteArticles(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedArticles = Array.from(favoriteArticles);
    const [movedArticle] = reorderedArticles.splice(result.source.index, 1);
    reorderedArticles.splice(result.destination.index, 0, movedArticle);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedArticles = reorderedArticles.slice(startIndex, endIndex + 1);

    setFavoriteArticles(reorderedArticles);

    const bulkUpdateData = updatedArticles.map((article) => ({
      id: article.id,
      position: reorderedArticles.findIndex((item) => item.id === article.id),
    }));

    onReorder(bulkUpdateData);
  };

//   if (!isMounted) {
//     return null;
//   }

useEffect(() => {
    console.log("Favorite Articles:", favoriteArticles);
  }, [favoriteArticles]);
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favoriteArticles">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {favoriteArticles.map((article, index) => (
              <Draggable key={article.id} draggableId={article.id} index={index}>
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
                      <span className="font-medium">{article.title}</span>
                      <span className="text-xs text-gray-500">
                        Platform: {article.platform}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        {article.url}
                      </a>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span
                        className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(article.id)}
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
