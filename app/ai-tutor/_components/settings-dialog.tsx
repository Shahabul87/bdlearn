"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  X, 
  Globe, 
  Brain, 
  Volume2, 
  Moon,
  Sun,
  Laptop,
  MessageSquare,
  Bell,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog = ({
  open,
  onClose
}: SettingsDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-gray-900 p-6">
        <Button variant="ghost" onClick={onClose} className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        {/* Settings content */}
      </div>
    </div>
  );
}; 