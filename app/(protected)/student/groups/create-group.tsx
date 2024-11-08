import React from "react";
import Link from "next/link";
import { CreateGroupInputSection } from "./create-group-input";

export const CreateGroupPage = () => {
  return (
    <section className="bg-gray-800 text-center py-16 px-4 md:px-8 lg:px-16">
      <div className="mx-auto max-w-screen-lg">
        {/* Notification Banner */}
        <div className="flex justify-center items-center mb-4">
          <span className="bg-gray-800 text-sm text-blue-400 px-4 py-1 rounded-full">
            To enhance your knowledge beyond limit!
          </span>
        </div>
        {/* Title */}
        <h1 className="text-white text-4xl font-bold mb-4">
        Create Collaborative Learning Groups
        </h1>
        {/* Description */}
        <p className="text-[#94a3b8] text-lg mb-8">
        This group helps you actively engage with peers, share knowledge, solve problems together, and enhance learning through collaboration and mutual support.
        </p>
        {/* Buttons */}
        {/* <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Download v3.19.0
          </a>
          <a
            href="#"
            className="border border-[#94a3b8] text-[#94a3b8] px-6 py-3 rounded-lg hover:bg-[#1e293b] transition duration-200"
          >
            Source code
          </a>
        </div> */}
        {/* Changelog */}
        {/* <div className="mt-4">
          <Link href="#" className="text-[#94a3b8] underline">
            Changelog
          </Link>
        </div> */}
        <p className="text-cyan-500 font-bold text-2xl mb-3 mt-15">
          Give a Beautiful Group Name
        </p>
        
        <div className="bg-gray-700 border border-[#94a3b8] rounded-lg flex items-center justify-center text-cyan-500 font-semibold mt-5">
            <CreateGroupInputSection />
        </div>
      </div>
    </section>
  );
}
