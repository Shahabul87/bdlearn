import { db } from "@/lib/db";

export const getPostData = async (postId: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        tags: true,
        comments: {
          include: {
            user: true,
            reactions: {
              include: {
                user: true,
              },
            },
            replies: {
              include: {
                user: true,
                reactions: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        replies: {
          include: {
            user: true,
            reactions: {
              include: {
                user: true,
              },
            },
          },
        },
        reactions: {
          include: {
            user: true,
          },
        },
        postchapter: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
        imageSections: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    return post;
  } catch (error) {
    console.error("[GET_POST_DATA_ERROR]", error);
    return null;
  }
}; 