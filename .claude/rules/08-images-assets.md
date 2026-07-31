---
paths:
  - "public/**/*"
  - "content/gallery.ts"
  - "content/services.ts"
  - "components/**/*.tsx"
  - "next.config.ts"
---

# PRiMiE — Images et ressources

## 1. Rôle de cette règle

Les images sont centrales dans l'expérience PRiMiE.

Cette règle garantit :

- une distinction honnête entre réalisation et illustration ;
- des droits d'utilisation vérifiables ;
- une qualité visuelle cohérente ;
- de bonnes performances ;
- une organisation durable ;
- des textes alternatifs utiles ;
- l'absence de données privées cachées.

Une belle image ne doit jamais être intégrée si son origine, son statut ou son
droit d'utilisation n'est pas maîtrisé.

## 2. Catégories d'images

Toute image de contenu possède une catégorie explicite.

### `realization`

Photographie d'une coiffure réellement réalisée par Prisca.

Conditions :

- provenance confirmée ;
- autorisation de publication obtenue ;
- droit à l'image maîtrisé ;
- identité protégée selon l'autorisation ;
- aucune retouche trompeuse ;
- publication autorisée dans `Nos réalisations`.

### `illustration`

Photographie de stock, image générée par IA ou visuel d'inspiration.

Conditions :

- droit d'utilisation maîtrisé ;
- aucune attribution à Prisca ;
- aucune présentation comme cliente réelle ;
- aucune intégration silencieuse dans `Nos réalisations`.

### `brand`

Logo, monogramme, favicon, motif ou ressource officielle PRiMiE.

### `decorative`

Texture, forme ou élément sans information.

Une image décorative utilise `alt=""`.

## 3. Règle d'honnêteté

Il est strictement interdit de :

- présenter une image IA comme réalisation réelle ;
- présenter une image de stock comme cliente ;
- copier une photo trouvée en ligne sans autorisation ;
- supprimer un crédit obligatoire ;
- inventer une source ou une licence ;
- retoucher une image au point de falsifier le résultat ;
- laisser croire qu'un modèle représente Prisca sans validation.

En cas de doute, considérer l'image comme non publiable jusqu'à clarification.

La qualité esthétique ne prime jamais sur l'honnêteté.

## 4. Registre des ressources

Toute ressource externe de Production doit avoir une trace vérifiable :

- nom du fichier ;
- catégorie ;
- source ;
- auteur ou fournisseur ;
- URL d'origine ;
- type de licence ;
- date de récupération ;
- preuve ou référence d'autorisation ;
- crédit requis ;
- statut de publication.

Un document simple et versionné suffit pour la V1.
Ne pas ajouter de base de données ou d'outil externe pour ce registre.

Les photos fournies par Prisca doivent également avoir un statut d'autorisation
clair.

## 5. Arborescence

Organisation cible :

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

Règles :

- ne pas déposer toutes les images dans `public/` ;
- ne pas créer un dossier par fichier ;
- ne pas conserver plusieurs copies identiques ;
- ne pas publier les sources de travail lourdes ;
- séparer les originaux de création et les exports web ;
- supprimer les exports obsolètes seulement après vérification de leurs usages.

## 6. Nommage des fichiers

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

Règles :

- `kebab-case` ;
- caractères ASCII ;
- aucun espace ni accent ;
- aucun nom personnel inutile ;
- aucun nom d'appareil comme `IMG_4837.jpg` ;
- aucun suffixe comme `final-final-2` ;
- description courte et stable ;
- index sur deux chiffres pour une série.

Renommer un fichier exige de mettre à jour toutes ses références.

## 7. Formats

Utiliser :

- `SVG` pour logo, monogramme et formes vectorielles ;
- `WebP` ou `AVIF` pour les photographies optimisées ;
- `PNG` pour une transparence bitmap nécessaire ;
- `JPEG` comme source ou fallback pertinent ;
- formats requis par Next.js pour les favicons.

Éviter :

- BMP ;
- TIFF ;
- GIF lourd ;
- PNG pour une grande photographie opaque ;
- SVG non fiable sans inspection ;
- image en base64 dans un composant.

Évaluer une vidéo optimisée avant d'utiliser un GIF animé.

## 8. Dimensions sources

Ne pas publier une photographie de plusieurs milliers de pixels si le site n'en
a pas besoin.

| Usage | Largeur source utile |
| --- | --- |
| Hero large | `2000–2400px` |
| Grande galerie | `1400–1800px` |
| Carte service | `1000–1400px` |
| Vignette | `600–1000px` |
| Open Graph | `1200 × 630px` |

Ces valeurs sont des plafonds de travail, pas une obligation d'agrandissement.

Ne jamais agrandir artificiellement une petite image floue.

## 9. Budgets de poids

Objectifs indicatifs après optimisation :

| Usage | Cible |
| --- | --- |
| Image Hero | idéalement `≤ 400 Ko` |
| Image de galerie | idéalement `≤ 250 Ko` |
| Carte service | idéalement `≤ 180 Ko` |
| Logo SVG | idéalement `≤ 50 Ko` |
| Image Open Graph | idéalement `≤ 300 Ko` |

Une exception exige un gain visuel perceptible et une justification.

Ne sacrifie pas les détails des cheveux et des tresses pour atteindre un chiffre
arbitraire.

## 10. Utilisation de `next/image`

Utiliser `next/image` pour les images de contenu.

Règles :

- définir `width` et `height`, ou un parent dimensionné avec `fill` ;
- fournir `sizes` cohérent avec la grille ;
- utiliser `priority` seulement pour l'image LCP critique ;
- charger paresseusement les images sous la ligne de flottaison ;
- ne pas utiliser `unoptimized` sans justification ;
- ne pas désactiver globalement l'optimisation ;
- ne pas utiliser `fill` dans un parent sans taille ;
- conserver le ratio pour éviter le layout shift.

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

Adapter `sizes` à la largeur réelle dans le conteneur.

## 11. Images distantes

Préférer les ressources locales validées pour la V1.

Si une image distante est nécessaire :

- autoriser le domaine exact dans `next.config.ts` ;
- utiliser un pattern restrictif ;
- vérifier stabilité et disponibilité ;
- vérifier les droits ;
- ne pas hotlinker sans autorisation ;
- prévoir un comportement propre en cas d'échec.

Ne jamais autoriser toutes les sources avec un wildcard global.
Ne jamais utiliser une URL temporaire comme ressource de Production.

## 12. Cadrage

Ratios de référence :

- service : `4 / 5` ;
- galerie verticale : `3 / 4` ou `4 / 5` ;
- galerie paysage : `4 / 3` ;
- Open Graph : `1.91 / 1`.

Règles :

- ne pas étirer une image ;
- cadrer pour rendre la coiffure lisible ;
- préserver le visage avec dignité ;
- vérifier mobile et desktop ;
- utiliser `object-position` pour conserver un point focal ;
- éviter de couper une coiffure essentielle ;
- ne pas imposer le même crop à des compositions incompatibles.

Un point focal peut être stocké dans les données si plusieurs images l'exigent.

## 13. Direction photographique

Privilégier :

- lumière chaude et naturelle ;
- peau et cheveux rendus fidèlement ;
- texture des tresses visible ;
- arrière-plan calme ;
- cadrage professionnel ;
- postures naturelles ;
- diversité des styles et longueurs ;
- cohérence colorimétrique entre images proches.

Éviter :

- filtres beauté excessifs ;
- peau artificiellement lissée ;
- saturation agressive ;
- effets HDR ;
- arrière-plans surchargés ;
- logos tiers visibles ;
- watermark d'une autre marque ;
- image floue ou fortement compressée.

## 14. Métadonnées et vie privée

Avant publication d'une photographie réelle :

- retirer les coordonnées GPS EXIF ;
- retirer les métadonnées inutiles de l'appareil ;
- vérifier qu'aucun document privé n'est visible ;
- vérifier l'arrière-plan et les reflets ;
- vérifier les informations personnelles affichées ;
- confirmer le droit à l'image ;
- conserver seulement la version nécessaire au site.

Ne pas commiter un original contenant des données privées si seule la version
nettoyée est nécessaire.

## 15. Textes alternatifs

Le texte alternatif décrit l'information utile.

Pour une coiffure, décrire :

- type de coiffure ;
- forme ou longueur si utile ;
- détail distinctif.

Exemple :

```text
Longues knotless braids relevées en demi-queue
```

Ne pas écrire :

- `image`
- `photo`
- nom du fichier
- liste de mots-clés
- description physique inutile
- information impossible à déduire

Utiliser `alt=""` pour un élément purement décoratif.

## 16. Données d'image

Modèle possible :

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

Ajouter uniquement les champs réellement utilisés.

Le statut `kind` ne remplace pas le registre des droits.
Une `illustration` ne doit jamais apparaître silencieusement parmi les
réalisations.

## 17. Logo et identité

Variantes réellement utiles :

- doré sur fond sombre ;
- sombre sur fond clair ;
- monogramme ou icône si validé ;
- favicon.

Règles :

- préserver les proportions ;
- conserver une zone de respiration ;
- ne pas recolorer arbitrairement ;
- ne pas appliquer d'ombre ou gradient non validé ;
- préférer le SVG disponible à un raster flou ;
- ne pas redessiner le logo dans un composant ;
- ne pas modifier le fichier source sans validation.

## 18. Icônes et SVG

Utiliser Lucide pour les icônes d'interface courantes.

Pour un SVG externe :

- inspecter le contenu ;
- retirer scripts, liens et métadonnées inutiles ;
- vérifier la licence ;
- simplifier sans dégrader le rendu ;
- éviter toute injection HTML non maîtrisée.

Ne pas télécharger une icône aléatoire si Lucide fournit un équivalent.

## 19. Placeholders

Un placeholder sert uniquement pendant le développement.

Règles :

- clairement identifiable ;
- impossible à confondre avec une réalisation ;
- ratio final respecté ;
- aucune fausse information ;
- retrait obligatoire avant Production ;
- présence signalée dans le compte rendu.

Ne jamais laisser une image cassée ou un carré vide comme résultat final.

## 20. Transformation des fichiers

Lors d'une optimisation :

- conserver l'original autorisé hors de l'export web si nécessaire ;
- produire un fichier distinct ;
- comparer le cadrage et les détails ;
- vérifier dimensions, format et poids ;
- rechercher les références avant remplacement ;
- éviter les conversions successives avec perte ;
- ne pas écraser un fichier validé sans demande.

Une transformation technique ne doit pas changer le statut juridique ou
éditorial de l'image.

## 21. Audit avant Production

Vérifier chaque ressource :

1. usage ;
2. catégorie ;
3. origine ;
4. droit d'utilisation ;
5. autorisation de la personne ;
6. nom de fichier ;
7. format ;
8. dimensions ;
9. poids ;
10. cadrage ;
11. texte alternatif ;
12. métadonnées privées ;
13. chargement ;
14. comportement responsive ;
15. distinction illustration/réalisation.

Toute ressource non validée doit être exclue du build de Production.

## 22. Interdictions absolues

- Voler ou hotlinker une image.
- Publier une photo sans droit maîtrisé.
- Inventer une licence.
- Présenter une illustration comme réalisation.
- Exposer des métadonnées GPS.
- Publier une source inutilement lourde.
- Utiliser `priority` sur toutes les images.
- Omettre `sizes` dans une grille responsive.
- Utiliser un alt générique.
- Intégrer du texte essentiel dans une image.
- Désactiver l'optimisation Next.js globalement.
- Autoriser tous les domaines d'images.
- Commiter des doublons ou sources temporaires.
- Utiliser le portrait d'une personne sans autorisation.

## 23. Definition of Done

Une ressource est prête lorsque :

- sa catégorie est explicite ;
- son origine et son droit sont vérifiables ;
- l'autorisation nécessaire est confirmée ;
- elle ne contient aucune métadonnée privée ;
- son nom et son emplacement respectent l'organisation ;
- son format, ses dimensions et son poids sont adaptés ;
- son cadrage fonctionne sur mobile et desktop ;
- son texte alternatif est utile ou vide si décorative ;
- sa stratégie `next/image` est correcte ;
- elle n'est pas confondue avec une réalisation PRiMiE ;
- aucun placeholder ou doublon inutile ne reste ;
- sa vérification est consignée.
