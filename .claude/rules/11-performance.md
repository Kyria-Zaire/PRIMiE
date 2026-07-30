---
paths:
  - "app/**/*.{ts,tsx,css}"
  - "components/**/*.tsx"
  - "public/**/*"
  - "next.config.ts"
  - "package.json"
---

# Performance

## 1. Rôle de cette règle
Cette règle définit les exigences de performance du site PRIMiE.
Elle s’applique à toute modification pouvant influencer :
- le temps d’affichage initial ;
- la réactivité des interactions ;
- la stabilité visuelle ;
- le poids JavaScript et CSS ;
- le chargement des images et des polices ;
- les animations ;
- les dépendances ;
- les scripts tiers.
La landing page doit rester rapide sur un téléphone courant et une connexion
mobile réaliste.
La performance soutient directement :
- la découverte des prestations ;
- la consultation de la galerie ;
- l’accès au bouton WhatsApp ;
- l’accessibilité ;
- le référencement ;
- la qualité perçue de la marque.
Une amélioration visuelle ne justifie pas, à elle seule, une régression
mesurable.
---

## 2. Core Web Vitals
Les objectifs de référence sont :
- LCP inférieur ou égal à `2,5 s` ;
- INP inférieur ou égal à `200 ms` ;
- CLS inférieur ou égal à `0,1`.
Ces seuils doivent être évalués :
- au 75e percentile ;
- séparément sur mobile et ordinateur ;
- en priorité avec des données terrain lorsqu’elles sont disponibles.
Définitions :
- LCP mesure la vitesse d’affichage du contenu principal ;
- INP mesure la réactivité globale aux interactions ;
- CLS mesure les déplacements visuels inattendus.
Les résultats de laboratoire aident au diagnostic.
Ils ne remplacent pas les données réelles d’utilisation.
Dans Lighthouse, le Total Blocking Time peut aider à anticiper les problèmes
d’interactivité, mais il ne remplace pas directement l’INP terrain.
---

## 3. Budgets internes
Les budgets suivants servent de garde-fous pour la V1 :
| Ressource | Budget cible |
|---|---:|
| JavaScript initial compressé | `≤ 150 Ko` |
| JavaScript total d’une route compressé | `≤ 220 Ko` |
| CSS compressé | `≤ 50 Ko` |
| Image LCP | idéalement `≤ 400 Ko` |
| Ensemble des polices | idéalement `≤ 200 Ko` |
| Ressources critiques du premier écran | idéalement `≤ 1 Mo` |
Ces budgets ne sont pas une autorisation de les atteindre sans nécessité.
Le poids le plus faible compatible avec le besoin reste préférable.
Tout dépassement doit être :
1. identifié ;
2. mesuré ;
3. justifié par une valeur utilisateur réelle ;
4. comparé à une alternative plus légère ;
5. signalé dans le compte rendu.
Ne jamais masquer un dépassement en supprimant la mesure.
---

## 4. Server Components par défaut
Dans l’App Router, tout composant est un Server Component par défaut.
Conserver ce comportement dès que possible.
`"use client"` est réservé aux composants qui ont réellement besoin :
- d’un état React interactif ;
- d’un gestionnaire d’événement ;
- d’un effet navigateur ;
- d’une API exclusivement disponible côté client ;
- d’une bibliothèque nécessitant le navigateur.
Ne pas ajouter `"use client"` :
- à une page entière par facilité ;
- à une section statique ;
- pour lire une constante ;
- pour transmettre des props ;
- pour appliquer une animation CSS ;
- pour afficher une image ou du texte.
Placer la frontière client au niveau le plus bas possible.
Un petit composant interactif ne doit pas convertir toute sa section en
JavaScript client.
---

## 5. JavaScript client
Le JavaScript client est réservé aux interactions utiles, notamment :
- l’ouverture du menu mobile ;
- le filtrage local de la galerie ;
- l’ouverture et la fermeture de la lightbox ;
- un accordéon si le contenu l’exige ;
- une animation Framer Motion validée.
Éviter :
- l’état global pour des interactions locales ;
- les effets utilisés pour dériver une valeur calculable au rendu ;
- les écouteurs globaux non nettoyés ;
- les rerenders d’une page complète ;
- l’hydratation de contenu purement décoratif ;
- le chargement de données statiques depuis le client.
Préférer :
- des données résolues côté serveur ;
- des composants clients petits et isolés ;
- des états locaux ;
- du HTML natif ;
- du CSS pour les comportements simples.
---

## 6. Dépendances
Toute nouvelle dépendance doit être évaluée avant installation.
Vérifier :
- si le besoin existe réellement ;
- si React, Next.js ou le navigateur le couvre déjà ;
- le poids ajouté au bundle ;
- la possibilité d’un import ciblé ;
- la maintenance du paquet ;
- son impact côté client ;
- l’existence d’une dépendance équivalente déjà installée.
Ne pas ajouter une bibliothèque supplémentaire pour :
- un simple carrousel ;
- une lightbox basique ;
- le redimensionnement d’images ;
- les métadonnées SEO natives de Next.js ;
- une icône déjà disponible dans Lucide ;
- une classe utilitaire déjà couverte par Tailwind.
Éviter les bibliothèques redondantes.
Importer uniquement les modules nécessaires.
Ne pas importer une bibliothèque complète lorsqu’un import ciblé est possible.
---

## 7. Analyse du bundle
Analyser le bundle lorsqu’une modification :
- ajoute une dépendance importante ;
- étend fortement un composant client ;
- augmente le JavaScript initial ;
- introduit un éditeur, un carrousel ou une galerie complexe ;
- provoque une régression inexpliquée.
L’analyse doit permettre d’identifier :
- les plus gros modules ;
- les dépendances dupliquées ;
- les modules chargés sur la route initiale ;
- le code client évitable ;
- les imports accidentellement globaux.
Une dépendance légère sur le papier peut devenir coûteuse avec ses dépendances
transitives.
Mesurer le résultat de production, pas seulement le serveur de développement.
---

## 8. Élément LCP
Identifier explicitement l’élément LCP probable du premier écran.
Il s’agit généralement :
- de l’image principale du hero ;
- ou d’un bloc de texte important si aucune grande image n’est utilisée.
Pour une image LCP :
- utiliser `next/image` ;
- fournir des dimensions ou un conteneur stable ;
- définir un attribut `sizes` fidèle au rendu ;
- utiliser `priority` uniquement si l’image est réellement prioritaire ;
- choisir une source correctement dimensionnée ;
- compresser le fichier ;
- tester le rendu mobile.
Ne jamais :
- charger l’image LCP en lazy loading ;
- la masquer derrière une animation d’entrée longue ;
- attendre l’hydratation pour l’afficher ;
- utiliser un fichier beaucoup plus grand que sa taille rendue ;
- mettre plusieurs images en priorité sans justification.
Le titre principal et le CTA WhatsApp doivent également rester immédiatement
accessibles.
---

## 9. Images
Utiliser `next/image` pour les images de contenu lorsque c’est pertinent.
Appliquer les règles suivantes :
- préférer WebP ou AVIF pour les photographies ;
- compresser les sources avant intégration ;
- conserver un ratio cohérent ;
- définir `sizes` selon les breakpoints réels ;
- charger paresseusement les images sous la ligne de flottaison ;
- fournir un texte alternatif conforme à la règle d’accessibilité ;
- ne pas désactiver globalement l’optimisation d’image.
Éviter :
- les photographies lourdes en PNG ;
- les images originales de plusieurs mégaoctets ;
- les dimensions implicites ;
- les arrière-plans CSS lourds pour le contenu principal ;
- le chargement initial de toutes les images de la galerie ;
- l’envoi de toutes les métadonnées d’image à un composant client.
La galerie doit d’abord charger des variantes adaptées aux vignettes.
La version haute résolution ne doit être chargée qu’au moment utile.
---

## 10. Stabilité visuelle
Réserver l’espace nécessaire avant le chargement des ressources.
Définir :
- les dimensions des images ;
- le ratio des cartes ;
- la hauteur minimale des zones dynamiques ;
- un fallback de police compatible ;
- un espace stable pour les boutons et icônes.
Éviter :
- l’insertion tardive d’un bandeau au-dessus du contenu ;
- les images sans dimensions ;
- les titres dont la métrique change brutalement ;
- les animations qui modifient la mise en page ;
- les composants rendus uniquement après montage sans espace réservé.
Les transitions doivent privilégier `transform` et `opacity`.
Ne pas animer les propriétés qui déclenchent fréquemment un recalcul de mise
en page.
---

## 11. Réactivité et INP
Les interactions principales doivent répondre sans délai perceptible :
- menu mobile ;
- bouton WhatsApp ;
- filtres de galerie ;
- lightbox ;
- navigation interne.
Les gestionnaires d’événements doivent rester courts.
Ne pas lancer au clic :
- un calcul lourd synchrone ;
- une transformation massive de données ;
- une boucle sur des éléments inutiles ;
- plusieurs mises à jour d’état successives évitables ;
- une animation bloquante.
Fractionner ou différer un travail coûteux si celui-ci devient nécessaire.
Éviter les cascades d’effets et les rerenders globaux.
Lorsqu’une interaction semble lente, mesurer la tâche longue avant de
réécrire au hasard.
---

## 12. Polices
Charger les polices avec `next/font`.
Pour l’identité PRIMiE :
- Cormorant Garamond peut servir aux titres ;
- Manrope peut servir au texte courant ;
- Allura doit rester limitée aux accents décoratifs.
Limiter :
- le nombre de familles ;
- le nombre de graisses ;
- les variantes inutilisées ;
- les caractères non nécessaires lorsque le sous-ensemble est configurable.
Éviter :
- les imports de polices via CSS distant ;
- le chargement de toutes les graisses disponibles ;
- l’usage d’une police décorative sur de longs paragraphes ;
- les changements de police provoquant un décalage visible.
Les fallbacks doivent rester proches des métriques finales.
---

## 13. CSS et Tailwind
Privilégier les classes Tailwind statiquement détectables.
Éviter la construction dynamique de noms de classes non détectables lors du
build.
Maintenir :
- une feuille globale légère ;
- des styles partagés cohérents ;
- des tokens centralisés ;
- des composants sans duplication excessive.
Limiter :
- les ombres très complexes ;
- les filtres lourds ;
- les flous étendus ;
- les calques semi-transparents superposés ;
- les effets qui entraînent des repaints continus.
Pour les animations, préférer :
- `transform` ;
- `opacity`.
Ne pas utiliser JavaScript lorsqu’une transition CSS simple suffit.
---

## 14. Framer Motion
Framer Motion doit rester ciblé et mesuré.
Il peut être utilisé pour :
- une révélation discrète ;
- la lightbox ;
- un changement d’état utile ;
- une transition courte renforçant la compréhension.
Il ne doit pas :
- envelopper toute la page sans besoin ;
- retarder l’affichage du contenu principal ;
- animer chaque élément au chargement ;
- empêcher l’usage sans JavaScript ;
- ignorer `prefers-reduced-motion`.
Évaluer `LazyMotion` uniquement si la mesure montre un bénéfice réel et si
l’intégration reste simple.
Respecter la préférence de réduction des mouvements.
La désactivation des animations ne doit supprimer aucune information.
---

## 15. Galerie et lightbox
La galerie doit rester performante même avec plusieurs visuels.
Exigences :
- utiliser des vignettes optimisées ;
- ne charger que les images nécessaires ;
- garder le filtrage local simple ;
- ne pas importer une bibliothèque lourde sans justification ;
- préserver les dimensions pour éviter le CLS ;
- fermer correctement la lightbox et libérer ses écouteurs.
Ne pas :
- précharger toutes les images haute résolution ;
- rendre toute la galerie côté client si seules les interactions le sont ;
- utiliser une maçonnerie JavaScript lourde ;
- recalculer toute la liste à chaque mouvement de pointeur ;
- charger la lightbox avant qu’elle soit utile sans raison mesurée.
Le HTML initial doit rester utile avant hydratation.
---

## 16. Lazy loading
Le chargement différé convient notamment :
- aux images sous la ligne de flottaison ;
- au contenu de la lightbox ;
- à une fonctionnalité lourde non initiale ;
- à un script tiers explicitement approuvé.
Ne pas différer :
- l’image LCP ;
- le titre principal ;
- le CTA WhatsApp ;
- la navigation essentielle ;
- les styles nécessaires au premier écran.
Le lazy loading ne doit pas créer :
- un saut de mise en page ;
- une zone vide incompréhensible ;
- une interaction inactive sans retour ;
- un retard sur un contenu immédiatement visible.
---

## 17. Imports dynamiques
Utiliser un import dynamique lorsqu’il réduit réellement le coût initial.
Cas possibles :
- une lightbox lourde ;
- un composant exclusivement ouvert sur action ;
- une fonctionnalité absente du premier écran.
Avant de l’ajouter :
1. mesurer le coût actuel ;
2. vérifier que le composant n’est pas immédiatement requis ;
3. prévoir un fallback stable ;
4. vérifier l’absence de décalage visuel ;
5. mesurer le nouveau résultat.
Ne pas multiplier les imports dynamiques sans bénéfice.
Trop de petits chargements peuvent augmenter la complexité et la latence.
---

## 18. Scripts tiers
Aucun script tiers n’est ajouté par défaut.
Cela inclut :
- chat en ligne ;
- pixel publicitaire ;
- heatmap ;
- enregistrement de session ;
- lecteur vidéo tiers ;
- widget social ;
- carte interactive ;
- gestionnaire de balises ;
- outil d’analyse.
Avant toute intégration, valider :
- le besoin produit ;
- l’impact sur la confidentialité ;
- le consentement requis ;
- le poids et le coût d’exécution ;
- la stratégie de chargement ;
- une alternative plus légère.
Un script tiers approuvé doit être chargé aussi tard que le permet son usage.
Ne pas sacrifier le CTA principal ou le rendu initial à un service externe.
---

## 19. Rendu, cache et contenu statique
La landing page PRIMiE contient principalement du contenu stable.
Préférer :
- le rendu serveur ou statique natif de Next.js ;
- les métadonnées définies côté serveur ;
- les assets publics versionnés par le build ;
- les mécanismes de cache standards de la plateforme.
Ne pas :
- récupérer côté client un contenu déjà connu au build ;
- forcer un rendu dynamique sans besoin ;
- désactiver le cache globalement ;
- ajouter une API pour servir des données locales statiques ;
- déclencher une requête réseau pour chaque section.
Toute invalidation ou stratégie dynamique future devra répondre à un besoin
produit explicite.
---

## 20. Mesures en laboratoire
Utiliser selon le besoin :
- Lighthouse ;
- Chrome DevTools Performance ;
- l’onglet Network ;
- l’onglet Coverage ;
- l’analyseur de bundle Next.js ;
- un profil mobile avec limitation réseau et processeur.
Effectuer les mesures :
- sur un build de production ;
- avec un cache froid puis un cache chaud ;
- sur une largeur mobile réaliste ;
- avec une limitation de réseau réaliste ;
- avec une limitation de processeur si pertinente ;
- au chargement et pendant les interactions.
Vérifier au minimum :
- le LCP ;
- le CLS ;
- les tâches longues ;
- le poids transféré ;
- le JavaScript inutilisé ;
- les requêtes bloquantes ;
- la galerie et la lightbox ;
- le menu mobile.
Une seule mesure isolée n’est pas suffisante pour conclure.
Comparer plusieurs exécutions dans des conditions identiques.
---

## 21. Données terrain
Lorsque le site dispose de suffisamment de trafic, consulter les données
terrain disponibles.
Analyser :
- mobile et ordinateur séparément ;
- le 75e percentile ;
- les périodes et volumes de données ;
- les pages ou groupes de pages concernés ;
- l’évolution après déploiement.
Search Console peut aider à repérer les groupes d’URL affectés par les Core
Web Vitals.
Ne pas installer un outil RUM personnalisé sans validation préalable :
- du besoin d’analyse ;
- de la confidentialité ;
- du consentement ;
- de l’impact performance ;
- de la gouvernance des données.
---

## 22. Contrôles avant livraison
Avant de considérer une modification comme terminée :
- lancer le build de production ;
- vérifier l’absence d’erreurs et d’avertissements pertinents ;
- contrôler le poids des bundles ;
- revoir les frontières `"use client"` ;
- identifier l’élément LCP ;
- tester le hero sur mobile ;
- vérifier les dimensions d’images ;
- vérifier les attributs `sizes` ;
- contrôler le chargement des polices ;
- rechercher les décalages de mise en page ;
- tester le menu mobile ;
- tester les filtres de galerie ;
- tester la lightbox ;
- tester le mode de réduction des mouvements ;
- contrôler les scripts tiers ;
- exécuter un audit Lighthouse mobile ;
- comparer les budgets internes.
Tout écart important doit être corrigé ou documenté.
---

## 23. Interdictions absolues
Il est interdit de :
- rendre toute la page cliente par commodité ;
- charger toutes les images haute résolution au démarrage ;
- ajouter une dépendance lourde sans mesure ;
- désactiver globalement l’optimisation d’image ;
- masquer l’élément LCP derrière une animation ;
- utiliser plusieurs polices et graisses sans contrôle ;
- charger un script tiers non approuvé ;
- ignorer `prefers-reduced-motion` ;
- introduire un CLS visible sans correction ;
- contourner un budget en retirant l’outil de mesure ;
- déclarer une optimisation sans comparaison avant/après.
---

## 24. Définition de terminé
Une modification est terminée lorsque :
- le build de production réussit ;
- la page reste majoritairement rendue côté serveur ;
- le JavaScript client est limité aux interactions utiles ;
- les budgets sont respectés ou les écarts sont documentés ;
- l’élément LCP est optimisé ;
- les images sont dimensionnées et compressées ;
- les polices sont chargées avec `next/font` ;
- aucune instabilité visuelle majeure n’est introduite ;
- les interactions principales restent réactives ;
- les animations respectent la réduction des mouvements ;
- aucun script tiers non validé n’est présent ;
- les contrôles mobile ont été réalisés.
---

## Références officielles
- Core Web Vitals : https://web.dev/articles/vitals
- Mesurer les Web Vitals : https://web.dev/articles/vitals-measurement-getting-started
- Checklist de production Next.js :
  https://nextjs.org/docs/app/guides/production-checklist
En cas d’incertitude, choisir l’implémentation la plus simple, la plus légère et la plus facile à mesurer.
