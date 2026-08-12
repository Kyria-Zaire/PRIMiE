# Registre de contenus PRiMiE

Document public versionnable. Statuts : `VALIDATED` · `PO_APPROVED_SEED` ·
`PUBLISHED_PO_APPROVED_SEED` · `PUBLISHED_SERVICE_ILLUSTRATION` ·
`PUBLISHED_BRAND_ASSET` · `ACTIVATED_BOOKING_ONLY` · `PENDING_PRISCA` ·
`PENDING_DEPLOYMENT` · `CONFIRMED_PUBLIC` · `BLOCKED_LEGAL_SCOPE` ·
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
| Logo visuel | `public/brand/logo/primie-logo-v1.webp` (source `images/logo.png` hors commit) | PUBLISHED_BRAND_ASSET · APPROVED_FOR_HEADER_HERO_R2 | Prisca / CTO | 2026-08-03 | `BrandLogo` via `next/image` | — | Aucun nouvel asset ; CSS dimensions OK (ratio) ; pas de redessin |
| Logo lockup maquette | silhouette + Chez PRiMiE Coiffure | REFERENCE_ONLY (non asset) | CTO | 2026-08-03 | — | — | `BLOCKED_ASSET_LOGO` levé ; référence position/taille/équilibre uniquement |
| Photo Hero desktop | `public/images/hero/primie-hero-v1.webp` (source `images/primie-hero.png`) | PUBLISHED_SERVICE_ILLUSTRATION | Prisca / CTO | 2026-08-01 | hors runtime Hero (conservé jusqu’à R1E) | — | Remplacé par R2 en R1C |
| Photo Hero mobile | `public/images/hero/primie-hero-mobile-v1.webp` (source `images/primie section hero mobile.png`) | PUBLISHED_SERVICE_ILLUSTRATION | Prisca / CTO | 2026-08-01 | hors runtime Hero (conservé jusqu’à R1E) | — | Remplacé par R2 en R1C |
| Photo Hero R2 desktop | `public/images/hero/primie-hero-r2-desktop.webp` (source `images/Hero/hero-desktop.png`) | APPROVED_BY_CTO (R1B) · branché R1C | CTO | 2026-08-03 | Hero ≥1024px | — | Exclude local PNG ; ne pas committer PNG |
| Photo Hero R2 mobile | `public/images/hero/primie-hero-r2-mobile.webp` (source `images/Hero/hero-mobile.png`) | APPROVED_BY_CTO (R1B) · branché R1C | CTO | 2026-08-03 | Hero &lt;1024px via `picture` | — | Source mobile distincte ; exclude local |
| Copy Hero R2 | eyebrow / description / CTA WA ; H1 = `siteConfig.brand.slogan` | APPROVED_BY_CTO | CTO | 2026-08-03 | `content/hero.ts` + `siteConfig` → `Hero` | — | Ancien H1 « La beauté afro, sublimée » retiré ; slogan = H1 script |
| Valeurs Hero R2 | home / excellence / passion / listening | APPROVED_BY_CTO | CTO | 2026-08-03 | `content/hero.ts` → `Hero` | — | Marketing non contractuel ; pictos SVG présentation |
| Highlights Hero V1 | PROFESSIONNELLE / SOIGNÉE / TENDANCE / À DOMICILE | RETIRED_R1C | CTO | 2026-08-03 | fichier `hero-highlights.ts` supprimé | — | Remplacé par `heroValues` |
| Illus. service tresses-coiffure | WebP `public/images/services/tresses-coiffure.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service traitement-perruque | WebP `public/images/services/traitement-perruque.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service pose-perruque | WebP `public/images/services/pose-perruque.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service look-twist | WebP `public/images/services/look-twist.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service vente-pose-perruques | WebP `public/images/services/vente-pose-perruques.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Illus. service tissage | WebP `public/images/services/tissage.webp` | PUBLISHED_SERVICE_ILLUSTRATION | PO / CTO | 2026-08-01 | Carte Service uniquement | — | Pas une réalisation réelle |
| Galerie | 14 illustrations WebP + page `/galerie` + aperçu landing | PUBLISHED_GALLERY_ILLUSTRATION (01B–01D) | CTO | 2026-08-02 | `gallery.ts` + `public/images/gallery/*.webp` + `app/galerie` | Sources PNG locales hors suivi | `GALLERY-CONTENT-01E` QA / clôture |
| Portrait Hero `/galerie` | `public/images/gallery/gallery-hero-model-v1.webp` (source `images/gallery/tresses-longues.png`) | PUBLISHED_GALLERY_HERO_ASSET | CTO | 2026-08-02 | `GalleryPageHero` uniquement | Alpha préservé ; hors grille Gallery | `GALLERY-PAGE-HERO-R1` |
| Conseils Preview (3 cartes) | WebP `preparation-cheveux` / `entretien-tresses` / `soin-perruque` + `content/advice.ts` | ILLUSTRATION_APPROVED_BY_CTO · `preview_only` · `PRODUCT_VISUAL_AMBIGUITY — ACCEPTED_BY_CTO 2026-08-08` | CTO | 2026-08-08 | `AdvicePreview` / `AdviceCard` · `#conseils` | Pas de `/conseils` / pas de lien carte ; packaging = illustration éditoriale uniquement | `CONSEILS-PREVIEW-ASSET-R1` |
| Portrait intro Conseils | `advice-portrait-bantu-knots-v1.webp` (source `images/gallery/bantu-knots.png`) | ILLUSTRATION_APPROVED_BY_CTO · décoratif (01C-R2) | CTO / Kyria | 2026-08-05 | `AdvicePreview` intro uniquement | Alpha ; hors carte 02 ; aucune PNG public | Décision CTO gelée — ne pas revenir à `entretien-tresses` |
| Wig Sales — familles | Vietnam · Inde · Gamme classique (« normale » Prisca) | `CONFIRMED_BY_PRISCA` | Prisca / CTO | 2026-08-10 | `content/wigs.ts` (`wigCollectionSources`) | Pas d’origine inventée | Vietnam/Inde = `kind:origin` ; classique = `kind:range` |
| Wig Sales — 3 modèles | Body Wave · Deep Wave · Lisse | `CONFIRMED` (présentation) | CTO | 2026-08-10 | `content/wigs.ts` + WebP `public/images/wigs/` | Aucun mapping famille | Descriptions visuelles uniquement |
| Wig Sales — mapping produit↔famille | Non fourni | `PENDING_PRISCA` | Prisca | 2026-08-10 | — | Ne pas attribuer | Attendre mapping précis |
| Wig Sales — prix / longueurs / matière / couleur | Non confirmés | `PENDING_PRISCA` | Prisca | 2026-08-10 | hors runtime public | Inventaire interdit | Option WhatsApp tarif |
| Wig Sales — stock | Hors périmètre | `NOT OPEN` | CTO | 2026-08-10 | — | — | `WIG-COMMERCE-ENGINE` |
| Wig Sales — livraison / paiement / retour | Non confirmés | `NOT OPEN` | CTO | 2026-08-10 | hors runtime | Ne pas inventer | Attendre décisions métier |
| Wig Sales — portrait intro | `vente-pose-perruques.webp` (service) | `APPROVED_REUSE` | CTO | 2026-08-10 | `WigSelection` | Pas de copie sous `/images/wigs/` ; remplace Gallery Hero | UI 01C-R2 |
| Témoignages / Avis | Section retirée de la V1 | `CANCELLED` — CTO 2026-08-02 | CTO | 2026-08-02 | scaffolding `testimonials.ts` / nav `#avis` supprimés | Aucun avis authentique publiable | Réouverture uniquement sur décision CTO + avis réels + consentements |
| Pistes avis (historiques) | Olive, Octavie, Annaelle, Plamédie — pistes seules, jamais publiées | `REJECTED_FOR_PUBLICATION` (V1) | PO / CTO | 2026-08-02 | hors runtime | Quotes/consentements absents | Ne pas réintroduire sans preuves |
| Pourquoi choisir PRiMiE | 5 brouillons PO | PENDING_PRISCA | Prisca | 2026-07-31 | futur `benefits.ts` | Non créé | Validation Prisca |
| Horaires seed demande RDV | Lundi – Samedi · 09h00 – 19h00 · Uniquement sur rendez-vous | PO_APPROVED_SEED (CTO 2026-08-01) | CTO | 2026-08-01 | `content/booking.ts` (`openingHours`) | Non exposés UI publique en 01B | Destination `BOOKING-WHATSAPP-FLOW` — demande, pas disponibilité |
| Créneaux de demande | 09:00, 10:30, 12:00, 14:30, 16:00, 17:30 | PO_APPROVED_SEED (CTO 2026-08-01) | CTO | 2026-08-01 | `content/booking.ts` (`timeSlots`) | Non exposés UI publique en 01B | Horizon 90 j · lun–sam · dimanche désactivé |
| Dimanche | Désactivé pour sélection (CTO FLOW-01) | VALIDATED (sélection) | CTO | 2026-08-01 | `bookingConfig.selectableWeekdays` | — | Hors créneaux sélectionnables |
| Zone | Domicile OK, zone précise non | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Confirmer formulation |
| Réseaux sociaux | En création, aucun lien | PENDING_PRISCA | Prisca | 2026-07-31 | — | — | Attendre URL publiques |
| Mentions légales | Absentes (routes non créées) | PENDING_PRISCA / BLOCKED_BUSINESS_INFO | Prisca / CTO | 2026-08-12 | `legalContent` + readiness | Production | Collecter champs admin ; 01C bloqué |
| Architecture légale non publique | `content/legal.ts` + `lib/legal-readiness.ts` — confirmed / pending_prisca / pending_verification | `DONE` (01B publié) | CTO | 2026-08-12 | couche data interne | Données admin Prisca + déploiement | Pas de route publique ; cookies `NO_CONSENT_BANNER_REQUIRED_CURRENT_RUNTIME` |
| Domaine | Non confirmé | PENDING_DEPLOYMENT | CTO | 2026-07-31 | — | SEO / Prod | Décision domaine |
| Hébergeur confirmé | Non déployé | PENDING_DEPLOYMENT | CTO | 2026-08-11 | `legalContent.hosting.confirmedHost` | Déploiement réel | Vercel = candidat uniquement |
| CGV | Fonctionnement commercial non fixé | BLOCKED_LEGAL_SCOPE | Prisca / CTO | 2026-08-12 | `legalContent.termsScope` | Identité, tarifs affichage, annulation, perruques, médiateur | Attendre décisions métier |
| Identité publique autorisée | Prisca Foani | `PO_CONFIRMED` | PO / CTO | 2026-08-12 | `legalContent.publisher.legalIdentity` | — | Identité légale complète reste bloquée (statut, SIREN/SIRET, adresse, email, directeur de publication, etc.). |
| Email professionnel | Non confirmé | PENDING_PRISCA | Prisca | 2026-08-11 | `legalContent.publisher.publicProfessionalEmail` | — | Attendre email public |
| Médiation consommation | Aucun médiateur choisi | `PO_CONFIRMED` (`not_selected`) | PO / CTO | 2026-08-12 | `legalContent.mediation` | Convention + coordonnées | Ne pas inventer de médiateur |
| Inventaire technique confidentialité | Booking mémoire → URL WhatsApp → Meta/WhatsApp ; pas de stockage serveur ; rétention WA ≤ 1 mois | PO_CONFIRMED (technique + métier) | PO / CTO | 2026-08-12 | `legalContent.technicalPrivacyInventory` | RT / formalisation politique | Ne pas publier comme politique complète ; Meta ≠ sous-traitant sans preuve |

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
- Conseils Preview (`CONSEILS-PREVIEW-01B`) : 3 illustrations
  `kind=illustration` / `rightsStatus=project_approved` (CTO). Sources PNG
  `images/conseil/carte-{1,2,3}.png` hors suivi (chemins exacts dans
  `.git/info/exclude`). Runtime WebP uniquement (`public/images/advice/`).
  `publicationStatus=preview_only` — **aucun lien**, aucune route `/conseils`.
  Emballages/flacons de `carte-3` / `soin-perruque.webp` = illustration éditoriale
  (`PRODUCT_VISUAL_AMBIGUITY — ACCEPTED_BY_CTO 2026-08-08`) ; **aucune
  revendication de gamme commercialisée**. Portrait décoratif :
  `advice-portrait-bantu-knots-v1.webp` (hors carte 02). Placement UI :
  après GalleryPreview, avant FAQ.
- Wig Sales (`WIG-SALES-CONTENT-01B`) : 3 modèles Body Wave / Deep Wave / Lisse
  (`status=confirmed` = présentation uniquement). Familles générales
  `wigCollectionSources` : Vietnam & Inde (`kind=origin`) + Gamme classique
  (`kind=range`, terme Prisca « normale »). **Aucun mapping produit↔famille.**
  Runtime sans prix, matière, couleur, stock, livraison, paiement, retour,
  `Naturel`, « 100 % cheveux humains » ou « synthétique ». Portrait :
  `APPROVED_REUSE` `gallery-hero-model-v1.webp`. CTA futur WhatsApp via
  `buildWhatsAppUrl(inquiryMessage)`. UI et `/perruques` hors 01B.
- Témoignages : `TESTIMONIALS-CONTENT-01` = `CANCELLED` (CTO 2026-08-02) —
  aucun avis inventé ; section hors V1 ; pas de `content/testimonials.ts`.
- Preuves de consentement : hors `public/` et hors ce registre détaillé.
- CTA ContactBooking `#contact` et Footer : WhatsApp sans message prérempli.
- CTA ContactBooking demande RDV : message dynamique généré au submit (pas de stockage).
- Architecture légale (`LEGAL-PAGES-01B`) : couche `content/legal.ts` non branchée à
  l’UI ; statuts `confirmed` / `pending_prisca` / `pending_verification` /
  `blocked_legal_scope` ; Vercel = `hostingCandidate` uniquement ; aucune route
  `/mentions-legales`, `/politique-de-confidentialite`, `/cgv` ; aucun lien Footer ;
  aucun cookie banner ; `getPublishableLegalContent()` retourne `not_ready` ;
  `publicLaunchReady=false` ; ré-audit cookies domaine public requis avant Production.
- Sources locales : dossier canonique `images/services/` (pluriel) pour les illustrations Services.
