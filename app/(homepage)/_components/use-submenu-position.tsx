"use client"

import { useRef, useEffect } from 'react';

export const useSubmenuPosition = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      const menu = menuRef.current;
      if (!menu) return;

      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const spaceOnRight = viewportWidth - rect.right;
      const spaceOnLeft = rect.left;

      if (spaceOnRight < 20) {
        menu.style.left = 'auto';
        menu.style.right = '100%';
        menu.style.marginRight = '0.5rem';
        menu.style.marginLeft = '0';
      } else {
        menu.style.left = '100%';
        menu.style.right = 'auto';
        menu.style.marginLeft = '0.5rem';
        menu.style.marginRight = '0';
      }

      const spaceAtBottom = window.innerHeight - rect.bottom;
      if (spaceAtBottom < 20) {
        const adjustment = Math.min(rect.height, Math.abs(spaceAtBottom));
        menu.style.top = `-${adjustment}px`;
      }
    };

    checkPosition();
    window.addEventListener('resize', checkPosition);
    return () => window.removeEventListener('resize', checkPosition);
  }, []);

  return menuRef;
}; 