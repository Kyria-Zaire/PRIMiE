---
paths:
  - "app/**/*.css"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "tailwind.config.ts"
  - "components.json"
---

# PRiMiE — Design system

## 1. Rôle de cette règle

Applique cette règle pour toute tâche qui modifie :

- la direction artistique ;
- une couleur, une police ou un token ;
- la composition d'une section ;
- un composant visible ;
- un état interactif ;
- une image, une ombre ou une animation.

Le fichier racine `CLAUDE.md` et les règles produit, architecture et code restent
prioritaires.

## 2. Intention visuelle

PRiMiE doit évoquer :

- l'élégance ;
- le soin ;
- la féminité ;
- la confiance ;
- le savoir-faire afro ;
- un service premium mais accessible.

La direction validée repose sur un contraste noir profond, or chaud, champagne
et ivoire (palette PRiMiE COIFFURE v1.0).

Le résultat ne doit pas ressembler :

- à un template SaaS ;
- à un site de luxe froid et inaccessible ;
- à un flyer surchargé ;
- à une accumulation d'effets dorés ;
- à une interface générique de salon de coiffure.

Le luxe vient d'abord de la composition, de l'espace, de la photographie et de
la typographie.

## 3. Principes fondamentaux

1. Concevoir mobile-first.
2. Garantir contraste et lisibilité immédiate.
3. Maintenir une hiérarchie typographique claire.
4. Utiliser le doré comme accent, jamais comme remplissage systématique.
5. Placer les photographies au centre de l'expérience.
6. Conserver des espaces généreux.
7. Limiter le nombre de formes.
8. Utiliser des animations discrètes.
9. Ne jamais laisser la décoration gêner le contenu.
10. Rendre chaque décision visuelle reproductible avec un token.

## 4. Palette officielle

Source d’exécution : `app/theme.css` (PRiMiE COIFFURE v1.0).

### Couleurs de marque

| Token | Valeur | Usage |
| --- | --- | --- |
| `black` | `#0E0D0C` | Fond principal sombre |
| `rich-black` | `#1B1918` | Surfaces sombres secondaires |
| `espresso` | `#533420` | Accents bruns, états désactivés sombres |
| `bronze` | `#664A30` | Bordures sur fonds sombres |
| `gold` | `#A98C69` | CTA, accents, mot-symbole |
| `gold-light` | `#CF9A5F` | Hover / extrémité du gradient CTA |
| `champagne` | `#DFCDB4` | Surfaces muted claires |
| `soft-gold` | `#C5AE97` | Bordures claires, accent doux |
| `ivory` | `#F3EBE4` | Fond page clair (≠ warm-cream) |
| `warm-cream` | `#EFE4D7` | Surface claire secondaire |
| `taupe` | `#AA9F90` | Texte secondaire sur sombre |
| `warm-gray` | `#6A5E51` | Texte secondaire sur clair |

### Couleurs fonctionnelles

| Token | Valeur | Usage |
| --- | --- | --- |
| `success` | `#356B4F` | Retour positif si nécessaire |
| `danger` | `#A5413E` | Erreur si nécessaire |

### Dégradés canoniques

| Token | Définition |
| --- | --- |
| `--gradient-hero` | black → rich-black (180deg) |
| `--gradient-cta` | gold → gold-light (90deg) |
| `--gradient-surface` | ivory → warm-cream (180deg) |

Ne pas ajouter une couleur avant de vérifier les tokens existants.
Toute évolution de la palette exige une validation du CTO.

## 5. Contraste

- Utiliser `on-dark` / `ivory` sur `black`, `rich-black` ou `espresso`.
- Utiliser `foreground` / `black` sur `ivory`, `warm-cream` ou `champagne`.
- Le doré peut servir de texte sur fond très sombre si le contraste est suffisant.
- Ne pas utiliser `gold` pour un petit texte sur fond clair.
- Un CTA doré utilise par défaut un texte `primary-foreground` (`black`).
- Un CTA sombre utilise par défaut un texte `on-dark`.
- Ne jamais transmettre une information uniquement par la couleur.

Tout nouveau couple texte/fond doit respecter WCAG AA.

Une maquette n'autorise jamais un contraste insuffisant.

## 6. Variables sémantiques

Les composants consomment des rôles sémantiques, pas des couleurs brutes
répétées. Source : `app/theme.css`.

Exemple de base :

```css
@theme inline {
  --color-background: var(--color-ivory);
  --color-foreground: var(--color-black);
  --color-surface: var(--color-warm-cream);
  --color-surface-muted: var(--color-champagne);
  --color-surface-dark: var(--color-rich-black);
  --color-primary: var(--color-gold);
  --color-primary-hover: var(--color-gold-light);
  --color-primary-foreground: var(--color-black);
  --color-accent: var(--color-soft-gold);
  --color-border: var(--color-soft-gold);
  --color-muted: var(--color-taupe);
  --color-muted-foreground: var(--color-warm-gray);
  --color-on-dark: var(--color-ivory);
  --color-on-dark-muted: var(--color-taupe);
  --color-focus: var(--color-gold);
}
```

Adapte cette représentation au système réellement installé sans créer deux
sources de vérité.

Ne répète pas une valeur hexadécimale dans plusieurs composants.

## 7. Typographies

### Familles validées

- Titres éditoriaux : `Cormorant Garamond`
- Texte et interface : `Manrope`
- Accent manuscrit occasionnel : `Allura`

Utiliser `next/font/google` avec uniquement les graisses nécessaires.

### Rôles

`Cormorant Garamond` :

- `h1`, `h2` et grands titres ;
- citations courtes ;
- chiffres ou mots de mise en scène.

`Manrope` :

- paragraphes ;
- navigation ;
- boutons ;
- labels ;
- FAQ ;
- informations de contact.

`Allura` :

- un mot décoratif court ;
- une signature visuelle ;
- un accent non essentiel.

Ne jamais utiliser la police manuscrite :

- pour un paragraphe ;
- pour un bouton ;
- pour la navigation ;
- comme seule version d'une information importante ;
- dans plusieurs zones proches.

## 8. Échelle typographique

| Rôle | Mobile | Desktop | Interligne |
| --- | --- | --- | --- |
| Display hero | `3rem` | `6rem` | `0.9–0.98` |
| `h1` alternatif | `2.75rem` | `5rem` | `0.95–1` |
| `h2` | `2.25rem` | `4rem` | `1–1.05` |
| `h3` | `1.5rem` | `2rem` | `1.1–1.2` |
| Lead | `1.125rem` | `1.25rem` | `1.6` |
| Body | `1rem` | `1rem` | `1.65–1.75` |
| Small | `0.875rem` | `0.875rem` | `1.5` |
| Eyebrow | `0.75rem` | `0.8125rem` | `1.2` |

Utiliser `clamp()` lorsqu'une progression fluide améliore réellement le rendu.

Règles :

- paragraphes limités à environ `60–70ch` ;
- descriptions courtes limitées à environ `40–55ch` ;
- body jamais inférieur à `1rem` ;
- aucune phrase longue entièrement en majuscules ;
- léger espacement pour eyebrows et petits labels en majuscules ;
- aucune réduction de texte destinée uniquement à faire rentrer une maquette.

## 9. Grille et conteneurs

Conteneur principal :

- largeur maximale : `1280px` ;
- marge horizontale automatique ;
- padding mobile : `20px` ;
- padding tablette : `32px` ;
- padding desktop : `48px`.

Conteneur éditorial étroit :

- largeur maximale : `760px`.

Grille de référence :

- mobile : 1 colonne ;
- tablette : 2 colonnes lorsque le contenu le permet ;
- desktop : 12 colonnes conceptuelles ;
- galerie : 2 colonnes mobile, 3 ou 4 colonnes desktop selon les médias.

Ne compresse pas une carte uniquement pour maintenir un nombre de colonnes.

## 10. Espacements

Base : multiples de `4px`.

Échelle recommandée :

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128
```

Espacement vertical des sections :

- mobile : `72px` à `88px` ;
- tablette : `88px` à `104px` ;
- desktop : `112px` à `144px`.

Espacement interne des cartes :

- mobile : `20px` à `24px` ;
- desktop : `24px` à `32px`.

Le rythme vertical doit être cohérent sans rendre toutes les sections identiques.

## 11. Rayons et formes

| Token | Valeur | Usage |
| --- | --- | --- |
| `radius-sm` | `8px` | Petits éléments |
| `radius-md` | `14px` | Champs et boutons secondaires |
| `radius-lg` | `20px` | Cartes |
| `radius-xl` | `28px` | Grandes cartes et médias |
| `radius-pill` | `999px` | Badges et CTA arrondis |

Une même famille de composants conserve le même rayon.

Ne pas :

- transformer chaque élément en pilule ;
- multiplier les formes organiques sans système ;
- utiliser un rayon différent par carte ;
- couper une photographie importante avec une forme décorative.

## 12. Ombres

Tokens recommandés :

```css
--shadow-soft: 0 12px 40px rgb(11 9 8 / 0.08);
--shadow-card: 0 20px 60px rgb(11 9 8 / 0.12);
--shadow-elevated: 0 28px 80px rgb(11 9 8 / 0.18);
```

Règles :

- une carte standard utilise au maximum `shadow-soft` ;
- une lightbox ou un média flottant peut utiliser `shadow-elevated` ;
- éviter les ombres noires opaques ;
- ne pas cumuler bordure forte, ombre forte et gradient ;
- ne pas simuler le premium avec une élévation excessive.

## 13. Boutons et CTA

### CTA principal

- fond `gold` ;
- texte `black` / `foreground` ;
- graisse `600` ;
- hauteur tactile minimale de `44px` ;
- rayon `radius-pill` ou `radius-md` selon la composition ;
- icône WhatsApp possible sans remplacer le libellé.

### CTA secondaire sombre

- fond `black` ou `rich-black` ;
- texte `text-light` ;
- bordure discrète.

### CTA tertiaire

- fond transparent ;
- texte lisible ;
- soulignement, flèche ou bordure basse explicite.

Tous les CTA possèdent :

- hover sobre ;
- état actif ;
- focus visible ;
- état désactivé seulement si nécessaire ;
- zone tactile suffisante ;
- libellé décrivant l'action.

Ne pas utiliser un bouton doré pour chaque action.

## 14. Cartes

Une carte PRiMiE utilise au maximum :

- une surface ;
- une bordure discrète ;
- un rayon cohérent ;
- une ombre légère ;
- un seul accent doré principal.

Hiérarchie interne :

1. média ou icône ;
2. titre ;
3. description ;
4. action éventuelle.

Éviter :

- cartes imbriquées ;
- hauteurs rigides coupant le contenu ;
- multiples icônes décoratives ;
- fonds tous différents ;
- effets 3D agressifs ;
- espaces internes incohérents.

## 15. Photographies

Les photographies sont prioritaires dans l'identité PRiMiE.

Direction :

- modèles noirs et coiffures afro clairement visibles ;
- lumière chaude et naturelle ;
- peau et cheveux sans filtre excessif ;
- arrière-plan propre ;
- détails des tresses lisibles ;
- cadrage digne et professionnel ;
- diversité des coiffures, longueurs et styles.

Ratios recommandés :

- portrait de service : `4 / 5` ;
- galerie verticale : `3 / 4` ou `4 / 5` ;
- galerie paysage : `4 / 3` ;
- Hero : composition responsive dédiée.

Règles :

- ne jamais déformer une image ;
- utiliser `object-fit: cover` avec un point focal maîtrisé ;
- vérifier le cadrage mobile ;
- ne pas superposer du texte sur une zone chargée ;
- utiliser un overlay seulement pour la lisibilité ;
- ne pas présenter une illustration comme une réalisation réelle ;
- ne pas remplacer une photographie validée sans demande.

## 16. Animations

Durées de référence :

- micro-interaction : `160–220ms` ;
- transition de composant : `240–360ms` ;
- révélation de section : `450–650ms`.

Principes :

- préférer opacité et translation légère ;
- limiter les déplacements à environ `8–24px` ;
- ne pas animer chaque élément d'une carte séparément ;
- ne jamais bloquer l'interaction ;
- respecter `prefers-reduced-motion` ;
- éviter parallaxe lourde, curseur personnalisé et scroll hijacking ;
- garder le contenu accessible si l'animation échoue.

## 17. États interactifs

Chaque contrôle prévoit :

- état par défaut ;
- hover ;
- focus visible ;
- active ;
- disabled si pertinent ;
- ouvert ou sélectionné si pertinent.

Focus recommandé :

```css
outline: 2px solid var(--color-primary);
outline-offset: 3px;
```

Ne supprime jamais un outline sans remplacement au moins équivalent.
Le focus ne doit pas être caché derrière un élément sticky.

## 18. Usages interdits

- Remplacer la palette par un noir et blanc générique.
- Utiliser du jaune vif à la place du doré.
- Ajouter violet, rose ou bleu comme couleur de marque sans validation.
- Utiliser un gradient arc-en-ciel.
- Appliquer un effet métallique animé.
- Généraliser le glassmorphism.
- Multiplier les polices.
- Utiliser la police manuscrite pour du contenu fonctionnel.
- Réduire le texte pour faire rentrer une composition.
- Appliquer des ombres fortes sur toutes les cartes.
- Créer une interface entièrement sombre sans rythme clair.
- Sacrifier la lisibilité pour reproduire une maquette statique.
- Copier le style visuel d'une autre marque.
- Introduire une couleur brute répétée hors du système.

## 19. Contrôle visuel

Avant validation, vérifier :

- cohérence avec la maquette PRiMiE validée ;
- usage correct des tokens ;
- contraste texte/fond ;
- hiérarchie des titres ;
- rythme des sections ;
- cohérence des rayons et ombres ;
- cadrage des photographies ;
- états hover, focus et actif ;
- mobile `320` et `390 px` ;
- tablette `768 px` ;
- desktop `1440 px` ;
- réduction des animations ;
- absence de débordement horizontal.

Toute déviation volontaire doit être expliquée au CTO.

## 20. Definition of Done

Une modification visuelle est terminée lorsque :

- elle respecte l'intention premium et chaleureuse ;
- elle utilise les tokens validés ;
- aucun contraste n'est insuffisant ;
- la hiérarchie reste claire ;
- les photographies gardent un cadrage maîtrisé ;
- les états interactifs sont complets ;
- le focus clavier reste visible ;
- `prefers-reduced-motion` est respecté ;
- les quatre viewports de référence sont vérifiés ;
- aucune couleur, police ou forme arbitraire n'est introduite ;
- le changement est comparé au rendu précédent ;
- toute limite de vérification est signalée.
