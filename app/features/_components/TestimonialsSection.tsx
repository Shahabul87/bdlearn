"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    image: "/testimonial1.jpg", // Add testimonial images
    quote: "This platform completely changed how I approach learning new skills.",
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    image: "/testimonial2.jpg",
    quote: "The practical focus helped me land my dream job in tech.",
  },
  {
    name: "Emma Williams",
    role: "Data Scientist",
    image: "/testimonial3.jpg",
    quote: "The community support is amazing. Learning becomes collaborative here.",
  },
];

export const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-gray-950 py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          What Our Learners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">&quot;{testimonial.quote}&quot;</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}; 