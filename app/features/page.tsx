"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  BookOpen, 
  Video, 
  Newspaper, 
  User, 
  Heart, 
  Music, 
  Share2, 
  CreditCard,
  BookMarked,
  MessageSquare,
  Trophy,
  Brain,
  Rocket,
  Code
} from "lucide-react";
import Image from "next/image";

const FeatureCard = ({ icon: Icon, title, description, index }: {
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
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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

const features = [
  {
    icon: Brain,
    title: "Skill-Focused Learning",
    description: "Focus on practical skills and real-world applications rather than traditional academic metrics."
  },
  {
    icon: Video,
    title: "Video Management",
    description: "Organize and access your favorite educational videos with advanced categorization and playback features."
  },
  {
    icon: BookMarked,
    title: "Blog Platform",
    description: "Share your knowledge and experiences through our integrated blogging platform with rich media support."
  },
  {
    icon: User,
    title: "Profile Management",
    description: "Customize your learning profile, track progress, and showcase your achievements."
  },
  {
    icon: Heart,
    title: "Favorites System",
    description: "Save and organize your favorite content across videos, articles, and audio materials."
  },
  {
    icon: Music,
    title: "Audio Learning",
    description: "Access and manage educational audio content with playlist creation and offline listening."
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Connect with other learners and share your progress across social media platforms."
  },
  {
    icon: Newspaper,
    title: "Article Management",
    description: "Create, edit, and organize educational articles with rich formatting options."
  },
  {
    icon: CreditCard,
    title: "Subscription Management",
    description: "Flexible subscription options to access premium content and features."
  },
  {
    icon: MessageSquare,
    title: "Community Interaction",
    description: "Engage with other learners through comments, discussions, and collaborative learning."
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Track your learning progress with badges, certificates, and skill assessments."
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description: "Access a wide range of learning materials including tutorials, guides, and practice exercises."
  },
  {
    icon: Code,
    title: "Practical Projects",
    description: "Apply your skills through hands-on projects and real-world scenarios."
  },
  {
    icon: Rocket,
    title: "Career Growth",
    description: "Build a portfolio of work and skills that directly translate to career opportunities."
  }
];

export default function FeaturesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const firstText = "Build Real Skills for ";
  const secondText = "Real Growth";

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-gray-800/95 to-blue-900/90" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              initial={{ display: "inline-block" }}
              animate={{ display: "inline-block" }}
            >
              {Array.from(firstText).map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.05
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <br className="md:hidden" />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 ml-0 md:ml-2"
              initial={{ display: "inline-block" }}
              animate={{ display: "inline-block" }}
            >
              {Array.from(secondText).map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                    delay: (index + firstText.length) * 0.05
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-gray-200 text-lg max-w-2xl mx-auto"
          >
            A platform designed for practical skill development, not just theoretical knowledge.
            Learn, practice, and master the skills that matter in today&apos;s world.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
} 