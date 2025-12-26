import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Tests', () => {
    test('desktop viewport matches baseline', async ({ page, browserName }, testInfo) => {
        // Skip on mobile projects - only run on Desktop Chrome
        test.skip(testInfo.project.name === 'Mobile Chrome', 'Desktop-only test');

        await page.goto('/');
        await expect(page).toHaveScreenshot('homepage-desktop.png', {
            fullPage: true,
        });
    });

    test('mobile viewport matches baseline', async ({ page }, testInfo) => {
        // Skip on desktop projects - only run on Mobile Chrome (Pixel 5)
        test.skip(testInfo.project.name === 'Desktop Chrome', 'Mobile-only test');

        await page.goto('/');
        await expect(page).toHaveScreenshot('homepage-mobile.png', {
            fullPage: true,
        });
    });
});
