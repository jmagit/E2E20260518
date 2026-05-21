import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/contactos')
})

test('llega a la página contacto', { tag: '@smoke' }, async ({ page }) => {
    await expect(page.getByRole('heading')).toContainText('Contactos');
})

test.describe('Consultas de contacto', () => {
  
    test('se ve bien el usuario', async ({ page }) => {
        await page.getByRole('button', { name: 'Dr. Adolf Dunster' }).click();
        await expect(page.locator('h4')).toContainText('Dr. Adolf Dunster');
        await expect(page.locator('#listado')).toContainText('Persona conflictiva');
        await expect(page.getByText('Persona conflictiva')).toHaveClass('text-danger')
        await expect(page.locator('#listado')).toContainText('699 455 408 adunster1a@amazon.co.uk 01/09/1979');
        await expect(page.getByRole('img', { name: 'Foto de Adolf Dunster' })).toBeVisible();
        
    });
    
    test('foto', async ({ page }) => {
        await page.getByRole('button', { name: 'Dr. Adolf Dunster' }).click();
        await expect(page).toHaveScreenshot('contacto-view.png');
    });
    
});
