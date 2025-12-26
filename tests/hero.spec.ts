import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should be visible on desktop', async ({ page }) => {
        const hero = page.locator('[data-testid="hero-section"]');
        await expect(hero).toBeVisible();

        // Verify background video presence
        const bgVideo = hero.locator('video');
        await expect(bgVideo).toBeVisible();

        // Verify content hierarchy
        await expect(hero.locator('h1')).toBeVisible();
        // Verify Countdown component (design pivot removed description text)
        await expect(hero.locator('text=Days')).toBeVisible();
    });

    test('should match desktop snapshot', async ({ page }) => {
        const hero = page.locator('[data-testid="hero-section"]');
        await expect(hero).toBeVisible();
        await expect(page).toHaveScreenshot({ fullPage: true });
    });

    test('should have correct mobile layout', async ({ page }) => {
        // Mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        const hero = page.locator('[data-testid="hero-section"]');
        await expect(hero).toBeVisible();

        // Check for vertical stacking (basic check: elements exist)
        // Task 5.2: Verify no horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);

        // Task 5.3: Verify text readability (basic visibility check)
        await expect(hero.locator('h1')).toBeVisible();
    });
});
