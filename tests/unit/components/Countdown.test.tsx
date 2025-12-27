import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Countdown from '@/components/ui/Countdown';
import * as useCountdownHook from '@/hooks/useCountdown';

// Mock the hook module
vi.mock('@/hooks/useCountdown', () => ({
    useCountdown: vi.fn(),
}));

// Mock Next.js Image
vi.mock('next/image', () => ({
    default: ({ priority, ...props }: any) => {
        return <img {...props} />;
    },
}));

describe('Countdown Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders skeleton when not hydrated', () => {
        // Mock useCountdown to return isClient: false
        vi.mocked(useCountdownHook.useCountdown).mockReturnValue({
            timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
            isClient: false
        });

        render(<Countdown />);

        // Should NOT show the text loading
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

        // Should show the skeleton component
        expect(screen.getByTestId('countdown-skeleton')).toBeInTheDocument();
    });

    it('renders countdown when hydrated', () => {
        // Mock useCountdown to return isClient: true
        vi.mocked(useCountdownHook.useCountdown).mockReturnValue({
            timeLeft: { days: 1, hours: 2, minutes: 3, seconds: 4 },
            isClient: true
        });

        render(<Countdown />);

        expect(screen.getByText('01')).toBeInTheDocument(); // Days
        expect(screen.getByText('Days')).toBeInTheDocument();
    });
});
