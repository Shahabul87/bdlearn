import { isBefore, isAfter, isSameDay } from 'date-fns';

interface FilterOptions {
  categories?: string[];
  status?: string[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  searchQuery?: string;
}

export const filterEvents = (events: any[], filters: FilterOptions) => {
  return events.filter(event => {
    // Category filter
    if (filters.categories?.length && !filters.categories.includes(event.category)) {
      return false;
    }

    // Status filter
    if (filters.status?.length) {
      const eventStatus = getEventStatus(event);
      if (!filters.status.includes(eventStatus)) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange?.start && isAfter(filters.dateRange.start, event.startDate)) {
      return false;
    }
    if (filters.dateRange?.end && isBefore(filters.dateRange.end, event.endDate)) {
      return false;
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    }

    return true;
  });
};

const getEventStatus = (event: any) => {
  const now = new Date();
  if (isBefore(event.endDate, now)) return 'past';
  if (isAfter(event.startDate, now)) return 'upcoming';
  if (isSameDay(event.startDate, now)) return 'today';
  return 'upcoming';
}; 