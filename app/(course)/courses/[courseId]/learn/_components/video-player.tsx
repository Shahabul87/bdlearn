"use client";

import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
}

export const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/courses/videos/${videoId}`);
        const data = await response.json();
        // Extract YouTube video ID from URL
        const youtubeId = extractYouTubeId(data.url);
        if (youtubeId) {
          setVideoUrl(youtubeId ?? "");
        } else {
          console.error("Invalid YouTube URL");
          setVideoUrl("");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="aspect-video relative w-full max-w-4xl mx-auto">
      <YouTube
        videoId={videoUrl}
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
          },
        }}
        onReady={() => setIsLoading(false)}
        className="absolute inset-0"
        iframeClassName="w-full h-full rounded-lg"
      />
    </div>
  );
}; 