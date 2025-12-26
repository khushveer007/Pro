// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '../../src/hooks/useCountdown';

describe('useCountdown', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return correct time remaining', () => {
        // Mock current time: 2025-12-31T23:59:50.000Z (10 seconds before 2026)
        const mockNow = new Date('2025-12-31T23:59:50.000Z');
        vi.setSystemTime(mockNow);

        const targetDate = '2026-01-01T00:00:00.000Z';
        
        const { result } = renderHook(() => useCountdown(targetDate));

        // Verify initial calculation
        expect(result.current.timeLeft).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 10 });
    });
    
    it('should count down', () => {
         const mockNow = new Date('2025-12-31T23:59:50.000Z');
        vi.setSystemTime(mockNow);
        const targetDate = '2026-01-01T00:00:00.000Z';
        const { result } = renderHook(() => useCountdown(targetDate));
        
        expect(result.current.timeLeft.seconds).toBe(10);
        
        // Advance 1 second
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        
        expect(result.current.timeLeft.seconds).toBe(9);
    });
    
    it('should handle past dates', () => {
         const mockNow = new Date('2026-01-02T00:00:00.000Z');
        vi.setSystemTime(mockNow);
        const targetDate = '2026-01-01T00:00:00.000Z';
        const { result } = renderHook(() => useCountdown(targetDate));
        
        expect(result.current.timeLeft).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    });
});
