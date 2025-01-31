"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ValueCard } from "./value-card";
import { Star, BackgroundSquares } from "./animated-background";
import { Lightbulb, Target, Users, Heart } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push boundaries to create cutting-edge learning experiences."
  },
  {
    icon: Target,
    title: "Skill-Focused",
    description: "Our platform emphasizes practical skills over theoretical knowledge."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We believe in the power of collaborative learning and knowledge sharing."
  },
  {
    icon: Heart,
    title: "Learner-Centric",
    description: "Every feature is designed with our learners' success in mind."
  }
];

export const AboutContent = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3
  }));

  const firstPart = "About ";
  const secondPart = "Me";
  const description = "I am a passionate educator with over 12 years of teaching experience, dedicated to making learning accessible and engaging for everyone.";

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <BackgroundSquares />
        {stars.map((star) => (
          <Star key={star.id} delay={star.delay} />
        ))}

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              {firstPart}
            </span>
            <span className="text-white">
              {secondPart}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            {/* Add any buttons or CTAs here if needed */}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          {/* Animated gradient circles */}
          <svg className="absolute top-1/4 left-1/4 w-64 h-64" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 100 100"
                to="360 100 100"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Rotating polygon */}
          <svg className="absolute top-1/3 right-1/4 w-48 h-48" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z" fill="url(#grad2)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="30s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/* Pulsing wave */}
          <svg className="absolute bottom-0 left-1/4 w-64 h-64" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="url(#grad3)" strokeWidth="2">
              <animate
                attributeName="d"
                values="M0,50 Q25,30 50,50 T100,50;M0,50 Q25,70 50,50 T100,50;M0,50 Q25,30 50,50 T100,50"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          {/* Floating dots grid */}
          <svg className="absolute bottom-10 right-10 w-48 h-48" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <g fill="url(#grad4)">
              {[0, 1, 2, 3].map((row) => (
                [0, 1, 2, 3].map((col) => (
                  <circle
                    key={`${row}-${col}`}
                    cx={20 + col * 20}
                    cy={20 + row * 20}
                    r="2"
                  >
                    <animate
                      attributeName="r"
                      values="2;3;2"
                      dur={`${2 + Math.random() * 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))
              ))}
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative">
              <svg className="absolute -left-8 -top-8 w-16 h-16 text-purple-500/30" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
              </svg>
              <h2 className="text-3xl font-bold text-white mb-6">
                Why We&apos;re Different
              </h2>
              <p className="text-gray-300 mb-4">
                We believe that traditional education often focuses too much on theory and not enough on practical skills. Our platform bridges this gap by providing hands-on learning experiences that directly translate to real-world capabilities.
              </p>
              <p className="text-gray-300">
                Our approach combines cutting-edge technology with proven learning methodologies to create an environment where practical skills flourish and theoretical knowledge finds its practical application.
              </p>
            </div>
            <div className="relative h-[400px]">
              <div className="absolute -right-4 -bottom-4 w-24 h-24">
                <svg viewBox="0 0 100 100" className="animate-spin-slow">
                  <defs>
                    <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.4 }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.4 }} />
                    </linearGradient>
                  </defs>
                  <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="url(#grad3)" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="py-20 px-4 bg-gray-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-12">
            Join Our Community
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of a growing community of learners and professionals who are passionate about practical skill development and continuous learning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}; 