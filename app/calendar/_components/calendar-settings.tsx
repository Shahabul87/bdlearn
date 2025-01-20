"use client";

import { useState } from "react";
import { Settings, Bell, Globe, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface CalendarSettings {
  defaultView: "month" | "week" | "day";
  firstDayOfWeek: number;
  showWeekNumbers: boolean;
  enableNotifications: boolean;
  notificationTime: number;
  timeZone: string;
  workingHours: {
    start: string;
    end: string;
  };
}

export const CalendarSettings = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<CalendarSettings>({
    defaultView: "month",
    firstDayOfWeek: 0,
    showWeekNumbers: false,
    enableNotifications: true,
    notificationTime: 30,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
  });

  const handleSave = async () => {
    try {
      await fetch("/api/calendar/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      toast.success("Settings saved successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="rounded-full"
      >
        <Settings className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calendar Settings</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Default View</label>
              <Select
                value={settings.defaultView}
                onValueChange={(value: "month" | "week" | "day") =>
                  setSettings({ ...settings, defaultView: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="text-sm">Enable Notifications</span>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableNotifications: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Zone</label>
              <Select
                value={settings.timeZone}
                onValueChange={(value) =>
                  setSettings({ ...settings, timeZone: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Intl.supportedValuesOf('timeZone').map((zone) => (
                    <SelectItem key={zone} value={zone}>
                      {zone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Working Hours</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: {
                        ...settings.workingHours,
                        start: e.target.value,
                      },
                    })
                  }
                  className="px-3 py-2 rounded-md border"
                />
                <input
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      workingHours: {
                        ...settings.workingHours,
                        end: e.target.value,
                      },
                    })
                  }
                  className="px-3 py-2 rounded-md border"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}; 