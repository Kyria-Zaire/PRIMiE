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
- galerie, témoignages et FAQ restent masqués tant que non validés (`content/` tableaux vides).

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
- les sections métier (Hero, Services, galerie, etc.) sont hors de cette feature.

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
