import test, { expect, Locator } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/calculadora')
})

test('llega a la página calculadora', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.getByRole('heading')).toContainText('Calculadora');
})

test.describe('botones de la calculadora', () => {
    let pantalla: Locator
    let resumen: Locator

    test.beforeEach(async ({ page }) => {
        pantalla = page.locator('#txtPantalla')
        resumen = page.locator('#txtResumen')
    })

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
            await expect(pantalla).toContainText('9876543210');
        });

        await test.step('coma decimal', async () => {
            await page.getByRole('button', { name: ',' }).click();
            await page.getByRole('button', { name: '0' }).click();
            await expect(pantalla).toContainText('9876543210,0');
            await page.getByRole('button', { name: ',' }).click();
            await page.getByRole('button', { name: '0' }).click();
            await expect(pantalla).toContainText('9876543210,00');
        });

        await test.step('cambio de signo', async () => {
            await page.getByRole('button', { name: '±' }).click();
            await expect(pantalla).toContainText('-9876543210');
            await page.getByRole('button', { name: '±' }).click();
            await expect(pantalla).toContainText('9876543210');
        });

    })

    test('operaciones', async ({ page }) => {
        await test.step('suma', async () => {
            await page.getByRole('button', { name: '1' }).click();
            await page.getByRole('button', { name: '+' }).click();
            await expect(resumen).toContainText('1 +');
            await expect(pantalla).toContainText('1');
        });

        await test.step('resta', async () => {
            await page.getByRole('button', { name: '-' }).click();
            await expect(resumen).toContainText('2 -');
            await page.getByRole('button', { name: '3' }).click();

        });

        await test.step('multiplica', async () => {
            await page.getByRole('button', { name: '*' }).click();
            await expect(pantalla).toContainText('-1');
            await expect(resumen).toContainText('-1 *');
            await page.getByRole('button', { name: '4' }).click();

        });

        await test.step('divide', async () => {
            await page.getByRole('button', { name: '/' }).click();
            await expect(pantalla).toContainText('-4');
            await expect(resumen).toContainText('-4 /');
            await page.getByRole('button', { name: '2' }).click();

        });

        await test.step('igual', async () => {
            await page.getByRole('button', { name: '=' }).click();
            await expect(resumen).toBeHidden();
            await expect(pantalla).toContainText('-2');

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

test.describe('Instantáneas de la calculadora', () => {
    const operaciones = [
        { operacion: '+', nombre: 'sum', },
        { operacion: '-', nombre: 'rest', },
        { operacion: '*', nombre: 'multi', },
        { operacion: '/', nombre: 'div', },
    ]

    test.describe('Con visual snapshot', () => {
        operaciones.forEach(async ({ operacion, nombre }) => {
            test(`visual snapshot ${nombre}`, async ({ page }) => {
                await page.getByRole('button', { name: '1' }).click();
                await page.getByRole('button', { name: operacion }).click();
                await expect(page).toHaveScreenshot();
            })
        })
    })

    test.describe('Con content snapshot', () => {
        operaciones.forEach(async ({ operacion, nombre }) => {
            test(`content snapshot ${nombre}`, async ({ page }) => {
                await page.getByRole('button', { name: '5' }).click();
                await page.getByRole('button', { name: operacion }).click();
                expect(await page.innerHTML('main')).toMatchSnapshot();
            })
        })
    })

    test.describe('Con aria snapshot', () => {
        operaciones.forEach(async ({ operacion, nombre }) => {
            test(`aria snapshot ${nombre}`, async ({ page }) => {
                await page.getByRole('button', { name: '5' }).click();
                await page.getByRole('button', { name: operacion }).click();
                await expect(page.getByRole('main')).toMatchAriaSnapshot(`
          - main:
            - heading "Calculadora" [level=1]
            - status: 5 ${operacion}
            - status: "5"
            - button "C"
            - button "↶ BORRAR"
            - button "+"
            - button "7"
            - button "8"
            - button "9"
            - button "-"
            - button "4"
            - button "5"
            - button "6"
            - button "*"
            - button "1"
            - button "2"
            - button "3"
            - button //
            - button "±"
            - button "0"
            - button ","
            - button "="
          `);
            })
        })
    })
})
