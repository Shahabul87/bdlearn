"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date?: Date;
  onChange?: (date: Date) => void;
  label?: string;
}

export function DateTimePicker({ date, onChange, label }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);
  const [timeInput, setTimeInput] = React.useState(
    date ? format(date, "HH:mm") : ""
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) return;

    const [hours, minutes] = timeInput.split(":").map(Number);
    const updatedDate = new Date(newDate);
    updatedDate.setHours(hours || 0);
    updatedDate.setMinutes(minutes || 0);

    setSelectedDate(updatedDate);
    onChange?.(updatedDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInput(e.target.value);

    if (selectedDate && e.target.value) {
      const [hours, minutes] = e.target.value.split(":").map(Number);
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours || 0);
      updatedDate.setMinutes(minutes || 0);
      onChange?.(updatedDate);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-gray-200">{label}</span>}
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700",
                !date && "text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
              className="text-gray-200"
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          value={timeInput}
          onChange={handleTimeChange}
          className="w-[120px] bg-gray-800 border-gray-700 text-gray-200"
        />
      </div>
    </div>
  );
} 