"use client"

import { useSubmenuPosition } from './use-submenu-position';

export const SubmenuContainer = ({ children }: { children: React.ReactNode }) => {
  const menuRef = useSubmenuPosition();
  return (
    <div 
      ref={menuRef}
      className="absolute top-0 opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 w-64"
    >
      {children}
    </div>
  );
}; 