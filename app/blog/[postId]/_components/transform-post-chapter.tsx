import Image from "next/image";

interface PostChapter {
    id: string;
    title: string;
    description: string | null; // Nullable description
    imageUrl: string | null; // Nullable imageUrl
    postId: string;
    isPublished: boolean;
    isFree: boolean;
    position: number;
    createdAt: Date; // Keeping this as Date
    updatedAt: Date; // Keeping this as Date
  }
  
  interface StickyScrollContent {
    title: string;
    description: string;
    content?: React.ReactNode;
  }
  
  export const transformPostChapters = (postChapters: PostChapter[]): StickyScrollContent[] => {
    return postChapters.map((chapter) => ({
      title: chapter.title,
      description: chapter.description || "No description available", // Provide a fallback for null description
      content: chapter.imageUrl ? (
        <Image
          src={chapter.imageUrl}
          alt={chapter.title}
          fill
          className="w-full h-auto rounded-lg object-cover"
        />
      ) : (
        <div className="w-full h-auto rounded-lg bg-gray-300 flex items-center justify-center">
          No Image Available
        </div>
      ), // Provide a fallback if imageUrl is null
    }));
  };
  