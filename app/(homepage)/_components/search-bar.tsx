"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="hidden md:block relative">
      <motion.div
        animate={{
          width: isSearchFocused ? '400px' : '320px',
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full bg-gray-800/50 text-gray-200 rounded-xl py-2 pl-10 pr-4 outline-none ring-1 ring-gray-700 focus:ring-cyan-500/50 transition-all duration-300 peer placeholder-transparent dark:bg-gray-800/50 dark:text-gray-200 dark:ring-gray-700"
            placeholder="Search courses..."
          />
          <label 
            htmlFor="search"
            className={`absolute left-10 transition-all duration-200 
              ${isSearchFocused || searchValue 
                ? '-top-2.5 text-xs text-cyan-400'
                : 'top-1/2 -translate-y-1/2 text-gray-400'
              }
              peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400
            `}
          >
            Search courses...
          </label>
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </motion.div>
    </div>
  );
}; 