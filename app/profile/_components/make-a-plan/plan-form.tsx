"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const PlanForm = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle>Create New Plan</CardTitle>
        <CardDescription>Schedule your learning activities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Plan Title</Label>
            <Input id="title" placeholder="e.g., Learn Web Development" />
          </div>

          <div className="grid gap-2">
            <Label>Plan Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course Creation</SelectItem>
                <SelectItem value="study">Study Plan</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    "text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300",
                    "border-purple-200 dark:border-purple-500/20",
                    "hover:bg-purple-50 dark:hover:bg-purple-500/10",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>Duration</Label>
            <div className="flex gap-4">
              <Input 
                type="number" 
                placeholder="Duration" 
                className="w-24 focus-visible:ring-purple-500/20" 
              />
              <Select defaultValue="weeks">
                <SelectTrigger className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 focus:ring-purple-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive reminders about your plan
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 border-purple-200 dark:border-purple-500/20 hover:bg-purple-50 dark:hover:bg-purple-500/10"
          >
            Cancel
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600 text-white">
            Create Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 