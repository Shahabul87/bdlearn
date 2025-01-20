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

export const getPostsForHomepage = async () => {
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
      },
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map(post => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("[GET_POSTS]", error);
    return [];
  }
};

