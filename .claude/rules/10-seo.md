---
paths:
  - "app/**/*.{ts,tsx}"
  - "content/**/*.ts"
  - "public/**/*"
  - "next.config.ts"
---

# PRiMiE — SEO

## 1. Objectif

Le SEO de PRiMiE doit aider une cliente pertinente à :

1. découvrir l'activité ;
2. comprendre les prestations ;
3. vérifier la crédibilité de PRiMiE ;
4. contacter Prisca sur WhatsApp.

Le référencement doit rester :

- honnête ;
- local seulement lorsque la zone est confirmée ;
- cohérent avec le contenu visible ;
- rapide ;
- accessible ;
- maintenable sans plugin SEO.

Ne jamais sacrifier la lisibilité ou inventer un fait pour viser un mot-clé.

## 2. Source de vérité

Centraliser dans `content/site-config.ts` :

- nom ;
- description ;
- URL canonique après validation du domaine ;
- téléphone ;
- lien WhatsApp ;
- logo ;
- image sociale ;
- langue ;
- zone géographique confirmée ;
- réseaux sociaux confirmés.

Les métadonnées, données structurées et contenus visibles consomment les mêmes
valeurs.

Il est interdit de maintenir des coordonnées divergentes.

## 3. Faits SEO interdits sans validation

Ne pas ajouter dans le contenu, les métadonnées ou le JSON-LD :

- ville ;
- adresse ;
- code postal ;
- zone de déplacement ;
- horaires ;
- prix ou devise ;
- note moyenne ;
- nombre d'avis ;
- disponibilité ;
- ancienneté ;
- distinction ;
- position `n°1` ;
- promesse `pas cher` ;
- réseau social ;
- URL de domaine non réservée.

Une donnée structurée invisible n'autorise jamais un fait non confirmé.

## 4. API Metadata de l'App Router

Utiliser l'API Metadata native de Next.js.

Pour la landing page statique :

- préférer l'export `metadata` ;
- utiliser `generateMetadata` seulement pour des valeurs réellement dynamiques ;
- définir `metadataBase` après validation du domaine ;
- ne pas installer une bibliothèque SEO pour reproduire les fonctions natives ;
- conserver les données dans la source de vérité.

Exemple structurel :

```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Chez PRiMiE Coiffure",
    template: "%s | PRiMiE",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};
```

Ne pas copier cet exemple tant que `siteConfig.url` n'est pas validée.

## 5. Titre SEO

Le titre doit :

- inclure `PRiMiE` ;
- décrire l'activité ;
- rester naturel ;
- distinguer la page ;
- utiliser une localisation seulement après confirmation ;
- correspondre au contenu visible.

Forme conceptuelle à valider :

```text
Chez PRiMiE Coiffure — Coiffure afro à domicile
```

Repère éditorial :

- viser environ `50–60` caractères si naturel ;
- ne pas couper une information essentielle pour atteindre un nombre ;
- accepter que le moteur puisse réécrire le titre.

Éviter mots-clés répétés, majuscules intégrales, suite de villes, promesse non
prouvée et emoji promotionnel.

## 6. Meta description

La description doit :

- résumer l'activité ;
- présenter un bénéfice ;
- inviter à contacter PRiMiE ;
- rester cohérente avec la page ;
- utiliser une localisation seulement si elle est confirmée.

Repère éditorial :

- viser environ `140–160` caractères si le message reste clair ;
- éviter la liste complète des prestations ;
- ne pas dupliquer mot pour mot le Hero ;
- ne pas inventer prix, zone ou disponibilité ;
- accepter qu'un moteur choisisse un autre extrait.

Une meta description n'est pas une garantie de classement.

## 7. URL canonique

La V1 possède une URL canonique principale.

Règles :

- utiliser HTTPS ;
- choisir une seule variante de domaine ;
- déclarer la canonical publique finale ;
- rediriger les variantes techniques ;
- ne pas utiliser une URL Vercel temporaire en Production ;
- ne pas traiter les ancres comme pages canoniques ;
- ne pas déclarer plusieurs canonicals contradictoires.

Une canonical exprime une préférence. Elle ne remplace pas une redirection ni ne
garantit la sélection finale par Google.

## 8. Indexation par environnement

### Production

- indexation autorisée ;
- canonical finale ;
- sitemap public ;
- robots cohérent ;
- aucun `noindex` accidentel.

### Développement et previews

- éviter leur indexation ;
- ne pas les déclarer comme versions canoniques ;
- vérifier le comportement réel des previews Vercel ;
- ne pas bloquer les ressources nécessaires au rendu.

Vérifier l'environnement avant de modifier une directive d'indexation.

## 9. `robots.ts`

Utiliser `app/robots.ts`.

Le fichier doit :

- produire une URL de sitemap valide ;
- autoriser la landing page en Production ;
- refléter la stratégie des environnements ;
- ne contenir aucune URL provisoire.

Rappels :

- `robots.txt` ne protège aucune donnée ;
- `Disallow` ne garantit pas la désindexation ;
- les ressources de rendu ne doivent pas être bloquées sans raison ;
- une URL sensible doit être réellement protégée ou supprimée.

## 10. `sitemap.ts`

Utiliser `app/sitemap.ts`.

Pour la landing page V1 :

- inclure seulement les URL canoniques indexables ;
- utiliser une date de modification honnête ;
- ne pas ajouter les ancres ;
- ne pas ajouter une route inexistante ;
- ne pas inventer priorité ou fréquence ;
- générer des URL absolues depuis le domaine validé.

Une landing page unique peut avoir un sitemap simple.
La soumission d'un sitemap reste un signal, pas une garantie d'indexation.

## 11. Open Graph et aperçus sociaux

Fournir une image sociale PRiMiE dédiée.

Repères :

- format : `1200 × 630px` ;
- identité lisible ;
- contraste suffisant ;
- peu de texte ;
- coiffure visible ;
- aucun contenu trompeur ;
- visuel autorisé.

Utiliser les conventions Next.js :

- `app/opengraph-image.*` ;
- `app/twitter-image.*` si une variante est utile ;
- ou les champs Metadata correspondants.

Ne pas utiliser une image de galerie aléatoire comme visuel social permanent.

## 12. Structure du contenu

Le référencement repose d'abord sur un contenu lisible.

Règles :

- un seul `h1` ;
- un `h2` par grande section ;
- hiérarchie logique ;
- contenu important présent en HTML ;
- navigation par ancres compréhensible ;
- texte descriptif autour des images ;
- CTA au libellé précis ;
- contenu principal rendu côté serveur ;
- aucun texte SEO invisible.

Le Footer ne doit pas devenir un bloc de mots-clés.

## 13. Images et SEO

- Utiliser des noms de fichiers descriptifs.
- Fournir des textes alternatifs utiles.
- Ne pas bourrer l'alt de mots-clés.
- Optimiser poids et dimensions.
- Utiliser `next/image`.
- Déclarer `sizes`.
- Réserver `priority` au média LCP.
- Ne pas intégrer un texte important dans l'image.
- Ne pas présenter une illustration comme réalisation.

L'attribut `alt` sert d'abord à l'accessibilité.

## 14. Référencement local

Le SEO local commence seulement après validation :

- de la ville ;
- de la zone desservie ;
- de l'adresse publique ou du statut d'activité de service ;
- des coordonnées cohérentes ;
- du domaine ;
- du profil Google Business Profile s'il existe.

Après validation :

- utiliser la localisation naturellement ;
- conserver un NAP cohérent si une adresse est publique ;
- relier les profils officiels ;
- décrire la zone sans pages artificielles ;
- éviter les pages quasi identiques par ville.

Il est interdit de cibler Reims ou une autre ville par supposition.

## 15. Données structurées

Utiliser JSON-LD seulement lorsque :

- le type décrit réellement PRiMiE ;
- les propriétés sont confirmées ;
- le contenu correspondant est visible ;
- le balisage peut être maintenu ;
- les validations officielles réussissent.

Le JSON-LD vient de la source de vérité.
Le format recommandé est JSON-LD.

Ne pas :

- concaténer manuellement des chaînes JSON ;
- baliser un contenu caché ou absent ;
- utiliser le markup pour inventer une information ;
- promettre un résultat enrichi.

## 16. Type d'entité

Évaluer selon les données confirmées :

- `Organization` pour l'identité de marque ;
- `Person` si le site représente principalement Prisca ;
- `LocalBusiness` ou un sous-type seulement si la nature locale et les propriétés
  nécessaires sont confirmées.

Ne pas choisir `HairSalon` si cela suggère un salon physique inexistant.

Expliquer le type et ses implications avant intégration.

## 17. Propriétés interdites sans preuve

Ne pas ajouter :

- `aggregateRating` ;
- `review` ;
- `priceRange` ;
- `openingHoursSpecification` ;
- `address` ;
- `geo` ;
- `areaServed` ;
- `award` ;
- `sameAs` ;
- `hasOfferCatalog` ;
- `makesOffer`.

Une propriété recommandée reste facultative si l'information n'existe pas.

## 18. Types structurés hors périmètre

Ne pas ajouter en V1 :

- `Product` ;
- `Offer` ;
- `Event` ;
- `Course` ;
- `JobPosting` ;
- `AggregateRating` ;
- `FAQPage` uniquement pour espérer un résultat enrichi ;
- carousel `ItemList` non éligible.

PRiMiE ne vend aucun produit en ligne et n'automatise aucune réservation en V1.

## 19. Honnêteté du markup

Les données structurées doivent :

- décrire le contenu principal ;
- être visibles ou vérifiables ;
- rester à jour ;
- ne pas tromper le moteur ;
- ne pas usurper un témoignage ou une note ;
- ne pas décrire une fonctionnalité absente ;
- ne pas utiliser une fausse adresse ;
- ne pas annoncer un prix inexistant.

Un markup syntaxiquement valide peut rester trompeur et interdit.

## 20. Liens et crawl

- Chaque ancre de navigation cible une section existante.
- Aucun lien vide ou `href="#"` générique.
- Les liens importants utilisent un vrai `href`.
- Les ressources essentielles retournent un statut valide.
- Les redirections temporaires ne deviennent pas une architecture permanente.
- Aucun script n'est requis pour découvrir le contenu principal.
- Les liens WhatsApp et téléphone ne sont pas transformés en pseudo-boutons JS.

Ne pas créer des liens internes artificiels uniquement pour le SEO.

## 21. Search Console

Après mise en Production et validation du domaine :

- vérifier la propriété ;
- soumettre le sitemap ;
- inspecter l'URL canonique ;
- contrôler l'indexation ;
- surveiller les erreurs ;
- analyser les requêtes sans sur-réagir aux premiers jours ;
- corriger les données structurées invalides ;
- surveiller les Core Web Vitals.

Ne jamais agir dans Search Console sans demande explicite.
Ne pas prétendre à un résultat SEO avant l'existence de données réelles.

## 22. Validation

Avant Production :

1. inspecter le HTML rendu ;
2. vérifier title et description ;
3. vérifier canonical ;
4. vérifier robots ;
5. vérifier sitemap ;
6. vérifier Open Graph ;
7. tester le partage social ;
8. valider le JSON-LD avec l'outil officiel ;
9. comparer markup et contenu visible ;
10. rechercher toute donnée inventée ;
11. vérifier l'indexation de l'environnement ;
12. contrôler liens et statuts HTTP.

Un score Lighthouse SEO élevé ne prouve pas une stratégie locale réussie.

## 23. Interdictions absolues

- Bourrer les textes de mots-clés.
- Créer des pages de ville artificielles.
- Cacher du texte SEO.
- Dupliquer title et description sans réflexion.
- Publier une canonical provisoire.
- Laisser `noindex` en Production.
- Indexer les previews.
- Ajouter une adresse ou ville non confirmée.
- Inventer des avis ou notes structurés.
- Ajouter des prix ou horaires fictifs.
- Utiliser un type Schema.org trompeur.
- Installer un plugin SEO inutile.
- Déclarer un résultat enrichi garanti.
- Considérer un sitemap comme garantie d'indexation.
- Agir dans Search Console sans demande.

## 24. Definition of Done

Le SEO d'une version est prêt lorsque :

- les faits viennent de la source de vérité ;
- title et description sont honnêtes ;
- la canonical utilise le domaine validé ;
- robots et sitemap correspondent à l'environnement ;
- les aperçus sociaux utilisent un visuel autorisé ;
- la hiérarchie HTML reste correcte ;
- aucun mot-clé n'est dissimulé ou surutilisé ;
- le JSON-LD décrit uniquement le contenu réel ;
- aucune donnée locale n'est inventée ;
- les contrôles techniques passent ;
- les limites et actions externes non réalisées sont signalées.

## Références officielles

- Metadata Next.js : `https://nextjs.org/docs/app/getting-started/metadata-and-og-images`
- Robots Next.js : `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots`
- Sitemap Next.js : `https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap`
- Données structurées Google :
  `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- LocalBusiness Google :
  `https://developers.google.com/search/docs/appearance/structured-data/local-business`
