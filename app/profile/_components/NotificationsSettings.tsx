"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone, Globe, MessageSquare, Star, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const NotificationsSettings = () => {
  const notificationCategories = [
    {
      id: 'email',
      title: 'Email Notifications',
      icon: Mail,
      settings: [
        { id: 'news', label: 'Newsletter and Updates', description: 'Receive our newsletter and product updates' },
        { id: 'account', label: 'Account Activity', description: 'Get notified about account-related activities' },
        { id: 'security', label: 'Security Alerts', description: 'Important security notifications' },
      ]
    },
    {
      id: 'push',
      title: 'Push Notifications',
      icon: Bell,
      settings: [
        { id: 'messages', label: 'New Messages', description: 'Notifications for new messages' },
        { id: 'mentions', label: 'Mentions', description: 'When someone mentions you' },
        { id: 'comments', label: 'Comments', description: 'Notifications for comments on your posts' },
      ]
    },
    {
      id: 'mobile',
      title: 'Mobile Notifications',
      icon: Smartphone,
      settings: [
        { id: 'app_updates', label: 'App Updates', description: 'Get notified about app updates' },
        { id: 'mobile_security', label: 'Security Alerts', description: 'Mobile security notifications' },
        { id: 'mobile_activity', label: 'Account Activity', description: 'Mobile activity notifications' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Frequency */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-lg p-6",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-gray-200">Notification Frequency</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                How often would you like to receive notifications?
              </p>
            </div>
            <Select defaultValue="realtime">
              <SelectTrigger className={cn(
                "w-[180px]",
                "bg-white/50 dark:bg-gray-900/50",
                "border-gray-200 dark:border-gray-700",
                "text-gray-900 dark:text-gray-200"
              )}>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="realtime" className="text-gray-900 dark:text-gray-200">Real-time</SelectItem>
                <SelectItem value="daily" className="text-gray-900 dark:text-gray-200">Daily Digest</SelectItem>
                <SelectItem value="weekly" className="text-gray-900 dark:text-gray-200">Weekly Summary</SelectItem>
                <SelectItem value="custom" className="text-gray-900 dark:text-gray-200">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {/* Notification Categories */}
      {notificationCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}
        >
          <div className="flex items-center gap-2 mb-4">
            <category.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
              {category.title}
            </h3>
          </div>
          <div className="space-y-6">
            {category.settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">{setting.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Do Not Disturb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-lg p-6",
          "bg-white/50 dark:bg-gray-800/50",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Do Not Disturb
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-gray-200">Enable Do Not Disturb</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pause all notifications</p>
            </div>
            <Switch />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Start Time</p>
              <input
                type="time"
                className={cn(
                  "w-full rounded-md p-2",
                  "bg-white/50 dark:bg-gray-900/50",
                  "border border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-200"
                )}
                defaultValue="22:00"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">End Time</p>
              <input
                type="time"
                className={cn(
                  "w-full rounded-md p-2",
                  "bg-white/50 dark:bg-gray-900/50",
                  "border border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-200"
                )}
                defaultValue="07:00"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 