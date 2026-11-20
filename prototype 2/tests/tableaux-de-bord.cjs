const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  async function switchRole(email, role) {
    await page.locator('[data-action=guide]').first().click();
    await page.locator(`[data-switch="${email}|${role}"]`).click();
  }
  async function csv() {
    const pending = page.waitForEvent('download');
    await page.locator('[data-action=export]').first().click();
    return fs.readFile(await (await pending).path(), 'utf8');
  }
  try {
    await page.goto(process.env.MIAGE_URL || 'http://127.0.0.1:8000/');
    assert.match(await page.locator('.top-role').innerText(), /Responsable stages/);
    assert.equal(await page.locator('.donut-center b').innerText(), '10');
    assert.equal(await page.locator('.table-card tbody tr').count(), 10);
    assert.ok((await csv()).includes('Inès Laurent'));
    await page.selectOption('#filter-year', 'M2');
    assert.equal(await page.locator('.donut-center b').innerText(), '5');
    assert.equal(await page.locator('.table-card tbody tr').count(), 5);
    const filteredCsv = await csv();
    assert.ok(filteredCsv.includes('Inès Laurent'));
    assert.ok(!filteredCsv.includes('Camille Martin'));
    await page.locator('[data-action=clear-filters]').click();
    await switchRole('laurent@demo.miage.fr', 'tutor');
    assert.match(await page.locator('.top-role').innerText(), /Tuteur universitaire/);
    assert.equal(await page.locator('.donut-center b').innerText(), '4');
    assert.equal(await page.locator('.table-card tbody tr').count(), 4);
    assert.equal(await page.locator('.chart-card').nth(2).locator('.bar-item').count(), 1);
    const tutorCsv = await csv();
    assert.ok(tutorCsv.includes('Camille Martin'));
    assert.ok(!tutorCsv.includes('Inès Laurent'));
    assert.equal(await page.locator('[data-open=s2]').count(), 0);
    await page.selectOption('#filter-year', 'M2');
    assert.equal(await page.locator('.donut-center b').innerText(), '1');
    assert.equal(await page.locator('.table-card tbody tr').count(), 1);
    assert.ok((await csv()).includes('Chloé Dubois'));
    assert.ok(!(await csv()).includes('Camille Martin'));
    await page.locator('[data-action=clear-filters]').click();
    await page.locator('[data-open=s0]').first().click();
    assert.ok(await page.getByText('Projet professionnel', { exact: false }).count());
    await switchRole('sarah@demo.miage.fr', 'tutor');
    assert.equal(await page.locator('.donut-center b').innerText(), '3');
    assert.ok(!(await csv()).includes('Camille Martin'));
    await switchRole('sarah@demo.miage.fr', 'coordinator');
    assert.equal(await page.locator('.donut-center b').innerText(), '10');
    await page.locator('[data-nav=assign]').first().click();
    await page.locator('form.assign-form[data-student=s2] select').selectOption('laurent@demo.miage.fr');
    await page.locator('form.assign-form[data-student=s2] button').click();
    await switchRole('laurent@demo.miage.fr', 'tutor');
    assert.equal(await page.locator('.donut-center b').innerText(), '5');
    assert.ok((await csv()).includes('Inès Laurent'));
    await switchRole('nadia@demo.miage.fr', 'promotion');
    assert.equal(await page.locator('.donut-center b').innerText(), '10');
    assert.equal(await page.locator('[data-open]').count(), 0);
    assert.ok((await page.locator('.notice').last().innerText()).includes('RG-10'));
    assert.deepEqual(errors, []);
    console.log('PASS: trois tableaux de bord, filtres croisés, exports et périmètres, multi-rôle, ouverture des dossiers et mise à jour après affectation.');
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally { await browser.close(); }
})();
