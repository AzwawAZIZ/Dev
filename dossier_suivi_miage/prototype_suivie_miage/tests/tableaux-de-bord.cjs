const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, acceptDownloads: true });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  async function switchRole(email,role){const active=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('suivi-miage-demo-promax-session')||'null'));if(active?.email===email){await page.locator('[data-action=guide]').first().click()}else{if(await page.locator('[data-action=logout]').count())await page.locator('[data-action=logout]').first().click();await page.fill('#login-email',email);await page.fill('#login-password','demo');await page.locator('#login-form button').click()}const option=page.locator(`[data-switch="${email}|${role}"]`);if(await option.count())await option.click()};
  async function csv() {
    const pending = page.waitForEvent('download');
    await page.locator('[data-action=export]').first().click();
    return fs.readFile(await (await pending).path(), 'utf8');
  }
  try {
    await page.goto(process.env.MIAGE_URL || 'http://127.0.0.1:8000/');await page.fill('#login-email','sarah@demo.miage.fr');await page.fill('#login-password','demo');await page.locator('#login-form button').click();if(await page.locator('[data-switch=\"sarah@demo.miage.fr|coordinator\"]').count())await page.locator('[data-switch=\"sarah@demo.miage.fr|coordinator\"]').click();
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
    await page.locator('[data-nav=missions]').first().click();
    await page.selectOption('#mission-student','s2');await page.fill('#mission-title','Mission BI');await page.fill('#mission-description','Analyse');await page.fill('#mission-company','Entreprise');await page.fill('#mission-city','Amiens');await page.fill('#mission-address','1 rue de test');await page.fill('#mission-start','2027-01-01');await page.fill('#mission-end','2027-06-01');await page.selectOption('#mission-tutor','laurent@demo.miage.fr');await page.locator('#mission-form button').click();
    await switchRole('laurent@demo.miage.fr', 'tutor');
    await page.locator('[data-nav=missions]').first().click();await page.locator('[data-mission-accept]').first().click();await page.locator('[data-nav=dashboard]').first().click();
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
