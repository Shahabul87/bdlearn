"use client";

import Image from "next/image";
import { CourseTabs } from "./course-tab";

export function CourseTabsDemo() {
  const tabs = [
    {
      title: "Chapter 1",
      value: "Course Objectives",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-gray-700 border border-[#94a3b8]">
          <p> What you will lean in chapter 1</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Chapter 2",
      value: "Learning Outcomes",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-gray-700 border border-[#94a3b8]">
          <p>Chapter 1</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Chapter 3",
      value: "Description",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-gray-700 border border-[#94a3b8]">
          <p>Description tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Chapter 4",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white  bg-gray-700 border border-[#94a3b8]">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Reviews",
      value: "Reviews",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gray-700 border border-[#94a3b8]">
          <p>Reviews tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col p-3 md:p-2 lg:p-0 max-w-5xl mx-auto w-full  items-start justify-start mt-20 mb-40">
      <CourseTabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/image1.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
