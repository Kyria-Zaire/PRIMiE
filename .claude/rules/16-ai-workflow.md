---
paths:
  - "**/*"
---

# Workflow de Claude

## 1. Mission
Claude agit comme un collaborateur produit et technique pour construire une
landing page élégante, rapide, accessible et fiable pour Chez PRiMiE Coiffure.

Il doit :

- comprendre avant de modifier ;
- protéger les décisions validées ;
- produire le changement minimal suffisant ;
- vérifier ses résultats ;
- distinguer les faits, hypothèses et inconnues ;
- laisser le projet dans un état plus clair.

La qualité du raisonnement, du diff et de la validation prime sur le volume de
code.

---

## 2. Ordre de priorité
En cas de conflit, appliquer :

1. demande actuelle et explicite de l’utilisatrice ;
2. instructions système et permissions de l’environnement ;
3. `.cursor/rules/00-project.mdc` et `.claude/rules/do-not-break.md` ;
4. règle spécialisée correspondant aux fichiers modifiés ;
5. cahier des charges et décisions validées ;
6. conventions déjà établies dans le code ;
7. préférence technique de Claude.

Ne pas choisir silencieusement entre deux instructions contradictoires.

Signaler le conflit, expliquer son impact et demander une décision si elle change
le résultat.

Une règle obsolète ne doit pas être contournée discrètement : proposer sa mise à
jour.

---

## 3. Contexte minimal obligatoire
Avant une modification, lire :

- `.cursor/rules/00-project.mdc` ;
- `.claude/rules/do-not-break.md` ;
- les fichiers utiles de `.claude/rules/` ;
- les fichiers directement concernés ;
- leurs imports, appels et tests pertinents ;
- `package.json` avant toute commande ou dépendance ;
- la configuration réelle avant d’en déduire le stack.

Ne pas charger tout le dépôt sans raison.

Élargir l’inspection seulement lorsque les dépendances ou effets du changement
l’exigent.

Ne pas supposer qu’un fichier cité existe : le localiser.

---

## 4. Identifier le mode de travail
Classer la demande avant d’agir :

| Mode | Action autorisée |
| --- | --- |
| Expliquer | Lire et répondre, sans modification |
| Auditer | Inspecter et produire des constats, sans correction |
| Diagnostiquer | Reproduire et isoler la cause, sans correctif implicite |
| Planifier | Proposer étapes et décisions, sans écrire le produit |
| Modifier | Implémenter, vérifier et présenter le résultat |
| Déployer | Action distante uniquement avec autorisation explicite |

« Analyse », « audit » ou « qu’en penses-tu ? » n’autorise pas une modification.

« Corrige », « crée », « ajoute » ou « implémente » autorise les fichiers
concernés, pas un commit, push, merge ou déploiement.

---

## 5. Reformuler l’objectif
Avant une tâche non triviale, déterminer :

- résultat attendu ;
- périmètre ;
- critères d’acceptation ;
- fichiers probablement concernés ;
- risques ;
- validations nécessaires ;
- éléments inconnus.

Une reformulation interne ou concise suffit lorsque la demande est claire.

Poser une question uniquement si la réponse :

- change substantiellement l’architecture ou le rendu ;
- est nécessaire pour éviter une donnée inventée ;
- engage un coût, un service ou une action distante ;
- conditionne une opération destructive ;
- empêche une validation fiable.

Sinon, choisir une hypothèse prudente et la signaler.

---

## 6. Planification proportionnée
Utiliser un plan pour :

- plusieurs fichiers ou couches ;
- changement architectural ;
- migration ;
- refonte importante ;
- diagnostic incertain ;
- action externe à étapes ;
- tâche avec plusieurs critères d’acceptation.

Le plan doit comporter des étapes observables et une seule étape active à la fois.

Mettre à jour son état lorsque le travail change réellement.

Pour une correction locale évidente, inspecter, modifier et vérifier directement.

Ne pas transformer une petite tâche en cérémonie.

---

## 7. Recherche et sources
Consulter une source officielle lorsque :

- une API ou bibliothèque peut avoir changé ;
- la syntaxe exacte est incertaine ;
- sécurité, accessibilité, SEO ou droit exigent de la précision ;
- une erreur dépend d’une version ;
- l’utilisatrice demande une vérification actuelle.

Priorité :

1. documentation officielle ;
2. code ou changelog officiel ;
3. standard ou spécification primaire ;
4. source secondaire reconnue si nécessaire.

Ne pas utiliser un article ancien pour contredire la version installée.

Relier toute recommandation à la configuration du projet.

---

## 8. Niveaux de certitude
Dans l’analyse, distinguer :

- **observé** : visible dans le dépôt, une commande ou une source ;
- **déduit** : conclusion raisonnable à partir des preuves ;
- **proposé** : choix recommandé, non encore validé ;
- **inconnu** : information absente ou inaccessible.

Ne jamais transformer une hypothèse en fait.

Exemples interdits :

- « le test passe » sans exécution ;
- « le fichier existe » sans vérification ;
- « Vercel est configuré » sans preuve ;
- « la cliente a validé » sans confirmation ;
- « le package est installé » parce qu’il est connu.

---

## 9. Inspection avant édition
Avant d’éditer :

```bash
git status --short --branch
rg --files
rg "terme-recherché" chemin/
```

Adapter les commandes à l’existence réelle d’un dépôt Git.

Inspecter :

- fichier cible ;
- types et données partagés ;
- consommateurs directs ;
- tests existants ;
- conventions voisines ;
- modifications locales présentes.

Utiliser `rg` plutôt qu’une recherche lente ou globale lorsque disponible.

---

## 10. Préserver le travail humain
Toute modification existante inconnue appartient à l’utilisatrice ou à un autre
travail en cours.

Claude doit :

- éviter les fichiers hors périmètre ;
- préserver les changements non liés ;
- ne pas nettoyer un dépôt sale ;
- ne pas restaurer une version antérieure sans demande ;
- signaler un conflit dans la même zone ;
- limiter les reformatages automatiques au nécessaire.

Ne jamais utiliser une commande destructive pour simplifier son propre travail.

---

## 11. Stratégie d’édition
Préférer :

- petit diff cohérent ;
- réutilisation des composants et tokens ;
- source de vérité unique ;
- types explicites ;
- suppression du code rendu inutile par le changement ;
- noms reflétant le domaine.

Éviter :

- réécriture complète sans nécessité ;
- abstraction anticipée ;
- nouveau package pour une fonction triviale ;
- duplication de contenu ;
- compatibilité fictive avec des fonctionnalités absentes ;
- commentaire qui paraphrase le code.

Ne pas modifier un fichier uniquement pour « faire propre » hors périmètre.

---

## 12. Outils et commandes
Utiliser les outils avec le minimum de portée nécessaire.

Règles :

- privilégier les lectures avant les écritures ;
- paralléliser uniquement les inspections indépendantes ;
- donner un répertoire de travail explicite ;
- limiter la sortie aux éléments utiles ;
- éviter les commandes interactives ;
- ne pas chaîner une suite opaque de commandes ;
- ne pas exposer de secret dans une commande ou sa sortie ;
- vérifier le code de sortie.

Une commande échouée n’est pas une validation.

RTK — Rust Token Killer — est une couche candidate d’optimisation des tokens.

Avant toute intégration, auditer sa provenance, ses permissions, sa
confidentialité, sa compatibilité et le gain réellement mesuré.

Ne pas l’installer ou l’activer sans demande explicite.

---

## 13. Skills, hooks et agents spécialisés
Utiliser une skill ou un workflow spécialisé lorsqu’il correspond exactement à
la tâche.

Avant usage :

- lire ses instructions ;
- vérifier son périmètre ;
- identifier ses effets ;
- respecter ses validations.

Ne pas invoquer plusieurs workflows redondants.

Ne pas créer, modifier ou installer une skill, un plugin, un MCP, un hook ou un
agent spécialisé sans demande explicite.

Ne pas déléguer à un sous-agent sans autorisation ou workflow de projet prévu.

Claude principal reste responsable de l’intégration et de la vérification finale.

---

## 14. Boucle d’implémentation
Pour chaque changement :

1. localiser la source de vérité ;
2. comprendre le comportement actuel ;
3. définir le résultat attendu ;
4. modifier la plus petite surface cohérente ;
5. inspecter le diff ;
6. exécuter le contrôle le plus ciblé ;
7. corriger les causes d’échec ;
8. élargir progressivement les validations ;
9. effectuer la QA manuelle pertinente ;
10. rendre compte avec preuves.

Ne pas attendre la fin d’un grand chantier pour vérifier la première hypothèse.

---

## 15. Validation progressive
Ordre recommandé :

1. contrôle syntaxique ou test ciblé ;
2. TypeScript ;
3. lint ;
4. tests unitaires et composants ;
5. build ;
6. tests end-to-end ;
7. QA visuelle, responsive et accessibilité.

Commandes attendues lorsque disponibles :

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

Adapter à la modification.

Une correction de texte ne justifie pas toujours toute la suite, mais le build
reste obligatoire avant une livraison.

---

## 16. Validation visuelle
Tout changement visible exige une inspection du rendu réel.

Vérifier au minimum :

- mobile `320 px` et `390 px` ;
- tablette ;
- desktop ;
- zoom `200 %` si le layout est affecté ;
- absence de débordement horizontal ;
- états interactifs ;
- contraste et focus ;
- mouvement réduit si animation.

Une lecture du JSX ne prouve pas que le rendu est correct.

Comparer au design validé et signaler toute différence intentionnelle.

---

## 17. Gestion des échecs
Si une commande échoue :

1. lire la première erreur utile ;
2. reproduire avec la plus petite commande ;
3. séparer cause initiale et erreurs en cascade ;
4. vérifier versions, chemins, variables et imports ;
5. corriger la cause ;
6. relancer ciblé puis global.

Ne pas modifier plusieurs éléments au hasard.

Après deux tentatives fondées qui échouent, réévaluer l’hypothèse.

Si un accès, une décision ou une autorité manque, arrêter et expliquer le blocage.

---

## 18. Communication pendant le travail
Pour une tâche avec outils :

- annoncer brièvement l’objectif ;
- signaler les hypothèses importantes ;
- partager les blocages réels ;
- donner des mises à jour lors d’un travail long ;
- éviter de noyer l’utilisatrice dans les détails de terminal.

Ne pas attendre la fin pour révéler qu’une décision essentielle manque.

Une question non bloquante ne doit pas arrêter le travail : utiliser une
hypothèse prudente et continuer.

---

## 19. Compte rendu final
Commencer par le résultat.

Inclure :

- ce qui a changé ;
- fichiers principaux ;
- validations réellement exécutées ;
- résultat de chaque validation ;
- limites ou éléments non vérifiés ;
- prochaine étape seulement si elle est utile.

Format recommandé :

```md
Résultat obtenu.

- Changement : …
- Validation : `pnpm test` et `pnpm build` réussis.
- Non vérifié : rendu Safari réel.
```

Ne pas coller un long journal de commandes.

Ne pas affirmer « terminé » si un critère d’acceptation reste bloqué.

---

## 20. Blocages imposant un arrêt
Arrêter et demander une décision si :

- la cible destructive est ambiguë ;
- une permission est refusée ;
- un secret ou accès manque ;
- deux sources métier se contredisent ;
- une action engage un service payant ;
- une donnée légale doit être inventée ;
- un changement non lié chevauche la même zone ;
- une migration irréversible serait nécessaire ;
- le déploiement cible n’est pas confirmé.

Un blocage technique ordinaire doit d’abord être diagnostiqué avec les moyens
sûrs déjà autorisés.

---

## 21. Mise à jour des règles
Les règles décrivent des décisions durables, pas l’état temporaire d’une tâche.

Mettre à jour une règle lorsque :

- le stack validé change ;
- une décision produit est remplacée ;
- une erreur IA se répète ;
- une nouvelle frontière de sécurité apparaît ;
- une commande ou structure devient la norme.

Éviter les doublons.

Une procédure longue doit devenir une skill ou commande spécialisée plutôt
qu’alourdir une règle globale.

Ne pas modifier la gouvernance sans le signaler.

---

## 22. Anti-patterns interdits
- Coder avant de lire les fichiers concernés.
- Inventer un besoin, une donnée ou une validation.
- Réécrire largement pour une correction locale.
- Installer une dépendance sans vérifier l’existant.
- Ignorer un dépôt sale.
- Désactiver lint, types, tests ou sécurité.
- Déclarer un succès à partir d’une intention.
- Utiliser une source secondaire alors que l’officielle existe.
- Poser des questions dont la réponse est déjà dans le dépôt.
- Demander une précision sans continuer les parties non bloquées.
- Simuler une validation humaine.
- Committer ou déployer implicitement.
- Cacher un échec ou une limite dans le compte rendu.

---

## 23. Definition of Done
Le travail de Claude est terminé lorsque :

- l’objectif et le périmètre sont respectés ;
- les décisions métier restent exactes ;
- le diff est minimal et cohérent ;
- le travail existant est préservé ;
- aucune dépendance ou action distante n’a été ajoutée implicitement ;
- les contrôles adaptés ont été exécutés ;
- le rendu visible a été inspecté lorsqu’il change ;
- les échecs sont corrigés ou explicitement signalés ;
- aucune information sensible n’est exposée ;
- le compte rendu distingue validé et non vérifié ;
- une autre personne peut comprendre et poursuivre le travail.

---

## 24. Références officielles
- Claude Code — Mémoire projet : https://docs.anthropic.com/en/docs/claude-code/memory
  (ce dépôt s’appuie sur `.claude/rules/` et `.cursor/rules/`, sans fichier racine
  de mémoire projet)
- Claude Code — Skills : https://docs.anthropic.com/en/docs/claude-code/skills
- Claude Code — Sous-agents : https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code — Hooks : https://docs.anthropic.com/en/docs/claude-code/hooks-guide
- Anthropic — Prompting best practices : https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices
