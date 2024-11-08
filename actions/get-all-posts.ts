import { Post } from "@prisma/client";
import { db } from "@/lib/db";

type PostForHomepage = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  published: boolean;
  category: string | null; // Update to a simple string
};

type GetPosts = {
  title?: string;
  category?: string;
};

export const getPostsForHomepage = async (
  { title, category }: GetPosts
): Promise<PostForHomepage[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive", // Case-insensitive search
          },
        }),
        ...(category && {
          category: {
            equals: category,
            mode: "insensitive",
          },
        }), // Filter by category if provided
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        published: true, // Should be true, as you’re only selecting published posts
        category: true, // Now a string field
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts as PostForHomepage[]; // Ensure type correctness
  } catch (error) {
    console.log("[GET_POSTS_FOR_HOMEPAGE]", error);
    return [];
  }
};

