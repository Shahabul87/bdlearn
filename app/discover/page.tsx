"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { 
  Rocket, 
  Brain, 
  Target, 
  Users,
  Code,
  BookOpen,
  Video,
  Music
} from "lucide-react";
import { useRouter } from "next/navigation";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: {
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
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      <div className="relative bg-gray-900 p-6 rounded-xl z-10 h-full transform group-hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

const features = [
  {
    icon: Brain,
    title: "Cognitive Learning",
    description: "Advanced learning techniques based on cognitive science and memory retention."
  },
  {
    icon: Code,
    title: "Interactive Coding",
    description: "Real-time coding environments with instant feedback and guidance."
  },
  {
    icon: Video,
    title: "Video Learning",
    description: "High-quality video content with interactive transcripts and notes."
  },
  {
    icon: Music,
    title: "Audio Resources",
    description: "Comprehensive audio materials for on-the-go learning."
  }
];

export default function DiscoverPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-blue-600/20"
          />
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.3),transparent_70%)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {" "}Learning Path
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-8"
          >
            Explore our comprehensive learning resources and find the perfect path for your growth
          </motion.p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Section */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-gray-950"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start Your Journey Today
              </h2>
              <p className="text-gray-400 mb-8">
                Join thousands of learners who have transformed their careers through our platform.
                Get started with our comprehensive learning paths and expert-led courses.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/get-started')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold"
              >
                Get Started
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px]"
            >
              {/* Add your illustration or image here */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 