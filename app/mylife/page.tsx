"use client";
import { TimelineDemo } from "./timelinedemo"
import Logo from '@/assets/logo.png'; 
import Link from 'next/link';
import Image from 'next/image';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = [
    {
      text: "Embark",
      className: "text-indigo-500 dark:text-indigo-300"
    },
    {
      text: "on",
      className: "text-teal-500 dark:text-teal-300"
    },
    {
      text: "iSham's",
      className: "text-fuchsia-500 dark:text-fuchsia-300"
    },
    {
      text: "Life",
      className: "text-cyan-400 dark:text-cyan-300"
    },
    {
      text: "Journey",
      className: "text-yellow-400 dark:text-yellow-300",
    },
];

const MyLifeJourneyPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div ref={containerRef} className="relative min-h-screen">
            {/* SVG Path Container */}
            <div className="fixed left-0 top-0 w-24 h-full pointer-events-none z-50">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 1000"
                    fill="none"
                    preserveAspectRatio="xMidYMin meet"
                >
                    <motion.path
                        d="M 50 0 
                           Q 60 250, 40 500
                           Q 20 750, 60 1000"
                        stroke="url(#gradient-line)"
                        strokeWidth="2"
                        fill="none"
                        style={{ pathLength, opacity }}
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="33%" stopColor="#34d399" />
                            <stop offset="66%" stopColor="#f472b6" />
                            <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Animated dots */}
                <motion.div
                    className="absolute left-[46px] w-3 h-3 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50"
                    style={{
                        top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                    }}
                />
                <motion.div
                    className="absolute left-[46px] w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"
                    style={{
                        top: useTransform(scrollYProgress, [0, 1], ["5%", "95%"]),
                        opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1])
                    }}
                />
            </div>

            {/* Content */}
            <div className="pl-32">
                <div className="flex flex-col items-center justify-center text-white mt-10 relative">
                    <Link href="/" className="">
                        <Image 
                            src={Logo} 
                            alt="Saas Logo" 
                            height={50} 
                            width={50} 
                            className="rounded-full absolute top-0 mb-5 md:mb-0 md:top-10 left-10 shadow-lg hover:scale-110 transition-transform duration-200"
                        />
                    </Link>
                    <motion.div 
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <TypewriterEffectSmooth words={words} />
                    </motion.div>
                </div>

                <motion.div 
                    className="border-t border-gray-700 p-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <TimelineDemo />
                </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-2 h-2 bg-white/20 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                    }}
                />
            ))}
        </div>
    );
};

export default MyLifeJourneyPage;