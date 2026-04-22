const { test, expect } = require('@playwright/test');

test('Admin Panel CRUD and Integration Verification', async ({ page }) => {
  // 1. Login to Admin
  await page.goto('http://localhost:8080/admin.html');
  await page.fill('#adminPassword', 'SHIELD2026');
  await page.click('button:has-text("Entrar al Sistema")');

  // Verify Dashboard
  await expect(page.locator('#statTotalProducts')).not.toHaveText('0');
  await page.screenshot({ path: 'admin_dashboard.png' });

  // 2. Create a Product
  await page.click('a:has-text("Productos")');
  await page.click('button:has-text("Agregar Producto")');
  await page.fill('#productName', 'Producto de Prueba');
  await page.fill('#productPrice', '99000');
  await page.fill('#productStock', '10');
  await page.selectOption('#productCategory', 'Otros');
  await page.fill('#productDescription', 'Descripción de prueba para el nuevo producto.');
  await page.click('#productSaveBtn');

  // Verify Toast and Presence
  await expect(page.locator('.toast.success')).toBeVisible();
  await expect(page.locator('h3:has-text("Producto de Prueba")')).toBeVisible();
  await page.screenshot({ path: 'admin_product_created.png' });

  // 3. Update Price
  await page.click('a:has-text("Precios")');
  // Find the input for "Producto de Prueba"
  // We need to find the row that contains "Producto de Prueba"
  const row = page.locator('tr', { hasText: 'Producto de Prueba' });
  await row.locator('input[type="number"]').fill('88000');
  await row.locator('button:has-text("Guardar")').click();
  await expect(page.locator('.toast.success')).toBeVisible();
  await page.screenshot({ path: 'admin_price_updated.png' });

  // 4. Verify on Main Site
  await page.goto('http://localhost:8080/index.html');
  // Scroll to products
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await expect(page.locator('h3:has-text("Producto de Prueba")')).toBeVisible();
  await expect(page.locator('p:has-text("$88.000")')).toBeVisible();
  await page.screenshot({ path: 'index_verified_admin_changes.png' });
});
