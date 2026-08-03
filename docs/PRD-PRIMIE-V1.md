# PRD — PRiMiE Landing Page V1

## 0. Métadonnées

| Champ | Valeur |
| --- | --- |
| Identifiant | `PRD-PRIMIE-001` |
| Produit | `PRiMiE` |
| Titre | Landing page Chez PRiMiE Coiffure — V1 |
| Version | `1.3` |
| Statut | `Validé` |
| Autorité produit | Prisca — métier et contenus ; Kyria — Product Owner seed contents |
| Autorité technique | Kyria — CTO |
| Date de création | `2026-07-30` |
| Dernière mise à jour | `2026-07-31` |
| Validation CTO | Kyria — `2026-07-31` |
| Validation CTO/PO | Kyria — `2026-07-31` (seed contents) |
| Validation métier | contenus seed PO ; confirmation Prisca pour médias, avis et arguments |
| BMAD lié | `BMAD-PRIMIE-001 — version 1.0 — Validé` |
| ADR liés | `Aucun requis à ce stade` |
| Tickets liés | `BMAD-PRIMIE-001` — tickets `INIT-SCAFFOLD-01A` à `01E` et suite |
| Environnement cible | Local → Preview Vercel → Production autorisée |

## 0.1 Décision de marque — graphie officielle (2026-07-31)

| Champ | Valeur |
| --- | --- |
| Ancienne graphie | `PRIMiE` |
| Nouvelle graphie officielle | `PRiMiE` |
| Nom commercial | `Chez PRiMiE Coiffure` |
| Signature visuelle | `PRiMiE COIFFURE` |
| Périmètre | UI, UX, metadata, contenus et communication de marque |
| Conservé | identifiants techniques historiques (`PRD-PRIMIE-*`, `BMAD-PRIMIE-*`, URL GitHub, slugs) |
| Autorité | CTO Kyria — `2026-07-31` |

## 0.2 Décision Hero — CTA et médias (2026-07-31)

| Champ | Valeur |
| --- | --- |
| CTA principal Hero | `Réserver sur WhatsApp` → `buildWhatsAppUrl()` sans message prérempli |
| CTA secondaire | `Découvrir nos services` → `#services`, uniquement lorsque la section Services est rendue |
| CTA Galerie | actif : aperçu `#galerie` + CTA « Découvrir la galerie » → `/galerie` (illustrations validées CTO 2026-08-02) |
| Visuel Hero | CSS premium autorisé sans photographie tant qu’aucun asset validé n’est fourni |
| Autorité | CTO Kyria — `2026-07-31` |

## 0.3 Décision Product Owner — seed contents (2026-07-31)

| Champ | Valeur |
| --- | --- |
| Statut des seed | `PO_APPROVED_SEED` — modifiables jusqu’à validation Prisca / publication UI |
| Slogan | `La beauté commence par une belle coiffure.` — centralisé, affiché dans le Hero |
| Descriptions services | six textes PO — centralisés ; **non affichés** dans Services tant que non activés |
| Prix / durées | **masqués** ; hors runtime public |
| Message WhatsApp prérempli | texte PO centralisé ; CTA publics **sans** `?text=` jusqu’à activation 01C |
| FAQ | cinq Q/R prudentes PO ; section **non rendue** tant que non activée |
| Horaires / dimanche | **non publiés** |
| Galerie V1 | « Galerie d’inspirations » — illustrations `project_approved` ; **interdit** de les présenter comme réalisations de Prisca. Réalisations réelles = évolution future avec consentements. |
| Témoignages | `CANCELLED` V1 (CTO 2026-08-02) — aucun avis inventé ; réouverture seulement avec preuves |
| Hero | CSS conservé tant qu’aucune photo réelle + autorisation |
| Registre | `docs/content/content-register.md` |
| Autorité | CTO / Product Owner Kyria — `2026-07-31` |

## 1. Résumé exécutif
PRiMiE doit fournir à Prisca une présence numérique premium, mobile-first et
simple à maintenir pour présenter son activité de coiffure et beauté afro à
domicile.
La V1 est une landing page publique unique. Elle permet à une nouvelle visiteuse
de comprendre rapidement l’offre, consulter les prestations et réalisations,
obtenir des éléments de confiance, lire les réponses pratiques disponibles et
ouvrir une conversation WhatsApp avec Prisca.
La V1 ne gère aucune réservation automatisée. L’ouverture de WhatsApp constitue
une prise de contact, jamais une confirmation de rendez-vous.
Le produit doit rester statique, rapide et accessible. Il n’intègre ni compte,
ni formulaire, ni paiement, ni backend, ni base de données, ni CMS, ni
analytics implicite.

### Décision validée
Le CTO valide explicitement :
1. la vision et le périmètre V1 ;
2. l’ordre des dix sections ;
3. les six prestations ;
4. WhatsApp comme conversion principale ;
5. les exigences fonctionnelles et non fonctionnelles ;
6. la liste des contenus encore à fournir par Prisca ;
7. le passage à la décomposition `BMAD-PRIMIE-001`.

Les contenus métier encore ouverts restent des dépendances de livraison à
confirmer par Prisca ; ils ne bloquent pas la validation du cadrage produit.

## 2. État actuel

### Observé
- la gouvernance Cursor et Claude est constituée ;
- les règles produit, architecture, design, contenu et qualité existent ;
- les templates PRD et BMAD sont disponibles ;
- le dossier ne contient pas encore d’application Next.js ;
- `package.json` est absent ;
- aucune fonctionnalité du site n’est implémentée ;
- aucun domaine Production n’est confirmé dans le dépôt ;
- aucun outil analytics ou tracking n’est configuré.

### Conséquence
La stack décrite dans ce PRD est une cible validée, pas un état installé. Le
premier dossier BMAD devra commencer par l’initialisation contrôlée du projet,
sans prétendre que le produit existe déjà.

## 3. Contexte et problème

### Situation
Prisca exerce une activité de coiffure et beauté afro à domicile. Elle a besoin
d’un support numérique plus complet qu’un flyer ou une carte de visite afin de
présenter son savoir-faire et faciliter les demandes.

### Problème utilisateur
Pour une personne recherchant une prestation de coiffure ou beauté afro, il est
difficile de :
- comprendre l’offre de PRiMiE depuis une source unique ;
- visualiser la qualité et la diversité des prestations ;
- trouver des éléments de confiance ;
- obtenir des réponses pratiques ;
- contacter rapidement Prisca avec le bon numéro.

### Formulation
Pour une personne recherchant une prestation de coiffure ou beauté afro, le
problème est l’absence d’une présence web claire et structurée, ce qui ralentit
la compréhension de l’offre et la prise de contact.
Le problème sera réduit lorsqu’une visiteuse pourra parcourir la V1 sur mobile,
comprendre les prestations et ouvrir le bon lien WhatsApp sans erreur, compte ou
formulaire intermédiaire.

## 4. Vision et proposition de valeur

### Vision
Créer une présence numérique élégante, humaine et rassurante qui valorise le
savoir-faire de Prisca et transforme une visite en conversation WhatsApp.

### Proposition de valeur
PRiMiE rassemble en une seule page :
- une présentation claire de l’activité ;
- les prestations validées ;
- une galerie de réalisations autorisées ;
- des raisons crédibles de choisir Prisca ;
- des avis réels lorsqu’ils sont disponibles ;
- des réponses pratiques confirmées ;
- un accès direct à WhatsApp et au téléphone.

### Principes d’expérience
1. comprendre immédiatement ;
2. voir avant de contacter ;
3. être rassurée sans promesse excessive ;
4. contacter sans friction ;
5. conserver le contrôle du message envoyé.

## 5. Objectifs

| ID | Objectif | Preuve V1 |
| --- | --- | --- |
| `OBJ-001` | Identifier la marque et l’activité dès le premier écran | test de compréhension et contrôle du Hero |
| `OBJ-002` | Présenter les six prestations validées | contrôle du contenu centralisé |
| `OBJ-003` | Montrer des réalisations authentiques et autorisées | audit des assets et de leurs sources |
| `OBJ-004` | Construire la confiance | contrôle des sections réassurance, avis et FAQ |
| `OBJ-005` | Faciliter le contact WhatsApp | smoke test de chaque CTA critique |
| `OBJ-006` | Offrir une expérience mobile accessible et rapide | QA responsive, clavier, WCAG et performance |
| `OBJ-007` | Permettre une maintenance simple | audit architecture et sources de contenu |

### Non-objectifs
- réserver automatiquement un créneau ;
- encaisser un paiement ;
- gérer un compte client ;
- administrer le site dans un back-office ;
- stocker des données clientes ;
- suivre les comportements des visiteuses ;
- créer une marketplace ;
- développer une application mobile ;
- construire dès maintenant le futur IMORIA Business Kit.

## 6. Utilisatrice principale

### Contexte validé
La V1 cible une personne :
- recherchant une prestation de coiffure ou beauté afro ;
- consultant fréquemment depuis un téléphone ;
- souhaitant comprendre rapidement l’offre ;
- ayant besoin de voir les réalisations ;
- souhaitant être rassurée avant le contact ;
- utilisant WhatsApp comme canal de prise de contact.
Les éléments d’âge, de profession, de budget, de localisation précise et
d’habitudes d’achat ne sont pas connus et ne doivent pas être inventés.

### Job-to-be-done

```text
Lorsque je cherche une prestation de coiffure ou beauté afro,
je veux comprendre ce que propose PRiMiE et voir son travail,
afin de décider si je souhaite contacter Prisca sur WhatsApp.
```

## 7. Parties prenantes

| Rôle | Responsabilité |
| --- | --- |
| Prisca | valide activité, prestations, contenus, images, avis et informations pratiques |
| Kyria — CTO | valide périmètre, architecture, qualité et passage aux gates techniques |
| IA d’analyse / produit | structure le besoin sans inventer |
| IA d’exécution | implémente uniquement les tickets acceptés |
| Review | contrôle conformité, risques et régressions |
| QA / sécurité | produit les preuves de qualité |
Les rôles IA peuvent être joués par plusieurs outils, mais aucune IA ne remplace
la validation métier de Prisca ou l’autorisation technique du CTO.

## 8. Périmètre fonctionnel

### Inclus
- landing page publique unique ;
- navigation par ancres ;
- Header responsive ;
- Hero ;
- présentation des six prestations ;
- galerie responsive ;
- filtres de galerie si le contenu le justifie ;
- lightbox accessible ;
- section de réassurance ;
- avis clientes validés ou comportement honnête en leur absence ;
- FAQ validée ;
- explication du parcours de réservation ;
- CTA WhatsApp ;
- lien téléphonique ;
- Contact ;
- Footer ;
- SEO technique de base ;
- accessibilité WCAG 2.2 AA ;
- optimisation des performances ;
- déploiement Vercel après validation.

### Exclus
- authentification ;
- compte client ;
- dashboard ;
- back-office ;
- formulaire de contact ;
- calendrier ;
- réservation automatique ;
- paiement ;
- API métier ;
- base de données ;
- CMS ;
- WhatsApp Cloud API ;
- webhook WhatsApp ;
- chatbot ;
- CRM ;
- collecte de données non nécessaire ;
- analytics, pixels ou replay de session ;
- application mobile ;
- marketplace ;
- fonctionnalités sociales.

## 9. Structure officielle
L’ordre de la page est obligatoire :
1. Header ;
2. Hero ;
3. Services ;
4. Galerie — inspirations (libellé V1 ; ordre de page inchangé) ;
5. Pourquoi me choisir ? ;
6. FAQ ;
7. Réserver ;
8. Contact ;
9. Footer.

La section « Avis clientes » / « Elles me font confiance » est **retirée de la V1**
(`TESTIMONIALS-CONTENT-01` = `CANCELLED` — CTO 2026-08-02). Réouverture uniquement
avec avis authentiques et consentements.

Ancres :

| Section | Ancre |
| --- | --- |
| Hero | `#accueil` |
| Services | `#services` |
| Galerie | `#galerie` |
| Pourquoi me choisir ? | `#a-propos` |
| FAQ | `#faq` |
| Réserver | `#reserver` |
| Contact | `#contact` |
Aucun lien vide, `#` générique ou bouton factice n’est autorisé.

## 10. Parcours principal
1. La visiteuse arrive sur le Hero.
2. Elle identifie `Chez PRiMiE Coiffure`.
3. Elle comprend qu’il s’agit de coiffure et beauté afro à domicile.
4. Elle découvre les prestations.
5. Elle consulte les réalisations.
6. Elle lit les éléments de réassurance disponibles.
7. Elle consulte les avis réels et la FAQ lorsque le contenu est validé.
8. Elle sélectionne un CTA WhatsApp.
9. WhatsApp s’ouvre sur le numéro canonique.
10. Elle modifie ou complète son message avant de l’envoyer.
11. Prisca confirme ensuite les détails et la disponibilité dans la conversation.

### Parcours alternatif
Si WhatsApp n’est pas utilisable, la visiteuse peut lire le numéro et utiliser
le lien `tel:+33749616582`.

### Ce que le parcours ne promet pas
- disponibilité immédiate ;
- réponse instantanée ;
- créneau confirmé ;
- tarif ;
- durée ;
- zone d’intervention ;
- réservation finalisée.

## 11. User stories

| ID | En tant que… | Je veux… | Afin de… |
| --- | --- | --- | --- |
| `US-001` | nouvelle visiteuse | identifier la marque et l’activité | confirmer que le site correspond à mon besoin |
| `US-002` | visiteuse mobile | naviguer entre les sections | atteindre rapidement l’information |
| `US-003` | cliente potentielle | comprendre les prestations | identifier celle qui m’intéresse |
| `US-004` | cliente potentielle | demander des informations | éviter un formulaire intermédiaire |
| `US-005` | cliente potentielle | consulter les réalisations | évaluer le style et le soin |
| `US-006` | utilisatrice clavier ou tactile | agrandir une réalisation | voir le détail sans perdre le contrôle |
| `US-007` | nouvelle cliente | comprendre l’approche de Prisca | être rassurée avant le contact |
| `US-008` | nouvelle cliente | lire uniquement des avis authentiques | ne pas être induite en erreur |
| `US-009` | cliente potentielle | lire des réponses confirmées | préparer mon échange |
| `US-010` | cliente potentielle | ouvrir le bon contact WhatsApp | demander une prestation |
| `US-011` | personne sans WhatsApp | appeler le numéro affiché | disposer d’un fallback |

## 12. Exigences fonctionnelles globales

| ID | Exigence | Priorité |
| --- | --- | --- |
| `FR-001` | La V1 doit être une page publique unique. | `MUST` |
| `FR-002` | La page doit respecter l’ordre officiel des dix sections. | `MUST` |
| `FR-003` | Les contenus métier doivent provenir de sources centralisées. | `MUST` |
| `FR-004` | Chaque CTA critique doit posséder un libellé explicite. | `MUST` |
| `FR-005` | Aucun composant ne doit afficher une donnée métier inventée. | `MUST` |
| `FR-006` | Une absence de contenu doit produire un état honnête et propre. | `MUST` |
| `FR-007` | La page doit fonctionner sans compte, formulaire ou backend. | `MUST` |
| `FR-008` | Les interactions doivent fonctionner au clavier et au tactile. | `MUST` |
| `FR-009` | Une image absente ne doit pas casser la mise en page. | `MUST` |
| `FR-010` | La page doit préserver son contenu essentiel sans animation. | `MUST` |

## 13. Header

### Exigences
- afficher l’identité PRiMiE ;
- proposer la navigation desktop ;
- proposer un menu mobile ;
- fournir un accès clair à la réservation ;
- ramener vers `#accueil` via le logo ou nom ;
- rester lisible sur fonds clair et sombre.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-HEADER-001` | À `320px`, logo, menu et CTA ne se chevauchent pas. |
| `AC-HEADER-002` | Le menu mobile est atteignable et utilisable au clavier. |
| `AC-HEADER-003` | L’état ouvert est exposé avec `aria-expanded`. |
| `AC-HEADER-004` | Le menu se ferme après sélection d’une ancre. |
| `AC-HEADER-005` | La fermeture restaure correctement focus et scroll. |
| `AC-HEADER-006` | Aucun lien ne pointe vers une section inexistante. |

## 14. Hero

### Exigences
- afficher l’identité `PRiMiE` (eyebrow `Chez` autorisé) ;
- communiquer la coiffure et beauté afro à domicile ;
- privilégier un Hero CSS premium tant qu’aucune photographie validée n’est fournie ;
- afficher un CTA principal `Réserver sur WhatsApp` ;
- afficher un CTA secondaire `Découvrir nos services` → `#services` uniquement lorsque la section Services est rendue ;
- ne pas afficher de CTA vers `#galerie` tant que la galerie est vide ;
- garder le contenu essentiel visible rapidement.
Le wording définitif d’un slogan ou d’une proposition de valeur enrichie doit être
validé par Prisca. Aucun slogan non validé n’est affiché.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-HERO-001` | Une visiteuse comprend l’activité sans parcourir toute la page. |
| `AC-HERO-002` | Le CTA principal mentionne WhatsApp et utilise l’URL canonique. |
| `AC-HERO-003` | Le CTA secondaire mène à `#services` uniquement si la section Services est rendue ; sinon il est absent. |
| `AC-HERO-004` | Le texte reste lisible sur le fond Hero (image ou CSS) aux viewports de référence. |
| `AC-HERO-005` | Si un visuel photographique est présent, il conserve un cadrage pertinent sans déformation ; un Hero CSS sans photo est conforme. |
| `AC-HERO-006` | Aucune statistique ou promesse non confirmée n’est affichée. |
| `AC-HERO-007` | Aucun lien `#galerie` n’est exposé tant que la galerie est vide. |

## 15. Services

### Liste validée
1. Tresses & coiffure femme et homme ;
2. Traitement de perruque ;
3. Pose perruque ;
4. Look & twist ;
5. Vente et pose de perruques ;
6. Tissage.

Alignement documentaire `2026-07-30` (`FOUNDATION-SYSTEM-01E`) : intitulés
identiques à `do-not-break`, `00-project` et `content/services.ts`.

### Exigences
- chaque service possède un titre ;
- chaque description reste courte et factuelle ;
- une image peut être associée si sa source est maîtrisée ;
- une action permet de demander des informations ;
- les données vivent dans `content/services.ts`.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-SERVICE-001` | Les six services sont présents une seule fois dans la source de contenu. |
| `AC-SERVICE-002` | Aucun prix, délai ou disponibilité n’est affiché. |
| `AC-SERVICE-003` | Les cartes restent lisibles à `320px` et au zoom `200 %`. |
| `AC-SERVICE-004` | Une image correspond au service annoncé. |
| `AC-SERVICE-005` | Le CTA contextualisé n’affirme aucune réservation. |

## 16. Galerie — inspirations (V1) / réalisations (évolution)

### Statut V1 (validé CTO 2026-08-02)
- intitulé public : **Galerie d’inspirations** (pas « Nos réalisations ») ;
- 14 illustrations `kind=illustration` / `rightsStatus=project_approved` ;
- aperçu landing `#galerie` (8 featured) + page `/galerie` + filtres catégories ;
- transparence éditoriale via le titre, l’accent « Chaque coiffure, une inspiration
  unique » et la description (sélection de styles) — **pas** de paragraphe
  disclosure dédié (`GALLERY-DISCLOSURE-R1`, CTO 2026-08-02) ;
- aucune attribution des illustrations comme réalisations de Prisca ;
- aucune lightbox en V1.

### Évolution (réalisations authentiques)
- remplacer progressivement par `kind=realisation` + consentements clientes ;
- lightbox accessible et filtres enrichis uniquement après décision CTO ;
- gate Production historiques sur « réalisations » s’appliquent à cette phase.

### Critères V1

| ID | Critère d’acceptation |
| --- | --- |
| `AC-GALLERY-001` | Aucun média d’illustration n’est présenté comme une réalisation. |
| `AC-GALLERY-002` | Les dimensions ou ratios réservent l’espace et évitent le CLS. |
| `AC-GALLERY-003` | Un filtre actif est visible et compréhensible. |
| `AC-GALLERY-008` | Les images sont optimisées (WebP) sans perte excessive des détails. |

### Critères différés (lightbox / réalisations)

| ID | Critère d’acceptation |
| --- | --- |
| `AC-GALLERY-004` | Un filtre sans résultat produit un message honnête. |
| `AC-GALLERY-005` | La lightbox se ferme par bouton et `Escape`. |
| `AC-GALLERY-006` | Le focus reste contenu puis revient au déclencheur. |
| `AC-GALLERY-007` | Le scroll de fond est restauré à la fermeture. |

## 17. Pourquoi me choisir ?

### Thèmes autorisés après validation métier
- attention portée à la cliente ;
- soin et précision ;
- écoute du besoin ;
- accompagnement personnalisé ;
- respect du cheveu et du style souhaité ;
- prestation à domicile.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-TRUST-001` | Chaque affirmation est validée par Prisca. |
| `AC-TRUST-002` | Aucun thème ne devient une certification ou garantie inventée. |
| `AC-TRUST-003` | Aucun résultat chiffré n’est affiché sans preuve. |
| `AC-TRUST-004` | La section reste concrète et compréhensible sur mobile. |

## 18. Avis clientes

### Statut V1

`CANCELLED` — décision CTO `2026-08-02`.

Motif : absence d’avis clients authentiques publiables ; refus d’inventer des
témoignages. La section « Elles me font confiance » n’est pas dans le runtime V1
(pas de `#avis`, pas de `content/testimonials.ts`, pas de nav « Avis clientes »).

### Exigences si réouverture future (hors V1 actuelle)
- publier uniquement un témoignage réellement reçu ;
- obtenir l’autorisation de publication ;
- reproduire fidèlement le sens ;
- anonymiser si nécessaire ;
- ne pas inventer note, prénom, source ou photo.

### Critères (réouverture)

| ID | Critère d’acceptation |
| --- | --- |
| `AC-REVIEW-001` | Chaque avis possède une preuve de réception et d’autorisation. |
| `AC-REVIEW-002` | Aucun score global fictif n’est affiché. |
| `AC-REVIEW-003` | Aucun nom complet ou photo n’est publié sans autorisation. |
| `AC-REVIEW-004` | Tous les avis restent accessibles sans dépendre d’un slider. |

## 19. FAQ

### Exigences
- stocker les questions dans `content/faq.ts` ;
- publier uniquement des réponses confirmées ;
- utiliser un accordéon accessible ;
- communiquer l’état ouvert ;
- conserver le contenu utilisable avec mouvement réduit.

### Sujet déjà confirmé
Le parcours de prise de contact peut expliquer :
1. contacter PRiMiE sur WhatsApp ;
2. préciser la prestation souhaitée ;
3. attendre la confirmation des détails et de la disponibilité par Prisca.
Les fournitures, la préparation, les zones de déplacement, l’entretien, les
horaires et les modalités restent à confirmer.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-FAQ-001` | Chaque réponse possède une source métier validée. |
| `AC-FAQ-002` | Les contrôles fonctionnent au clavier. |
| `AC-FAQ-003` | `aria-expanded` reflète l’état réel. |
| `AC-FAQ-004` | Le contenu reste accessible sans animation. |

## 20. Réserver

### Parcours
1. la cliente ouvre WhatsApp ;
2. elle précise la prestation ;
3. Prisca confirme les détails et sa disponibilité.

### Exigences
- afficher un CTA `Réserver sur WhatsApp` ou formulation validée équivalente ;
- utiliser `https://wa.me/33749616582` ;
- ne jamais présenter le clic comme une réservation confirmée ;
- utiliser un message prérempli uniquement après validation.

### Message proposé à valider

```text
Bonjour PRiMiE, je souhaite obtenir des informations concernant une prestation.
```
Ce texte reste `Proposé` jusqu’à validation par Prisca.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-BOOK-001` | Le lien utilise le numéro canonique sans espace ni `+`. |
| `AC-BOOK-002` | Aucun message n’est envoyé automatiquement. |
| `AC-BOOK-003` | Le message reste modifiable avant envoi. |
| `AC-BOOK-004` | Aucune donnée personnelle ou disponibilité n’est préremplie. |
| `AC-BOOK-005` | Le CTA fonctionne sans SDK WhatsApp. |

## 21. Contact

### Données confirmées

```text
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

### Données non confirmées
- adresse ;
- zone de déplacement ;
- horaires ;
- email public ;
- réseaux sociaux ;
- domaine final.

### Critères

| ID | Critère d’acceptation |
| --- | --- |
| `AC-CONTACT-001` | Le numéro visible correspond à la source canonique. |
| `AC-CONTACT-002` | Le lien d’appel utilise `tel:+33749616582`. |
| `AC-CONTACT-003` | WhatsApp est identifié comme canal principal. |
| `AC-CONTACT-004` | Aucune donnée non confirmée n’est affichée. |
| `AC-CONTACT-005` | Aucun formulaire n’est présent. |

## 22. Footer

### Exigences
- afficher l’identité PRiMiE ;
- proposer uniquement les raccourcis utiles ;
- afficher les coordonnées validées ;
- inclure les mentions légales nécessaires ;
- gérer l’année automatiquement ;
- ne pointer vers aucune page inexistante.

### Gate juridique
L’identité légale de l’éditrice, l’hébergeur, le responsable de publication et
les mentions nécessaires doivent être confirmés avant Production.

## 23. Direction artistique
La source canonique est `04-design-system.mdc`. Le rendu doit évoquer élégance,
soin, féminité, confiance, savoir-faire afro et service premium accessible.
Contraintes PRD :
- palette noire, dorée, beige et crème ;
- `Cormorant Garamond` pour les titres ;
- `Manrope` pour le texte et l’interface ;
- `Allura` comme accent occasionnel ;
- luxe produit par composition, photographie, typographie et espace ;
- aucun rendu SaaS, flyer surchargé, doré omniprésent ou effet spectaculaire.

## 24. Responsive et accessibilité

### Viewports obligatoires

```text
320px
390px
768px
1440px
zoom 200 %
```

### Exigences
- conformité cible WCAG 2.2 AA ;
- HTML sémantique ;
- un seul `h1` ;
- hiérarchie sans saut arbitraire ;
- lien d’évitement ;
- navigation clavier ;
- focus visible ;
- cibles tactiles `44 × 44px` minimum ;
- contraste `4.5:1` pour le texte standard ;
- contraste `3:1` pour grands textes et composants ;
- alternatives d’images pertinentes ;
- aucun contenu essentiel transmis uniquement par la couleur ;
- aucun débordement horizontal ;
- `prefers-reduced-motion` respecté.

## 25. Mouvement
Appliquer `animation-motion` et `04-design-system.mdc` :
- micro-interactions `160–220ms` ;
- transitions `240–360ms` ;
- révélations `450–650ms` ;
- `opacity` et `transform` privilégiés ;
- CTA jamais retardé ;
- reduced motion complet ;
- aucune parallaxe lourde ou animation généralisée.

## 26. Performance

| Métrique | Objectif |
| --- | --- |
| LCP | `≤ 2,5 s` |
| INP | `≤ 200 ms` |
| CLS | `≤ 0,1` |
Budgets : JavaScript initial `≤ 150 Ko`, route totale `≤ 220 Ko`, CSS `≤ 50 Ko`,
image LCP idéalement `≤ 400 Ko`, polices `≤ 200 Ko` et premier écran `≤ 1 Mo`.
Réserver les dimensions, optimiser les images, limiter les graisses de police,
conserver les Server Components et ne pas précharger toute la galerie.

## 27. SEO

### Exigences
- metadata dans `app/layout.tsx` ;
- titre et description validés ;
- canonical correspondant au domaine réel ;
- `app/robots.ts` ;
- `app/sitemap.ts` ;
- `app/manifest.ts` si pertinent ;
- données structurées uniquement si exactes ;
- contenu principal rendu côté serveur ;
- noms et textes alternatifs descriptifs ;
- aucun keyword stuffing.
Le domaine final et les informations locales nécessaires restent à confirmer.

## 28. Sécurité et confidentialité

### Exigences
- aucun secret dans le code ou le client ;
- aucun `.env` commité ;
- aucune variable sensible `NEXT_PUBLIC_*` ;
- lien WhatsApp construit depuis une constante contrôlée ;
- aucune redirection ouverte ;
- aucune saisie utilisateur sur le site ;
- aucune donnée de message journalisée ;
- aucun identifiant visiteur dans les URLs ;
- aucune dépendance sans audit ;
- headers de sécurité vérifiés ;
- aucun traceur inattendu.
La V1 n’utilise aucun stockage métier, cookie non essentiel ou consentement
analytics.

## 29. Architecture cible
La source canonique est `02-architecture.mdc`.
Stack : Next.js 15 App Router, TypeScript strict, Tailwind CSS, shadcn/ui si
pertinent, Framer Motion, Lucide, `pnpm` et Vercel.
Contraintes :
- application unique sans monorepo ;
- `app/` à la racine, sans `src/` ;
- Server Components par défaut ;
- frontière cliente minimale ;
- `app/page.tsx` déclaratif ;
- couches `layout`, `sections`, `shared` et `ui` ;
- contenu public centralisé dans `content/` sans dépendance React ;
- aucune abstraction prématurée.

## 30. Contenu centralisé
`content/site-config.ts` centralise identité, activité, téléphone, WhatsApp,
message validé et liens sociaux confirmés. `navigation.ts`, `services.ts`,
`gallery.ts` et `faq.ts` portent leurs contenus respectifs.
Aucun numéro ou service ne doit être répété dans plusieurs composants.

## 31. Observabilité
Suivre disponibilité, build, erreurs bloquantes, ressources critiques, domaine,
HTTPS, liens téléphone/WhatsApp, Web Vitals, dépendances et traceurs inattendus.
`Aucune collecte utilisateur en V1`. Analytics, pixel ou replay exige une
nouvelle décision produit, sécurité et confidentialité.

## 32. Dépendances et contenus requis

| ID | Dépendance | Autorité | Impact | Statut |
| --- | --- | --- | --- | --- |
| `DEP-001` | Photos de réalisations authentiques | Prisca | bloque la galerie Production | `À fournir` |
| `DEP-002` | Autorisations de publication des photos | Prisca | bloque les médias concernés | `À confirmer` |
| `DEP-003` | Descriptions finales des services | Prisca | bloque la copy finale | `À valider` |
| `DEP-004` | Raisons de choisir Prisca | Prisca | bloque la section réassurance finale | `À valider` |
| `DEP-005` | Avis clientes et autorisations | Prisca | section Avis **CANCELLED** V1 (CTO 2026-08-02) | `Annulé V1` |
| `DEP-006` | Questions et réponses FAQ | Prisca | bloque les réponses non confirmées | `Partiel` |
| `DEP-007` | Message WhatsApp prérempli | Prisca | détermine la query `text` | `Proposé` |
| `DEP-008` | Identité légale et mentions | Prisca / CTO | bloque Production | `À confirmer` |
| `DEP-009` | Domaine final | CTO | bloque canonical et Production | `À confirmer` |
| `DEP-010` | Réseaux sociaux publics | Prisca | facultatif | `À confirmer` |
| `DEP-011` | Maquette finale et assets de marque | CTO / Design | conditionne l’intégration visuelle | `À consolider` |

## 33. Risques

| ID | Risque | Impact | Prévention |
| --- | --- | --- | --- |
| `RISK-001` | faux avis ou contenu inventé | perte de confiance | gate contenu et sources obligatoires |
| `RISK-002` | illustration présentée comme réalisation | tromperie | séparer assets illustratifs et galerie |
| `RISK-003` | élargissement vers formulaire ou calendrier | complexité V1 | contrôle strict du hors périmètre |
| `RISK-004` | mauvais numéro WhatsApp | conversion bloquée | source unique et smoke tests |
| `RISK-005` | rendu trop chargé | lisibilité réduite | design system et review UX |
| `RISK-006` | galerie trop lourde | LCP/INP dégradés | optimisation et chargement mesuré |
| `RISK-007` | sections clientes trop larges | bundle excessif | Server Components par défaut |
| `RISK-008` | mentions légales incomplètes | risque de conformité | gate juridique avant Production |
| `RISK-009` | domaine tardif | SEO et déploiement bloqués | décision avant gate Release |
| `RISK-010` | sur-gouvernance | développement ralenti | BMAD proportionné au risque |

## 34. Mesure du succès V1
Sans analytics utilisateur, le succès initial repose sur des preuves
fonctionnelles :
- les six prestations sont présentes et exactes ;
- les réalisations publiées sont autorisées ;
- chaque CTA critique ouvre le bon contact ;
- le fallback téléphone fonctionne ;
- aucune donnée métier inconnue n’est affichée ;
- aucune erreur console bloquante ;
- les critères responsive et accessibilité passent ;
- les budgets de performance sont respectés ou toute exception est documentée ;
- la Production passe le smoke test.
Les indicateurs commerciaux tels que volume de demandes ou taux de conversion ne
seront pas mesurés dans la V1 sans décision ultérieure.

## 35. Plan de livraison
1. faire valider le PRD par Prisca et le CTO ;
2. exécuter `BMAD-PRIMIE-001` (validé) et promouvoir les tickets `READY` ;
3. initialiser le socle Next.js et les contrôles ;
4. implémenter contenu et sections par incréments ;
5. valider review, QA, accessibilité, sécurité et performance ;
6. valider une Preview ;
7. confirmer domaine, mentions, rollback et autorité Production ;
8. promouvoir puis exécuter le smoke test public.

## 36. Gates

| Gate | Condition | Statut |
| --- | --- | --- |
| `G0 — Besoin` | vision et problème confirmés | `Passé` |
| `G1 — PRD` | PRD relu et explicitement validé | `Passé` |
| `G2 — Solution` | architecture et risques acceptés | `Passé` |
| `G3 — Ready` | tickets BMAD exécutables | `En attente de validation de INIT-SCAFFOLD-01B` |
| `G4 — Quality` | critères, QA et sécurité réussis | `Non commencé` |
| `G5 — Release` | Preview, domaine, mentions et rollback validés | `Non commencé` |
| `G6 — Closure` | documentation et knowledge synchronisés | `Non commencé` |

## 37. Questions ouvertes

| ID | Question | Autorité | Impact |
| --- | --- | --- | --- |
| `Q-001` | Quelles photos sont des réalisations réelles publiables ? | Prisca | bloque galerie |
| `Q-002` | Quels avis peuvent être publiés et sous quelle identité ? | Prisca | conditionne Avis |
| `Q-003` | Quelles réponses FAQ sont confirmées ? | Prisca | bloque FAQ complète |
| `Q-004` | Quel message WhatsApp prérempli valider ? | Prisca | affecte CTA |
| `Q-005` | Quelles mentions légales exactes publier ? | Prisca / CTO | bloque Production |
| `Q-006` | Quel domaine sera utilisé ? | CTO | bloque canonical |
| `Q-007` | Quels réseaux sociaux officiels afficher ? | Prisca | facultatif |
| `Q-008` | Quelles formulations finales pour Hero et services ? | Prisca / Design | bloque copy finale |
| `Q-009` | Quelle maquette constitue la référence d’intégration finale ? | CTO / Design | affecte UI |

## 38. Traçabilité initiale

| Objectif | User stories | Sections | Preuve |
| --- | --- | --- | --- |
| `OBJ-001` | `US-001`, `US-002` | Header, Hero | QA compréhension et navigation |
| `OBJ-002` | `US-003`, `US-004` | Services | audit contenu |
| `OBJ-003` | `US-005`, `US-006` | Galerie | audit assets et lightbox |
| `OBJ-004` | `US-007`, `US-008`, `US-009` | Confiance, Avis, FAQ | validation métier |
| `OBJ-005` | `US-010`, `US-011` | Hero, Réserver, Contact | smoke tests |
| `OBJ-006` | toutes | page entière | QA non fonctionnelle |
| `OBJ-007` | toutes | architecture | review technique |
La traçabilité vers les tickets et tests sera complétée dans le BMAD.

## 39. Definition of Ready du produit
Le développement initial peut démarrer lorsque :
- [ ] Prisca valide les faits métier de ce PRD ;
- [x] le CTO valide le périmètre et la stack cible ;
- [x] les inconnues bloquantes sont assignées ;
- [ ] la maquette de référence est identifiée ;
- [ ] les assets indispensables au premier incrément sont disponibles ;
- [x] `BMAD-PRIMIE-001` est créé et validé ;
- [ ] les premiers tickets satisfont leur Definition of Ready.
Les contenus non bloquants peuvent rester identifiés comme dépendances, mais ne
doivent jamais être remplacés par des inventions.

## 40. Checklist de validation
- [x] vision, structure, prestations et périmètre validés ;
- [x] parcours WhatsApp et inconnues métier acceptés ;
- [ ] maquette, assets et droits identifiés ;
- [x] stack et architecture validées ;
- [x] accessibilité, performance, SEO et sécurité acceptés ;
- [x] dépendances assignées ;
- [ ] stratégie Preview et rollback acceptée ;
- [ ] autorité Production confirmée.

## 41. Décision

### Statut actuel
`Validé — G1 passé ; G2 passé via BMAD-PRIMIE-001`.

### Trace documentaire
`2026-07-30` — alignement des six intitulés de prestations sur la liste
canonique do-not-break / `00-project` / `content/services.ts`
(`FOUNDATION-SYSTEM-01E`). Version PRD inchangée (`1.0`).

### Actions suivantes
1. obtenir de Prisca les contenus métier encore ouverts ;
2. finaliser `INIT-SCAFFOLD-01B` puis attendre la validation CTO ;
3. transformer les premiers lots BMAD en tickets `READY` après G3 ;
4. ne commencer le code qu’après des tickets `READY`.
