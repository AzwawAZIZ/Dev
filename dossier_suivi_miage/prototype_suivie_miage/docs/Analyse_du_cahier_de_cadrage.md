# Suivi MIAGE — Analyse du cahier de cadrage

**Source :** `mon_cahier_cadrage.pdf`, 27 pages, remis par l’utilisateur. Cette synthèse distingue les demandes exprimées, l’état du prototype et les décisions encore nécessaires. Les numéros de page renvoient aux pages du PDF. Elle ne remplace pas le cahier.

## 1. Vision et expérience commune

- Conserver la base visuelle du prototype et améliorer ses détails plutôt que tout reconstruire ; premier livrable souhaité : un prototype interactif validé par parcours complets avec les futurs utilisateurs (p. 23–24).
- Une interface moderne, institutionnelle et sérieuse, de densité équilibrée. Références : JobTeaser, Notion, Linear, Doctolib et DSFR. Palette indiquée : bleu marine `#002E5A`, bleu d’action `#16588B`, fond `#F4F7FB`, cartes blanches, vert `#1E8E5A`, ambre `#D99D48`, rouge `#C0392B` (p. 2–4).
- Même langage visuel pour tous ; repères spécifiques lorsqu’utiles, notamment M1/M2 et administration distincte mais cohérente. Logo et nom de l’université dans la navigation ; logo officiel à fournir (p. 2, 5, 13).
- Navigation latérale repliable, conçue d’abord pour ordinateur tout en restant utilisable sur téléphone. Fiches longues organisées en onglets ; présentation tableau/cartes au choix ; filtres repliables et avancés. Le cahier indique « pas de barre de recherche “Interdit” » : formulation à préciser avant suppression d’une recherche utile (p. 3).
- Thèmes clair et sombre au choix ; texte confortable ; animations discrètes ; langue française. Contrastes, navigation clavier, lecteurs d’écran et agrandissement du texte ; termes métier exacts avec aide contextuelle. États vides et erreurs explicites, orientés vers une action (p. 2–3).
- Les maquettes de référence privilégient les actions urgentes avant les indicateurs, les cartes d’étudiant avec prochaine étape, le dossier 360° à chronologie verticale et le circuit CRV à trois visas. Éviter les écrans surchargés de graphiques, tableaux trop denses et longs formulaires empilés (p. 25–27).

## 2. Administrateur technique

**Périmètre :** comptes, rôles, matrice, paramètres et journaux ; pas d’accès aux dossiers métier, salons projet, signalements, imports opérationnels, bascule, missions ou affectations. Aucune usurpation ni modification métier sensible (p. 5–7).

- Tableau synthétique avec historique ; comptes actifs/désactivés, changements de droits, connexions, métadonnées techniques et historique d’import sans détails étudiants. Alertes visuelles explicites (p. 5).
- Comptes : nom, e-mail, rôles, état, dernière connexion et création ; édition en volet latéral. Désactivation avec conséquences, motif et confirmation renforcée ; interdire la suppression du dernier administrateur actif (p. 5, 7).
- Matrice lecture / modification / validation / paramétrage : filtre par rôle, comparaison de deux rôles, cases non attribuables désactivées et expliquées. Les changements de droits passent par un aperçu, un motif obligatoire et une validation ; pas d’enregistrement immédiat (p. 5–7). Confirmer comment traiter les changements de rôle des comptes, eux aussi mentionnés dans la synthèse p. 7.
- Paramètres : délais CRA/CRV, visites et relances, capacités, autres limites configurables. Avant modification : ancien/nouveau, confirmation, motif et historique. Délégation au responsable stages seulement si autorisée par la matrice (p. 6).
- Messages directs : outil administratif **séparé**, recherche et filtres, consultation en lecture seule ; motif obligatoire et trace pour chaque conversation consultée, dans le respect des règles à valider avec l’établissement. L’admin ne doit pas apparaître comme participant à un salon (p. 6–7). Sa messagerie personnelle reste distincte de cet outil d’audit.
- Journaux filtrables par période, auteur, événement, compte et résultat ; export réservé à l’admin. Historique d’import : date, auteur, fichier, volumes et erreurs sans données métier détaillées. Durée et purge à valider avec le DPO ; une véritable immuabilité nécessite des garanties côté serveur (p. 6–7).

## 3. Responsable stages et alternances

- Page d’accueil centrée sur les urgences avant les graphiques : dossiers à affecter, missions en attente, accès entreprise et signalements (p. 8).
- Liste des étudiants en tableau avec aperçu latéral ; dossier 360° complet sur page dédiée. Dans le dossier : action urgente visible avant les onglets. Colonnes : étudiant/promotion, contrat/entreprise, tuteur/capacité, statut/prochaine action et alertes ; filtres croisés (p. 8–9).
- Import Excel/CSV en trois étapes : dépôt, contrôle/aperçu, validation/rapport. Montrer colonnes reconnues, créations, mises à jour, doublons et erreurs par ligne. Sur confirmation, appliquer les lignes valides et isoler/télécharger les lignes rejetées avec leurs motifs ; ne pas bloquer tout le fichier pour une seule erreur (p. 8–9).
- Mission : étudiant, entreprise, lieu, période, intitulé/description, tuteur et document associé. Recherche de tuteur avec disponibilité, capacité et suggestions à confirmer. Acceptation/refus avec motif obligatoire en cas de refus et possibilité de demander des précisions. Sur acceptation : affectation, notification, ouverture du salon si conditions remplies et conservation de l’ancien tuteur (p. 9).
- Bascule M1→M2 : décision individuelle ou sélection multiple, aperçu des conséquences, confirmation et historique ; tenir compte des redoublements/sorties et archives (p. 10).
- Signalements : liste priorisée et vue dossier ; prise en charge, qualification en rupture, note, clôture et transfert confidentiel à une personne habilitée. Visibilité par défaut : auteur et responsable, élargissement uniquement lors d’un transfert explicite (p. 10–11).
- Salon : ouverture selon affectations, fermeture manuelle avec motif et historique en lecture seule ; en cas de changement de contrat, éviter d’écraser l’historique (p. 10–11).
- Alertes sur absence de tuteur, CRA, visite, CRV, rupture ; actions de groupe après confirmation ; exports CSV, Excel et PDF. Séparer état administratif du contrat et jalons pédagogiques (p. 10–11).

## 4. Responsables de formation M1 et M2

- Scinder le rôle actuel en deux rôles distincts. Chacun a une liste nominative **limitée à sa promotion**, avec données structurelles uniquement, et peut comparer l’autre promotion sous forme agrégée/anonymisée. Pas de consultation des contenus CRA/CRV ni des salons projet (règle RG-10, p. 11–14).
- Même architecture avec repère distinctif. Onglets synthèse, cohorte, analyses ; cartes, graphiques avec légendes et définitions de calcul, tableau filtrable ; filtres année, contrat, statut, entreprise/ville, tuteur. Alertes sur seuils agrégés et exports autorisés (p. 12–13).
- M1 : être informé des décisions et pouvoir proposer une décision de passage à un responsable habilité, sans effectuer la gestion opérationnelle de bascule (p. 12).
- M2 : suivi agrégé de fin de parcours, visites réalisées et CRV clôturés avant jury ; sans accès au texte du bilan (p. 13–14).
- Le PDF mentionne l’accès au tableau et l’export de « certains documents » sans les lister ; préciser les données et documents autorisés, en respectant RG-10 (p. 14).
- La communication directe des responsables de formation doit rester traitée séparément des salons de dossier ; voir l’arbitrage ci-dessous (p. 12–14, 21–22).

## 5. Tuteur universitaire

- Périmètre limité à ses étudiants affectés. Accueil : tâches prioritaires puis cartes d’étudiants, sans graphiques macro superflus. Capacité/disponibilité directement sur l’accueil, profil et missions (p. 15–17).
- Proposition de mission avec détails, capacité et historique ; confirmation avant acceptation, motif obligatoire en cas de refus et demande de précisions (p. 15–16).
- Demander un CRA depuis dossier ou liste étudiant, avec consignes, période, date souhaitée et modèle réutilisable. CRA reçu : notification, état lu/non lu, réponse et statut de validation à définir (p. 16).
- Visites : demande, une ou deux propositions de l’étudiant, confirmation ou autre créneau, lieu/modalité ; chronologie, liste et calendrier mensuel (p. 16).
- Chronologie verticale unique, événements les plus récents en haut, cartes dépliables et liens vers les actions : demandes/dépôts CRA, demandes/propositions/confirmations/visites réalisées, CRV et visas (p. 16, 26).
- CRV enrichi et structuré avec pièces jointes ; visas dans l’ordre tuteur → entreprise → étudiant. Afficher progression, acteur attendu, historique, désaccords et échéance. En cas de désaccord : prévenir le responsable, bloquer les visas et afficher l’arbitrage ; possibilité d’une délégation temporaire de rectification au maître de stage, sur décision du tuteur, avec version initiale conservée et visas réinitialisés (p. 16–17, 26–27).

## 6. Maître de stage / tuteur en entreprise

- Un rôle technique unique, libellé adapté au contrat ; accès aux seuls stagiaires affectés, à la synthèse du dossier, aux visites et au CRV, pas aux CRA académiques sauf partage explicite à définir (p. 17–18).
- Accueil simple et guidé centré sur actions en attente puis cartes des stagiaires ; fiche à onglets et chronologie. Informations personnelles modifiables, mais pas de modification libre des éléments contractuels (p. 18–19).
- Participation à la visite : consulter les propositions, recevoir confirmation, préciser disponibilité, proposer lieu/créneau si autorisé. CRV : lecture, amendement séparé, visa après tuteur, signalement d’un désaccord et rectification seulement après autorisation explicite (p. 18–19).
- Notifications internes et vrais e-mails dans la version future ; salon ciblé par acteurs habilités, pièces jointes ; signalement guidé avec suivi et pièce jointe ; aide à la première connexion (p. 18–19).
- L’annuaire et la messagerie externe sont limités dans le cahier (p. 17–19, 21–22), mais cette demande contredit une instruction antérieure : ne pas modifier le périmètre avant arbitrage explicite.

## 7. Étudiant

- Accueil unifié : résumé du contrat, prochaine action, messages/notifications et chronologie ; design visuel, rassurant et simple (p. 19–21).
- Chronologie du plus récent au plus ancien : demandes du tuteur, CRA envoyés, visites demandées/proposées/confirmées, CRV et visas. Distinguer les événements par icône, libellé et statut — pas uniquement par la couleur (p. 20–21).
- CRA avec période, texte, modèle structuré, pièce jointe et brouillon. Quand une demande existe, proposer son rattachement puis laisser l’étudiant confirmer ou choisir un envoi spontané. Envois spontanés de CRA et de visites conservés (p. 20–21).
- Calendrier pour une ou deux dates de visite et lieu/modalité. Déclaration du maître de stage et de l’entreprise ; suivi et correction tant que la demande d’accès n’est pas traitée (p. 19–20).
- Notifications et futurs e-mails/rappels ; dernier visa du CRV après ceux du tuteur et de l’entreprise, avec possibilité de désaccord (p. 20–21).

## 8. Technique et exploitation future

- L’objectif de production inclut authentification e-mail/mot de passe et invitation ; éventuel SSO ultérieur à valider avec l’établissement. Les règles d’accès doivent être vérifiées **côté serveur pour chaque requête**, avec révocation effective, données minimales et audit (p. 21–23).
- Hébergement envisagé sur l’infrastructure du département MIAGE ; relais SMTP ; import Excel/CSV ; export calendrier `.ics` ; conservation pluriannuelle, archivage et sauvegarde/restauration. Synchronisation au SI central non exigée en V1 dans le cahier (p. 21–23).
- Vrais e-mails, relances et notifications périodiques, avec délais paramétrables. Fichiers PDF, Word/Excel et images ; taille maximale, contrôles et conservation à définir. Validation DPO et modalités d’exploitation indispensables avant données réelles (p. 22–24).
- Points explicitement ouverts : modélisation des ruptures suivies d’un nouveau contrat, suivi/alerte de période d’essai, taille des pièces jointes, sauvegardes et rétention légale des journaux (p. 24).

## 9. État actuel du prototype — écarts principaux

| Sujet | Présent aujourd’hui | Écart ou limite |
|---|---|---|
| Admin et droits | Espace admin limité, matrice à quatre actions, pas d’usurpation, journaux locaux | Pas d’aperçu/motif avant changement de droit ; consultation des messages directs non isolée par conversation/motif ; garanties serveur absentes |
| Missions et affectations | Proposition, disponibilité, capacité, acceptation/refus | Motif obligatoire, demande de précisions, document de mission et historique complet à renforcer |
| Imports | CSV/XLSX, contrôles, historique | Import actuel « tout ou rien » ; assistant et import partiel confirmé à concevoir |
| Formation | Tableau de bord partagé « responsable de formation » | Séparer M1/M2, limiter leurs données nominatives et ajouter comparatifs agrégés |
| Chronologie | Demandes CRA/visites, dépôts et réponses liés ou spontanés, regroupés dans la vue d’ensemble du dossier | Étendre aux confirmations, réalisations, CRV/visas ; cartes dépliables et accueil étudiant |
| CRV | Bilan, amendement, désaccord, ordre des trois visas | Modèle structuré et révision déléguée versionnée avec réinitialisation à concevoir |
| Production | Prototype local avec `localStorage`, fichiers et notifications simulés | Pas de serveur sécurisé, vrai SMTP, relances, stockage partagé ni hébergement de production |

Certaines critiques du cahier décrivent une version plus ancienne : le prototype actuel n’autorise plus l’usurpation et permet déjà au tuteur de demander un CRA ou une visite. Elles restent des exigences de non-régression.

## 10. Ordre de travail proposé

1. **Socle UX et rôles :** navigation, priorités des accueils, thème/contraste, périmètres et séparation M1/M2 ; valider les maquettes et le conflit sur la messagerie.
2. **Parcours pédagogiques :** chronologie complète, CRA et brouillons, visites, CRV structuré et délégation versionnée ; tests par rôle.
3. **Pilotage opérationnel et administration :** imports partiels contrôlés, affectations, signalements, historique, matrice avec aperçu/motif et audit des messages.
4. **Préparation à une production réelle :** architecture serveur, authentification et autorisation, fichiers, audit, notifications SMTP, archivage, validation de sécurité, accessibilité et DPO.

Cet ordre est une proposition, pas une déclaration que ces étapes sont déjà réalisées. La mise en production exige des choix et une validation de l’établissement.

## 11. Décisions à clarifier

1. **Messagerie directe :** instruction antérieure « toutes les personnes peuvent communiquer entre elles par adresse e-mail » ; le cahier demande désormais une restriction aux acteurs d’un même dossier ou à l’équipe pédagogique interne, en particulier pour l’entreprise (p. 17–19 et 21–22). Quelle règle remplace l’autre ? L’option retenue pour les messages directs ne change pas automatiquement les salons de dossier.
2. **Responsables M1/M2 :** préciser les colonnes et les « documents » exportables : le cahier donne une liste nominative limitée tout en excluant les contenus CRA/CRV et salons (p. 12–14).
3. **Bilan en désaccord :** définir qui déclenche/retire la délégation temporaire, quelles modifications sont permises, le nombre de versions et la reprise exacte du circuit de visas (p. 17–18).
4. **Données et exploitation :** tailles de fichiers, durée de conservation, règles de purge et sauvegardes ; valider avec le DPO et l’équipe d’infrastructure (p. 22–24).
5. **Période d’essai et nouvelle mission après rupture :** règles de calcul et modélisation du cycle à définir (p. 24).
