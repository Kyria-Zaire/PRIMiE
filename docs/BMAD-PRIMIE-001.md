# BMAD-PRIMIE-001 — Landing page PRiMiE V1

## 0. Métadonnées

| Champ | Valeur |
| --- | --- |
| Identifiant | `BMAD-PRIMIE-001` |
| Produit | `PRiMiE` |
| Titre | Solutioning et plan d’exécution de la landing page V1 |
| Version | `1.0` |
| Statut | `READY — G2 passé` |
| Phase BMAD | `Phase 3 — Solutioning` |
| Mode | `PLAN` |
| Autorité produit | Prisca — métier et contenus |
| Autorité technique | Kyria — CTO |
| Autorité Production | Kyria — confirmation explicite requise |
| Date de création | `2026-07-30` |
| Dernière mise à jour | `2026-08-12` |
| Validation CTO | `Kyria — 2026-07-30` |
| PRD source | `docs/PRD-PRIMIE-V1.md — version 1.3 — Validé` |
| ADR | `Aucun requis à ce stade` |
| Tickets planifiés | `26` |
| Environnement cible | Local → Preview Vercel → Production autorisée |

### Décision validée

Le CTO a validé explicitement le `2026-07-30` :

1. la solution technique proportionnée décrite dans ce dossier ;
2. le découpage en lots et tickets, y compris la normalisation de
   `INIT-SCAFFOLD-01` en cinq tickets `01A` à `01E` ;
3. l’ordre des dépendances et les règles de parallélisation ;
4. la stratégie de qualité, sécurité et déploiement ;
5. l’absence d’ADR nécessaire pour le socle V1 ;
6. le passage de `G2 — Solution` ;
7. le maintien de `G3 — Ready` jusqu’à validation de `INIT-SCAFFOLD-01B`,
   désormais `Passé` (`Kyria — 2026-07-30`).

La validation de `G2` n’autorise pas encore le scaffold Next.js sans ticket
`INIT-SCAFFOLD-01C`. `INIT-SCAFFOLD-01C` est `DONE` (`01C-R4 — ACCEPTED`,
validation CTO). `INIT-SCAFFOLD-01D` est `DONE`. `INIT-SCAFFOLD-01E` est
`DONE — Validé CTO 2026-07-30`. `G4`, `G5` et `G6` sont `Passé`.
`FEATURE-FOUNDATION-V1` est `DONE` (clôture `2026-07-30`).
`FOUNDATION-SYSTEM-01` est `DONE` (clôture `2026-07-30`, découpage `01A`–`01E`).

## 1. Problème

Le PRD fixe clairement le produit à construire, mais le dossier ne contient
encore ni application Next.js, ni `package.json`, ni code fonctionnel. Sans
découpage d’exécution, une IA pourrait :

- initialiser une stack différente de la cible ;
- mélanger structure, contenu, design et déploiement dans une seule modification ;
- inventer les contenus encore attendus de Prisca ;
- créer trop tôt des composants ou abstractions inutiles ;
- déclarer une fonctionnalité terminée sans preuve ;
- déployer ou élargir silencieusement le périmètre V1.

Ce BMAD transforme donc le PRD validé en unités ordonnées, testables,
réversibles et contrôlées par des gates humains.

## 2. Objectif

Préparer la réalisation de la landing page `Chez PRiMiE Coiffure` en donnant à
Cursor, Claude ou tout autre agent d’exécution :

- une architecture cible explicite ;
- des invariants produit non négociables ;
- un ordre de construction ;
- des tickets au périmètre fermé ;
- des dépendances et autorités identifiées ;
- des critères d’acceptation testables ;
- des preuves attendues avant chaque changement de statut ;
- des conditions d’arrêt claires.

Le premier résultat exécutable attendu après validation de ce BMAD est un socle
Next.js minimal, local et vérifié. Ce BMAD n’autorise pas encore sa création.

## 3. Périmètre inclus

- initialisation contrôlée d’une application Next.js unique ;
- architecture frontend et contenu centralisé ;
- landing page publique en dix sections ;
- navigation par ancres et menu responsive ;
- présentation des six prestations validées ;
- galerie responsive et lightbox accessible ;
- réassurance, avis et FAQ fondés sur des contenus confirmés ;
- CTA WhatsApp et fallback téléphonique ;
- SEO technique de base ;
- accessibilité WCAG 2.2 AA ;
- responsive mobile-first ;
- performance conforme aux budgets du PRD ;
- sécurité et confidentialité adaptées à un site statique ;
- tests ciblés, QA manuelle et preuves ;
- Preview Vercel contrôlée ;
- préparation d’une release Production soumise à autorisation ;
- synchronisation documentaire de clôture.

## 4. Hors périmètre

- compte, authentification, dashboard ou back-office ;
- formulaire ou stockage de demandes ;
- calendrier ou réservation automatisée ;
- paiement ;
- API métier, backend ou base de données ;
- CMS ;
- WhatsApp Cloud API, webhook, chatbot ou CRM ;
- analytics, pixel, cookie non essentiel ou session replay ;
- application mobile ;
- marketplace ou fonctionnalités sociales ;
- monorepo ;
- refonte du PRD pendant l’implémentation ;
- installation automatique du framework BMAD complet ;
- déploiement Production sans instruction explicite.

Toute demande appartenant à cette liste retourne en Planning et exige une
décision produit séparée.

## 5. Faits vérifiés

| ID | Fait | Source ou preuve |
| --- | --- | --- |
| `FACT-001` | Le PRD V1 est en version `1.0 — Validé`. | `docs/PRD-PRIMIE-V1.md` |
| `FACT-002` | Les gates `G0` et `G1` sont passés. | PRD, section 36 |
| `FACT-003` | La gouvernance Cursor et Claude existe. | `.cursor/`, `.claude/` (fichier racine `CLAUDE.md` retiré — intention Kyria, cleanup 2026-08-04) |
| `FACT-004` | La méthode BMAD PRiMiE existe. | `docs/governance/BMAD-METHOD.md` |
| `FACT-005` | Aucun `package.json` n’existe actuellement. | inspection locale du `2026-07-30` |
| `FACT-006` | Aucune application Next.js n’est initialisée. | inspection locale du `2026-07-30` |
| `FACT-007` | Le dossier de travail inspecté n’est pas un dépôt Git actif. | `git status` impossible le `2026-07-30` |
| `FACT-008` | Le numéro canonique est `+33749616582`. | PRD et `do-not-break` |
| `FACT-009` | Le lien canonique est `https://wa.me/33749616582`. | PRD et `do-not-break` |
| `FACT-010` | Les contenus métier ouverts sont assignés à Prisca. | PRD, sections 32 et 37 |
| `FACT-011` | Aucun domaine Production n’est confirmé. | PRD, `DEP-009` |
| `FACT-012` | Aucune collecte utilisateur n’est autorisée en V1. | PRD, sections 28 et 31 |

## 6. Hypothèses contrôlées

| ID | Hypothèse | Traitement |
| --- | --- | --- |
| `HYP-001` | Le site sera développé directement dans la racine `PRIMIE/`. | confirmé par CTO le `2026-07-30` |
| `HYP-002` | Une maquette approuvée sera disponible avant l’intégration visuelle finale. | bloque les tickets visuels concernés |
| `HYP-003` | Prisca fournira assez de réalisations autorisées pour la galerie Production. | bloque `G5`, pas le bootstrap |
| `HYP-004` | Vercel sera le fournisseur de Preview et Production. | validé comme cible, accès à confirmer |
| `HYP-005` | Vitest et Playwright suffiront aux tests automatisés proportionnés. | installation soumise à audit au bootstrap |
| `HYP-006` | shadcn/ui et Framer Motion ne seront ajoutés que s’ils réduisent réellement le code ou le risque. | aucune installation par défaut |

Aucune hypothèse ne peut être rendue comme un fait métier dans l’interface.

## 7. Questions ouvertes

| ID | Question | Autorité | Ticket affecté | Effet |
| --- | --- | --- | --- | --- |
| `Q-001` | Quelles photos sont des réalisations réelles publiables ? | Prisca | `GALLERY-EXPERIENCE-01` | bloque contenu galerie |
| `Q-002` | Quelles autorisations de publication sont acquises ? | Prisca | `CONTENT-VALIDATION-01` | bloque médias concernés |
| `Q-003` | Quels avis peuvent être publiés ? | Prisca | `TRUST-CONTENT-01` | conditionne Avis |
| `Q-004` | Quelles réponses FAQ sont confirmées ? | Prisca | `TRUST-CONTENT-01` | conditionne FAQ |
| `Q-005` | Quel message WhatsApp prérempli est validé ? | Prisca | `WHATSAPP-CONTACT-01` | sinon lien sans `text` |
| `Q-006` | Quelles formulations finales utiliser ? | Prisca / Design | `LANDING-HERO-SERVICES-01` | bloque copy finale |
| `Q-007` | Quelle maquette est la référence finale ? | CTO / Design | tickets UI | bloque fidélité visuelle |
| `Q-008` | Quelles mentions légales publier ? | Prisca / CTO | `SEO-FOUNDATION-01` | bloque Production |
| `Q-009` | Quel domaine final utiliser ? | CTO | `SEO-FOUNDATION-01` | bloque canonical et Release |
| `Q-010` | Quels réseaux sociaux afficher ? | Prisca | `WHATSAPP-CONTACT-01` | facultatif |
| `Q-011` | Le dossier doit-il être initialisé comme dépôt Git séparé ? | CTO | `INIT-SCAFFOLD-01B` | décidé : `git init -b main` local, sans commit ni remote |

## 8. Contraintes non négociables

### Produit

- respecter exactement les dix sections et leur ordre ;
- afficher exactement la graphie `PRiMiE` ;
- ne publier aucun prix, délai, disponibilité, adresse ou promesse inconnue ;
- ne jamais présenter un clic WhatsApp comme une réservation confirmée ;
- conserver le téléphone comme fallback ;
- masquer ou traiter honnêtement tout contenu non validé.

Ordre officiel :

1. Header ;
2. Hero ;
3. Services ;
4. Galerie — Nos réalisations ;
5. Pourquoi me choisir ? ;
6. FAQ ;
7. Réserver ;
8. Contact ;
9. Footer.

(Section « Avis clientes » / Testimonials : `CANCELLED` V1 — CTO 2026-08-02.)

Prestations canoniques :

1. Tresses & coiffure femme et homme ;
2. Traitement de perruque ;
3. Pose perruque ;
4. Look & twist ;
5. Vente et pose de perruques ;
6. Tissage.

### Architecture

- Next.js 15, App Router et TypeScript strict ;
- application unique, sans monorepo ;
- `app/` à la racine et aucun dossier `src/` ;
- Server Components par défaut ;
- frontières clientes minimales ;
- contenu séparé de React et centralisé dans `content/` ;
- aucune abstraction prématurée ;
- aucun package ajouté sans usage, audit et justification.

### Design

- mobile-first ;
- palette noire, dorée, beige et crème ;
- `Cormorant Garamond`, `Manrope` et `Allura` selon les rôles validés ;
- rendu premium obtenu par composition, photographie, typographie et espace ;
- aucune surcharge, fausse promesse visuelle ou accumulation d’effets.

### Qualité

- viewports `320`, `390`, `768` et `1440px` ;
- zoom `200 %` ;
- WCAG 2.2 AA ;
- clavier, focus visible et reduced motion ;
- aucun débordement horizontal ;
- LCP `≤ 2,5 s`, INP `≤ 200 ms`, CLS `≤ 0,1` ;
- JavaScript initial `≤ 150 Ko`, route totale `≤ 220 Ko`, CSS `≤ 50 Ko` ;
- aucun test ou résultat annoncé sans exécution réelle.

### Sécurité et livraison

- aucun secret ou `.env` commité ;
- aucune saisie ou donnée utilisatrice collectée ;
- aucun traceur implicite ;
- aucun `git add`, commit, push ou déploiement sans demande ;
- Preview contrôlée avant toute Production ;
- autorisation Production et rollback obligatoires.

## 9. Solution retenue

### 9.1 Architecture applicative

Construire une application Next.js 15 statique et orientée contenu :

- `app/layout.tsx` porte les métadonnées globales et les polices ;
- `app/page.tsx` compose les dix sections sans logique métier ;
- `components/layout/` porte Header et Footer ;
- `components/sections/` porte les sections de page ;
- `components/shared/` porte les composants métier réutilisés ;
- `components/ui/` porte uniquement les primitives réellement nécessaires ;
- `content/` constitue la source de vérité publique ;
- `lib/` contient les helpers purs, dont la construction du lien WhatsApp ;
- `public/` contient uniquement des assets tracés et autorisés.

### 9.2 Arborescence cible

```text
PRIMIE/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── content/
│   ├── faq.ts
│   ├── gallery.ts
│   ├── navigation.ts
│   ├── services.ts
│   ├── site-config.ts
├── lib/
├── public/
│   └── images/
├── tests/
├── BMAD-PRIMIE-001.md
├── .cursor/rules/00-project.mdc
├── next.config.ts
├── package.json
└── tsconfig.json
```

Cette arborescence est une cible. Le ticket d’initialisation doit confirmer les
fichiers réellement générés avant toute modification.

### 9.3 Rendu et interactivité

- Server Components pour la structure, le contenu, les services et le contact ;
- composants clients limités au menu mobile, à la lightbox et à l’accordéon FAQ ;
- filtres de galerie uniquement si le volume réel les justifie ;
- animations limitées aux micro-interactions et révélations non essentielles ;
- expérience complète sans animation et contenu principal disponible sans
  dépendance à une interaction complexe.

### 9.4 Contenu

Les données confirmées entrent dans les fichiers `content/`. Les éléments non
confirmés utilisent l’une de ces stratégies :

1. section masquée lorsque le PRD l’autorise ;
2. état vide honnête approuvé par le CTO ;
3. absence de propriété ou de lien facultatif ;
4. ticket bloqué lorsque le contenu est indispensable.

Les illustrations ne sont jamais rangées avec les réalisations authentiques.

### 9.5 WhatsApp

`content/site-config.ts` porte le numéro E.164 et l’URL canonique. Un helper pur
construit éventuellement la query `text` avec `URLSearchParams`. En l’absence
de validation du message proposé, le lien reste :

```text
https://wa.me/33749616582
```

Aucun SDK, webhook, envoi automatique ou tracking n’est nécessaire.

### 9.6 Tests

Stratégie minimale :

- lint et TypeScript sur chaque incrément ;
- build Next.js avant passage en Review finale ;
- tests unitaires sur les helpers et invariants de contenu ;
- tests navigateur sur navigation, menu, FAQ, lightbox, WhatsApp et téléphone ;
- QA manuelle pour viewports, zoom, clavier, focus et reduced motion ;
- audit ciblé accessibilité, performance et sécurité avant Preview.

Vitest et Playwright sont les outils préférés, mais leur version et leur
installation doivent être auditées au ticket d’initialisation.

### 9.7 Déploiement

- Local : développement et vérifications ;
- Preview Vercel : validation visuelle et smoke tests ;
- Production : action séparée, commit identifié, domaine et mentions confirmés,
  rollback connu et autorisation explicite.

## 10. Décisions d’architecture

| ID | Décision | Justification | ADR |
| --- | --- | --- | --- |
| `DEC-001` | application Next.js unique | proportionnée à une landing page | non |
| `DEC-002` | contenu TypeScript local | simple, typé et sans CMS | non |
| `DEC-003` | Server Components par défaut | réduit le JavaScript client | non |
| `DEC-004` | client islands ciblés | interactivité accessible sans hydrater toute la page | non |
| `DEC-005` | WhatsApp via lien HTML | aucune intégration serveur requise | non |
| `DEC-006` | aucune donnée utilisatrice | respecte le périmètre et la confidentialité | non |
| `DEC-007` | galerie authentique ou état honnête | évite toute représentation trompeuse | non |
| `DEC-008` | Preview avant Production | validation et rollback contrôlés | non |

Un ADR ne devient nécessaire que si une décision structurante nouvelle apparaît,
par exemple un CMS, un backend, une collecte de données ou une architecture
multi-application.

## 11. Dépendances

| ID | Dépendance | Autorité | Bloque |
| --- | --- | --- | --- |
| `DEP-001` | photos authentiques | Prisca | galerie finale et Production |
| `DEP-002` | droits des photos | Prisca | publication des médias |
| `DEP-003` | descriptions de services | Prisca | copy finale Services |
| `DEP-004` | raisons de choisir Prisca | Prisca | réassurance finale |
| `DEP-005` | avis et autorisations | Prisca | rendu de la section Avis |
| `DEP-006` | FAQ confirmée | Prisca | FAQ complète |
| `DEP-007` | message WhatsApp | Prisca | query `text`, pas le lien simple |
| `DEP-008` | mentions légales | Prisca / CTO | Production |
| `DEP-009` | domaine final | CTO | canonical et Production |
| `DEP-010` | réseaux sociaux | Prisca | liens facultatifs |
| `DEP-011` | maquette et assets de marque | CTO / Design | intégration visuelle finale |
| `DEP-012` | validation de ce BMAD | CTO | `G2` et tickets techniques — **validé le `2026-07-30`** |
| `DEP-013` | décision Git | CTO | initialisation Git locale sur `main` — **décidé le `2026-07-30`** |
| `DEP-014` | accès Vercel autorisé | CTO | Preview distante |

## 12. Risques et réponses

| ID | Risque | Niveau | Réponse |
| --- | --- | --- | --- |
| `RISK-001` | contenu inventé | `BLOCKER` | sources métier et états honnêtes |
| `RISK-002` | illustration présentée comme réalisation | `BLOCKER` | registres d’assets séparés |
| `RISK-003` | mauvais numéro WhatsApp | `BLOCKER` | constante unique et smoke tests |
| `RISK-004` | extension formulaire/calendrier | `MAJOR` | hors périmètre explicite |
| `RISK-005` | design générique ou surchargé | `MAJOR` | maquette, tokens et review UX |
| `RISK-006` | galerie lourde | `MAJOR` | budgets, dimensions et lazy loading |
| `RISK-007` | trop de JavaScript client | `MAJOR` | Server Components et mesure bundle |
| `RISK-008` | lightbox ou menu inaccessible | `MAJOR` | focus, clavier, Escape et tests |
| `RISK-009` | dépendances superflues | `MAJOR` | audit et justification avant ajout |
| `RISK-010` | SEO basé sur un faux domaine | `MAJOR` | canonical bloqué par `DEP-009` |
| `RISK-011` | mentions incomplètes | `MAJOR` | gate juridique avant Production |
| `RISK-012` | déploiement implicite | `BLOCKER` | ticket séparé et autorité Production |
| `RISK-013` | sur-gouvernance | `MINOR` | un seul BMAD et tickets compacts |
| `RISK-014` | absence de dépôt Git actif | `MAJOR` | décision explicite avant action Git |

## 13. Lots

| Lot | But | Tickets | Sortie |
| --- | --- | --- | --- |
| `LOT-0 — Readiness` | confirmer contenus et décision technique | `CONTENT-VALIDATION-01`, validation BMAD | entrées qualifiées |
| `LOT-1 — Socle` | installer une base saine et les fondations | `INIT-SCAFFOLD-01A` à `01E`, `FOUNDATION-SYSTEM-01A` à `01E` | build local minimal |
| `LOT-2 — Parcours essentiel` | rendre le parcours principal fonctionnel | `LANDING-SHELL-01`, `LANDING-HERO-SERVICES-01`, `WHATSAPP-CONTACT-01` | page structurée et contact réel |
| `LOT-3 — Preuve et confiance` | intégrer réalisations et réassurance | `GALLERY-EXPERIENCE-01`, `TRUST-CONTENT-01` | contenu de confiance |
| `LOT-4 — Qualité de livraison` | compléter SEO et preuves non fonctionnelles | `SEO-FOUNDATION-01`, `QA-A11Y-RESPONSIVE-01`, `QA-PERF-SECURITY-01` | candidate Preview |
| `LOT-5 — Release et clôture` | valider Preview, Production et documentation | `DEPLOY-PREVIEW-01`, `RELEASE-PRODUCTION-01`, `DOC-CLOSURE-01` | V1 livrée et traçable |

### Ordre et parallélisation

```text
Validation BMAD (G2 passé)
├── CONTENT-VALIDATION-01 (DONE — clôturé le 2026-08-01)
│   ├── CONTENT-VALIDATION-01A (DONE)
│   ├── CONTENT-VALIDATION-01B (DONE)
│   ├── CONTENT-VALIDATION-01C (DONE)
│   │   └── CONTENT-VALIDATION-01C-R1 (DONE)
│   ├── CONTENT-VALIDATION-01D (DONE_WITH_DEFERRED_SCOPE — Hero et Services publiés ; galerie et témoignages transférés)
│   │   ├── CONTENT-VALIDATION-01D-HERO (DONE)
│   │   ├── CONTENT-VALIDATION-01D-HERO-R1 (DONE)
│   │   ├── CONTENT-VALIDATION-01D-HERO-R2 (DONE)
│   │   ├── CONTENT-VALIDATION-01D-SERVICES-ASSETS (SUPERSEDED — ticket initial arrêté sur chemin singulier erroné)
│   │   └── CONTENT-VALIDATION-01D-SERVICES-ASSETS-R1 (DONE — rendu visuel validé CTO 2026-07-31 ; QA finale validée CTO 2026-08-01)
│   └── CONTENT-VALIDATION-01E (DONE — Validé CTO 2026-08-01)
├── CONTACT-BOOKING-01 (DONE — clôturé le 2026-08-01)
│   ├── CONTACT-BOOKING-01A (DONE — Validé CTO 2026-08-01)
│   ├── CONTACT-BOOKING-01B (DONE — Validé CTO 2026-08-01)
│   ├── CONTACT-BOOKING-01C (DONE — Validé CTO 2026-08-01)
│   ├── CONTACT-BOOKING-01D (DONE — Validé CTO 2026-08-01)
│   └── CONTACT-BOOKING-01E (DONE — Validé CTO 2026-08-01)
├── BOOKING-WHATSAPP-FLOW-01 (DONE — clôturé le 2026-08-02)
│   ├── BOOKING-WHATSAPP-FLOW-01A (DONE — Validé CTO 2026-08-01)
│   ├── BOOKING-WHATSAPP-FLOW-01B (DONE — Validé CTO 2026-08-01)
│   ├── BOOKING-WHATSAPP-FLOW-01C (DONE — Validé CTO 2026-08-02)
│   │   └── BOOKING-WHATSAPP-FLOW-01C-R1 (DONE — Validé CTO 2026-08-02)
│   ├── BOOKING-WHATSAPP-FLOW-01D (DONE — Validé CTO 2026-08-02)
│   └── BOOKING-WHATSAPP-FLOW-01E (DONE — Validé CTO 2026-08-02)
├── GALLERY-CONTENT-01 (DONE — clôturé le 2026-08-02)
│   ├── GALLERY-CONTENT-01A (SUPERSEDED par 01A-R1)
│   ├── GALLERY-CONTENT-01A-R1 (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-CONTENT-01B (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-CONTENT-01C (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-CONTENT-01C-R1 (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-CONTENT-01D (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-CONTENT-01E (DONE — Validé CTO 2026-08-02)
│   ├── GALLERY-PAGE-HERO-R1 (DONE — Validé CTO 2026-08-02)
│   └── GALLERY-DISCLOSURE-R1 (DONE — Validé CTO 2026-08-02)
├── FAQ-EXPERIENCE (DONE — publié le 2026-08-03)
│   ├── FAQ-DESIGN-R1 (DONE)
│   ├── FAQ-DESIGN-R1-R2 (DONE — Validé CTO 2026-08-03)
│   ├── FAQ-ASSISTANT-EXPRESS-R1 (DONE — Validé CTO 2026-08-03)
│   └── FAQ-EXPERIENCE-CHECKPOINT (DONE — publié le 2026-08-03)
├── FOOTER-DESIGN-R1 (DONE — clôturé le 2026-08-03)
│   ├── FOOTER-DESIGN-R1A (DONE — Validé CTO 2026-08-03)
│   ├── FOOTER-DESIGN-R1B (DONE — Validé CTO 2026-08-03)
│   │   └── FOOTER-DESIGN-R1B-R1 (DONE — Validé CTO 2026-08-03)
│   ├── FOOTER-DESIGN-R1C (DONE — Validé CTO 2026-08-03)
│   │   ├── FOOTER-DESIGN-R1C-R1 (DONE)
│   │   ├── FOOTER-DESIGN-R1C-R2 (DONE — compatibilité technique)
│   │   └── FOOTER-DESIGN-R1C-R3 (DONE — Validé CTO 2026-08-03)
│   ├── FOOTER-DESIGN-R1D (DONE — Validé CTO 2026-08-03)
│   └── FOOTER-DESIGN-R1E (DONE — Validé CTO 2026-08-03)
├── HEADER-HERO-DESIGN-R1 (DONE — clôturé le 2026-08-03)
│   ├── HEADER-HERO-DESIGN-R1A (DONE — Validé CTO 2026-08-03)
│   ├── HEADER-HERO-DESIGN-R1B (DONE — Validé CTO 2026-08-03)
│   ├── HEADER-HERO-DESIGN-R1C (DONE — Validé CTO 2026-08-03)
│   │   └── HEADER-HERO-DESIGN-R1C-R1 (DONE — Validé CTO 2026-08-03)
│   ├── HEADER-HERO-DESIGN-R1D (DONE — Validé CTO 2026-08-03)
│   │   ├── HEADER-HERO-DESIGN-R1D-R1 (DONE — Validé CTO 2026-08-03)
│   │   └── HEADER-HERO-DESIGN-R1D-R2 (DONE — Validé CTO 2026-08-03)
│   └── HEADER-HERO-DESIGN-R1E (DONE — publié)
├── DEPENDENCY-SECURITY-R1 (DONE — clôturé le 2026-08-04)
│   ├── DEPENDENCY-SECURITY-R1A (DONE — Validé CTO 2026-08-04)
│   ├── DEPENDENCY-SECURITY-R1B (DONE — Validé CTO 2026-08-04)
│   │   ├── DEPENDENCY-SECURITY-R1B-R1 (SUPERSEDED sur la provenance CLAUDE.md)
│   │   └── DEPENDENCY-SECURITY-R1B-R2 (DONE — Validé CTO 2026-08-04)
│   └── DEPENDENCY-SECURITY-R1C-CHECKPOINT (DONE — publié le 2026-08-04)
├── CLAUDE-GOVERNANCE-CLEANUP-R1 (DONE — clôturé le 2026-08-04)
│   ├── CLAUDE-GOVERNANCE-CLEANUP-R1A (DONE — Validé CTO 2026-08-04)
│   ├── CLAUDE-GOVERNANCE-CLEANUP-R1B (DONE — Validé CTO 2026-08-04)
│   └── CLAUDE-GOVERNANCE-CLEANUP-R1C-CHECKPOINT (DONE — publié le 2026-08-04)
├── NAVIGATION-MENU-DESIGN-R1 (IN_PROGRESS)
│   ├── NAVIGATION-MENU-DESIGN-R1A (DONE — Validé CTO 2026-08-04)
│   ├── NAVIGATION-MENU-DESIGN-R1A-R1 (DONE — Validé CTO 2026-08-04)
│   ├── NAVIGATION-MENU-DESIGN-R1B (DONE — Validé CTO 2026-08-04)
│   ├── NAVIGATION-MENU-DESIGN-R1C (IN_PROGRESS — en attente CTO)
│   ├── NAVIGATION-OVERLAY-R1-R2B (DONE — Validé CTO 2026-08-04)
│   ├── NAVIGATION-MENU-DESIGN-R1D (BLOCKED)
│   └── NAVIGATION-MENU-DESIGN-R1E (BLOCKED)
├── MOBILE-HERO-NAV-POLISH-R1 (DONE — clôturé le 2026-08-04)
│   ├── MOBILE-HERO-NAV-POLISH-R1-R1 (DONE — Validé CTO le 2026-08-04)
│   ├── MOBILE-HERO-NAV-POLISH-R1-R1-VISUAL-GATE (DONE — PASS le 2026-08-04)
│   └── MOBILE-HERO-NAV-POLISH-R1-R1-CHECKPOINT (DONE — publié le 2026-08-04)
├── CONSEILS-PREVIEW-01 (DONE — clôturée le 2026-08-08)
│   ├── CONSEILS-PREVIEW-01A (DONE — Validé CTO)
│   ├── CONSEILS-PREVIEW-01B (DONE — Validé CTO)
│   ├── CONSEILS-PREVIEW-01C (DONE — Validé CTO 2026-08-08)
│   ├── CONSEILS-PREVIEW-01C-R1 (DONE — remplacé par R2)
│   ├── CONSEILS-PREVIEW-01C-R2 (DONE — portrait et mobile validés CTO)
│   ├── CONSEILS-PREVIEW-01C-R3 (DONE — remplacé par DESIGN-R1-R1)
│   ├── CONSEILS-PREVIEW-DESIGN-R1-R1 (DONE — Validé CTO 2026-08-08)
│   ├── CONSEILS-PREVIEW-DESIGN-R1-R2 (DONE — Validé CTO 2026-08-08)
│   ├── CONSEILS-PREVIEW-01D (CANCELLED — V1 preview sans `/conseils`)
│   ├── CONSEILS-PREVIEW-01E (DONE — checkpoint publié 2026-08-08)
│   ├── CONSEILS-PREVIEW-DESIGN-R1-CLOSE (DONE — publié origin/main 2026-08-08)
│   └── CONSEILS-PREVIEW-ASSET-R1 (DONE — Validé CTO et publié le 2026-08-08)
├── WIG-SALES-CONTENT-01 (DONE — clôturé le 2026-08-10)
│   ├── WIG-SALES-CONTENT-01A (DONE — Validé CTO)
│   ├── WIG-SALES-CONTENT-01B (DONE — Validé CTO)
│   ├── WIG-SALES-CONTENT-01C (DONE — Validé CTO 2026-08-10)
│   ├── WIG-SALES-CONTENT-01C-R1 (DONE — remplacé)
│   ├── WIG-SALES-CONTENT-01C-R2 (DONE — remplacé par R2-R1)
│   ├── WIG-SALES-CONTENT-01C-R2-R1 (DONE — Validé CTO 2026-08-10)
│   ├── WIG-SALES-CONTENT-01D (DONE — Validé CTO 2026-08-10)
│   ├── WIG-SALES-CONTENT-01E (DONE — publié le 2026-08-10)
│   ├── WIG-SALES-DESIGN-R1 (DONE — clôturé le 2026-08-11)
│   ├── WIG-SALES-DESIGN-R1-R1 (DONE — étape intermédiaire)
│   ├── WIG-SALES-DESIGN-R1-R2 (DONE — Validé CTO 2026-08-11)
│   ├── WIG-SALES-DESIGN-R1D (DONE — Validé CTO 2026-08-11)
│   ├── WIG-SALES-DESIGN-R1E (DONE — checkpoint publié le 2026-08-11)
│   ├── WIG-CATALOG-PAGE-01 (NOT OPEN)
│   └── WIG-COMMERCE-ENGINE (BACKLOG — NOT OPEN)
└── INIT-SCAFFOLD-01A (DONE)
    └── INIT-SCAFFOLD-01B (DONE)
        └── INIT-SCAFFOLD-01C (DONE — 01C-R4 ACCEPTED)
            └── INIT-SCAFFOLD-01D (DONE)
                └── INIT-SCAFFOLD-01E (DONE — Validé CTO 2026-07-30)
                    └── FOUNDATION-SYSTEM-01 (DONE — clôturé 2026-07-30)
                        ├── FOUNDATION-SYSTEM-01A (DONE — Validé CTO 2026-07-30)
                        ├── FOUNDATION-SYSTEM-01B (DONE — Validé CTO 2026-07-30)
                        ├── FOUNDATION-SYSTEM-01C (DONE — Validé CTO 2026-07-30)
                        ├── FOUNDATION-SYSTEM-01D (DONE — Validé CTO 2026-07-30)
                        └── FOUNDATION-SYSTEM-01E (DONE — Validé CTO 2026-07-30)
                            └── LANDING-SHELL-01 (DONE — clôturé le 2026-07-31)
                                ├── LANDING-SHELL-01A (DONE — Validé CTO 2026-07-31)
                                ├── LANDING-SHELL-01B (DONE — Validé CTO 2026-07-31)
                                ├── LANDING-SHELL-01C (DONE — Validé CTO 2026-07-31)
                                ├── LANDING-SHELL-01D (DONE — Validé CTO 2026-07-31)
                                └── LANDING-SHELL-01E (DONE — Validé CTO 2026-07-31)
                                    ├── LANDING-SHELL-01E-R1 (DONE — Design Sync v1.0)
                                    └── LANDING-SHELL-01E-R2 (DONE — Validé CTO 2026-07-31)
                                        └── LANDING-CORE-01 (DONE — clôturé le 2026-07-31)
                                            ├── LANDING-CORE-01A (DONE — Validé CTO 2026-07-31)
                                            ├── LANDING-CORE-01B (DONE — Validé CTO 2026-07-31)
                                            ├── LANDING-CORE-01C (DONE — Validé CTO 2026-07-31)
                                            ├── LANDING-CORE-01D (DONE — Validé CTO 2026-07-31)
                                            └── LANDING-CORE-01E (DONE — Validé CTO 2026-07-31)
                                            ├── LANDING-HERO-SERVICES-01 (SUPERSEDED par LANDING-CORE-01)
                                            ├── WHATSAPP-CONTACT-01
                                            ├── GALLERY-EXPERIENCE-01
                                            └── TRUST-CONTENT-01
                                                └── SEO-FOUNDATION-01
                                                    ├── QA-A11Y-RESPONSIVE-01
                                                    └── QA-PERF-SECURITY-01
                                                        └── DEPLOY-PREVIEW-01
                                                            └── RELEASE-PRODUCTION-01
                                                                └── DOC-CLOSURE-01
```

Les quatre tickets de sections ne doivent pas tous être démarrés simultanément
par le même agent. Limiter le travail actif afin de préserver la review et la
traçabilité.

## 14. Backlog synthétique

| Ordre | Ticket | Mode | Statut initial | Priorité | Dépendances principales |
| --- | --- | --- | --- | --- | --- |
| `01` | `CONTENT-VALIDATION-01` | `IMPLEMENT` | `DONE — clôturé le 2026-08-01` | `P0` | LANDING-CORE-01 DONE |
| `01a` | `CONTENT-VALIDATION-01A` | `DISCOVER` | `DONE — Validé CTO 2026-07-31` | `P0` | LANDING-CORE-01 |
| `01b` | `CONTENT-VALIDATION-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `CONTENT-VALIDATION-01A` |
| `01c` | `CONTENT-VALIDATION-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `CONTENT-VALIDATION-01B` |
| `01d` | `CONTENT-VALIDATION-01D` | `IMPLEMENT` | `DONE_WITH_DEFERRED_SCOPE` | `P0` | Hero/logo/Services ; galerie/témoignages différés |
| `01e` | `CONTENT-VALIDATION-01E` | `VERIFY` | `DONE — Validé CTO 2026-08-01` | `P0` | `CONTENT-VALIDATION-01C`, `01D` |
| `01g` | `GALLERY-CONTENT-01` | `IMPLEMENT` | `DONE — clôturé le 2026-08-02` | `P1` | 01A-R1–01E |
| `01ga` | `GALLERY-CONTENT-01A` | `DISCOVER` | `SUPERSEDED` par `01A-R1` | `P1` | — |
| `01gar1` | `GALLERY-CONTENT-01A-R1` | `DISCOVER` | `DONE — Validé CTO 2026-08-02` | `P1` | assets + wording inspirations |
| `01gb` | `GALLERY-CONTENT-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | `01A-R1` |
| `01gc` | `GALLERY-CONTENT-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | `01B` |
| `01gcr1` | `GALLERY-CONTENT-01C-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | `01C` |
| `01gd` | `GALLERY-CONTENT-01D` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | `01C-R1` |
| `01ge` | `GALLERY-CONTENT-01E` | `VERIFY` | `DONE — Validé CTO 2026-08-02` | `P1` | `01D` |
| `01gphr1` | `GALLERY-PAGE-HERO-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | post-clôture `GALLERY-CONTENT-01` |
| `01gdr1` | `GALLERY-DISCLOSURE-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P1` | retrait disclosure public |
| `01fdr1` | `FAQ-DESIGN-R1` | `IMPLEMENT` | `DONE` | `P1` | redesign FAQ (recherche, Hero, portrait) |
| `01fdr1r2` | `FAQ-DESIGN-R1-R2` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P1` | Hero compact + portrait faux-locs |
| `01faer1` | `FAQ-ASSISTANT-EXPRESS-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P1` | sujets express + filtre |
| `01fec` | `FAQ-EXPERIENCE-CHECKPOINT` | `VERIFY + PUBLISH` | `DONE — publié le 2026-08-03` | `P1` | checkpoint groupé FAQ |
| `01fda` | `FOOTER-DESIGN-R1A` | `DISCOVER` | `DONE — Validé CTO 2026-08-03` | `P1` | audit architecture Footer |
| `01fdb` | `FOOTER-DESIGN-R1B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P1` | Footer desktop premium |
| `01fdbr1` | `FOOTER-DESIGN-R1B-R1` | `CORRECTIVE` | `DONE — Validé CTO 2026-08-03` | `P1` | densité / fidélité desktop |
| `01fdc` | `FOOTER-DESIGN-R1C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P1` | mobile disclosures |
| `01fdcr1` | `FOOTER-DESIGN-R1C-R1` | `CORRECTIVE` | `DONE` | `P1` | xl + fallback CSS |
| `01fdcr2` | `FOOTER-DESIGN-R1C-R2` | `CORRECTIVE` | `DONE — compatibilité technique` | `P1` | matchMedia open |
| `01fdcr3` | `FOOTER-DESIGN-R1C-R3` | `CORRECTIVE VISUAL` | `DONE — Validé CTO 2026-08-03` | `P1` | fidélité maquette mobile |
| `01fdd` | `FOOTER-DESIGN-R1D` | `VERIFY` | `DONE — Validé CTO 2026-08-03` | `P1` | QA a11y multi-route |
| `01fde` | `FOOTER-DESIGN-R1E` | `VERIFY + PUBLISH` | `DONE — Validé CTO 2026-08-03` | `P1` | checkpoint Footer |
| `01hha` | `HEADER-HERO-DESIGN-R1A` | `DISCOVER` | `DONE — Validé CTO 2026-08-03` | `P0` | audit Header + Hero |
| `01hhb` | `HEADER-HERO-DESIGN-R1B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P0` | WebP r2 + copy typée |
| `01hhc` | `HEADER-HERO-DESIGN-R1C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P0` | Header overlay + Hero desktop |
| `01hhcr1` | `HEADER-HERO-DESIGN-R1C-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P0` | gap Header/eyebrow desktop |
| `01hhd` | `HEADER-HERO-DESIGN-R1D` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-03` | `P0` | mobile + responsive |
| `01hhdr1` | `HEADER-HERO-DESIGN-R1D-R1` | `CORRECTIVE` | `DONE — Validé CTO 2026-08-03` | `P0` | slogan canonique Hero |
| `01hhdr2` | `HEADER-HERO-DESIGN-R1D-R2` | `CORRECTIVE` | `DONE — Validé CTO 2026-08-03` | `P0` | H1 mobile authority |
| `01hhe` | `HEADER-HERO-DESIGN-R1E` | `VERIFY + PUBLISH` | `DONE — publié` | `P0` | QA + checkpoint |
| `01dsr1` | `DEPENDENCY-SECURITY-R1` | `VERIFY + PUBLISH` | `DONE — clôturé le 2026-08-04` | `P0` | remédiation advisories transitifs |
| `01dsr1a` | `DEPENDENCY-SECURITY-R1A` | `DISCOVER` | `DONE — Validé CTO 2026-08-04` | `P0` | audit read-only postcss / brace-expansion |
| `01dsr1b` | `DEPENDENCY-SECURITY-R1B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-04` | `P0` | overrides `8.5.25` / `5.0.9` |
| `01dsr1br1` | `DEPENDENCY-SECURITY-R1B-R1` | `CORRECTIVE` | `SUPERSEDED` sur provenance `CLAUDE.md` | `P0` | restauration erronée |
| `01dsr1br2` | `DEPENDENCY-SECURITY-R1B-R2` | `CORRECTIVE` | `DONE — Validé CTO 2026-08-04` | `P0` | stash `user-intent-remove-claude-md` |
| `01dsr1c` | `DEPENDENCY-SECURITY-R1C-CHECKPOINT` | `VERIFY + PUBLISH` | `DONE — publié le 2026-08-04` | `P0` | commit + push sécurité + BMAD |
| `01cgr1` | `CLAUDE-GOVERNANCE-CLEANUP-R1` | `IMPLEMENT` | `DONE — clôturé le 2026-08-04` | `P0` | suppression volontaire `CLAUDE.md` |
| `01cgr1a` | `CLAUDE-GOVERNANCE-CLEANUP-R1A` | `DISCOVER` | `DONE — Validé CTO 2026-08-04` | `P0` | audit refs / couverture |
| `01cgr1b` | `CLAUDE-GOVERNANCE-CLEANUP-R1B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-04` | `P0` | cleanup refs actives |
| `01cgr1c` | `CLAUDE-GOVERNANCE-CLEANUP-R1C-CHECKPOINT` | `VERIFY + PUBLISH` | `DONE — publié le 2026-08-04` | `P0` | commit + push + drop stash |
| `01nmr1` | `NAVIGATION-MENU-DESIGN-R1` | `IMPLEMENT` | `IN_PROGRESS` | `P0` | menu modale responsive Option A |
| `01nmr1a` | `NAVIGATION-MENU-DESIGN-R1A` | `DISCOVER` | `DONE — Validé CTO 2026-08-04` | `P0` | audit technique menu |
| `01nmr1ar1` | `NAVIGATION-MENU-DESIGN-R1A-R1` | `DISCOVER` | `DONE — Validé CTO 2026-08-04` | `P0` | Visual Gate maquettes |
| `01nmr1b` | `NAVIGATION-MENU-DESIGN-R1B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-04` | `P0` | architecture + a11y foundation |
| `01nmr1c` | `NAVIGATION-MENU-DESIGN-R1C` | `IMPLEMENT` | `IN_PROGRESS — en attente CTO` | `P0` | fidélité visuelle |
| `01nor1r2b` | `NAVIGATION-OVERLAY-R1-R2B` | `CORRECTIVE` | `DONE — Validé CTO 2026-08-04` | `P0` | portrait desktop lisible |
| `01mhnpr1` | `MOBILE-HERO-NAV-POLISH-R1` | `CORRECTIVE` | `DONE — clôturé le 2026-08-04` | `P0` | verre menu + Hero mobile |
| `01mhnpr1r1` | `MOBILE-HERO-NAV-POLISH-R1-R1` | `CORRECTIVE + VISUAL GATE` | `DONE — Validé CTO le 2026-08-04` | `P0` | CTA tablette / actif / copy |
| `01mhnpr1r1vg` | `MOBILE-HERO-NAV-POLISH-R1-R1-VISUAL-GATE` | `VERIFY` | `DONE — PASS le 2026-08-04` | `P0` | gate multi-viewports |
| `01mhnpr1r1cp` | `MOBILE-HERO-NAV-POLISH-R1-R1-CHECKPOINT` | `VERIFY + PUBLISH` | `DONE — publié le 2026-08-04` | `P0` | commit + push Git |
| `01cp01` | `CONSEILS-PREVIEW-01` | `IMPLEMENT` | `DONE — clôturée le 2026-08-08` | `P1` | aperçu Conseils landing |
| `01cp01a` | `CONSEILS-PREVIEW-01A` | `DISCOVER` | `DONE — Validé CTO` | `P1` | audit maquettes + assets |
| `01cp01b` | `CONSEILS-PREVIEW-01B` | `IMPLEMENT` | `DONE — Validé CTO` | `P1` | data + WebP + tests |
| `01cp01c` | `CONSEILS-PREVIEW-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-08` | `P1` | UI Preview sans liens |
| `01cp01cr1` | `CONSEILS-PREVIEW-01C-R1` | `CORRECTIVE VISUAL` | `DONE — remplacé par R2` | `P1` | densité desktop + intro mobile |
| `01cp01cr2` | `CONSEILS-PREVIEW-01C-R2` | `CORRECTIVE VISUAL` | `DONE — portrait et mobile validés CTO` | `P1` | portrait Bantu Knots WebP |
| `01cp01cr3` | `CONSEILS-PREVIEW-01C-R3` | `CORRECTIVE VISUAL` | `DONE — remplacé par DESIGN-R1-R1` | `P1` | composition desktop Galerie→Conseils |
| `01cp01dr1r1` | `CONSEILS-PREVIEW-DESIGN-R1-R1` | `CORRECTIVE VISUAL` | `DONE — Validé CTO 2026-08-08` | `P1` | transition, cartes mobile, PRiMiE, Cas C |
| `01cp01dr1r2` | `CONSEILS-PREVIEW-DESIGN-R1-R2` | `CORRECTIVE VISUAL` | `DONE — Validé CTO 2026-08-08` | `P1` | asset carte 03 deep wave |
| `01cp01d` | `CONSEILS-PREVIEW-01D` | `INTEGRATE` | `CANCELLED — V1 preview sans /conseils` | `P1` | activation liens différée |
| `01cp01e` | `CONSEILS-PREVIEW-01E` | `VERIFY + PUBLISH` | `DONE — checkpoint 2026-08-08` | `P1` | QA + publication Git |
| `01cp01close` | `CONSEILS-PREVIEW-DESIGN-R1-CLOSE` | `VERIFY + PUBLISH` | `DONE — publié origin/main 2026-08-08` | `P1` | clôture feature |
| `01cp01asset` | `CONSEILS-PREVIEW-ASSET-R1` | `CORRECTIVE VISUAL` | `DONE — Validé CTO et publié le 2026-08-08` | `P1` | restaurer soin-perruque carte 03 |
| `01wig` | `WIG-SALES-CONTENT-01` | `IMPLEMENT` | `DONE — clôturé le 2026-08-10` | `P1` | sélection perruques landing |
| `01wiga` | `WIG-SALES-CONTENT-01A` | `DISCOVER` | `DONE — Validé CTO` | `P1` | audit maquettes + assets |
| `01wigb` | `WIG-SALES-CONTENT-01B` | `IMPLEMENT` | `DONE — Validé CTO` | `P1` | data + WebP + tests |
| `01wigc` | `WIG-SALES-CONTENT-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-10` | `P1` | section landing desktop |
| `01wigcr1` | `WIG-SALES-CONTENT-01C-R1` | `CORRECTIVE VISUAL` | `DONE — remplacé` | `P1` | composition densifiée maquette |
| `01wigcr2` | `WIG-SALES-CONTENT-01C-R2` | `CORRECTIVE VISUAL` | `DONE — remplacé par R2-R1` | `P1` | densités, portrait, CTA, PRiMiE |
| `01wigcr2r1` | `WIG-SALES-CONTENT-01C-R2-R1` | `CORRECTIVE VISUAL` | `DONE — Validé CTO 2026-08-10` | `P1` | CTA ≤2 lignes à 320 px |
| `01wigd` | `WIG-SALES-CONTENT-01D` | `IMPLEMENT/VERIFY` | `DONE — Validé CTO 2026-08-10` | `P1` | verify responsive / a11y / browsers |
| `01wige` | `WIG-SALES-CONTENT-01E` | `VERIFY + PUBLISH` | `DONE — publié le 2026-08-10` | `P1` | QA + checkpoint |
| `01wigdr1` | `WIG-SALES-DESIGN-R1` | `CORRECTIVE VISUAL` | `DONE — clôturé le 2026-08-11` | `P1` | refonte maquette desktop/mobile |
| `01wigdr1r1` | `WIG-SALES-DESIGN-R1-R1` | `CORRECTIVE VISUAL` | `DONE — étape intermédiaire` | `P1` | arguments, densité, cartes |
| `01wigdr1r2` | `WIG-SALES-DESIGN-R1-R2` | `CORRECTIVE VISUAL` | `DONE — Validé CTO 2026-08-11` | `P1` | tablette/desktop micro-corrective |
| `01wigdr1d` | `WIG-SALES-DESIGN-R1D` | `VERIFY` | `DONE — Validé CTO 2026-08-11` | `P1` | verify final design gelé |
| `01wigdr1e` | `WIG-SALES-DESIGN-R1E` | `VERIFY + PUBLISH` | `DONE — checkpoint publié le 2026-08-11` | `P1` | checkpoint / clôture |
| `01wigpage` | `WIG-CATALOG-PAGE-01` | `IMPLEMENT` | `NOT OPEN` | `P1` | route `/perruques` |
| `01wigeng` | `WIG-COMMERCE-ENGINE` | `IMPLEMENT` | `BACKLOG — NOT OPEN` | `P2` | panier / paiement / stock |
| `01cpage` | `CONSEILS-PAGE-01` | `IMPLEMENT` | `NOT OPEN` | `P1` | route `/conseils` |
| `01nmr1d` | `NAVIGATION-MENU-DESIGN-R1D` | `VERIFY` | `BLOCKED` | `P0` | a11y / cross-browser / perf |
| `01nmr1e` | `NAVIGATION-MENU-DESIGN-R1E` | `VERIFY + PUBLISH` | `BLOCKED` | `P0` | checkpoint + BMAD |
| `01lega` | `LEGAL-PAGES-01A` | `DISCOVER` | `DONE — Validé CTO` | `P2` | audit juridique read-only |
| `01legb` | `LEGAL-PAGES-01B` | `IMPLEMENT` | `BLOCKED_BUSINESS_INFO` | `P2` | gate données métier Prisca |
| `01legbr1` | `LEGAL-PAGES-01B-R1` | `IMPLEMENT` | `IN_PROGRESS — en attente CTO` | `P2` | architecture légale progressive |
| `01legc` | `LEGAL-PAGES-01C` | `IMPLEMENT` | `BLOCKED par 01B` | `P2` | rédaction mentions légales |
| `01legd` | `LEGAL-PAGES-01D` | `IMPLEMENT` | `BLOCKED par 01B` | `P2` | rédaction confidentialité |
| `01lege` | `LEGAL-PAGES-01E` | `IMPLEMENT` | `BLOCKED par 01B` | `P2` | routes + Footer |
| `01leg` | `LEGAL-PAGES-01` | `IMPLEMENT` | `BLOCKED_BUSINESS_INFO` | `P2` | mentions / confidentialité / CGV |
| `01t` | `TESTIMONIALS-CONTENT-01` | `IMPLEMENT` | `CANCELLED` — décision CTO 2026-08-02 | `P1` | aucun avis authentique publiable |
| `01cb` | `CONTACT-BOOKING-01` | `IMPLEMENT` | `DONE — clôturé le 2026-08-01` | `P0` | CONTENT-VALIDATION-01 DONE |
| `01cba` | `CONTACT-BOOKING-01A` | `DISCOVER` | `DONE — Validé CTO 2026-08-01` | `P0` | — |
| `01cbb` | `CONTACT-BOOKING-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-01` | `P0` | `01A` |
| `01cbc` | `CONTACT-BOOKING-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-01` | `P0` | `01B` |
| `01cbd` | `CONTACT-BOOKING-01D` | `VERIFY` | `DONE — Validé CTO 2026-08-01` | `P0` | `01C` |
| `01cbe` | `CONTACT-BOOKING-01E` | `VERIFY` | `DONE — Validé CTO 2026-08-01` | `P0` | `01D` |
| `01bw` | `BOOKING-WHATSAPP-FLOW-01` | `IMPLEMENT` | `DONE — clôturé le 2026-08-02` | `P0` | CONTACT-BOOKING-01 DONE |
| `01bwa` | `BOOKING-WHATSAPP-FLOW-01A` | `DISCOVER` | `DONE — Validé CTO 2026-08-01` | `P0` | — |
| `01bwb` | `BOOKING-WHATSAPP-FLOW-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-01` | `P0` | `01A` |
| `01bwc` | `BOOKING-WHATSAPP-FLOW-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P0` | `01B` |
| `01bwcr1` | `BOOKING-WHATSAPP-FLOW-01C-R1` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P0` | `01C` |
| `01bwd` | `BOOKING-WHATSAPP-FLOW-01D` | `IMPLEMENT` | `DONE — Validé CTO 2026-08-02` | `P0` | `01C-R1` |
| `01bwe` | `BOOKING-WHATSAPP-FLOW-01E` | `VERIFY` | `DONE — Validé CTO 2026-08-02` | `P0` | `01D` |
| `01be` | `BOOKING-ENGINE-V2` | `IMPLEMENT` | `BACKLOG — NOT OPEN` | `P2` | hors V1 WhatsApp |
| `02` | `INIT-SCAFFOLD-01A` | `DISCOVER` | `DONE` | `P0` | G2 |
| `03` | `INIT-SCAFFOLD-01B` | `IMPLEMENT` | `DONE` | `P0` | `INIT-SCAFFOLD-01A` |
| `04` | `INIT-SCAFFOLD-01C` | `IMPLEMENT` | `DONE — 01C-R4 ACCEPTED` | `P0` | `INIT-SCAFFOLD-01B` + validation CTO |
| `05` | `INIT-SCAFFOLD-01D` | `VERIFY` | `DONE` | `P0` | `INIT-SCAFFOLD-01C` |
| `06` | `INIT-SCAFFOLD-01E` | `VERIFY` | `DONE — Validé CTO 2026-07-30` | `P0` | `INIT-SCAFFOLD-01D` |
| `07` | `FOUNDATION-SYSTEM-01A` | `DISCOVER` | `DONE — Validé CTO 2026-07-30` | `P0` | `INIT-SCAFFOLD-01E` |
| `08` | `FOUNDATION-SYSTEM-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-30` | `P0` | `FOUNDATION-SYSTEM-01A` |
| `09` | `FOUNDATION-SYSTEM-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-30` | `P0` | `FOUNDATION-SYSTEM-01B` |
| `10` | `FOUNDATION-SYSTEM-01D` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-30` | `P0` | `FOUNDATION-SYSTEM-01B`, `FOUNDATION-SYSTEM-01C` |
| `11` | `FOUNDATION-SYSTEM-01E` | `VERIFY` | `DONE — Validé CTO 2026-07-30` | `P0` | `FOUNDATION-SYSTEM-01C`, `FOUNDATION-SYSTEM-01D` |
| `12` | `LANDING-SHELL-01A` | `DISCOVER` | `DONE — Validé CTO 2026-07-31` | `P0` | `FOUNDATION-SYSTEM-01` |
| `13` | `LANDING-SHELL-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-SHELL-01A` |
| `14` | `LANDING-SHELL-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-SHELL-01B` |
| `15` | `LANDING-SHELL-01D` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-SHELL-01B`, `LANDING-SHELL-01C` |
| `16` | `LANDING-SHELL-01E` | `VERIFY` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-SHELL-01D` |
| `16b` | `LANDING-CORE-01A` | `DISCOVER` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-SHELL-01` |
| `16c` | `LANDING-CORE-01B` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-CORE-01A` |
| `16d` | `LANDING-CORE-01C` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-CORE-01B` |
| `16e` | `LANDING-CORE-01D` | `IMPLEMENT` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-CORE-01C` |
| `16f` | `LANDING-CORE-01E` | `VERIFY` | `DONE — Validé CTO 2026-07-31` | `P0` | `LANDING-CORE-01D` |
| `17` | `LANDING-HERO-SERVICES-01` | `IMPLEMENT` | `SUPERSEDED par LANDING-CORE-01` | `P0` | — |
| `18` | `WHATSAPP-CONTACT-01` | `IMPLEMENT` | `BLOCKED` | `P0` | ticket 16 |
| `19` | `GALLERY-EXPERIENCE-01` | `IMPLEMENT` | `BLOCKED` | `P0` | tickets 01, 16, assets |
| `20` | `TRUST-CONTENT-01` | `IMPLEMENT` | `BLOCKED` | `P1` | tickets 01, 16 |
| `21` | `SEO-FOUNDATION-01` | `IMPLEMENT` | `BLOCKED` | `P1` | sections stables, domaine partiel |
| `22` | `QA-A11Y-RESPONSIVE-01` | `VERIFY` | `BLOCKED` | `P0` | tickets 16 à 21 |
| `23` | `QA-PERF-SECURITY-01` | `VERIFY` | `BLOCKED` | `P0` | tickets 16 à 21 |
| `24` | `DEPLOY-PREVIEW-01` | `DEPLOY` | `BLOCKED` | `P0` | tickets 22 et 23, autorisation |
| `25` | `RELEASE-PRODUCTION-01` | `DEPLOY` | `BLOCKED` | `P0` | Preview, domaine, mentions, autorisation |
| `26` | `DOC-CLOSURE-01` | `VERIFY` | `BLOCKED` | `P1` | ticket 25 |

`G3` est `Passé` (validation CTO `Kyria — 2026-07-30`). `INIT-SCAFFOLD-01C`
est `DONE` (`01C-R4 — ACCEPTED`). `INIT-SCAFFOLD-01D` est `DONE`.
`G4` est `Passé`. `INIT-SCAFFOLD-01E` est `DONE — Validé CTO 2026-07-30`.
`G5` et `G6` sont `Passé` (clôture `2026-07-30`). `FEATURE-FOUNDATION-V1`
est `DONE` (preuve : commit publié sur `origin/main`). `FOUNDATION-SYSTEM-01`
est `DONE` (clôture `2026-07-30`, preuve : commit d’implémentation
`feat: add PRiMiE foundation system` publié sur `origin/main`).
`LANDING-SHELL-01` est `DONE` (clôturé le `2026-07-31`, preuve : commit
`feat: add PRiMiE landing shell` —
`334372718906f4e5ffdf8e977bcc8f5c6da64ddb` sur `origin/main`).
`LANDING-CORE-01` est `DONE` (clôturé le `2026-07-31`, preuve : commit
`feat: add PRiMiE landing core` —
`ed4dacff6691b013d0ced07a8bc2b7c53ee813dd` sur `origin/main` ;
`01A`–`01E` DONE — Validé CTO 2026-07-31).
`LANDING-HERO-SERVICES-01` est `SUPERSEDED par LANDING-CORE-01`.
PRD actif : `docs/PRD-PRIMIE-V1.md` version `1.3`.
`CONTENT-VALIDATION-01` est `DONE` — clôturé le `2026-08-01`
(`01A`–`01C` / `01C-R1` DONE ; `01D` `DONE_WITH_DEFERRED_SCOPE` ; `01E`
`DONE — Validé CTO 2026-08-01`).
Décision CTO `2026-08-01` : galerie et témoignages retirés des blockers de
`CONTENT-VALIDATION-01` et reportés vers `GALLERY-CONTENT-01` et
`TESTIMONIALS-CONTENT-01` (`BACKLOG — NOT OPEN`).
Textes seed, Hero/logo, Services illustrés et FAQ sont livrés.

### Traçabilité PRD → tickets

| Objectif PRD | User stories | Tickets responsables | Preuves principales |
| --- | --- | --- | --- |
| `OBJ-001` | `US-001`, `US-002` | `LANDING-SHELL-01`, `LANDING-HERO-SERVICES-01` | compréhension, ancres, menu |
| `OBJ-002` | `US-003`, `US-004` | `FOUNDATION-SYSTEM-01C`, `LANDING-HERO-SERVICES-01` | six prestations, CTA |
| `OBJ-003` | `US-005`, `US-006` | `CONTENT-VALIDATION-01`, `GALLERY-EXPERIENCE-01` | droits, grille, lightbox |
| `OBJ-004` | `US-007`, `US-008`, `US-009` | `CONTENT-VALIDATION-01`, `TRUST-CONTENT-01` | sources, avis, FAQ |
| `OBJ-005` | `US-010`, `US-011` | `WHATSAPP-CONTACT-01`, `QA-PERF-SECURITY-01` | URLs et smoke tests |
| `OBJ-006` | toutes | `QA-A11Y-RESPONSIVE-01`, `QA-PERF-SECURITY-01` | QA non fonctionnelle |
| `OBJ-007` | toutes | `INIT-SCAFFOLD-01A` à `01E`, `FOUNDATION-SYSTEM-01A` à `01E`, `DOC-CLOSURE-01` | architecture et documentation |

## 15. Tickets détaillés

### CONTENT-VALIDATION-01 — Qualifier les contenus et assets

**Métadonnées**

- Feature : `FEATURE-CONTENT-V1`
- Mode : `IMPLEMENT`
- Statut : `DONE` — clôturé le `2026-08-01`
- Priorité : `P0`
- Autorité : Prisca — contenu métier ; Kyria — CTO / Product Owner seed
- Ouverture seed PO : `2026-07-31`
- Clôture : `2026-08-01` — `01E` validé CTO ; galerie/témoignages différés vers features futures
- PRD : `docs/PRD-PRIMIE-V1.md` version `1.3`
- Registre : `docs/content/content-register.md`

**Objectif**

Transformer `DEP-001` à `DEP-011` en sources utilisables, refusées ou
explicitement différées sans produire de contenu inventé. Les seed contents PO
peuvent être centralisés avant affichage UI.

#### CONTENT-VALIDATION-01A — Audit et contrat d’acquisition

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-07-31`
- Inclus : inventaire, questionnaire, découpage 01A–01E
- Exclus : contenu inventé, assets, commit

#### CONTENT-VALIDATION-01B — PO seed content contract

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `CONTENT-VALIDATION-01A`
- Inclus : slogan, descriptions services, FAQ prudente, message WA, registre
- Exclus : modification UI, logo/photo, galerie, avis, benefits.ts

#### CONTENT-VALIDATION-01C — Activation UI des seed texts

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `CONTENT-VALIDATION-01B`
- Inclus : slogan Hero, descriptions Services, FAQ `#faq`, WA prérempli booking, nav 5 items
- Exclus : médias, logo, avis, galerie, benefits, horaires
- Itération : `CONTENT-VALIDATION-01C-R1` (`DONE — Validé CTO 2026-07-31` — QA responsive + cible tactile)

#### CONTENT-VALIDATION-01D — Assets publiables du lot contenu (scope différé)

- Mode : `IMPLEMENT`
- Statut : `DONE_WITH_DEFERRED_SCOPE` — Hero et Services publiés ; galerie et témoignages transférés
- Motif (CTO `2026-08-01`) : Hero, logo et Services livrés. Galerie et
  témoignages transférés vers des features futures indépendantes
  (`GALLERY-CONTENT-01`, `TESTIMONIALS-CONTENT-01` — `BACKLOG — NOT OPEN`).
- Dépendances livrées : textes seed, Hero/logo, six illustrations Services
- Sous-ticket : `CONTENT-VALIDATION-01D-HERO` (`DONE`)
- Corrective : `CONTENT-VALIDATION-01D-HERO-R1` (`DONE`)
- Corrective : `CONTENT-VALIDATION-01D-HERO-R2` (`DONE`)
- Checkpoint Hero/logo/art direction autorisé par le CTO le 2026-07-31.
- Sous-ticket : `CONTENT-VALIDATION-01D-SERVICES-ASSETS` (`SUPERSEDED` — ticket initial arrêté sur chemin singulier erroné)
- Corrective : `CONTENT-VALIDATION-01D-SERVICES-ASSETS-R1` (`DONE` — rendu visuel validé CTO 2026-07-31 ; QA finale validée CTO 2026-08-01)
- Décisions produit Services (CTO 2026-07-31 / 2026-08-01) :
  - rendu desktop **3×2** validé ;
  - mobile **une colonne** validé ;
  - tablette **deux colonnes** ;
  - desktop **trois colonnes** ;
  - scroll-snap mobile **abandonné** ;
  - aucune section « Nos réalisations » ;
  - illustrations classées `SERVICE_ILLUSTRATION` ;
  - illustrations **non** présentées comme réalisations réelles.
- Checkpoint Services autorisé par le CTO le 2026-08-01.
- `CONTENT-VALIDATION-01E` : `DONE — Validé CTO 2026-08-01`.
- `CONTENT-VALIDATION-01` : `DONE` — clôturé le `2026-08-01`.

#### GALLERY-CONTENT-01 — Galerie d’inspirations

- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-08-02`
- Priorité : `P1`
- Ouverture : `2026-08-02` (stratégie illustrations temporaires validée CTO)
- Clôture : `2026-08-02` — preuve commit `feat: add PRiMiE inspiration gallery` puis
  `docs: close gallery content feature` sur `origin/main`
- Distinct de : `TESTIMONIALS-CONTENT-01` (`BACKLOG — NOT OPEN`)

**Décision produit (CTO `2026-08-02`)**

- 14 illustrations `ILLUSTRATION_APPROVED_BY_CTO` (pas des réalisations de Prisca) ;
- wording honnête : « Galerie d’inspirations » (interdit « Nos réalisations ») ;
- route `/galerie` ; aperçu landing `#galerie` ;
- sources PNG locales hors suivi (`.git/info/exclude` chemins exacts) ;
- **galerie V1 = illustrations approuvées** ; réalisations réelles évolutives avec droits clientes ;
- **aucune lightbox ouverte** (hors scope) ;
- `TESTIMONIALS-CONTENT-01` reste `BACKLOG — NOT OPEN`.
- runtime WebP sous `public/images/gallery/` ;
- transition future vers de vraies réalisations sans changer la structure data.

##### GALLERY-CONTENT-01A — Discover initial

- Mode : `DISCOVER`
- Statut : `SUPERSEDED` par `GALLERY-CONTENT-01A-R1`
- Motif : `BLOCKED_ASSET` puis livraison assets + arbitrage wording

##### GALLERY-CONTENT-01A-R1 — Audit assets et arbitrage illustrations

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-02`
- Inclus : inventaire 14 PNG, classification, taxonomie, featured, alts, architecture

##### GALLERY-CONTENT-01B — Données et assets WebP

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01A-R1`
- Inclus : types, `content/gallery.ts`, 14 WebP, tests data, registre, BMAD
- Exclus : UI, route `/galerie`, commit

##### GALLERY-CONTENT-01C — Aperçu landing

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01B`
- Inclus : `GalleryPreview` `#galerie`, rail featured ×8, nav « Galerie », disclosure
  (disclosure retiré ensuite via `GALLERY-DISCLOSURE-R1`)
- Exclus à la clôture 01C : CTA `/galerie` (ouvert en 01D), page dédiée, filtres, lightbox, commit

##### GALLERY-CONTENT-01C-R1 — Corrective visuelle rail

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01C`
- Inclus : scrollbar quiet luxury (`.gallery-preview-rail`), alignement initial, titres

##### GALLERY-CONTENT-01D — Page `/galerie`

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01C-R1`
- Inclus : `app/galerie/page.tsx`, filtres ×6, grille ×14, CTA landing `/galerie`, nav multi-route, CTA `/#reserver`
- Exclus : lightbox, carrousel, dépendance npm, commit

##### GALLERY-CONTENT-01E — QA et clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01D`
- Inclus : QA finale, audits, documentation, checkpoint contrôlé (2 commits + push)

##### GALLERY-PAGE-HERO-R1 — Correctif Hero `/galerie` (post-clôture)

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01` DONE (ne rouvre pas 01A–01E)
- Inclus : Hero bandeau compact, portrait WebP alpha `gallery-hero-model-v1.webp`, filtres dans le Hero, composition mobile asymétrique
- Clôture : `2026-08-02` — VISUAL APPROVED CTO, checkpoint publish (commit + push, aucun déploiement)
- Note : `GALLERY-CONTENT-01` reste `DONE` ; `TESTIMONIALS-CONTENT-01` = `CANCELLED` (CTO 2026-08-02) ; `WHY-PRIMIE-01` non ouvert

##### GALLERY-DISCLOSURE-R1 — Retrait disclosure illustration

- Mode : `IMPLEMENT` + `VERIFY` + `PUBLISH`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `GALLERY-CONTENT-01` DONE (ne rouvre pas 01A–01E)
- Décision CTO : supprimer le paragraphe
  « Visuels d’illustration. Les réalisations de Prisca enrichiront progressivement
  cette galerie. » sur `/` et `/galerie`
- Transparence conservée via titre « Galerie d’inspirations », accent
  « Chaque coiffure, une inspiration unique », description (sélection de styles) ;
  aucune attribution des images comme réalisations de Prisca
- Inclus : runtime copy/UI/tests, alignement PRD/registre/BMAD, checkpoint publish
- Exclus : changement d’assets, Hero R1, filtres, CTA, Testimonials, déploiement
- Note : `GALLERY-CONTENT-01` reste `DONE` ; `WHY-PRIMIE-01` non ouvert

#### FAQ-EXPERIENCE — Refonte expérience FAQ

- Mode : `IMPLEMENT` + `VERIFY` + `PUBLISH`
- Statut parent : `DONE — publié le 2026-08-03`
- Dépendances : FAQ canonique livrée via `CONTENT-VALIDATION-01` / `TRUST-CONTENT-01`
- Conservé : cinq Q/R canoniques ; aucune nouvelle donnée métier ; Booking et Footer
  inchangés ; `package.json` / `pnpm-lock.yaml` inchangés
- Actif : recherche accent-insensitive ; Assistant Express (cinq sujets) ;
  filtre + ouverture + focus ; « Voir toutes les questions » ; `details`/`summary`
  natifs ; `id="faq"` unique ; nav Header/Mobile/Footer → `#faq`
- Portrait officiel : `faq-portrait-faux-locs-deesse-v1.webp` (WebP alpha)
- Retiré : ancien panneau pratique (Horaires / Zone / Contact)
- Exclus : déploiement Production / Preview déclenché par ce checkpoint

##### FAQ-DESIGN-R1 — Redesign FAQ

- Mode : `IMPLEMENT`
- Statut : `DONE`
- Inclus : Hero FAQ, recherche, liste filtrable, portrait, chrome UI `faqCopy`

##### FAQ-DESIGN-R1-R2 — Compactage Hero + portrait faux-locs

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : Hero R2 compact ; portrait officiel faux-locs ; typo `font-display` questions

##### FAQ-ASSISTANT-EXPRESS-R1 — Sujets express

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : cinq sujets mappés aux FAQ canoniques ; remplacement du panneau pratique

##### FAQ-EXPERIENCE-CHECKPOINT — Publication groupée

- Mode : `VERIFY` + `PUBLISH`
- Statut : `DONE — publié le 2026-08-03`
- Inclus : commit + push `main` (implémentation + gouvernance BMAD) ; aucun déploiement

#### FOOTER-DESIGN-R1 — Refonte Footer premium

- Mode : `IMPLEMENT` (découpage R1A–R1E)
- Statut parent : `DONE — clôturé le 2026-08-03`
- Composition : reste dans `app/page.tsx` et `app/galerie/page.tsx` (pas `RootLayout`)
- Dette : `LEGAL-PAGES-01` — `BLOCKED_BUSINESS_INFO` (architecture R1 prête ; pas de liens sans routes)
- Dettes transférées : Safari/iOS réel non exécuté ; Lighthouse complet non exécuté

##### FOOTER-DESIGN-R1A — Audit architecture

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : audit maquettes, contenu autorisé/rejeté, découpage R1B–R1E

##### FOOTER-DESIGN-R1B — Desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : 5 colonnes xl, CTA WhatsApp prérempli, inspirations 3×2, bandeau factuel,
  vague SVG, copyright dynamique ; pile temporaire sous xl
- Exclus : disclosures mobile (R1C), commit, déploiement

##### FOOTER-DESIGN-R1B-R1 — Corrective visuelle desktop

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO 2026-08-03`
- Motif : R1B techniquement conforme mais trop vide / trop textuel vs maquette
- Inclus : densification, logo agrandi, CTA renforcé, pictogrammes Contact,
  mosaïque lisible, facts horizontal xl, ornements SVG, vague/bottom peaufinés
- Exclus : R1C disclosures, changement de données métier, commit, déploiement

##### FOOTER-DESIGN-R1C — Mobile / responsive

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : identité centrée, CTA hors disclosures, quatre `details`/`summary` natifs,
  facts stack mobile, vague/bottom mobile, non-régression desktop xl
- Exclus : dépendance, commit, déploiement

##### FOOTER-DESIGN-R1C-R1 — Corrective breakpoint / compatibilité

- Mode : `CORRECTIVE`
- Statut : `DONE`
- Inclus : bascule disclosures `<1280` / grille 5 colonnes `≥1280`, suppression
  composition intermédiaire 1024
- Limite historique : Firefox desktop sans `open` réel (corrigé en R1C-R2)
- Exclus : redesign mobile 320–768, redesign desktop 1280–1440, commit, déploiement

##### FOOTER-DESIGN-R1C-R2 — Corrective cross-browser

- Mode : `CORRECTIVE`
- Statut : `DONE — compatibilité technique`
- Inclus : Client Component minimal `FooterResponsiveGrid`, `matchMedia(1280)`,
  attribut `open` réel, suppression hacks CSS `::details-content`
- Exclus : duplication DOM, dépendance npm, commit, déploiement

##### FOOTER-DESIGN-R1C-R3 — Corrective visuelle mobile

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : états initiaux Contact/Inspirations ouverts, CTA 2 lignes, summaries
  éditoriaux, Contact compact, rail Inspirations horizontal, facts 3 lignes,
  bottom noir décoré, non-régression desktop ≥1280
- Exclus : Testimonials, WHY-PRIMIE, LEGAL-PAGES-01, commit, push, déploiement
- Preuves QA hors dépôt : `%LOCALAPPDATA%\Temp\primie-footer-r1c-r3\`

##### FOOTER-DESIGN-R1D — QA a11y multi-route

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : matrice viewports, Chromium/Firefox/WebKit, clavier/a11y, multi-route,
  resize, hydratation, performance/CLS, smoke production
- Exclus : commit, staging, push, déploiement, refonte visuelle, contenu inventé
- Dette QA transverse non bloquante : Safari/iOS réel non exécuté

##### FOOTER-DESIGN-R1E — Checkpoint / clôture

- Mode : `VERIFY` + `PUBLISH`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : commits Git + push `origin/main` ; clôture BMAD `FOOTER-DESIGN-R1`
- Exclus : déploiement Vercel ; ouverture de feature suivante
- Note : `LEGAL-PAGES-01` reste `NOT OPEN`

#### HEADER-HERO-DESIGN-R1 — Header + Hero R2

##### HEADER-HERO-DESIGN-R1A — Audit

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : audit read-only Header/Hero, sources PNG officielles, copy/valeurs candidates,
  art direction, logo, navigation
- Décisions CTO validées :
  - copy Hero `APPROVED_BY_CTO` (accent gold uniquement sur « sublimée ») ;
  - quatre valeurs marketing `APPROVED_BY_CTO` (non contractuelles) ;
  - CTA secondaire landing → `#galerie` ;
  - valeurs : 2×2 sous 390 px, 4 colonnes dès `min-[390px]` ;
  - logo : initialement `BLOCKED_ASSET_LOGO` ; levé CTO 2026-08-03
    (`BrandLogo` / `primie-logo-v1.webp` = `APPROVED_FOR_HEADER_HERO_R2`)
- Exclus : conversion, UI, commit, déploiement

##### HEADER-HERO-DESIGN-R1B — Assets + copy

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Validé CTO :
  - PNG desktop/mobile intacts, exclus localement par chemins exacts ;
  - WebP R2 dimensions natives, q98, budgets respectés (244,8 Ko / 255,6 Ko) ;
  - métadonnées retirées ; aucune dérive visuelle majeure ;
  - `heroCopy` / `heroValues` / `heroAssetsR2` centralisés ;
  - aucune duplication URL WhatsApp ni href Gallery ;
  - assets et runtime V1 conservés ;
  - 198 tests + suite qualité verts ; package/lock inchangés ;
  - aucun commit, push ou déploiement
- Inclus :
  - exclude local `.git/info/exclude` :
    `/images/Hero/hero-desktop.png`, `/images/Hero/hero-mobile.png` ;
  - WebP runtime :
    `public/images/hero/primie-hero-r2-desktop.webp` (1536×1024, q98, ≤450 Ko),
    `public/images/hero/primie-hero-r2-mobile.webp` (853×1844, q98, ≤350 Ko) ;
  - copy typée `content/hero.ts` + tests `content/hero.test.ts` (non branchés UI) ;
  - quatre valeurs marketing `heroValues` ;
  - assets paths `heroAssetsR2` ;
  - Hero V1 + `hero-highlights.ts` inchangés (runtime public)
- Sources officielles (SHA256) :
  - desktop `c272b52d80b9a64677106f6a828f1a9e70ac2c8e8d442691c46949f118d6634e` ;
  - mobile `b0ce14f275bc05f08985753e81f84174c45cae8b14a039e1e8c32f9d96606498`
- Conversion : `sharp@0.33.5` (transitif Next), sans crop/resize, RGB opaque
- Exclus : Header/Hero UI, import WebP R2, commit, push, déploiement

##### HEADER-HERO-DESIGN-R1C — Header overlay + Hero desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Logo (décision CTO 2026-08-03) :
  - `BLOCKED_ASSET_LOGO` : **LEVÉ** ;
  - logo officiel = `BrandLogo` + `public/brand/logo/primie-logo-v1.webp` ;
  - graphie `PRiMiE` ; aucun nouvel asset ; aucun redessin / silhouette / extraction maquette ;
  - lockup maquette = référence positionnement / taille / équilibre nav seulement ;
  - `APPROVED_FOR_HEADER_HERO_R2` ; pas de ticket `HEADER-HERO-LOGO-R1` ;
  - ajustements CSS dimensions autorisés (ratio intrinsèque, sans déformation ni fond)
- Inclus livré (candidat revue visuelle) :
  - `Header variant="heroOverlay"` sur `/` ; Header solide inchangé sur `/galerie` ;
  - Hero R2 : `heroCopy` + `heroValues` + `heroAssetsR2` ;
  - picture mobile/desktop 1024 ; CTA WA prérempli + `#galerie` ;
  - grille valeurs 2×2 / `min-[390px]:grid-cols-4` ;
  - suppression `content/hero-highlights.ts` (+ test)
- Prérequis R1B : satisfaits
- Exclus R1C : polish mobile pixel-perfect (R1D) ; commit / push / déploiement

##### HEADER-HERO-DESIGN-R1C-R1 — Corrective visuelle desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-03`
- Défaut : eyebrow « Chez PRiMiE Coiffure » partiellement masqué sous Header overlay (gap &lt; 24 px à 1024)
- Inclus : densification verticale Header overlay ; `lg:justify-start` + `lg:pt-36` / `xl:pt-40` Hero ;
  invariant `eyebrow.top >= header.bottom + 24` sur 1024 / 1280 / 1440
- Exclus : crop, gradients, copy, valeurs, mobile polish, commit / push / déploiement

##### HEADER-HERO-DESIGN-R1D — Mobile polish + responsive verify

- Mode : `IMPLEMENT` + `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-03`
- Inclus : polish mobile Header/Hero ; gap Header/eyebrow ≥ 20 px ; grille valeurs 389/390 ;
  CTA empilés ; crop/gradients mobile ; QA matrice + menu + a11y + art direction
- Desktop gelé : conserver composition R1C / R1C-R1 ≥ 1024 px

##### HEADER-HERO-DESIGN-R1D-R1 — Restauration slogan canonique

- Mode : `CORRECTIVE`
- Statut : `DONE — Validé CTO 2026-08-03`
- Motif : slogan temporaire « avec passion » refusé CTO ; restaurer `siteConfig.brand.slogan`
- Inclus : Hero script ivoire 2 lignes via `siteConfig.brand.slogan` ; suppression cœur ;
  retrait `scriptAccent` / `heroCopy.title` ; H1 = slogan

##### HEADER-HERO-DESIGN-R1D-R2 — Micro-correctif H1 mobile

- Mode : `CORRECTIVE`
- Statut : `DONE — Validé CTO 2026-08-03`
- Motif : H1 slogan trop petit sur 320–390 px
- Inclus : hausse taille / leading H1 &lt;768 px ; styles ≥768 px gelés

##### HEADER-HERO-DESIGN-R1E — VERIFY + checkpoint

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié`
- Clôture : `2026-08-03`
- Commit implémentation : `18bf193` — `feat: redesign PRiMiE responsive header hero`
- Commit BMAD : `docs: close header hero design refresh`
- Déploiement : **aucun**
- Dettes transférées :
  - **QA** : Safari / iOS réel non exécuté
  - **Supply-chain** : remédiée dans `DEPENDENCY-SECURITY-R1` (clôturé le `2026-08-04`)

### DEPENDENCY-SECURITY-R1 — Remédiation advisories transitifs

**Métadonnées**

- Feature : `FEATURE-SUPPLY-CHAIN-V1`
- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — clôturé le 2026-08-04`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Clôture : `2026-08-04` — checkpoint publié sans déploiement
- Remédiation : `pnpm.overrides` — `postcss` `8.5.25`, `brace-expansion` `5.0.9`
  (`sharp` inchangé `0.35.3`)
- Audits : `pnpm audit` et `pnpm audit --prod` à zéro
- Commit sécurité : `a34536e` — `fix(deps): patch transitive security advisories`
- Fichiers publiés : `package.json`, `pnpm-lock.yaml` uniquement
- Note : suppression volontaire de `CLAUDE.md` (intention Kyria) conservée dans le
  stash local `user-intent-remove-claude-md` (`D CLAUDE.md`) — audit
  `CLAUDE-GOVERNANCE-CLEANUP-R1A`/`R1B` DONE ; checkpoint `R1C` publié le 2026-08-04 ;
  hors manifeste du checkpoint sécurité

#### DEPENDENCY-SECURITY-R1A — Audit read-only

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : identification advisories `1130709` / `GHSA-fxqj-rqcc-2cmp` (postcss) et
  `1130734` / `GHSA-rgw5-rvv9-x895` (brace-expansion) ; cause `pnpm.overrides`
- Exclus : modification de code, commit

#### DEPENDENCY-SECURITY-R1B — Remédiation overrides

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-04`
- Dépendances : `DEPENDENCY-SECURITY-R1A`
- Inclus : `postcss` `8.5.18` → `8.5.25` ; `brace-expansion` `5.0.8` → `5.0.9` ;
  régénération lockfile ; audits à zéro ; qualité complète
- Exclus : bump Next/React/Tailwind/ESLint ; `pnpm audit fix` ; UI ; BMAD ; commit

##### DEPENDENCY-SECURITY-R1B-R1 — Restauration CLAUDE.md

- Mode : `CORRECTIVE`
- Statut : `SUPERSEDED` sur la provenance `CLAUDE.md` uniquement
- Motif : restauration depuis HEAD contraire à l’intention volontaire de Kyria ;
  remédiation sécurité R1B reste techniquement valide

##### DEPENDENCY-SECURITY-R1B-R2 — Préserver intention utilisateur

- Mode : `CORRECTIVE`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : isolation de la suppression `CLAUDE.md` dans le stash nommé
  `user-intent-remove-claude-md` ; manifeste actif limité à `package.json` +
  `pnpm-lock.yaml`
- Exclus : pop / apply / drop / clear du stash ; commit

#### DEPENDENCY-SECURITY-R1C-CHECKPOINT — Publication

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié le 2026-08-04`
- Dépendances : `DEPENDENCY-SECURITY-R1B-R2`
- Inclus : commit + push sécurité (`package.json`, `pnpm-lock.yaml`) ; mise à jour
  BMAD ; push documentaire
- Exclus : déploiement ; modification ou suppression du stash `user-intent-remove-claude-md`

### CLAUDE-GOVERNANCE-CLEANUP-R1 — Suppression volontaire de CLAUDE.md

**Métadonnées**

- Feature : `FEATURE-GOVERNANCE-CLEANUP`
- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — clôturé le 2026-08-04`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Intention : suppression volontaire de `CLAUDE.md` (Kyria)
- Clôture : checkpoint `R1C` publié le `2026-08-04` — aucun déploiement
- Remplacement : **aucun** fichier racine substitut (`PROJECT.md` / `AI.md` /
  `AGENTS.md` interdits)
- Couverture : aucune règle critique perdue ; règles distribuées entre
  `.cursor/rules/00-project.mdc`, `.claude/rules/**` (dont `do-not-break`),
  skills, tests et documentation
- Références historiques : conservées uniquement pour traçabilité
  (INIT-SCAFFOLD, DEPENDENCY-SECURITY-R1B-*, BMAD-METHOD)

#### CLAUDE-GOVERNANCE-CLEANUP-R1A — Audit

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-04`
- Verdict : `READY_WITH_REFERENCE_CLEANUP`
- Inclus : apply stash sans pop ; inventaire refs ; matrice couverture ; qualité sans impact runtime
- Exclus : modification de refs ; commit

#### CLAUDE-GOVERNANCE-CLEANUP-R1B — Cleanup des références actives

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : skills, rules, docs actives, commentaires content, `.prettierignore` ;
  suppression worktree `D CLAUDE.md`
- Exclus : nouveau fichier racine ; UI ; package/lock ; archives / BMAD-METHOD historique

#### CLAUDE-GOVERNANCE-CLEANUP-R1C-CHECKPOINT — Publication

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié le 2026-08-04`
- Commit cleanup : `chore: remove obsolete Claude project instructions`
- Commit BMAD : `docs: close Claude governance cleanup`
- Inclus : push `origin/main` ; preuve d’absence distante de `CLAUDE.md` ;
  drop explicite du stash `user-intent-remove-claude-md` après vérification
- Exclus : déploiement ; `git stash clear` ; fichier racine substitut

#### NAVIGATION-MENU-DESIGN-R1 — Menu modale responsive

- Mode : `IMPLEMENT` (découpage R1A–R1E)
- Statut : `IN_PROGRESS`
- Décision CTO : Option A — déclencheur Menu tous viewports ; six destinations ;
  pas de réseaux / Avis / À propos ; BrandLogo officiel ; WA prérempli via helper

##### NAVIGATION-MENU-DESIGN-R1A — Audit technique

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : inventaire menu actuel, contrats a11y/multi-route, architecture cible, reco A/B

##### NAVIGATION-MENU-DESIGN-R1A-R1 — Visual Gate

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : ouverture maquettes mobile/desktop ; adaptation éditoriale ; glass layers ;
  Option A confirmée

##### NAVIGATION-MENU-DESIGN-R1B — Architecture + a11y foundation

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : Header fermé ; `ResponsiveNavigationMenu` dialog ; focus trap ; Hero R2 lazy ;
  glass socle ; tests ; pas de pixel-perfect
- Exclus : commit / push / déploiement ; R1C fidélité

##### NAVIGATION-MENU-DESIGN-R1C — Fidélité visuelle

- Mode : `IMPLEMENT`
- Statut : `IN_PROGRESS — en attente CTO`
- Inclus : glass/portrait, densité mobile/desktop, crops Hero, typo/icônes/CTA, Visual Gate
- Exclus : modification contrats a11y/multi-route ; assets Hero ; commit

##### NAVIGATION-OVERLAY-R1-R2B — Corrective portrait desktop

- Mode : `CORRECTIVE`
- Statut : `DONE — Validé CTO 2026-08-04`
- Inclus : séparation nav / éditorial / zone portrait ; voiles localisés ; mini-card retirée
  du desktop (masquait le visage) ; Hero ambiant clarifié à droite ; mobile gelé ;
  Fermer top-right conservé ; état actif route/hash ; Visual Gate PASS
- Exclus : nouvel asset ; Hero fermé ; Header ; staging / commit / push (hors checkpoint)
- Cause racine : voile uniforme + éditorial/mini-card sur la silhouette ; pas un défaut d’asset
- Preuve : runtime frais 3010 ; Playwright Chromium/Firefox/WebKit ; 6 viewports ;
  portrait immédiatement lisible à droite ; `#services` ≠ Accueil ; `/galerie` `aria-current="page"`
- Validation CTO : défauts bloquants levés (portrait + état actif) — 2026-08-04

#### MOBILE-HERO-NAV-POLISH-R1 — Corrective visuelle mobile

- Mode : `CORRECTIVE`
- Statut : `DONE — clôturé le 2026-08-04`
- Inclus : verre fumé menu mobile ; centrage éditorial Hero mobile ; retrait des
  quatre valeurs sous `1024 px` (conservées desktop)
- Exclus : desktop Header/Hero/Overlay R2B ; nouvel asset ; dépendances
- Checkpoint : `b140b77` (`fix: polish PRiMiE responsive hero navigation`)

##### MOBILE-HERO-NAV-POLISH-R1-R1 — Corrective menu + Visual Gate

- Mode : `CORRECTIVE + VISUAL GATE`
- Statut : `DONE — Validé CTO le 2026-08-04`
- Inclus : CTA WhatsApp tablette hors visage (768–1023) ; sync actif route/hash ;
  retrait copy non canonique « Chaque cliente, une reine » ; preuves 375/768/820/912/1023/1024
- Exclus : refonte Hero ; assets R2 ; desktop ≥1024 gelé ; ScrollSpy
- Défauts corrigés :
  - CTA tablette traversant le visage (repositionnement bas gauche, `max-width: 16.5rem`) ;
  - faux état actif Accueil (sync route/hash, hash inconnu → aucun actif) ;
  - voile local tablette limité à la zone navigation ;
  - copy éditoriale non canonique retirée du panneau desktop.
- Preuve Visual Gate : multi-viewports + Chromium/Firefox/WebKit ; `overlap === false`
  sur 768/820/912/1023 ; `/#services` Services actif ; `/galerie` `aria-current="page"`

##### MOBILE-HERO-NAV-POLISH-R1-R1-VISUAL-GATE — VERIFY

- Mode : `VERIFY`
- Statut : `DONE — PASS le 2026-08-04`
- Verdict : `READY FOR CTO VALIDATION` puis validation CTO explicite

##### MOBILE-HERO-NAV-POLISH-R1-R1-CHECKPOINT — PUBLISH

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié le 2026-08-04`
- Commits : implémentation `b140b77` ; documentation (ce fichier)
- Aucun déploiement

#### CONSEILS-PREVIEW-01 — Aperçu Conseils (landing)

- Mode : `IMPLEMENT`
- Statut : `DONE — clôturée le 2026-08-08`
- Placement : GalleryPreview → AdvicePreview (`#conseils`) → FAQ
- Exclus V1 : nav Header/Footer Conseils ; route `/conseils` ; liens cartes
- Checkpoint : `CONSEILS-PREVIEW-DESIGN-R1-CLOSE` publié `origin/main`

##### CONSEILS-PREVIEW-01A — DISCOVER

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO`
- Inclus : audit maquettes desktop/mobile ; 3 PNG `images/conseil/carte-*.png` ;
  copy candidate sans « secrets d’experte » ; stratégie preview sans liens

##### CONSEILS-PREVIEW-01B — DATA + ASSETS

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO`
- Inclus : `content/advice.ts` + types ; 3 WebP `public/images/advice/` ;
  tests data ; exclusions `.git/info/exclude` exactes ; registre contenu
- Décision : réutilisation décorative de `entretien-tresses.webp` (carte-2)
  sans 4ᵉ asset
- Exclus : UI ; routes ; navigation ; commit
- Classification : `ILLUSTRATION_APPROVED_BY_CTO` · `preview_only`

##### CONSEILS-PREVIEW-01C — UI Preview

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-08`
- Placement : GalleryPreview → AdvicePreview (`#conseils`) → FAQ
- Inclus : Server Components `AdvicePreview` + `AdviceCard` ; section statique
  sans liens ni CTA ; portrait Bantu Knots WebP ; carte 03 Gallery deep wave
- Exclus : route `/conseils` ; entrée nav Header/Footer ; « Lire l’article » ;
  CTA « Découvrir tous nos conseils » ; Client Component

##### CONSEILS-PREVIEW-01C-R1 — Corrective visuelle CTO

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — remplacé par R2`
- Note : densité et composition reprises puis remplacées par R2/R3

##### CONSEILS-PREVIEW-01C-R2 — Portrait Bantu Knots & Visual Gate

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — portrait et mobile validés CTO`
- Décision CTO : portrait intro officiel = Bantu Knots
  (`advice-portrait-bantu-knots-v1.webp`) ; `entretien-tresses.webp` reste
  réservé à la carte 02 uniquement

##### CONSEILS-PREVIEW-01C-R3 — Corrective composition desktop

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — remplacé par DESIGN-R1-R1`
- Cible : transition Galerie → Conseils ; grille intro 3 colonnes alignée
  sur les cartes ; titre deux lignes ≥1280 ; densité intro desktop

##### CONSEILS-PREVIEW-DESIGN-R1-R1 — Corrective visuelle et parcours

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO 2026-08-08`
- Inclus : réduction espacements Gallery→Conseils ; cartes mobile lisibles ;
  badges sans collision ; graphie `PRiMiE` (eyebrowLead/Brand) ; Cas C
  `DETAIL_ROUTE_NOT_READY` ; overflow-x-clip

##### CONSEILS-PREVIEW-DESIGN-R1-R2 — Micro-correctif asset Perruques

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO 2026-08-08`
- Inclus : carte 03 → `/images/gallery/perruque-deep-wave.webp` ;
  alt `Perruque aux longues ondulations profondes` ; object-position `50% 22%`
- Note historique : objection packaging alors en vigueur ; remplacée ensuite par
  `CONSEILS-PREVIEW-ASSET-R1` (décision CTO 2026-08-08)
- Verdict : `PASS VISUEL` (à la date de R2)

##### CONSEILS-PREVIEW-01D — INTEGRATE

- Mode : `INTEGRATE`
- Statut : `CANCELLED — V1 preview sans route /conseils`
- Note : activation des liens différée à `CONSEILS-PAGE-01`

##### CONSEILS-PREVIEW-01E — VERIFY / PUBLISH

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — checkpoint 2026-08-08`
- Inclus : QA complète ; commits Git ; push `origin/main` ; aucun déploiement

##### CONSEILS-PREVIEW-DESIGN-R1-CLOSE — Checkpoint final

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié origin/main 2026-08-08`
- Feature parente : `CONSEILS-PREVIEW-01` → `DONE — clôturée le 2026-08-08`
- Exclus : déploiement Vercel ; page Blog/CMS ; route `/conseils`

##### CONSEILS-PREVIEW-ASSET-R1 — Restauration illustration Perruques

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO et publié le 2026-08-08`
- Feature parente : `CONSEILS-PREVIEW-01` / `CONSEILS-PREVIEW-DESIGN-R1` restent `DONE`
- Inclus : carte 03 → `/images/advice/soin-perruque.webp` ; object-position
  `18% 30%` ; alt descriptif non commercial
- Décision : `PRODUCT_VISUAL_AMBIGUITY — ACCEPTED_BY_CTO 2026-08-08`
  Asset utilisé comme illustration éditoriale, sans revendication d’une gamme
  de produits commercialisée.
- Checkpoint : `CONSEILS-PREVIEW-ASSET-R1-CHECKPOINT` publié `origin/main`
- Exclus : déploiement Vercel ; Blog/CMS ; page produits ; e-commerce

#### WIG-SALES-CONTENT-01 — Sélection de perruques

- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-08-10`
- Placement : Services → WigSelection → Gallery → Conseils → FAQ
- Portrait runtime : `/images/services/vente-pose-perruques.webp` (décision CTO R1+)
- Checkpoint : `WIG-SALES-CONTENT-01E-CLOSE` publié `origin/main` le `2026-08-10`
- Distinct de / hors périmètre conservé :
  - Catalogue complet : `NOT OPEN`
  - Commerce / paiement : `NOT OPEN`
  - Prix et stock runtime : `NOT OPEN`
  - Route `/perruques` : `NOT OPEN` (`WIG-CATALOG-PAGE-01`)
  - `WIG-COMMERCE-ENGINE` : `BACKLOG — NOT OPEN`

##### WIG-SALES-CONTENT-01A — DISCOVER

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO`
- Inclus : audit maquettes desktop/mobile ; 3 PNG produit ; portrait Gallery Hero

##### WIG-SALES-CONTENT-01B — DATA + ASSETS

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO`
- Inclus : WebP `public/images/wigs/*` ; `content/wigs.ts` ; types ; tests ;
  familles Vietnam / Inde / Gamme classique ; messages WhatsApp ; aucun prix
- Décision CTO : « Normale » → label public `Gamme classique` (`kind: "range"`) ;
  aucun mapping produit ↔ famille ; runtime sans `Naturel` / matière inventée
- Exclus : UI ; route `/perruques` ; navigation ; staging / commit / push / deploy

##### WIG-SALES-CONTENT-01C — UI Landing desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-10`
- Inclus : `WigSelection` + `WigCard` Server Components ; branchement
  Services → WigSelection → Gallery ; CTA WhatsApp ; pas de CTA catalogue
- Note : correctives R1 / R2 / R2-R1 validées CTO 2026-08-10

##### WIG-SALES-CONTENT-01C-R1 — Corrective visuelle stricte

- Mode : `IMPLEMENT + VISUAL GATE`
- Statut : `DONE — remplacé`
- Inclus : composition intro texte|portrait densifiée ; valeurs 4 cols ;
  cartes horizontales compactes ; décor premium léger
- Note : bandeau facts retiré ; portrait `vente-pose-perruques.webp` ; remplacé par R2

##### WIG-SALES-CONTENT-01C-R2 — Corrective visuelle ciblée

- Mode : `IMPLEMENT + VISUAL GATE`
- Statut : `DONE — remplacé par R2-R1`
- Inclus : densifier transitions ; portrait desktop ; CTA compact ; graphie `PRiMiE` ;
  `Vietnam & Inde` (CONFIRMED_BY_PRISCA)

##### WIG-SALES-CONTENT-01C-R2-R1 — Micro-correctif CTA 320 px

- Mode : `IMPLEMENT + VISUAL GATE`
- Statut : `DONE — Validé CTO 2026-08-10`
- Inclus : découpage contrôlé du CTA en 2 lignes sous 390 px ; police ≥12 px

##### WIG-SALES-CONTENT-01D — VERIFY responsive / a11y / cross-browser

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-10`
- Inclus : matrice 8 viewports ; Chromium/Firefox/WebKit ; WhatsApp ; a11y ;
  smoke prod ; correctif unique police CTA ≥12 px dès 1024
- Décision CTO : rendu validé ; cartes empilées sous `1024px` ; grille 3 cols dès
  `1024px` ; espacement Galerie accepté ; aucun micro-correctif UI supplémentaire
- Exclus : redesign ; catalogue ; déploiement

##### WIG-SALES-CONTENT-01E — VERIFY / PUBLISH

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié le 2026-08-10`
- Inclus : gel fonctionnel ; qualité complète ; smoke prod 3010 ; deux commits
  séparés (`feat` puis `docs`) sur `main` ; aucun déploiement
- Dette transférée : Safari/iOS physique zoom 200 % (documentaire, non bloquant)

##### WIG-SALES-DESIGN-R1 — Corrective visuelle maquette

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — clôturé le 2026-08-11`
- Relation : postérieure à `WIG-SALES-CONTENT-01` (`DONE`) — ne rouvre pas l’historique
- Inclus : composition éditoriale ample ; portrait dominant ; cartes premium ;
  CTA global WhatsApp ; bandeau trust factuel ; tests négatifs anti-claims
- Exclus : prix / longueurs / matière / livraison / paiement / retour inventés ;
  route `/perruques`
- Clôture : checkpoint `WIG-SALES-DESIGN-R1E` publié le 2026-08-11
  (deux commits `feat` puis `docs` sur `main` ; aucun déploiement)

##### WIG-SALES-DESIGN-R1-R1 — Corrective visuelle stricte

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — étape intermédiaire`
- Inclus : arguments/trust `2×2` mobile sûrs ; portrait plus présent ;
  densité desktop réduite ; ratios cartes ; 3 cols dès `xl` ; mesures DOM
- Exclus : invention commerciale ; publication Git

##### WIG-SALES-DESIGN-R1-R2 — Micro-corrective tablette/desktop

- Mode : `CORRECTIVE VISUAL`
- Statut : `DONE — Validé CTO 2026-08-11`
- Inclus : trunc arguments = 0 (2×2 jusqu’à xl) ; CTA produit ≤2 lignes ;
  ratio contenu cartes élargi ; gap args→cartes 16–24 px ; pb WIG resserré
  vers Gallery ; hauteurs cartes égalisées
- Exclus : refonte mobile R1-R1 ; invention commerciale ; GalleryPreview
- Design gelé après validation CTO

##### WIG-SALES-DESIGN-R1D — VERIFY final

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-11`
- Inclus : matrice responsive 9 viewports ; frontière 1279→1280 ;
  WhatsApp ; a11y clavier ; cross-browser Chromium/Firefox/WebKit ;
  assets WebP ; qualité complète ; smoke prod
- Exclus : refonte visuelle ; changement de breakpoints gelés
- Dette documentaire : Safari/iOS physique non bloquant

##### WIG-SALES-DESIGN-R1E — Checkpoint / clôture

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — checkpoint publié le 2026-08-11`
- Inclus : commit implémentation WIG ; commit documentation BMAD ;
  push `origin/main` ; vérification SHA local/origin/ls-remote
- Exclus : déploiement ; amend ; force push ; mise à jour dépendances

#### WIG-CATALOG-PAGE-01 — Page catalogue `/perruques`

- Mode : `IMPLEMENT`
- Statut : `NOT OPEN`

#### WIG-COMMERCE-ENGINE — Moteur e-commerce

- Mode : `IMPLEMENT`
- Statut : `BACKLOG — NOT OPEN`

#### LEGAL-PAGES-01 — Pages légales

- Mode : `IMPLEMENT` (découpage 01A–01E)
- Statut parent : `DEFERRED_PENDING_BUSINESS_INFO` — non bloquant pour le projet
- Architecture progressive R1 implémentée ; publication publique toujours bloquée
- Exclus : routes `/mentions-legales`, `/confidentialite`, `/cgv` ; liens Footer ;
  CGV génériques ; confirmation Vercel avant déploiement réel

##### LEGAL-PAGES-01A — Audit juridique read-only

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO`
- Inclus : obligations identifiées ; questionnaire Prisca ; aucun fichier modifié
- Verdict : `BLOCKED_BUSINESS_INFO`

##### LEGAL-PAGES-01B — Gate données métier

- Mode : `IMPLEMENT`
- Statut : `BLOCKED_BUSINESS_INFO`
- Inclus : matrice 42 champs ; CGV `BLOCKED_LEGAL_SCOPE` ; gate obligatoire avant contenu public
- Exclus : création `content/legal.ts` (reporté à R1)

##### LEGAL-PAGES-01B-R1 — Architecture légale progressive non publique

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO`
- Inclus : `content/legal.ts`, `lib/legal-readiness.ts`, tests ; union `confirmed` /
  `pending` ; inventaire technique ; Vercel candidat ; `getLegalReadiness()` ;
  `getPublishableLegalContent()` non branché UI
- Exclus : pages publiques ; Footer ; Booking ; WhatsApp ; déploiement ; commit
- Blockers restants : identité légale, SIREN/SIRET, adresse, email, domaine,
  hébergeur confirmé, médiateur, règles commerciales, conservation WhatsApp

##### LEGAL-PAGES-01B-R2 — Consolidate & defer (couche data uniquement)

- Mode : `IMPLEMENT / VERIFY`
- Statut : `DONE — Validé CTO, consolidation partielle`
- Inclus : consolidation des faits confirmés (identité publique, réservation,
  paiements, vente de perruques seules via WhatsApp, confidentialité métier, absence
  de médiateur) ; maintien du reste en `pending` ; publication publique toujours
  bloquée via readiness
- Exclus : pages publiques ; Footer ; Booking ; WhatsApp ; déploiement ; commit
- Blockers restants : statut juridique, SIREN/SIRET, adresse, email, domaine,
  hébergeur confirmé, médiation complète, mécanismes de conformité prospection

##### LEGAL-PAGES-01B-R2-R1 — Micro-corrective modeling (couche data uniquement)

- Mode : `IMPLEMENT / VERIFY`
- Statut : `DONE — Validé CTO, modèle corrigé`
- Inclus : médiation séparée via `selectionStatus=not_selected` (nom médiateur
  reste `pending`), prospection promo via champs marketing dédiés
  (`marketingConsentMechanism`, `marketingOptOutMechanism`,
  `marketingInformationNotice` en `pending`)
- Exclus : pages publiques ; Footer ; Booking ; WhatsApp ; déploiement ; commit

##### LEGAL-PAGES-01C — Rédaction mentions légales

- Mode : `IMPLEMENT`
- Statut : `DEFERRED — NOT OPEN`

##### LEGAL-PAGES-01D — Rédaction confidentialité

- Mode : `IMPLEMENT`
- Statut : `DEFERRED — NOT OPEN`

##### LEGAL-PAGES-01E — Routes et Footer

- Mode : `IMPLEMENT`
- Statut : `DEFERRED — NOT OPEN`

- Statut : `BACKLOG — NOT OPEN`
- Note : panier, checkout, paiement, stock — hors V1 WhatsApp

#### CONSEILS-PAGE-01 — Page Conseils

- Mode : `IMPLEMENT`
- Statut : `NOT OPEN`
- Note : non ouverte par le Preview V1 ; maquettes page requises

##### NAVIGATION-MENU-DESIGN-R1D — VERIFY

- Mode : `VERIFY`
- Statut : `BLOCKED` (après validation R1C)

##### NAVIGATION-MENU-DESIGN-R1E — PUBLISH

- Mode : `VERIFY + PUBLISH`
- Statut : `BLOCKED`

#### TESTIMONIALS-CONTENT-01 — Témoignages

- Mode : `IMPLEMENT`
- Statut : `CANCELLED` — décision CTO `2026-08-02`
- Motif : absence d’avis clients authentiques publiables ; aucune donnée inventée ;
  section « Elles me font confiance » retirée de la V1
- Distinct de : `WHY-PRIMIE-01` (`NOT OPEN`)

##### TESTIMONIALS-CONTENT-01A — Audit readiness

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-02` (audit NOT READY)
- Inclus : maquettes desktop/mobile, inventaire Olive/Octavie/Annaelle/Plamédie (pistes seules),
  asset gate, modèle proposé, découpage 01A–01E
- Exclus : UI, données inventées, commit

##### TESTIMONIALS-CONTENT-01B — Données + assets

- Mode : `IMPLEMENT`
- Statut : `CANCELLED` — précédé de `BLOCKED_CONTENT` (0/3 quotes exacts), puis abandon CTO
- Inclus tenté : gate contenu/assets sans invention
- Exclus : UI, fabrication d’avis, commit

##### TESTIMONIALS-CONTENT-01C–01E

- Statut : `CANCELLED` (bloqués par abandon feature) — ne pas ouvrir

##### TESTIMONIALS-CONTENT-01-CANCEL-CHECKPOINT

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — Validé CTO 2026-08-02`
- Inclus : cleanup runtime/nav/types/tests, docs/rules/skills, commit + push,
  aucun déploiement
- Note skills : ordres de page et sources `testimonials.ts` corrigés — aucune
  instruction active ne demande de créer Testimonials sur PRiMiE V1

**Retour futur** : uniquement après décision CTO + avis réels + consentements.

#### CONTENT-VALIDATION-01E — Package validé et readiness de clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `CONTENT-VALIDATION-01C`, `CONTENT-VALIDATION-01D` (`DONE_WITH_DEFERRED_SCOPE`)

**Décision de clôture (CTO `2026-08-01`)**

- contenus textuels validés et publiés ;
- Hero desktop/mobile publié ;
- logo publié ;
- pictogrammes publiés ;
- six illustrations Services publiées ;
- galerie absente et masquée ;
- témoignages absents et masqués ;
- aucun placeholder ;
- features futures non ouvertes (`GALLERY-CONTENT-01`, `TESTIMONIALS-CONTENT-01`) ;
- validation CTO du `2026-08-01`.

**Inclus**

- inventaire des assets et textes livrés (Hero, logo, Services, FAQ, WA) ;
- statut et autorité de chaque contenu publié ou différé ;
- stratégie de report galerie/témoignages vers features futures ;
- seed contents PO centralisés et testés ;
- QA finale et readiness de clôture feature ;
- mise à jour des dépendances du BMAD.

**Exclus**

- retouche destructive ;
- ajout de galerie, témoignages ou placeholders ;
- ouverture de `GALLERY-CONTENT-01` / `TESTIMONIALS-CONTENT-01` ;
- faux avis ou fausses réalisations.

**Critères d’acceptation**

- [x] chaque dépendance livrée possède un statut et une autorité ;
- [x] chaque média publié possède une classification honnête ;
- [x] galerie et témoignages sont absents de la page et reportés en backlog ;
- [x] les formulations seed PO sont distinguées des contenus différés ;
- [x] les contenus absents possèdent une stratégie approuvée (DEFERRED) ;
- [x] rapport `01E` validé par le CTO avant clôture feature / commit.

**Preuves attendues**

Registre de contenus, QA production, rapport `CONTENT-VALIDATION-01E`,
commit de clôture `chore: close PRiMiE content validation`.

### CONTACT-BOOKING-01 — Fusion Réservation et Contact

**Métadonnées**

- Feature : `FEATURE-CONTACT-BOOKING-V1`
- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-08-01`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Ouverture : `2026-08-01`
- Clôture : `2026-08-01`
- PRD : `docs/PRD-PRIMIE-V1.md` version `1.3`

**Objectif**

Fusionner les sections Booking et Contact en une section visuelle premium
WhatsApp V1, sans calendrier ni formulaire.

#### CONTACT-BOOKING-01A — Audit

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-01`
- Inclus : audit Booking/Contact, architecture fusionnée, ancres, backlog moteur

#### CONTACT-BOOKING-01B — Fusion desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `CONTACT-BOOKING-01A`
- Inclus : Server Component unique, `#reserver` + `#contact`, grille desktop 2 panneaux,
  stack mobile, CTA prérempli + WA Contact plain, tests
- Exclus : calendrier, formulaire, BOOKING-ENGINE-V2

#### CONTACT-BOOKING-01C — Accordéon mobile

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `CONTACT-BOOKING-01B`
- Inclus : `details`/`summary` natifs sous `lg`, CTA hors panels, `#contact` atteignable,
  contenu forcé visible à `lg`, tests et QA
- Exclus : Client Component, calendrier, formulaire, clôture feature

#### CONTACT-BOOKING-01D — Navigation, accessibilité, QA

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `CONTACT-BOOKING-01C`
- Inclus : audit structurel, navigation, a11y clavier, matrice responsive, WhatsApp,
  Server/Client, tests renforcés, QA production
- Exclus : redesign, calendrier, formulaire, clôture feature, BOOKING-ENGINE-V2

#### CONTACT-BOOKING-01E — Clôture et checkpoint

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `CONTACT-BOOKING-01D`
- Inclus : audit final lot 01B–01D, cohérence docs, manifeste checkpoint préparé,
  QA production de clôture
- Exclus : exécution du commit, push, déploiement, ouverture BOOKING-ENGINE-V2,
  clôture feature sans validation CTO

**Décision produit (PRD 1.3)** : les exigences des §20 Réserver et §21 Contact
(CTA WhatsApp, numéro canonique, absence de formulaire / données non confirmées)
sont satisfaites par la section visuelle unique `ContactBooking`, tout en
conservant les ancres `#reserver` et `#contact`. Le PRD n’est pas modifié en 01E ;
aucune incrémentation de version.

**Trace de clôture (`2026-08-01`)** :

- Réservation et Contact fusionnés dans `ContactBooking` ;
- WhatsApp reste le moteur V1 (prérempli `#reserver`, plain `#contact`) ;
- deux ancres conservées (`#reserver`, `#contact`) ;
- disclosures mobiles natifs (`details`/`summary`) ;
- aucun calendrier ni formulaire ;
- aucun déploiement ;
- prochaine feature non ouverte (`GALLERY-CONTENT-01`, `TESTIMONIALS-CONTENT-01`,
  `BOOKING-ENGINE-V2` restent `BACKLOG — NOT OPEN`).

#### BOOKING-ENGINE-V2 — Moteur de réservation (futur)

- Mode : `IMPLEMENT`
- Statut : `BACKLOG — NOT OPEN`
- Inclus futur : disponibilités, calendrier, créneaux, fuseau, anti-conflits,
  interface Prisca, stockage, confirmations, RGPD
- Exclus immédiat : hors parcours WhatsApp V1

### BOOKING-WHATSAPP-FLOW-01 — Demande de RDV WhatsApp (calendrier + formulaire)

**Métadonnées**

- Feature : `FEATURE-BOOKING-WHATSAPP-FLOW-V1`
- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-08-02`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Ouverture : `2026-08-01`
- Clôture : `2026-08-02`
- PRD : `docs/PRD-PRIMIE-V1.md` version `1.3`
- Distinct de : `CONTACT-BOOKING-01` (DONE historique) et `BOOKING-ENGINE-V2` (BACKLOG — NOT OPEN)

**Objectif**

Remplacer progressivement la simplification visuelle `ContactBooking` par un module
de **demande** de rendez-vous (calendrier, créneaux, formulaire, résumé, message
WhatsApp dynamique), sans confirmer automatiquement une réservation ni ouvrir
`BOOKING-ENGINE-V2`.

#### BOOKING-WHATSAPP-FLOW-01A — Discover / cadrage

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-08-01`
- Inclus : audit maquettes, décisions fuseau/créneaux/horizon, découpage 01B–01E

#### BOOKING-WHATSAPP-FLOW-01B — Moteur pur

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-01`
- Dépendances : `BOOKING-WHATSAPP-FLOW-01A`
- Inclus : `content/booking.ts`, `lib/booking/*` (calendrier, validation, message),
  types, tests déterministes
- Exclus : UI calendrier/formulaire, Client Component, backend, commit, ouverture 01C

#### BOOKING-WHATSAPP-FLOW-01C — UI desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `BOOKING-WHATSAPP-FLOW-01B`
- Inclus : `BookingRequestWidget` Client, composition desktop 3 colonnes, branchement
  moteur 01B, formulaire, résumé, CTA WhatsApp dynamique, bandeau `#contact`
- Exclus : accordéon mobile final, progression par étapes, clôture, commit, 01D

#### BOOKING-WHATSAPP-FLOW-01C-R1 — Corrective visuelle desktop

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `BOOKING-WHATSAPP-FLOW-01C`
- Inclus : densité verticale, titre créneaux, bandeau informations, CTA disabled DA,
  logo desktop, contour principal — sans changement moteur / WhatsApp
- Exclus : accordéon mobile, 01D, clôture 01C, commit

#### BOOKING-WHATSAPP-FLOW-01D — UI mobile

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `BOOKING-WHATSAPP-FLOW-01C-R1`
- Inclus : parcours déroulant 4 étapes sous `lg`, même état que desktop, bandeau `#contact`
- Exclus : redesign desktop, moteur 01B, stockage, commit, ouverture 01E

#### BOOKING-WHATSAPP-FLOW-01E — QA / clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-08-02`
- Dépendances : `BOOKING-WHATSAPP-FLOW-01D`
- Inclus : polish UX final (verrouillage étapes, typo actions), QA complète FLOW,
  captures, qualité, rapport de clôture candidat
- Exclus : déploiement, BOOKING-ENGINE-V2, ouverture Gallery/Testimonials

### INIT-SCAFFOLD-01A — Audit initial du socle

**Métadonnées**

- Feature : `FEATURE-FOUNDATION-V1`
- Mode : `DISCOVER`
- Statut : `DONE`
- Priorité : `P0`
- Autorité : Kyria — CTO

**Objectif**

Établir l’état réel du projet avant initialisation Next.js et déterminer si
la normalisation de gouvernance peut démarrer sans risque.

**Résultat**

Rapport `INIT-SCAFFOLD-01A` produit en lecture seule ; verdict `NO-GO` levé par
les décisions CTO du ticket `INIT-SCAFFOLD-01B`.

### INIT-SCAFFOLD-01B — Normalisation gouvernance et initialisation Git

**Métadonnées**

- Feature : `FEATURE-FOUNDATION-V1`
- Mode : `IMPLEMENT`
- Statut : `DONE`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Validation CTO : `Kyria — 2026-07-30`

**Objectif**

Lever les blocages de l’audit : PRD canonique, archive, chemins de gouvernance,
validation G2 dans le BMAD et `git init -b main` local sans commit ni remote.

**Inclus**

- déplacement du PRD v1.0 vers `docs/PRD-PRIMIE-V1.md` ;
- archivage du PRD v0.9 ;
- normalisation historique de `CLAUDE.md` (fichier depuis retiré le 2026-08-04) et
  `00-project.mdc` ;
- mise à jour BMAD G2 / tickets `01A`–`01E` ;
- initialisation Git locale sur `main`.

**Exclus**

- scaffold Next.js ;
- `package.json`, `app/`, dépendances ;
- commit, remote, push ;
- promotion de `INIT-SCAFFOLD-01C` en `READY` ;
- passage de `G3`.

**Critères d’acceptation**

- [x] PRD canonique v1.0 en place et doublon `(1)` retiré ;
- [x] archive v0.9 créée ;
- [x] `CLAUDE.md` (présent à l’époque ; retiré volontairement le 2026-08-04) et
  `00-project.mdc` aux chemins canoniques ;
- [x] BMAD en version `1.0`, G2 passé ; G3 passé après validation CTO de `01B` ;
- [x] dépôt Git local sur `main` sans commit ni remote ;
- [x] aucun scaffold applicatif créé dans ce ticket.

### INIT-SCAFFOLD-01C — Scaffold Next.js 15

**Métadonnées**

- Feature : `FEATURE-FOUNDATION-V1`
- Mode : `IMPLEMENT`
- Statut : `DONE — 01C-R4 ACCEPTED`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Validation CTO préalable : `Kyria — 2026-07-30` (ouverture du ticket)
- Clôture CTO : `01C-R4 — ACCEPTED`

**Objectif**

Créer une application Next.js 15 minimale dans `PRIMIE/` / `primie/`, sans
monorepo, sans `src/` et sans fonctionnalité métier.

**Inclus**

- `package.json`, App Router, TypeScript strict, Tailwind et ESLint ;
- scripts `dev`, `build`, `lint` et `typecheck` ;
- page minimale sémantique sans contenu inventé ;
- `.gitignore` protégeant les fichiers locaux et secrets ;
- audit des versions et dépendances réellement installées.

**Exclus**

- sections définitives ;
- shadcn/ui, Framer Motion ou tests ajoutés sans justification ;
- commit, push ou déploiement ;
- changement des règles de gouvernance hors nécessité démontrée.

**Critères d’acceptation**

- [x] Next.js reste sur la majeure `15` ;
- [x] TypeScript strict est actif ;
- [x] `app/` est à la racine et `src/` est absent ;
- [x] aucun secret ou `.env` n’est suivi ;
- [x] le nombre de dépendances est minimal et audité ;
- [x] lint, typecheck et build passent ;
- [x] les commandes et versions exécutées sont consignées ;
- [x] itération `01C-R4` acceptée (casse NTFS `primie`, runtime OK).

**Fichiers probables**

`package.json`, `pnpm-lock.yaml`, `app/`, `tsconfig.json`, `next.config.ts`,
`postcss.config.*`, `eslint.config.*`, `.gitignore`.

### INIT-SCAFFOLD-01D — Qualité, sécurité et dépendances

**Métadonnées**

- Feature : `FEATURE-FOUNDATION-V1`
- Mode : `VERIFY`
- Statut : `DONE`
- Priorité : `P0`
- Autorité : Kyria — CTO

**Objectif**

Auditer le socle installé : dépendances, scripts, TypeScript strict, absence de
secrets, `.gitignore` et contrôles de base.

### INIT-SCAFFOLD-01E — Vérification et clôture

**Métadonnées**

- Feature : `FEATURE-FOUNDATION-V1`
- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-07-30`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Clôture CTO : `2026-07-30`

**Objectif**

Clôturer la feature fondation avec preuves lint/typecheck/build, rapport final
et handoff vers `FOUNDATION-SYSTEM-01`, sans élargir le périmètre.

### FOUNDATION-SYSTEM-01 — Fondations de marque, tokens et contenu

**Métadonnées feature**

- Feature : `FOUNDATION-SYSTEM-01`
- Mode : `IMPLEMENT`
- Statut : `DONE`
- Priorité : `P0`
- Autorité : Kyria — CTO / Design
- Ouverture : `2026-07-30`
- Clôture : `2026-07-30`
- Preuve : commit d’implémentation publié sur `origin/main`
  (`feat: add PRiMiE foundation system`)
- Handoff : `LANDING-SHELL-01`

**Objectif feature**

Installer les tokens visuels, les polices, les primitives minimales et la source
de contenu canonique avant les sections, via le découpage `01A`–`01E`.

#### FOUNDATION-SYSTEM-01A — Audit marque, UI et contenu

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-07-30`
- Dépendances : `INIT-SCAFFOLD-01E`

#### FOUNDATION-SYSTEM-01B — Design tokens et typographie

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-30`
- Dépendances : `FOUNDATION-SYSTEM-01A`
- Inclus : `app/theme.css`, polices `next/font`, focus, reduced motion, graphie
  `PRiMiE`, métadonnées commerciales
- Exclus : sections landing, primitives UI, contenu structuré, Allura, npm

#### FOUNDATION-SYSTEM-01C — Contenu structuré

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-30`
- Dépendances : `FOUNDATION-SYSTEM-01B`
- Inclus : `content/` canonique, helper WhatsApp, services confirmés
- Exclus : galerie/avis non validés (masqués), invention de données

#### FOUNDATION-SYSTEM-01D — Primitives UI

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-30`
- Dépendances : `FOUNDATION-SYSTEM-01B`, `FOUNDATION-SYSTEM-01C`
- Inclus : primitives minimales partagées (Container, Section, Heading, Button)
- Exclus : bibliothèque UI complète, shadcn/Framer sans décision CTO

#### FOUNDATION-SYSTEM-01E — QA, documentation et clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-07-30`
- Dépendances : `FOUNDATION-SYSTEM-01C`, `FOUNDATION-SYSTEM-01D`
- Inclus : QA feature, documentation, handoff vers `LANDING-SHELL-01`
- Dette documentaire (traitée dans ce ticket) :
  - Normaliser dans le PRD les six intitulés de services selon do-not-break / `content/services.ts`.

**Critères d’acceptation feature (clôture 01E)**

- [ ] palette et typographies correspondent au PRD / design system ;
- [ ] le numéro et WhatsApp n’existent qu’en source canonique ;
- [ ] les six prestations existent une seule fois ;
- [ ] aucun prix, délai ou disponibilité n’est ajouté ;
- [ ] focus et reduced motion possèdent une base globale ;
- [ ] lint, typecheck, tests ciblés et build passent.

### LANDING-SHELL-01 — Structure, Header, menu mobile et Footer

**Métadonnées feature**

- Feature : `LANDING-SHELL-01`
- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-07-31`
- Priorité : `P0`
- Autorité : Kyria — CTO / Design
- Ouverture : `2026-07-31`
- Clôture : `2026-07-31`
- Preuve d’implémentation : commit `feat: add PRiMiE landing shell` —
  `334372718906f4e5ffdf8e977bcc8f5c6da64ddb` sur `origin/main`
- Handoff : `LANDING-CORE-01` (`DONE — clôturé le 2026-07-31`)

**Objectif feature**

Poser le shell accessible (skip link, Header, menu mobile, Footer) avec ancres
réelles uniquement et navigation filtrée sans lien mort.

#### LANDING-SHELL-01A — Audit du shell et des ancres

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `FOUNDATION-SYSTEM-01`

#### LANDING-SHELL-01B — Header desktop et skip link

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-SHELL-01A`
- Inclus : SkipLink, Header Server, helper `getVisibleNavigation`, CTA WhatsApp
- Exclus : intégration page, menu mobile, Footer, sticky, Client Component

#### LANDING-SHELL-01C — Menu mobile accessible

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-SHELL-01B`
- Inclus : MobileNavigation (Client), tokens z-index, intégration Accueil
- Exclus : Footer, sticky, focus trap, backdrop, sections métier hors Accueil

#### LANDING-SHELL-01D — Footer et intégration du shell

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-SHELL-01B`, `LANDING-SHELL-01C`
- Inclus : Footer Server, composition SkipLink/Header/main/Footer, nav filtrée partagée
- Exclus : sections métier, mentions légales, réseaux sociaux, sticky

#### LANDING-SHELL-01E — QA, documentation et clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-SHELL-01D`
- Inclus : audit shell, a11y, responsive, README, supply chain, rapport de clôture
- Exclus : sections métier, sticky, mentions légales
- Itération : `LANDING-SHELL-01E-R1` (`DONE` — Design Sync palette v1.0) ;
  `LANDING-SHELL-01E-R2` (`DONE — Validé CTO 2026-07-31` — graphie `PRiMiE`)
- Décision marque : graphie officielle `PRiMiE` / `Chez PRiMiE Coiffure` (PRD 1.1)
- Preuve : commit `334372718906f4e5ffdf8e977bcc8f5c6da64ddb`

**Critères d’acceptation feature (clôture 01E)**

- [x] skip link et Header accessibles ;
- [x] menu mobile clavier / Escape / focus ;
- [x] Footer sans invention ;
- [x] aucun lien mort ;
- [x] lint, typecheck, tests et build passent.

### LANDING-CORE-01 — Hero, Services, Réservation et Contact

**Métadonnées feature**

- Feature : `LANDING-CORE-01`
- Mode : `IMPLEMENT`
- Statut : `DONE — clôturé le 2026-07-31`
- Priorité : `P0`
- Autorité : Kyria — CTO
- Ouverture : `2026-07-31`
- Clôture : `2026-07-31`
- PRD : `docs/PRD-PRIMIE-V1.md` version `1.3`
- Remplace : `LANDING-HERO-SERVICES-01` (SUPERSEDED)
- Preuve d’implémentation : commit `feat: add PRiMiE landing core` —
  `ed4dacff6691b013d0ced07a8bc2b7c53ee813dd` sur `origin/main`
- Preuve de publication : push `main → origin/main` le `2026-07-31`
  (`1940519..ed4dacf`)
- Handoff recommandé à la clôture Core : `CONTENT-VALIDATION-01` (désormais
  `DONE` — clôturé le `2026-08-01`) ; suite backlog :
  `GALLERY-CONTENT-01` / `TESTIMONIALS-CONTENT-01` (`BACKLOG — NOT OPEN`)

**Dettes transférées**

- galerie, photos, avis → `GALLERY-CONTENT-01` / `TESTIMONIALS-CONTENT-01`
  (`BACKLOG — NOT OPEN`) ; FAQ et seed textes livrés via `CONTENT-VALIDATION-01` ;
- message WhatsApp prérempli → publié (Header / Hero / Booking) ;
- majeures npm disponibles (Next 16, etc.) → hors périmètre V1 ;
- QA Safari / VoiceOver réels → tickets QA transverses.

#### LANDING-CORE-01A — Audit Hero / Services / Réservation / Contact

- Mode : `DISCOVER`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-SHELL-01`

#### LANDING-CORE-01B — Hero CSS premium

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-CORE-01A`
- Inclus : Hero Server, `bg-hero`, contenu canonique, CTA WhatsApp sans message, décorations CSS
- Exclus : photo, logo, slogan, sections métier suivantes

#### LANDING-CORE-01C — Services

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-CORE-01B`
- Inclus : section `#services`, six titres canoniques, CTA secondaire Hero, nav Accueil+Services
- Exclus : descriptions, prix, images, CTA par carte, Réserver/Contact

#### LANDING-CORE-01D — Réservation WhatsApp + Contact + navigation

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-CORE-01C`
- Inclus : `#reserver`, `#contact`, nav Accueil/Services/Réserver/Contact
- Exclus : message prérempli, horaires, adresse, réseaux, formulaire, galerie/avis/FAQ

#### LANDING-CORE-01E — QA, documentation et readiness de clôture

- Mode : `VERIFY`
- Statut : `DONE — Validé CTO 2026-07-31`
- Dépendances : `LANDING-CORE-01D`
- Inclus : QA structure/contenu/a11y/responsive, README CORE, supply chain, rapport
- Exclus : nouvelles sections métier, assets inventés

**Critères d’acceptation feature (clôture 01E)**

- [x] Hero, Services, Booking, Contact rendus dans l’ordre CORE ;
- [x] navigation Accueil / Services / Réserver / Contact sans ancre morte ;
- [x] graphie `PRiMiE`, WhatsApp sans `?text=`, téléphone canonique ;
- [x] aucun prix, description inventée, image, galerie, avis, FAQ ;
- [x] contraste bronze sur ivoire pour labels Contact et numéros Services ;
- [x] unique Client Component du parcours : `MobileNavigation` ;
- [x] 78 tests verts ; lint, typecheck, build et check passent ;
- [x] commit et push d’implémentation publiés sur `origin/main`.

### LANDING-HERO-SERVICES-01 — Implémenter Hero et Services

**Métadonnées**

- Feature : `FEATURE-LANDING-V1`
- Mode : `IMPLEMENT`
- Statut : `SUPERSEDED par LANDING-CORE-01`
- Priorité : `P0`
- Autorité : Prisca — copy ; Kyria — UX/UI
- Remplacé par : `LANDING-CORE-01` (`01A`–`01E`) — décision CTO `2026-07-31`

**Objectif**

Faire comprendre l’activité dès le premier écran et présenter exactement les
six prestations validées.

**Inclus**

- Hero avec identité, proposition de valeur validée et CTA réels ;
- visuel autorisé avec cadrage responsive ;
- CTA secondaire vers `#galerie` ;
- six cartes Services alimentées par `content/services.ts` ;
- CTA de demande d’information sans promesse de réservation.

**Exclus**

- prix, durées, disponibilités, statistiques ou certifications ;
- image non tracée ;
- duplication de contenu ;
- carrousel de services inutile.

> Historique conservé. Ne plus exécuter ce ticket : le périmètre est repris par
> `LANDING-CORE-01B` (Hero), `LANDING-CORE-01C` (Services) et la suite CORE.

**Critères d’acceptation**

- [ ] `Chez PRiMiE Coiffure` et l’activité sont compréhensibles immédiatement ;
- [ ] le CTA principal mentionne WhatsApp ;
- [ ] le CTA secondaire mène à la galerie ;
- [ ] les six prestations validées sont présentes ;
- [ ] le texte reste lisible sur l’image aux viewports requis ;
- [ ] aucune promesse inconnue n’est rendue.

### WHATSAPP-CONTACT-01 — Implémenter Réserver, Contact et parcours WhatsApp

**Métadonnées**

- Feature : `FEATURE-WHATSAPP-V1`
- Mode : `IMPLEMENT`
- Statut : `BLOCKED par LANDING-SHELL-01`
- Priorité : `P0`
- Autorité : Prisca — message ; Kyria — validation technique

**Objectif**

Permettre l’ouverture fiable du bon contact WhatsApp et l’appel téléphonique,
sans formulaire ni confirmation automatique.

**Inclus**

- CTA Hero, Services, Réserver et Contact reliés à la source canonique ;
- parcours en trois étapes dans Réserver ;
- `tel:+33749616582` ;
- message prérempli uniquement s’il est validé ;
- smoke tests de tous les CTA.

**Exclus**

- SDK WhatsApp ;
- webhook ;
- envoi automatique ;
- collecte, tracking ou stockage du message ;
- promesse de créneau.

**Critères d’acceptation**

- [ ] chaque CTA utilise le numéro `33749616582` ;
- [ ] le fallback visible et cliquable utilise `+33749616582` ;
- [ ] aucun message n’est envoyé automatiquement ;
- [ ] le message reste modifiable ;
- [ ] aucun paramètre personnel n’est ajouté à l’URL ;
- [ ] le parcours n’affirme jamais qu’une réservation est confirmée.

### GALLERY-EXPERIENCE-01 — Implémenter galerie et lightbox

**Métadonnées**

- Feature : `FEATURE-GALLERY-V1`
- Mode : `IMPLEMENT`
- Statut : `BLOCKED par DEP-001, DEP-002 et maquette`
- Priorité : `P0`
- Autorité : Prisca — médias ; Kyria — UX/UI

**Objectif**

Présenter uniquement des réalisations authentiques dans une grille performante
et une lightbox accessible.

**Inclus**

- registre typé dans `content/gallery.ts` ;
- séparation stricte illustration / réalisation ;
- grille responsive et espaces réservés ;
- lightbox avec bouton, `Escape`, focus trap et retour du focus ;
- filtre seulement si le volume le justifie ;
- état sans résultat honnête.

**Exclus**

- faux portfolio ;
- média sans droit ;
- filtre décoratif sans contenu suffisant ;
- préchargement de toute la galerie.

**Critères d’acceptation**

- [ ] chaque média possède source, statut et texte alternatif ;
- [ ] aucune illustration n’est présentée comme réalisation ;
- [ ] aucun CLS significatif n’est introduit ;
- [ ] la lightbox fonctionne au clavier et au tactile ;
- [ ] le scroll de fond est restauré ;
- [ ] la galerie reste utile sans JavaScript.

### TRUST-CONTENT-01 — Implémenter réassurance, Avis et FAQ

**Métadonnées**

- Feature : `FEATURE-TRUST-V1`
- Mode : `IMPLEMENT`
- Statut : `BLOCKED par contenus Prisca`
- Priorité : `P1`
- Autorité : Prisca — faits ; Kyria — UX/UI

**Objectif**

Construire la confiance sans faux avis, fausse garantie ou réponse inventée.

**Inclus**

- Pourquoi me choisir ? avec affirmations validées ;
- Avis uniquement avec preuve et autorisation ;
- comportement approuvé sans avis ;
- FAQ dans `content/faq.ts` ;
- accordéon accessible ;
- contenu lisible sans slider obligatoire.

**Exclus**

- note globale fictive ;
- nom complet ou photo sans autorisation ;
- certification ou résultat chiffré sans preuve ;
- réponse FAQ supposée.

**Critères d’acceptation**

- [ ] chaque affirmation métier possède une validation ;
- [ ] chaque avis publié est traçable et autorisé ;
- [ ] aucune section ne simule une preuve absente ;
- [ ] l’accordéon expose son état réel ;
- [ ] clavier, focus et reduced motion fonctionnent ;
- [ ] tout contenu reste accessible sans slider.

### SEO-FOUNDATION-01 — Finaliser SEO, metadata et informations légales

**Métadonnées**

- Feature : `FEATURE-SEO-V1`
- Mode : `IMPLEMENT`
- Statut : `BLOCKED par stabilité du contenu`
- Priorité : `P1`
- Autorité : Kyria — CTO ; Prisca — identité métier

**Objectif**

Rendre la page correctement indexable sans publier de domaine, localisation ou
donnée structurée non confirmée.

**Inclus**

- title et description validés ;
- metadata globales ;
- `robots.ts`, `sitemap.ts` et manifest si pertinent ;
- canonical uniquement après confirmation du domaine ;
- structure des titres, alt, noms de fichiers et contenu serveur ;
- mentions légales confirmées dans un emplacement réel.

**Exclus**

- keyword stuffing ;
- fausse adresse ou zone locale ;
- schema.org incomplet ;
- canonical basé sur une Preview.

**Critères d’acceptation**

- [ ] un seul `h1` existe ;
- [ ] la hiérarchie des titres est cohérente ;
- [ ] title et description sont validés ;
- [ ] aucun domaine fictif n’est rendu ;
- [ ] robots et sitemap correspondent à la cible réelle ;
- [ ] les mentions nécessaires sont confirmées avant Production.

### QA-A11Y-RESPONSIVE-01 — Vérifier accessibilité et responsive

**Métadonnées**

- Feature : `FEATURE-QUALITY-V1`
- Mode : `VERIFY`
- Statut : `BLOCKED par implémentation des sections`
- Priorité : `P0`
- Autorité : QA / accessibilité ; validation Kyria

**Objectif**

Prouver la conformité responsive et accessibilité du parcours complet.

**Inclus**

- contrôles à `320`, `390`, `768` et `1440px` ;
- zoom `200 %` ;
- clavier, focus, lien d’évitement et ordre logique ;
- menu, accordéon, lightbox, CTA et téléphone ;
- contrastes, cibles `44 × 44px`, alt et reduced motion ;
- correction minimale des findings dans des tickets dédiés si nécessaire.

**Exclus**

- déclaration WCAG sans preuve ;
- masquage d’un finding bloquant ;
- modification produit silencieuse.

**Critères d’acceptation**

- [ ] aucun débordement horizontal n’est observé ;
- [ ] le contenu reste utilisable au zoom `200 %` ;
- [ ] tout le parcours critique est réalisable au clavier ;
- [ ] le focus est visible et correctement restauré ;
- [ ] les contrastes requis passent ;
- [ ] chaque échec possède un finding classé.

### QA-PERF-SECURITY-01 — Vérifier performance, sécurité et confidentialité

**Métadonnées**

- Feature : `FEATURE-QUALITY-V1`
- Mode : `VERIFY`
- Statut : `BLOCKED par implémentation des sections`
- Priorité : `P0`
- Autorité : QA / sécurité ; validation Kyria

**Objectif**

Prouver que la V1 respecte les budgets techniques et n’introduit aucune collecte
ou exposition inattendue.

**Inclus**

- lint, typecheck, tests et build ;
- mesure LCP, INP, CLS et budgets de ressources ;
- contrôle Server / Client Components ;
- audit des dépendances et traceurs ;
- headers de sécurité pertinents ;
- vérification secrets, URLs, console et réseau ;
- smoke tests WhatsApp et téléphone.

**Exclus**

- ajout d’analytics pour mesurer la performance ;
- affaiblissement d’un contrôle ;
- résultat déclaré sans exécution.

**Critères d’acceptation**

- [ ] LCP, INP et CLS respectent les objectifs ou une exception est acceptée ;
- [ ] les budgets JS, route, CSS, image LCP, polices et premier écran sont mesurés ;
- [ ] aucun secret, tracker ou stockage utilisateur n’est présent ;
- [ ] les dépendances sont nécessaires et auditées ;
- [ ] aucune erreur console bloquante n’existe ;
- [ ] tous les CTA critiques utilisent les données canoniques.

### STAGING-FOUNDATION-01A — Fondation projet Vercel staging

- Mode : `IMPLEMENT`
- Statut : `DONE — PROJECT CREATED`
- Projet : `primie-staging` (staging technique, hors lancement public)
- Exclus : premier Preview ; reconnect GitHub ; lancement public

#### STAGING-FOUNDATION-01A-R1

- Mode : `VERIFY`
- Statut : `SUPERSEDED BY R2`

#### STAGING-FOUNDATION-01A-R2

- Mode : `VERIFY`
- Statut : `DONE — FOUNDATION CONFIGURED`
- Inclus : lien Git nul ; build `pnpm build` ; Node 22.x ; Auth Standard ;
  deployments = 0
- Suite obligatoire : `STAGING-SAFETY-01` avant tout Preview

### STAGING-SAFETY-01 — Gate d’indexation noindex par défaut

- Mode : `IMPLEMENT`
- Statut : `DONE — Validé CTO 2026-08-11`
- Contrat :

```text
Indexation autorisée seulement si :
VERCEL_ENV=production
ET
SITE_PUBLIC_LAUNCH_ENABLED=true
```

- Défaut : `noindex, nofollow, noarchive` (metadata + `robots.txt` +
  `X-Robots-Tag`)
- Preview / Development / absent / invalide : toujours non indexable
- Preuve : commit `feat: add staging search indexing safeguards`
- Exclus (toujours) : variable Vercel de lancement public ; `.env*` ;
  Preview dans ce ticket ; lancement public ; pages légales

#### STAGING-SAFETY-01-CHECKPOINT

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — publié le 2026-08-11`
- Inclus : commit code/tests + commit documentation BMAD ; push
  `origin/main` ; aucun déploiement
- Exclus : Preview ; Production ; reconnect GitHub ; variables Vercel

### SITE-RELEASE-STAGING-01 — Premier Preview Vercel

- Mode : `DEPLOY / VERIFY`
- Statut : `DONE — First Protected Preview accepted (via R1)`
- Exclus (toujours) : Production ; domaine public ; indexation ouverte ;
  lancement public

#### SITE-RELEASE-STAGING-01-R1

- Mode : `DEPLOY / VERIFY`
- Statut : `DONE — Validé CTO 2026-08-12`
- FIRST PROTECTED PREVIEW : `ACCEPTED`
- PRODUCTION DEPLOYMENT : `NOT AUTHORIZED`
- Références immuables :

```text
Source SHA : ce4cfd50ea30192e2f61d93c8606d9f2ea0399ec
Deployment ID : dpl_92gXSBA6KRXusrgFbrZAWeQNxm5D
Preview URL : https://primie-staging-qan7pvcyq-kyrias-projects-f231e33a.vercel.app
Project : primie-staging
Production deployments : 0
Protection : Vercel Authentication / SSO active
Robots : noindex, nofollow, noarchive (metadata + X-Robots-Tag)
robots.txt : Disallow: / (sans Allow / Sitemap / Host)
```

- QA validée CTO : protection anonyme (302 SSO) ; noindex ; smoke `/`,
  `/galerie`, `/robots.txt` ; assets WebP ; menu mobile ; FAQ express /
  recherche ; booking → résumé → URL WhatsApp canonique `wa.me/33749616582`
  (sans envoi) ; overflow 320 / 390 / 768 / 1280 / 1440 ; rail galerie home
  (8) ; footer resize
- Exclus durant R1 et ensuite : Production ; `--prod` ; promote ; domaine ;
  alias ; DNS ; reconnect GitHub ; variable de lancement public ; Shareable
  Link ; pages légales

#### SITE-RELEASE-STAGING-01-R1-CLOSE

- Mode : `VERIFY + PUBLISH`
- Statut : `DONE — Validé CTO 2026-08-12`
- Inclus : clôture documentaire BMAD uniquement ; commit
  `docs: close protected staging review` ; push `origin/main`
- Aucun déploiement créé, modifié, promu ni supprimé pendant la clôture
- Aucun bypass secret créé ; `vercel curl` interdit (recrée un bypass)
- `PUBLIC LAUNCH` : `DEFERRED`
- `LEGAL GATES` : `FALSE`

### PUBLIC LAUNCH

- Statut : `DEFERRED — LEGAL GATES FALSE`
- Bloqué par : pages légales non publiables ; gates readiness `false` ;
  `SITE_PUBLIC_LAUNCH_ENABLED` non activé
- Note : la validation du Preview protégé (`SITE-RELEASE-STAGING-01-R1`)
  n’ouvre pas le lancement public ni la Production

### DEPLOY-PREVIEW-01 — Créer et valider une Preview

**Métadonnées**

- Feature : `FEATURE-RELEASE-V1`
- Mode : `DEPLOY`
- Statut : `BLOCKED` — Preview staging protégé livré via
  `SITE-RELEASE-STAGING-01-R1` (`DONE`) ; tout autre Preview / promote /
  domaine public exige une autorisation CTO distincte
- Priorité : `P0`
- Autorité : Kyria — action distante et validation

**Objectif**

Publier un artefact identifié en Preview Vercel et exécuter les smoke tests sans
affecter la Production.

**Inclus**

- confirmation du commit ou état source ;
- autorisation de déploiement ;
- Preview Vercel ;
- contrôle HTTPS, console, réseau, assets, responsive et CTA ;
- rapport de Preview avec findings.

**Exclus**

- domaine Production ;
- promotion automatique ;
- variable distante inconnue ;
- correction non tracée directement sur la Preview.

**Critères d’acceptation**

- [ ] l’autorisation de l’action distante est explicite ;
- [ ] la Preview correspond à l’artefact identifié ;
- [ ] build et chargement réussissent ;
- [ ] WhatsApp et téléphone passent le smoke test ;
- [ ] aucun finding `BLOCKER` ou `MAJOR` non accepté ne subsiste ;
- [ ] le rollback ou retrait de Preview est compris.

### RELEASE-PRODUCTION-01 — Autoriser et promouvoir la V1

**Métadonnées**

- Feature : `FEATURE-RELEASE-V1`
- Mode : `DEPLOY`
- Statut : `BLOCKED par G5`
- Priorité : `P0`
- Autorité : Kyria — Production

**Objectif**

Promouvoir en Production uniquement la version approuvée et confirmer le
parcours public.

**Inclus**

- validation finale de la Preview ;
- domaine, canonical, mentions et droits confirmés ;
- commit ou version figée ;
- plan de rollback ;
- autorisation Production distincte ;
- déploiement et smoke test public ;
- consignation du résultat.

**Exclus**

- déploiement implicite ;
- changement de dernière minute non revu ;
- contenu non autorisé ;
- ajout d’analytics.

**Critères d’acceptation**

- [ ] `G4` est passé ;
- [ ] la Preview est explicitement acceptée ;
- [ ] domaine, mentions, HTTPS et droits sont confirmés ;
- [ ] le rollback est exécutable ;
- [ ] l’autorité Production donne son GO ;
- [ ] le site public et les CTA passent le smoke test.

### DOC-CLOSURE-01 — Clôturer documentation et knowledge

**Métadonnées**

- Feature : `FEATURE-CLOSURE-V1`
- Mode : `VERIFY`
- Statut : `BLOCKED par release`
- Priorité : `P1`
- Autorité : Kyria — CTO

**Objectif**

Fermer le dossier avec une documentation exacte, des preuves reliées et des
risques résiduels visibles.

**Inclus**

- statuts finaux des tickets ;
- résultats QA et release ;
- mise à jour du PRD et du BMAD ;
- décisions et écarts acceptés ;
- suppression des TODO résolus ;
- knowledge réellement réutilisable ;
- validation de `G6`.

**Exclus**

- nouvelle série de règles sans besoin ;
- réécriture de l’historique ;
- déclaration `DONE` sans preuve.

**Critères d’acceptation**

- [ ] les dix-huit tickets ont un statut final ou une justification ;
- [ ] les preuves sont liées aux critères concernés ;
- [ ] les risques résiduels sont visibles ;
- [ ] PRD, BMAD et documentation correspondent au produit livré ;
- [ ] aucune inconnue n’est présentée comme résolue ;
- [ ] `G6 — Closure` est explicitement validé.

## 16. Definition of Ready

### BMAD

Le dossier a passé `READY` (G2) lorsque :

- [x] Kyria valide la solution et le découpage ;
- [x] les décisions `DEC-001` à `DEC-008` sont acceptées ;
- [x] l’absence d’ADR est acceptée ;
- [x] les dépendances et autorités sont correctes ;
- [x] les stratégies QA et Release sont acceptées ;
- [x] `G2 — Solution` est explicitement passé.

### Premier incrément

`INIT-SCAFFOLD-01C` ne peut passer `READY` que lorsque :

- [ ] le présent BMAD reste validé ;
- [x] le chemin d’initialisation est confirmé (`PRIMIE/`) ;
- [x] le traitement Git est décidé (`git init -b main`, sans commit ni remote) ;
- [x] `INIT-SCAFFOLD-01B` est validé `DONE` par le CTO ;
- [ ] aucune modification utilisateur ne sera écrasée ;
- [ ] les commandes prévues n’affectent aucun service distant ;
- [ ] l’autorité de validation est disponible.

`CONTENT-VALIDATION-01` est `DONE` — clôturé le `2026-08-01` :

- [x] le présent BMAD est validé ;
- [x] Prisca est identifiée comme source métier ;
- [x] un format de registre de contenus est choisi ;
- [x] les contenus livrés sont publiés sans inventer galerie ni avis ;
- [x] les décisions manquantes (galerie, témoignages) sont différées en backlog.

## 17. Definition of Done commune

Un ticket ne passe `DONE` que si :

- [ ] tous ses critères d’acceptation passent ;
- [ ] son diff reste dans le périmètre ;
- [ ] lint, types, tests et build pertinents passent ;
- [ ] les findings bloquants sont résolus ;
- [ ] responsive, accessibilité, SEO, performance et sécurité sont vérifiés selon le risque ;
- [ ] aucune donnée canonique n’est altérée ;
- [ ] la documentation affectée est synchronisée ;
- [ ] les éléments non vérifiés sont déclarés ;
- [ ] l’autorité attendue a validé ;
- [ ] aucune action Git ou distante non autorisée n’a été effectuée.

## 18. Gates

| Gate | Condition | Statut dans ce BMAD | Décision requise |
| --- | --- | --- | --- |
| `G0 — Intake` | besoin réel et prioritaire | `Passé` | aucune |
| `G1 — PRD` | PRD clair et validé | `Passé` | aucune |
| `G2 — Solution` | solution sûre et proportionnée | `Passé` | aucune — validé CTO `2026-07-30` |
| `G3 — Ready` | premiers tickets exécutables | `Passé` | aucune — validé CTO `Kyria — 2026-07-30` |
| `G4 — Quality` | critères, QA et sécurité passent | `Passé` | `INIT-SCAFFOLD-01D` validé CTO |
| `G5 — Release` | Preview et Production autorisées | `Passé` | premier commit publié sur `origin/main` (`2026-07-30`) |
| `G6 — Closure` | documentation synchronisée | `Passé` | clôture `FEATURE-FOUNDATION-V1` `2026-07-30` |

## 19. Plan de validation

| Domaine | Preuve minimale |
| --- | --- |
| Structure | dix sections dans l’ordre et ancres réelles |
| Contenu | source métier ou état honnête pour chaque donnée |
| WhatsApp | inspection des URLs et smoke tests |
| Téléphone | contrôle `tel:+33749616582` |
| Responsive | `320`, `390`, `768`, `1440px`, zoom `200 %` |
| Accessibilité | clavier, focus, contrastes, sémantique, reduced motion |
| Performance | build, mesures Web Vitals et budgets |
| Sécurité | secrets, dépendances, headers, réseau et traceurs |
| SEO | metadata, titres, robots, sitemap et canonical réel |
| Preview | URL de Preview, artefact identifié et rapport |
| Production | autorisation, rollback et smoke test public |

Tout contrôle non exécuté reste `NON VÉRIFIÉ`.

## 20. Handoffs

### Product Manager → Architecte

- source : `PRD-PRIMIE-001 v1.0` ;
- décision : périmètre V1 validé ;
- risques : contenu, assets, WhatsApp, performance et conformité ;
- interdit : inventer ou élargir le produit.

### Architecte → Développeur

- source : présent BMAD validé ;
- décision : application Next.js unique et contenu centralisé ;
- ordre : exécuter uniquement un ticket `READY` ;
- interdit : installer, refactoriser ou déployer hors ticket.

### Développeur → Reviewer

- fournir ticket, diff, fichiers touchés, commandes et résultats ;
- déclarer les écarts et éléments non vérifiés ;
- ne pas demander une validation globale sans preuve ciblée.

### Reviewer → QA

- transmettre critères, findings ouverts et zones de risque ;
- identifier les parcours à rejouer ;
- ne pas masquer les findings acceptés.

### QA → Autorité Production

- fournir artefact, preuves, risques résiduels et rollback ;
- distinguer Preview acceptée et GO Production ;
- ne jamais considérer la Preview comme une autorisation implicite.

## 21. Conditions d’arrêt

Arrêter l’exécution et demander une décision si :

- le PRD, ce BMAD et une règle applicable se contredisent ;
- une donnée métier nécessaire manque ;
- la maquette ou l’asset demandé n’est pas traçable ;
- un travail existant risque d’être écrasé ;
- Next.js 15 ne peut pas être installé sans contournement ;
- une dépendance importante non prévue devient nécessaire ;
- un formulaire, backend, CMS, analytics ou stockage est proposé ;
- un secret, domaine, DNS, Vercel ou environnement distant serait modifié ;
- une action Git non autorisée est nécessaire ;
- un gate humain n’est pas validé.

## 22. Décision et prochaines actions

### Statut actuel

`READY — G2 passé`. `G3` passé (validation CTO `Kyria — 2026-07-30`).
`INIT-SCAFFOLD-01A` à `01E` sont `DONE` (`01E` : `Validé CTO 2026-07-30`).
`G4`, `G5` et `G6` sont `Passé`. `FEATURE-FOUNDATION-V1` est `DONE`
(clôture `2026-07-30`, preuve : premier commit publié sur `origin/main`).
`FOUNDATION-SYSTEM-01` est `DONE` (clôture `2026-07-30`, preuve : commit
d’implémentation publié sur `origin/main` ; `01A`–`01E` DONE — Validé CTO
2026-07-30). `LANDING-SHELL-01` est `DONE` (clôturé le `2026-07-31` ;
`01A`–`01E`, `01E-R1`, `01E-R2` DONE — Validé CTO 2026-07-31 ; preuve :
commit `feat: add PRiMiE landing shell` —
`334372718906f4e5ffdf8e977bcc8f5c6da64ddb` sur `origin/main`).
`LANDING-CORE-01` est `DONE` (clôturé le `2026-07-31` ; preuve :
commit `feat: add PRiMiE landing core` —
`ed4dacff6691b013d0ced07a8bc2b7c53ee813dd` sur `origin/main`).
Handoff actif : `GALLERY-CONTENT-01` est `DONE` (clôturé le `2026-08-02`).
Base Git attendue après clôture : commits Gallery sur `origin/main`.
`BOOKING-WHATSAPP-FLOW-01` et `CONTACT-BOOKING-01` restent `DONE`.
`BOOKING-ENGINE-V2` : `BACKLOG — NOT OPEN`.
`TESTIMONIALS-CONTENT-01` : `CANCELLED` — décision CTO 2026-08-02.
`STAGING-FOUNDATION-01A` : `DONE — PROJECT CREATED`.
`STAGING-FOUNDATION-01A-R1` : `SUPERSEDED BY R2`.
`STAGING-FOUNDATION-01A-R2` : `DONE — FOUNDATION CONFIGURED`.
`STAGING-SAFETY-01` : `DONE — Validé CTO 2026-08-11`.
`STAGING-SAFETY-01-CHECKPOINT` : `DONE — publié le 2026-08-11`.
`SITE-RELEASE-STAGING-01` : `DONE — First Protected Preview accepted`.
`SITE-RELEASE-STAGING-01-R1` : `DONE — Validé CTO 2026-08-12`.
`SITE-RELEASE-STAGING-01-R1-CLOSE` : `DONE — Validé CTO 2026-08-12`.
`FIRST PROTECTED PREVIEW` : `ACCEPTED` —
`dpl_92gXSBA6KRXusrgFbrZAWeQNxm5D` /
`https://primie-staging-qan7pvcyq-kyrias-projects-f231e33a.vercel.app`
(source `ce4cfd50ea30192e2f61d93c8606d9f2ea0399ec`) ; Production = `0` ;
SSO ON ; noindex / Disallow `/`.
`PUBLIC LAUNCH` : `DEFERRED — LEGAL GATES FALSE`.
`PRODUCTION DEPLOYMENT` : `NOT AUTHORIZED`.
**Handoff** : ne pas ouvrir lancement public, pages légales ni Production
sans ticket et autorisation CTO distincts. Aucune lightbox ouverte.
Galerie V1 = illustrations approuvées ; réalisations réelles évolutives
avec droits. PRD actif : version `1.3`.

### Après GALLERY-CONTENT-01 (clôturé)

1. ne pas attribuer les illustrations à Prisca ni utiliser « Nos réalisations » ;
2. ne pas rouvrir `TESTIMONIALS-CONTENT-01` / lightbox / `BOOKING-ENGINE-V2` sans décision CTO ;
3. ne déployer en Production qu’avec autorisation CTO explicite ;
4. toute évolution « réalisations » exige consentements clientes + arbitrage CTO.

### Décision enregistrée

`BMAD-PRIMIE-001` est validé par le CTO (`Kyria — 2026-07-30`) comme plan
directeur d’exécution de la landing page PRiMiE V1, sans autoriser encore une
action distante, un scaffold Next.js implicite ou une mise en Production.
