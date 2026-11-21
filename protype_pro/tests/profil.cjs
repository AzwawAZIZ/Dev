const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 const sw=async(e,r)=>{await page.locator('[data-action=guide]').first().click();await page.locator(`[data-switch="${e}|${r}"]`).click()};
 const profile=async()=>page.locator('.profile-avatar').click();
 try{
 await page.goto(process.env.MIAGE_URL||'http://127.0.0.1:8000/');
 await sw('camille@demo.miage.fr','student');await profile();
 assert.equal(await page.locator('#profile-name').inputValue(),'Camille Martin');assert.equal(await page.locator('#sup-name').inputValue(),'Marie Dubois');assert.equal(await page.locator('#sup-email').inputValue(),'dubois@demo.miage.fr');
 await page.fill('#profile-phone','0601020304');await page.fill('#profile-contact','camille.contact@demo.miage.fr');await page.fill('#profile-city','Amiens');await page.fill('#profile-organisation','UPJV');await page.locator('#profile-form button').click();
 assert.ok((await page.locator('.profile-summary').innerText()).includes('5 / 5'));
 await page.fill('#current-password','wrongpass');await page.fill('#new-password','test-demo-2026');await page.fill('#confirm-password','test-demo-2026');await page.locator('#password-form button').click();assert.ok(await page.getByText('Mot de passe actuel incorrect.').count());
 await page.fill('#current-password','demo');await page.fill('#confirm-password','different-password');await page.locator('#password-form button').click();assert.ok(await page.getByText('Les nouveaux mots de passe ne correspondent pas.').count());
 await page.fill('#confirm-password','test-demo-2026');await page.locator('#password-form button').click();assert.ok(await page.getByText('Mot de passe de démonstration modifié.').count());assert.ok(!(await page.evaluate(()=>localStorage.getItem('suivi-miage-demo-pro'))).includes('test-demo-2026'));
 await page.reload();await sw('camille@demo.miage.fr','student');await profile();assert.equal(await page.locator('#profile-phone').inputValue(),'0601020304');
 await page.locator('[data-action=logout]').first().click();await page.fill('#login-email','camille@demo.miage.fr');await page.fill('#login-password','demo');await page.locator('#login-form button').click();assert.ok(await page.locator('#login-form').count());
 await page.fill('#login-password','test-demo-2026');await page.locator('#login-form button').click();await profile();assert.equal(await page.locator('#profile-phone').inputValue(),'0601020304');
 await page.fill('#profile-name','Camille Martin Test');await page.fill('#profile-email','camille2@demo.miage.fr');await page.locator('#profile-form button').click();assert.equal(await page.locator('#profile-email').inputValue(),'camille2@demo.miage.fr');
 await page.locator('[data-nav=dossier]').first().click();assert.ok(await page.getByText('Camille Martin Test').count());
 await page.locator('[data-action=logout]').first().click();await page.locator('[data-login="camille2@demo.miage.fr"]').click();assert.equal(await page.locator('#login-email').inputValue(),'camille2@demo.miage.fr');await page.fill('#login-password','test-demo-2026');await page.locator('#login-form button').click();assert.ok(await page.locator('.profile-avatar').count());
 await sw('noe@demo.miage.fr','student');await profile();await page.fill('#sup-name','Amina Test');await page.fill('#sup-email','amina@exemple.fr');await page.locator('#supervisor-form button').click();assert.ok(await page.getByText('Demande en attente', {exact:false}).count());
 await page.fill('#sup-email','amina.pro@exemple.fr');await page.locator('#supervisor-form button').click();
 await sw('sarah@demo.miage.fr','coordinator');await page.locator('[data-nav=requests]').first().click();assert.ok(await page.getByText('amina.pro@exemple.fr',{exact:false}).count());await page.getByRole('button',{name:'Créer l’accès'}).click();
 await sw('noe@demo.miage.fr','student');await profile();assert.equal(await page.locator('#sup-email').inputValue(),'amina.pro@exemple.fr');assert.ok(await page.getByText('Accès créé').count());
 await sw('laurent@demo.miage.fr','tutor');await profile();assert.equal(await page.locator('#profile-name').inputValue(),'Alex Laurent');assert.equal(await page.locator('#supervisor-form').count(),0);
 await sw('dubois@demo.miage.fr','company');await profile();assert.equal(await page.locator('#profile-email').inputValue(),'dubois@demo.miage.fr');
 await sw('nadia@demo.miage.fr','promotion');await profile();assert.ok((await page.locator('.profile-roles').innerText()).includes('Tuteur universitaire'));
 await sw('admin@demo.miage.fr','admin');await profile();assert.equal(await page.locator('#profile-email').inputValue(),'admin@demo.miage.fr');
 await page.setViewportSize({width:390,height:844});assert.ok(await page.locator('.profile-avatar').isVisible());assert.ok(await page.locator('#profile-form').isVisible());
 assert.deepEqual(errors,[]);console.log('PASS: profil des six rôles, données personnelles et e-mail, mot de passe, déclaration et correction du maître de stage, sauvegarde et reconnexion.');
 }catch(e){console.error(e);process.exitCode=1}finally{await browser.close()}
})();
