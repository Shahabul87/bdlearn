"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";


export default function IconDownload() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "iSham",
      className: "text-fuchsia-500 dark:text-blue-500"
    },
    {
      text: "Learning",
    },
    {
      text: "Paradigm",
      className: "text-cyan-400 dark:text-blue-500",
    },
    
  ];


  return (
    <section className="bg-gray-800 text-center py-16 px-4 md:px-8 lg:px-10 min-h-screen flex items-center justify-center w-full">
      <motion.div
        className="mx-auto max-w-screen-xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        ref={ref}
      >
        {/* Notification Banner */}
        <motion.div className="flex flex-col md:flex-row justify-center items-center mb-4" variants={itemVariants}>
          <span className="bg-gray-800 text-base md:text-xl text-blue-400 px-4 py-1 rounded-full">
            A man with a Mission to change the learning system
          </span>
          <Link href="/mylife" className="ml-2 text-sm text-blue-400 underline">
            My Life Journey
          </Link>
        </motion.div>
        {/* Title */}
        {/* <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4">
            Welcome to iSham Learning Palace
    
        </h1> */}
        <div className="flex items-center justify-center px-5 text-center">
                   <TypewriterEffectSmooth words={words} />
                </div>
        {/* Description */}
        <motion.p className="text-[#94a3b8] text-base md:text-lg mb-8 px-10" variants={itemVariants}>
          Empowering and enlightening minds, transforming futures — a revolution in education begins here. Join us at iSham Learning Palace, where innovation meets inspiration for a brighter and painless tomorrow.
        </motion.p>
        {/* Buttons */}
        <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
          <a
            href="#"
            className="bg-blue-600 border border-black/50 text-white px-6 py-1 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Join Now
          </a>
          <a
            href="#"
            className="border border-[#94a3b8] text-[#94a3b8] px-6 py-1 rounded-lg hover:bg-[#1e293b] transition duration-200"
          >
            Sign Up
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
