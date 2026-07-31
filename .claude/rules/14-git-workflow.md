---
paths:
  - "**/*"
---

# Workflow Git

## 1. Objectif

L’historique Git doit permettre de comprendre :

- ce qui a changé ;
- pourquoi le changement existe ;
- comment il a été vérifié ;
- quel risque il introduit ;
- comment le retirer si nécessaire.

PRiMiE est une landing page : privilégier un workflow simple, des branches
courtes et des commits atomiques.

Ne pas introduire une organisation Git disproportionnée.

---

## 2. Autorité de Claude

Claude peut, dans le périmètre demandé :

- lire `git status`, `git diff`, `git log` et `git show` ;
- inspecter les branches et fichiers suivis ;
- préparer des modifications ;
- proposer une branche, un message de commit ou une description de pull request ;
- exécuter les tests nécessaires.

Sans demande explicite, Claude ne doit jamais :

- initialiser un dépôt ;
- créer ou changer de branche ;
- ajouter des fichiers à l’index ;
- créer, modifier ou supprimer un commit ;
- tirer ou pousser des changements ;
- fusionner ou rebaser ;
- créer un tag ou une release ;
- ouvrir, modifier ou fusionner une pull request ;
- déclencher un déploiement.

« Corrige », « développe » ou « ajoute » autorise la modification des fichiers,
pas la publication Git.

Une autorisation de commit n’autorise pas le push.

Une autorisation de push n’autorise pas le merge.

---

## 3. Préserver le travail existant

Avant toute modification, inspecter :

```bash
git status --short --branch
git diff --stat
git diff
```

Considérer toute modification existante comme appartenant à l’utilisatrice ou à
un autre travail en cours.

Règles :

- ne pas écraser une modification non liée ;
- ne pas reformater massivement des fichiers hors périmètre ;
- ne pas inclure des changements étrangers dans un commit ;
- signaler un chevauchement avant d’éditer la même zone ;
- conserver les fichiers non suivis inconnus ;
- ne pas utiliser un stash comme stockage caché sans autorisation.

Un dépôt sale n’est pas une permission de nettoyer.

---

## 4. Branche principale

La branche principale est `main`.

`main` doit rester :

- construisible ;
- testée ;
- déployable ;
- sans secret ;
- sans code temporaire ;
- fidèle au contenu validé.

Ne pas pousser directement sur `main` lorsqu’un dépôt distant et un workflow de
revue existent.

Utiliser une branche courte puis une pull request.

Ne pas créer de branche permanente `develop` pour la V1.

Elle ajoute du délai sans apporter de protection utile à ce projet.

---

## 5. Nommage des branches

Format :

```text
<type>/<description-courte-en-kebab-case>
```

Types autorisés :

| Type | Usage |
| --- | --- |
| `feat` | Nouvelle capacité visible |
| `fix` | Correction d’un défaut |
| `content` | Contenu métier validé |
| `design` | Évolution UI sans nouveau comportement |
| `a11y` | Accessibilité |
| `perf` | Performance |
| `seo` | Référencement |
| `test` | Tests et QA |
| `chore` | Maintenance ou outillage |

Exemples :

```text
feat/whatsapp-cta
design/gallery-mobile
fix/mobile-menu-focus
content/update-services
a11y/faq-keyboard
perf/optimize-hero-image
chore/update-dependencies
```

Éviter :

```text
new-branch
test
changes
fix-stuff
kyria-final-v2
```

Une branche couvre un objectif cohérent et doit vivre le moins longtemps
possible.

---

## 6. Commits conventionnels

Format :

```text
<type>(<scope>): <description>
```

Types :

| Type | Usage |
| --- | --- |
| `feat` | Fonctionnalité |
| `fix` | Correction |
| `docs` | Documentation ou gouvernance |
| `style` | Formatage sans changement fonctionnel |
| `refactor` | Restructuration sans nouvelle fonction |
| `perf` | Amélioration de performance |
| `test` | Tests |
| `build` | Build ou dépendances de production |
| `ci` | Intégration continue |
| `chore` | Maintenance |
| `revert` | Annulation d’un commit |

Scopes PRiMiE recommandés :

```text
ui, content, gallery, navigation, booking, seo, a11y, perf,
security, test, deps, config, rules
```

La description :

- utilise l’impératif ;
- commence en minuscule ;
- reste concise ;
- n’ajoute pas de point final ;
- décrit le résultat, pas l’outil utilisé.

Exemples :

```text
feat(booking): add WhatsApp reservation CTA
fix(navigation): restore focus after closing mobile menu
content(services): update validated hairstyle list
perf(gallery): reduce responsive image payload
test(a11y): cover open FAQ state with axe
docs(rules): add Git workflow governance
```

Ajouter un corps lorsque le « pourquoi » n’est pas évident.

Ne jamais inventer un ticket, un auteur ou une validation.

Un changement incompatible utilise `!` et un footer `BREAKING CHANGE:`.

---

## 7. Atomicité

Un commit doit représenter une seule intention.

Séparer, lorsque possible :

- refactor préparatoire ;
- changement fonctionnel ;
- mise à jour du contenu ;
- tests ;
- formatage massif ;
- mise à jour de dépendances.

Les tests directement liés à une fonctionnalité peuvent rester dans le même
commit pour préserver un état fonctionnel.

Un commit ne doit pas mélanger :

- correction mobile et nouveau contenu ;
- dépendance majeure et refonte graphique ;
- suppression de fichiers et optimisation sans rapport ;
- changements générés et modifications manuelles non liées.

Chaque commit doit idéalement passer lint, types, tests et build.

---

## 8. Indexation sélective

Préférer :

```bash
git add path/to/file
git add -p
```

Éviter `git add .`, `git add -A` ou l’ajout d’un dossier entier sans inspection.

Après indexation :

```bash
git status --short
git diff --cached --stat
git diff --cached
```

Vérifier que l’index ne contient pas :

- `.env` réel ;
- clé, token ou mot de passe ;
- fichier temporaire ;
- log ;
- rapport de test volumineux ;
- capture de débogage ;
- cache ;
- média privé ;
- modification sans rapport.

---

## 9. Contrôles avant commit

Exécuter selon le changement :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Pour un changement de parcours ou de rendu :

```bash
pnpm test:e2e
```

Puis vérifier :

- diff complet ;
- contenu métier exact ;
- téléphone et WhatsApp ;
- responsive ;
- accessibilité ;
- absence de secret ;
- absence d’erreur console ;
- lockfile cohérent ;
- aucun fichier généré inattendu.

Ne pas annoncer « tests passés » si une commande n’a pas été exécutée ou a
échoué.

---

## 10. Fichiers générés et lockfile

`pnpm-lock.yaml` est versionné lorsqu’il correspond à une modification
volontaire des dépendances.

Ne pas modifier manuellement le lockfile.

Lorsqu’un fichier généré change :

- identifier sa commande source ;
- confirmer qu’il doit être versionné ;
- éviter un diff causé par une autre version d’outil ;
- ne pas mélanger une régénération globale à un correctif sans rapport.

Ne pas committer :

```text
.next/
node_modules/
coverage/
playwright-report/
test-results/
*.log
.env*
```

Exception : conserver un `.env.example` sans valeur sensible.

---

## 11. Pull request

Une pull request reste petite et centrée sur un seul résultat.

Description minimale :

```md
## Résumé
- changement principal
- raison métier ou technique

## Validation
- [ ] lint
- [ ] typecheck
- [ ] tests
- [ ] build
- [ ] QA responsive/accessibilité si concernée

## Visuels
- avant/après pour tout changement UI visible

## Risques
- limite connue, migration ou suivi nécessaire
```

La description ne doit pas prétendre qu’une case est validée si le contrôle n’a
pas été réalisé.

La revue vérifie :

- le besoin ;
- le contenu ;
- la sécurité ;
- l’accessibilité ;
- le responsive ;
- la performance ;
- les tests ;
- la maintenabilité.

Claude peut effectuer une auto-revue technique, jamais simuler une validation
humaine.

---

## 12. Fusion

Pour les branches courtes de PRiMiE, privilégier le squash merge afin de garder
`main` lisible, sauf besoin explicite de préserver plusieurs commits autonomes.

Avant fusion :

- CI verte ;
- revue terminée ;
- conflits résolus ;
- contenu validé ;
- preview vérifiée si disponible ;
- aucun changement inattendu depuis la revue.

Supprimer la branche distante après fusion lorsque le dépôt le permet.

La fusion et la suppression de branche exigent une autorisation explicite.

---

## 13. Commandes destructives

Ne jamais exécuter sans demande explicite et cible vérifiée :

```bash
git reset --hard
git clean -fd
git clean -fdx
git restore .
git checkout -- .
git branch -D <branche>
git push --force
git push --force-with-lease
```

Préférer une solution réversible et limitée à un chemin précis.

Ne pas amender un commit partagé.

Ne pas réécrire un historique distant sans expliquer l’impact et obtenir
l’accord.

En cas de conflit :

- lire les deux versions ;
- préserver les intentions compatibles ;
- demander une décision si elles se contredisent ;
- ne jamais choisir automatiquement `ours` ou `theirs`.

---

## 14. Secrets dans Git

Le `.gitignore` doit protéger les fichiers d’environnement avant le premier
commit.

Si un secret apparaît dans un diff :

- arrêter l’indexation ;
- retirer la valeur du code ;
- utiliser une variable d’environnement appropriée ;
- vérifier qu’aucune autre copie n’existe.

Si le secret a été committé ou poussé :

1. le révoquer ou le faire tourner immédiatement ;
2. évaluer son utilisation ;
3. nettoyer l’historique avec une procédure approuvée ;
4. prévenir les personnes concernées ;
5. vérifier les clones, logs, CI et artefacts.

Réécrire l’historique ne rend pas un secret compromis à nouveau sûr.

---

## 15. Anti-patterns interdits

- Commit `update`, `changes`, `final` ou `fix stuff`.
- Branche longue avec plusieurs objectifs.
- Commit de centaines de fichiers sans explication.
- `git add .` sans inspection.
- Mélange de contenu inventé et correction technique.
- Snapshot mis à jour aveuglément.
- Lockfile supprimé pour résoudre un conflit.
- Tests désactivés pour obtenir une CI verte.
- Push direct sur `main` sans workflow validé.
- Force push pour contourner un conflit.
- Secret supprimé du dernier commit sans rotation.
- Co-auteur ou reviewer inventé.
- Commit, push, merge ou tag exécuté par Claude sans autorisation.

---

## 16. Definition of Done

Une modification Git est prête lorsque :

- le périmètre est cohérent ;
- les changements existants sont préservés ;
- le diff et l’index ont été inspectés ;
- le commit est atomique et correctement nommé ;
- aucun secret, cache ou fichier privé n’est inclus ;
- le lockfile correspond aux dépendances ;
- les validations pertinentes passent ;
- la pull request explique résultat, tests et risques ;
- les changements visibles disposent d’une preuve avant/après ;
- aucune action distante n’a été réalisée sans autorisation ;
- `main` reste déployable après fusion.

---

## 17. Références officielles

- Git — Documentation : https://git-scm.com/docs
- Conventional Commits 1.0.0 : https://www.conventionalcommits.org/fr/v1.0.0/
- Semantic Versioning : https://semver.org/lang/fr/
