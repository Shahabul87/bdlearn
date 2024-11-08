import React from 'react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

export const CourseCard = () => {
  return (
    <div className="bg-gray-800 text-white/90 p-8 max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto min-h-screen">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-4 mt-10">
        Office Productivity {'>'} Other Office Productivity {'>'} ChatGPT
      </p>

      {/* Title Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-5xl font-bold mb-3">
          ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More
        </h1>
        <div className="bg-yellow-300 text-black font-bold py-1 px-3 rounded-full text-sm">
          Bestseller
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        25+ Generative AI Tools to 10x Business, Productivity, Creativity | Prompt Engineering, ChatGPT, Custom GPTs, Midjourney
      </p>

      {/* Creator Info */}
      <div className="flex items-center space-x-2 mb-6 md:mt-6 lg:mt-20">
        <p className="text-sm text-gray-400">
          Created by <span className="text-white">Julian Melanson, Benza Maman, Leap Year Learning</span>
        </p>
      </div>

      {/* Update Info */}
      <div className="text-gray-400 text-sm mb-6">
        <p>Last updated 8/2024</p>
        <p>English [CC], Arabic [Auto], <span className="underline">13 more</span></p>
      </div>

      {/* Udemy Premium Banner */}
      <div className="bg-purple-700 text-white py-4 px-6 rounded-lg mb-6 flex justify-between items-center">
        <p>Access this top-rated course, plus 12,000+ more top-rated courses, with a Udemy plan. <span className="underline">See Plans & Pricing</span></p>
      </div>

      {/* Rating and Enrollment Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AiFillStar className="text-yellow-400" />
          <span className="text-white text-2xl">4.5</span>
          <span className="text-gray-400 text-sm">(39,765 ratings)</span>
        </div>
        <div className="text-white text-xl">
          222,413 learners
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
