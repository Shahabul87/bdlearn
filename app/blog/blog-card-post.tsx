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

export const PostCardBlog = ({
  id,
  title,
  imageUrl,
  category,
  description,
}: PostCardProps) => {
  return (
    <Link href={`/blog/${id}`}>
      <motion.div
        whileHover={{
          scale: 1.05,
          rotate: 1,
          opacity: 0.95,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
        className="group transition-all overflow-hidden border border-neutral-400 rounded-lg p-4 md:p-6 h-full block bg-gray-700"
      >
        <p className="text-xs text-white/90 p-1 mb-3">
          {category}
        </p>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl || "/default-image.webp"}
          />
        </div>
        <div className="flex flex-col pt-3 md:pt-4">
          <div className="text-xl md:text-xl text-sky-500 font-semibold group-hover:text-cyan-500 transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm text-gray-300 line-clamp-4 mt-2 tracking-tight">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};
