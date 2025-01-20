import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createGroupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string(),
  privacy: z.enum(["public", "private", "invite-only"]),
  rules: z.array(z.string()),
  tags: z.array(z.string()),
  courseId: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validatedData = createGroupSchema.parse(body);

    if (validatedData.courseId) {
      const enrollment = await db.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId: validatedData.courseId,
          },
        },
      });

      if (!enrollment) {
        return new NextResponse("Not enrolled in this course", { status: 403 });
      }
    }

    const group = await db.group.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl,
        category: validatedData.category,
        privacy: validatedData.privacy,
        rules: validatedData.rules,
        tags: validatedData.tags,
        courseId: validatedData.courseId || undefined,
        creatorId: session.user.id,
      },
    });

    await db.groupMember.create({
      data: {
        userId: session.user.id,
        groupId: group.id,
        role: "admin",
        status: "active",
      },
    });

    const groupWithMember = await db.group.findUnique({
      where: { id: group.id },
      include: {
        members: true,
        course: {
          select: {
            title: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(groupWithMember);
  } catch (error) {
    console.error("[GROUPS_POST]", error);
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 });
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
} 