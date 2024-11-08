// /pages/file-upload.tsx



import { FileUploadDemo } from "./fileuploaddemo";

export default function FileUploadPage() {
  return (
    <>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-white">File Upload Demo</h1>

        {/* Rendering the file upload demo component */}
        <FileUploadDemo />
      </main>
    </>
  );
}
