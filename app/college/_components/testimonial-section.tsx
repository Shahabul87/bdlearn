"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "সাদিয়া রহমান",
    role: "HSC পরীক্ষার্থী, ২০২৪",
    image: "/images/testimonial-1.jpg",
    text: "বাণী'র অনলাইন কোর্সগুলো আমার HSC প্রস্তুতিতে অনেক সাহায্য করেছে। বিশেষ করে পদার্থবিজ্ঞান ও গণিত বিষয়ে আমি যেসব সমস্যায় ভুগছিলাম, সেগুলো এখন পুরোপুরি বুঝতে পারি। শিক্ষকরা খুবই সহায়ক ও প্রতিটি টপিক খুব সহজে ব্যাখ্যা করেন।",
    rating: 5,
    institution: "রাজউক উত্তরা মডেল কলেজ, ঢাকা",
  },
  {
    id: 2,
    name: "তানভীর হোসেন",
    role: "পূর্বতন ছাত্র, বিশ্ববিদ্যালয় ভর্তি, ২০২৩",
    image: "/images/testimonial-2.jpg",
    text: "বাণী'র বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি কোর্স আমার জন্য গেম চেঞ্জার ছিল। মক টেস্ট, বিগত সালের প্রশ্নপত্র এবং বিস্তারিত সলিউশন আমাকে আমার লক্ষ্য অর্জনে সাহায্য করেছে। আমি এখন ঢাকা বিশ্ববিদ্যালয়ের কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং বিভাগে পড়ছি।",
    rating: 5,
    institution: "নটর ডেম কলেজ, ঢাকা",
  },
  {
    id: 3,
    name: "ফারিহা আক্তার",
    role: "HSC পরীক্ষার্থী, ২০২৩",
    image: "/images/testimonial-3.jpg",
    text: "বাণী'র রিসোর্স ও লাইভ ক্লাসগুলো আমার অনেক উপকারে এসেছে। ২৪/৭ সাপোর্ট সিস্টেম এবং অভিজ্ঞ শিক্ষকদের সাহায্য না পেলে আমি এত ভালো ফলাফল করতে পারতাম না। পরীক্ষা প্রস্তুতি গাইডলাইন ও স্ট্রাটেজি জানার জন্য এই প্লাটফর্ম সবচেয়ে ভালো।",
    rating: 4,
    institution: "বগুড়া ক্যান্টনমেন্ট পাবলিক স্কুল ও কলেজ",
  },
  {
    id: 4,
    name: "রাফি ইসলাম",
    role: "HSC ২০২৩, বর্তমানে মেডিকেল কলেজে অধ্যয়নরত",
    image: "/images/testimonial-4.jpg",
    text: "মেডিকেল কলেজে ভর্তি হওয়া আমার স্বপ্ন ছিল, এবং বাণী'র মেডিকেল ভর্তি প্রস্তুতি কোর্স সেই স্বপ্ন পূরণে সহায়তা করেছে। বায়োলজি ও কেমিস্ট্রির দুর্বোধ্য টপিকগুলো এখন আমার কাছে অনেক সহজ মনে হয়। মেন্টরদের সহায়তা ও একাডেমিক গাইডেন্স অমূল্য ছিল।",
    rating: 5,
    institution: "সিলেট ক্যাডেট কলেজ",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4 },
  },
};

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/40 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            শিক্ষার্থীদের অভিজ্ঞতা
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            আমাদের <span className="text-purple-600 dark:text-purple-400">সফল শিক্ষার্থীদের</span> কথা
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            বাংলাদেশের বিভিন্ন প্রান্ত থেকে আমাদের প্লাটফর্মে শিক্ষা গ্রহণকারী শিক্ষার্থীদের অভিজ্ঞতা
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-8 shadow-xl relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
              </div>

              <div className="grid md:grid-cols-[1fr,2fr] gap-6 md:gap-8 items-center">
                {/* Testimonial author image and details */}
                <div className="text-center md:text-left">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-purple-100 dark:border-purple-900/50 mb-4">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {testimonials[activeIndex].institution}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonials[activeIndex].rating
                            ? "text-amber-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill={i < testimonials[activeIndex].rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial text */}
                <div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-base sm:text-lg italic mb-6 relative">
                    "{testimonials[activeIndex].text}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === activeIndex
                    ? "bg-purple-600 dark:bg-purple-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 md:-left-8 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 md:-right-8 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-20 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute -top-20 left-0 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 hidden md:block"
        />
      </div>
    </section>
  );
} 