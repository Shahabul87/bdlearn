"use client";

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';

interface Lecture {
  title: string;
  duration: string;
  preview?: boolean;
}

interface Section {
  title: string;
  lectureCount: number;
  totalDuration: string;
  lectures: Lecture[];
}

interface CourseContentProps {
  sections: Section[];
}

export const CourseContent: React.FC<CourseContentProps> = ({ sections }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);

  const toggleSection = (index: number) => {
    setExpandedSection(index === expandedSection ? null : index);
  };

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
    setExpandedSection(expandAll ? null : -1); // If expandAll is true, collapse everything; if false, expand everything
  };

  return (
    <>
      <div className="max-w-4xl lg:max-w-5xl mx-auto bg-gray-700 border border-[#94a3b8] p-4 shadow-lg rounded-lg">
        <div className="text-cyan-500 mb-4 text-lg font-semibold flex items-center justify-between">
          41 sections • 405 lectures • 25h 25m total length
          <span
            className="text-fuchsia-600 cursor-pointer ml-4"
            onClick={toggleExpandAll}
          >
            {expandAll ? 'Collapse all sections' : 'Expand all sections'}
          </span>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="mb-4 border-b ">
            {/* Section Header */}
            <div
              className="flex justify-between items-center bg-gray-800 p-4 cursor-pointer rounded-md"
              onClick={() => toggleSection(index)}
            >
              <div>
                <h2 className="font-bold text-white/80">{section.title}</h2>
                <p className="text-sky-500 text-sm">
                  {section.lectureCount} lectures • {section.totalDuration}
                </p>
              </div>
              {(expandedSection === index || expandAll) ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </div>

            {/* Section Lectures */}
            {(expandedSection === index || expandAll) && (
              <ul className="px-6 py-2 bg-gray-300 border border-[#94a3b8]">
                {section.lectures.map((lecture, lectureIndex) => (
                  <Link href="#" key={lectureIndex}>
                    <li className="flex justify-between items-center py-2">
                      <div className="flex items-center">
                        <FaPlayCircle className="text-gray-600 mr-2" />
                        <span className="text-black cursor-pointer">
                          {lecture.title}
                        </span>
                        {lecture.preview && (
                          <span className="ml-2 text-fuchsia-600 text-sm">
                            Preview
                          </span>
                        )}
                      </div>
                      <div className="text-gray-700 text-sm">{lecture.duration}</div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
