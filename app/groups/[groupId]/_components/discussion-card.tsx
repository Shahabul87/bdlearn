"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, Share2, MoreVertical, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DiscussionCardProps {
  discussion: any;
  currentUser: any;
  groupId: string;
}

export const DiscussionCard = ({ discussion, currentUser, groupId }: DiscussionCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={discussion.author.image} />
            <AvatarFallback>
              {discussion.author.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {discussion.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Posted by {discussion.author.name} •{" "}
              {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: discussion.content }} />
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setIsLiked(!isLiked)}
        >
          <ThumbsUp className={`w-4 h-4 ${isLiked ? "text-purple-600" : ""}`} />
          {discussion._count.likedBy} Likes
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          {discussion._count.commentsList} Comments
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}; 