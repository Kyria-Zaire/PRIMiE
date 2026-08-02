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
- galerie et témoignages restent masqués (`content/gallery.ts` et
  `content/testimonials.ts` vides) et sont reportés vers des features futures
  (`GALLERY-CONTENT-01`, `TESTIMONIALS-CONTENT-01` — BACKLOG).

## Shell public (LANDING-SHELL-01)

Le shell est composé dans `app/page.tsx` (pas dans le Root Layout) :

`SkipLink` → `Header` → `main` → `Footer`.

| Élément             | Emplacement                                        |
| ------------------- | -------------------------------------------------- |
| Composants shell    | `components/shell/`                                |
| Unique Client Comp. | `mobile-navigation.tsx` (disclosure Menu / Fermer) |
| Navigation filtrée  | `lib/navigation.ts` → `getVisibleNavigation(...)`  |
| Identité / contact  | `content/site-config.ts` (+ `buildWhatsAppUrl()`)  |

Règles :

- aucun lien vers une section absente de la page ;
- la même liste filtrée alimente Header, menu mobile et Footer ;
- Header statique en V1 (pas de sticky) ;
- Unique Client Component du parcours : `MobileNavigation`.

## Landing Core + contenu publié

Sections métier dans `components/sections/`, composées dans `app/page.tsx` :

`Hero` → `Services` → `FAQ` → `ContactBooking` (`#reserver` module demande + `#contact`).

| Section        | Ancre(s)               | Contenu                                                                                                |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| Hero           | `#accueil`             | Art direction WebP desktop/mobile ; slogan ; CTA WhatsApp + `#services`                                |
| Services       | `#services`            | Six prestations illustrées (`content/services.ts`), grille 1/2/3                                       |
| FAQ            | `#faq`                 | Cinq Q/R natives (`details`/`summary`) depuis `content/faq.ts`                                         |
| ContactBooking | `#reserver` `#contact` | Module demande RDV (calendrier, créneaux, formulaire, CTA WhatsApp dynamique) ; bandeau tel + WA plain |

Navigation visible : Accueil, Services, FAQ, Réserver, Contact.

Volontairement absents (scope différé CTO 2026-08-01) :

- galerie / « Nos réalisations » ;
- avis / témoignages ;
- « Pourquoi me choisir ? » ;
- prix, durées, adresse, email ou réseaux inventés ;
- calendrier / formulaire de réservation (`BOOKING-ENGINE-V2` backlog).

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
