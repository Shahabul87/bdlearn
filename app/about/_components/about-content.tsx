"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, BackgroundSquares } from "./animated-background";
import { Code2, Gem, GraduationCap, Lightbulb, MessageCircle, Target } from "lucide-react";
import Image from "next/image";

const skills = [
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "Cloud Architecture", level: 75 },
];

const experiences = [
  {
    period: "2020 - Present",
    role: "Senior Software Engineer",
    company: "Tech Innovation Labs",
    description: "Leading full-stack development of enterprise applications"
  },
  {
    period: "2018 - 2020",
    role: "Frontend Developer",
    company: "Digital Solutions Inc",
    description: "Specialized in creating responsive and accessible web applications"
  },
];

export const AboutContent = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
          <BackgroundSquares />
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Image
              src="/your-profile-image.jpg" // Add your image
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full border-4 border-purple-500/20 mx-auto mb-8 shadow-lg shadow-purple-500/10"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                John Doe
              </span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto font-light">
              Full Stack Developer & Software Architect
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center space-x-6 text-gray-400"
          >
            {[Code2, Gem, GraduationCap].map((Icon, index) => (
              <Icon 
                key={index}
                className="w-6 h-6 hover:text-purple-400 transition-colors duration-200"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <div className="py-20 px-4 bg-gray-950/50 backdrop-blur-xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              About Me
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                With over 8 years of experience in software development, I specialize in building scalable, elegant solutions that solve real-world problems.
              </p>
              <p>
                My passion lies in creating intuitive user experiences while maintaining robust backend architectures. I believe in writing clean, maintainable code and staying current with emerging technologies.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <motion.div 
                  className="h-1.5 bg-gray-800 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Professional Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-blue-500 opacity-20" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.period}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative grid md:grid-cols-2 gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left md:grid-flow-dense'
                }`}
              >
                <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}>
                  <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/10 shadow-lg shadow-purple-500/5">
                    <span className="text-purple-400 font-light">{exp.period}</span>
                    <h3 className="text-xl font-semibold text-white mt-2">{exp.role}</h3>
                    <p className="text-gray-400 mt-1">{exp.company}</p>
                    <p className="text-gray-300 mt-4">{exp.description}</p>
                  </div>
                </div>
                <div className={`absolute left-1/2 transform -translate-x-1/2 ${
                  index % 2 === 0 ? 'md:-translate-y-1/2' : 'md:translate-y-1/2'
                }`}>
                  <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-4 bg-gray-950/50 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-300 mb-8">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full 
              font-semibold text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 
              transition-shadow duration-300"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}; 