import * as z from "zod";

export const EventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  endDate: z.coerce.date({
    required_error: "End date is required",
    invalid_type_error: "Invalid end date",
  }),
  isAllDay: z.boolean().default(false),
  location: z.string().optional(),
  notification: z.boolean().default(true),
  notificationTime: z.number().default(30),
  userId: z.string(),
});

export type EventFormValues = z.infer<typeof EventSchema>; 