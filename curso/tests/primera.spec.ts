import { test, expect } from '@playwright/test';

test('primer ejemplo grabando una prueba', async ({ page }) => {
  await test.step('Paso 1: Ir a la pagina principal', async () => {
    await page.goto('http://localhost:8181/');
    await expect(page.getByRole('heading', { name: 'Entorno de pruebas Web4Testing' })).toBeVisible();
  })

  await test.step('Paso 2: Ir a la calulador', async () => {
    await page.getByRole('link', { name: 'Calculadora' }).click();
    await expect(page.getByRole('heading')).toContainText('Calculadora');
  })

  // eslint-disable-next-line playwright/no-skipped-test
  await test.step.skip('Paso 3: Ir a las Compras', async () => {
    await page.getByRole('link', { name: 'Compras' }).click();
    await expect(page.locator('h1')).toContainText('Compras');
  })

  await test.step('Paso 4: Ir a los contactos', async () => {
    await page.getByRole('link', { name: 'Contactos' }).click();
    await expect(page.getByRole('heading', { name: 'Contactos' })).toBeVisible();
  })

  await test.step('Paso 5: Añadir tares Tareas', async () => {
    await page.getByRole('link', { name: 'Tareas' }).click();
    await expect(page.getByRole('heading')).toContainText('Lista de Tareas');
    await page.getByRole('textbox', { name: 'Añade una tarea...' }).click();
    await page.getByRole('textbox', { name: 'Añade una tarea...' }).fill('borrar lo sobra');
    await page.getByRole('button', { name: 'Añadir' }).click();
    await expect(page.locator('#taskList')).toContainText('borrar lo sobra');
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: 'X' }).first().click();
    await page.getByRole('textbox', { name: 'Añade una tarea...' }).click();
  })

});