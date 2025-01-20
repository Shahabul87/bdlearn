import { toast } from "sonner";

interface ErrorOptions {
  silent?: boolean;
  fallback?: any;
}

export class CalendarError extends Error {
  constructor(
    message: string,
    public code: string,
    public metadata?: any
  ) {
    super(message);
    this.name = "CalendarError";
  }
}

export const handleCalendarError = (error: unknown, options: ErrorOptions = {}) => {
  if (error instanceof CalendarError) {
    if (!options.silent) {
      switch (error.code) {
        case "SYNC_FAILED":
          toast.error("Failed to sync calendar settings");
          break;
        case "EVENT_CREATE_FAILED":
          toast.error("Failed to create event");
          break;
        case "EVENT_UPDATE_FAILED":
          toast.error("Failed to update event");
          break;
        case "EVENT_DELETE_FAILED":
          toast.error("Failed to delete event");
          break;
        default:
          toast.error(error.message);
      }
    }
    console.error(`[${error.code}]`, error.metadata);
  } else {
    if (!options.silent) {
      toast.error("An unexpected error occurred");
    }
    console.error("[CALENDAR_ERROR]", error);
  }

  return options.fallback;
}; 