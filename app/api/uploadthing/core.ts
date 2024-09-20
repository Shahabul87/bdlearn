import { currentUser } from "@/lib/auth";
// import { createUploadthing, type FileRouter } from "uploadthing/next";

// //import { isTeacher } from "@/lib/teacher";
 
// const f = createUploadthing();
 
// const handleAuth = async () => {
//   const user = await currentUser();
//   //const isAuthorized = isTeacher(userId);

//   if (!user?.id) throw new Error("Unauthorized");
//   const userId = user?.id;
//   return { userId };
// }

// export const ourFileRouter = {
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {}),
//   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => {})
// } satisfies FileRouter;
 
// export type OurFileRouter = typeof ourFileRouter;


import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
