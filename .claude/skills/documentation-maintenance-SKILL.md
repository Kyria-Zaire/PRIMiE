---
name: documentation-maintenance
description: Créer, mettre à jour, auditer, corriger, consolider, déprécier ou supprimer la documentation de PRiMiE. Utiliser cette skill pour README, guides, références, ADR, runbooks, CHANGELOG, commentaires, TSDoc, documentation produit ou technique, règles Cursor, CLAUDE.md, skills Claude, commandes, liens, sources de vérité, statut du projet, documentation obsolète, synchronisation code-docs et contrôle des contenus générés par IA.
---
# Documentation Maintenance PRiMiE
Maintenir une documentation courte, exacte et utile qui reflète la réalité du
produit. Documenter ce qui est durable et difficile à déduire, sans construire
une encyclopédie autour d’une landing page.

## 1. Charger le contexte
Avant toute action :
1. lire `CLAUDE.md` ;
2. lire `18-documentation.mdc`, `00-project.mdc`, `01-product-scope.mdc`,
   `16-ai-workflow.mdc` et `do-not-break.mdc` ;
3. lire les règles du domaine documenté ;
4. inspecter le code, `package.json`, `pnpm-lock.yaml` et les fichiers cités ;
5. rechercher les documents qui traitent déjà le même sujet ;
6. vérifier les décisions et preuves réellement disponibles ;
7. préserver le travail local inconnu.
Utiliser `rg --files` et `rg` pour localiser sources, doublons, liens, commandes,
statuts, TODO et références obsolètes.

## 2. Respecter le mode demandé
Distinguer :
- **création** : ajouter un document pour un besoin démontré ;
- **mise à jour** : synchroniser un document avec une réalité changée ;
- **audit** : relever les écarts sans modifier ;
- **consolidation** : fusionner les doublons autour d’une source canonique ;
- **correction** : réparer une erreur précise ;
- **dépréciation** : signaler un remplacement organisé ;
- **suppression** : retirer une documentation fausse ou inutile ;
- **migration** : déplacer ou renommer en conservant les références.
Une demande de documentation n’autorise pas une modification du produit, une
dépendance, un commit, un déploiement ou l’invention d’une décision.

## 3. Protéger les faits canoniques
Préserver exactement :

```text
Projet : PRiMiE
Marque : Chez PRiMiE Coiffure
Porteuse : Prisca
Activité : coiffure et beauté afro à domicile
Langue : français
Ton : élégant, chaleureux, rassurant et professionnel
Téléphone : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
La V1 reste une landing page unique sans compte, authentification, dashboard,
formulaire, calendrier, paiement, backend, CMS, chatbot ou tracking.
Conserver l’ordre officiel :
1. Header ;
2. Hero ;
3. Services ;
4. Galerie — Nos réalisations ;
5. Pourquoi me choisir ? ;
6. FAQ ;
7. Réserver ;
8. Contact ;
9. Footer.
« Avis clientes » : hors V1 (`TESTIMONIALS-CONTENT-01` = `CANCELLED`). Ne pas
créer de scaffolding Testimonials.

## 4. Appliquer le principe de proportion
Créer une documentation seulement si elle :
- répond à une question récurrente ;
- protège une décision importante ;
- décrit une procédure non évidente ;
- réduit un risque coûteux ;
- permet une reprise de maintenance ;
- définit une référence stable.
Ne pas créer :
- un document par composant ;
- un rapport permanent par petite tâche ;
- une page qui répète le code ;
- plusieurs documents pour la même décision ;
- une architecture future présentée comme actuelle.
Préférer un petit document maintenu à un grand document ignoré.

## 5. Choisir le type de documentation

| Type | Question principale | Exemple |
| --- | --- | --- |
| Tutoriel | Comment apprendre ? | prise en main |
| Guide | Comment accomplir ? | déployer une Preview |
| Référence | Quelle règle exacte ? | scripts ou variables |
| Explication | Pourquoi ce choix ? | architecture |
Séparer procédure et justification lorsque leur mélange ralentit l’usage.
Relier les documents au lieu de recopier leur contenu.

## 6. Cartographier les sources de vérité

| Information | Source principale |
| --- | --- |
| Identité et périmètre | `.cursor/rules/00-project.mdc` |
| Contenu affiché | `content/` et configuration centrale |
| Services | règle produit et données centrales |
| Architecture | `.cursor/rules/02-architecture.mdc` |
| Design tokens | règle design et code des tokens |
| Scripts | `package.json` |
| Dépendances | `package.json` et `pnpm-lock.yaml` |
| Workflow Git | `.cursor/rules/14-git-workflow.mdc` |
| Déploiement | `.cursor/rules/15-deployment.mdc` |
| Décisions majeures | ADR acceptés |
| Changements publiés | `CHANGELOG.md` s’il existe |
Le code reste la source du comportement exécutable. Une documentation secondaire
doit pointer vers la source principale.

## 7. Éviter les doublons
Avant d’ajouter une information :
1. rechercher son existence ;
2. identifier la source la plus légitime ;
3. mettre à jour cette source ;
4. remplacer les copies longues par des liens ;
5. vérifier les références affectées.
Si une répétition courte améliore réellement la lecture, nommer la source
canonique. Ne pas maintenir trois copies d’une commande, d’une couleur ou d’une
coordonnée.

## 8. Employer des statuts précis
Utiliser :

| Statut | Sens |
| --- | --- |
| `Proposé` | idée non validée |
| `Validé` | décision acceptée |
| `En cours` | implémentation active |
| `Implémenté` | présent dans le code |
| `Vérifié` | contrôles exécutés |
| `Déployé` | accessible dans l’environnement nommé |
| `Déprécié` | remplacement prévu |
| `Supprimé` | retiré |
Ne pas écrire « terminé », « sécurisé », « prêt pour la production » ou
« fonctionnel » sans critères, environnement et preuves.

## 9. Gérer le README racine
Utiliser `README.md` comme porte d’entrée. Y inclure seulement si pertinent :
1. nom et objectif ;
2. statut réel ;
3. stack installée ;
4. prérequis ;
5. installation ;
6. commandes ;
7. structure principale ;
8. variables sans secrets ;
9. tests ;
10. déploiement ou lien vers le guide ;
11. gouvernance IA ;
12. mainteneur confirmé.
Vérifier chaque élément dans le dépôt. Ne pas transformer le README en cahier
des charges, historique exhaustif ou inventaire de tous les composants.

## 10. Vérifier commandes et scripts
Pour chaque commande :
- confirmer son existence dans `package.json` ;
- utiliser `pnpm`, jamais `npm` ou `yarn` ;
- indiquer le répertoire si nécessaire ;
- préciser les prérequis ;
- éviter un effet destructif par défaut ;
- vérifier le résultat annoncé ;
- exclure tout secret.
Exemples à utiliser seulement s’ils existent :

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Tester les exemples lorsque possible. Sinon, écrire explicitement `Non vérifié`.

## 11. Documenter les variables d’environnement
Documenter :
- nom ;
- rôle ;
- environnement concerné ;
- caractère requis ou optionnel ;
- exemple factice non sensible ;
- comportement en cas d’absence.
Ne jamais inscrire valeur réelle, token, clé, mot de passe ou URL signée.
Conserver `.env*` hors versionnement selon les règles du projet.
Ne pas préfixer une variable sensible avec `NEXT_PUBLIC_`.

## 12. Documenter l’architecture actuelle
Décrire ce qui existe :
- Next.js 15 App Router ;
- TypeScript strict ;
- Tailwind CSS ;
- shadcn/ui si installé ;
- Framer Motion avec retenue ;
- Lucide ;
- `pnpm` ;
- Vercel ;
- Server Components par défaut ;
- frontière cliente minimale.
Vérifier les versions réelles. Distinguer clairement actuel, proposé et cible.
Ne pas dessiner un backend, un CMS ou un monorepo absent de la V1.

## 13. Créer un ADR seulement si nécessaire
Créer un ADR pour une décision :
- structurante ;
- difficile à inverser ;
- issue de plusieurs options crédibles ;
- utile aux futurs mainteneurs.
Emplacement :

```text
docs/decisions/
```
Nom :

```text
0001-use-next-app-router.md
```
Structure :

```md
# ADR 0001 — Titre
## Statut
## Contexte
## Décision
## Options considérées
## Conséquences
## Liens
```
Ne pas créer un ADR pour un espacement, une couleur ou une correction mineure.
Un ADR remplacé reste lisible et référence son successeur.

## 14. Maintenir les guides opérationnels
Pour déploiement, rollback, incident ou maintenance, inclure :
- objectif ;
- prérequis ;
- permissions ;
- environnement ;
- étapes ;
- validations ;
- critères d’arrêt ;
- retour arrière ;
- éléments à consigner.
Faire précéder une commande sensible d’une vérification de cible. Ne pas placer
de secret ou identifiant personnel dans un runbook.
Une procédure doit être exécutable par une personne qui n’a pas participé à sa
rédaction.

## 15. Maintenir le CHANGELOG
Créer `CHANGELOG.md` lorsque des versions identifiées commencent à être
publiées. Organiser par version et catégories :

```md
## [Unreleased]
### Added
### Changed
### Fixed
### Security
```
Pour une release, indiquer version, date `YYYY-MM-DD`, changements notables,
impact utilisateur et migration éventuelle.
Ne pas recopier automatiquement le journal Git. Exclure refactorisations internes
sans impact si elles n’aident pas les lectrices du changelog.

## 16. Maintenir la documentation IA
Répartir :

| Emplacement | Rôle |
| --- | --- |
| `.cursor/rules/` | règles Cursor ciblées |
| `CLAUDE.md` | contexte Claude global et concis |
| `.claude/rules/` | règles Claude ciblées |
| `.claude/skills/` | procédures réutilisables |
| `.claude/commands/` | commandes retenues |
Une règle doit être spécifique, vérifiable, concise, contextualisée et sans
contradiction. Ne pas recopier toutes les règles dans `CLAUDE.md`.
Lorsqu’une règle devient obsolète, proposer sa mise à jour. Ne pas la contourner
silencieusement.

## 17. Documenter le code avec retenue
Commenter :
- la raison d’un choix non évident ;
- une contrainte externe ;
- un compromis ;
- une règle métier difficile à déduire ;
- un comportement de sécurité ;
- un workaround avec condition de retrait.
Ne pas commenter :
- ce que la ligne fait littéralement ;
- une ancienne implémentation ;
- une hypothèse ;
- un TODO sans action ;
- une évidence compensant un nom médiocre.
Utiliser TSDoc pour une API partagée seulement si les types ne suffisent pas.

## 18. Écrire en Markdown
Utiliser GitHub Flavored Markdown :
- un seul titre `#` ;
- hiérarchie sans saut ;
- paragraphes courts ;
- listes pour éléments comparables ;
- tableaux pour correspondances exactes ;
- code inline pour chemins et identifiants ;
- blocs avec langage ;
- liens descriptifs ;
- lignes vides autour des structures ;
- aucun HTML si Markdown suffit.
Ne pas mettre chaque phrase en gras et ne pas multiplier les emojis.

## 19. Vérifier les liens
Préférer :
- lien relatif vers le dépôt ;
- URL officielle pour une source externe ;
- ancre précise et stable ;
- libellé décrivant la destination.
Après déplacement ou renommage :
1. chercher toutes les références ;
2. mettre à jour les liens entrants ;
3. vérifier casse et chemin ;
4. contrôler les ancres ;
5. supprimer les liens fictifs.
Une URL de recherche ou temporaire n’est pas une référence durable.

## 20. Synchroniser code et documentation
Mettre à jour la documentation dans le même changement lorsque :
- commande modifiée ;
- variable ajoutée ou supprimée ;
- architecture changée ;
- règle métier remplacée ;
- procédure de déploiement changée ;
- fichier déplacé ;
- fonctionnalité visible ajoutée ou retirée ;
- décision dépréciée ;
- dépendance importante remplacée.
Si un document devient faux, le corriger ou le supprimer. Ne pas ajouter une
seconde note contradictoire.

## 21. Auditer la documentation
Construire un inventaire :

```text
Fichier → public → objectif → source → statut → fraîcheur → action
```
Chercher :
- doublons ;
- commandes inexistantes ;
- versions erronées ;
- chemins cassés ;
- fonctionnalités futures au présent ;
- statuts sans preuve ;
- TODO orphelins ;
- références à des fichiers supprimés ;
- secrets ou données personnelles ;
- décisions contradictoires ;
- documents sans lecteur ni usage.
Ne pas juger l’exactitude sur le style : confronter chaque fait à sa source.

## 22. Classer les constats
Pour chaque écart, indiquer :
- emplacement ;
- affirmation ;
- source attendue ;
- preuve observée ;
- impact ;
- correction minimale ;
- niveau de confiance.
Prioriser :
1. secret ou donnée privée ;
2. instruction dangereuse ;
3. fait produit faux ;
4. commande ou procédure cassée ;
5. contradiction de gouvernance ;
6. lien cassé ;
7. redondance ;
8. style.
Ne pas corriger silencieusement une décision métier ambiguë.

## 23. Déprécier, archiver ou supprimer
Déprécier si le document reste utilisé pendant une migration. Indiquer le
remplacement et la condition de retrait.
Archiver seulement si l’historique possède une valeur réelle et si l’archive ne
risque pas d’être prise pour une règle active.
Supprimer si le document :
- est faux ;
- est remplacé ;
- duplique une source ;
- ne répond plus à un besoin ;
- décrit un état temporaire sans valeur historique.
Avant suppression, rechercher les liens entrants. Une suppression matérielle
doit rester dans le périmètre explicitement demandé.

## 24. Contrôler la documentation générée par IA
Vérifier :
- fichiers cités ;
- scripts ;
- versions ;
- fonctionnalités ;
- décisions ;
- liens ;
- résultats de tests ;
- noms et coordonnées.
Interdire :
- faux badge ;
- faux test ;
- faux endpoint ;
- faux domaine ;
- fausse capture ;
- faux contributeur ;
- licence inventée ;
- statut non prouvé.
Une formulation convaincante ne remplace jamais une preuve.

## 25. Protéger secrets et vie privée
Rechercher avant livraison :
- clés API ;
- tokens ;
- mots de passe ;
- cookies ;
- identifiants personnels ;
- chemins locaux sensibles ;
- URL signées ;
- captures contenant des données privées ;
- valeurs réelles de `.env`.
Utiliser des placeholders explicites. Ne pas copier une sortie de terminal brute
dans un document public sans la relire.

## 26. Vérifier le rendu
Lire le document rendu, pas uniquement le texte brut. Vérifier :
- titre unique ;
- hiérarchie ;
- listes ;
- tableaux ;
- blocs de code ;
- retours à la ligne ;
- liens ;
- lisibilité mobile ;
- longueur ;
- absence de HTML inutile.
Vérifier que copier une commande depuis le rendu ne produit aucun caractère
parasite.

## 27. Exécuter les contrôles pertinents
Selon le changement :

```bash
rg --files
rg 'pattern'
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Valider les skills avec l’outil prévu. Utiliser un vérificateur de liens s’il
existe déjà. Ne pas installer une dépendance sans autorisation.
Signaler ce qui a été exécuté, réussi, échoué ou non vérifié.

## 28. Définition de terminé
Une documentation est terminée lorsque :
- elle répond à un besoin identifié ;
- public et statut sont clairs ;
- faits, code et validations concordent ;
- informations métier sont confirmées ;
- commandes et chemins existent ;
- exemples sont testés ou marqués non vérifiés ;
- liens fonctionnent ;
- aucun secret ni donnée privée n’apparaît ;
- aucune autre source n’est dupliquée ;
- documents affectés sont synchronisés ;
- rendu Markdown est lisible ;
- retrait futur reste possible sans perdre la vérité canonique.

## 29. Interdictions absolues
Ne jamais :
- générer un README sans lire le dépôt ;
- annoncer une stack non installée ;
- citer une commande absente de `package.json` ;
- présenter une idée comme implémentée ;
- dupliquer une règle dans plusieurs fichiers ;
- inventer un fait métier ou légal ;
- fabriquer test, badge, endpoint, domaine ou contributeur ;
- copier une valeur secrète ;
- créer un ADR pour une décision mineure ;
- transformer le changelog en journal Git ;
- ajouter un lien fictif ;
- annoncer un contrôle non exécuté ;
- conserver un document faux pour l’historique ;
- créer une documentation future au présent ;
- contourner une règle obsolète sans la signaler ;
- déployer sans autorisation.
Dans le compte rendu, séparer documents créés, modifiés, consolidés, dépréciés ou
supprimés, sources vérifiées, commandes exécutées, liens, risques et éléments
non vérifiés.
