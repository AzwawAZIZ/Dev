const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const sw=async(email,role)=>{await page.locator('[data-action=guide]').first().click();await page.locator(`[data-switch="${email}|${role}"]`).click()};
 const nav=async p=>page.locator(`[data-nav="${p}"]`).first().click();
 try{
  await page.goto(process.env.MIAGE_URL||'http://127.0.0.1:8000/');
  await sw('noe@demo.miage.fr','student');await nav('rooms');assert.ok(await page.getByText('Salon en attente').count());assert.equal(await page.locator('#room-form').count(),0);
  await page.locator('.profile-avatar').click();await page.fill('#sup-name','Amina Test');await page.fill('#sup-email','amina@entreprise.fr');await page.locator('#supervisor-form button').click();
  await sw('sarah@demo.miage.fr','tutor');await nav('availability');assert.ok(await page.locator('[data-availability=available]').getAttribute('aria-pressed')==='true');await page.locator('[data-availability=unavailable]').click();assert.ok(await page.getByText('Indisponible',{exact:true}).count());await nav('students');assert.equal(await page.locator('[data-open]').count(),3);
  await sw('sarah@demo.miage.fr','coordinator');await nav('assign');assert.ok((await page.locator('.tutor-capacity').filter({hasText:'Sarah Morel'}).innerText()).includes('Indisponible'));await nav('missions');assert.ok(await page.locator('#mission-tutor option[value="sarah@demo.miage.fr"]').isDisabled());
  await sw('sarah@demo.miage.fr','tutor');await nav('availability');await page.locator('[data-availability=available]').click();
  await sw('sarah@demo.miage.fr','coordinator');await nav('missions');await page.selectOption('#mission-student','s1');await page.fill('#mission-title','Mission Noé');await page.fill('#mission-description','Projet de suivi');await page.fill('#mission-company','Nova');await page.fill('#mission-city','Lille');await page.fill('#mission-address','1 rue du Test');await page.fill('#mission-start','2027-01-01');await page.fill('#mission-end','2027-06-01');await page.selectOption('#mission-tutor','sarah@demo.miage.fr');await page.locator('#mission-form button').click();
  await sw('sarah@demo.miage.fr','tutor');await nav('missions');await page.locator('[data-mission-accept]').click();await sw('sarah@demo.miage.fr','coordinator');await nav('missions');assert.ok(await page.locator('#mission-tutor option[value="sarah@demo.miage.fr"]').isDisabled());
  await nav('rooms');await page.locator('[data-room-student=s1]').click();assert.ok(await page.getByText('Salon en attente').count());
  await nav('requests');await page.getByRole('button',{name:'Créer l’accès'}).click();await nav('rooms');await page.locator('[data-room-student=s1]').click();assert.ok(await page.getByText('Salon ouvert').count());assert.ok((await page.locator('.room-members').innerText()).includes('Amina Test'));
  await sw('noe@demo.miage.fr','student');await nav('rooms');assert.ok(await page.getByText('Salon ouvert').count());await page.fill('#room-message','Bonjour, bienvenue dans notre salon');await page.locator('#room-form button[type=submit]').click();assert.ok(await page.locator('#room-history').getByText('Bonjour, bienvenue dans notre salon').count());
  await page.locator('[data-room-channel=targeted]').click();assert.ok(await page.locator('[name=room-recipient][value="coordinator|sarah@demo.miage.fr"]').isDisabled());assert.ok(await page.locator('[name=room-recipient][value="coordinator|sarah@demo.miage.fr"]').isChecked());
  await sw('sarah@demo.miage.fr','tutor');await nav('rooms');await page.locator('[data-room-student=s1]').click();assert.ok(await page.locator('#room-history').getByText('Bonjour, bienvenue dans notre salon').count());
  await sw('amina@entreprise.fr','company');await nav('rooms');assert.ok(await page.locator('#room-history').getByText('Bonjour, bienvenue dans notre salon').count());await page.locator('[data-room-channel=targeted]').click();await page.locator('[name=room-recipient][value="tutor|sarah@demo.miage.fr"]').check();await page.fill('#room-message','Message privé à ma tutrice');await page.locator('#room-form button[type=submit]').click();
  await sw('sarah@demo.miage.fr','tutor');await nav('rooms');await page.locator('[data-room-student=s1]').click();await page.locator('[data-room-channel=targeted]').click();assert.ok(await page.locator('#room-history').getByText('Message privé à ma tutrice').count());
  await sw('sarah@demo.miage.fr','coordinator');await nav('rooms');await page.locator('[data-room-student=s1]').click();await page.locator('[data-room-channel=targeted]').click();assert.equal(await page.locator('#room-history').getByText('Message privé à ma tutrice').count(),0);
  await sw('noe@demo.miage.fr','student');await nav('rooms');await page.locator('[data-room-channel=targeted]').click();assert.equal(await page.locator('#room-history').getByText('Message privé à ma tutrice').count(),0);
  await page.reload();await sw('sarah@demo.miage.fr','tutor');await nav('availability');assert.ok(await page.locator('[data-availability=available]').getAttribute('aria-pressed')==='true');await nav('rooms');await page.locator('[data-room-student=s1]').click();assert.ok(await page.locator('#room-history').getByText('Bonjour, bienvenue dans notre salon').count());
  await page.setViewportSize({width:390,height:844});assert.ok(await page.locator('.room-layout').isVisible());assert.ok(await page.locator('#room-form').isVisible());
  assert.deepEqual(errors,[]);console.log('PASS: disponibilité, capacité, affectation, activation du salon, échanges ciblés et publics, rôles, persistance et mobile.');
 }catch(e){console.error(e);process.exitCode=1}finally{await browser.close()}
})();
