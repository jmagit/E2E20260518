import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/calculadora')
})

test('llega a la página calculadora', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.getByRole('heading')).toContainText('Calculadora');
})

test.describe('botones de la calculadora', () => {
    test('numéricos', async ({ page }) => {
        await test.step('dígitos', async () => {
            await page.getByRole('button', { name: '9' }).click();
            await page.getByRole('button', { name: '8' }).click();
            await page.getByRole('button', { name: '7' }).click();
            await page.getByRole('button', { name: '6' }).click();
            await page.getByRole('button', { name: '5' }).click();
            await page.getByRole('button', { name: '4' }).click();
            await page.getByRole('button', { name: '3' }).click();
            await page.getByRole('button', { name: '2' }).click();
            await page.getByRole('button', { name: '1' }).click();
            await page.getByRole('button', { name: '0' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('9876543210');
        });

        await test.step('coma decimal', async () => {
            await page.getByRole('button', { name: ',' }).click();
            await page.getByRole('button', { name: '0' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('9876543210,0');
            await page.getByRole('button', { name: ',' }).click();
            await page.getByRole('button', { name: '0' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('9876543210,00');
        });

        await test.step('cambio de signo', async () => {
            await page.getByRole('button', { name: '±' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('-9876543210');
            await page.getByRole('button', { name: '±' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('9876543210');
        });

    })

    test('operaciones', async ({ page }) => {
        await test.step('suma', async () => {
            await page.getByRole('button', { name: '1' }).click();
            await page.getByRole('button', { name: '+' }).click();
            await expect(page.locator('#txtResumen')).toContainText('1 +');
            await expect(page.locator('#txtPantalla')).toContainText('1');
        });

        await test.step('resta', async () => {
            await page.getByRole('button', { name: '-' }).click();
            await expect(page.locator('#txtResumen')).toContainText('2 -');
            await page.getByRole('button', { name: '3' }).click();

        });

        await test.step('multiplica', async () => {
            await page.getByRole('button', { name: '*' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('-1');
            await expect(page.locator('#txtResumen')).toContainText('-1 *');
            await page.getByRole('button', { name: '4' }).click();

        });

        await test.step('divide', async () => {
            await page.getByRole('button', { name: '/' }).click();
            await expect(page.locator('#txtPantalla')).toContainText('-4');
            await expect(page.locator('#txtResumen')).toContainText('-4 /');
            await page.getByRole('button', { name: '2' }).click();

        });

        await test.step('igual', async () => {
            await page.getByRole('button', { name: '=' }).click();
            await expect(page.locator('#txtResumen')).toBeHidden();
            await expect(page.locator('#txtPantalla')).toContainText('-2');

        });
    });

});

test.describe('operaciones de la calculadora', () => {
    test('suma', async ({ page }) => {
        await page.getByRole('button', { name: '1' }).click();
        await page.getByRole('button', { name: '+' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '=' }).click();
        await expect(page.locator('#txtPantalla')).toContainText('3');
    });

    test('resta', async ({ page }) => {
        await page.getByRole('button', { name: '5' }).click();
        await page.getByRole('button', { name: '-' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '=' }).click();
        await expect(page.locator('#txtPantalla')).toContainText('3');
    });

    test('multiplica', async ({ page }) => {
        await page.getByRole('button', { name: '5' }).click();
        await page.getByRole('button', { name: '*' }).click();
        await page.getByRole('button', { name: '6' }).click();
        await page.getByRole('button', { name: '=' }).click();
        await expect(page.locator('#txtPantalla')).toContainText('30');
    });

    test('divide', async ({ page }) => {
        await page.getByRole('button', { name: '8' }).click();
        await page.getByRole('button', { name: '/' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '=' }).click();
        await expect(page.locator('#txtPantalla')).toContainText('4');
    });

})
