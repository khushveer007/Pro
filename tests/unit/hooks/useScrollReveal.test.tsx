import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollReveal } from '@/hooks/useScrollReveal';

describe('useScrollReveal', () => {
  beforeEach(() => {
    // Reset window properties
    window.scrollY = 0;
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
    
    // Mock RAF to execute immediately
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return initial state as false', () => {
    const { result } = renderHook(() => useScrollReveal());
    expect(result.current.hasScrolledPastEntrance).toBe(false);
    expect(result.current.hasScrolledPastExit).toBe(false);
  });

  it('should detect scroll past entrance (20px)', () => {
    const { result } = renderHook(() => useScrollReveal());

    act(() => {
      window.scrollY = 21;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.hasScrolledPastEntrance).toBe(true);
  });

  it('should detect scroll past exit (70vh)', () => {
    const { result } = renderHook(() => useScrollReveal());

    // 70% of 1000px = 700px
    act(() => {
      window.scrollY = 701;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.hasScrolledPastExit).toBe(true);
  });

  it('should revert state when scrolling back up', () => {
    const { result } = renderHook(() => useScrollReveal());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.hasScrolledPastEntrance).toBe(true);

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current.hasScrolledPastEntrance).toBe(false);
  });
});
