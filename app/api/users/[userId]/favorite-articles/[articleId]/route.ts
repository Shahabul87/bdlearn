import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; articleId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite article exists and belongs to the current user
    const favoriteArticle = await db.favoriteArticle.findUnique({
      where: {
        id: params.articleId,
      },
    });

    if (!favoriteArticle || favoriteArticle.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite article
    const deletedFavoriteArticle = await db.favoriteArticle.delete({
      where: {
        id: params.articleId,
      },
    });

    return NextResponse.json(deletedFavoriteArticle);
  } catch (error) {
    console.error("[DELETE_FAVORITE_ARTICLE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; articleId: string } }
) {
  try {
    const { userId, articleId } = params;
    const { title, platform, url, category } = await req.json();

    const article = await db.favoriteArticle.update({
      where: {
        id: articleId,
        userId: userId,
      },
      data: {
        title,
        platform,
        url,
        category,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
