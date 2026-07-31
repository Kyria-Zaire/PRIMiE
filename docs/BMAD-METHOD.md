# Méthode BMAD — Adaptation PRiMiE

## 1. Objet

Cette méthode organise le développement assisté par IA de PRiMiE autour de
spécifications vérifiables, de rôles explicites, de gates humains et de preuves.

BMAD signifie **Breakthrough Method for Agile AI-Driven Development**. PRiMiE
adopte ses principes de planification agentique, de rôles spécialisés et
d’exécution guidée par les spécifications, sans installer automatiquement le
framework complet.

Référence : [BMAD Method officiel](https://github.com/bmad-code-org/bmad-method).

## 2. Adaptation PRiMiE

PRiMiE est une landing page. La méthode doit donc être :

- rigoureuse sur la vérité produit ;
- légère dans ses artefacts ;
- humaine dans ses décisions ;
- adaptée au risque ;
- compatible avec Cursor, Claude et ChatGPT ;
- indépendante d’un modèle précis ;
- orientée preuve plutôt que volume documentaire.

La méthode ne doit jamais devenir plus complexe que le produit.

## 3. Chaîne officielle

```text
Vision
  → PRD
  → BMAD
  → ADR si nécessaire
  → Ticket
  → Code
  → Review
  → Merge
  → Documentation
  → Knowledge
```

Chaque artefact répond à une question :

| Artefact | Question |
| --- | --- |
| Vision | Pourquoi construire ? |
| PRD | Quoi construire et pour qui ? |
| BMAD | Comment découper et piloter ? |
| ADR | Pourquoi cette décision structurante ? |
| Ticket | Quelle unité exécutable ? |
| Code | Quelle implémentation réelle ? |
| Review | Le changement respecte-t-il les règles ? |
| QA | Le résultat est-il prouvé ? |
| Documentation | Que faut-il maintenir ? |
| Knowledge | Que doit-on réutiliser ? |

## 4. Principes non négociables

1. La spécification précède le code.
2. L’autorité humaine valide les gates.
3. Une IA ne transforme pas une hypothèse en fait.
4. Chaque ticket possède un périmètre fermé.
5. Les rôles sont séparés même si un même outil les joue.
6. La review ne s’auto-valide pas sans preuve.
7. Les tests pertinents précèdent le statut `DONE`.
8. Le déploiement Production exige une autorisation explicite.
9. La documentation change avec le code concerné.
10. Le processus s’allège quand le risque est faible.

## 5. Autorités

| Autorité | Responsabilité |
| --- | --- |
| Autorité produit | besoin, priorité, contenu, périmètre |
| Autorité technique | architecture, sécurité, qualité, livraison |
| Autorité Production | promotion, rollback et actions distantes |

Une autorité peut être tenue par la même personne, mais la décision doit rester
explicite.

Pour PRiMiE, toute donnée métier concernant Prisca doit provenir de Prisca ou
d’une source validée par l’autorité produit.

## 6. Rôles BMAD

Les rôles ne sont pas liés à une marque ou un modèle d’IA.

| Rôle | Mission | Sortie |
| --- | --- | --- |
| Orchestrateur | séquencer et protéger les gates | plan et handoffs |
| Analyste | clarifier problème, faits et inconnues | brief |
| Product Manager | produire et maintenir le PRD | PRD validable |
| UX/UI | concevoir parcours et interface | spécification UX/UI |
| Architecte | choisir structure et contraintes | architecture / ADR |
| Scrum Master | découper en lots et tickets | backlog prêt |
| Développeur | implémenter le ticket accepté | diff ciblé |
| Reviewer | challenger conformité et régressions | findings |
| QA | prouver les critères | résultats |
| Sécurité | appliquer les gates pertinentes | avis de sécurité |
| Documentaliste | synchroniser la connaissance | documentation |

## 7. Séparation des rôles

Un même agent peut changer de rôle, mais il doit annoncer le rôle actif et
respecter sa frontière.

Exemples :

- l’Analyste ne code pas pendant `DISCOVER` ;
- le Développeur ne modifie pas le PRD pour faciliter son implémentation ;
- le Reviewer ne masque pas un finding bloquant ;
- le QA ne déclare pas un test réussi sans exécution ;
- l’Orchestrateur ne franchit pas un gate humain.

## 8. Échelle d’artefacts

### Changement mineur

Exemples : correction de texte validé, lien cassé, ajustement de style local.

Artefacts minimaux :

```text
Ticket → Code → Review → Vérification
```

### Changement fonctionnel

Exemples : filtre de galerie, lightbox, menu mobile.

Artefacts :

```text
PRD ou section PRD → BMAD → Tickets → Code → Review → QA
```

### Changement structurant

Exemples : nouvelle architecture, service tiers, collecte de données.

Artefacts :

```text
PRD → BMAD → ADR → Tickets → Code → Review → QA/Sécurité → Release
```

Ne pas créer un ADR ou un PRD séparé pour chaque détail mineur.

## 9. Phases BMAD

L’adaptation PRiMiE conserve quatre phases principales.

### Phase 1 — Analysis

Objectif : comprendre avant de décider.

Entrées :

- vision ;
- brief ;
- faits vérifiés ;
- retours ;
- état du dépôt.

Actions :

1. définir le problème ;
2. identifier la cible ;
3. séparer faits, hypothèses et questions ;
4. inventorier les contraintes ;
5. identifier les risques ;
6. confirmer l’autorité.

Sortie : brief qualifié et décision de poursuivre.

### Phase 2 — Planning

Objectif : figer le quoi.

Actions :

1. produire ou mettre à jour le PRD ;
2. fixer objectifs et non-objectifs ;
3. borner le périmètre ;
4. écrire exigences et critères ;
5. définir dépendances ;
6. prioriser ;
7. valider le PRD.

Sortie : PRD validé.

### Phase 3 — Solutioning

Objectif : décider comment construire.

Actions :

1. inspecter l’architecture réelle ;
2. proposer la solution minimale ;
3. définir UX/UI si nécessaire ;
4. évaluer sécurité, accessibilité, performance et SEO ;
5. créer un ADR seulement si la décision est structurante ;
6. découper en lots et tickets ;
7. valider la readiness.

Sortie : solution acceptée et tickets prêts.

### Phase 4 — Implementation

Objectif : livrer des incréments prouvés.

Boucle :

```text
Ticket
  → Implémentation
  → Auto-revue
  → Review indépendante
  → QA / sécurité
  → Correction
  → Validation
  → Merge
```

Sortie : incrément vérifié, documenté et traçable.

## 10. Gates

| Gate | Question | Preuve | Autorité |
| --- | --- | --- | --- |
| `G0 — Intake` | Le besoin est-il réel et prioritaire ? | brief | Produit |
| `G1 — PRD` | Le quoi est-il clair et validé ? | PRD | Produit |
| `G2 — Solution` | Le comment est-il sûr et proportionné ? | architecture / ADR | Technique |
| `G3 — Ready` | Les tickets sont-ils exécutables ? | DoR | Produit + Technique |
| `G4 — Quality` | Critères, QA et sécurité passent-ils ? | preuves | Review + QA |
| `G5 — Release` | La mise en Production est-elle autorisée ? | Preview validée | Production |
| `G6 — Closure` | Documentation et connaissance sont-elles synchronisées ? | clôture | Technique |

Un gate bloqué reste bloqué. Une IA ne remplace pas la validation manquante par
une supposition.

## 11. Modes de travail

| Mode | Autorisé | Interdit |
| --- | --- | --- |
| `DISCOVER` | lire, rechercher, auditer | modifier |
| `PLAN` | proposer, découper, estimer | implémenter |
| `IMPLEMENT` | modifier le périmètre accepté | étendre silencieusement |
| `REVIEW` | analyser et classer | corriger sans demande |
| `VERIFY` | exécuter des preuves | inventer un résultat |
| `DEPLOY` | action autorisée et contrôlée | promotion implicite |

Le mode doit être inscrit dans le ticket ou le prompt d’exécution.

## 12. Convention d’identifiants

### Dossier BMAD

```text
BMAD-PRIMIE-001
BMAD-PRIMIE-002
```

### Feature

```text
FEATURE-LANDING-V1
FEATURE-GALLERY-V1
FEATURE-WHATSAPP-V1
```

### Ticket

```text
LANDING-HERO-01
GALLERY-FILTER-01
QA-ACCESSIBILITY-01
SEC-HEADERS-01
DEPLOY-PREVIEW-01
```

### Sous-lots

Lorsqu’un dossier numéroté possède plusieurs incréments :

```text
006A
006B
006C
```

Conserver les identifiants déjà utilisés dans un chantier. Ne jamais renuméroter
un historique pour le rendre plus esthétique.

## 13. Statuts

### Cycle d’un dossier ou ticket

| Statut | Sens |
| --- | --- |
| `DRAFT` | contenu incomplet |
| `DISCOVER` | investigation en cours |
| `READY` | critères de démarrage remplis |
| `IN_PROGRESS` | implémentation active |
| `BLOCKED` | décision ou dépendance manquante |
| `REVIEW` | changement soumis au contrôle |
| `VERIFIED` | preuves réussies |
| `DONE` | accepté et clôturé |
| `CANCELLED` | abandonné explicitement |

### Statut d’audit

Utiliser :

- `DONE` : exigence présente et prouvée ;
- `PARTIAL` : présente mais incomplète ;
- `MISSING` : absente ;
- `NOT_APPLICABLE` : hors périmètre avec justification ;
- `UNKNOWN` : preuve insuffisante.

Ne pas confondre `IMPLEMENTED` et `VERIFIED`.

## 14. Definition of Ready

Un ticket est `READY` lorsque :

- identifiant et titre sont clairs ;
- contexte et objectif sont connus ;
- périmètre inclus et exclu est écrit ;
- critères d’acceptation sont testables ;
- fichiers ou zones probables sont identifiés ;
- dépendances sont disponibles ;
- questions bloquantes sont résolues ;
- gates sécurité pertinents sont listés ;
- mode de travail est défini ;
- autorité de validation est connue.

Un ticket non prêt retourne en Planning ou Solutioning.

## 15. Definition of Done

Un ticket est `DONE` lorsque :

- critères d’acceptation passent ;
- diff reste dans le périmètre ;
- lint, types, tests et build pertinents passent ;
- review bloquante est résolue ;
- sécurité, accessibilité, responsive, SEO et performance sont vérifiés selon le risque ;
- aucune donnée canonique n’est altérée ;
- documentation affectée est synchronisée ;
- éléments non vérifiés sont déclarés ;
- autorité attendue a validé ;
- aucun déploiement non autorisé n’a été effectué.

`Ça fonctionne chez moi` n’est pas une Definition of Done.

## 16. Template de dossier BMAD

```md
# [BMAD-PRIMIE-NNN] — [Titre]

## Métadonnées
- Statut :
- Phase :
- Mode :
- Autorité produit :
- Autorité technique :
- PRD :
- ADR :
- Tickets :

## Problème

## Objectif

## Périmètre inclus

## Hors périmètre

## Faits vérifiés

## Hypothèses

## Questions ouvertes

## Contraintes

## Risques

## Solution retenue

## Lots

## Gates

## Plan de validation

## Décisions

## Clôture
```

## 17. Template de ticket

```md
# [ID] — [Titre]

## Métadonnées
- BMAD :
- Feature :
- Mode :
- Statut :
- Priorité :
- Autorité :

## Contexte

## Objectif

## Périmètre inclus

## Hors périmètre

## Critères d’acceptation
- [ ] AC-001
- [ ] AC-002

## Fichiers concernés

## Dépendances

## Gates applicables

## Plan d’exécution

## Validation attendue

## Résultats

## Risques ou éléments non vérifiés
```

## 18. Security Gates

Appliquer seulement les checkpoints pertinents au ticket :

| Gate | Domaine |
| --- | --- |
| `SEC-AUTH-01` | authentification |
| `SEC-INPUT-01` | entrées et validation |
| `SEC-SECRETS-01` | secrets |
| `SEC-ABUSE-01` | abus et limitation |
| `SEC-DEPLOY-01` | déploiement |
| `SEC-AUTHZ-01` | autorisation |

Exemple :

```text
Ce ticket DOIT passer :
- SEC-INPUT-01
- SEC-AUTHZ-01
avant validation.
```

Ne pas appliquer mécaniquement les six gates à un changement statique.

## 19. Handoffs

Chaque passage de rôle doit transmettre :

- artefact source ;
- décision validée ;
- périmètre ;
- questions ouvertes ;
- risques ;
- critères ;
- preuves attendues ;
- actions interdites.

Le rôle suivant doit pouvoir travailler sans reconstituer une conversation
entière.

## 20. Gestion du changement

Si le périmètre évolue pendant l’exécution :

1. arrêter l’extension ;
2. qualifier le nouveau besoin ;
3. décider s’il appartient au ticket ;
4. mettre à jour PRD ou BMAD ;
5. revalider les critères ;
6. créer un ticket séparé si nécessaire.

Ne jamais « profiter du ticket » pour ajouter une fonctionnalité.

## 21. Review

La review contrôle :

- conformité au PRD ;
- respect du ticket ;
- exactitude métier ;
- architecture ;
- sécurité ;
- accessibilité ;
- responsive ;
- SEO ;
- performance ;
- tests ;
- documentation ;
- absence de régression.

Classer les findings :

| Niveau | Sens |
| --- | --- |
| `BLOCKER` | livraison impossible |
| `MAJOR` | risque important |
| `MINOR` | correction souhaitable |
| `NIT` | amélioration non bloquante |

Fournir fichier, preuve, impact et correction minimale.

## 22. QA et preuves

Associer chaque critère à une preuve :

| Critère | Type de preuve |
| --- | --- |
| comportement | test fonctionnel |
| responsive | viewports `320`, `390`, `768`, `1440px` |
| accessibilité | clavier, focus, zoom `200 %`, reduced motion |
| performance | build, bundle ou mesure |
| sécurité | gate et contrôle ciblé |
| contenu | source métier validée |
| déploiement | Preview et smoke test |

Un contrôle non exécuté reste `NON VÉRIFIÉ`.

## 23. Boucle de correction

```text
Finding
  → qualification
  → correction minimale
  → test ciblé
  → test de régression
  → nouvelle review
```

Ne pas fermer un finding sur intention. Fermer sur preuve.

## 24. Release

Avant Production :

1. confirmer le commit ou artefact ;
2. valider la Preview ;
3. exécuter smoke tests ;
4. vérifier téléphone et WhatsApp ;
5. vérifier console, réseau et HTTPS ;
6. confirmer le rollback ;
7. obtenir l’autorisation Production.

Après Production :

1. vérifier le site public ;
2. contrôler le parcours critique ;
3. consigner résultat et version ;
4. ouvrir un incident si nécessaire.

## 25. Clôture et knowledge

À la clôture :

- mettre le ticket à jour ;
- relier preuves et décisions ;
- actualiser documentation ;
- supprimer les TODO résolus ;
- consigner les risques restants ;
- extraire uniquement les connaissances réutilisables ;
- éviter de transformer chaque tâche en nouvelle règle.

Le knowledge doit réduire le travail futur, pas recopier le rapport.

## 26. Cas particulier PRiMiE

Conserver :

```text
Marque : Chez PRiMiE Coiffure
Porteuse : Prisca
Téléphone : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

La V1 exclut :

- compte et authentification ;
- formulaire et calendrier ;
- paiement ;
- backend et base de données ;
- CMS ;
- chatbot ;
- analytics et tracking implicite.

Le BMAD doit empêcher l’élargissement silencieux de ce périmètre.

## 27. Anti-patterns

Ne jamais :

- coder avant validation du besoin ;
- créer un PRD pour une correction triviale ;
- créer un ADR pour chaque détail ;
- lancer plusieurs tickets dépendants sans ordre ;
- laisser une IA valider son propre gate humain ;
- modifier le périmètre pendant l’implémentation ;
- annoncer un test non exécuté ;
- confondre `PARTIAL` et `DONE` ;
- fusionner avec un finding bloquant ;
- documenter une hypothèse comme un fait ;
- installer un outil BMAD sans audit ;
- lier la méthode à un fournisseur d’IA ;
- déployer sans autorisation.

## 28. Checklist de clôture gouvernance

- [x] règles Cursor ;
- [x] règles Claude ;
- [x] skills Claude ;
- [x] `CLAUDE.md` ;
- [x] modèle PRD ;
- [x] méthode BMAD ;
- [ ] PRD initial PRiMiE rempli et validé ;
- [ ] premier dossier BMAD créé depuis le PRD ;
- [ ] développement initialisé.

La gouvernance documentaire est clôturée lorsque ce fichier et le modèle PRD
sont validés. Le travail produit commence ensuite par le PRD initial de PRiMiE,
pas par une nouvelle série de règles.
