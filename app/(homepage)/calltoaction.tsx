'use client'

import ArrowRight from "@/assets/arrow-right.svg";
import starImage from '@/assets/star.png';
import springImage from '@/assets/spring.png';
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";



export const CallToAction = () => {


  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <section ref={heroRef} className="bg-gray-900 py-24 overflow-x-clip mt-10">
      <div className="container">
        <div className="section-heading relative">
              <h2 className="text-white text-4xl font-bold text-center">Sign up for free today</h2>
              <p className="text-white/80 mt-5 text-center">
                Celebrate the joy of accomplishment with an app designed to track your
                progress and motivate your efforts.
              </p>
              <motion.img
                src={starImage.src}
                alt="Star Image"
                width={360}
                className="absolute -left-[350px] -top-[137px]"
                animate={{
                  translateY: [-30, 30],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 3,
                  ease:"easeInOut"
                }}
              />

              <motion.img
                src={springImage.src}
                alt="Spring Image"
                width={360}
                className="absolute -right-[331px] -top-[19px]"
                animate={{
                  translateY: [-30, 30],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 3,
                  ease:"easeInOut"
                }}
              />

        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1 text-cyan-500">
            <span>Learn more</span> 
            <ArrowRight className="h-5 w-5"/>
            </button>
        </div>
      </div>
    </section>
  );
};
