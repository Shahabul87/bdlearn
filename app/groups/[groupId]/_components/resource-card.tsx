"use client";

import { FileText, Video, Link as LinkIcon, Download, ExternalLink, Book, Image, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: any;
  currentUser: any;
  groupId: string;
}

export const ResourceCard = ({ resource, currentUser, groupId }: ResourceCardProps) => {
  const getIcon = () => {
    switch (resource.type) {
      case "document":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "image":
        return <Image className="w-5 h-5" />;
      case "link":
        return <LinkIcon className="w-5 h-5" />;
      case "book":
        return <Book className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const getPreview = () => {
    if (resource.type === "image" && resource.thumbnail) {
      return (
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (resource.type === "video" && resource.thumbnail) {
      return (
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className={cn(
        "aspect-video rounded-lg",
        "flex items-center justify-center",
        "bg-gray-100 dark:bg-gray-800"
      )}>
        {getIcon()}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      {getPreview()}

      <div className="mt-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {resource.title}
        </h3>
        {resource.description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {resource.description}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={resource.author?.image} />
            <AvatarFallback>
              {resource.author?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <span>{resource.author?.name}</span>
        </div>
        <span>{formatDistanceToNow(new Date(resource.createdAt), { addSuffix: true })}</span>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(resource.url, "_blank")}
        >
          {resource.type === "link" ? (
            <>
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Link
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}; 