"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Shield, Lock, Eye, Key, Smartphone, History, 
  AlertTriangle, UserCheck, Globe, RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const PrivacyAndSecurity = () => {
  const [selectedSection, setSelectedSection] = useState('privacy');

  const securityLogs = [
    { id: 1, event: 'Password Changed', date: '2024-02-01', location: 'New York, US' },
    { id: 2, event: 'New Login', date: '2024-01-28', location: 'London, UK' },
    // Add more logs
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className={cn(
        "flex gap-4 p-1 rounded-lg",
        "bg-gray-100/80 dark:bg-gray-800/80",
        "border border-gray-200/50 dark:border-gray-700/50"
      )}>
        <Button
          variant={selectedSection === 'privacy' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('privacy')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'privacy'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <Eye className="w-4 h-4" />
          Privacy
        </Button>
        <Button
          variant={selectedSection === 'security' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('security')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'security'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <Shield className="w-4 h-4" />
          Security
        </Button>
        <Button
          variant={selectedSection === 'activity' ? 'default' : 'ghost'}
          onClick={() => setSelectedSection('activity')}
          className={cn(
            "flex items-center gap-2",
            selectedSection === 'activity'
              ? "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white"
              : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          )}
        >
          <History className="w-4 h-4" />
          Activity Log
        </Button>
      </div>

      {/* Privacy Settings */}
      {selectedSection === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Profile Privacy</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Profile Visibility</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
                </div>
                <select className={cn(
                  "rounded-md p-2",
                  "bg-white/50 dark:bg-gray-900/50",
                  "border border-gray-200 dark:border-gray-700",
                  "text-gray-900 dark:text-gray-200"
                )}>
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Show Online Status</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Let others see when you&apos;re online</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Activity Visibility</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show your activity to others</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Data Privacy</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Data Collection</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Allow us to collect usage data</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Personalized Ads</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show personalized advertisements</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className={cn(
                "w-full",
                "text-gray-700 dark:text-gray-300",
                "border-gray-200 dark:border-gray-700",
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}>
                Download My Data
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Settings */}
      {selectedSection === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Account Security</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                  Setup 2FA
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Biometric Login</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use fingerprint or face recognition</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className={cn(
                "w-full",
                "text-gray-700 dark:text-gray-300",
                "border-gray-200 dark:border-gray-700",
                "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}>
                Change Password
              </Button>
            </div>
          </div>

          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Login Security</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Trusted Devices</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your trusted devices</p>
                </div>
                <Button variant="outline">Manage Devices</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 dark:text-gray-200">Login Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new logins</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Activity Log */}
      {selectedSection === 'activity' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Security Activity</h3>
            <div className="space-y-4">
              {securityLogs.map((log) => (
                <div
                  key={log.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg",
                    "bg-gray-50/50 dark:bg-gray-900/50",
                    "border border-gray-200 dark:border-gray-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-gray-900 dark:text-gray-200">{log.event}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{log.location}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(log.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "rounded-lg p-6",
            "bg-white/50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700"
          )}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Active Sessions</h3>
            <div className="space-y-4">
              <div className={cn(
                "p-4 rounded-lg",
                "bg-gray-50/50 dark:bg-gray-900/50",
                "border border-gray-200 dark:border-gray-700"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-900 dark:text-gray-200">Current Session</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                    Active Now
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">New York, US • Chrome on Windows</p>
              </div>
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                Sign Out All Other Sessions
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 