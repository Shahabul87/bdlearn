import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { currentUser } from "@/lib/auth";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = user?.id;

  try {
    const formData = await req.formData();

    // Handle both single and multiple files
    const files = formData.getAll("file"); // Gets single or multiple files from the key "file"
  
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedResults: CloudinaryUploadResult[] = [];

    // Iterate over each file and upload to Cloudinary
    for (const file of files) {
      if (!(file instanceof File)) {
        return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "next-cloudinary-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      });

      uploadedResults.push(result); // Collect the result of each file
    }


    // Return all uploaded files
    return NextResponse.json(
      {
        message: "Files uploaded successfully",
        uploadedFiles: uploadedResults.map(file => ({
          publicId: file.public_id,
          url: file.secure_url,
        })),
      },
      { status: 200 }
    );

  } catch (error) {
    console.log("Upload image failed", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
