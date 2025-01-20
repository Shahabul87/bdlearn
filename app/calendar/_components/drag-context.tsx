"use client";

import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { useCalendarStore } from "../_lib/calendar-store";

interface DragContextProps {
  children: React.ReactNode;
  onEventMove: (eventId: string, newDate: Date) => void;
}

export const DragContext = ({ children, onEventMove }: DragContextProps) => {
  const { setDraggedEvent } = useCalendarStore();

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedEvent(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      onEventMove(
        active.id as string,
        new Date(over.id as string)
      );
    }
    
    setDraggedEvent(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}; 