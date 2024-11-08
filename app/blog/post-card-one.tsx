"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
}

export const PostCardOne = ({
  id,
  title,
  imageUrl,
  category,
  description
}: PostCardProps) => {
  return (
    <Link href={`/blog/${id}`}>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group hover:shadow-sm transition-all overflow-hidden border border-[#94a3b8] rounded-lg p-4 md:p-6 h-full block bg-gray-700"
      >
        <p className="text-xs text-gray-400 mb-1">{category}</p>
        <div className="flex gap-4">
          {/* Left Side: Text content */}
          <div className="flex">
            <h2 className="text-md lg:text-lg text-sky-500 font-semibold mr-1 flex line-clamp-3 text-left ">
              {title}
            </h2>
            {/* Right Side: Image */}
            <div className="relative w-40 h-24 md:h-30 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                fill
                className="object-cover"
                alt={title}
                src={imageUrl || "/default-image.webp"}
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-3 mt-2">
          {description}
        </p>
      </motion.div>
    </Link>
  );
};











