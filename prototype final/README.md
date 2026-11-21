# Suivi MIAGE — prototype local

Ouvrir `index.html` dans un navigateur moderne ou lancer depuis ce dossier `python3 -m http.server 8000`, puis ouvrir l’adresse affichée. Aucun serveur applicatif ni installation n’est nécessaire.

La démonstration s’ouvre sur le tableau de bord de Nadia. Le bouton **Guide démo / Switch** permet de changer de rôle et d’acteur. Après déconnexion, les comptes sont accessibles via leur adresse de démonstration et le mot de passe `demo`. Le guide contient aussi **Réinitialiser la démo**. Les données et pièces jointes (1 Mo maximum chacune) sont conservées dans le `localStorage` du navigateur, sur l’origine utilisée.

Pour tester une création d’accès : choisir Noé, déclarer un maître de stage, puis choisir Sarah en coordinatrice et créer l’accès depuis **Accès & demandes**. Le nouveau compte devient sélectionnable dans le guide et sur l’écran de connexion. Pour tester le circuit de visas : Camille dépose un CRA et propose une visite ; Alex confirme et rédige puis vise le bilan ; Marie ajoute un amendement et vise ; Camille appose le troisième visa. Un désaccord peut être arbitré par Sarah.

**Sécurité :** prototype exclusivement local, avec données fictives. L’authentification et les rôles sont simulés côté navigateur ; `localStorage` est accessible à toute personne ayant accès au navigateur et ne constitue pas une protection. Aucun e-mail, service d’authentification, stockage serveur ou relance automatique n’est fourni. L’impression du tableau de bord peut être enregistrée en PDF via le navigateur. L’import CSV accepte des valeurs simples séparées par des points-virgules, sans point-virgule dans les champs.

## Tests navigateur

Les tests sont facultatifs pour utiliser l’application. Pour les exécuter : `npm install`, `npx playwright install chromium`, puis, dans deux terminaux, `python3 -m http.server 8000` et `npm test`. Ils utilisent un navigateur isolé et couvrent notamment les six rôles, les visas, les visites, l’import, les accès, l’audit et la persistance. Une autre adresse peut être fournie avec `MIAGE_URL`.
