---
paths:
  - "components/**/*.{ts,tsx}"
  - "app/**/*.tsx"
---

# PRIMiE — Composants UI

## 1. Rôle de cette règle

Cette règle garantit que les composants PRIMiE restent :

- cohérents avec le design system ;
- correctement typés ;
- accessibles ;
- composables ;
- simples à maintenir ;
- limités au périmètre V1 ;
- réutilisables sans devenir abstraits.

Lire également :

- `02-architecture.md` pour les responsabilités des dossiers ;
- `03-code-standards.md` pour TypeScript et React ;
- `04-design-system.md` pour les tokens visuels.

## 2. Hiérarchie des composants

Respecter quatre niveaux :

```text
components/ui
  → primitives génériques

components/shared
  → composants transversaux propres à PRIMiE

components/layout
  → Header, navigation et Footer

components/sections
  → blocs métier complets de la landing page
```

Une couche basse ne dépend jamais d'une couche plus haute.

Exemples interdits :

- `components/ui/button.tsx` important `siteConfig` ;
- `components/shared/section-heading.tsx` important `HeroSection` ;
- `lib/whatsapp.ts` important un composant React ;
- une primitive UI important une collection de contenu.

## 3. Critère de création

Créer un composant lorsqu'au moins une condition est vraie :

- il possède une responsabilité visuelle claire ;
- il est utilisé à plusieurs endroits ;
- il isole une interaction ;
- il réduit réellement la complexité d'un parent ;
- il représente un concept métier identifiable ;
- il protège un comportement accessible complexe.

Ne pas extraire :

- un wrapper sans intention ;
- quelques lignes de JSX utilisées une seule fois ;
- un composant qui ne fait que renommer une balise ;
- une abstraction « au cas où » ;
- un composant différent pour chaque variation de texte ;
- un fichier vide pour reproduire l'arborescence cible.

## 4. Contrat général

Chaque composant doit :

- avoir un nom explicite ;
- déclarer ses props ;
- produire un HTML sémantique ;
- appliquer les tokens du design system ;
- prévoir ses états pertinents ;
- accepter uniquement les options nécessaires ;
- conserver une responsabilité principale ;
- rester utilisable au clavier s'il est interactif ;
- garder un rendu lisible si un contenu optionnel manque.

Exemple de contrat :

```tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
};
```

Éviter les API composées de nombreux booléens :

```tsx
// Interdit
<Card dark gold large rounded centered bordered animated />
```

Préférer une variante explicite ou une composition.

## 5. Props

Règles :

- utiliser un type local lorsque les props ne sont pas partagées ;
- rendre obligatoire ce qui est nécessaire au fonctionnement ;
- ne pas rendre une prop optionnelle pour éviter une erreur ;
- utiliser des unions littérales pour les variantes fermées ;
- utiliser `children` uniquement pour un contenu réellement composable ;
- accepter `className` sur les primitives et composants transversaux pertinents ;
- fusionner les classes avec `cn()` ;
- ne pas exposer une prop sans besoin actuel ;
- éviter de propager aveuglément toutes les props vers le DOM ;
- ne transmettre aux Client Components que des données sérialisables.

Une prop callback commence par `on`.
Un handler interne commence par `handle`.

## 6. Variantes

Utiliser une stratégie de variantes pour les composants ayant plusieurs
apparences stables :

- bouton ;
- badge ;
- section ;
- carte ;
- titre de section.

Une variante représente une intention :

- `primary`
- `secondary`
- `outline`
- `ghost`
- `dark`
- `light`

Éviter les variantes fondées sur une couleur brute :

- `yellow`
- `black2`
- `beigeCard`

Ne pas ajouter une variante utilisée une seule fois si `className` suffit et
reste lisible.

## 7. shadcn/ui

Utiliser shadcn/ui lorsqu'une primitive répond à un besoin réel :

- `Button`
- `Accordion`
- `Dialog`
- `Sheet`
- `Tabs` si les filtres le justifient

Règles :

- les composants générés appartiennent au dépôt et peuvent être adaptés ;
- conserver les comportements accessibles fournis par Radix ;
- appliquer les tokens PRIMiE ;
- ne pas installer une primitive inutilisée ;
- ne pas ajouter une deuxième bibliothèque de composants ;
- ne pas réécrire un focus trap, un dialog ou un accordéon robuste ;
- vérifier le bundle et la frontière client après chaque ajout ;
- auditer la commande et les fichiers générés avant validation.

Une adaptation visuelle ne doit pas supprimer les attributs ou comportements
d'accessibilité de la primitive.

## 8. Boutons, liens et actions

Utiliser :

- `<button>` pour une action dans la page ;
- `<a>` pour une URL externe, un téléphone ou WhatsApp ;
- `next/link` pour une navigation interne entre routes ;
- une ancre native pour une section de la landing page.

Ne jamais utiliser :

- `<div onClick>` comme bouton ;
- un bouton pour naviguer vers une URL ;
- un lien sans `href` ;
- une icône seule sans nom accessible ;
- un CTA factice ;
- un élément désactivé sans raison.

Un lien peut adopter le style d'un bouton sans changer sa sémantique.

Tous les contrôles tactiles doivent atteindre au moins `44 × 44px`.

## 9. `SectionContainer`

Responsabilités :

- largeur maximale ;
- padding horizontal ;
- centrage ;
- cohérence des gouttières.

Il ne gère pas :

- la couleur métier ;
- le contenu ;
- les animations ;
- l'espacement vertical complet de la section.

Son API doit rester minimale.

## 10. `SectionHeading`

Responsabilités :

- eyebrow optionnel ;
- titre ;
- description optionnelle ;
- alignement limité ;
- hiérarchie visuelle cohérente.

Le niveau de titre doit être explicitement cohérent avec la page.

Ne pas :

- choisir automatiquement un niveau selon la taille visuelle ;
- utiliser un paragraphe stylé comme titre ;
- placer du contenu métier spécifique dans le composant ;
- rendre l'eyebrow indispensable à la compréhension.

## 11. `WhatsAppLink`

Responsabilités :

- utiliser le numéro canonique ;
- construire l'URL via `lib/whatsapp.ts` ;
- accepter un message prérempli optionnel validé ;
- conserver une sémantique de lien ;
- appliquer une variante de CTA ;
- afficher un libellé clair ;
- fournir les attributs sûrs si un nouvel onglet est utilisé.

Le numéro ne doit jamais être fourni manuellement par chaque appelant.

Le composant ne doit pas :

- envoyer un message ;
- annoncer une réservation confirmée ;
- intégrer un SDK WhatsApp ;
- recevoir une destination arbitraire ;
- injecter une donnée personnelle dans l'URL.

## 12. `ResponsiveImage`

Créer ce composant uniquement si plusieurs médias partagent une logique réelle :

- ratio ;
- overlay ;
- point focal ;
- fallback ;
- traitement décoratif cohérent.

Ne pas masquer les fonctionnalités utiles de `next/image`.

Le composant ne doit pas :

- inventer un texte alternatif ;
- imposer le même cadrage à tous les viewports ;
- désactiver globalement l'optimisation ;
- transformer une illustration en réalisation réelle.

## 13. Header et menu mobile

Le Header doit séparer :

- identité ;
- navigation desktop ;
- CTA ;
- déclencheur mobile.

Pour le menu mobile, utiliser une primitive accessible de type `Sheet` ou
`Dialog`.

Comportements obligatoires :

- bouton avec nom accessible ;
- état ouvert annoncé ;
- focus déplacé dans le menu ;
- focus restauré à la fermeture ;
- fermeture par `Escape` ;
- fermeture après sélection d'une ancre ;
- fond non interactif lorsque le menu est modal ;
- aucune navigation dupliquée dans les données ;
- aucun scroll horizontal causé par le panneau.

L'icône seule ne suffit pas : le bouton conserve un libellé accessible.

## 14. Cartes de service

Une `ServiceCard` reçoit des données typées et ne redéfinit aucun fait métier.

Elle contient selon le contenu disponible :

- image ;
- titre ;
- description ;
- CTA d'information.

Règles :

- image représentative du service ;
- hauteur flexible ;
- ordre de lecture logique ;
- action accessible au clavier ;
- aucun tarif ou délai inventé ;
- aucune variante créée uniquement pour une carte.

Les six prestations viennent de la source de contenu centrale.

## 15. Galerie

Séparer :

- `GallerySection` : titre et composition globale ;
- `GalleryFilters` : interaction de filtrage ;
- `GalleryGrid` : rendu des médias ;
- `GalleryItem` : aperçu individuel ;
- `GalleryLightbox` : affichage agrandi.

Le contenu complet vient de `content/gallery.ts`.

Sans JavaScript, la galerie doit au minimum afficher les réalisations.
Filtres et lightbox sont des améliorations progressives.

## 16. Filtres de galerie

Règles :

- toujours fournir une option `Toutes` ;
- représenter la sélection par un état unique ;
- utiliser des boutons ou tabs sémantiques ;
- exposer visuellement et techniquement l'élément actif ;
- calculer la liste filtrée sans la dupliquer dans le state ;
- conserver des identifiants de catégorie stables ;
- afficher un état vide compréhensible ;
- ne déclencher aucune requête réseau.

La frontière client se limite au composant interactif nécessaire.

## 17. Lightbox

Utiliser `Dialog` comme base.

Comportements obligatoires :

- ouverture depuis une réalisation ;
- image agrandie avec texte alternatif ;
- bouton de fermeture identifiable ;
- fermeture par `Escape` ;
- focus piégé pendant l'ouverture ;
- restauration du focus sur le déclencheur ;
- navigation précédente/suivante si implémentée ;
- absence de scroll de fond ;
- support tactile sans geste obligatoire.

Ne pas créer une lightbox uniquement avec `position: fixed` et `onClick`.

Le clic sur le fond ne doit pas être le seul moyen de fermeture.

## 18. FAQ

Utiliser la primitive `Accordion`.

Règles :

- questions depuis `content/faq.ts` ;
- un bouton réel par question ;
- titre de question lisible ;
- état ouvert exposé par la primitive ;
- réponse correctement associée ;
- ouverture unique ou multiple choisie explicitement ;
- aucune réponse HTML injectée ;
- aucune information métier inventée.

Ne pas construire l'accordéon avec un simple changement de hauteur sans gestion
de l'accessibilité.

## 19. Témoignages

Une carte de témoignage affiche seulement des informations autorisées.

Règles :

- citation fidèle ;
- identité limitée aux données validées ;
- aucun faux score ;
- aucune photo sans autorisation ;
- contenu lisible sans carrousel obligatoire ;
- guillemets décoratifs ignorés par les technologies d'assistance.

Un témoignage provisoire ne doit jamais paraître authentique en Production.

## 20. Icônes

- Utiliser Lucide pour les icônes d'interface.
- Conserver taille et épaisseur cohérentes.
- Marquer `aria-hidden="true"` une icône décorative.
- Fournir un nom accessible si l'icône constitue seule le contrôle.
- Ne pas coder manuellement un SVG Lucide.
- Ne pas mélanger emojis et icônes sans décision de design.
- Ne pas répéter le nom accessible entre icône et libellé.

Une icône ne remplace pas un texte d'action important.

## 21. Animations

Une animation appartient au plus petit composant client capable de la porter.

Règles :

- favoriser CSS pour hover, focus et transitions simples ;
- utiliser Framer Motion pour une coordination réellement utile ;
- ne pas convertir toutes les cartes en Client Components pour une révélation ;
- respecter `prefers-reduced-motion` ;
- maintenir le contenu disponible si l'animation échoue ;
- ne pas retarder une action importante ;
- ne pas animer un changement de focus.

## 22. Références et DOM

Utiliser une `ref` uniquement pour :

- gérer un focus ;
- intégrer une primitive qui l'exige ;
- mesurer un élément avec un besoin démontré ;
- accéder à une API DOM impossible à exprimer autrement.

Ne pas :

- utiliser une ref comme état parallèle ;
- manipuler directement le DOM lorsqu'un rendu React suffit ;
- lire une mesure DOM à chaque rendu ;
- contourner le modèle de données React.

## 23. Sélecteurs de test

Les tests ciblent en priorité :

- rôle ;
- nom accessible ;
- texte visible ;
- label ;
- état sémantique.

Ajouter `data-testid` seulement lorsqu'aucun sélecteur utilisateur fiable
n'existe.

Ne pas modifier le HTML uniquement pour satisfaire un test fragile.

## 24. Interdictions

- Primitive générique contenant du contenu PRIMiE.
- Composant dupliqué pour modifier une couleur ou un texte.
- Élément cliquable sans sémantique interactive.
- Icône seule sans nom accessible.
- Dialog, Sheet ou Accordion réécrit sans primitive fiable.
- `"use client"` ajouté à une section pour une micro-interaction.
- Props transmises mais inutilisées.
- API comportant plus de variantes que de cas réels.
- Index utilisé comme clé pour une collection modifiable.
- Lien imbriqué dans un bouton ou inversement.
- `dangerouslySetInnerHTML` pour du contenu éditorial.
- Contenu important disponible uniquement au hover.
- Composant vide créé pour respecter artificiellement l'arborescence.

## 25. Definition of Done

Un composant est terminé lorsque :

- son rôle est clair ;
- son API est minimale et typée ;
- son HTML est sémantique ;
- ses états sont couverts ;
- son focus est visible ;
- son comportement clavier et tactile fonctionne ;
- ses styles utilisent les tokens ;
- il ne duplique ni donnée ni composant ;
- il n'élargit pas inutilement la frontière client ;
- il fonctionne avec le contenu réel prévu ;
- il est testé par des sélecteurs proches de l'usage ;
- il est vérifié dans son contexte réel, pas seulement isolément.
