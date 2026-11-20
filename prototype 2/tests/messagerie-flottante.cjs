const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const sw=async(email,role)=>{await page.locator('[data-action=guide]').first().click();await page.locator(`[data-switch="${email}|${role}"]`).click()};
 const open=async()=>page.locator('[data-action=chat-open]').click();
 const close=async()=>page.locator('[data-action=chat-close]').click();
 try {
 await page.goto(process.env.MIAGE_URL||'http://127.0.0.1:8000/');
 await sw('camille@demo.miage.fr','student');assert.ok(await page.locator('[data-action=chat-open]').isVisible());await open();
 assert.ok((await page.locator('.chat-project-single').innerText()).includes('Camille Martin'));
 await page.fill('#floating-message','Bonjour depuis la fenêtre');await page.locator('#floating-message').press('Enter');
 assert.ok(await page.locator('#floating-history').getByText('Bonjour depuis la fenêtre').count());assert.equal(await page.locator('#floating-message').inputValue(),'');
 await close();await page.locator('[data-nav=dossier]').first().click();await page.locator('[data-tab=messages]').first().click();assert.ok(await page.locator('.content').getByText('Bonjour depuis la fenêtre').count());
 await open();await page.uncheck('#chat-public');const locked=page.locator('[name=chat-recipient][value="coordinator|sarah@demo.miage.fr"]');assert.ok(await locked.isChecked());assert.ok(await locked.isDisabled());
 await page.fill('#floating-message','Étudiante : message obligatoire');await page.locator('#floating-message-form button[type=submit]').click();assert.ok(await page.locator('#floating-history').getByText('Étudiante : message obligatoire').count());
 await close();await sw('laurent@demo.miage.fr','tutor');await open();assert.equal(await page.locator('#chat-project option').count(),4);await page.selectOption('#chat-project','s0');
 assert.ok(await page.locator('#floating-history').getByText('Bonjour depuis la fenêtre').count());
 await page.fill('#floating-message','Brouillon Camille');await page.selectOption('#chat-project','s1');assert.equal(await page.locator('#floating-message').inputValue(),'');await page.fill('#floating-message','Brouillon Noé');await page.selectOption('#chat-project','s0');assert.equal(await page.locator('#floating-message').inputValue(),'Brouillon Camille');
 await page.uncheck('#chat-public');await page.locator('[name=chat-recipient][value="company|dubois@demo.miage.fr"]').check();await page.fill('#floating-message','Privé à Marie');await page.locator('#floating-message').press('Enter');
 await close();await sw('camille@demo.miage.fr','student');await open();assert.equal(await page.locator('#floating-history').getByText('Privé à Marie').count(),0);await close();
 await sw('sarah@demo.miage.fr','coordinator');await open();await page.selectOption('#chat-project','s0');assert.equal(await page.locator('#floating-history').getByText('Privé à Marie').count(),0);assert.ok(await page.locator('#floating-history').getByText('Étudiante : message obligatoire').count());await close();
 await sw('dubois@demo.miage.fr','company');await open();assert.ok(await page.locator('#floating-history').getByText('Privé à Marie').count());await close();
 await sw('admin@demo.miage.fr','admin');await open();await page.selectOption('#chat-project','s0');assert.ok(await page.locator('#floating-history').getByText('Privé à Marie').count());await close();await page.locator('[data-nav=audit]').first().click();assert.ok((await page.locator('.content').innerText()).includes('messagerie flottante'));
 await page.reload();await sw('nadia@demo.miage.fr','promotion');assert.equal(await page.locator('[data-action=chat-open]').count(),0);assert.equal(await page.locator('.chat-window').count(),0);
 await sw('camille@demo.miage.fr','student');await page.setViewportSize({width:390,height:844});await open();assert.ok(await page.locator('.chat-window').isVisible());assert.ok(await page.locator('#floating-history').getByText('Bonjour depuis la fenêtre').count());
 const box=await page.locator('.chat-window').boundingBox();assert.ok(box.x>=0&&box.x+box.width<=390&&box.y>=0&&box.y+box.height<=844);
 await page.fill('#floating-message','Ligne 1');await page.locator('#floating-message').press('Shift+Enter');await page.locator('#floating-message').type('Ligne 2');assert.ok((await page.locator('#floating-message').inputValue()).includes('\n'));await page.locator('#floating-message').press('Enter');
 assert.ok(await page.locator('#floating-history').getByText('Ligne 1\nLigne 2').count());assert.deepEqual(errors,[]);
 console.log('PASS: fenêtre flottante, affichage mobile, dossiers, brouillons, messages publics et ciblés, accès par rôle et persistance.');
 } catch(e){console.error(e);process.exitCode=1}finally{await browser.close()}
})();
