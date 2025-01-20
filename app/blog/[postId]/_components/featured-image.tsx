"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FeaturedImageProps {
  imageUrl: string;
  title: string;
}

export const FeaturedImage = ({ imageUrl, title }: FeaturedImageProps) => {
  const [showImage, setShowImage] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200"
          onClick={() => setShowImage(!showImage)}
        >
          {showImage ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span className="text-sm">Hide Image</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span className="text-sm">Show Image</span>
            </>
          )}
        </Button>
      </div>
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "50vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative w-full rounded-xl overflow-hidden border border-gray-700/50"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="90vw"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 