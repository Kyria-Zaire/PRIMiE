---
paths:
  - "app/**/*.tsx"
  - "app/**/*.css"
  - "components/**/*.tsx"
  - "content/**/*.ts"
---

# PRIMiE — Accessibilité

## 1. Objectif

PRIMiE vise WCAG 2.2 niveau AA.

L'accessibilité est une exigence fonctionnelle, jamais une finition ajoutée après
le design.

Chaque interface doit rester utilisable :

- au clavier ;
- au tactile ;
- avec un lecteur d'écran ;
- avec un zoom à `200 %` ;
- avec une largeur de `320 CSS px` ;
- avec du texte agrandi ;
- sans perception fiable des couleurs ;
- avec les animations réduites ;
- sans souris.

Une bibliothèque accessible ne garantit pas que son intégration le soit.
Ne jamais déclarer une conformité complète sans audit suffisant.

## 2. HTML sémantique

Utiliser l'élément natif correspondant à l'intention :

- `<header>` pour l'en-tête ;
- `<nav>` pour la navigation ;
- `<main>` pour le contenu principal ;
- `<section>` pour une région thématique nommée ;
- `<footer>` pour le pied de page ;
- `<button>` pour une action ;
- `<a>` pour une destination ;
- `<ul>` ou `<ol>` pour une liste ;
- `<blockquote>` pour un témoignage lorsque pertinent ;
- `<address>` pour des coordonnées appropriées.

Règles :

- un seul `<main>` ;
- chaque section sémantique possède un nom accessible ;
- aucun rôle répétant inutilement la sémantique native ;
- aucun `<div>` cliquable ;
- aucun contrôle interactif imbriqué ;
- ordre DOM logique ;
- source visuelle et source accessible cohérentes.

## 3. Langue

Définir la langue principale :

```tsx
<html lang="fr">
```

Marquer une portion dans une autre langue seulement si sa prononciation ou sa
compréhension le justifie.

Les noms de marque comme `WhatsApp` ne nécessitent pas systématiquement un
changement de langue.

## 4. Titres

Règles :

- un seul `h1` sur la landing page ;
- niveau choisi selon la structure, pas la taille ;
- hiérarchie logique sans saut arbitraire ;
- titre pour chaque grande section ;
- aucun titre nécessaire supprimé pour la composition ;
- titre visuellement masqué toujours accessible si nécessaire ;
- aucun texte de titre uniquement intégré dans une image.

La taille appartient au CSS. Le niveau appartient à la structure.

## 5. Landmarks

La page permet une navigation rapide par régions :

```text
header
navigation
main
footer
```

Si plusieurs navigations existent, les nommer distinctement :

- `Navigation principale`
- `Navigation du pied de page`

Ne pas multiplier les landmarks.
Une carte ou un wrapper visuel n'est pas automatiquement une région.

## 6. Lien d'évitement

Ajouter avant la navigation :

```text
Aller au contenu principal
```

Le lien doit :

- être le premier contrôle pertinent ;
- devenir visible au focus ;
- pointer vers le contenu principal ;
- déplacer effectivement la position de lecture ;
- rester lisible sur le Header ;
- ne pas être masqué par un élément sticky.

Tester ce lien avec le Header final et au zoom.

## 7. Clavier

Toute fonctionnalité est disponible au clavier.

Touches attendues selon le composant :

- `Tab` et `Shift+Tab` : déplacement ;
- `Enter` : activation d'un lien ou bouton ;
- `Space` : activation d'un bouton ;
- `Escape` : fermeture d'un menu ou dialog ;
- flèches : seulement lorsque le pattern les prévoit.

Règles :

- aucun piège clavier ;
- aucun `tabIndex` positif ;
- tabulation conforme à l'ordre logique ;
- aucun raccourci basé sur une lettre seule ;
- aucun élément non interactif focusable sans raison ;
- aucun `onKeyDown` pour imiter un bouton natif ;
- aucune action disponible uniquement à la souris.

## 8. Focus visible

Tout contrôle interactif possède un focus visible.

Patron recommandé :

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
```

Le focus doit :

- être suffisamment contrasté ;
- rester visible sur fond clair et sombre ;
- entourer la zone interactive réelle ;
- ne pas être coupé par `overflow: hidden` ;
- ne pas être masqué par le Header sticky ;
- être distinguable du hover.

Ne jamais supprimer `outline` sans remplacement au moins équivalent.

## 9. Focus non masqué

Lorsqu'un contrôle reçoit le focus :

- le Header sticky ne le recouvre pas ;
- aucun CTA flottant ne le masque ;
- un scroll automatique laisse le contrôle visible ;
- une section ciblée utilise `scroll-margin-top` ;
- l'ouverture d'un composant place le focus de façon prévisible.

Tester les ancres, le lien d'évitement, le menu et la FAQ.

## 10. Contraste

Minimums WCAG AA :

- texte standard : `4.5:1` ;
- grand texte : `3:1` ;
- composants et états nécessaires : `3:1` avec les couleurs adjacentes.

Règles PRIMiE :

- aucun petit texte doré sur fond clair ;
- texte sur photographie vérifié ;
- overlay stable si le contraste de l'image varie ;
- hover, focus, actif et désactivé contrôlés ;
- bordure essentielle suffisamment visible ;
- couleurs finales testées dans leur contexte.

Le logo bénéficie d'exceptions spécifiques, pas le contenu voisin.

## 11. Couleur

La couleur n'est jamais le seul moyen de transmettre :

- état actif d'un filtre ;
- focus ;
- erreur ;
- lien ;
- sélection ;
- disponibilité d'une action.

Ajouter selon le besoin :

- texte ;
- icône ;
- forme ;
- soulignement ;
- bordure ;
- attribut sémantique.

## 12. Reflow, taille et zoom

La page doit :

- refluer à `320 CSS px` sans perte d'information ou de fonction ;
- fonctionner avec un zoom à `200 %` ;
- accepter l'agrandissement du texte ;
- ne jamais bloquer le zoom ;
- supporter les espacements de texte personnalisés ;
- éviter les hauteurs fixes sur les blocs textuels.

Ne pas utiliser :

- `user-scalable=no` ;
- `maximum-scale=1` ;
- texte dans une image lorsqu'un texte HTML est possible ;
- troncature d'une information nécessaire ;
- double scroll sans nécessité fonctionnelle.

## 13. Cibles tactiles

WCAG 2.2 AA définit une cible minimale de `24 × 24 CSS px` avec exceptions.

PRIMiE applique une cible de projet plus confortable :

```text
44 × 44px minimum pour les contrôles principaux
```

Règles :

- espacer les contrôles proches ;
- étendre la zone au-delà de l'icône visible ;
- conserver une cible suffisante dans le Header ;
- rendre les boutons de lightbox faciles à atteindre ;
- ne pas exiger un geste de glissement ;
- fournir une alternative à toute interaction de drag.

## 14. Images

- Fournir un `alt` utile aux images informatives.
- Utiliser `alt=""` pour les images décoratives.
- Éviter de répéter une légende identique.
- Ne jamais utiliser le nom du fichier comme alternative.
- Décrire la coiffure lorsqu'elle est l'information principale.
- Ne pas renseigner `title` à la place de `alt`.
- Ne pas intégrer un texte essentiel dans une photographie.

Une icône décorative utilise `aria-hidden="true"`.

## 15. Noms accessibles

Le nom accessible d'un contrôle doit :

- décrire son action ;
- contenir son libellé visible ;
- rester cohérent entre les occurrences ;
- éviter toute information contradictoire.

Exemples :

- `Ouvrir le menu`
- `Fermer la galerie`
- `Image précédente`
- `Réserver sur WhatsApp`

Une icône seule nécessite un nom accessible explicite.

## 16. ARIA

Première règle : utiliser le HTML natif avant ARIA.

Règles :

- aucun `role="button"` sur un vrai bouton ;
- aucun `aria-label` contredisant le texte visible ;
- aucun élément focusable masqué avec `aria-hidden="true"` ;
- aucun rôle sans comportement clavier associé ;
- `aria-expanded` mis à jour pour un contrôle dépliant ;
- déclencheur et contenu reliés lorsque le pattern l'exige ;
- aucune annonce live inutile.

Une mauvaise ARIA dégrade un HTML natif correct.

## 17. Menu mobile

Utiliser une primitive accessible `Sheet` ou `Dialog`.

À l'ouverture :

- déplacer le focus dans le panneau ;
- rendre le fond non interactif si modal ;
- annoncer le nom du panneau.

Pendant l'ouverture :

- conserver le focus dans le panneau modal ;
- permettre `Escape` ;
- fournir un bouton fermer accessible ;
- garder chaque lien utilisable au clavier.

À la fermeture :

- restaurer le focus au déclencheur ;
- fermer après sélection d'une ancre.

Ne pas utiliser le pattern ARIA `menu` pour une liste de liens de navigation.

## 18. Accordéon FAQ

Utiliser une primitive shadcn/ui/Radix ou un pattern WAI-ARIA conforme.

Chaque question :

- est un bouton ;
- est associée à un titre ;
- expose son état ouvert ;
- contrôle sa réponse ;
- conserve un focus visible ;
- fonctionne avec `Enter` et `Space`.

Ne pas construire l'accordéon avec un `<div onClick>`.
Le masquage visuel doit aussi être cohérent pour les technologies d'assistance.

## 19. Lightbox

La lightbox suit le pattern dialog modal.

Obligations :

- nom accessible ;
- focus placé à l'ouverture ;
- focus piégé dans le dialog ;
- fond inert et non interactif ;
- fermeture par `Escape` ;
- bouton fermer ;
- focus restauré au déclencheur ;
- image avec alternative ;
- contrôles précédent/suivant nommés ;
- scroll de fond bloqué sans casser le viewport.

Le clic sur l'overlay ou le swipe ne doit jamais être l'unique moyen d'action.

## 20. Filtres de galerie

Utiliser des boutons ou tabs selon le comportement réel.

Règles :

- filtre actif indiqué visuellement et sémantiquement ;
- activation clavier ;
- ordre logique ;
- changement important du nombre de résultats annoncé si nécessaire ;
- aucun déplacement de focus sans demande ;
- aucun résultat masqué avec une simple opacité ;
- option `Toutes` toujours disponible.

Ne pas utiliser des checkboxes si une seule catégorie peut être active.

## 21. Mouvement

Respecter `prefers-reduced-motion`.

Lorsque la réduction est demandée :

- supprimer les révélations non essentielles ;
- réduire les translations ;
- éviter la parallaxe ;
- désactiver le scroll animé si nécessaire ;
- raccourcir les transitions indispensables ;
- ne jamais cacher un contenu en attente d'animation.

Éviter autoplay, clignotement, boucle décorative et mouvement prolongé sans
contrôle.

## 22. Contenu compréhensible

- Utiliser un français clair.
- Décrire les actions avec des libellés précis.
- Identifier les composants identiques de manière cohérente.
- Ne pas provoquer un changement de contexte au focus.
- Ne pas ouvrir un nouvel onglet sans comportement cohérent.
- Ne pas annoncer une réservation confirmée après un simple clic WhatsApp.
- Conserver les instructions près de l'action concernée.

L'accessibilité cognitive fait partie de la qualité du parcours.

## 23. Outils et tests

Effectuer au minimum :

- navigation complète au clavier ;
- vérification du focus ;
- contrôle des contrastes ;
- zoom `200 %` ;
- viewport `320px` ;
- réduction des animations ;
- test du menu, de l'accordéon et de la lightbox ;
- audit automatisé avec axe ou équivalent si configuré ;
- audit Lighthouse comme signal complémentaire.

Un audit automatisé ne prouve pas la conformité.

Ne jamais annoncer `conforme WCAG` sans audit manuel suffisamment complet.

## 24. Interdictions absolues

- Utiliser un `<div>` comme bouton.
- Supprimer le focus visible.
- Utiliser un `tabIndex` positif.
- Bloquer le zoom.
- Utiliser la couleur seule pour un état.
- Afficher un texte insuffisamment contrasté.
- Ajouter une ARIA incorrecte.
- Masquer un élément focusable aux lecteurs d'écran.
- Créer un dialog sans gestion du focus.
- Exiger un hover, un drag ou un swipe.
- Jouer automatiquement un média intrusif.
- Utiliser une image de texte lorsque HTML suffit.
- Considérer Lighthouse comme preuve unique.
- Désactiver une règle de lint pour masquer un problème.

## 25. Definition of Done

Une interface est accessible lorsqu'elle :

- utilise un HTML sémantique ;
- possède une hiérarchie de titres logique ;
- fonctionne entièrement au clavier ;
- ne piège jamais le focus ;
- conserve un focus visible et non masqué ;
- respecte les contrastes ;
- reflue à `320 CSS px` ;
- fonctionne avec un zoom à `200 %` ;
- possède des noms accessibles cohérents ;
- décrit correctement ses images ;
- respecte la réduction des animations ;
- suit les patterns accessibles pour menu, accordéon et dialog ;
- a été contrôlée automatiquement et manuellement ;
- ne contient aucune régression connue bloquante.

## Références normatives

- WCAG 2.2 : `https://www.w3.org/TR/WCAG22/`
- WAI-ARIA Authoring Practices : `https://www.w3.org/WAI/ARIA/apg/patterns/`
