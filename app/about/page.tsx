"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  Lightbulb, 
  Target, 
  Users, 
  Heart,
  Sparkles
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ValueCard = ({ icon: Icon, title, description, index }: {
  icon: any;
  title: string;
  description: string;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

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

const Star = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      animate={{ 
        scale: [0, 1, 0],
        rotate: 360,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    />
  );
};

interface AnimatedSquareProps {
  size: string;
  color: string;
  initialPosition: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

const AnimatedSquare = ({ size, color, initialPosition }: AnimatedSquareProps) => {
  return (
    <motion.div
      initial={{ 
        ...initialPosition,
        opacity: 0,
        rotate: 0
      }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        rotate: 360,
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className={`absolute ${size} bg-gradient-to-br ${color} rounded-3xl blur-3xl`}
    />
  );
};

const BackgroundSquares = () => {
  const squareSize = 80; // Base size for squares
  const gridSize = 5; // 5x5 grid
  const totalWidth = squareSize * gridSize;
  const totalHeight = squareSize * gridSize;

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div 
        className="relative"
        style={{
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
        }}
      >
        {Array.from({ length: 25 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-3xl"
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              borderRadius: '12px',
              left: `${(index % gridSize) * squareSize}px`,
              top: `${Math.floor(index / gridSize) * squareSize}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const firstPart = "About ";
  const secondPart = " Our Mission";

  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3
  }));

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-gray-800/95 to-blue-900/90 z-10" />
          
          {/* Centered background squares */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <BackgroundSquares />
          </div>

          {/* Existing animated squares with adjusted z-index */}
          <div className="absolute inset-0 z-20">
            <AnimatedSquare 
              size="w-96 h-96"
              color="from-purple-500/20 to-purple-800/20"
              initialPosition={{ top: "10%", left: "5%" }}
            />
            <AnimatedSquare 
              size="w-72 h-72"
              color="from-blue-500/20 to-blue-800/20"
              initialPosition={{ top: "60%", right: "10%" }}
            />
            <AnimatedSquare 
              size="w-64 h-64"
              color="from-indigo-500/20 to-indigo-800/20"
              initialPosition={{ top: "30%", right: "30%" }}
            />
            <AnimatedSquare 
              size="w-80 h-80"
              color="from-violet-500/20 to-violet-800/20"
              initialPosition={{ bottom: "20%", left: "25%" }}
            />
          </div>

          {/* Stars with adjusted z-index */}
          <div className="relative z-30">
            {stars.map((star) => (
              <Star key={star.id} delay={star.delay} />
            ))}
          </div>

          {/* Existing orbs with adjusted z-index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -100 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.2, 1],
              x: [-100, 0, -100]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl z-20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 100 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1], 
              scale: [1, 1.2, 1],
              x: [100, 0, 100]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
            className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl z-20"
          />
        </div>

        {/* Main content with highest z-index */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center z-40 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1.5 
            }}
            className="flex justify-center mb-6"
          >
            <Sparkles className="w-16 h-16 text-purple-400" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 relative"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.span className="inline-block">
                {firstPart.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 inline-block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {secondPart.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: (index + firstPart.length) * 0.05 + 0.5
                    }}
                    className="inline-block whitespace-pre"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
              Transforming education through practical skill development and innovative learning approaches.
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.8 
              }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(167, 139, 250, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/discover')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg"
              >
                Discover More
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-white/50"
            >
              <motion.div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto mb-2 relative">
                <motion.div 
                  className="w-1 h-2 bg-white/50 rounded-full mx-auto"
                  initial={{ y: 0 }}
                  animate={{ y: 15 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </motion.div>
              <span className="text-sm">Scroll Down</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <div className="relative py-20 px-4">
        {/* Decorative SVG Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating circles */}
          <svg className="absolute top-0 left-0 w-32 h-32" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.15 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#grad1)">
              <animate
                attributeName="r"
                values="40;45;40"
                dur="4s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 0,10; 0,0"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Rotating hexagon */}
          <svg className="absolute top-1/4 right-0 w-40 h-40" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(147, 51, 234)', stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z" fill="url(#grad2)">
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
              <Image
                src="/about-illustration.svg"
                alt="About Us Illustration"
                fill
                className="object-contain"
              />
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
}