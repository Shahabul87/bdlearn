import { currentUser } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

//import { isTeacher } from "@/lib/teacher";
 
const f = createUploadthing();
 
const handleAuth = async () => {
  const user = await currentUser();
  //const isAuthorized = isTeacher(userId);

  if (!user?.id) throw new Error("Unauthorized");
  const userId = user?.id;
  return { userId };
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;