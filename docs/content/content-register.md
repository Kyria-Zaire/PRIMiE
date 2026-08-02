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
| Message WhatsApp prérempli | Bonjour Prisca… devis | PUBLISHED_PO_APPROVED_SEED | PO / CTO | 2026-08-01 | Header / Hero (+ menu mobile) | ContactBooking `#contact` / Footer sans `?text=` ; `#reserver` dynamique via widget | — |
| Message WhatsApp demande RDV | Template dynamique nom/tél/prestation/date/créneau | PO_APPROVED_SEED (CTO FLOW-01) | CTO | 2026-08-01 | `lib/booking/message.ts` + `BookingRequestWidget` | Généré au submit uniquement | Destination `BOOKING-WHATSAPP-FLOW` |
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
| Galerie | 14 illustrations WebP + page `/galerie` + aperçu landing | PUBLISHED_GALLERY_ILLUSTRATION (01B–01D) | CTO | 2026-08-02 | `gallery.ts` + `public/images/gallery/*.webp` + `app/galerie` | Sources PNG locales hors suivi | `GALLERY-CONTENT-01E` QA / clôture |
| Portrait Hero `/galerie` | `public/images/gallery/gallery-hero-model-v1.webp` (source `images/gallery/tresses-longues.png`) | PUBLISHED_GALLERY_HERO_ASSET | CTO | 2026-08-02 | `GalleryPageHero` uniquement | Alpha préservé ; hors grille Gallery | `GALLERY-PAGE-HERO-R1` |
| Témoignages / Avis | Section retirée de la V1 | `CANCELLED` — CTO 2026-08-02 | CTO | 2026-08-02 | scaffolding `testimonials.ts` / nav `#avis` supprimés | Aucun avis authentique publiable | Réouverture uniquement sur décision CTO + avis réels + consentements |
| Pistes avis (historiques) | Olive, Octavie, Annaelle, Plamédie — pistes seules, jamais publiées | `REJECTED_FOR_PUBLICATION` (V1) | PO / CTO | 2026-08-02 | hors runtime | Quotes/consentements absents | Ne pas réintroduire sans preuves |
| Pourquoi choisir PRiMiE | 5 brouillons PO | PENDING_PRISCA | Prisca | 2026-07-31 | futur `benefits.ts` | Non créé | Validation Prisca |
| Horaires seed demande RDV | Lundi – Samedi · 09h00 – 19h00 · Uniquement sur rendez-vous | PO_APPROVED_SEED (CTO 2026-08-01) | CTO | 2026-08-01 | `content/booking.ts` (`openingHours`) | Non exposés UI publique en 01B | Destination `BOOKING-WHATSAPP-FLOW` — demande, pas disponibilité |
| Créneaux de demande | 09:00, 10:30, 12:00, 14:30, 16:00, 17:30 | PO_APPROVED_SEED (CTO 2026-08-01) | CTO | 2026-08-01 | `content/booking.ts` (`timeSlots`) | Non exposés UI publique en 01B | Horizon 90 j · lun–sam · dimanche désactivé |
| Dimanche | Désactivé pour sélection (CTO FLOW-01) | VALIDATED (sélection) | CTO | 2026-08-01 | `bookingConfig.selectableWeekdays` | — | Hors créneaux sélectionnables |
| Zone | Domicile OK, zone précise non | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer formulation |
| Réseaux sociaux | En création, aucun lien | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Attendre URL publiques |
| Mentions légales | Absentes | PENDING_PRISCA | Prisca / CTO | 2026-07-31 | — | Production | Gate Release |
| Domaine | Non confirmé | PENDING_PRISCA | CTO | 2026-07-31 | — | SEO / Prod | Décision domaine |

## Politiques

- Illustrations Services (`PUBLISHED_SERVICE_ILLUSTRATION` / `SERVICE_ILLUSTRATION`) : usage carte Service uniquement ; **aucune n’est une réalisation réelle** ; **aucune image Service ne doit être réutilisée silencieusement dans « Nos réalisations »**.
- Hero desktop/mobile : illustrations publiées (`PUBLISHED_SERVICE_ILLUSTRATION`) ; pas des réalisations catalogue.
- Autres illustrations locales hors `public/` : hors périmètre et **non publiées**.
- Galerie « Galerie d’inspirations » : 14 illustrations `kind=illustration` /
  `rightsStatus=project_approved` (CTO 2026-08-02). **Ne pas présenter comme
  réalisations de Prisca.** Transparence via titre / accent / description ;
  paragraphe disclosure retiré (`GALLERY-DISCLOSURE-R1`, CTO 2026-08-02).
  Sources PNG `images/gallery/*.png` hors suivi (14 chemins exacts dans
  `.git/info/exclude`). Runtime WebP uniquement (`public/images/gallery/`).
  UI : aperçu landing `#galerie` + page `/galerie` + filtres (01C–01D).
  Transition future vers `kind=realisation` : consentements clientes requis
  avant remplacement. Wording interdit : « Nos réalisations », « Mes réalisations ».
- Témoignages : `TESTIMONIALS-CONTENT-01` = `CANCELLED` (CTO 2026-08-02) —
  aucun avis inventé ; section hors V1 ; pas de `content/testimonials.ts`.
- Preuves de consentement : hors `public/` et hors ce registre détaillé.
- CTA ContactBooking `#contact` et Footer : WhatsApp sans message prérempli.
- CTA ContactBooking demande RDV : message dynamique généré au submit (pas de stockage).
- Sources locales : dossier canonique `images/services/` (pluriel) pour les illustrations Services.
