import React from "react";
import Link from "next/link";
import { CreateBlogInputSection } from "./create-blog-input";

export const CreateNewBlogPage = () => {
  return (
    <section className="bg-gray-800 text-center py-16 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-screen-lg">
        {/* Notification Banner */}
        <div className="flex justify-center items-center mb-4">
          <span className="bg-gray-800 text-sm text-blue-400 px-4 py-1 rounded-full">
            To share your knowledge beyond limit!
          </span>
        </div>
        
        <p className="text-cyan-500 font-bold text-2xl mb-3 mt-15">
          Give a creative blog title
        </p>
        <p className="text-sm text-white/70">
          What would you like to name your blog? Don&apos;t worry, you can change this later.
        </p>
        
        <div className="bg-gray-700 border border-[#94a3b8] rounded-lg flex items-center justify-center text-cyan-500 font-semibold mt-5">
            <CreateBlogInputSection />
        </div>
      </div>
    </section>
  );
}
