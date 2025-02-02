import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const session = await auth();
    const values = await req.json();

    console.log("Received blog data:", values);
    console.log("Params:", params);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // First verify the section exists
    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
    });

    if (!section) {
      return new NextResponse("Section not found", { status: 404 });
    }

    // Create the blog with only the fields defined in the schema
    const blog = await db.blog.create({
      data: {
        title: values.title,
        url: values.blogUrl,
        description: values.description,
        rating: parseInt(values.rating),
        sectionId: params.sectionId,
        userId: session.user.id,
        isPublished: true,
        position: 0, // Add a default position
      },
    });

    console.log("Created blog:", blog);
    return NextResponse.json(blog);
  } catch (error) {
    console.error("[BLOG_CREATE_ERROR]:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const blogs = await db.blog.findMany({
      where: {
        sectionId: params.sectionId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("[BLOGS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 