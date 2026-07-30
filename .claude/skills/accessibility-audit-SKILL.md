---
name: accessibility-audit
description: Auditer, diagnostiquer, corriger ou valider l’accessibilité de PRIMiE selon WCAG 2.2 niveau AA. Utiliser cette skill pour contrôler HTML sémantique, titres, landmarks, navigation clavier, focus, contrastes, zoom, reflow, cibles tactiles, textes alternatifs, ARIA, menu mobile, FAQ, galerie, lightbox, mouvement réduit, liens WhatsApp et téléphone, ainsi que pour écrire des tests axe, Playwright ou React Testing Library et produire un rapport d’audit priorisé.
---

# Accessibility Audit PRIMiE

Rendre la landing page utilisable par le plus grand nombre. Rechercher des
preuves, combiner contrôles automatiques et manuels et ne jamais annoncer une
conformité non démontrée.

## 1. Charger le contexte

Avant tout audit :

1. lire `CLAUDE.md` ;
2. lire `09-accessibility.md`, `13-testing-qa.md` et `do-not-break.md` ;
3. inspecter le brief et les critères d’acceptation ;
4. lire `package.json` et les configurations réelles ;
5. inspecter routes, composants, styles, contenus et tests concernés ;
6. identifier les primitives shadcn/ui ou Radix utilisées ;
7. vérifier l’état local et préserver tout travail inconnu.

Utiliser `rg --files` et `rg` pour localiser contrôles, rôles, attributs ARIA,
handlers clavier, dialogs, images, ancres et styles de focus. Ne jamais supposer
qu’un outil, package ou script existe.

## 2. Respecter le mode demandé

Une demande d’audit autorise lecture, contrôles existants, navigation locale,
inspection du DOM, captures et rapport. Elle n’autorise pas :

- correction du code ;
- installation d’une dépendance ;
- modification distante ;
- commit, push ou déploiement ;
- changement du contenu métier.

Corriger uniquement sur demande explicite. Une autorisation de correction
n’autorise pas une livraison en Production.

## 3. Cadrer l’audit

Consigner :

- page, section ou composant ;
- environnement et version ;
- navigateur et technologie d’assistance ;
- viewports ;
- niveau WCAG ;
- parcours inclus et exclusions ;
- outils disponibles ;
- preuves attendues ;
- limites.

Par défaut, viser WCAG 2.2 AA sur toute la landing page. Ne pas transformer un
contrôle partiel en certification globale.

## 4. Protéger les invariants

Préserver :

```text
Marque : Chez PRIMiE Coiffure
Graphie : PRIMiE
Porteuse : Prisca
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

Préserver aussi l’ordre officiel des sections, les six prestations, le parcours
WhatsApp, la direction artistique, les performances, le SEO, le responsive et
le périmètre V1. Ne pas supprimer contenu, image ou fonction pour faire
disparaître une violation. Corriger la cause.

## 5. Combiner les méthodes

Utiliser :

1. **statique** : JSX, types, lint et règles de code ;
2. **automatique** : axe, tests composants et navigateur ;
3. **manuel** : clavier, focus, zoom, reflow, lecteur d’écran et mouvement.

L’automatisation ne prouve ni la qualité d’un texte alternatif, ni l’ordre
logique, ni la pertinence d’une annonce, ni l’utilisabilité réelle.

## 6. Inventorier l’interface

Recenser :

- landmarks et titres ;
- liens et boutons ;
- menu mobile et ancres ;
- images et icônes ;
- accordéon FAQ ;
- galerie, filtres et lightbox ;
- CTA WhatsApp et téléphone ;
- animations et contenu masqué ;
- messages dynamiques et composants tiers.

Associer à chaque composant interactif son rôle, nom, état, ordre de focus,
touches, retour visuel, comportement mobile et test.

## 7. Auditer la sémantique

Contrôler :

- un seul `<main>` et un seul `h1` ;
- `header`, `nav`, `main` et `footer` correctement employés ;
- sections nommées ;
- hiérarchie de titres logique ;
- listes rendues comme listes ;
- `<button>` pour une action ;
- `<a>` pour une destination ;
- aucun contrôle interactif imbriqué ;
- ordre DOM cohérent avec l’ordre visuel.

Utiliser le HTML natif avant ARIA. Ne pas choisir un niveau de titre pour sa
taille visuelle.

## 8. Auditer langue et contenu

Contrôler :

```tsx
<html lang="fr">
```

Vérifier également :

- texte essentiel en HTML ;
- consignes indépendantes de la forme, position ou couleur ;
- liens compréhensibles hors contexte ;
- abréviations compréhensibles ;
- absence de texte provisoire en Production ;
- absence de faux statut de réservation.

Un CTA ouvrant WhatsApp ne doit jamais annoncer qu’un rendez-vous est confirmé.

## 9. Auditer les noms accessibles

Calculer chaque nom depuis :

1. texte visible ;
2. label associé ;
3. relation sémantique ;
4. `aria-label` seulement si nécessaire.

Vérifier nom présent, distinct lorsque nécessaire, cohérent avec le texte
visible et accompagné de l’état utile. Ne pas utiliser `title` seul. Ne pas
ajouter un `aria-label` contradictoire.

## 10. Tester le clavier

Parcourir la page avec :

- `Tab` et `Shift+Tab` ;
- `Enter` ;
- `Space` ;
- `Escape` ;
- flèches seulement pour les patterns concernés.

Vérifier :

- toute fonction atteignable ;
- ordre logique ;
- aucun focus perdu ou piégé ;
- aucun `tabIndex` positif ;
- aucun élément caché focusable ;
- activation conforme au contrôle ;
- aucune fonction réservée au hover, swipe ou drag.

Ne pas simuler un bouton avec un `<div>`.

## 11. Tester le focus

Le focus doit être visible, contrasté, distinct du hover, non coupé, non masqué
par le header sticky et restauré après un modal.

Contrôler le premier lien utile :

```text
Aller au contenu principal
```

Il devient visible au focus, cible `<main>` et laisse la destination lisible.
Utiliser `scroll-margin-top` si nécessaire. Ne jamais supprimer `outline` sans
remplacement équivalent.

## 12. Tester navigation et menu mobile

Vérifier :

- navigations correctement nommées ;
- ancres existantes et titres non masqués ;
- bouton d’ouverture nommé ;
- `aria-expanded` synchronisé ;
- ouverture et fermeture clavier ;
- fermeture par `Escape` ;
- fond non interactif si modal ;
- focus contenu dans le panneau ;
- retour au déclencheur ;
- fermeture après sélection ;
- scroll restauré.

Ne pas utiliser le pattern ARIA `menu` pour une liste ordinaire de liens.

## 13. Tester la FAQ

Chaque question :

- est un bouton relié à un titre ;
- expose son état ;
- contrôle la réponse ;
- fonctionne avec `Enter` et `Space` ;
- conserve un focus visible.

Vérifier qu’un contenu masqué ne reste pas tabulable. Préférer une primitive
accessible validée à une implémentation ARIA artisanale.

## 14. Tester galerie et filtres

Vérifier :

- parcours sans carrousel obligatoire ;
- déclencheurs atteignables ;
- alternatives utiles ;
- filtre actif indiqué autrement que par la couleur ;
- état sémantique exact ;
- option `Toutes` ;
- résultats masqués réellement indisponibles aux technologies d’assistance ;
- aucun déplacement inattendu du focus ;
- annonce mesurée d’un changement important si utile.

Utiliser des boutons pour un choix simple. Employer des tabs uniquement si leur
pattern complet est implémenté.

## 15. Tester la lightbox

Traiter la lightbox comme un dialog modal. Vérifier :

- nom et focus initial logiques ;
- focus piégé ;
- arrière-plan inert ;
- bouton fermer nommé ;
- fermeture par `Escape` ;
- contrôles précédent et suivant nommés ;
- image accessible ;
- blocage du scroll sans casse ;
- retour du focus au déclencheur ;
- alternative au swipe.

Le clic sur l’overlay ne doit jamais être l’unique fermeture.

## 16. Auditer images et icônes

Classer chaque image comme informative, fonctionnelle, décorative, complexe ou
image de texte.

Appliquer :

- `alt` utile pour l’informatif ;
- `alt=""` pour le décoratif ;
- nom d’action pour le fonctionnel ;
- description adjacente pour le complexe ;
- HTML plutôt qu’image de texte.

Pour une réalisation, décrire la coiffure si elle constitue l’information. Ne
pas recopier inutilement la légende ni utiliser le nom de fichier.

Masquer les icônes décoratives avec `aria-hidden="true"`. Nommer tout bouton
uniquement iconographique.

## 17. Mesurer les contrastes

Mesurer les couleurs finales calculées :

| Élément | Ratio minimal |
| --- | ---: |
| Texte standard | `4,5:1` |
| Grand texte | `3:1` |
| Composant ou état essentiel | `3:1` |

Vérifier texte sur photo, overlay du Hero, doré sur fond clair, liens, focus,
hover, actif, désactivé, bordures et icônes informatives.

Une ombre ne garantit pas le contraste. La couleur ne doit jamais être le seul
vecteur d’état, d’erreur, de sélection ou de lien.

## 18. Tester zoom et reflow

Tester :

- largeur `320px` CSS ;
- zoom navigateur `200 %` ;
- texte agrandi ;
- contenus français longs ;
- orientations pertinentes.

Vérifier aucun scroll horizontal de lecture, texte coupé, contrôle superposé,
hauteur fixe bloquante ou contenu tronqué. Conserver ordre de lecture,
navigation, CTA et information des images.

Ne pas désactiver le zoom.

## 19. Vérifier les cibles tactiles

WCAG 2.2 AA fixe `24 × 24px` avec exceptions. PRIMiE vise `44 × 44px` pour les
contrôles principaux.

Mesurer menu, CTA WhatsApp, téléphone, FAQ, filtres et contrôles de lightbox.
Vérifier l’espacement entre cibles proches. Mesurer la zone interactive, pas
seulement l’icône.

## 20. Vérifier le mouvement

Tester `prefers-reduced-motion: reduce`. Dans ce mode :

- supprimer les révélations décoratives ;
- réduire les translations ;
- éviter parallaxe et scroll animé ;
- afficher immédiatement le contenu ;
- conserver uniquement des transitions utiles et courtes.

Vérifier absence de clignotement dangereux, autoplay intrusif et contenu bloqué
dans un état animé. La réduction ne doit supprimer aucune fonction.

## 21. Vérifier WhatsApp et téléphone

Contrôler :

```text
WhatsApp : href="https://wa.me/33749616582"
Téléphone : href="tel:+33749616582"
```

Vérifier texte, nom accessible, focus, clavier, cible tactile, lien HTML réel,
absence de donnée cliente et absence d’envoi ou d’appel automatique.

Ne pas ouvrir réellement une conversation ni déclencher un appel pendant un
test automatisé.

## 22. Vérifier ARIA

Rechercher :

- rôle redondant ou incorrect ;
- `aria-hidden` sur un ancêtre focusable ;
- référence ARIA cassée ;
- identifiant dupliqué ;
- état non synchronisé ;
- live region trop bavarde ;
- contrôle sans nom ;
- élément visuellement masqué encore accessible.

Une ARIA incorrecte dégrade un HTML natif correct.

## 23. Utiliser les outils existants

Préférer selon disponibilité :

- ESLint et règles JSX a11y ;
- React Testing Library et Vitest ;
- Playwright ;
- `@axe-core/playwright` ;
- Accessibility Tree et DevTools ;
- Lighthouse comme signal complémentaire ;
- VoiceOver ou NVDA.

Ne pas installer automatiquement un scanner. L’absence de violation axe ne
signifie pas conformité WCAG.

## 24. Automatiser axe

Si `@axe-core/playwright` est installé :

```ts
const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();

expect(results.violations).toEqual([]);
```

Tester séparément page stable, menu ouvert, FAQ, filtres et lightbox. Ne jamais
exclure une règle sans preuve documentée d’un faux positif.

## 25. Exécuter la matrice manuelle

| Axe | Scénario |
| --- | --- |
| Clavier | Parcours complet aller et retour |
| Focus | Visible, non masqué, restauré |
| Mobile | `320`, `390`, `768px` |
| Desktop | `1440px` |
| Zoom | `200 %` |
| Contraste | Textes, états et overlays |
| Mouvement | Préférence réduite |
| Composants | Menu, FAQ, galerie, lightbox |
| Contact | WhatsApp et téléphone |
| Lecteur d’écran | Structure, noms, états, ordre |

Pour un lecteur d’écran, consigner logiciel, navigateur et parcours. Ne jamais
prétendre l’avoir testé sans technologie disponible.

## 26. Classer les constats

Utiliser :

- **critique** : parcours essentiel totalement inaccessible ;
- **majeur** : clavier bloqué, piège de focus, nom essentiel absent ou contenu
  illisible ;
- **mineur** : friction réelle avec contournement ;
- **cosmétique** : incohérence sans perte fonctionnelle.

Pour chaque constat, fournir identifiant, sévérité, critère WCAG, emplacement,
précondition, reproduction, observé, attendu, impact, preuve, correction et
statut. Ne pas déduire la sévérité d’un score Lighthouse.

## 27. Corriger avec méthode

Si la correction est autorisée :

1. reproduire et relier au critère ;
2. identifier la cause ;
3. choisir HTML natif ou primitive adaptée ;
4. produire le plus petit diff cohérent ;
5. ajouter un test de régression ;
6. relancer le contrôle ciblé ;
7. exécuter la régression nécessaire ;
8. refaire le test manuel ;
9. vérifier design, responsive, performance et SEO.

Ne pas regrouper des défauts sans rapport.

## 28. Produire le rapport

Inclure :

```text
Périmètre et environnement
Référentiel
Méthodes et outils
Parcours testés
Résultats automatiques
Résultats manuels
Constats par sévérité
Corrections et retests
Limites et éléments non vérifiés
Verdict
```

Verdicts :

- `PASS` : périmètre vérifié, aucun défaut bloquant connu ;
- `PASS AVEC RÉSERVES` : défauts non bloquants documentés ;
- `FAIL` : défaut critique ou majeur non résolu ;
- `NON CONCLUANT` : preuves insuffisantes.

Écrire « aucun défaut détecté dans le périmètre testé », jamais « site 100 %
accessible ».

## 29. Définition de terminé

L’audit est terminé lorsque :

- périmètre et limites sont explicites ;
- interface et états sont inventoriés ;
- contrôles automatiques disponibles sont exécutés ;
- clavier, focus, zoom, reflow et mouvement sont contrôlés ;
- contrastes sont mesurés ;
- composants complexes sont testés ;
- WhatsApp et téléphone sont vérifiés ;
- constats sont reproductibles et priorisés ;
- corrections autorisées sont retestées ;
- éléments non vérifiés sont déclarés ;
- verdict repose sur des preuves.

## 30. Interdictions absolues

Ne jamais :

- utiliser un `<div>` comme bouton ;
- supprimer le focus visible ;
- ajouter un `tabIndex` positif ;
- bloquer le zoom ;
- utiliser la couleur seule ;
- exiger hover, swipe ou drag ;
- créer un dialog sans gestion du focus ;
- masquer un contrôle focusable avec `aria-hidden` ;
- ajouter une ARIA contraire au HTML ;
- déclarer une conformité depuis axe ou Lighthouse seuls ;
- inventer un test manuel ;
- sacrifier design, contenu ou performance pour un score ;
- déployer sans autorisation.

Séparer strictement ce qui est vérifié, observé, inféré et non vérifié. Ne jamais
présenter une hypothèse comme preuve.
