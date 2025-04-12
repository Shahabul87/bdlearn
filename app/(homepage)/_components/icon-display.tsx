"use client"

import { LucideIcon } from 'lucide-react';

export const IconDisplay = ({ 
  icon, 
  title, 
  className = "w-4 h-4 text-blue-500 dark:text-cyan-400" 
}: { 
  icon: LucideIcon | any;
  title: string; 
  className?: string; 
}) => {
  const IconComponent = icon;
  return (
    <div className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/50">
      <IconComponent className={className} />
    </div>
  );
}; 