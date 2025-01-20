import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CalendarState {
  view: 'month' | 'week' | 'day';
  selectedDate: Date;
  draggedEvent: any | null;
  setView: (view: 'month' | 'week' | 'day') => void;
  setSelectedDate: (date: Date) => void;
  setDraggedEvent: (event: any | null) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      view: 'month',
      selectedDate: new Date(),
      draggedEvent: null,
      setView: (view) => set({ view }),
      setSelectedDate: (selectedDate) => set({ selectedDate }),
      setDraggedEvent: (draggedEvent) => set({ draggedEvent }),
    }),
    {
      name: 'calendar-store',
    }
  )
); 