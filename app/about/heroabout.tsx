"use client"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef,useEffect,useState } from "react";
import ArrowIcon from '@/assets/arrow-right.svg'


export const AboutHeroSection =() => {


  const text = "This is about  me, S Alam"; // Text to type
  const [displayText, setDisplayText] = useState(""); // State to store typed text
  const [index, setIndex] = useState(0); // Track character index


    useEffect(() => {
        if (index < text.length) {
          const timeout = setTimeout(() => {
            setDisplayText((prev) => prev + text[index]);
            setIndex(index + 1);
          }, 75); // Typing speed in milliseconds
          return () => clearTimeout(timeout);
        }
      }, [index, text]);



    return (
        <section className='pt-20 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] max-h-screen overflow-x-clip'>
            <div className="container">
                <div className='md:w-[478px]'>
                    <div className="tag">Version 2.0 is here</div>
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        {displayText}
                    </motion.h1>
                    <p className="text-xl text-[#010D3E] tracking-tight mt-6"
                    >
                    Celebrate the joy of accomplishment with an app designed to track
                    your progress, motivate your efforts, and celebrate your success.
                    Celebrate the joy of accomplishment with an app designed to track
                    your progress, motivate your efforts, and celebrate your success.
                    Celebrate the joy of accomplishment with an app designed to track
                    your progress, motivate your efforts, and celebrate your success.
                    </p>
                    <div className="flex gap-1 items-center mt-[30px]" >
                    <button className='btn btn-primary'>Get for free</button>
                    <button className="btn btn-text gap-1">
                        <span>Learn more</span>
                        <ArrowIcon className="h-5 w-5"/>
                    </button>
                    </div>
                </div>
             </div>
        </section>
    )
}