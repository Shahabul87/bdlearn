"use client"; // Add this if using Next.js 13+ for interactive elements like theme toggle

import { useState } from "react";
import { Moon, Sun, Monitor, Heart } from "lucide-react"; // Assuming you use Lucide for icons
import Link from "next/link";

export const MainFooter = () => {
  const [theme, setTheme] = useState("light");

  // Function to toggle theme (can integrate with Tailwind dark mode)
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <footer className="bg-gray-800 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Products Section */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Our Products</h3>
          <ul className="space-y-2">
            <li><Link href="#">Admin Panel Template</Link></li>
            <li><Link href="#">5664 Open Source Icons</Link></li>
            <li><Link href="#">Email Templates</Link></li>
            <li><Link href="#">SVG Illustrations</Link></li>
            <li><Link href="#">Avatars</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">Documentation</Link></li>
            <li><Link href="#">Repositories</Link></li>
            <li><Link href="#">Support</Link></li>
            <li><Link href="#">Guides</Link></li>
            <li><Link href="#">Status</Link></li>
            <li><Link href="#">License</Link></li>
          </ul>
        </div>

        {/* Tabler Section */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Tabler</h3>
          <ul className="space-y-2">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Testimonials</Link></li>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Changelog</Link></li>
            <li><Link href="#">Releases</Link></li>
            <li><Link href="#">Github</Link></li>
          </ul>
        </div>

        {/* Tabler Info and Social Links */}
        <div className="flex flex-col">
          <div className="mb-4">
            <h3 className="font-semibold text-white">Tabler</h3>
            <p className="text-gray-400 mt-2">
              Tabler comes with tons of well-designed components and features. Start your adventure with Tabler and make your dashboard great again. For free!
            </p>
          </div>

        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Monitor className="w-5 h-5 text-gray-400" />
            <div onClick={toggleTheme} className="cursor-pointer">
              {theme === "light" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-400">©codecalm.net - Terms of service · Privacy policy</p>

          {/* "Made with Love" */}
          <p className="text-gray-400 flex items-center">
            Made with <Heart className="mx-1 text-red-600" /> in Poland.
          </p>
        </div>
      </div>
    </footer>
  );
};

