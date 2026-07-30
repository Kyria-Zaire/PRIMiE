---
name: ui-component-development
description: Concevoir, créer, modifier, refactoriser, auditer ou tester les composants UI de PRIMiE avec Next.js 15, React, TypeScript strict, Tailwind CSS, shadcn/ui et Radix. Utiliser cette skill pour primitives, composants shared, layout ou sections, contrats de props, variantes, composition, Server et Client Components, boutons, liens, WhatsAppLink, SectionContainer, SectionHeading, ResponsiveImage, Header, menu mobile, galerie, filtres, lightbox, FAQ, icônes, animations, accessibilité, responsive, tests ou réduction d’une abstraction excessive.
---

# UI Component Development PRIMiE

Créer des composants clairs, typés, accessibles et composables sans transformer
une landing page simple en bibliothèque générique. Préserver les frontières
serveur/client, les sources de contenu et la direction artistique PRIMiE.

## 1. Charger le contexte

Avant toute action :

1. lire `CLAUDE.md` ;
2. lire `05-ui-components.md`, `02-architecture.md`, `03-code-standards.md`,
   `04-design-system.md`, `06-responsive.md`, `09-accessibility.md` et
   `do-not-break.md` selon la demande ;
3. lire le brief et les critères d’acceptation ;
4. inspecter composant, parents, enfants, imports, contenus et tests ;
5. lire `package.json`, `components.json` et la configuration réelle ;
6. chercher un composant ou pattern existant avant d’en créer un ;
7. vérifier l’état local et préserver tout travail inconnu.

Utiliser `rg --files` et `rg` pour localiser usages, variantes, données, tokens,
frontières clientes et sélecteurs de test.

## 2. Respecter le mode demandé

Distinguer :

- **conception** : définir le contrat sans coder ;
- **création** : ajouter un besoin confirmé ;
- **modification** : préserver l’API sauf décision contraire ;
- **refactorisation** : améliorer sans changer le comportement ;
- **audit** : analyser sans modifier ;
- **test** : ajouter ou exécuter les preuves autorisées.

Une demande de composant n’autorise pas une refonte de page, une nouvelle
dépendance, un commit ou un déploiement.

## 3. Protéger le produit

Préserver :

```text
Marque : Chez PRIMiE Coiffure
Porteuse : Prisca
Téléphone : +33 7 49 61 65 82
WhatsApp : https://wa.me/33749616582
```

Conserver l’ordre officiel des sections, les six prestations, le vouvoiement,
le parcours WhatsApp, l’accessibilité, le responsive, le SEO et les
performances.

Ne pas placer un fait métier dans une primitive générique.

## 4. Respecter les couches

Utiliser :

```text
components/ui
  → primitives génériques

components/shared
  → composants transversaux PRIMiE

components/layout
  → Header, navigation et Footer

components/sections
  → sections métier de la landing page
```

Une couche basse ne dépend jamais d’une couche haute. `content/` ne dépend pas
des composants et `lib/` ne dépend pas de React.

## 5. Créer seulement avec une raison

Créer un composant s’il :

- possède une responsabilité visuelle claire ;
- a plusieurs usages réels ;
- isole une interaction ;
- réduit la complexité d’un parent ;
- représente un concept métier ;
- encapsule un comportement accessible complexe.

Ne pas extraire un wrapper vide, trois lignes uniques, un simple alias de balise,
une abstraction « au cas où » ou une variation de texte.

## 6. Définir le contrat

Préciser :

- responsabilité ;
- niveau architectural ;
- structure HTML ;
- contenu et source ;
- props nécessaires ;
- variantes ;
- états ;
- comportement clavier et tactile ;
- responsive ;
- frontière serveur/client ;
- tests ;
- consommateurs.

Un composant conserve une responsabilité principale et ne corrige pas
silencieusement les erreurs de ses appelants.

## 7. Écrire des props strictes

Règles :

- type local si un seul fichier le consomme ;
- prop obligatoire si nécessaire ;
- union littérale pour une variante fermée ;
- `children` seulement pour une composition réelle ;
- `className` sur primitives et shared pertinents ;
- fusion via `cn()` ;
- callback préfixée `on` ;
- handler interne préfixé `handle` ;
- aucune prop non utilisée ;
- aucune propagation DOM aveugle.

Interdire `any`, `React.FC` par défaut et assertion destinée à faire taire le
compilateur.

## 8. Préférer une API minimale

Exemple :

```tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
};
```

Éviter :

```tsx
<Card dark gold large rounded centered bordered animated />
```

Préférer composition ou une variante décrivant une intention. Ne pas prévoir
des options hypothétiques.

## 9. Concevoir les variantes

Utiliser des intentions stables :

- `primary` ;
- `secondary` ;
- `outline` ;
- `ghost` ;
- `dark` ;
- `light`.

Éviter `yellow`, `black2` ou `beigeCard`. Une variante utilisée une seule fois
peut rester un `className` lisible.

Vérifier que chaque variante couvre états, contraste, focus et responsive.

## 10. Rester serveur par défaut

Conserver un Server Component pour :

- contenu statique ;
- composition ;
- lecture de données locales ;
- metadata ;
- rendu sans API navigateur.

Ajouter `"use client"` uniquement pour hook, state, événement, API navigateur
ou primitive interactive qui l’exige.

Placer la frontière au plus bas, transmettre des props sérialisables et ne
jamais rendre toute une section cliente pour une micro-interaction.

## 11. Gérer l’état avec retenue

Utiliser un state local uniquement pour une valeur temporelle affectant le
rendu.

Ne pas stocker :

- valeur dérivable ;
- liste filtrée calculable ;
- constante ;
- configuration ;
- doublon d’un autre state.

Réserver `useEffect` à une synchronisation externe. Ne pas ajouter
`useMemo`, `useCallback` ou état global sans preuve.

## 12. Centraliser le contenu

Lire dans :

```text
content/site-config.ts
content/navigation.ts
content/services.ts
content/gallery.ts
content/benefits.ts
content/testimonials.ts
content/faq.ts
```

Le JSX ne redéclare pas les coordonnées, prestations ou textes commerciaux.
Conserver identifiants stables et types explicites.

Une primitive `ui` ne doit jamais importer `siteConfig`.

## 13. Utiliser le HTML sémantique

Employer :

- `<button>` pour une action ;
- `<a>` pour destination externe, téléphone ou WhatsApp ;
- `next/link` pour une route interne ;
- ancre native pour une section ;
- liste pour une collection ;
- landmarks et titres cohérents.

Ne jamais utiliser `<div onClick>`, lien sans `href`, bouton pour naviguer,
contrôles imbriqués ou rôle ARIA contredisant le HTML.

## 14. Utiliser shadcn/ui avec intention

Utiliser selon besoin :

- `Button` ;
- `Accordion` ;
- `Dialog` ;
- `Sheet` ;
- `Tabs` si le pattern convient.

Conserver les comportements Radix, appliquer les tokens PRIMiE et adapter sans
casser l’accessibilité.

Ne pas installer une primitive inutilisée, cumuler deux bibliothèques UI ou
réécrire focus trap, dialog ou accordéon robuste.

## 15. Concevoir boutons et liens

Le style ne change pas la sémantique :

- une navigation reste un lien ;
- une action reste un bouton ;
- un lien peut adopter une variante visuelle de bouton.

Garantir :

- nom accessible ;
- focus visible ;
- cible `44 × 44px` ;
- états hover, actif et désactivé pertinents ;
- libellé non tronqué ;
- contraste ;
- absence de CTA factice.

## 16. Construire les composants shared

Limiter chaque contrat à sa responsabilité :

- `SectionContainer` : largeur, padding et centrage ;
- `SectionHeading` : eyebrow, titre, description et alignement limité ;
- `WhatsAppLink` : URL canonique, message validé, sémantique de lien et variante ;
- `ResponsiveImage` : ratio, point focal et fallback réellement partagés.

Ne pas confier au conteneur couleur ou logique métier. Ne pas choisir un niveau
de titre sans contexte. Ne pas passer le numéro WhatsApp à chaque appelant.

Créer `ResponsiveImage` seulement après plusieurs usages réels et laisser
accessibles `next/image`, `sizes`, dimensions, priorité et texte alternatif.

## 17. Construire le menu mobile

Utiliser `Sheet` ou `Dialog`. Garantir :

- bouton nommé ;
- état ouvert exposé ;
- focus déplacé puis restauré ;
- fermeture par `Escape` ;
- fermeture après une ancre ;
- fond non interactif si modal ;
- scroll maîtrisé ;
- navigation non dupliquée ;
- CTA WhatsApp accessible.

Tester clavier, tactile, petite hauteur et zoom.

## 18. Composer la galerie

Séparer si la complexité le justifie :

```text
GallerySection
GalleryFilters
GalleryGrid
GalleryItem
GalleryLightbox
```

Lire `content/gallery.ts`. Sans JavaScript, afficher au minimum les
réalisations. Les filtres et la lightbox sont une amélioration progressive.

Ne pas transformer toutes les images en composants clients.

## 19. Construire les filtres

Garantir :

- option `Toutes` ;
- état sélectionné unique ;
- boutons ou tabs sémantiques ;
- état actif visible et accessible ;
- liste filtrée dérivée ;
- IDs stables ;
- état vide compréhensible ;
- aucune requête réseau.

Limiter la frontière cliente aux filtres et résultats réellement interactifs.

## 20. Construire la lightbox

Utiliser `Dialog` comme base. Garantir :

- ouverture depuis une réalisation ;
- nom accessible ;
- image et alt ;
- fermer avec bouton et `Escape` ;
- focus piégé puis restauré ;
- fond sans scroll ;
- navigation nommée ;
- tactile sans swipe obligatoire.

Ne pas reproduire un dialog avec `position: fixed` et `onClick`.

## 21. Construire la FAQ

Utiliser `Accordion`. Garantir :

- questions depuis `content/faq.ts` ;
- bouton réel ;
- titre lisible ;
- état annoncé ;
- réponse associée ;
- stratégie d’ouverture explicite ;
- aucun HTML injecté ;
- aucune information inventée.

Ne pas simuler un accordéon avec hauteur animée et `<div>` cliquable.

## 22. Gérer icônes et images

Utiliser Lucide pour les icônes courantes. Appliquer taille et épaisseur
cohérentes. Masquer une icône décorative et nommer un contrôle icon-only.

Pour les images :

- utiliser `next/image` ;
- fournir dimensions ou ratio ;
- définir `sizes` ;
- réserver la priorité au LCP ;
- écrire un alt utile ;
- distinguer illustration et réalisation.

Ne pas mélanger plusieurs bibliothèques d’icônes.

## 23. Appliquer Tailwind et les tokens

Utiliser :

- tokens sémantiques ;
- `cn()` pour conditions ;
- classes lisibles ;
- styles globaux seulement pour variables et bases ;
- inline style uniquement pour valeur réellement dynamique.

Éviter valeurs arbitraires répétées, `!important`, classes contradictoires,
concaténation Tailwind dynamique et hack global pour un défaut local.

## 24. Préserver responsive et accessibilité

Vérifier :

- `320`, `390`, `768` et `1440px` ;
- zoom `200 %` ;
- contenu long ;
- cibles `44 × 44px` ;
- ordre DOM et focus ;
- clavier et `Escape` ;
- contraste ;
- mouvement réduit ;
- aucun hover obligatoire ;
- aucun débordement.

Tester le composant dans son contexte, pas uniquement dans une démo isolée.

## 25. Écrire les tests

Tester le comportement observé par l’utilisatrice :

- rôle ;
- nom accessible ;
- état ;
- clavier ;
- focus ;
- résultat ;
- responsive critique.

Sélectionner par rôle, nom, texte ou label. Utiliser `data-testid` seulement
sans sélecteur utilisateur fiable.

Ne pas modifier le HTML pour satisfaire un test fragile.

## 26. Implémenter avec méthode

Si la modification est autorisée :

1. définir contrat et consommateurs ;
2. rechercher la réutilisation existante ;
3. choisir la bonne couche ;
4. écrire props et HTML ;
5. ajouter styles et états ;
6. isoler l’interaction ;
7. intégrer dans le contexte réel ;
8. ajouter un test pertinent ;
9. vérifier diff, types, lint, tests et build ;
10. réaliser QA responsive et clavier.

Faire le plus petit diff cohérent.

## 27. Définition de terminé

Un composant est terminé lorsque :

- rôle et couche sont clairs ;
- API est minimale et typée ;
- HTML est sémantique ;
- états sont couverts ;
- clavier, focus et tactile fonctionnent ;
- styles utilisent les tokens ;
- responsive est vérifié ;
- contenu et helpers ne sont pas dupliqués ;
- frontière cliente reste minimale ;
- tests pertinents passent ;
- contexte réel est contrôlé.

## 28. Interdictions absolues

Ne jamais :

- créer une primitive avec contenu PRIMiE ;
- dupliquer un composant pour couleur ou texte ;
- rendre un `<div>` cliquable ;
- imbriquer lien et bouton ;
- utiliser une icône seule sans nom ;
- créer un dialog ou accordéon inaccessible ;
- ajouter `"use client"` à toute une section ;
- transmettre props inutilisées ;
- multiplier les variantes hypothétiques ;
- utiliser index comme clé d’une liste modifiable ;
- injecter du contenu éditorial avec `dangerouslySetInnerHTML` ;
- cacher du contenu derrière hover ;
- ajouter un composant vide pour l’arborescence ;
- affaiblir TypeScript ou les tests ;
- déployer sans autorisation.

Séparer dans le compte rendu composants créés ou modifiés, contrats, tests,
viewports, QA manuelle, dépendances et éléments non vérifiés.
