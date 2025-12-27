import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import * as useScrollRevealHook from '@/hooks/useScrollReveal';

// Mock the hook
vi.mock('@/hooks/useScrollReveal', () => ({
  useScrollReveal: vi.fn(),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, className }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src?.src || src} alt={alt} className={className} />
  ),
}));

// Mock styles to return simple class names for easier testing
vi.mock('@/components/sections/Header.module.css', () => ({
  default: {
    header: 'header',
    headerVisible: 'headerVisible',
    nav: 'nav',
    navListDesktop: 'navListDesktop',
    navItem: 'navItem',
    navLink: 'navLink',
    mobileNav: 'mobileNav',
    mobileNavLink: 'mobileNavLink',
    menuIconCircle: 'menuIconCircle',
    mobileMenuItems: 'mobileMenuItems',
    active: 'active',
  },
}));

vi.mock('@/components/sections/Hero.module.css', () => ({
  default: {
    hero: 'hero',
    bgContainer: 'bgContainer',
    bgZoomedOut: 'bgZoomedOut',
    posterImage: 'posterImage',
    bgVideo: 'bgVideo',
    bgBottom: 'bgBottom',
    bgBottomLayer3: 'bgBottomLayer3',
    vignette: 'vignette',
    content: 'content',
    contentShiftUp: 'contentShiftUp',
    title: 'title',
    subtitle: 'subtitle',
    frameGroup: 'frameGroup',
    frameZoomed: 'frameZoomed',
    corner: 'corner',
    cornerTopLeft: 'cornerTopLeft',
    cornerTopRight: 'cornerTopRight',
    cornerBottomLeft: 'cornerBottomLeft',
    cornerBottomRight: 'cornerBottomRight',
    boundary: 'boundary',
    boundaryTop: 'boundaryTop',
    boundaryBottom: 'boundaryBottom',
    boundaryLeft: 'boundaryLeft',
    boundaryRight: 'boundaryRight',
    decorationCorner: 'decorationCorner',
    decorationBottomLeft: 'decorationBottomLeft',
    decorationBottomRight: 'decorationBottomRight',
    stateVisible: 'stateVisible',
    stateExited: 'stateExited',
  },
}));

describe('Scroll Animation Integration', () => {
  const mockUseScrollReveal = vi.mocked(useScrollRevealHook.useScrollReveal);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Header Integration', () => {
    it('should not have visible class initially', () => {
      mockUseScrollReveal.mockReturnValue({
        hasScrolledPastEntrance: false,
        hasScrolledPastExit: false,
      });

      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('header');
      expect(header.className).not.toContain('headerVisible');
    });

    it('should have visible class when scrolled past entrance', () => {
      mockUseScrollReveal.mockReturnValue({
        hasScrolledPastEntrance: true,
        hasScrolledPastExit: false,
      });

      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header.className).toContain('headerVisible');
    });
  });

  describe('Hero Integration', () => {
    it('should have default classes initially', () => {
      mockUseScrollReveal.mockReturnValue({
        hasScrolledPastEntrance: false,
        hasScrolledPastExit: false,
      });

      render(<Hero />);
      
      // Check Background Container
      // The structure is complex, let's find by class logic or some identifier if possible.
      // Since we mocked styles, we can look for elements with specific classes if we could select them easily.
      // We can use data-testid on section which we added.
      const section = screen.getByTestId('hero-section');
      
      // We can inspect the HTML to find our classes
      // bgContainer is a child
      expect(section.innerHTML).toContain('bgContainer');
      expect(section.innerHTML).not.toContain('bgZoomedOut');
      expect(section.innerHTML).not.toContain('frameZoomed');
      expect(section.innerHTML).not.toContain('stateVisible');
    });

    it('should apply zoom classes when scrolled past entrance', () => {
      mockUseScrollReveal.mockReturnValue({
        hasScrolledPastEntrance: true,
        hasScrolledPastExit: false,
      });

      render(<Hero />);
      const section = screen.getByTestId('hero-section');

      expect(section.innerHTML).toContain('bgZoomedOut');
      expect(section.innerHTML).toContain('frameZoomed');
      expect(section.innerHTML).toContain('stateVisible');
    });

    it('should apply exit classes when scrolled past exit', () => {
      mockUseScrollReveal.mockReturnValue({
        hasScrolledPastEntrance: true, // Exit implies entrance passed usually
        hasScrolledPastExit: true,
      });

      render(<Hero />);
      const section = screen.getByTestId('hero-section');

      expect(section.innerHTML).toContain('stateExited');
      expect(section.innerHTML).toContain('contentShiftUp');
    });
  });
});
