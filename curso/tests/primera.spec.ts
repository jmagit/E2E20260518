import { test, expect } from '@playwright/test';

test('primer ejemplo grabando una prueba', async ({ page }) => {
  await page.goto('http://localhost:8181/');
  await expect(page.getByRole('heading', { name: 'Entorno de pruebas Web4Testing' })).toBeVisible();
  await page.getByRole('link', { name: 'Calculadora' }).click();
  await expect(page.getByRole('heading')).toContainText('Calculadora');
  await page.getByRole('link', { name: 'Compras' }).click();
  await expect(page.locator('h1')).toContainText('Compras');
  await page.getByRole('link', { name: 'Contactos' }).click();
  await expect(page.getByRole('heading', { name: 'Contactos' })).toBeVisible();
  await page.getByRole('link', { name: 'Tareas' }).click();
  await expect(page.getByRole('heading')).toContainText('Lista de Tareas');
  await page.getByRole('textbox', { name: 'Añade una tarea...' }).click();
  await page.getByRole('textbox', { name: 'Añade una tarea...' }).fill('borrar lo sobra');
  await page.getByRole('button', { name: 'Añadir' }).click();
  await expect(page.locator('#taskList')).toContainText('borrar lo sobra');
  await page.getByRole('checkbox').first().check();
  await page.getByRole('button', { name: 'X' }).first().click();
  await page.getByRole('textbox', { name: 'Añade una tarea...' }).click();
});