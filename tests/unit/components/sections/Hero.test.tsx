
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import Hero from '../../../../src/components/sections/Hero';
import { describe, it, expect, vi } from 'vitest';

// Mock Next.js Image component to verify props
vi.mock('next/image', () => ({
    default: (props: any) => {
        // Render a mock that exposes the props we care about
        return <img data-testid="hero-bg-image" data-placeholder={props.placeholder} src={props.src} alt={props.alt} />;
    },
}));

describe('Hero Component Image Optimization', () => {
    it('renders the background image using next/image with blur placeholder', () => {
        render(<Hero />);

        const image = screen.getByAltText('Hero Background');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('data-placeholder', 'blur');
    });
});
