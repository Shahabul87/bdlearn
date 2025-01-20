import { addDays, addWeeks, addMonths, addYears, isBefore, startOfDay } from "date-fns";

interface RecurringEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  recurringPattern: string;
  recurringInterval: number;
  recurringEndDate?: Date;
  recurringDays?: number[];
}

export const generateRecurringInstances = (event: RecurringEvent, count: number = 10) => {
  const instances = [];
  let currentDate = startOfDay(new Date(event.startDate));
  const endDate = event.recurringEndDate ? startOfDay(new Date(event.recurringEndDate)) : null;

  for (let i = 0; i < count && (!endDate || isBefore(currentDate, endDate)); i++) {
    const instance = {
      ...event,
      startDate: new Date(currentDate),
      endDate: new Date(currentDate),
      parentEventId: event.id,
      isRecurringInstance: true,
    };

    instances.push(instance);

    // Calculate next occurrence
    switch (event.recurringPattern) {
      case "daily":
        currentDate = addDays(currentDate, event.recurringInterval);
        break;
      case "weekly":
        if (event.recurringDays?.length) {
          // Handle multiple days per week
          let nextDay = currentDate;
          let foundNext = false;
          while (!foundNext) {
            nextDay = addDays(nextDay, 1);
            const dayOfWeek = nextDay.getDay();
            if (event.recurringDays.includes(dayOfWeek)) {
              currentDate = nextDay;
              foundNext = true;
            }
          }
        } else {
          currentDate = addWeeks(currentDate, event.recurringInterval);
        }
        break;
      case "monthly":
        currentDate = addMonths(currentDate, event.recurringInterval);
        break;
      case "yearly":
        currentDate = addYears(currentDate, event.recurringInterval);
        break;
    }
  }

  return instances;
}; 