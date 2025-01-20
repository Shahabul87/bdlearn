import { addDays, addWeeks, addMonths, addYears, isBefore } from "date-fns";

export const generateRecurringEvents = (event: any, count: number = 10) => {
  const events = [];
  let currentDate = new Date(event.startDate);
  const endDate = event.recurringEndDate ? new Date(event.recurringEndDate) : null;

  for (let i = 0; i < count; i++) {
    // Stop if we've reached the end date
    if (endDate && isBefore(endDate, currentDate)) break;

    // Create new event instance
    const newEvent = {
      ...event,
      startDate: new Date(currentDate),
      parentEventId: event.id,
    };

    events.push(newEvent);

    // Calculate next date based on pattern
    switch (event.recurringPattern) {
      case "daily":
        currentDate = addDays(currentDate, event.recurringInterval || 1);
        break;
      case "weekly":
        currentDate = addWeeks(currentDate, event.recurringInterval || 1);
        break;
      case "monthly":
        currentDate = addMonths(currentDate, event.recurringInterval || 1);
        break;
      case "yearly":
        currentDate = addYears(currentDate, event.recurringInterval || 1);
        break;
    }
  }

  return events;
}; 