"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-blue-950/40"></div>
      
      <motion.div 
        className="absolute inset-0 opacity-20 dark:opacity-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'url("/assets/pattern-dots.svg")',
          backgroundSize: '30px 30px'
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-indigo-400/20 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/20 to-primary/20 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm py-10 px-6 rounded-2xl border border-white/20 dark:border-white/5 bg-white/30 dark:bg-gray-900/30 shadow-xl shadow-indigo-500/5"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-indigo-500 rounded-full mx-auto mb-8"></div>
            
            <h2 className="mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-primary dark:from-indigo-400 dark:to-primary-light">
              কোর্স সম্পর্কে আরও জানতে চান?
            </h2>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
              আমাদের বিশেষজ্ঞ টিমের সাথে যোগাযোগ করুন আপনার কোর্স সিলেকশন এবং ক্যারিয়ার প্ল্যানিং সহায়তার জন্য।
            </p>
          
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white shadow-lg shadow-primary/20 border border-indigo-500/20 transition-all duration-300">
                <Link href="/contact" className="relative group overflow-hidden">
                  <span className="relative z-10">আমাদের সাথে যোগাযোগ করুন</span>
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-indigo-200 bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-indigo-50 hover:text-primary hover:border-primary dark:border-indigo-800 dark:hover:border-primary dark:hover:bg-indigo-950/30 transition-all duration-300">
                <Link href="/university/admission" className="flex items-center">
                  ভর্তি প্রক্রিয়া দেখুন
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >→</motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 