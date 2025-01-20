import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { ideaId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();
    const { title, description, category, visibility, tags, status } = values;

    const idea = await db.idea.update({
      where: {
        id: params.ideaId,
        userId: session.user.id,
      },
      data: {
        title,
        description,
        category,
        visibility,
        status,
        tags,
      },
    });

    return NextResponse.json(idea);
  } catch (error) {
    console.error("[IDEA_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { ideaId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const idea = await db.idea.delete({
      where: {
        id: params.ideaId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(idea);
  } catch (error) {
    console.error("[IDEA_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 