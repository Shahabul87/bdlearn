"use client"
import { useState } from 'react'; // Import the useState hook
import Image from 'next/image';
import ArrowRight from '@/assets/arrow-right.svg'; // Assuming correct import paths
import Logo from '@/assets/logo.png'; // Assuming correct import paths
import MenuIcon from '@/assets/menu.svg'; // Assuming correct import paths
import Link from 'next/link';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu state
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20 bg-gray-700 border-b border-white/50">
      {/* <div className="flex justify-center items-center py-3 bg-gray-900 text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div> */}

      <div className="py-3 ">
        <div className="container ">
          <div className="flex items-center justify-between ">
          
            <Link href="/">
                <Image src={Logo} alt="Saas Logo" height={50} width={50} className="rounded-full relative"/>
            </Link>
        
            {/* Mobile Menu Icon */}
            <MenuIcon className="h-5 w-5 md:hidden cursor-pointer" onClick={toggleMenu} />
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 !text-white items-center ">
              <a href="/about">About</a>
              <a href="/features">Features</a>
              <a href="/courses">Courses</a>
              <a href="/blog">Blogs</a>
              <a href="/auth/register">Sign Up</a>
              <a href="/auth/login">Login</a>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                Get for free
              </button>
            </nav>

            {/* Mobile Nav - Conditionally rendered */}
            {isMenuOpen && (
              <nav className="flex flex-col items-center justify-center gap-4 bg-gray-900 text-white p-5 absolute top-16 left-0 w-full md:hidden z-30">
                  <a href="/about">About</a>
                  <a href="/features">Features</a>
                  <a href="/courses">Courses</a>
                  <a href="/blog">Blogs</a>
                  <a href="/auth/register">Sign Up</a>
                  <a href="/auth/login">Login</a>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight" onClick={toggleMenu}>
                  Exit
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

