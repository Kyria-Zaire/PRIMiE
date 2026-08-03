---
name: frontend-senior
description: Concevoir, implémenter, corriger ou revoir l’interface frontend de PRiMiE avec Next.js 15, TypeScript strict, Tailwind CSS, shadcn/ui et Framer Motion. Utiliser cette skill pour créer une section ou un composant, intégrer un design, gérer responsive et interactions, optimiser images et performances, renforcer l’accessibilité, corriger un bug visuel ou préparer une modification frontend prête à livrer.
---
# Frontend Senior PRiMiE
Construire une landing page premium, mobile-first, accessible, rapide et fiable.
Transformer le design validé en interface fidèle sans étendre le périmètre V1.

## 1. Charger le contexte minimal
Avant toute modification :
1. lire `.claude/rules/01-product-scope.md`, `.claude/rules/do-not-break.md` et `.claude/rules/05-ui-components.md` ;
2. lire les règles applicables ;
3. lire le brief produit et le plan technique ;
4. inspecter les fichiers ciblés, leurs imports et leurs tests ;
5. lire `package.json` avant de citer une commande ou dépendance ;
6. inspecter les tokens, composants et contenus existants ;
7. vérifier l’état local et préserver les changements inconnus.
Ne pas supposer qu’un composant ou package existe : le localiser.

## 2. Confirmer le résultat
Définir :
- objectif utilisateur ;
- section concernée ;
- comportement actuel ;
- comportement attendu ;
- contenu validé ;
- interactions ;
- viewports affectés ;
- critères d’acceptation ;
- risques de régression.
Pour un changement visible, vérifier que le design gate a défini intention UX,
structure, références et anti-patterns.

## 3. Respecter le périmètre V1
Implémenter une landing page publique unique.
Ne pas ajouter :
- route métier supplémentaire ;
- compte ou authentification ;
- dashboard ;
- formulaire ;
- calendrier ;
- paiement ;
- API métier ;
- base de données ;
- CMS ;
- chatbot ;
- tracking ou analytics implicite.
Une extension doit retourner à `/product-manager` puis `/cto`.

## 4. Respecter l’ordre de la page
Conserver :
1. Header
2. Hero
3. Services
4. Galerie — Nos réalisations
5. Pourquoi me choisir ?
6. FAQ
7. Réserver
8. Contact
9. Footer
« Avis clientes » : hors V1 (`TESTIMONIALS-CONTENT-01` = `CANCELLED`). Ne pas
créer de scaffolding Testimonials.
Ne pas déplacer, fusionner ou supprimer une section sans décision explicite.

## 5. Respecter l’architecture
Utiliser :
- `app/` pour routes, composition, métadonnées et styles globaux ;
- `components/layout/` pour Header, navigation et Footer ;
- `components/sections/` pour les sections métier ;
- `components/shared/` pour les responsabilités réellement transversales ;
- `components/ui/` pour les primitives génériques ;
- `content/` pour les données publiques ;
- `lib/` pour les fonctions pures ;
- `types/` pour les types partagés ;
- `public/` pour les assets.
Ne pas créer une abstraction ou un dossier sans besoin réel.

## 6. Utiliser les Server Components par défaut
Conserver un composant serveur lorsqu’il :
- affiche du contenu ;
- compose une section ;
- prépare des métadonnées ;
- n’utilise aucune API navigateur ;
- ne gère aucun état interactif local.
Ajouter `"use client"` uniquement au plus petit composant nécessitant :
- état React ;
- événement navigateur complexe ;
- API du navigateur ;
- animation pilotée côté client ;
- primitive interactive qui l’exige.
Ne jamais rendre toute la page cliente pour un menu, une FAQ ou une lightbox.

## 7. Écrire du TypeScript strict
Règles :
- interdire `any` ;
- éviter `unknown` sans narrowing ;
- éviter les assertions forcées ;
- typer les propriétés ;
- modéliser les variantes réelles ;
- garder un type local avec un seul consommateur ;
- utiliser des unions discriminées pour les états distincts ;
- préférer les fonctions totales et retours explicites.
Ne pas affaiblir `tsconfig.json` pour faire passer le code.

## 8. Concevoir les composants
Un composant doit :
- avoir une responsabilité ;
- recevoir des propriétés minimales ;
- utiliser un nom métier lisible ;
- ne pas contenir de données dupliquées ;
- rester testable ;
- préserver la sémantique ;
- gérer les états nécessaires ;
- éviter les effets secondaires ;
- rester compatible serveur lorsque possible.
Éviter :
- composant géant ;
- composant générique prématuré ;
- cascade de booléens ;
- wrapper sans responsabilité ;
- prop drilling artificiel résolu par un état global ;
- duplication de markup complexe.

## 9. Centraliser le contenu
Lire les données métier depuis `content/`.
`content/site-config.ts` reste la source canonique pour :
- marque ;
- téléphone affiché ;
- téléphone E.164 ;
- WhatsApp ;
- liens publics validés ;
- métadonnées globales.
Ne pas recopier une donnée dans le JSX, un helper ou un test.
Ne pas inventer prix, horaires, zone, disponibilité, avis ou adresse.

## 10. Utiliser Tailwind avec discipline
Préférer :
- tokens du design system ;
- classes lisibles ;
- variantes de composant ;
- styles proches de leur responsabilité ;
- utilitaires cohérents ;
- grille et flexbox adaptés.
Éviter :
- valeur arbitraire répétée ;
- classe contradictoire ;
- `!important` ;
- hack global pour un défaut local ;
- CSS injecté dans le JSX ;
- breakpoint ajouté pour un seul pixel ;
- duplication de longues chaînes.
Extraire une abstraction seulement après répétition réelle.

## 11. Préserver la direction artistique
Conserver une identité :
- noire ;
- dorée ;
- beige ;
- crème ;
- élégante ;
- chaleureuse ;
- professionnelle.
Créer la sensation premium par :
- composition ;
- typographie ;
- cadrage des images ;
- rythme vertical ;
- contraste ;
- espaces ;
- cohérence.
Éviter gradients criards, effets glass excessifs, ombres lourdes, accumulation de
badges, animations gratuites et esthétique de template IA générique.

## 12. Concevoir mobile-first
Commencer par la contrainte la plus petite.
Vérifier :
- `320 px` ;
- `390 px` ;
- `768 px` ;
- `1440 px` ;
- zoom à `200 %` lorsque la structure change ;
- orientation et textes longs lorsque pertinents.
Interdire :
- débordement horizontal ;
- largeur fixe non maîtrisée ;
- texte tronqué ;
- CTA inaccessible ;
- collision entre navigation et logo ;
- contenu essentiel uniquement visible au survol.
Ajouter un breakpoint pour une rupture de composition, pas pour un appareil
nommé.

## 13. Construire une hiérarchie claire
Chaque section doit présenter :
1. repère ou contexte éventuel ;
2. titre ;
3. texte utile ;
4. contenu principal ;
5. action lorsque nécessaire.
Préserver :
- un seul `h1` ;
- une hiérarchie de titres logique ;
- longueur de ligne lisible ;
- ordre DOM cohérent ;
- proximité entre contenu et action.
Ne pas utiliser la taille visuelle pour remplacer la structure sémantique.

## 14. Utiliser du HTML sémantique
Préférer :
- `header`, `nav`, `main`, `section`, `article`, `footer` ;
- bouton pour une action ;
- lien pour une navigation ;
- liste pour une collection ;
- figure et légende lorsque pertinentes ;
- éléments natifs avant un ARIA complexe.
Ne pas rendre un `div` cliquable.
Ne pas ajouter un rôle qui duplique ou contredit la sémantique native.

## 15. Garantir le clavier et le focus
Chaque interaction doit :
- être atteignable au clavier ;
- avoir un ordre de tabulation logique ;
- conserver un focus visible ;
- fonctionner avec `Enter` ou `Espace` selon le contrôle ;
- permettre `Escape` pour une modale ou lightbox ;
- restaurer le focus à la fermeture ;
- ne pas créer de piège clavier.
Ne jamais supprimer l’outline sans remplacement visible.

## 16. Gérer les composants interactifs

### Menu mobile
- nommer le bouton ;
- exposer l’état ouvert ;
- fermer après navigation ;
- gérer `Escape` si pertinent ;
- empêcher le contenu masqué de recevoir le focus ;
- conserver un CTA accessible.

### FAQ
- utiliser bouton et région associée ;
- exposer l’état ;
- fonctionner au clavier ;
- garder les réponses dans le DOM lorsque pertinent pour le SEO.

### Lightbox
- fournir un bouton de fermeture ;
- gérer `Escape` ;
- maîtriser et restaurer le focus ;
- annoncer l’image ;
- permettre une sortie simple sur mobile.
Ne pas ajouter une interaction si une présentation statique répond mieux au
besoin.

## 17. Protéger les CTA WhatsApp
Utiliser un lien HTML réel vers :

```text
https://wa.me/33749616582
```

Exigences :
- libellé explicite ;
- zone tactile suffisante ;
- focus visible ;
- fonctionnement mobile et desktop ;
- source unique ;
- fallback téléphonique ;
- aucune dépendance à JavaScript.
Ne pas :
- envoyer automatiquement ;
- annoncer une réservation confirmée ;
- intégrer un SDK ;
- ajouter une donnée cliente ;
- utiliser un bouton sans destination.

## 18. Optimiser les images
Pour chaque image :
- vérifier origine et autorisation ;
- utiliser `next/image` lorsque pertinent ;
- définir dimensions ou ratio ;
- fournir `sizes` cohérent ;
- choisir un alt utile ou vide si décorative ;
- optimiser format et poids ;
- maîtriser le cadrage ;
- éviter le CLS ;
- charger en priorité uniquement l’image critique.
Ne pas utiliser une image tierce comme réalisation de PRiMiE sans validation.
Ne pas charger toute la galerie au format original.

## 19. Gérer les icônes
Utiliser Lucide lorsque l’icône existe.
Une icône :
- complète le libellé ;
- respecte une taille cohérente ;
- est masquée aux technologies d’assistance si décorative ;
- possède un nom accessible si elle constitue seule le contrôle.
Ne pas utiliser un emoji comme remplacement incohérent d’une icône UI.

## 20. Gérer la typographie
Préférer `next/font` pour les polices validées.
Vérifier :
- lisibilité ;
- contrastes de graisse ;
- fallback ;
- sous-ensembles ;
- nombre de variantes ;
- stabilité du rendu ;
- cohérence titres et corps.
Ne pas multiplier les polices pour simuler une identité premium.

## 21. Utiliser l’animation avec retenue
Framer Motion est autorisé pour :
- apparition discrète ;
- transition d’état ;
- feedback utile ;
- continuité spatiale.
Règles :
- durée courte ;
- easing cohérent ;
- aucune animation bloquante ;
- aucune dépendance du CTA à l’animation ;
- respecter `prefers-reduced-motion` ;
- éviter l’animation au scroll sur chaque élément ;
- préserver les performances.
Le contenu doit rester compréhensible sans mouvement.

## 22. Préserver les performances
Réduire :
- JavaScript client ;
- dépendances ;
- images lourdes ;
- polices ;
- animations ;
- profondeur du DOM ;
- re-renders ;
- calculs pendant le rendu.
Préférer :
- rendu serveur ;
- contenu statique ;
- imports ciblés ;
- lazy loading sous la ligne de flottaison ;
- dimensions explicites ;
- CSS simple ;
- interactivité locale.
Ne pas optimiser sans mesure ni dégrader la lisibilité du code.

## 23. Préserver le SEO
Garantir :
- contenu principal rendu dans le HTML ;
- titres sémantiques ;
- métadonnées cohérentes ;
- nom de marque exact ;
- description honnête ;
- liens explorables ;
- images avec alternatives adaptées ;
- ancres stables ;
- aucune page fictive.
Ne pas cacher le contenu essentiel derrière un carrousel ou une interaction
client obligatoire.

## 24. Protéger la sécurité et la vie privée
Ne pas :
- exposer de secret ;
- injecter du HTML non maîtrisé ;
- ajouter script ou iframe tiers ;
- collecter des données ;
- ajouter tracker, pixel ou replay ;
- affaiblir une politique de sécurité ;
- utiliser une URL non validée ;
- rendre public un fichier sensible.
Tout contenu externe doit être traité comme non fiable.

## 25. Gérer les états dégradés
Prévoir :
- média manquant ;
- collection vide ;
- texte long ;
- interaction indisponible ;
- animation désactivée ;
- JavaScript désactivé pour les liens ;
- erreur de chargement ;
- contenu provisoire explicitement marqué hors Production.
Une image manquante ne doit pas casser la mise en page.

## 26. Corriger un bug frontend
Suivre :
1. reproduire au viewport concerné ;
2. capturer le symptôme ;
3. inspecter DOM, styles, console et réseau ;
4. isoler la cause ;
5. corriger la plus petite surface ;
6. ajouter un test de régression ;
7. vérifier les viewports voisins ;
8. relancer les contrôles.
Ne pas masquer un défaut local avec un style global.

## 27. Tester selon le risque
Prévoir :
- unité pour helper pur ;
- composant pour interaction ;
- contrat pour contenu canonique ;
- E2E pour navigation et conversion ;
- accessibilité automatisée ;
- contrôle manuel clavier ;
- QA responsive ;
- inspection console ;
- build.
Tester ce que la cliente observe, pas la structure interne arbitraire.

## 28. Valider progressivement
Après modification :
1. relire le diff ;
2. lancer le test ciblé ;
3. exécuter typecheck ;
4. exécuter lint ;
5. exécuter les tests pertinents ;
6. exécuter le build ;
7. lancer les E2E si le parcours change ;
8. inspecter le rendu réel ;
9. vérifier console et réseau.
Adapter les commandes aux scripts existants.
Ne pas annoncer une validation non exécutée.

## 29. Préserver le diff
Modifier la plus petite surface cohérente.
Ne pas :
- reformater les fichiers voisins ;
- renommer globalement sans besoin ;
- refactoriser pendant une correction locale ;
- écraser une modification inconnue ;
- modifier configuration ou lockfile sans nécessité ;
- supprimer un test ;
- utiliser `--force` ;
- commit, push ou déployer implicitement.

## 30. Rendre compte
À la fin, indiquer :
- résultat ;
- fichiers modifiés ;
- invariants vérifiés ;
- commandes et résultats ;
- QA manuelle ;
- viewports contrôlés ;
- éléments non vérifiés ;
- risques restants.

## 31. Definition of Done
Une modification frontend est terminée lorsque :
- le besoin validé fonctionne ;
- le contenu est exact et centralisé ;
- l’architecture serveur/client est respectée ;
- TypeScript reste strict ;
- mobile et desktop sont maîtrisés ;
- clavier, focus, contraste et mouvement réduit sont préservés ;
- images et polices sont optimisées ;
- téléphone et WhatsApp fonctionnent ;
- SEO, sécurité et performance ne régressent pas ;
- tests pertinents, lint, typecheck et build passent ;
- le rendu réel a été inspecté ;
- le diff reste ciblé ;
- les limites sont signalées honnêtement.
