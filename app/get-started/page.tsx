"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  CheckCircle2, 
  ArrowRight, 
  Star,
  Zap,
  Shield,
  Trophy
} from "lucide-react";
import { useState, useEffect } from "react";

// Define the type for a particle
interface Particle {
  id: number;
  initialX: number;
  initialY: number;
  animateX: number;
  animateY: number;
  duration: number;
  delay: number;
}

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up in seconds and get immediate access to our platform.",
    icon: Shield,
  },
  {
    title: "Choose Your Path",
    description: "Select from our curated learning paths based on your goals.",
    icon: Zap,
  },
  {
    title: "Start Learning",
    description: "Jump into interactive lessons and start building real skills.",
    icon: Trophy,
  },
];

const benefits = [
  "Personalized learning experience",
  "Expert-led courses",
  "Interactive coding environments",
  "Real-world projects",
  "Community support",
  "Career guidance"
];

export default function GetStartedPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate particles after component mounts to avoid window reference errors
  useEffect(() => {
    if (!mounted) return;
    
    // Create particles only on client-side
    const generateParticles = (): Particle[] => {
      if (typeof window === 'undefined') return [];
      
      return Array.from({ length: 20 }).map((_, index) => ({
        id: index,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        animateX: Math.random() * window.innerWidth,
        animateY: Math.random() * window.innerHeight,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 2
      }));
    };
    
    setParticles(generateParticles());
  }, [mounted]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-gray-900"
          />
          {/* Animated particles */}
          {particles.length > 0 && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-purple-500 rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
                scale: 0
              }}
              animate={{
                x: particle.animateX,
                y: particle.animateY,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "loop",
                delay: particle.delay
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Begin Your Learning
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Adventure Today
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Transform your skills and unlock new opportunities with our comprehensive learning platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg group"
            >
              Start Free Trial
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              View Pricing
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-20 px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Three Simple Steps to Start
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-gray-900 p-6 rounded-xl"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <step.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                What You&apos;ll Get
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-green-400 w-6 h-6" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl overflow-hidden"
            >
              {/* Add your illustration or image here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="w-24 h-24 text-purple-400/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 