"use client";

import Image from "next/image";

interface CommentHeaderProps {
  userImage: string | null;
  userName: string | null;
  createdAt: Date;
}

export const CommentHeader = ({ userImage, userName, createdAt }: CommentHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="relative">
        <Image
          src={userImage || "/default-avatar.png"}
          alt={userName || "Anonymous"}
          width={40}
          height={40}
          className="rounded-full ring-2 ring-purple-500/20 transition-all duration-300 group-hover:ring-purple-500/40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {userName || "Anonymous"}
        </span>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium tracking-wide">
          {new Date(createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
}; 