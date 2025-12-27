'use client';

import { useState, useEffect } from 'react';

export function useScrollReveal() {
  const [hasScrolledPastEntrance, setHasScrolledPastEntrance] = useState(false);
  const [hasScrolledPastExit, setHasScrolledPastExit] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        const isEntrance = scrollY > 20;
        const isExit = scrollY > windowHeight * 0.7;

        setHasScrolledPastEntrance(isEntrance);
        setHasScrolledPastExit(isExit);

        rafId = null;
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    hasScrolledPastEntrance,
    hasScrolledPastExit
  };
}