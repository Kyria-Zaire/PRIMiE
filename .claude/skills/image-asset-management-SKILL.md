---
name: image-asset-management
description: Auditer, sélectionner, classer, préparer, optimiser, intégrer ou remplacer les images et ressources visuelles de PRIMiE. Utiliser cette skill pour gérer réalisations de Prisca, illustrations, images IA ou stock, logos, icônes, SVG, droits, autorisations, registre de provenance, métadonnées EXIF, vie privée, formats WebP/AVIF, dimensions, poids, cadrage, point focal, next/image, responsive sizes, textes alternatifs, Open Graph, placeholders, doublons ou régressions visuelles et de performance.
---

# Image & Asset Management PRIMiE

Garantir des visuels honnêtes, autorisés, élégants, rapides et accessibles.
Aucune qualité esthétique ne justifie une origine inconnue, une attribution
trompeuse, une donnée privée exposée ou une régression de performance.

## 1. Charger le contexte

Avant toute action :

1. lire `CLAUDE.md` ;
2. lire `08-images-assets.md`, `11-performance.md`, `09-accessibility.md`,
   `10-seo.md` et `do-not-break.md` selon la demande ;
3. inspecter le brief, la direction artistique et les décisions validées ;
4. lire les sources d’images, composants et configuration Next.js ;
5. inspecter les fichiers réels, leurs dimensions, formats et poids ;
6. identifier tous les consommateurs des assets concernés ;
7. vérifier l’état local et préserver tout travail inconnu.

Utiliser `rg --files` et `rg` pour localiser références, données, imports,
Metadata, CSS et tests. Ne jamais déduire l’usage d’une image depuis son seul
nom.

## 2. Respecter le mode demandé

Distinguer :

- **audit** : inspecter et rapporter sans modifier ;
- **sélection** : comparer des candidats sans intégrer ;
- **préparation** : nettoyer et optimiser des copies ;
- **intégration** : ajouter un asset validé ;
- **remplacement** : migrer toutes les références ;
- **suppression** : retirer uniquement un asset confirmé inutilisé.

Une demande d’audit n’autorise pas une retouche. Une autorisation d’intégration
n’autorise ni commit, ni push, ni déploiement.

## 3. Protéger l’identité

Préserver :

```text
Marque : Chez PRIMiE Coiffure
Graphie : PRIMiE
Porteuse : Prisca
Activité : coiffure et beauté afro à domicile
```

Respecter la direction noire, dorée, beige et crème, la dignité des modèles,
les détails de coiffure et la cohérence mobile/desktop.

Ne pas redessiner, recolorer ou déformer un logo validé sans décision design.

## 4. Classer chaque image

Attribuer une catégorie explicite :

- `realization` : coiffure réellement réalisée par Prisca ;
- `illustration` : stock, image IA ou inspiration ;
- `brand` : logo, monogramme, favicon ou motif officiel ;
- `decorative` : texture ou forme sans information.

Une `realization` exige provenance et autorisation confirmées. Une
`illustration` ne doit jamais représenter une cliente ni le travail de Prisca.
Une image décorative utilise `alt=""`.

En cas de doute, classer l’asset comme non publiable.

## 5. Appliquer le gate de publication

Avant Production, confirmer :

- origine ;
- auteur ou fournisseur ;
- licence ou droit ;
- autorisation de la personne ;
- catégorie ;
- usage prévu ;
- crédit requis ;
- absence de tromperie ;
- absence de donnée privée ;
- version optimisée disponible.

Une URL, une capture ou un fichier reçu ne constitue pas automatiquement une
autorisation de publication.

## 6. Tenir un registre

Tracer les ressources externes avec :

- nom du fichier ;
- catégorie ;
- source et URL d’origine ;
- auteur ou fournisseur ;
- licence ;
- date de récupération ;
- preuve d’autorisation ;
- crédit ;
- statut de publication ;
- notes de transformation.

Utiliser un document simple et versionné pour la V1. Ne pas ajouter une base de
données ou un service externe.

Les photographies fournies par Prisca nécessitent aussi un statut de droit à
l’image.

## 7. Protéger la vie privée

Avant publication d’une photo réelle :

- retirer GPS et EXIF inutiles ;
- vérifier documents visibles ;
- inspecter arrière-plan et reflets ;
- rechercher nom, plaque, écran ou adresse ;
- confirmer le droit à l’image ;
- conserver seulement la version nécessaire au site.

Ne pas commiter un original privé ou lourd si seule la version nettoyée est
utile.

Une retouche de confidentialité ne doit pas falsifier le résultat de coiffure.

## 8. Organiser l’arborescence

Utiliser :

```text
public/
├── brand/
│   ├── logo/
│   ├── icons/
│   └── patterns/
└── images/
    ├── hero/
    ├── services/
    ├── gallery/
    └── placeholders/
```

Ne pas déposer tous les fichiers dans `public/`, créer un dossier par asset,
commiter les sources de travail lourdes ou mélanger originaux et fichiers web.

## 9. Nommer les fichiers

Format :

```text
primie-{usage}-{description}-{index}.{extension}
```

Exemples :

```text
primie-hero-braids-01.webp
primie-service-wig-installation-01.webp
primie-gallery-knotless-braids-03.webp
primie-logo-gold.svg
```

Utiliser `kebab-case`, ASCII, description courte et index à deux chiffres.
Interdire espaces, accents, noms d’appareil, données personnelles et suffixes
comme `final-final-2`.

## 10. Choisir le format

Utiliser :

- `SVG` pour logo et vecteurs fiables ;
- `WebP` ou `AVIF` pour photographies web ;
- `PNG` pour une transparence bitmap nécessaire ;
- `JPEG` comme source ou fallback pertinent ;
- formats Next.js requis pour les favicons.

Éviter BMP, TIFF, GIF lourd, PNG photographique, base64 dans JSX et SVG externe
non inspecté. Évaluer une vidéo optimisée avant un GIF animé.

Ne pas convertir aveuglément si le format dégrade cheveux, peau ou transparence.

## 11. Adapter les dimensions

Repères de largeur source :

| Usage | Dimension utile |
| --- | ---: |
| Hero | `2000–2400px` |
| Grande galerie | `1400–1800px` |
| Carte service | `1000–1400px` |
| Vignette | `600–1000px` |
| Open Graph | `1200 × 630px` |

Traiter ces valeurs comme plafonds, pas comme obligation d’agrandissement.
Ne jamais upscale une petite image floue pour atteindre un chiffre.

## 12. Respecter les budgets

Objectifs après optimisation :

| Usage | Poids cible |
| --- | ---: |
| Hero | idéalement `≤ 400 Ko` |
| Galerie | idéalement `≤ 250 Ko` |
| Carte service | idéalement `≤ 180 Ko` |
| Logo SVG | idéalement `≤ 50 Ko` |
| Open Graph | idéalement `≤ 300 Ko` |

Justifier toute exception par un gain visuel perceptible. Ne pas détruire le
détail des tresses ou la fidélité de la peau pour un budget arbitraire.

## 13. Optimiser avec comparaison

Pour chaque asset :

1. relever format, dimensions et poids initiaux ;
2. identifier la taille réellement rendue ;
3. produire une variante adaptée ;
4. compresser avec réglage mesuré ;
5. comparer visuellement à zoom normal et rapproché ;
6. vérifier détails, couleurs et artefacts ;
7. mesurer le poids final ;
8. conserver le meilleur compromis ;
9. documenter toute exception.

Ne pas annoncer une optimisation sans valeur avant/après.

## 14. Intégrer avec `next/image`

Pour les images de contenu :

- utiliser `next/image` ;
- définir `width` et `height`, ou un parent stable avec `fill` ;
- fournir `sizes` conforme à la grille réelle ;
- préserver le ratio ;
- réserver la priorité à l’image LCP ;
- charger la galerie sous la ligne de flottaison en différé ;
- éviter `unoptimized` ;
- ne jamais désactiver l’optimisation globalement.

Exemple :

```tsx
<Image
  src={image.src}
  alt={image.alt}
  width={800}
  height={1000}
  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
/>
```

Adapter `sizes` au conteneur réel, pas à un exemple générique.

## 15. Gérer le LCP et le CLS

Pour le Hero :

- identifier l’élément LCP réel ;
- ne pas lazy-loader l’image LCP ;
- utiliser une priorité seulement si justifiée ;
- servir des dimensions adaptées ;
- réserver l’espace ;
- éviter une apparition après hydratation ;
- ne pas masquer derrière une animation longue.

Pour toutes les images, fournir dimensions ou ratio stable afin d’éviter les
layout shifts.

Ne pas marquer toute la galerie comme prioritaire.

## 16. Limiter les images distantes

Préférer les assets locaux validés en V1.

Si une source distante est nécessaire :

- autoriser le domaine exact dans `next.config.ts` ;
- utiliser un pattern restrictif ;
- vérifier stabilité et droits ;
- prévoir le cas d’indisponibilité ;
- interdire hotlinking non autorisé.

Ne jamais ajouter un wildcard global.

## 17. Maîtriser cadrage et point focal

Ratios de référence :

- service : `4 / 5` ;
- galerie verticale : `3 / 4` ou `4 / 5` ;
- galerie paysage : `4 / 3` ;
- Open Graph : `1.91 / 1`.

Préserver coiffure, visage et dignité du modèle. Vérifier mobile et desktop.
Utiliser `object-position` ou un point focal dans les données seulement si
nécessaire.

Ne pas imposer le même crop à des compositions incompatibles.

## 18. Respecter la direction photographique

Privilégier :

- lumière chaude et naturelle ;
- peau et cheveux fidèles ;
- texture des tresses lisible ;
- arrière-plan calme ;
- posture naturelle ;
- diversité de styles ;
- colorimétrie cohérente.

Éviter lissage excessif, saturation agressive, HDR, arrière-plan encombré,
watermark tiers, logo concurrent, flou et compression destructive.

## 19. Rédiger les textes alternatifs

Décrire l’information utile :

- type de coiffure ;
- forme ou longueur si pertinente ;
- détail distinctif.

Exemple :

```text
Longues knotless braids relevées en demi-queue
```

Éviter `image`, `photo`, nom de fichier, mots-clés SEO, caractéristiques
physiques inutiles et information impossible à déduire.

Utiliser `alt=""` pour le décoratif. Ne jamais attribuer une illustration à
Prisca dans l’alternative.

## 20. Structurer les données

Utiliser selon besoin :

```ts
type ContentImage = {
  src: string;
  alt: string;
  kind: "realization" | "illustration";
  width: number;
  height: number;
  category?: string;
  focalPoint?: string;
};
```

Ajouter uniquement les champs consommés. `kind` ne remplace pas le registre des
droits. Ne pas injecter silencieusement une illustration dans les réalisations.

## 21. Protéger le logo

Conserver uniquement les variantes utiles :

- doré sur fond sombre ;
- sombre sur fond clair ;
- monogramme ou icône validé ;
- favicon.

Préserver proportions et zone de respiration. Ne pas recolorer, ombrer,
déformer, rasteriser inutilement ou reconstruire le logo dans un composant.

## 22. Contrôler icônes et SVG

Utiliser Lucide pour les icônes d’interface courantes.

Pour un SVG externe :

- inspecter le contenu ;
- retirer scripts et liens ;
- retirer métadonnées inutiles ;
- vérifier la licence ;
- simplifier sans altérer ;
- ne pas injecter avec du HTML brut non fiable.

Masquer une icône décorative avec `aria-hidden="true"`. Nommer tout contrôle
uniquement iconographique.

## 23. Gérer les placeholders

Un placeholder de développement doit :

- être clairement identifiable ;
- respecter le ratio final ;
- ne contenir aucun faux fait ;
- ne pas ressembler à une réalisation réelle ;
- être suivi comme provisoire ;
- disparaître avant Production.

Ne jamais laisser image cassée, carré vide ou faux portrait comme résultat final.

## 24. Gérer les images IA et stock

Classer toute image générée ou stock comme `illustration`.

Vérifier :

- droit d’utilisation ;
- cohérence anatomique et capillaire ;
- absence de logo ou marque ;
- représentation digne ;
- absence de personne réelle imitée ;
- cohérence avec la direction artistique ;
- mention honnête si le contexte peut créer une confusion.

Ne jamais la placer dans « Nos réalisations » comme preuve du travail de Prisca.

## 25. Renommer ou remplacer

Avant modification :

1. trouver toutes les références ;
2. identifier les composants, contenus, metadata et tests ;
3. préparer le nouveau fichier ;
4. mettre à jour les références dans le même diff ;
5. vérifier l’absence de chemin mort ;
6. contrôler le rendu responsive ;
7. supprimer l’ancien seulement s’il n’est plus utilisé.

Ne pas écraser un original ou un asset utilisateur sans sauvegarde et
autorisation claire.

## 26. Auditer avant Production

Vérifier chaque ressource :

1. usage et catégorie ;
2. origine, droit et autorisation ;
3. nom, arborescence et format ;
4. dimensions, poids et ratio ;
5. cadrage et point focal ;
6. texte alternatif ;
7. EXIF et vie privée ;
8. chargement et `sizes` ;
9. rendu mobile et desktop ;
10. distinction illustration/réalisation.

Exclure du build toute ressource non validée.

## 27. Tester l’intégration

Après modification :

- relire le diff ;
- rechercher chemins anciens et assets orphelins ;
- exécuter typecheck, lint, tests et build disponibles ;
- vérifier console et erreurs réseau ;
- contrôler `320`, `390`, `768` et `1440px` ;
- vérifier zoom, alt et navigation clavier ;
- mesurer LCP et CLS affectés ;
- comparer cadrage et qualité ;
- inspecter Open Graph si concerné.

Ne pas prétendre avoir réalisé une inspection visuelle sans rendu observé.

## 28. Définition de terminé

Un asset est prêt lorsque :

- catégorie et usage sont explicites ;
- origine, licence et autorisation sont confirmées ;
- vie privée est protégée ;
- nom et emplacement sont cohérents ;
- format, dimensions et poids sont adaptés ;
- cadrage est validé ;
- alternative est correcte ;
- intégration `next/image` est stable ;
- responsive, performance et accessibilité sont contrôlés ;
- aucune référence morte ou duplication injustifiée ne subsiste ;
- statut illustration/réalisation est honnête.

## 29. Interdictions absolues

Ne jamais :

- voler ou hotlinker une image ;
- inventer une licence ou autorisation ;
- présenter une image IA ou stock comme réalisation ;
- publier GPS ou donnée privée ;
- utiliser le portrait d’une personne sans droit confirmé ;
- déformer un résultat de coiffure ;
- publier un original inutilement lourd ;
- mettre `priority` partout ;
- omettre `sizes` dans une grille responsive ;
- utiliser un `alt` générique ou trompeur ;
- désactiver globalement l’optimisation Next.js ;
- autoriser tous les domaines distants ;
- commiter doublons ou exports temporaires ;
- déployer sans autorisation.

Séparer dans le compte rendu les assets créés, modifiés, supprimés, leur statut
de droits, les contrôles réellement exécutés et les éléments non vérifiés.
