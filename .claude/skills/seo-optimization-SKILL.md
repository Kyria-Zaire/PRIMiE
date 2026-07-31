---
name: seo-optimization
description: Auditer, concevoir, corriger ou valider le référencement naturel de PRiMiE avec Next.js App Router. Utiliser cette skill pour travailler sur intentions de recherche, contenu indexable, titles, meta descriptions, canonical, robots, sitemap, Open Graph, données structurées JSON-LD, SEO local, images, maillage par ancres, indexation Vercel, Search Console, Core Web Vitals ou régression SEO, sans inventer de ville, adresse, horaires, prix, avis, domaine ni promesse commerciale.
---

# SEO Optimization PRiMiE

Améliorer la découverte de PRiMiE par des clientes pertinentes sans tromper les
moteurs ni dégrader la page. Partir des faits validés, mesurer l’état réel et
préserver contenu, accessibilité, performance et conversion WhatsApp.

## 1. Charger le contexte

Avant toute action :

1. lire `CLAUDE.md` ;
2. lire `10-seo.md`, `07-content-copy.md`, `08-images-assets.md`,
   `11-performance.md` et `do-not-break.md` ;
3. inspecter les décisions produit et contenus validés ;
4. lire `package.json` et les versions réelles ;
5. inspecter `app/`, `content/`, `public/` et la configuration Next.js ;
6. vérifier les métadonnées, routes, HTML rendu et assets existants ;
7. vérifier l’état local et préserver tout travail inconnu.

Utiliser `rg --files` et `rg` pour localiser `metadata`, `generateMetadata`,
`robots`, `sitemap`, canonical, JSON-LD, titres, images et consommateurs de
`siteConfig`. Ne pas supposer qu’un fichier, outil ou domaine existe.

## 2. Respecter le mode demandé

Une demande d’audit ou diagnostic autorise :

- lecture et inspection ;
- build local ;
- vérifications HTTP locales ;
- analyse du HTML rendu ;
- rapport et recommandations.

Elle n’autorise pas :

- modification du code ;
- installation d’un package ;
- changement Vercel, DNS ou domaine ;
- action Search Console ;
- commit, push ou déploiement.

Modifier seulement sur demande explicite. Une correction locale n’autorise pas
une action distante.

## 3. Définir l’objectif SEO

Relier le travail à ce parcours :

1. découvrir l’activité ;
2. comprendre les prestations ;
3. évaluer la crédibilité ;
4. consulter les réalisations ;
5. contacter Prisca sur WhatsApp.

Consigner :

- page et environnement ;
- audience ;
- intention de recherche ;
- contenu disponible ;
- zone géographique confirmée ou inconnue ;
- métrique ou défaut observé ;
- objectif ;
- contraintes ;
- éléments non vérifiables.

Ne pas résumer le SEO à un score Lighthouse.

## 4. Protéger les faits

Utiliser exactement :

```text
Marque : Chez PRiMiE Coiffure
Graphie : PRiMiE
Porteuse : Prisca
Activité : coiffure et beauté afro à domicile
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

Préserver les six prestations et l’ordre officiel des sections.

Ne jamais inventer :

- ville, adresse, code postal ou zone desservie ;
- domaine ou réseau social ;
- horaires, prix, devise ou disponibilité ;
- ancienneté, diplôme, récompense ou position `n°1` ;
- avis, note ou nombre de clientes ;
- délai, garantie ou promotion.

Une donnée invisible dans le JSON-LD reste une affirmation publique.

## 5. Centraliser la source de vérité

Utiliser `content/site-config.ts` pour :

- nom ;
- description ;
- téléphone ;
- WhatsApp ;
- langue ;
- logo ;
- image sociale ;
- domaine validé ;
- localisation confirmée ;
- profils officiels confirmés.

Faire consommer ces valeurs par le contenu, Metadata, sitemap, robots et JSON-LD.
Ne pas dupliquer les coordonnées dans plusieurs fichiers.

Une valeur manquante doit rester absente ou bloquer l’intégration concernée,
jamais être devinée.

## 6. Établir la baseline

Avant d’optimiser, relever selon disponibilité :

- HTML initial ;
- title et description ;
- canonical ;
- directives robots ;
- sitemap ;
- statut HTTP ;
- structure des titres ;
- contenu indexable ;
- Open Graph ;
- JSON-LD ;
- liens internes et externes ;
- images ;
- données Search Console existantes ;
- Core Web Vitals.

Comparer avant et après sur le même environnement et la même version. Noter les
défauts préexistants.

## 7. Structurer le contenu

Contrôler :

- un seul `h1` décrivant l’activité ;
- un `h2` par grande section ;
- hiérarchie logique ;
- contenu important présent en HTML ;
- prestations nommées clairement ;
- texte utile autour des images ;
- ancres compréhensibles ;
- CTA précis ;
- contenu principal rendu côté serveur ;
- aucun texte caché pour les moteurs.

Ne pas transformer le footer en liste de mots-clés. Ne pas remplacer une
information utile par un slogan vague.

## 8. Rédiger le title

Le title doit :

- inclure `PRiMiE` ;
- décrire l’activité ;
- correspondre au contenu visible ;
- rester naturel et distinct ;
- utiliser la localisation seulement si confirmée.

Repère :

```text
Chez PRiMiE Coiffure — Coiffure afro à domicile
```

Valider le texte exact avant Production. Viser environ `50–60` caractères si
naturel. Éviter mots-clés répétés, majuscules intégrales, suite de villes,
promesse non prouvée et emoji promotionnel.

## 9. Rédiger la meta description

La description doit :

- résumer l’activité ;
- présenter un bénéfice réel ;
- inviter au contact ;
- rester cohérente avec la page ;
- utiliser uniquement des faits validés.

Viser environ `140–160` caractères si le message reste clair. Ne pas recopier le
Hero, lister toutes les prestations ni inventer localisation ou disponibilité.

La description favorise la compréhension et le clic ; elle ne garantit pas le
classement ni l’extrait choisi par Google.

## 10. Utiliser Metadata App Router

Préférer l’API Metadata native de Next.js :

- `metadata` pour la landing statique ;
- `generateMetadata` uniquement pour une vraie donnée dynamique ;
- `metadataBase` seulement avec un domaine validé ;
- valeurs centralisées ;
- aucun package SEO redondant.

Structure conceptuelle :

```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Chez PRiMiE Coiffure — Coiffure afro à domicile",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};
```

Ne pas copier cette structure tant que `siteConfig.url` n’est pas validée.

## 11. Gérer la canonical

La V1 possède une URL principale. Contrôler :

- HTTPS ;
- une seule variante de domaine ;
- canonical absolue ou résolue depuis `metadataBase` ;
- redirection des variantes techniques ;
- aucune canonical contradictoire ;
- aucune ancre traitée comme page ;
- aucune URL Vercel temporaire en Production.

Une canonical ne remplace pas une redirection. Arrêter l’intégration si le
domaine final manque.

## 12. Séparer les environnements

### Production

- indexation autorisée ;
- canonical finale ;
- sitemap public ;
- robots cohérent ;
- aucun `noindex` accidentel.

### Développement et Preview

- éviter l’indexation ;
- ne pas les déclarer canoniques ;
- vérifier le comportement Vercel réel ;
- laisser accessibles les ressources nécessaires au rendu.

Ne pas appliquer une règle d’environnement sans connaître la variable et le
pipeline réellement disponibles.

## 13. Construire `robots.ts`

Utiliser `app/robots.ts`. Vérifier :

- règles adaptées à l’environnement ;
- exploration de `/` autorisée en Production ;
- sitemap valide ;
- aucune URL provisoire ;
- aucune ressource utile bloquée.

`robots.txt` n’est ni une protection de données ni une garantie de
désindexation. Ne jamais publier une donnée sensible puis compter sur
`Disallow`.

## 14. Construire `sitemap.ts`

Pour la landing V1 :

- inclure uniquement l’URL canonique indexable ;
- générer une URL absolue depuis le domaine validé ;
- utiliser une date de modification honnête ;
- exclure ancres et routes inexistantes ;
- ne pas inventer priorité ou fréquence.

Un sitemap aide la découverte. Il ne garantit pas l’indexation.

## 15. Préparer Open Graph

Prévoir une image PRiMiE dédiée :

- `1200 × 630px` ;
- identité lisible ;
- contraste suffisant ;
- peu de texte ;
- coiffure visible ;
- droit d’utilisation confirmé ;
- aucun fait trompeur.

Utiliser `app/opengraph-image.*`, les champs Metadata ou une variante Twitter
justifiée. Ne pas prendre une image aléatoire de galerie comme image sociale
permanente.

Vérifier titre, description, URL, image absolue et rendu de partage.

## 16. Auditer les images

Pour chaque image :

- nom de fichier descriptif ;
- statut `realization`, `illustration`, `brand` ou `decorative` ;
- droit et origine connus ;
- `alt` utile sans mots-clés forcés ;
- dimensions et ratio ;
- `next/image` ;
- `sizes` fidèle ;
- poids optimisé ;
- priorité réservée au LCP.

L’attribut `alt` sert d’abord à l’accessibilité. Ne jamais présenter une image
IA ou stock comme une réalisation de Prisca.

## 17. Concevoir le JSON-LD

Ajouter des données structurées seulement si :

- le type décrit réellement PRiMiE ;
- chaque propriété est confirmée ;
- le contenu correspondant est visible ou vérifiable ;
- la source est centralisée ;
- le markup peut rester à jour ;
- la validation officielle réussit.

Sérialiser un objet ; ne pas concaténer des chaînes. Échapper les caractères
risqués avant injection dans un script JSON-LD.

Un schéma valide syntaxiquement peut rester trompeur.

## 18. Choisir le type d’entité

Évaluer et justifier :

- `Organization` pour la marque ;
- `Person` si le site représente principalement Prisca ;
- `LocalBusiness` ou sous-type seulement avec activité locale et propriétés
  confirmées.

Ne pas choisir `HairSalon` si cela fait croire à un salon physique.

Ne pas ajouter sans preuve :

- `address`, `geo` ou `areaServed` ;
- `openingHoursSpecification` ;
- `priceRange`, `Offer` ou catalogue ;
- `aggregateRating` ou `review` ;
- `sameAs`, `award` ou nombre de clientes.

Une propriété recommandée reste facultative si le fait n’existe pas.

## 19. Respecter le périmètre structuré

Ne pas ajouter en V1 :

- `Product` ;
- `Offer` ;
- `Event` ;
- `Course` ;
- `JobPosting` ;
- notes agrégées ;
- faux carousel `ItemList` ;
- `FAQPage` uniquement pour espérer un résultat enrichi.

PRiMiE ne vend pas en ligne et ne confirme pas automatiquement une réservation.
Le JSON-LD ne doit décrire aucune fonction absente.

## 20. Préparer le SEO local

Commencer le SEO local seulement après validation :

- ville ;
- zone desservie ;
- statut d’activité de service ;
- éventuelle adresse publique ;
- domaine ;
- coordonnées cohérentes ;
- Google Business Profile s’il existe.

Après validation :

- employer la localisation naturellement ;
- maintenir un NAP cohérent si l’adresse est publique ;
- relier seulement les profils officiels ;
- décrire la zone sans pages artificielles ;
- éviter les pages quasi identiques par ville.

Ne jamais cibler Reims ou une autre ville par simple supposition.

## 21. Préserver accessibilité et performance

Refuser toute optimisation qui :

- cache du texte ;
- dégrade la hiérarchie ;
- bourre les `alt` ;
- ajoute un script tiers lourd ;
- retarde le Hero ;
- dégrade LCP, INP ou CLS ;
- rend un CTA ambigu ;
- transforme du texte en image ;
- duplique le contenu.

Le SEO technique dépend d’un HTML sémantique, d’un rendu rapide et d’un contenu
lisible. Tester les Core Web Vitals affectés.

## 22. Tester les artefacts SEO

Lorsque les scripts existent :

- lancer typecheck, lint, tests et build ;
- demander `/robots.txt` ;
- demander `/sitemap.xml` ;
- inspecter le `<head>` de `/` ;
- parser le JSON-LD ;
- vérifier les URLs absolues ;
- tester Production et Preview séparément.

Écrire des tests ciblés pour les invariants stables :

- marque ;
- description ;
- canonical après validation ;
- téléphone et WhatsApp ;
- absence de faits interdits.

Ne pas figer un texte marketing encore en arbitrage.

## 23. Utiliser Search Console avec prudence

Après mise en Production et validation du domaine, et seulement sur demande :

- vérifier la propriété ;
- soumettre le sitemap ;
- inspecter l’URL ;
- contrôler canonical choisie et indexation ;
- suivre erreurs et Core Web Vitals ;
- analyser requêtes, pages et appareils ;
- comparer sur une période suffisante.

Ne pas promettre un classement ni sur-réagir aux premiers jours. Distinguer
impressions, clics, position et conversion WhatsApp.

## 24. Corriger avec méthode

Si la correction est autorisée :

1. reproduire le défaut ;
2. identifier la source de vérité ;
3. vérifier les faits nécessaires ;
4. faire le plus petit diff cohérent ;
5. ajouter un test si le contrat est stable ;
6. construire en mode Production ;
7. inspecter HTML et artefacts ;
8. contrôler accessibilité et performance ;
9. comparer avant/après ;
10. déclarer les limites.

Ne pas regrouper refonte éditoriale, migration de domaine et données structurées
dans un changement impossible à attribuer.

## 25. Définition de terminé

Le travail est terminé lorsque :

- baseline et environnement sont explicites ;
- source de vérité est respectée ;
- facts manquants ne sont pas inventés ;
- contenu, titres et metadata sont cohérents ;
- canonical et indexation sont vérifiées ;
- robots et sitemap sont valides ;
- image sociale est contrôlée ;
- JSON-LD est honnête et validé s’il existe ;
- rendu HTML et statuts HTTP sont inspectés ;
- accessibilité et performance sont préservées ;
- contrôles exécutés sont rapportés ;
- limites et actions distantes restent explicites.

## 26. Interdictions absolues

Ne jamais :

- bourrer un texte ou un `alt` de mots-clés ;
- créer des pages de ville artificielles ;
- cacher du texte SEO ;
- publier une canonical provisoire ;
- laisser `noindex` en Production ;
- indexer volontairement une Preview ;
- inventer localisation, avis, prix ou horaires ;
- ajouter un type Schema.org trompeur ;
- installer un plugin SEO inutile ;
- garantir indexation, classement ou résultat enrichi ;
- considérer sitemap ou Lighthouse comme preuve suffisante ;
- agir sur Search Console, domaine, DNS ou Vercel sans autorisation.

Séparer strictement ce qui est vérifié, observé, inféré et non vérifié.
