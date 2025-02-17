"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { features } from "../data/features";
import Link from "next/link";

const CurvedLine = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div className="absolute left-1/2 h-full -translate-x-1/2 w-[150px]">
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 100 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 50,0 Q 60,200 40,400 Q 20,600 50,800"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          style={{
            pathLength,
            strokeDasharray: 1,
            strokeDashoffset: 1,
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const FeatureItem = ({ feature, index, inView }: { 
  feature: typeof features[0], 
  index: number,
  inView: boolean 
}) => {
  const isEven = index % 2 === 0;
  const [itemRef, itemInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
      className={`flex items-center gap-8 w-full ${isEven ? 'flex-row' : 'flex-row-reverse'} my-24 relative`}
    >
      {/* Curved Arrow */}
      <motion.svg
        className={`absolute ${isEven ? 'right-[45%]' : 'left-[45%]'} top-1/2 -translate-y-1/2 w-24 h-24`}
        viewBox="0 0 100 100"
        fill="none"
        initial={{ opacity: 0, scale: 0 }}
        animate={itemInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
      >
        <motion.path
          d={isEven 
            ? "M10,50 Q40,50 60,30 T90,40 L85,35 M85,35 L90,40 L85,45"
            : "M90,50 Q60,50 40,30 T10,40 L15,35 M15,35 L10,40 L15,45"
          }
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={itemInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.6 }}
          className="dark:opacity-100 opacity-70"
        />
        <defs>
          <linearGradient id="arrowGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Feature Content with Curved SVG Background */}
      <div className={`flex-1 ${isEven ? 'text-right pr-8' : 'text-left pl-8'} relative`}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 600 200"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d={isEven 
              ? "M40,0 C20,0 0,20 0,40 C0,60 0,140 0,160 C0,180 20,200 40,200 L560,200 C580,200 600,180 600,160 C600,140 600,60 600,40 C600,20 580,0 560,0 L40,0 Z"
              : "M560,0 C580,0 600,20 600,40 C600,60 600,140 600,160 C600,180 580,200 560,200 L40,200 C20,200 0,180 0,160 C0,140 0,60 0,40 C0,20 20,0 40,0 L560,0 Z"
            }
            className="fill-gray-900/50 backdrop-blur-xl"
            stroke="url(#featureGradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="featureGradient" gradientTransform={isEven ? "rotate(0)" : "rotate(180)"}>
              <stop offset="0%" stopColor="#9333EA" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative space-y-4 p-8">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2 + 0.2,
              type: "spring",
              stiffness: 100 
            }}
            className="text-2xl lg:text-3xl font-bold"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 } 
            }}
          >
            <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-700 dark:from-purple-300 dark:via-white dark:to-purple-300 bg-clip-text text-transparent
              drop-shadow-[0_2px_2px_rgba(147,51,234,0.2)]">
              {feature.title}
            </span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={itemInView ? { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.2 + 0.3,
                type: "spring",
                stiffness: 100
              }
            } : { opacity: 0, y: 20 }}
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.2 } 
            }}
            className="text-base lg:text-lg text-gray-200 leading-relaxed font-light tracking-wide"
          >
            {feature.description}
          </motion.p>
        </div>
      </div>

      {/* Icon Container */}
      <motion.div 
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={itemInView ? { scale: 1 } : { scale: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: index * 0.2 + 0.4 
        }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 
          p-[2px] backdrop-blur-lg">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center
            hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
            <feature.icon className="w-10 h-10 text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 
              bg-clip-text stroke-purple-600 dark:stroke-purple-400" />
          </div>
        </div>
      </motion.div>

      {/* Empty div for layout balance */}
      <div className="flex-1" />
    </motion.div>
  );
};

export const FeaturesGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
        from-purple-100/20 dark:from-purple-900/20 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-700 dark:from-purple-300 dark:via-white dark:to-purple-300 bg-clip-text text-transparent
              drop-shadow-[0_2px_2px_rgba(147,51,234,0.2)]">
              Powerful Features for Modern Learning
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Discover tools and features designed to enhance your learning experience and help you achieve your goals.
          </motion.p>
        </div>

        {/* Features Timeline */}
        <div ref={ref} className="relative max-w-5xl mx-auto">
          <CurvedLine />
          {features.map((feature, index) => (
            <FeatureItem
              key={feature.title}
              feature={feature}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center relative mt-32"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 
            blur-3xl opacity-50" />
          <div className="relative bg-gray-900/50 backdrop-blur-xl rounded-2xl p-12 border border-purple-500/10
            shadow-[0_0_50px_-12px] shadow-purple-500/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-300 via-white to-purple-300 bg-clip-text text-transparent
                drop-shadow-[0_2px_2px_rgba(168,85,247,0.2)]">
                Ready to Transform Your Learning Journey?
              </span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Join thousands of learners who are already experiencing the future of education.
            </p>
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 
                focus:ring-offset-2 focus:ring-offset-gray-900">
                Get Started Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 