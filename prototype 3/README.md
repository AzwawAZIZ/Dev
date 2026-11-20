# Suivi MIAGE — prototype 3

Ouvrir `index.html` dans un navigateur moderne ou lancer depuis ce dossier `python3 -m http.server 8000`, puis ouvrir l’adresse affichée. Aucun serveur applicatif ni installation n’est nécessaire.

La démonstration s’ouvre sur le tableau de bord de Sarah, responsable stages & alternances. Le même tableau de bord analytique est également disponible pour Alex Laurent (tuteur universitaire) et Nadia Perrin (responsable de formation). Le tuteur ne voit que ses étudiants affectés, y compris dans les graphiques et les exports ; la coordinatrice voit la promotion entière. Les filtres, la recherche, le tri, l’impression et le CSV portent sur la sélection affichée. Le bouton **Guide démo / Switch** permet de changer de rôle et d’acteur. Après déconnexion, les comptes sont accessibles via leur adresse de démonstration et le mot de passe initial `demo`. Le guide contient aussi **Réinitialiser la démo**. Les données et pièces jointes (1 Mo maximum chacune) sont conservées dans le `localStorage` du navigateur, sur l’origine utilisée. Le prototype 3 reprend le prototype 2 et ajoute les disponibilités des tuteurs et les salons de projet, en plus de la messagerie flottante. Il utilise sa propre clé de stockage : il ne modifie ni ne reprend automatiquement les données des autres prototypes.

Pour tester une création d’accès : choisir Noé, déclarer un maître de stage, puis choisir Sarah en coordinatrice et créer l’accès depuis **Accès & demandes**. Le nouveau compte devient sélectionnable dans le guide et sur l’écran de connexion. Pour tester le circuit de visas : Camille dépose un CRA et propose une visite ; Alex confirme et rédige puis vise le bilan ; Marie ajoute un amendement et vise ; Camille appose le troisième visa. Un désaccord peut être arbitré par Sarah.

**Sécurité :** prototype exclusivement local, avec données fictives. L’authentification et les rôles sont simulés côté navigateur ; `localStorage` est accessible à toute personne ayant accès au navigateur et ne constitue pas une protection. Aucun e-mail, service d’authentification, stockage serveur ou relance automatique n’est fourni. L’impression du tableau de bord peut être enregistrée en PDF via le navigateur. L’import CSV accepte des valeurs simples séparées par des points-virgules, sans point-virgule dans les champs.

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

Le tuteur universitaire indique dans **Mes disponibilités** s’il accepte de nouveaux étudiants. Le responsable stages voit ce statut, la charge et les places restantes dans **Affectations**. Une nouvelle affectation est bloquée si le tuteur n’est pas disponible ou si sa capacité est atteinte ; les dossiers déjà affectés restent suivis même si le tuteur devient indisponible. Les trois tuteurs initiaux sont déclarés disponibles ; un nouveau tuteur doit déclarer sa disponibilité.

L’étudiant déclare son maître de stage depuis son profil ou son dossier. Le responsable crée ensuite son accès dans **Accès & demandes**, ce qui le relie au dossier. Quand un tuteur et un maître de stage disposant de comptes actifs sont tous deux affectés, le **Salon du projet** s’ouvre pour les acteurs concernés. Il reprend les messages du dossier : **général** est partagé avec les acteurs du projet ; **messages ciblés** ne montre que les échanges autorisés par les destinataires. Le responsable de formation ne voit pas les salons.

Pour essayer : choisissez Noé, déclarez un maître de stage fictif, puis utilisez Sarah en rôle tuteur pour modifier sa disponibilité et en rôle responsable pour affecter Noé et créer l’accès. Changez ensuite d’acteur avec le guide pour vérifier le salon. Ce salon est une interface inspirée des espaces de discussion : il ne se connecte pas à Discord et ne synchronise pas les échanges entre navigateurs.
