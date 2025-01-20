"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface NotificationsBellProps {
  notifications: any[];
  onMarkAsRead: (id: string) => void;
}

export const NotificationsBell = ({ notifications, onMarkAsRead }: NotificationsBellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                  !notification.isRead && "bg-purple-50 dark:bg-purple-900/10"
                )}
                onClick={() => {
                  if (!notification.isRead) {
                    onMarkAsRead(notification.id);
                  }
                }}
              >
                <h5 className="font-medium text-sm">{notification.title}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {notification.content}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">
                  {format(new Date(notification.createdAt), "PPp")}
                </span>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}; 