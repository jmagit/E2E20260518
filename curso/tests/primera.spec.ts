import { test, expect } from '@playwright/test';
import casos from '../fixtures/opciones.json';
import { AppPage } from '../utils/app.page';

test('primer ejemplo grabando una prueba', async ({ page }) => {
  await test.step('Paso 1: Ir a la pagina principal', async () => {
    await page.goto('/');
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

test.describe('Opciones del menu', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  [
    { name: 'Inicio', title: 'Entorno de pruebas Web4Testing' },
    { name: 'Compras', title: 'Compras' },
    { name: 'Contactos', title: 'Contactos' },
    { name: 'Tareas', title: 'Lista de Tareas' },
  ].forEach(({ name, title }) => {
    test(`Opción: ${name}`, async ({ page }) => {
      await page.getByRole('link', { name }).click();
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    });
  });

  casos.forEach(({ name, title }) => {
    test(`Leída Opción: ${name}`, async ({ page }) => {
      await page.getByRole('link', { name }).click();
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
    });
  });
})

test.use({ storageState: 'playwright/.auth/emp-storage-state.json' });

test.describe('Ejemplo de PageObject', () => {
  let app: AppPage

  test.beforeEach('prepara el POM', async ({ page }) => {
    app = new AppPage(page);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('navegación', async () => {
    await app.goto()
    await app.logout()
    await app.gotoCalculadora()
    await app.gotoAPIs()
    await app.loginByIndex(3)
    await app.gotoCompras()
    await app.gotoContactos()
    await app.gotoBiblioteca()
    await app.logout()
  });

  test('auth', async () => {
    await app.goto()
    await app.gotoCalculadora()
  });

});
