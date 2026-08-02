# PRiMiE

Landing page Next.js 15 (App Router, TypeScript strict, Tailwind CSS, pnpm).

## Prérequis

- Node.js `22.13.1` (voir `.nvmrc`)
- pnpm `10.16.1`

## Installation

```bash
pnpm install
```

## Fondations visuelles et contenu

| Élément          | Emplacement                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Design tokens    | `app/theme.css` (palette PRiMiE COIFFURE v1.0)                                                     |
| Polices          | Manrope (`font-sans`) et Cormorant Garamond (`font-display`) via `next/font` dans `app/layout.tsx` |
| Contenu statique | `content/`                                                                                         |
| Helper WhatsApp  | `lib/whatsapp.ts`                                                                                  |
| Primitives UI    | `components/ui/` (`Container`, `Section`, `SectionHeading`, `Button`, `LinkButton`, `Card`)        |

Règles :

- aucune donnée métier inventée ;
- témoignages / section « Elles me font confiance » : **retirés de la V1**
  (`TESTIMONIALS-CONTENT-01` = `CANCELLED` — CTO 2026-08-02) ;
- galerie V1 = **inspirations illustrées** (pas des réalisations de Prisca).

## Galerie d’inspirations (GALLERY-CONTENT-01)

| Élément          | Emplacement                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| Données / copy   | `content/gallery.ts` (14 items, 6 filtres, copy landing + page)                  |
| Helper filtre    | `lib/gallery.ts` → `getGalleryItemsByCategory`                                   |
| Aperçu landing   | `components/sections/gallery-preview.tsx` (`#galerie`, 8 featured)               |
| Page dédiée      | `app/galerie/page.tsx`                                                           |
| Cartes / filtres | `components/gallery/` (`GalleryCard` Server, `GalleryFilters` Client)            |
| WebP runtime     | `public/images/gallery/*.webp` (14)                                              |
| Sources PNG      | `images/gallery/*.png` — hors dépôt (14 chemins exacts dans `.git/info/exclude`) |

Comportements :

- landing : rail horizontal + CTA « Découvrir la galerie » → `/galerie` ;
- `/galerie` : grille filtrable (Toutes / Tresses / Perruques / Tissage / Twists & locs / Coiffures afro) ;
- CTA final page → `/#reserver` ;
- navigation multi-route via `resolveNavigationForRoute` (`lib/navigation.ts`) ;
- wording interdit : « Nos réalisations », attribution mensongère à Prisca ;
- futures réalisations réelles : `kind=realisation` + consentements clientes uniquement.

## Shell public (LANDING-SHELL-01)

Le shell est composé dans `app/page.tsx` (pas dans le Root Layout) :

`SkipLink` → `Header` → `main` → `Footer`.

| Élément             | Emplacement                                                                  |
| ------------------- | ---------------------------------------------------------------------------- |
| Composants shell    | `components/shell/`                                                          |
| Unique Client Comp. | `mobile-navigation.tsx`, `booking-request-widget.tsx`, `gallery-filters.tsx` |
| Navigation filtrée  | `lib/navigation.ts` → `getVisibleNavigation` + `resolveNavigationForRoute`   |
| Identité / contact  | `content/site-config.ts` (+ `buildWhatsAppUrl()`)                            |

Règles :

- aucun lien vers une section absente de la page ;
- la même liste filtrée alimente Header, menu mobile et Footer ;
- Header statique en V1 (pas de sticky) ;
- Unique Client Components publics : `MobileNavigation`, `BookingRequestWidget`,
  `GalleryFilters`.

## Landing Core + contenu publié

Sections métier dans `components/sections/`, composées dans `app/page.tsx` :

`Hero` → `Services` → `GalleryPreview` → `FAQ` → `ContactBooking` (`#reserver` module demande + `#contact`).

| Section        | Ancre(s)               | Contenu                                                                                                |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Hero           | `#accueil`             | Art direction WebP desktop/mobile ; slogan ; CTA WhatsApp + `#services`                                |
| Services       | `#services`            | Six prestations illustrées (`content/services.ts`), grille 1/2/3                                       |
| Galerie        | `#galerie`             | Aperçu 8 featured + CTA `/galerie` ; page complète `/galerie` (14 illustrations + filtres)             |
| FAQ            | `#faq`                 | Cinq Q/R natives (`details`/`summary`) depuis `content/faq.ts`                                         |
| ContactBooking | `#reserver` `#contact` | Module demande RDV (calendrier, créneaux, formulaire, CTA WhatsApp dynamique) ; bandeau tel + WA plain |

Navigation visible : Accueil, Services, Galerie, FAQ, Réserver, Contact.

Volontairement absents (scope V1) :

- avis / témoignages (`TESTIMONIALS-CONTENT-01` = `CANCELLED` — CTO 2026-08-02) ;
- « Pourquoi me choisir ? » ;
- prix, durées, adresse, email ou réseaux inventés ;
- lightbox / page détail galerie ;
- calendrier / formulaire de réservation moteur (`BOOKING-ENGINE-V2` backlog).

## Commandes

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm check
```

## Qualité

`pnpm check` enchaîne typecheck, lint, format:check, test et build, et s’arrête
au premier échec.

## Scripts lifecycle pnpm

pnpm bloque volontairement le script lifecycle d’`esbuild` (dépendance
transitive de Vitest). Vitest fonctionne sans ce script dans l’état actuel du
projet. Toute future autorisation de script de dépendance nécessite un audit
explicite.

## Variables d’environnement

Les valeurs locales vont dans `.env.local`.

Ne jamais committer de secrets (`.env`, `.env.*` sont ignorés ; seul
`.env.example` peut être versionné s’il devient nécessaire).
