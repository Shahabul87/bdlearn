"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Share, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareCalendarDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const ShareCalendarDialog = ({
  open,
  onClose,
  userId
}: ShareCalendarDialogProps) => {
  const [isPublic, setIsPublic] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/calendar/shared/${userId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    try {
      await fetch("/api/calendar/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic }),
      });
      toast.success("Calendar sharing settings updated");
    } catch (error) {
      toast.error("Failed to update sharing settings");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Calendar</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Make calendar public
            </span>
            <Switch
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>

          {isPublic && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-800"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleShare}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 