---
paths:
  - "app/**/*.{ts,tsx}"
  - "components/**/*.{ts,tsx}"
  - "content/**/*.{ts,tsx}"
  - "lib/**/*.{ts,tsx}"
  - "types/**/*.ts"
  - "next.config.ts"
  - "tsconfig.json"
  - "package.json"
---

# PRIMiE — Architecture frontend

## 1. Rôle de cette règle

Cette règle définit l'architecture technique de la V1 de PRIMiE.

Elle s'applique lorsqu'une tâche :

- crée, déplace ou supprime un fichier applicatif ;
- modifie une frontière entre composants ;
- introduit une dépendance ;
- change le partage serveur/client ;
- centralise des données ou des utilitaires ;
- modifie la configuration Next.js ou TypeScript.

Le fichier racine `CLAUDE.md` et `01-product-scope.md` restent prioritaires.

## 2. Objectif architectural

Construire une landing page claire, simple à modifier, performante par défaut,
strictement typée et compatible avec Next.js 15 App Router, sans architecture
surdimensionnée.

PRIMiE est le premier cas d'usage du futur `IMORIA Business Kit`, mais la V1
reste un produit simple. Ne construis pas un framework avant d'avoir plusieurs
cas d'usage réels.

## 3. Décisions structurantes

- Utiliser une application Next.js unique, sans monorepo.
- Conserver `app/` à la racine, sans dossier `src/`.
- Utiliser l'App Router.
- Utiliser TypeScript en mode strict.
- Utiliser `pnpm` comme gestionnaire de paquets.
- Rendre les composants côté serveur par défaut.
- Ajouter `"use client"` uniquement à la frontière interactive minimale.
- Centraliser le contenu métier hors des composants de présentation.
- Ne créer ni backend, ni API métier, ni base de données pour la V1.
- Éviter tout état global.

Ne modifie pas ces décisions sans validation explicite du CTO.

## 4. Arborescence cible

```text
PRIMIE/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── favicon.ico
│   ├── manifest.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx
│   └── opengraph-image.*
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── mobile-menu.tsx
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── services-section.tsx
│   │   ├── gallery-section.tsx
│   │   ├── why-choose-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── booking-section.tsx
│   │   └── contact-section.tsx
│   ├── shared/
│   │   ├── section-heading.tsx
│   │   ├── whatsapp-link.tsx
│   │   └── responsive-image.tsx
│   └── ui/
├── content/
│   ├── site-config.ts
│   ├── navigation.ts
│   ├── services.ts
│   ├── gallery.ts
│   ├── benefits.ts
│   ├── testimonials.ts
│   └── faq.ts
├── lib/
│   ├── utils.ts
│   ├── whatsapp.ts
│   └── seo.ts
├── types/
│   └── content.ts
├── public/
│   ├── brand/
│   └── images/
│       ├── hero/
│       ├── services/
│       └── gallery/
├── .cursor/
│   └── rules/
├── .claude/
│   ├── rules/
│   ├── skills/
│   ├── commands/
│   └── agents/
├── CLAUDE.md
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

Cette arborescence est une cible évolutive.

Ne crée jamais un fichier vide pour reproduire l'arbre, un dossier sans
responsabilité réelle, une abstraction prématurée ou une configuration inutilisée.

## 5. Responsabilités de `app/`

`app/` contient :

- les routes ;
- les layouts ;
- les métadonnées et fichiers spéciaux Next.js ;
- les styles globaux ;
- la composition générale des pages.

`app/page.tsx` orchestre les sections et ne doit pas contenir :

- toute l'implémentation de la landing page ;
- les collections de contenu métier ;
- une logique interactive complexe ;
- des helpers génériques ;
- `"use client"` sans nécessité démontrée.

## 6. Responsabilités de `components/`

### `components/layout/`

Contient les éléments structurants autour du contenu principal :

- Header ;
- navigation mobile ;
- Footer.

### `components/sections/`

Contient les grandes sections métier de la landing page.

Une section :

- sert un objectif utilisateur précis ;
- reçoit ou importe des données typées ;
- compose des composants partagés et des primitives ;
- évite les constantes métier dupliquées ;
- conserve une API de propriétés lisible.

### `components/shared/`

Contient les composants propres à PRIMiE réutilisés dans plusieurs sections.

Un composant y entre seulement :

- après une deuxième utilisation réelle ;
- ou lorsqu'il porte une responsabilité transversale claire.

### `components/ui/`

Contient les primitives d'interface, notamment celles générées ou adaptées depuis
shadcn/ui.

Une primitive UI :

- reste générique ;
- ne contient aucun texte commercial PRIMiE ;
- ne dépend jamais d'une section métier ;
- conserve son accessibilité lors d'une adaptation visuelle.

## 7. Responsabilités de `content/`

`content/` contient les informations éditoriales et commerciales publiques :
identité, coordonnées, navigation, services, galerie, avantages, témoignages
validés, FAQ et textes des CTA.

Les composants ne redéclarent pas ces valeurs.

`content/site-config.ts` est la source canonique pour :

- le nom commercial ;
- le numéro affiché ;
- le numéro E.164 ;
- le lien WhatsApp ;
- les liens publics validés ;
- les métadonnées globales confirmées.

Une valeur publique stable ne doit pas être placée dans une variable
d'environnement uniquement pour paraître configurable.

## 8. Responsabilités de `lib/`, `types/` et `public/`

### `lib/`

Contient les fonctions pures et utilitaires partagés :

- création des liens WhatsApp ;
- helpers de métadonnées ;
- assemblage conditionnel de classes ;
- transformations sans dépendance à l'interface.

`lib/` n'est pas un dossier fourre-tout et ne dépend pas de React.

### `types/`

Contient uniquement les types partagés entre plusieurs fichiers.

Un type utilisé dans un seul module reste local à ce module.

### `public/`

Contient les ressources statiques publiques.

Les médias doivent :

- être classés par rôle ;
- utiliser des noms descriptifs en `kebab-case` ;
- éviter les espaces et suffixes ambigus ;
- conserver les originaux lorsqu'une transformation est produite ;
- ne contenir aucune métadonnée privée inutile.

## 9. Composition de la page

`app/page.tsx` doit rester déclaratif et lisible.

Niveau de composition attendu :

```tsx
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <WhyChooseSection />
        <TestimonialsSection />
        <FaqSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

Ne pas introduire de logique métier, d'effets React ou de données dupliquées dans
la page de composition.

## 10. Frontières serveur et client

Tout composant est un Server Component par défaut.

Un Client Component est autorisé pour une interaction qui exige le navigateur,
par exemple :

- menu mobile ;
- filtres de galerie ;
- lightbox ;
- accordéon FAQ si la primitive l'exige ;
- animation dépendante du navigateur.

Règles :

- placer `"use client"` au niveau le plus bas possible ;
- isoler l'interactivité d'une section statique ;
- transmettre uniquement des propriétés sérialisables ;
- ne pas importer un module serveur dans un composant client ;
- éviter un effet React pour une valeur calculable au rendu ;
- éviter les wrappers clients sans responsabilité ;
- ne pas ajouter de state manager global.

Une animation ne justifie pas de convertir toute la page en Client Component.

## 11. Architecture des contenus

Les données publiques utilisent des types explicites.

Exemple :

```ts
export type Service = {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  category: string;
};
```

Exigences :

- identifiants stables ;
- valeurs `readonly` lorsque pertinent ;
- aucun `any` ;
- aucune donnée métier recopiée dans plusieurs tableaux ;
- aucun texte commercial caché dans une primitive UI ;
- contenus provisoires explicitement marqués ;
- données compatibles avec le rendu serveur.

Ne crée pas une base de données ou un CMS pour du contenu statique V1.

## 12. Sens des dépendances

Respecter le sens suivant :

```text
app
  → components/sections et components/layout
    → components/shared et components/ui
      → lib et types

content
  → types
```

Contraintes :

- `components/ui/` ne dépend pas de `components/sections/` ;
- `lib/` ne dépend pas de React ni des composants ;
- `content/` ne dépend pas d'un composant ;
- une section peut consommer contenu, types, helpers et primitives ;
- aucune dépendance circulaire ;
- pas de fichier `index.ts` uniquement pour réexporter un dossier entier.

Avant de déplacer un fichier partagé, rechercher tous ses importateurs.

## 13. Imports et conventions

Utiliser l'alias `@/` pour les imports internes.

```ts
import { siteConfig } from "@/content/site-config";
import { createWhatsAppUrl } from "@/lib/whatsapp";
```

Conventions :

- fichiers et dossiers : `kebab-case` ;
- composants React : `PascalCase` ;
- fonctions et variables : `camelCase` ;
- types et interfaces : `PascalCase` ;
- constantes réellement globales : `UPPER_SNAKE_CASE` avec retenue ;
- un composant principal par fichier ;
- exports nommés, sauf convention imposée par Next.js.

Éviter :

- imports relatifs profonds ;
- alias supplémentaires sans besoin ;
- réexports masquant l'origine d'une dépendance ;
- imports entre couches dans le mauvais sens.

## 14. Images, polices et icônes

- Utiliser `next/image` pour les images de contenu.
- Fournir des dimensions ou un conteneur au ratio maîtrisé.
- Utiliser `next/font` pour les polices du projet.
- Utiliser Lucide pour les icônes d'interface courantes.
- Ne pas importer plusieurs bibliothèques d'icônes.
- Ne pas charger une image distante sans configurer sa source.
- Ne pas encoder une grande image dans le code.
- Ne pas traiter une image de réalisation comme une simple décoration.

Les images décoratives doivent être ignorées par les technologies d'assistance.

## 15. Métadonnées et fichiers système

Utiliser les mécanismes natifs de l'App Router :

- `metadata` dans `app/layout.tsx` ;
- `app/robots.ts` ;
- `app/sitemap.ts` ;
- `app/manifest.ts` ;
- image Open Graph dédiée ;
- `app/not-found.tsx`.

Ne pas ajouter une bibliothèque SEO si les fonctions natives répondent au besoin.
Ne pas inventer un domaine canonique avant sa validation.

## 16. Configuration

La V1 ne nécessite normalement aucun secret.

Règles :

- conserver les données publiques dans `content/site-config.ts` ;
- utiliser une variable d'environnement seulement si la valeur varie réellement ;
- ne jamais placer un secret dans `NEXT_PUBLIC_*` ;
- fournir `.env.example` dès qu'une variable devient nécessaire ;
- ne jamais commiter `.env`, `.env.local` ou une variante sensible ;
- vérifier la configuration réelle avant d'en modifier une clé.

Toute modification de `package.json`, `tsconfig.json` ou `next.config.ts` doit
répondre à un problème identifié.

## 17. Réutilisation IMORIA Business Kit

Préparer la réutilisation avec trois frontières :

1. contenu métier centralisé ;
2. tokens visuels remplaçables ;
3. composants génériques sans texte PRIMiE en dur.

Ne pas créer dans la V1 :

- package npm interne ;
- monorepo ;
- moteur de thèmes dynamique ;
- CMS abstrait ;
- générateur de sites ;
- architecture de plugins.

L'extraction vers `IMORIA Business Kit` aura lieu après validation de plusieurs
cas d'usage réels.

## 18. Anti-patterns interdits

- Composant géant contenant toute la landing page.
- `"use client"` dans `app/page.tsx` sans nécessité démontrée.
- Services, coordonnées ou liens WhatsApp dupliqués.
- Redux, Zustand ou Context pour des états locaux simples.
- Route API servant uniquement à construire un lien WhatsApp.
- Base de données pour stocker le contenu statique.
- Contenu métier dans `components/ui/`.
- Abstraction sans deuxième usage réel.
- Dépendance circulaire ignorée.
- `any` utilisé pour éviter de typer une donnée.
- Application déplacée dans `src/`.
- Fichier vide créé pour anticiper une fonctionnalité.
- Dépendance ajoutée pour une fonction triviale.

## 19. Modification architecturale

Avant de modifier l'arborescence ou une frontière, expliquer :

1. le problème observé ;
2. pourquoi l'architecture actuelle ne suffit pas ;
3. la solution proposée ;
4. les fichiers déplacés ou affectés ;
5. les risques de régression ;
6. le coût de maintenance ajouté ;
7. le plan de vérification.

Une modification architecturale n'est pas un simple nettoyage.
Elle doit être justifiée et validée.

## 20. Definition of Done

Une modification architecturale est terminée lorsque :

- elle résout un besoin réel ;
- le périmètre V1 reste inchangé ;
- les frontières serveur/client sont minimales ;
- le sens des dépendances est respecté ;
- le contenu métier conserve une source unique ;
- aucun fichier ou dossier inutile n'est créé ;
- TypeScript strict reste intact ;
- les imports et chemins sont vérifiés ;
- les tests pertinents passent ;
- le build réussit ;
- le diff ne contient aucun refactor hors périmètre ;
- les impacts et limites sont consignés.
