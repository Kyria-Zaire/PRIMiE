# Registre de contenus PRiMiE

Document public versionnable. Statuts : `VALIDATED` · `PO_APPROVED_SEED` ·
`PUBLISHED_PO_APPROVED_SEED` · `PUBLISHED_SERVICE_ILLUSTRATION` ·
`PUBLISHED_BRAND_ASSET` · `ACTIVATED_BOOKING_ONLY` · `PENDING_PRISCA` ·
`DEFERRED` · `REJECTED_FOR_PUBLICATION`.

Les preuves privées (consentements, conversations, identité) restent hors dépôt.

| Élément | Valeur / résumé | Statut | Autorité | Date | Destination code | Blocker | Prochaine action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Graphie `PRiMiE` | Marque courte officielle | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Nom commercial | Chez PRiMiE Coiffure | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Activité | Coiffure et beauté afro à domicile | VALIDATED | CTO / métier | 2026-07-31 | `site-config.ts` | — | — |
| Téléphone / WhatsApp | Canoniques | VALIDATED | CTO | 2026-07-31 | `site-config.ts` | — | — |
| Slogan | La beauté commence par une belle coiffure. | PUBLISHED_PO_APPROVED_SEED | PO / CTO | 2026-08-01 | Hero via `siteConfig.brand.slogan` | — | — |
| 6 titres services | Liste do-not-break | VALIDATED | CTO / métier | 2026-07-31 | `services.ts` | — | — |
| 6 descriptions services | Seed PO exactes | PUBLISHED_PO_APPROVED_SEED | PO / CTO | 2026-08-01 | cartes Services | — | — |
| Prix / durées | Non publiés | PENDING_PRISCA | Prisca | 2026-07-31 | — | Décision métier | Rester hors runtime public |
| Message WhatsApp prérempli | Bonjour Prisca… devis | PUBLISHED_PO_APPROVED_SEED | PO / CTO | 2026-08-01 | Header / Hero / ContactBooking `#reserver` (+ menu mobile) | ContactBooking `#contact` / Footer sans `?text=` | — |
| FAQ (5 Q/R) | Seed prudente | PUBLISHED_PO_APPROVED_SEED | PO / CTO | 2026-08-01 | `#faq` + nav | — | — |
| Logo visuel | `public/brand/logo/primie-logo-v1.webp` (source `images/logo.png` hors commit) | PUBLISHED_BRAND_ASSET | Prisca / CTO | 2026-08-01 | `BrandLogo` via `next/image` | — | Ne pas committer le PNG source sans décision CTO |
| Photo Hero desktop | `public/images/hero/primie-hero-v1.webp` (source `images/primie-hero.png`) | PUBLISHED_SERVICE_ILLUSTRATION | Prisca / CTO | 2026-08-01 | Hero ≥1024px | — | Ne pas committer PNG sans décision CTO |
| Photo Hero mobile | `public/images/hero/primie-hero-mobile-v1.webp` (source `images/primie section hero mobile.png`) | PUBLISHED_SERVICE_ILLUSTRATION | Prisca / CTO | 2026-08-01 | Hero sous 1024px via `picture` | — | Ne pas committer PNG sans décision CTO |
| Illus. service tresses-coiffure | WebP `public/images/services/tresses-coiffure.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service traitement-perruque | WebP `public/images/services/traitement-perruque.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service pose-perruque | WebP `public/images/services/pose-perruque.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service look-twist | WebP `public/images/services/look-twist.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service vente-pose-perruques | WebP `public/images/services/vente-pose-perruques.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service tissage | WebP `public/images/services/tissage.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Galerie | `[]` | DEFERRED — tableau vide, section masquée | CTO | 2026-08-01 | `gallery.ts` | Feature future `GALLERY-CONTENT-01` | BACKLOG — NOT OPEN |
| Témoignages | `[]` | DEFERRED — tableau vide, section masquée | CTO | 2026-08-01 | `testimonials.ts` | Feature future `TESTIMONIALS-CONTENT-01` | BACKLOG — NOT OPEN |
| Pistes avis (prénoms seuls) | Olive, Octavie, Annaelle, Plamédie — pistes uniquement | PENDING_PRISCA | PO | 2026-07-31 | registre seulement | Pas de texte/consentement | Transférer vers `TESTIMONIALS-CONTENT-01` |
| Pourquoi choisir PRiMiE | 5 brouillons PO | PENDING_PRISCA | Prisca | 2026-07-31 | futur `benefits.ts` | Non créé | Validation Prisca |
| Horaires proposés | Lun–sam 09h–19h sur RDV | PENDING_PRISCA | Prisca | 2026-07-31 | — | Non publiés | Confirmer avant runtime |
| Dimanche | Non confirmé | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer ou rester masqué |
| Zone | Domicile OK, zone précise non | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer formulation |
| Réseaux sociaux | En création, aucun lien | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Attendre URL publiques |
| Mentions légales | Absentes | PENDING_PRISCA | Prisca / CTO | 2026-07-31 | — | Production | Gate Release |
| Domaine | Non confirmé | PENDING_PRISCA | CTO | 2026-07-31 | — | SEO / Prod | Décision domaine |

## Politiques

- Illustrations Services (`PUBLISHED_SERVICE_ILLUSTRATION` / `SERVICE_ILLUSTRATION`) : usage carte Service uniquement ; **aucune n’est une réalisation réelle** ; **aucune image Service ne doit être réutilisée silencieusement dans « Nos réalisations »**.
- Hero desktop/mobile : illustrations publiées (`PUBLISHED_SERVICE_ILLUSTRATION`) ; pas des réalisations catalogue.
- Autres illustrations locales hors `public/` : hors périmètre et **non publiées**.
- Galerie « Nos réalisations » : différée (`GALLERY-CONTENT-01`, BACKLOG — NOT OPEN) ; uniquement vraies réalisations le jour J.
- Témoignages : différés (`TESTIMONIALS-CONTENT-01`, BACKLOG — NOT OPEN) ; aucun prénom runtime sans texte exact et consentement.
- Preuves de consentement : hors `public/` et hors ce registre détaillé.
- CTA ContactBooking `#contact` et Footer : WhatsApp sans message prérempli.
- Sources locales : dossier canonique `images/services/` (pluriel) pour les illustrations Services.
