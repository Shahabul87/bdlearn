"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { Heart, MessageCircle, Github, Twitter, Linkedin } from "lucide-react";

export const HomeFooter = () => {
  return (
    <>
      {/* Call to Action Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              Start Your Learning Journey Today
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              Join thousands of learners who have already transformed their careers through our platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium text-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Get Started for Free
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full filter blur-3xl" />
        </div>
      </section>

      {/* Main Footer Section */}
      <footer className="bg-gray-50 dark:bg-black text-gray-600 dark:text-gray-400 pt-20 pb-10">
        <div className="container mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                <div className="relative">
                  <Image
                    src={logo}
                    height={40}
                    alt="Logo"
                    className="rounded-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 dark:from-purple-500/20 dark:to-cyan-500/20 rounded-full blur" />
                </div>
              </Link>
              <p className="text-sm leading-relaxed">
                Empowering learners worldwide with cutting-edge education and transformative knowledge.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Courses', 'About Us', 'Contact', 'Blog'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 2 }}>
                    <Link href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                {['Documentation', 'Support', 'Terms of Service', 'Privacy'].map((item) => (
                  <motion.li key={item} whileHover={{ x: 2 }}>
                    <Link href="#" className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold mb-6">Stay Updated</h3>
              <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500 flex-1"
                />
                <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-r-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm">
                © 2024 Your Company. All rights reserved.
              </p>
              <p className="text-sm flex items-center">
                Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> by Our Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}; 