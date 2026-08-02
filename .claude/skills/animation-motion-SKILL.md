---
name: animation-motion
description: Concevoir, implémenter, auditer, corriger ou optimiser les animations et mouvements de PRiMiE avec CSS, Tailwind CSS et Framer Motion. Utiliser cette skill pour micro-interactions, transitions d’état, révélations au scroll, chorégraphies, menu mobile, FAQ, galerie, filtres, lightbox, hover, focus, reduced motion, performances, stabilité visuelle, Client Components, tests et régressions liées au mouvement.
---
# Animation & Motion PRiMiE
Créer un mouvement discret, premium, accessible et performant qui soutient la
lecture sans retarder le parcours WhatsApp. La page doit rester complète,
compréhensible et utilisable lorsque toute animation est supprimée.

## 1. Charger le contexte
Avant toute action :
1. lire `CLAUDE.md` ;
2. lire `04-design-system.mdc`, `05-ui-components.mdc`,
   `09-accessibility.mdc`, `11-performance.mdc`, `13-testing-qa.mdc` et
   `do-not-break.mdc` ;
3. inspecter `package.json` et la version réellement installée de Framer Motion ;
4. localiser le composant, ses états, ses parents et sa frontière cliente ;
5. rechercher les animations, variants, transitions et hooks existants ;
6. vérifier le comportement sans JavaScript et avec mouvement réduit ;
7. préserver le travail local inconnu.
Utiliser `rg --files` et `rg` avant d’ajouter un nouveau pattern. Ne pas supposer
qu’un exemple trouvé dans une documentation correspond à la version installée.

## 2. Respecter le mode demandé
Distinguer :
- **conception** : définir l’intention, les états et la chronologie sans coder ;
- **implémentation** : ajouter un mouvement validé ;
- **correction** : résoudre un défaut sans refonte ;
- **audit** : relever les risques sans modifier ;
- **optimisation** : mesurer avant et après ;
- **suppression** : retirer un effet inutile sans casser la composition ;
- **test** : produire une preuve stable et reproductible.
Une demande d’animation n’autorise pas une refonte, une dépendance, un changement
de contenu, un déploiement ou la conversion de toute la page en Client Component.

## 3. Protéger le produit
Préserver :

```text
Marque : Chez PRiMiE Coiffure
Graphie courte : PRiMiE
Porteuse : Prisca
Téléphone : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
La conversion principale reste l’ouverture d’une conversation WhatsApp. Ne
jamais retarder, masquer, déplacer ou désactiver le CTA pour produire un effet.
Conserver l’ordre officiel :
1. Header ;
2. Hero ;
3. Services ;
4. Galerie — Nos réalisations ;
5. Pourquoi me choisir ? ;
6. FAQ ;
7. Réserver ;
8. Contact ;
9. Footer.
« Avis clientes » : hors V1 (`TESTIMONIALS-CONTENT-01` = `CANCELLED`). Ne pas
créer de scaffolding Testimonials.

## 4. Fixer l’intention
Une animation doit remplir au moins une fonction :
- confirmer une action ;
- expliquer un changement d’état ;
- maintenir la continuité spatiale ;
- guider le regard ;
- révéler une hiérarchie ;
- faciliter la compréhension d’une ouverture ou fermeture.
Refuser une animation dont la seule justification est « faire moderne »,
« faire premium » ou « remplir le vide ».
Pour chaque effet, pouvoir répondre :

```text
Déclencheur → changement → durée → interruption → version réduite
```

## 5. Appliquer la retenue PRiMiE
Le mouvement doit rester :
- chaud et élégant ;
- doux mais réactif ;
- rare ;
- cohérent entre sections ;
- subordonné aux images et au contenu ;
- invisible lorsqu’il n’apporte rien.
Éviter esthétique de template IA, entrées spectaculaires, overshoot cartoon,
glow animé, métal liquide, cascade infinie et animations différentes pour
chaque carte.

## 6. Choisir le bon outil
Utiliser CSS ou Tailwind pour :
- hover ;
- focus ;
- active ;
- changement simple d’opacité ;
- couleur, bordure ou ombre ;
- petite transformation indépendante ;
- transition sans coordination complexe.
Utiliser Framer Motion seulement pour :
- présence et sortie coordonnées ;
- transition entre plusieurs états ;
- chorégraphie courte ;
- geste réellement utile ;
- animation pilotée par une valeur React ;
- partage de layout justifié et mesuré.
Utiliser aucune animation si le changement est déjà évident ou si l’effet
fragilise accessibilité, performance ou stabilité.

## 7. Définir les durées
Respecter les références :

| Famille | Durée |
| --- | --- |
| Micro-interaction | `160–220ms` |
| Transition de composant | `240–360ms` |
| Révélation de section | `450–650ms` |
Règles :
- préférer la borne courte pour une action répétée ;
- réserver la borne longue à une révélation éditoriale ponctuelle ;
- réduire la durée sur petit écran si l’effet ralentit la lecture ;
- éviter une durée différente pour chaque composant ;
- ne jamais ralentir une fermeture critique.
Une animation interactive doit répondre immédiatement au geste, même si sa
résolution visuelle continue ensuite.

## 8. Définir les déplacements
Préférer :
- opacité ;
- translation de `8–24px` ;
- échelle très légère, proche de `0.98–1` ;
- rotation uniquement si elle clarifie un état ;
- changement d’ombre modéré.
Éviter :
- translation couvrant une grande partie du viewport ;
- zoom agressif ;
- rotation décorative ;
- perspective 3D ;
- blur animé important ;
- animation de `width`, `height`, `top` ou `left` sans nécessité.
Préférer `transform` et `opacity` afin de ne pas modifier le flux.

## 9. Gouverner les courbes
Utiliser peu de courbes et les nommer par intention :
- entrée douce ;
- sortie rapide ;
- transition standard ;
- accent exceptionnel.
Ne pas choisir une courbe différente à chaque implémentation. Éviter les ressorts
rebondissants pour les contenus éditoriaux. Si un spring est pertinent,
contrôler son dépassement, sa vitesse de stabilisation et son comportement avec
les interactions répétées.
Les easings CSS et Framer Motion représentant la même intention doivent rester
visuellement compatibles.

## 10. Centraliser les tokens de mouvement
Créer des tokens seulement si plusieurs usages réels existent :

```ts
export const motionDuration = {
  fast: 0.18,
  standard: 0.3,
  reveal: 0.55,
} as const;
export const motionDistance = {
  subtle: 8,
  standard: 16,
  emphasized: 24,
} as const;
```
Adapter le format au projet. Ne pas dupliquer ces valeurs si des tokens
équivalents existent. Éviter un fichier global pour deux transitions locales.

## 11. Concevoir les états avant les keyframes
Définir d’abord :
- état initial ;
- état visible ;
- état actif ;
- état de sortie ;
- état interrompu ;
- état reduced motion.
Le DOM, le focus et l’information ne doivent pas dépendre d’un état visuel
temporaire. Ne jamais laisser `opacity: 0` durablement si l’observateur,
l’hydratation ou la librairie échoue.

## 12. Révéler les sections avec mesure
Pour une révélation éditoriale :
- animer le groupe, pas chaque mot ;
- utiliser opacité et faible translation ;
- déclencher une seule fois sauf besoin démontré ;
- afficher immédiatement le contenu déjà visible au chargement ;
- ne pas retarder le LCP ;
- ne pas animer toutes les sections de façon identique.
Limiter le stagger aux groupes courts. Une cascade de cartes ne doit pas obliger
l’utilisatrice à attendre la dernière carte.
Ne pas masquer du contenu SEO ou accessible en attendant l’intersection.

## 13. Gérer le Hero
Le Hero doit afficher rapidement :
- la proposition de valeur ;
- la photographie principale ;
- le CTA WhatsApp.
Éviter une animation d’entrée sur le LCP. Si un mouvement est conservé :
- rendre texte et CTA disponibles dès le premier rendu ;
- limiter l’effet aux accents secondaires ;
- réserver les dimensions des médias ;
- ne pas animer un overlay au détriment du contraste ;
- vérifier connexion mobile et appareil courant.

## 14. Gérer le Header et le menu mobile
Le Header peut utiliser une transition courte pour :
- changement de fond ;
- ombre au scroll si réellement utile ;
- ouverture du menu ;
- rotation ou substitution d’icône.
Pour le menu mobile :
- conserver un bouton immédiatement opérable ;
- gérer `aria-expanded` et le nom accessible ;
- déplacer le focus seulement selon le pattern choisi ;
- restaurer focus et scroll à la fermeture ;
- permettre une fermeture immédiate ;
- ne pas faire dépendre la navigation de la fin de transition.
Éviter un listener scroll permanent si CSS ou Intersection Observer suffit.

## 15. Gérer FAQ et accordéons
L’ouverture doit expliquer la relation entre question et réponse sans masquer
l’information aux technologies d’assistance.
Préserver :
- état `aria-expanded` ;
- relation avec le panneau ;
- clavier ;
- focus ;
- contenu accessible pendant la transition ;
- fonctionnement sans animation.
Éviter une mesure permanente de hauteur. Ne pas imposer une animation de hauteur
coûteuse si la primitive Radix ou une transition plus simple répond au besoin.

## 16. Gérer galerie et filtres
Les filtres doivent rester instantanés et compréhensibles. Une transition ne
doit pas :
- retarder le nouveau résultat ;
- déplacer brutalement le focus ;
- masquer le nombre ou l’état actif ;
- animer une grande grille en layout continu ;
- charger toutes les images haute définition ;
- provoquer un CLS.
Éviter une masonry JavaScript et les animations de layout sur une grande
galerie. Réserver l’espace des images et utiliser des identifiants stables.

## 17. Gérer la lightbox
Une lightbox peut animer :
- overlay ;
- apparition du dialog ;
- changement de média ;
- fermeture.
Préserver :
- rôle dialog et nom accessible ;
- focus initial et retour du focus ;
- fermeture par `Escape` ;
- verrouillage du scroll sans casse ;
- image dimensionnée ;
- bouton fermer utilisable immédiatement ;
- sortie courte.
Ne pas attendre la fin d’une animation pour restaurer la navigation.

## 18. Gérer hover, focus et toucher
Hover ne doit jamais porter une information exclusive. Tester :
- souris ;
- clavier ;
- tactile ;
- dispositif sans hover ;
- zoom `200 %`.
Le focus visible ne doit pas être retardé ou remplacé par un simple mouvement.
Les cibles tactiles restent au moins `44 × 44px`. Ne pas réduire une cible
pendant l’état active au point de déplacer le doigt hors de la zone.

## 19. Respecter le mouvement réduit
Appliquer WCAG 2.2 AA et détecter `prefers-reduced-motion` avec le mécanisme
adapté à l’outil utilisé.
Lorsque la réduction est demandée :
- supprimer les révélations non essentielles ;
- supprimer ou réduire fortement les translations ;
- éviter parallaxe et zoom ;
- désactiver le scroll animé si nécessaire ;
- garder les transitions indispensables très courtes ;
- préserver le contenu et tous les états ;
- permettre l’action sans délai.
Reduced motion n’est pas une opacité permanente ni une interface sans feedback.
Conserver les changements visuels nécessaires à la compréhension.

## 20. Éviter les risques vestibulaires
Ne pas utiliser :
- parallaxe lourde ;
- mouvement lié en continu au scroll ;
- zoom plein écran ;
- arrière-plan en déplacement permanent ;
- rotation importante ;
- scroll hijacking ;
- curseur personnalisé ;
- autoplay intrusif.
Éviter clignotement et flash. Toute animation longue ou répétée doit pouvoir être
arrêtée si elle dépasse le cadre d’une transition brève.

## 21. Préserver les Server Components
L’animation appartient au plus petit composant client capable de la porter.
Ne pas ajouter `"use client"` :
- dans `app/page.tsx` ;
- sur une section statique ;
- pour un simple hover CSS ;
- par propagation depuis un enfant ;
- pour accéder à une constante ;
- pour observer un élément sans bénéfice réel.
Passer des données sérialisables à un îlot client ciblé. Le contenu métier et la
structure de page restent côté serveur par défaut.

## 22. Utiliser Framer Motion avec retenue
Avant d’importer Framer Motion :
1. confirmer sa présence dans `package.json` ;
2. vérifier l’API de la version installée ;
3. confirmer que CSS ne suffit pas ;
4. isoler la frontière cliente ;
5. prévoir reduced motion ;
6. estimer le coût dans le bundle.
Évaluer `LazyMotion` seulement si une mesure montre un gain pertinent. Ne pas
ajouter une couche d’abstraction autour de Framer Motion sans plusieurs usages.

## 23. Limiter les animations simultanées
Sur un viewport, privilégier un point de mouvement principal. Éviter :
- Hero animé pendant le chargement ;
- cartes en stagger pendant un scroll ;
- fond en parallaxe ;
- icônes en boucle ;
- CTA pulsant simultanément.
Une page premium paraît calme. Le repos visuel fait partie du système de
mouvement.

## 24. Préserver Core Web Vitals
Respecter :

| Métrique | Objectif |
| --- | --- |
| LCP | `≤ 2,5 s` |
| INP | `≤ 200 ms` |
| CLS | `≤ 0,1` |
Pour le CLS :
- réserver les dimensions ;
- ne pas modifier le flux après hydratation ;
- préférer `transform` ;
- stabiliser polices, images et placeholders.
Pour l’INP :
- garder les handlers courts ;
- éviter les calculs pendant le geste ;
- limiter observers et listeners ;
- ne pas déclencher une cascade de rendus.

## 25. Auditer une animation lente
Mesurer avant de corriger :
1. reproduire sur mobile ;
2. enregistrer la trace ;
3. repérer tâche longue, layout, paint ou compositing ;
4. isoler le composant responsable ;
5. comparer CSS, transform et suppression ;
6. vérifier bundle et hydratation ;
7. mesurer après correction.
Ne pas ajouter `will-change` partout. L’utiliser seulement de façon ciblée et
temporaire lorsqu’une mesure démontre son utilité.

## 26. Prévenir les fuites
Nettoyer :
- listeners ;
- timers ;
- observers ;
- subscriptions ;
- verrouillage du scroll ;
- styles temporaires ;
- animations en cours lors du démontage si nécessaire.
Une ouverture et fermeture répétée du menu ou de la lightbox ne doit pas
accumuler des handlers ni laisser le `body` bloqué.

## 27. Tester le comportement
Vérifier :
- état initial ;
- déclenchement ;
- interruption ;
- clics rapides répétés ;
- ouverture et fermeture ;
- navigation clavier ;
- retour du focus ;
- montage et démontage ;
- contenu sans JavaScript si applicable ;
- reduced motion ;
- appareil tactile.
Un test doit valider l’état métier ou accessible, pas la valeur exacte de chaque
frame.

## 28. Stabiliser les captures visuelles
Pour les tests de régression :
- utiliser données et viewport fixes ;
- attendre polices et images ;
- désactiver ou figer les animations ;
- capturer Hero, galerie, menu ouvert et FAQ ouverte si concernés ;
- examiner le diff avant d’accepter une référence.
Ne pas mettre à jour automatiquement les captures après un échec.

## 29. Vérifier les viewports
Contrôler au minimum :

```text
320px
390px
768px
1440px
zoom 200 %
prefers-reduced-motion: reduce
```
Vérifier absence de débordement, contenu coupé, contrôle superposé, scroll
bloqué, focus perdu, image déformée et animation trop lente.

## 30. Exécuter les contrôles
Utiliser les commandes réellement disponibles :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Ajouter une mesure de bundle, une trace de performance ou un test visuel si le
risque le justifie. Ne pas installer un outil sans autorisation.

## 31. Définition de terminé
Une animation est terminée lorsque :
- son intention est explicite ;
- CSS ou Framer Motion est choisi avec justification ;
- le contenu reste disponible sans mouvement ;
- reduced motion est fonctionnel ;
- le CTA n’est jamais retardé ;
- focus, clavier et toucher sont préservés ;
- LCP, INP et CLS ne régressent pas ;
- la frontière cliente est minimale ;
- les viewports de référence sont vérifiés ;
- les tests pertinents passent ;
- aucune boucle ou ressource n’est laissée active.

## 32. Interdictions absolues
Ne jamais :
- retarder le CTA WhatsApp ;
- cacher durablement un contenu en attente d’animation ;
- rendre toute la page cliente ;
- animer chaque carte séparément ;
- imposer parallaxe lourde ou scroll hijacking ;
- ajouter un curseur personnalisé ;
- animer `width`, `height`, `top` ou `left` sans nécessité ;
- créer un layout shift pour un effet ;
- utiliser hover comme seul accès à une information ;
- supprimer le focus visible ;
- ignorer `prefers-reduced-motion` ;
- laisser une animation en boucle sans contrôle ;
- charger Framer Motion pour un simple hover ;
- multiplier observers et listeners globaux ;
- ajouter une dépendance sans validation ;
- déployer sans autorisation.
Dans le compte rendu, séparer intention, composants touchés, outil choisi,
reduced motion, performances, viewports, tests et éléments non vérifiés.
