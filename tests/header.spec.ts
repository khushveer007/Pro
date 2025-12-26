import { test, expect } from '@playwright/test';

test.describe('Header Component', () => {
    test('header is present on desktop', async ({ page }) => {
        await page.goto('/');
        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Check for navigation
        const nav = header.locator('nav');
        await expect(nav).toBeVisible();
    });

    test('header is present on mobile', async ({ page, browserName }) => {
        // Set mobile viewport for touch target testing
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        const header = page.locator('header');
        await expect(header).toBeVisible();

        // Task 5.2: Check for horizontal overflow
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const innerWidth = await page.evaluate(() => window.innerWidth);
        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);

        // Task 5.3: Verify touch targets (>= 44px) for interactive elements
        // On mobile, we have the Home link and the hamburger button
        const mobileLinks = header.locator('a');
        const linkCount = await mobileLinks.count();
        let visibleLinksChecked = 0;
        for (let i = 0; i < linkCount; i++) {
            const link = mobileLinks.nth(i);
            // Only check visible links
            if (await link.isVisible()) {
                const box = await link.boundingBox();
                if (box) {
                    expect(box.width).toBeGreaterThanOrEqual(44);
                    expect(box.height).toBeGreaterThanOrEqual(44);
                    visibleLinksChecked++;
                }
            }
        }
        // Ensure we actually tested at least one visible link (prevent vacuous pass)
        expect(visibleLinksChecked).toBeGreaterThan(0);

        // Also verify the hamburger button meets touch target requirements
        const hamburgerButton = header.locator('button');
        if (await hamburgerButton.isVisible()) {
            const box = await hamburgerButton.boundingBox();
            if (box) {
                expect(box.width).toBeGreaterThanOrEqual(44);
                expect(box.height).toBeGreaterThanOrEqual(44);
            }
        }
    });
});
