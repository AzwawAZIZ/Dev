# Suivi MIAGE — prototype Pro

Ouvrir `index.html` dans un navigateur moderne ou lancer depuis ce dossier `python3 -m http.server 8000`, puis ouvrir l’adresse affichée. Aucun serveur applicatif ni installation n’est nécessaire.

La démonstration s’ouvre sur le tableau de bord de Sarah, responsable stages & alternances. Le même tableau de bord analytique est également disponible pour Alex Laurent (tuteur universitaire) et Nadia Perrin (responsable de formation). Le tuteur ne voit que ses étudiants affectés, y compris dans les graphiques et les exports ; la coordinatrice voit la promotion entière. Les filtres, la recherche, le tri, l’impression et le CSV portent sur la sélection affichée. Le bouton **Guide démo / Switch** permet de changer de rôle et d’acteur. Après déconnexion, les comptes sont accessibles via leur adresse de démonstration et le mot de passe initial `demo`. Le guide contient aussi **Réinitialiser la démo**. Les données et pièces jointes (1 Mo maximum chacune) sont conservées dans le `localStorage` du navigateur, sur l’origine utilisée. Le prototype Pro reprend le prototype 3 et ajoute l’import Excel, les missions à confirmer et les pièces jointes de messagerie. Il utilise sa propre clé de stockage : il ne modifie ni ne reprend automatiquement les données des autres prototypes.

Pour tester une création d’accès : choisir Noé, déclarer un maître de stage, puis choisir Sarah en coordinatrice et créer l’accès depuis **Accès & demandes**. Le nouveau compte devient sélectionnable dans le guide et sur l’écran de connexion. Pour tester le circuit de visas : Camille dépose un CRA et propose une visite ; Alex confirme et rédige puis vise le bilan ; Marie ajoute un amendement et vise ; Camille appose le troisième visa. Un désaccord peut être arbitré par Sarah.

**Sécurité :** prototype exclusivement local, avec données fictives. L’authentification et les rôles sont simulés côté navigateur ; `localStorage` est accessible à toute personne ayant accès au navigateur et ne constitue pas une protection. Aucun e-mail, service d’authentification, stockage serveur ou relance automatique n’est fourni. L’impression du tableau de bord peut être enregistrée en PDF via le navigateur. Le CSV est séparé par des points-virgules et prend en charge les valeurs entre guillemets.

## Tests navigateur

Les tests sont facultatifs pour utiliser l’application. Pour les exécuter : `npm install`, `npx playwright install chromium`, puis, dans deux terminaux, `python3 -m http.server 8000` et `npm test`. Ils utilisent un navigateur isolé et couvrent notamment les six rôles, les visas, les visites, l’import, les accès, l’audit et la persistance, ainsi que les filtres et périmètres des trois tableaux de bord. Une autre adresse peut être fournie avec `MIAGE_URL`.

## Administration étendue

Dans **Guide démo / Switch**, choisissez Administration. Son tableau de bord technique indique les volumes réellement présents dans le navigateur, la taille des données locales et les références manquantes ; l’état réseau est uniquement celui signalé par le navigateur, et aucun service serveur n’est surveillé. Le menu donne accès aux comptes, au pilotage et à tous les dossiers, y compris archivés et messages ciblés ; un dossier archivé peut être réactivé.

Pour simuler une action qui appartient à un acteur précis (par exemple déposer un CRA ou viser un bilan), utilisez **Agir pour un utilisateur** ou les boutons d’intervention dans un dossier. La bannière identifie l’intervention et le bouton **Revenir à l’administration** la termine. Le journal local indique l’administrateur, l’acteur simulé et les modifications. Les règles de progression du dossier (ordre des visas, plafonds, etc.) restent appliquées.

Cette capacité d’accès complet et le journal restent des **simulations locales** : les contrôles et l’audit côté navigateur ne protègent pas de véritables données et ne remplacent pas des permissions, des traces infalsifiables et une authentification côté serveur.

## Profil personnel

Cliquez sur l’avatar dans la barre supérieure ou au bas de la barre latérale pour ouvrir **Mon profil**. Chaque compte peut modifier son nom, son adresse de connexion et ses coordonnées, ainsi que changer son mot de passe de démonstration après vérification de l’ancien. Le nouveau mot de passe fonctionne à la prochaine connexion et est réinitialisé avec la démo. Le changement nécessite un contexte sécurisé (HTTPS ou localhost). Le switch rapide contourne volontairement la connexion.

Le profil étudiant permet de déclarer ou de corriger une demande de maître de stage avec son e-mail professionnel. Le responsable stages crée ensuite l’accès dans **Accès & demandes** ; si un maître est déjà lié, une modification reste une demande jusqu’à sa validation.

N’utilisez **jamais de vraies données ni de vrai mot de passe** : le stockage et la connexion sont simulés côté navigateur, même si le mot de passe modifié n’est pas stocké en clair.

## Messagerie flottante

Le bouton **Messages**, en bas à droite, ouvre ou réduit la fenêtre de discussion sans quitter la page. Si plusieurs dossiers sont accessibles, choisissez-en un dans la liste. Les messages y sont les mêmes que dans l’onglet **Canal du projet** du dossier. L’option « Diffuser à tous » peut être désactivée pour choisir des destinataires ; pour un étudiant, le responsable stages reste destinataire obligatoire. Le responsable de formation n’a pas accès à la messagerie. Les brouillons sont conservés pendant la navigation dans la session, mais pas après un rechargement ou un changement d’acteur.

Il s’agit toujours d’une simulation locale : les échanges sont enregistrés dans le navigateur, sans serveur ni synchronisation en temps réel entre appareils.

## Disponibilités et salons

Le tuteur universitaire indique dans **Mes disponibilités** s’il accepte de nouveaux étudiants. Le responsable stages voit ce statut, la charge et les places restantes dans **Affectations**. Une proposition et sa confirmation sont bloquées si le tuteur n’est pas disponible ou si sa capacité est atteinte ; les dossiers déjà affectés restent suivis même si le tuteur devient indisponible. Les trois tuteurs initiaux sont déclarés disponibles ; un nouveau tuteur doit déclarer sa disponibilité.

L’étudiant déclare son maître de stage depuis son profil ou son dossier. Le responsable crée ensuite son accès dans **Accès & demandes**, ce qui le relie au dossier. Quand un tuteur et un maître de stage disposant de comptes actifs sont tous deux affectés, le **Salon du projet** s’ouvre pour les acteurs concernés. Il reprend les messages du dossier : **général** est partagé avec les acteurs du projet ; **messages ciblés** ne montre que les échanges autorisés par les destinataires. Le responsable de formation ne voit pas les salons.

Pour essayer : choisissez Noé, déclarez un maître de stage fictif, puis utilisez Sarah en rôle tuteur pour modifier sa disponibilité et en rôle responsable pour proposer une mission à Noé et créer l’accès ; revenez au rôle tuteur pour confirmer la proposition. Changez ensuite d’acteur avec le guide pour vérifier le salon. Ce salon est une interface inspirée des espaces de discussion : il ne se connecte pas à Discord et ne synchronise pas les échanges entre navigateurs.


## Import Excel et missions

Dans **Import Mon Master**, choisissez un classeur `.xlsx` (première feuille) ou un CSV UTF-8 à séparateur `;`, puis vérifiez l’aperçu et cliquez sur **Créer / fusionner les dossiers**. Les colonnes obligatoires sont `nom`, `email`, `promotion` (M1 ou M2). Colonnes facultatives : `prenom`, `contrat`, `entreprise`, `ville`, `adresse`, `mission`, `date_debut`, `date_fin`. Le contrat peut être `Apprentissage`, `Alternance`, `Stage alterné` ou `Stage temps plein`. Dans le CSV, utilisez des dates `AAAA-MM-JJ` et des guillemets pour inclure un point-virgule dans un champ. Les cellules de date Excel sont également acceptées. Exemple :

```csv
nom;email;promotion;contrat;entreprise;ville;adresse;mission;date_debut;date_fin
Zoé Exemple;zoe@example.fr;M1;Alternance;Entreprise fictive;Lyon;1 rue Exemple;"Analyse; développement";2027-02-01;2027-08-01
```

Limites : 2 Mo, 500 lignes, et pour Excel 30 colonnes ; les anciens `.xls` ne sont pas pris en charge. Un e-mail déjà lié à un étudiant fusionne les informations sans effacer ses échanges ; les doublons dans un même fichier ou les adresses déjà utilisées par un autre compte sont refusés. Vérifiez les données avant de confirmer l’import.

Dans **Missions & propositions**, la responsable sélectionne un étudiant, complète l’intitulé, la description, l’entreprise, l’adresse, la ville et les dates, puis choisit un tuteur disponible. Les informations importées sont préremplies. Le tuteur voit les propositions qui lui sont adressées dans **Missions proposées**, mais ne reçoit l’accès au dossier qu’après confirmation. Il peut refuser ; la responsable peut ensuite proposer à nouveau, ou annuler une proposition en attente. Les propositions ne réservent pas de place : la disponibilité et la capacité sont vérifiées lors de la réponse. Si une affectation est remplacée, les nouvelles informations sont appliquées à la confirmation. Une proposition peut être annulée pour en refaire une si le compte tuteur devient inactif.

## Fichiers dans la messagerie

L’icône trombone dans la messagerie flottante, le salon ou le canal du dossier permet de joindre un fichier (1 Mo maximum par message), avec ou sans texte. Les destinataires et la visibilité public/ciblé restent ceux du message ; cliquez sur le nom de fichier pour le télécharger. Les fichiers sont enregistrés localement dans le navigateur : l’espace disponible est limité et dépend du navigateur. La simulation ne transmet aucun fichier vers un serveur ou d’autres appareils. L’analyse Excel utilise ExcelJS, inclus localement ; sa licence est dans `vendor/EXCELJS-LICENSE`.
