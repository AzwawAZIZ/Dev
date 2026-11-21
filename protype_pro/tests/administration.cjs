const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const nav=async n=>page.locator(`[data-nav="${n}"]`).first().click();
 const sw=async(email,r)=>{await page.locator('[data-action=guide]').first().click();await page.locator(`[data-switch="${email}|${r}"]`).click()};
 const tab=async t=>page.locator(`[data-tab="${t}"]`).first().click();
 try{
  await page.goto(process.env.MIAGE_URL||'http://127.0.0.1:8000/');
  await sw('laurent@demo.miage.fr','tutor');await nav('students');await page.locator('[data-open=s0]').click();await tab('messages');
  await page.fill('#message-body','Message privé pour entreprise');await page.locator('[name=recipient][value="company|dubois@demo.miage.fr"]').check();await page.locator('#message-form button.primary').click();
  await sw('admin@demo.miage.fr','admin');assert.ok(await page.getByText('Tableau de bord technique').count());assert.ok(await page.getByText('Stockage local').count());assert.ok(await page.getByText('État technique').count());assert.ok(await page.getByText('Volume des données').count());
  await nav('students');assert.equal(await page.locator('[data-open]').count(),10);await page.locator('[data-open=s0]').click();await tab('messages');assert.ok(await page.getByText('Message privé pour entreprise').count());
  await page.fill('#message-body','Message envoyé par administration');await page.locator('[name=recipient][value="student|camille@demo.miage.fr"]').check();await page.locator('#message-form button.primary').click();assert.ok(await page.getByText('Message envoyé par administration').count());
  await tab('cra');await page.locator('[data-impersonate="laurent@demo.miage.fr|tutor"]').click();assert.ok(await page.getByText('Intervention administrateur').count());await page.locator('.feedback-form').first().locator('textarea').fill('Retour réalisé par administrateur');await page.locator('.feedback-form').first().locator('button').click();await page.locator('[data-action=return-admin]').click();assert.match(await page.locator('.top-role').innerText(),/Administrateur/);assert.ok(await page.getByText('Retour réalisé par administrateur').count());
  await nav('reports');await page.locator('[data-report-action^="take|"]').first().click();assert.ok(await page.getByText('En cours').count());
  await nav('students');await page.locator('[data-open=s4]').click();await tab('crv');await page.locator('[data-action=arbitrate]').click();assert.ok(await page.getByText('Bilan clôturé').count());
  await nav('transition');await page.locator('[data-transition="s1|archive"]').click();await nav('students');assert.ok(await page.locator('[data-open=s1]').count());await page.locator('[data-open=s1]').click();assert.ok(await page.getByText('Sortie MIAGE').count());await page.locator('[data-restore-student=s1]').click();assert.ok(!(await page.getByText('Sortie MIAGE').count()));
  await nav('import');await page.locator('#import-form button').click();assert.ok(await page.getByText('2 rattachement(s) appliqué(s)').count());
  await nav('audit');const auditText=await page.locator('.content').innerText();assert.match(auditText,/Consultation MESSAGES/);assert.match(auditText,/Consultation CRA/);assert.match(auditText,/intervention pour Alex Laurent/);assert.match(auditText,/Retour|Réponse envoyée/);
  await nav('dashboard');await page.locator('[data-action=admin-impersonate]').click();await page.locator('[data-impersonate="camille@demo.miage.fr|student"]').click();assert.ok(await page.getByText('Intervention administrateur').count());await page.locator('[data-action=return-admin]').click();
  assert.deepEqual(errors,[]);console.log('PASS: statistiques techniques, tous les dossiers et messages privés, actions de pilotage, archives, intervention et audit administrateur.');
 }catch(e){console.error(e);process.exitCode=1}finally{await browser.close()}
})();
