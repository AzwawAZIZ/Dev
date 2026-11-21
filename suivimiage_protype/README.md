# Suivi MIAGE — Pro Max

Prototype autonome reprenant les tableaux de bord, dossiers, missions, disponibilités, visites, CRA/CRV, imports et messageries des versions précédentes. Depuis ce dossier, lancez `python3 -m http.server 8004` ou ouvrez `index.html` dans un navigateur moderne. La version utilise sa propre clé de stockage et ne reprend pas automatiquement les données des autres prototypes.

## Connexion et espace administrateur

Le compte de démonstration administrateur est **admin@demo.miage.fr**, mot de passe initial **demo**. Les comptes fictifs `sarah@demo.miage.fr`, `laurent@demo.miage.fr`, `camille@demo.miage.fr`, `dubois@demo.miage.fr` et `nadia@demo.miage.fr` utilisent aussi le mot de passe initial `demo`. Un utilisateur peut sélectionner uniquement les rôles de son compte. Pour changer de personne, il faut se déconnecter et se reconnecter. L’administrateur ne peut pas agir pour un autre compte.

L’espace de travail administrateur contient le tableau de bord administratif, **Comptes et rôles**, **Matrice des droits**, **Paramétrage**, le **Journal d’activité**, le **Journal des connexions** et l’**Historique des imports**. La messagerie par adresse reste accessible comme outil personnel, avec consultation des messages directs entre comptes, sans accès aux salons de dossier. Cette consultation est journalisée ; l’administrateur ne peut envoyer qu’en son propre nom.

L’administrateur n’a pas accès aux dossiers, salons, signalements, imports opérationnels, bascule, affectations ou missions ; il ne peut pas en modifier ou valider les données. Il gère les comptes et droits, les paramètres et les journaux, en son nom. Pour éviter l’autoélévation, il ne peut pas modifier ses propres rôles et le rôle administrateur ne peut pas être combiné avec un rôle métier. La création d’un compte étudiant ne crée pas son dossier métier : la responsable le crée ensuite par import. Le profil administrateur peut modifier ses seules données personnelles.

## Matrice des droits et périmètres

La matrice énumère les 20 fonctionnalités de cette version, pour chaque rôle, avec quatre actions distinctes : **Lecture**, **Modification**, **Validation**, **Paramétrage**. La lecture est nécessaire avant toute autre action ; la retirer retire aussi les autres droits associés. Les cases impossibles à attribuer sont marquées `—`. Les droits fixes de l’administrateur ne peuvent pas être étendus aux opérations métier dans la matrice.

Les plafonds métier s’appliquent même si une autorisation est demandée :

- La responsable stages gère les dossiers, accès et propositions ; elle peut valider l’import, la bascule et la clôture des signalements. La configuration des paramètres peut lui être explicitement déléguée.
- Le tuteur consulte ses dossiers et propositions, peut répondre aux CRA, rédiger le bilan et valider la prise en charge, les visites et ses visas ; il ne crée pas les missions.
- L’étudiant consulte son dossier, déclare son maître de stage, dépose des CRA, propose une visite et vise son bilan ; le maître de stage suit ses stagiaires, peut contribuer au bilan et le viser.
- La responsable de formation consulte les indicateurs de sa promotion ; elle ne reçoit pas les dossiers individuels ni les canaux de dossier par défaut.
- Les canaux de dossier sont liés aux acteurs affectés. Leur ouverture et fermeture relèvent ici de la responsable stages, et non de l’administrateur. La messagerie par adresse reste disponible aux comptes autorisés.

La matrice peut **restreindre** ces plafonds, mais pas les élargir. Les affectations, les acteurs du dossier, l’ordre des visas, les places et disponibilités restent des conditions supplémentaires. Pour appliquer un import, la responsable doit disposer à la fois de la modification (préparation) et de la validation (application). Un changement de droits ou une désactivation est propagé aux autres onglets de la même origine ; cela ne constitue pas une sécurité serveur ni une synchronisation entre appareils.

## Chronologie du dossier

La vue d’ensemble du dossier présente une chronologie verticale des demandes de CRA ou de visite du tuteur et des CRA ou propositions de dates envoyés par l’étudiant. Le tuteur affecté crée ses demandes depuis les onglets **Synthèses CRA** et **Visites** ; il peut ajouter des précisions et une date souhaitée. Une demande d’autre créneau produit aussi un événement. L’étudiant reçoit une notification locale et peut envoyer spontanément ou sélectionner une demande en attente dans le formulaire pour y répondre. Une seule demande est liée à chaque envoi : les autres restent en attente. Les événements anciens sans date d’envoi enregistrée restent visibles sans date inventée. Les droits de lecture et d’action de la matrice et le périmètre du dossier s’appliquent également à la chronologie.

## Communication et suivi

La **Messagerie par e-mail** permet de contacter un compte actif de la plateforme par son adresse, quel que soit son rôle. Les messages et pièces jointes (1 Mo par fichier) sont visibles par l’expéditeur, le destinataire et, en consultation administrative, l’administrateur. Cette fonction est distincte des salons de dossier ; **aucun véritable e-mail n’est envoyé**.

Les journaux locaux retracent les connexions réussies ou échouées, déconnexions, changements de rôle, états des comptes, modifications de droits et paramètres, et autres actions enregistrées. L’historique des imports indique la date, l’auteur, le fichier, les créations, mises à jour, rejets et erreurs détectées. Un import erroné est rejeté en entier.

## Import Excel

La responsable autorisée peut importer un `.xlsx` (première feuille) ou un CSV UTF-8 séparé par des points-virgules, de 2 Mo et 500 lignes maximum. Colonnes obligatoires : `nom`, `email`, `promotion` (M1 ou M2). Facultatives : `prenom`, `contrat`, `entreprise`, `ville`, `adresse`, `mission`, `date_debut`, `date_fin`. Pour les dates CSV utilisez `AAAA-MM-JJ`.

```csv
nom;email;promotion;contrat;entreprise;ville;adresse;mission;date_debut;date_fin
Zoé Exemple;zoe@example.fr;M1;Alternance;Entreprise fictive;Lyon;1 rue Exemple;"Analyse; développement";2027-02-01;2027-08-01
```

Le lecteur ExcelJS est inclus localement ; voir `vendor/EXCELJS-LICENSE`.

## Limites de sécurité et tests

**Démonstration locale avec données fictives uniquement.** Comptes, permissions, journaux, fichiers et messages restent accessibles et modifiables depuis le navigateur. Les contrôles ne remplacent pas une authentification, des vérifications d’autorisation, une base de données, des fichiers sécurisés et des journaux protégés côté serveur. Aucun e-mail, service applicatif, partage entre appareils ou relance automatique n’est fourni. N’utilisez pas de vraies données ni de vrais mots de passe. La capacité de stockage dépend du navigateur.

Avec Node.js et Playwright installés, lancez le serveur HTTP puis `npm test`. Une autre adresse peut être fournie par `MIAGE_URL`. Les tests couvrent notamment les parcours métier, l’espace administrateur restreint, la matrice, les validations refusées, la confidentialité, les imports et la propagation des droits entre onglets.
