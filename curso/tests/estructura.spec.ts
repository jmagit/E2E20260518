import test from '@playwright/test';

test.describe('Ejemplo de que esta en edad laboral', () => {
    test.describe('Casos validos', () => {
        test('edad sea 16 años', async ({page}) => {

        })
        test('edad sea 67 años', async ({page}) => {

        })
    });
    
    test.describe('Casos invalidos', () => {
        test('edad sea 15 años', async ({page}) => {

        })
        test('edad sea 68 años', async ({page}) => {

        })

    });
});