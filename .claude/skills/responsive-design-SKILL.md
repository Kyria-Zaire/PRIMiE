---
name: responsive-design
description: Concevoir, auditer, corriger ou valider le responsive design mobile-first de PRiMiE. Utiliser cette skill pour travailler sur layouts, breakpoints Tailwind, grilles, conteneurs, typographie fluide, spacing, Header, menu mobile, Hero, CTA, services, galerie, FAQ, lightbox, images next/image, contenus longs, débordements, viewport units, safe areas, orientation, zoom 200 %, reflow à 320px, cibles tactiles, CSS media queries ou régressions entre mobile, tablette et desktop.
---

# Responsive Design PRiMiE

Concevoir d’abord pour le petit écran, puis enrichir lorsque l’espace le permet. Préserver à chaque largeur la hiérarchie, le contenu, les actions, le cadrage, l’accessibilité et le parcours WhatsApp.

## 1. Charger le contexte

Avant toute action :

1. lire `CLAUDE.md` ;
2. lire `06-responsive.md`, `04-design-system.md`, `05-ui-components.md`,
   `09-accessibility.md`, `08-images-assets.md` et `do-not-break.md` ;
3. inspecter le brief, la maquette et les décisions validées ;
4. lire les composants, styles, tokens et contenus concernés ;
5. vérifier la configuration Tailwind et Next.js réelle ;
6. identifier les consommateurs et états interactifs ;
7. vérifier l’état local et préserver tout travail inconnu.

Utiliser `rg --files` et `rg` pour localiser classes responsive, largeurs fixes,
overflow, `vw`, `vh`, `sizes`, `fill`, `order`, contenus dupliqués et logique
basée sur le viewport.

## 2. Respecter le mode demandé

Distinguer :

- **conception** : définir comportements sans modifier ;
- **audit** : observer et rapporter ;
- **correction** : modifier uniquement les défauts autorisés ;
- **refonte** : changer une composition après validation design ;
- **validation** : fournir des preuves sur la matrice de viewports.

Une demande responsive n’autorise pas une refonte éditoriale, un changement de
contenu, un commit ou un déploiement.

## 3. Protéger les invariants

Préserver :

```text
Marque : Chez PRiMiE Coiffure
Porteuse : Prisca
WhatsApp : https://wa.me/33749616582
Téléphone : +33 7 49 61 65 82
```

Conserver l’ordre officiel des sections, les six prestations, les CTA, les
titres, l’accessibilité, le SEO, les performances et la direction artistique.

Ne pas masquer une information importante sur mobile pour simplifier le layout.

## 4. Concevoir mobile-first

Travailler dans cet ordre :

1. petit mobile ;
2. mobile standard ;
3. grand mobile ;
4. tablette ;
5. ordinateur portable ;
6. grand écran.

Écrire les styles mobiles sans préfixe, puis ajouter seulement les adaptations
nécessaires. Ne pas réduire proportionnellement une maquette desktop.

Une version desktop réussie ne valide jamais le mobile.

## 5. Garantir le minimum à `320px`

À `320px`, vérifier :

- aucun débordement horizontal ;
- contenu essentiel complet ;
- texte non tronqué ;
- logo lisible ;
- titres sans collision ;
- CTA atteignables ;
- menu utilisable ;
- images bien cadrées ;
- cibles principales de `44 × 44px` ;
- aucun besoin de hover.

Ne pas réduire le body sous `1rem` pour faire rentrer un contenu.

## 6. Utiliser les breakpoints Tailwind

Références :

| Préfixe | Minimum | Usage |
| --- | ---: | --- |
| base | `0px` | mobile-first |
| `sm` | `640px` | grand mobile |
| `md` | `768px` | tablette |
| `lg` | `1024px` | desktop et navigation |
| `xl` | `1280px` | grand layout |
| `2xl` | `1536px` | ajustement rare |

Choisir une rupture lorsque le contenu ne fonctionne plus, pas pour reproduire
un modèle d’appareil. Éviter les breakpoints personnalisés correctifs et toute
détection user-agent.

## 7. Exécuter la matrice

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

Ajouter :

- mobile paysage ;
- hauteur réduite ;
- zoom `200 %` ;
- texte agrandi ;
- menu ouvert ;
- FAQ ouverte ;
- lightbox ouverte ;
- contenus longs.

Ne pas valider depuis un seul preset DevTools.

## 8. Utiliser le conteneur officiel

Repères :

- largeur maximale : `1280px` ;
- padding mobile : `20px` ;
- padding tablette : `32px` ;
- padding desktop : `48px`.

Patron :

```tsx
<div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
  {children}
</div>
```

Adapter au token réellement configuré. Donner `min-w-0` aux enfants flex ou
grid lorsque du contenu long peut déborder.

## 9. Faire évoluer l’espacement

Repères verticaux :

- mobile : `72–88px` ;
- tablette : `88–104px` ;
- desktop : `112–144px`.

Utiliser les tokens et `clamp()` lorsque la fluidité évite des overrides :

```css
padding-block: clamp(4.5rem, 8vw, 8rem);
```

Ne pas créer une valeur différente à chaque breakpoint sans besoin visuel.

## 10. Rendre la typographie fluide

Appliquer :

- body `≥ 1rem` ;
- titres fluides avec bornes ;
- aucune taille uniquement en `vw` ;
- retours à la ligne naturels ;
- `text-wrap: balance` pour titres si pertinent ;
- `text-wrap: pretty` pour paragraphes si supporté ;
- largeur de lecture `60–70ch` maximum ;
- aucune césure artificielle.

Exemple :

```css
font-size: clamp(3rem, 9vw, 6rem);
```

Ne pas utiliser `whitespace-nowrap` pour forcer un grand titre sur une ligne.

## 11. Préserver l’ordre du DOM

L’ordre DOM suit la lecture mobile.

Autoriser `order` uniquement pour une variation visuelle mineure. Interdire :

- duplication mobile/desktop ;
- deux sources de navigation ;
- inversion visuelle cassant la lecture clavier ;
- contenu essentiel masqué ;
- action réservée au hover.

Préférer une composition qui fonctionne avec une seule structure sémantique.

## 12. Concevoir le Header

### Mobile et tablette

- identité lisible ;
- bouton menu ;
- CTA essentiel si l’espace le permet ;
- hauteur stable ;
- aucune collision avec le Hero.

### Desktop

- navigation complète à partir de `lg` si elle tient ;
- CTA visible ;
- liens non compressés.

Basculer vers le menu avant collision. Un header sticky ne doit pas occuper une
part excessive du petit écran ni masquer le focus ou les ancres.

## 13. Concevoir le menu mobile

Le menu doit :

- respecter largeur et safe areas ;
- fonctionner avec une hauteur réduite ;
- permettre un scroll interne ;
- garder les liens espacés ;
- conserver le CTA WhatsApp ;
- ne jamais dépasser le viewport ;
- préserver focus, `Escape` et restauration du focus.

Préférer `svh` pour une hauteur stable et `dvh` pour une hauteur dynamique.
Éviter `100vh` comme solution unique.

## 14. Adapter le Hero

### Mobile

- texte prioritaire ;
- CTA empilés ou pleine largeur ;
- média cadré ;
- hauteur guidée par le contenu ;
- décor contenu.

### Tablette

- composition asymétrique si lisible ;
- titre maîtrisé ;
- séparation claire texte/média.

### Desktop

- grille éditoriale validée ;
- texte de largeur limitée ;
- image assez grande pour la coiffure ;
- aucun vide artificiel.

Ne pas imposer `min-height: 100vh` si le contenu ou la hauteur rend le Hero
inconfortable.

## 15. Adapter les CTA

Sur petit écran :

- pleine largeur si utile ;
- secondaires empilés ;
- cible `44 × 44px` ;
- libellé complet ;
- icône sans compression du texte.

Aligner horizontalement à partir de `sm` seulement si l’espace le permet.
Conserver priorité et ordre. Ne jamais fixer une largeur qui casse avec un
libellé long.

## 16. Construire les grilles

Repères :

| Contenu | Mobile | Tablette | Desktop |
| --- | --- | --- | --- |
| Services | 1 | 2 | 3 |
| Bénéfices | 1 | 2 | 3 |
| Avis | 1 | 2 | 3 si lisible |
| Contact | 1 | 1 ou 2 | 2 |

Le contenu décide du nombre final. Utiliser `gap`, éviter les hauteurs fixes et
ne pas compresser une carte pour maintenir une colonne supplémentaire.

Employer `auto-fit` ou `minmax()` seulement avec un résultat prévisible.

## 17. Adapter la galerie

Repères :

- petit mobile : 1 ou 2 colonnes selon lisibilité ;
- grand mobile : 2 ;
- tablette : 3 ;
- desktop : 3 ou 4.

Préserver gaps, ratios et cadrage. Éviter masonry complexe en V1. Si les filtres
scrollent horizontalement, rendre les options découvrables.

Dans la lightbox, garder fermer, précédent et suivant visibles en portrait,
paysage et hauteur réduite.

## 18. Servir des images responsives

Utiliser `next/image` avec `sizes` fidèle à la grille :

```tsx
sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
```

Adapter au conteneur réel. Définir ratio et point focal. Utiliser `fill`
seulement dans un parent dimensionné. Réserver `priority` au LCP.

Vérifier chaque cadrage cible et ne pas servir une énorme image desktop au
mobile.

## 19. Résister aux contenus longs

Tester :

- titres longs ;
- descriptions multi-lignes ;
- service le plus long ;
- numéro de téléphone ;
- URL ;
- réponse FAQ ;
- CTA explicite.

Utiliser `min-w-0`, `break-words`, `overflow-wrap: anywhere` pour une chaîne
incontrôlable et des largeurs de lecture.

Ne pas tronquer une information nécessaire.

## 20. Corriger les débordements

Avant `overflow-x-hidden`, identifier la cause :

- largeur fixe ;
- `100vw` avec scrollbar ;
- décor absolu ;
- transformation ;
- image non contrainte ;
- chaîne incassable ;
- grille trop large ;
- padding ajouté à la largeur.

Corriger la cause. Isoler un décor dans un wrapper contrôlé seulement si le
contenu reste intact.

## 21. Préférer CSS à JavaScript

Utiliser media queries, container queries si justifiées, flex et grid.

Ne pas :

- lire `window.innerWidth` pendant le rendu ;
- créer deux arbres React ;
- écouter `resize` pour une simple grille ;
- provoquer un écart d’hydratation ;
- rendre le layout dépendant du user-agent.

JavaScript est acceptable lorsqu’un comportement réel, pas une présentation,
dépend de la largeur.

## 22. Gérer viewport et safe areas

Pour les éléments plein écran :

- évaluer `svh`, `dvh` et `lvh` ;
- tenir compte des barres mobiles ;
- respecter les encoches et safe areas ;
- éviter les contrôles collés aux bords ;
- vérifier le clavier virtuel si pertinent ;
- conserver un scroll disponible.

Ne pas bloquer le body sans restaurer correctement le scroll à la fermeture
d’un menu ou dialog.

## 23. Supporter zoom et reflow

À `200 %` :

- contenu disponible ;
- navigation basculée avant collision ;
- aucun texte coupé ;
- dialogs contrôlables ;
- focus visible ;
- actions accessibles ;
- aucun double scroll inutile.

Ne pas désactiver le zoom, figer les hauteurs textuelles ni utiliser une taille
minuscule comme correctif.

## 24. Préserver tactile et clavier

Contrôler :

- cibles principales `44 × 44px` ;
- espacement entre contrôles ;
- aucune action hover-only ;
- ordre de focus conforme au DOM ;
- focus non masqué ;
- menu, FAQ et lightbox utilisables ;
- swipe jamais obligatoire.

Le responsive inclut l’interaction, pas uniquement la largeur.

## 25. Auditer section par section

Pour chaque section, contrôler :

1. ordre de lecture ;
2. largeur des textes ;
3. retours à la ligne ;
4. CTA ;
5. cadrage ;
6. colonnes ;
7. gaps et padding ;
8. focus ;
9. débordement ;
10. contenu long ;
11. paysage ;
12. zoom.

Une capture desktop seule n’est pas une validation.

## 26. Automatiser les contrôles utiles

Si Playwright est configuré :

- parcourir les viewports clés ;
- détecter les erreurs console ;
- vérifier largeur du document ;
- tester menu, FAQ et lightbox ;
- capturer les sections ciblées ;
- tester contenu long contrôlé ;
- conserver des assertions fonctionnelles.

Ne pas approuver automatiquement chaque différence visuelle. Une capture exige
une inspection.

## 27. Corriger avec méthode

Si la correction est autorisée :

1. reproduire à la largeur exacte ;
2. identifier la cause ;
3. vérifier les autres consommateurs ;
4. corriger au plus petit niveau cohérent ;
5. éviter le hack global ;
6. tester les largeurs voisines ;
7. vérifier zoom, texte long et paysage ;
8. contrôler clavier et images ;
9. relancer les tests disponibles ;
10. comparer avant/après.

Ne pas masquer le défaut avec `overflow-x-hidden`.

## 28. Définition de terminé

Une interface est responsive lorsqu’elle :

- fonctionne de `320px` au grand écran ;
- conserve le parcours WhatsApp ;
- ne déborde pas involontairement ;
- garde une hiérarchie lisible ;
- sert et cadre correctement les images ;
- fonctionne au tactile et au clavier ;
- supporte zoom, texte agrandi et paysage ;
- utilise CSS pour la mise en page ;
- préserve contenu, performance et accessibilité ;
- a été vérifiée sur la matrice déclarée.

## 29. Interdictions absolues

Ne jamais :

- construire desktop puis réparer mobile à la fin ;
- masquer un contenu essentiel sur mobile ;
- dupliquer le DOM par breakpoint ;
- utiliser des largeurs fixes pour le contenu principal ;
- ajouter un breakpoint par appareil ;
- utiliser user-agent ou JavaScript pour une simple mise en page ;
- tronquer un CTA ;
- réduire le body sous `1rem` ;
- cacher un overflow sans corriger la cause ;
- exiger un hover ou swipe ;
- bloquer le zoom ;
- charger une source desktop énorme sur mobile ;
- valider seulement `375px` et `1440px` ;
- déployer sans autorisation.
