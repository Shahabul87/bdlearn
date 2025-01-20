"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sync, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SyncButtonProps {
  onSync: () => void;
}

export const SyncButton = ({ onSync }: SyncButtonProps) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      await fetch("/api/calendar/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
      });
      setSyncComplete(true);
      onSync();
      toast.success("Calendar synced successfully");
    } catch (error) {
      toast.error("Failed to sync calendar");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncComplete(false), 2000);
    }
  };

  return (
    <Button
      onClick={handleSync}
      disabled={isSyncing}
      className={cn(
        "relative",
        syncComplete && "bg-green-500 hover:bg-green-600"
      )}
    >
      <motion.div
        animate={{ rotate: isSyncing ? 360 : 0 }}
        transition={{ duration: 1, repeat: isSyncing ? Infinity : 0 }}
      >
        {syncComplete ? (
          <Check className="w-4 h-4" />
        ) : (
          <Sync className="w-4 h-4" />
        )}
      </motion.div>
      <span className="ml-2">
        {isSyncing ? "Syncing..." : syncComplete ? "Synced" : "Sync Calendar"}
      </span>
    </Button>
  );
}; 