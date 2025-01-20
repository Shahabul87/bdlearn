import Image from "next/image";
import React from "react";
import { Timeline } from "./timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-gray-300/90 dark:text-gray-200 text-base md:text-lg font-medium leading-relaxed mb-8">
            Built and launched groundbreaking projects, pushing the boundaries of web development
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/templates/startup-1.webp"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/templates/startup-2.webp"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/templates/startup-3.webp"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/templates/startup-4.webp"
                alt="startup template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="text-gray-300/90 dark:text-gray-200 text-base md:text-lg font-medium leading-relaxed mb-8">
            Pioneered innovative solutions and expanded technological horizons
          </p>
          <p className="text-gray-300/90 dark:text-gray-200 text-base md:text-lg font-medium leading-relaxed mb-8">
            Developed cutting-edge features and enhanced user experiences across platforms
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div>
          <p className="text-gray-300/90 dark:text-gray-200 text-base md:text-lg font-medium leading-relaxed mb-6">
            Major milestones and achievements reached
          </p>
          <div className="mb-8 space-y-3">
            <div className="flex gap-3 items-center text-emerald-400/90 text-base md:text-lg font-medium">
              ✨ <span className="text-gray-300/90">Enhanced UI Components</span>
            </div>
            <div className="flex gap-3 items-center text-emerald-400/90 text-base md:text-lg font-medium">
              ✨ <span className="text-gray-300/90">Startup template Aceternity</span>
            </div>
            <div className="flex gap-3 items-center text-emerald-400/90 text-base md:text-lg font-medium">
              ✨ <span className="text-gray-300/90">Random file upload lol</span>
            </div>
            <div className="flex gap-3 items-center text-emerald-400/90 text-base md:text-lg font-medium">
              ✨ <span className="text-gray-300/90">Himesh Reshammiya Music CD</span>
            </div>
            <div className="flex gap-3 items-center text-emerald-400/90 text-base md:text-lg font-medium">
              ✨ <span className="text-gray-300/90">Salman Bhai Fan Club registrations open</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/pro/hero-sections.png"
                alt="hero template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/features-section.png"
                alt="feature template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/pro/bento-grids.png"
                alt="bento template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 p-2 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-purple-500/10">
              <Image
                src="https://assets.aceternity.com/cards.png"
                alt="cards template"
                width={500}
                height={500}
                className="rounded-lg object-cover h-30 md:h-44 lg:h-60 w-full"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
