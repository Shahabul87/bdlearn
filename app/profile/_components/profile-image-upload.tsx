"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, Image as ImageIcon, Camera } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProfileImageUploadProps {
  userId: string;
  initialImage?: string | null;
}

export const ProfileImageUpload = ({ userId, initialImage }: ProfileImageUploadProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  console.log(initialImage);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/users/${userId}/image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      toast.success("Profile image uploaded!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUploading(false);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative">
      {/* Current Profile Image */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-purple-500/20 relative group"
      >
        {initialImage ? (
          <div className="relative w-full h-full">
            <Image 
              src={initialImage} 
              alt="Profile" 
              fill 
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
            <ImagePlus className="h-8 w-8 text-gray-400 dark:text-gray-600" />
          </div>
        )}
        
        {/* Upload Button Overlay */}
        <button
          onClick={() => setIsEditing(true)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
        >
          <Camera className="w-6 h-6 text-white" />
        </button>
      </motion.div>

      {/* Upload Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profileImageUpload"
              />
              <label
                htmlFor="profileImageUpload"
                className={cn(
                  "flex flex-col items-center justify-center gap-4",
                  "w-full p-6 sm:p-8",
                  "border-2 border-dashed rounded-xl",
                  "border-purple-200 dark:border-purple-500/20",
                  "bg-purple-50/50 dark:bg-purple-500/5",
                  "cursor-pointer",
                  "hover:border-purple-300 dark:hover:border-purple-500/30",
                  "hover:bg-purple-50 dark:hover:bg-purple-500/10",
                  "transition-all duration-200"
                )}
              >
                <div className="p-4 rounded-full bg-purple-100/50 dark:bg-purple-500/10">
                  <ImagePlus className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Maximum file size: 5MB
                  </p>
                </div>
              </label>
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
