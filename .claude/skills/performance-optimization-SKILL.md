---
name: performance-optimization
description: Auditer, diagnostiquer et optimiser les performances de PRIMiE avec des mesures avant et après. Utiliser cette skill pour améliorer Core Web Vitals, LCP, INP, CLS, poids JavaScript ou CSS, images, polices, Server et Client Components, animations, galerie, lightbox, imports, dépendances, cache ou chargement initial, ainsi que pour enquêter sur une régression Lighthouse, mobile, Preview ou Production sans sacrifier design, accessibilité, SEO ni conversion WhatsApp.
---
# Performance Optimization PRIMiE
Mesurer avant de modifier. Optimiser la cause dominante, comparer dans des conditions identiques et
préserver l’expérience. Ne jamais déclarer un gain sur une intuition ou une seule exécution.
## 1. Charger le contexte
Avant toute analyse :
1. lire `CLAUDE.md` ;
2. lire `11-performance.md`, `do-not-break.md` et les règles concernées ;
3. inspecter les fichiers, imports, assets et tests touchés ;
4. lire `package.json` et les versions réelles ;
5. identifier l’environnement et le build mesuré ;
6. inspecter l’état local ;
7. préserver tout travail inconnu.
Utiliser `rg --files` et `rg` pour localiser Client Components, imports,
ressources, scripts tiers et consommateurs. Ne pas supposer qu’un outil, script, package ou analyseur existe.
## 2. Respecter le mode demandé
Une demande d’audit ou diagnostic autorise :
- lecture ;
- build local ;
- mesures non destructives ;
- profils ;
- captures ;
- rapport.
Elle n’autorise pas :
- modification ;
- installation ;
- changement distant ;
- commit ;
- push ;
- déploiement.
Modifier uniquement si l’utilisatrice demande explicitement d’optimiser ou de
corriger. Une autorisation de modification n’autorise pas un déploiement.
## 3. Définir le problème
Consigner :
- comportement lent ou métrique dégradée ;
- impact utilisateur ;
- route et section ;
- appareil ;
- viewport ;
- navigateur ;
- réseau ;
- processeur ;
- environnement ;
- cache froid ou chaud ;
- valeur observée ;
- objectif ;
- période ou commit d’apparition ;
- reproductibilité.
Ne pas résumer « le site est lent » en cause supposée. Demander une précision seulement si elle bloque une mesure comparable.
## 4. Relier la performance au produit
Prioriser ce qui affecte :
1. affichage du Hero ;
2. compréhension des prestations ;
3. accès au CTA WhatsApp ;
4. navigation mobile ;
5. galerie ;
6. FAQ ;
7. stabilité visuelle ;
8. accessibilité ;
9. référencement.
Une animation décorative ne prime jamais sur le contenu ou la conversion. Une optimisation qui masque, retarde ou dégrade l’action principale est refusée.
## 5. Protéger les invariants
Préserver :
```text
Marque : Chez PRIMiE Coiffure
Graphie : PRIMiE
Porteuse : Prisca
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
Ne pas modifier contenu, ordre de page ou comportement pour améliorer un score
sans validation produit. Ne pas retirer une image de réalisation, un titre ou un CTA uniquement pour
gagner des points.
## 6. Respecter le périmètre V1
PRIMiE est une landing page publique unique. Ne pas ajouter :
- backend ;
- API métier ;
- base de données ;
- CMS ;
- worker ;
- service de cache externe ;
- tracking ;
- RUM personnalisé ;
- gestionnaire de tags ;
- CDN supplémentaire ;
- dépendance lourde ;
- infrastructure disproportionnée.
Utiliser les capacités natives de Next.js et Vercel lorsqu’elles suffisent. Toute télémétrie exige une décision produit, vie privée et consentement.
## 7. Utiliser les objectifs Core Web Vitals
Objectifs de référence du projet :
- LCP `≤ 2,5 s` ;
- INP `≤ 200 ms` ;
- CLS `≤ 0,1`.
Les évaluer :
- au 75e percentile ;
- séparément mobile et ordinateur ;
- avec données terrain en priorité lorsqu’elles sont disponibles ;
- avec laboratoire pour le diagnostic.
Ne pas présenter TBT comme un remplacement direct de l’INP terrain. Ne pas comparer des métriques issues de conditions différentes.
## 8. Respecter les budgets V1
Budgets cibles :
| Ressource | Budget |
| --- | ---: |
| JavaScript initial compressé | `≤ 150 Ko` |
| JavaScript total route compressé | `≤ 220 Ko` |
| CSS compressé | `≤ 50 Ko` |
| Image LCP | idéalement `≤ 400 Ko` |
| Ensemble des polices | idéalement `≤ 200 Ko` |
| Ressources critiques premier écran | idéalement `≤ 1 Mo` |
Un budget est un garde-fou, pas une cible à remplir. Tout dépassement doit être mesuré, justifié, comparé et signalé. Ne pas retirer l’outil de mesure pour masquer un dépassement.
## 9. Établir une baseline reproductible
Mesurer sur :
- build Production ;
- même commit ;
- même navigateur ;
- même viewport ;
- même profil réseau ;
- même limitation CPU ;
- cache froid puis chaud ;
- plusieurs exécutions. Relever selon le besoin :
- LCP ;
- INP ou proxy laboratoire approprié ;
- CLS ;
- TBT ;
- FCP ;
- poids transféré ;
- JavaScript ;
- CSS ;
- requêtes ;
- tâches longues ;
- layout shifts ;
- élément LCP ;
- bundle. Conserver la médiane ou une série représentative, pas le meilleur résultat. Noter les erreurs préexistantes.
## 10. Choisir les outils adaptés
Utiliser selon disponibilité :
- Lighthouse ;
- Chrome DevTools Performance ;
- Network ;
- Coverage ;
- Performance Insights ;
- analyseur de bundle Next.js ;
- rapport de build ;
- WebPageTest si explicitement disponible ;
- données terrain validées. Lire les scripts avant de les exécuter. Ne pas installer un analyseur sans audit et justification. Ne pas utiliser le serveur Development pour conclure sur le bundle Production.
## 11. Identifier la cause dominante
Classer les coûts :
- réseau ;
- serveur ;
- rendu ;
- JavaScript ;
- image ;
- police ;
- style ;
- animation ;
- script tiers ;
- cache ;
- interaction. Prioriser la cause dont l’impact est :
- prouvé ;
- significatif ;
- reproductible ;
- corrigeable sans régression. Ne pas optimiser plusieurs axes à la fois si cela empêche d’attribuer le gain. Une micro-optimisation ne doit pas détourner d’une image LCP trop lourde.
## 12. Diagnostiquer le LCP
Identifier l’élément LCP réel à chaque viewport. Pour une image Hero :
- utiliser `next/image` ;
- fournir dimensions ou ratio stable ;
- définir `sizes` fidèlement ;
- choisir une source adaptée ;
- compresser ;
- utiliser `priority` uniquement pour l’image réellement prioritaire ;
- afficher sans attendre l’hydratation ;
- éviter une animation d’entrée longue. Pour un LCP texte :
- vérifier polices ;
- CSS critique ;
- rendu serveur ;
- ressource bloquante. Ne pas lazy-loader l’élément LCP. Ne pas prioriser plusieurs images sans raison mesurée.
## 13. Diagnostiquer l’INP
Observer les interactions :
- menu mobile ;
- CTA WhatsApp ;
- filtres galerie ;
- lightbox ;
- FAQ ;
- navigation interne. Rechercher :
- tâche longue ;
- calcul synchrone ;
- cascade d’effets ;
- rerender étendu ;
- gestionnaire trop lourd ;
- plusieurs mises à jour évitables ;
- listener global ;
- animation bloquante ;
- hydratation excessive. Mesurer la tâche avant de réécrire. Préférer état local, handler court, DOM natif et frontière cliente minimale. Ne pas différer une action critique au point de la rendre incertaine.
## 14. Diagnostiquer le CLS
Chercher :
- image sans dimensions ;
- ratio absent ;
- police tardive ;
- fallback incompatible ;
- contenu injecté au-dessus ;
- composant après montage ;
- bouton changeant de taille ;
- animation de layout ;
- hauteur dynamique non réservée. Réserver l’espace avant chargement. Préférer `transform` et `opacity`. Vérifier mobile et desktop. Ne pas masquer un shift avec une hauteur arbitraire qui coupe le contenu.
## 15. Optimiser les images
Pour chaque image, vérifier :
- rôle ;
- format ;
- dimensions sources ;
- dimensions rendues ;
- ratio ;
- poids ;
- compression ;
- `sizes` ;
- priorité ;
- lazy loading ;
- qualité ;
- alt ;
- statut de publication. Préférer WebP ou AVIF pour les photos. Éviter PNG pour une grande image opaque. Charger les vignettes de galerie avant les versions haute résolution. Ne pas charger toutes les images haute définition au démarrage. Ne pas désactiver globalement l’optimisation Next.js.
## 16. Optimiser les polices
Utiliser `next/font`. Polices validées :
- Cormorant Garamond pour les titres ;
- Manrope pour le texte ;
- Allura comme accent limité. Réduire :
- familles ;
- graisses ;
- styles ;
- sous-ensembles ;
- préchargements inutiles. Choisir des fallbacks proches des métriques. Ne pas importer les polices par CSS distant. Ne pas sacrifier l’identité typographique sans mesure et validation design.
## 17. Réduire le JavaScript client
Pour chaque `"use client"` :
1. identifier le besoin navigateur ;
2. isoler la plus petite frontière ;
3. conserver le contenu statique côté serveur ;
4. transmettre des props sérialisables ;
5. retirer effets et états dérivables ;
6. mesurer le bundle. Ne pas rendre toute la page cliente pour menu, FAQ, galerie ou animation. Ne pas charger côté client un contenu connu au build. Ne pas introduire un store global pour des interactions locales.
## 18. Optimiser React
Rechercher :
- state dérivable ;
- states synchronisés ;
- effet de calcul ;
- listener non nettoyé ;
- cascade de setters ;
- contexte trop large ;
- composant recréé ;
- liste recalculée inutilement ;
- rerender global. Préférer :
- calcul direct ;
- composition ;
- état local ;
- Server Component ;
- CSS ;
- handler ciblé. Utiliser memo, `useMemo` ou `useCallback` seulement après mesure. Ne pas ajouter de complexité pour une économie théorique.
## 19. Analyser le bundle
Analyser lorsqu’un changement :
- ajoute une dépendance ;
- élargit une frontière cliente ;
- augmente le JavaScript ;
- introduit galerie, carrousel ou éditeur ;
- crée une régression inexpliquée. Identifier :
- gros modules ;
- duplication ;
- import global accidentel ;
- code client évitable ;
- module chargé sur `/` sans nécessité ;
- dépendance transitive. Mesurer le build Production. Comparer avant et après avec le même outil.
## 20. Évaluer les dépendances
Avant ajout :
- besoin réel ;
- alternative navigateur ou Next.js ;
- package déjà présent ;
- poids direct et transitif ;
- maintenance ;
- sécurité ;
- licence ;
- impact client ;
- import ciblé. Ne pas ajouter une bibliothèque pour :
- icône Lucide existante ;
- transition CSS ;
- métadonnée native ;
- lightbox simple ;
- carrousel décoratif ;
- transformation d’image couverte. Tout outil, plugin ou skill externe doit être audité avant installation. RTK reste un candidat à auditer, jamais une intégration implicite.
## 21. Optimiser CSS et Tailwind
Vérifier :
- classes statiquement détectables ;
- feuille globale légère ;
- tokens centralisés ;
- styles inutilisés ;
- duplication ;
- filtres ;
- ombres ;
- flous ;
- calques ;
- repaint continu. Préférer `transform` et `opacity`. Ne pas construire des classes Tailwind par concaténation dynamique. Ne pas déplacer des styles locaux vers le global pour réduire artificiellement
un diff. Ne pas dégrader contraste, focus ou responsive.
## 22. Optimiser les animations
Chaque animation doit justifier :
- compréhension ;
- orientation ;
- hiérarchie ;
- retour d’état. Utiliser Framer Motion avec retenue. Évaluer `LazyMotion` seulement si la mesure démontre un bénéfice. Éviter :
- animation de chaque élément ;
- parallaxe lourde ;
- contenu principal retardé ;
- propriété déclenchant layout ;
- boucle continue ;
- animation indispensable à l’information. Respecter `prefers-reduced-motion`. La version sans mouvement doit rester complète.
## 23. Optimiser galerie et lightbox
Conserver le HTML initial utile. Utiliser :
- vignettes ;
- dimensions stables ;
- lazy loading sous la ligne de flottaison ;
- image haute résolution au moment utile ;
- état local ;
- listeners nettoyés ;
- interaction clavier. Ne pas :
- rendre toute la galerie cliente ;
- précharger toutes les images ;
- utiliser une maçonnerie JavaScript lourde ;
- recalculer sur chaque mouvement de pointeur ;
- charger une lightbox lourde avant usage. Un import dynamique doit avoir fallback stable et bénéfice mesuré.
## 24. Utiliser le lazy loading avec discernement
Différer :
- images sous la ligne de flottaison ;
- contenu haute résolution ;
- lightbox lourde ;
- fonctionnalité non initiale ;
- script tiers approuvé. Ne pas différer :
- titre principal ;
- image LCP ;
- navigation ;
- CTA WhatsApp ;
- styles critiques ;
- contenu immédiatement visible. Vérifier :
- espace réservé ;
- retour de chargement ;
- absence de saut ;
- interaction disponible ;
- effet réseau réel. Trop de petits chunks peuvent augmenter latence et complexité.
## 25. Refuser les scripts tiers implicites
Aucun script tiers par défaut :
- analytics ;
- pixel ;
- heatmap ;
- session replay ;
- chat ;
- widget social ;
- carte ;
- lecteur vidéo ;
- tag manager. Avant intégration, évaluer :
- valeur produit ;
- vie privée ;
- consentement ;
- poids ;
- exécution ;
- dépendance réseau ;
- alternative légère ;
- stratégie de chargement. Ne pas sacrifier le rendu initial ou le CTA à un service externe.
## 26. Préserver le rendu statique
Le contenu PRIMiE est principalement stable. Préférer :
- Server Components ;
- génération statique native ;
- métadonnées serveur ;
- assets versionnés ;
- cache plateforme standard. Ne pas :
- récupérer côté client un contenu local ;
- forcer un rendu dynamique ;
- désactiver le cache globalement ;
- créer une API pour des données statiques ;
- faire une requête par section. Toute invalidation future doit répondre à un besoin produit confirmé.
## 27. Implémenter par hypothèse
Pour chaque optimisation :
```text
Problème mesuré :
Cause supposée :
Modification minimale :
Métrique attendue :
Risque :
Résultat avant :
Résultat après :
Conclusion :
```
Modifier un axe à la fois. Conserver un diff réversible. Retirer l’optimisation si elle ne produit aucun gain significatif ou crée une
régression. Ne pas conserver une complexité « au cas où ».
## 28. Préserver l’accessibilité
Après optimisation, vérifier :
- clavier ;
- focus ;
- cibles tactiles ;
- sémantique ;
- contraste ;
- zoom ;
- contenu sans JavaScript ;
- mouvement réduit ;
- alt ;
- ordre DOM. Ne pas retirer un libellé, un focus ou un fallback pour alléger le DOM. Ne pas lazy-loader une information nécessaire à un lecteur d’écran sans gestion
appropriée. La performance et l’accessibilité se renforcent, elles ne se compensent pas.
## 29. Préserver le design
Conserver :
- identité noire, dorée, beige et crème ;
- photographie centrale ;
- hiérarchie ;
- typographies validées ;
- rythme ;
- cadrage ;
- sensation premium. Collaborer avec `ux-ui` si une optimisation impose un compromis visible. Comparer avant et après aux viewports `320`, `390`, `768` et `1440 px`. Ne pas réduire arbitrairement qualité, animation ou image sans démontrer le
bénéfice et valider le compromis.
## 30. Préserver le travail existant
Toute modification inconnue appartient à l’utilisatrice. Ne jamais :
- restaurer ;
- écraser ;
- nettoyer ;
- reformater hors périmètre ;
- supprimer un fichier inconnu ;
- retirer un lockfile ;
- utiliser `--force` ;
- modifier Production ;
- indexer ou publier sans demande. Si une optimisation chevauche un travail incompatible, arrêter et demander une
décision.
## 31. Valider après modification
Dans des conditions identiques à la baseline :
1. build Production ;
2. mesure répétée ;
3. comparaison des métriques ;
4. analyse du bundle si concerné ;
5. test du Hero ;
6. test menu mobile ;
7. galerie et lightbox ;
8. CTA WhatsApp ;
9. responsive ;
10. mouvement réduit ;
11. console et réseau ;
12. typecheck, lint et tests. Utiliser uniquement les scripts présents. Signaler les mesures non réalisables. Ne pas choisir uniquement l’exécution la plus favorable.
## 32. Interpréter le résultat
Conclure :
- gain confirmé ;
- gain probable mais données insuffisantes ;
- neutre ;
- régression ;
- mesure non comparable. Un score Lighthouse global ne suffit pas. Relier la conclusion aux métriques et au parcours. Documenter tout budget dépassé. Revenir sur une optimisation qui dégrade conversion, accessibilité ou stabilité.
## 33. Conditions d’arrêt
Arrêter et demander une décision si :
- baseline impossible ;
- conditions non comparables ;
- cause non isolée ;
- bénéfice non mesurable ;
- design visible doit changer ;
- dépendance importante requise ;
- télémétrie ou script tiers nécessaire ;
- Production ou consentement affecté ;
- secret ou accès manque ;
- travail inconnu chevauché ;
- optimisation impose une extension de périmètre. Ne pas optimiser uniquement pour atteindre un score arbitraire.
## 34. Definition of Done
L’optimisation est terminée lorsque :
- problème et baseline documentés ;
- cause dominante identifiée ;
- changement minimal ;
- comparaison avant et après ;
- gain ou absence de gain honnêtement conclue ;
- budgets respectés ou écarts justifiés ;
- Server Components préservés ;
- images et polices maîtrisées ;
- interactions réactives ;
- CLS non dégradé ;
- accessibilité et design préservés ;
- parcours critiques vérifiés ;
- contrôles pertinents réussis ;
- limites explicites.
« Cela semble plus rapide » n’est pas une Definition of Done.
## 35. Compte rendu
Terminer par :
- problème ;
- environnement de mesure ;
- baseline ;
- cause ;
- modification ;
- métriques avant/après ;
- budgets ;
- fichiers modifiés ;
- contrôles exécutés ;
- QA manuelle ;
- régressions vérifiées ;
- éléments non vérifiés ;
- décision finale. Distinguer données **laboratoire**, **terrain**, **mesurées** et **estimées**. Ne jamais inventer une métrique ou masquer un résultat défavorable.
