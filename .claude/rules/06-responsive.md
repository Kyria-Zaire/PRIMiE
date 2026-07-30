---
paths:
  - "app/**/*.css"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
---

# PRIMiE — Responsive design

## 1. Principe directeur

PRIMiE est conçu pour le mobile en premier.

Ordre de conception et de vérification :

1. petit mobile ;
2. mobile standard ;
3. grand mobile ;
4. tablette ;
5. ordinateur portable ;
6. grand écran.

Une version desktop réussie ne valide jamais la version mobile.

Le responsive ne consiste pas à réduire une composition desktop. Chaque largeur
doit conserver :

- la hiérarchie ;
- la lisibilité ;
- le parcours ;
- les actions principales ;
- la qualité des images ;
- un rythme visuel cohérent.

Le fichier racine `CLAUDE.md` et les règles produit, composants et design system
restent prioritaires.

## 2. Largeur minimale

La landing page fonctionne sans débordement horizontal à partir de `320px`.

À `320px` :

- le contenu essentiel reste complet ;
- les textes ne sont pas tronqués ;
- les CTA restent utilisables ;
- aucun élément n'impose une largeur supérieure au viewport ;
- les images conservent un cadrage utile ;
- le menu mobile reste accessible ;
- le numéro de téléphone reste lisible.

Ne réduis pas le texte sous les limites du design system pour résoudre un
problème de largeur.

## 3. Breakpoints de référence

Utiliser les breakpoints Tailwind standards sauf besoin démontré :

| Préfixe | Largeur minimale | Usage |
| --- | --- | --- |
| base | `0px` | Mobile-first |
| `sm` | `640px` | Grand mobile et petits changements |
| `md` | `768px` | Tablette |
| `lg` | `1024px` | Ordinateur et navigation desktop |
| `xl` | `1280px` | Grands layouts |
| `2xl` | `1536px` | Ajustements rares |

Règles :

- écrire le style mobile sans préfixe ;
- ajouter seulement les changements nécessaires ;
- éviter un breakpoint personnalisé pour masquer un mauvais layout ;
- choisir une rupture selon le contenu ;
- ne jamais détecter l'appareil par user-agent pour la mise en page.

## 4. Matrice de contrôle

Vérifier au minimum :

```text
320px
360px
375px
390px
414px
768px
1024px
1280px
1440px
```

Vérifier également :

- un mobile en orientation paysage ;
- une faible hauteur d'écran ;
- un zoom navigateur à `200 %` ;
- un texte agrandi ;
- le menu mobile ouvert ;
- la lightbox ouverte ;
- une réponse FAQ longue.

Ne pas valider avec un seul preset DevTools.

## 5. Conteneurs

Le conteneur principal suit le design system :

- largeur maximale : `1280px` ;
- padding mobile : `20px` ;
- padding tablette : `32px` ;
- padding desktop : `48px`.

Patron recommandé :

```tsx
<div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
  {children}
</div>
```

Adapte les classes au token réellement configuré.

Ne crée pas plusieurs largeurs de conteneur presque identiques.
Un enfant de grille ou flex reçoit `min-w-0` si son contenu peut déborder.

## 6. Espacement fluide

Repères de section :

- mobile : `72–88px` verticalement ;
- tablette : `88–104px` ;
- desktop : `112–144px`.

Utiliser `clamp()` lorsque cela évite des ruptures brusques.

```css
padding-block: clamp(4.5rem, 8vw, 8rem);
```

Ne multiplie pas les overrides par breakpoint si une valeur fluide suffit.
Conserve le rythme validé du design system.

## 7. Typographie responsive

Les grands titres utilisent une taille fluide dans les limites validées.

```css
font-size: clamp(3rem, 9vw, 6rem);
```

Règles :

- aucune taille basée uniquement sur `vw` ;
- body au minimum à `1rem` ;
- titres autorisés sur plusieurs lignes ;
- aucun `whitespace-nowrap` sur un titre long ;
- `text-wrap: balance` pour les titres lorsque pertinent ;
- `text-wrap: pretty` pour les paragraphes lorsque supporté ;
- largeurs de lecture limitées ;
- aucune césure artificielle.

La forme du titre peut varier, mais ses mots et son sens restent identiques.

## 8. Ordre du contenu

L'ordre du DOM suit l'ordre logique de lecture mobile.

Utiliser l'ordre CSS seulement pour une variation visuelle mineure.

Il est interdit de :

- dupliquer le contenu pour mobile et desktop ;
- produire deux navigations depuis deux sources ;
- casser l'ordre clavier avec une inversion visuelle ;
- masquer une information essentielle sur mobile ;
- réserver une action importante au hover.

## 9. Header

Comportement recommandé :

- mobile et tablette : identité, CTA essentiel si possible, bouton menu ;
- desktop à partir de `lg` : navigation complète et CTA ;
- hauteur stable ;
- zone tactile minimale de `44px` ;
- aucun chevauchement avec le Hero.

Règles :

- logo lisible à `320px` ;
- liens desktop jamais compressés ;
- bascule vers le menu avant collision ;
- CTA principal jamais supprimé sans alternative ;
- `scroll-margin-top` adapté pour les sections ciblées ;
- Header sticky raisonnable sur petit écran ;
- aucun saut de layout lors de son changement d'état.

## 10. Menu mobile

Le menu mobile doit :

- utiliser toute la largeur utile ;
- respecter les zones sûres de l'appareil ;
- rester utilisable avec une faible hauteur ;
- permettre un scroll interne si nécessaire ;
- proposer des liens suffisamment espacés ;
- conserver le CTA WhatsApp visible ;
- ne jamais dépasser le viewport ;
- garder le bouton de fermeture accessible.

Préférer :

- `svh` pour une hauteur stable ;
- `dvh` pour une hauteur dynamique ;
- éviter `100vh` comme unique solution mobile.

## 11. Hero

### Mobile

- contenu textuel prioritaire ;
- CTA empilés ou pleine largeur si nécessaire ;
- média sans repousser l'action principale trop bas ;
- aucun décor causant un débordement ;
- hauteur guidée par le contenu.

### Tablette

- composition asymétrique si l'espace le permet ;
- titre de taille maîtrisée ;
- écart clair entre texte et image.

### Desktop

- grille texte/média ou composition éditoriale validée ;
- largeur de texte limitée ;
- image assez grande pour montrer la coiffure ;
- aucun vide artificiel uniquement pour remplir l'écran.

Ne pas imposer `min-height: 100vh` si le contenu rend le Hero inconfortable.
Préférer une unité moderne et une hauteur libre.

## 12. CTA

Sur petit écran :

- CTA principal pleine largeur si utile ;
- CTA secondaires empilés avec un écart clair ;
- cible tactile minimale de `44px` ;
- libellé jamais tronqué ;
- icône conservée sans réduire le texte.

Lorsque l'espace le permet :

- CTA alignés horizontalement ;
- aucune largeur fixe inutile ;
- ordre de priorité conservé.

Un CTA ne sort jamais de son conteneur à cause d'un texte plus long.

## 13. Grilles de contenu

| Contenu | Mobile | Tablette | Desktop |
| --- | --- | --- | --- |
| Services | 1 colonne | 2 colonnes | 3 colonnes |
| Bénéfices | 1 colonne | 2 colonnes | 3 colonnes |
| Avis | 1 colonne | 2 colonnes | 3 si lisible |
| Contact | 1 colonne | 1 ou 2 colonnes | 2 colonnes |

Ces valeurs sont des points de départ. Le contenu décide du résultat final.

Règles :

- utiliser `gap` plutôt que des marges entre enfants ;
- ne pas fixer la hauteur d'une carte pour l'égaliser ;
- autoriser l'étirement naturel dans une ligne ;
- ne pas ajouter une colonne au détriment de la lisibilité ;
- utiliser `auto-fit` ou `minmax()` seulement avec un rendu prévisible.

## 14. Galerie

Repères :

- petit mobile : 2 colonnes si lisible, sinon 1 ;
- grand mobile : 2 colonnes ;
- tablette : 3 colonnes ;
- desktop : 3 ou 4 colonnes selon les médias.

Règles :

- gaps suffisants pour distinguer les images ;
- pas de priorité de chargement sur toute la galerie ;
- ratio cohérent par famille de médias ;
- aucune masonry complexe en V1 ;
- filtres horizontaux avec affordance visible ;
- lightbox utilisable sur écran étroit et paysage ;
- boutons précédent, suivant et fermer toujours visibles.

## 15. Images responsives

Utiliser `next/image` avec `sizes` adapté à la grille réelle.

```tsx
sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
```

Adapter la valeur au conteneur, pas seulement au viewport.

Règles :

- ratio défini par le conteneur ;
- `fill` seulement avec un parent positionné et dimensionné ;
- point focal ajusté avec `object-position` si nécessaire ;
- composition adaptée au Hero ;
- aucune priorité sur toute la galerie ;
- sources non surdimensionnées ;
- cadrage vérifié à chaque largeur cible.

## 16. Contenus longs

Tester :

- titre plus long ;
- description sur plusieurs lignes ;
- nom de service long ;
- numéro de téléphone ;
- URL de réseau social ;
- réponse FAQ longue ;
- CTA avec libellé explicite.

Utiliser selon le contexte :

- `min-w-0` ;
- `overflow-wrap: anywhere` pour une URL incontrôlable ;
- `break-words` ;
- une largeur maximale de lecture.

Ne pas tronquer un contenu dont la version complète est nécessaire.

## 17. Débordements

Avant `overflow-x-hidden`, identifier la cause réelle.

Causes fréquentes :

- largeur fixe ;
- `100vw` dans un conteneur avec scrollbar ;
- décor absolu ;
- transformation ;
- image sans contrainte ;
- chaîne non cassable ;
- grille avec largeur minimale excessive ;
- padding ajouté à une largeur totale.

`overflow-x-hidden` ne doit pas masquer un bug.

Un décor absolu peut être isolé dans un wrapper avec overflow contrôlé.

## 18. CSS et JavaScript

Utiliser CSS pour la mise en page responsive.

Ne pas :

- lire `window.innerWidth` pendant le rendu ;
- créer deux arbres React selon la largeur ;
- ajouter un listener `resize` pour une simple grille ;
- utiliser JavaScript si des media queries suffisent ;
- provoquer un décalage d'hydratation selon le viewport.

JavaScript est acceptable seulement lorsqu'un comportement, pas une simple
présentation, dépend réellement de la largeur.

## 19. Accessibilité au zoom

À `200 %` :

- contenu disponible ;
- navigation basculée avant collision ;
- aucun texte coupé ;
- dialogs contrôlables ;
- focus visible ;
- toutes les actions accessibles ;
- aucun double scroll horizontal et vertical sans nécessité.

Ne jamais désactiver le zoom dans le viewport.

## 20. Orientation et hauteur

Sur mobile paysage ou écran court :

- Header et menu n'occupent pas toute la hauteur ;
- CTA important reste atteignable ;
- Dialog et lightbox peuvent défiler ;
- contenu n'est pas centré verticalement s'il risque d'être coupé ;
- zones sûres sont respectées ;
- clavier virtuel ne rend pas la fermeture impossible.

Ne valide pas seulement les écrans hauts utilisés par les maquettes.

## 21. Validation section par section

Pour chaque section, vérifier :

1. ordre de lecture ;
2. largeur des textes ;
3. retours à la ligne ;
4. taille des CTA ;
5. cadrage des images ;
6. nombre de colonnes ;
7. gaps et padding ;
8. focus clavier ;
9. absence de débordement ;
10. contenu long ;
11. orientation paysage ;
12. zoom.

Une capture desktop seule ne valide pas le responsive.

## 22. Interdictions

- Construire desktop puis corriger mobile à la fin.
- Utiliser des largeurs fixes pour le contenu principal.
- Masquer un contenu important sur mobile.
- Dupliquer le DOM par breakpoint.
- Utiliser `100vh` sans considérer les navigateurs mobiles.
- Ajouter des breakpoints pour chaque appareil.
- Détecter le user-agent pour la mise en page.
- Tronquer un CTA.
- Réduire le body sous `1rem`.
- Cacher un débordement sans en corriger la cause.
- Exiger un hover.
- Bloquer le zoom.
- Charger une image desktop énorme sans `sizes` adapté.
- Valider uniquement à `375px` et `1440px`.

## 23. Definition of Done

Une interface est responsive lorsqu'elle :

- fonctionne de `320px` au grand écran ;
- conserve le parcours WhatsApp ;
- ne présente aucun débordement involontaire ;
- garde une hiérarchie lisible ;
- utilise des images correctement dimensionnées et cadrées ;
- reste utilisable au tactile et au clavier ;
- supporte le zoom et le texte agrandi ;
- fonctionne en orientation paysage ;
- n'utilise pas JavaScript pour une simple mise en page ;
- a été vérifiée sur la matrice de contrôle ;
- documente tout viewport non vérifié.
