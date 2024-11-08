"use client";

import { ProfileLink } from "@prisma/client"; // Import ProfileLink type from Prisma
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

interface ProfileLinkListProps {
  items: ProfileLink[]; // Accept array of ProfileLink type
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ProfileLinkList = ({
  items,
  onReorder,
  onEdit,
}: ProfileLinkListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [profileLinks, setProfileLinks] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setProfileLinks(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedLinks = Array.from(profileLinks);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedLinks = reorderedLinks.slice(startIndex, endIndex + 1);

    setProfileLinks(reorderedLinks);

    const bulkUpdateData = updatedLinks.map((link) => ({
      id: link.id,
      position: reorderedLinks.findIndex((item) => item.id === link.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="profileLinks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {profileLinks.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
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
                      <span className="font-medium">{link.platform}</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 underline"
                      >
                        {link.url}
                      </a>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(link.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <span
                        className="flex items-center justify-between cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(link.id)}
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
