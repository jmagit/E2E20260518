/* eslint-disable @typescript-eslint/no-unused-vars */
import test, { expect } from '@playwright/test';

test.describe('Ejemplo de que esta en edad laboral', () => {
    test.beforeEach(async ({ page, browser }, testInfo) => {
        test.info().annotations.push({ type: 'browser version', description: browser.version(), });
        console.log(`Running ${testInfo.title}`);
        await page.goto('/calculadora');
    });

    test.describe('Casos validos', () => {
        test.fixme('edad sea 16 años', async ({ page }) => {
        })

        test('edad sea 67 años', async ({ page }) => {
            await expect(page.getByRole('heading')).toContainText('Calculadora');
            // ...
            test.fixme(true, 'prueba a medias')
        })

        test('prueba solo para firefox', async ({ page, browserName }) => {
            test.skip(browserName !== 'firefox', 'porque solo afecta al firefox');

        })
    });

    test.describe('Casos invalidos', () => {
        test.skip('edad sea 15 años', async ({ page }) => {

        })

        test('edad sea 68 años', async ({ page }) => {
            await expect(page.getByRole('heading')).toContainText('Calculadora');
            // expect(0.1 + 0.2).toBe(0.3)
            //expect(1 - 0.9).toBe(0.1)
        })

    });
});