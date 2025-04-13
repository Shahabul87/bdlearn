"use client";

import { useState, useEffect } from "react";
import { universities, faculties, courses } from "./_data";

// Components
import HeroSection from "./_components/hero-section";
import StickyHeader from "./_components/sticky-header";
import FilterBar from "./_components/filter-bar";
import CourseGrid from "./_components/course-grid";
import ContactSection from "./_components/contact-section";

export default function ExploreCourses() {
  // State for filtering courses
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  
  // State for sticky header
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter courses based on search term, university, and faculty
  useEffect(() => {
    let results = [...courses];
    
    if (searchTerm) {
      results = results.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedUniversity && selectedUniversity !== "all") {
      results = results.filter(course => 
        course.university === selectedUniversity
      );
    }
    
    if (selectedFaculty && selectedFaculty !== "all") {
      results = results.filter(course => 
        course.faculty === selectedFaculty
      );
    }
    
    setFilteredCourses(results);
  }, [searchTerm, selectedUniversity, selectedFaculty]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedUniversity("all");
    setSelectedFaculty("all");
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }),
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Sticky Header */}
      <StickyHeader 
        isScrolled={isScrolled}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetFilters={resetFilters}
      />

      {/* Hero Section */}
      <HeroSection textVariants={textVariants} />

      {/* Filter Bar */}
      <FilterBar 
        universities={universities}
        faculties={faculties}
        searchTerm={searchTerm}
        selectedUniversity={selectedUniversity}
        selectedFaculty={selectedFaculty}
        setSearchTerm={setSearchTerm}
        setSelectedUniversity={setSelectedUniversity}
        setSelectedFaculty={setSelectedFaculty}
        resetFilters={resetFilters}
      />

      {/* Courses Grid */}
      <CourseGrid 
        filteredCourses={filteredCourses} 
        resetFilters={resetFilters} 
      />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
} 