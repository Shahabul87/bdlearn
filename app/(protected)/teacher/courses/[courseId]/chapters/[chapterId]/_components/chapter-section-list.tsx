"use client";

import { Section } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChapterSectionListProps {
  items: Section[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ChapterSectionList = ({
  items,
  onReorder,
  onEdit,
  onDelete,
}: ChapterSectionListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sections, setSections] = useState(items);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSections(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSections = items.slice(startIndex, endIndex + 1);

    setSections(items);

    const bulkUpdateData = updatedSections.map((section) => ({
      id: section.id,
      position: items.findIndex((item) => item.id === section.id),
    }));

    onReorder(bulkUpdateData);
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2",
                      "bg-white/50 dark:bg-gray-900/40",
                      "border border-gray-200 dark:border-gray-700/50",
                      "text-gray-900 dark:text-gray-200",
                      "rounded-lg mb-4",
                      "text-sm sm:text-base",
                      "transition-all duration-200",
                      section.isPublished && "bg-sky-50/50 dark:bg-sky-900/20 border-sky-200/50 dark:border-sky-800/50"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r",
                        "border-r-gray-200 dark:border-r-gray-700/50",
                        "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
                        "rounded-l-lg transition",
                        section.isPublished && "border-r-sky-200/50 dark:border-r-sky-800/50"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="flex-1 px-2 py-2 truncate">
                      {section.title}
                    </div>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge className={cn(
                        "bg-gray-100 dark:bg-gray-800",
                        "text-gray-700 dark:text-gray-300",
                        "border-gray-200 dark:border-gray-700",
                        section.isPublished && "bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/50"
                      )}>
                        {section.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Button
                        onClick={() => onEdit(section.id)}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "hover:bg-purple-50 dark:hover:bg-purple-500/10",
                          "text-purple-700 dark:text-purple-400",
                          "hover:text-purple-800 dark:hover:text-purple-300"
                        )}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "hover:bg-rose-50 dark:hover:bg-rose-500/10",
                              "text-rose-700 dark:text-rose-400",
                              "hover:text-rose-800 dark:hover:text-rose-300"
                            )}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl text-gray-900 dark:text-white">
                              Delete Section
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 dark:text-gray-300 text-base">
                              Are you sure you want to delete this section?
                              <br />
                              <span className="text-rose-600 dark:text-rose-400 font-medium">
                                This action cannot be undone.
                              </span>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className={cn(
                              "bg-gray-100 dark:bg-gray-800",
                              "hover:bg-gray-200 dark:hover:bg-gray-700",
                              "border-gray-200 dark:border-gray-700",
                              "text-gray-900 dark:text-white"
                            )}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(section.id)}
                              className={cn(
                                "bg-rose-500 dark:bg-rose-600",
                                "hover:bg-rose-600 dark:hover:bg-rose-700",
                                "text-white border-0"
                              )}
                            >
                              {deletingId === section.id ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete Section"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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