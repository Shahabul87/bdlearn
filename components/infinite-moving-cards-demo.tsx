"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-gray-800 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="very-slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    name: "Benjamin Franklin",
    title: "Inventor, Statesman, and Polymath",
  },
  {
    quote:
      "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    name: "Mahatma Gandhi",
    title: "Leader of Indian Independence",
  },
  {
    quote:
      "An investment in knowledge pays the best interest.",
    name: "Benjamin Franklin",
    title: "Inventor, Statesman, and Polymath",
  },
  {
    quote:
      "It is not that I'm so smart. But I stay with the questions much longer.",
    name: "Albert Einstein",
    title: "Physicist and Nobel Laureate",
  },
  {
    quote:
      "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.",
    name: "Dr. Seuss",
    title: "Author, Theodor Seuss Geisel",
  },
  {
    quote:
      "Continuous learning is the minimum requirement for success in any field.",
    name: "Brian Tracy",
    title: "Motivational Speaker and Author",
  },
  {
    quote:
      "He who learns but does not think, is lost! He who thinks but does not learn is in great danger.",
    name: "Confucius",
    title: "Philosopher",
  },
  {
    quote:
      "Practice isn’t the thing you do once you’re good. It’s the thing you do that makes you good.",
    name: "Malcolm Gladwell",
    title: "Author, Outliers",
  },
  {
    quote:
      "Success is the sum of small efforts, repeated day in and day out.",
    name: "Robert Collier",
    title: "Author",
  },
  {
    quote:
      "You don't learn to walk by following rules. You learn by doing, and by falling over.",
    name: "Richard Branson",
    title: "Entrepreneur, Virgin Group",
  },
  {
    quote:
      "Learning never exhausts the mind.",
    name: "Leonardo da Vinci",
    title: "Artist, Inventor, and Polymath",
  },
  {
    quote:
      "Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young.",
    name: "Henry Ford",
    title: "Founder, Ford Motor Company",
  },
  {
    quote:
      "Change is the end result of all true learning.",
    name: "Leo Buscaglia",
    title: "Author and Motivational Speaker",
  },
  {
    quote:
      "Learning is not attained by chance; it must be sought for with ardor and attended to with diligence.",
    name: "Abigail Adams",
    title: "Former First Lady of the United States",
  },
  {
    quote:
      "The beautiful thing about learning is that no one can take it away from you.",
    name: "B.B. King",
    title: "Legendary Musician",
  },
  {
    quote:
      "If you are not willing to learn, no one can help you. If you are determined to learn, no one can stop you.",
    name: "Zig Ziglar",
    title: "Motivational Speaker and Author",
  },
  {
    quote:
      "Success is a lousy teacher. It seduces smart people into thinking they can’t lose.",
    name: "Bill Gates",
    title: "Co-Founder, Microsoft",
  },
  {
    quote:
      "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    name: "Albert Einstein",
    title: "Physicist and Nobel Laureate",
  },
  {
    quote:
      "The expert in anything was once a beginner.",
    name: "Helen Hayes",
    title: "Actress and First Lady of American Theatre",
  },
  {
    quote:
      "Skill is only developed by hours and hours of work.",
    name: "Usain Bolt",
    title: "Olympic Gold Medalist",
  },
];

