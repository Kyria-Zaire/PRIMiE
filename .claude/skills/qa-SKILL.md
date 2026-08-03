---
name: qa
description: Concevoir, exécuter ou revoir l’assurance qualité de PRiMiE. Utiliser cette skill pour préparer un plan de test, écrire des tests Vitest, React Testing Library ou Playwright, vérifier une fonctionnalité, contrôler responsive et accessibilité, tester les parcours WhatsApp et téléphone, analyser une régression, produire un rapport QA ou décider si une modification est prête à être livrée.
---

# QA PRiMiE

Fournir des preuves que le besoin fonctionne sans régression connue. Tester les
comportements observables par la cliente et signaler honnêtement toute limite.

## 1. Charger le contexte

Avant de tester :
- lire `.claude/rules/01-product-scope.md`, `.claude/rules/do-not-break.md` et `.claude/rules/13-testing-qa.md` ;
- lire les règles produit, tests, accessibilité et `do-not-break` ;
- lire le brief, les critères d’acceptation et le plan technique ;
- inspecter les fichiers modifiés et le diff ;
- lire `package.json` et la configuration de test ;
- identifier les parcours et invariants affectés ;
- préserver les changements locaux inconnus.

Ne pas inventer un script, un test ou une configuration.

## 2. Définir la mission QA

Préciser :
- objet testé ;
- version ou état du code ;
- périmètre inclus ;
- périmètre exclu ;
- critères d’acceptation ;
- risques ;
- environnements ;
- navigateurs et viewports ;
- données utilisées ;
- conditions d’arrêt.

Une demande de QA n’autorise pas automatiquement une correction.

## 3. Distinguer les modes

Utiliser :
- **plan** : définir la stratégie sans exécuter ;
- **exécution** : lancer les contrôles existants ;
- **exploration** : chercher des défauts hors scénario nominal ;
- **régression** : vérifier les comportements protégés ;
- **audit** : produire des constats sans modifier ;
- **automatisation** : écrire des tests autorisés ;
- **validation de livraison** : donner un verdict fondé sur les preuves.

Ne pas modifier le produit pendant un audit sans demande explicite.

## 4. Évaluer le risque

Classer :
- **critique** : page inaccessible, WhatsApp ou téléphone incorrect, secret
  exposé, contenu métier falsifié ;
- **majeur** : parcours bloqué, navigation ou clavier inutilisable, build cassé ;
- **mineur** : défaut responsive local, état dégradé incomplet ;
- **cosmétique** : différence visuelle sans impact fonctionnel.

Associer chaque risque à un test ou contrôle précis.

Ne pas utiliser un score numérique sans données.

## 5. Utiliser la pile validée

Préférer :

| Niveau | Outil | Cible |
| --- | --- | --- |
| Statique | TypeScript, ESLint | Types, imports, règles |
| Unitaire | Vitest | Fonctions et données |
| Composant | React Testing Library + Vitest | Rendu et interactions |
| E2E | Playwright | Parcours navigateur |
| Accessibilité | `@axe-core/playwright` + manuel | WCAG et usage réel |
| Visuel | Captures Playwright ciblées | Mise en page |

Ne pas ajouter Jest, Cypress ou un outil redondant sans décision documentée.

Vérifier que les dépendances sont réellement installées avant usage.

## 6. Vérifier les scripts

Utiliser uniquement les scripts présents dans `package.json`.

Scripts attendus lorsqu’ils sont configurés :

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm test:e2e
pnpm build
```

Une commande absente doit être signalée, pas simulée.

Une commande échouée n’est jamais une validation réussie.

## 7. Construire la matrice de couverture

Relier :

| Risque | Niveau | Preuve |
| --- | --- | --- |
| helper incorrect | unitaire | assertions de sortie |
| interaction cassée | composant | rôles, actions, focus |
| parcours bloqué | E2E | résultat dans le navigateur |
| contenu altéré | contrat | source canonique |
| layout cassé | visuel et manuel | viewports ciblés |
| accessibilité | axe et manuel | violations et parcours clavier |

Éviter de couvrir le même comportement plusieurs fois sans bénéfice.

## 8. Tester comme une utilisatrice

Sélectionner en priorité :

1. rôle et nom accessible ;
2. label ;
3. texte visible ;
4. placeholder si nécessaire ;
5. `data-testid` en dernier recours.

Exemples :

```ts
screen.getByRole("button", { name: /réserver/i });
page.getByRole("link", { name: /whatsapp/i });
page.getByRole("heading", { name: /services/i });
```

Ne pas cibler classes CSS, XPath, structure DOM profonde ou identifiants
générés.

## 9. Tester le contrat de contenu

Protéger depuis une source unique :
- `Chez PRiMiE Coiffure` ;
- Prisca ;
- `+33 7 49 61 65 82` ;
- `+33749616582` ;
- `https://wa.me/33749616582` ;
- les six prestations validées ;
- l’ordre des sections ;
- l’absence de contenu provisoire en Production.

Vérifier qu’aucun prix, horaire, adresse, disponibilité ou avis n’est inventé.

Préférer un test de configuration à des assertions répétées dans chaque
composant.

## 10. Tester la page d’accueil

Vérifier :
- `/` répond ;
- le contenu principal est visible ;
- un seul `h1` décrit l’activité ;
- toutes les sections existent dans le bon ordre ;
- les images importantes se chargent ;
- aucun écran vide ;
- aucune erreur d’hydratation ;
- aucune erreur console inattendue ;
- aucun lien interne mort.

## 11. Tester la navigation

Vérifier :
- logo ou marque vers `#accueil` ;
- chaque lien cible un identifiant réel ;
- scroll vers la bonne section ;
- titre non masqué ;
- navigation clavier ;
- focus visible ;
- menu mobile ouvert et fermé ;
- fermeture du menu après sélection ;
- scroll restauré après fermeture ;
- aucune zone cachée encore focusable.

## 12. Tester WhatsApp

Vérifier chaque CTA :
- `href` exact ;
- libellé compréhensible ;
- source canonique ;
- accessibilité clavier ;
- zone tactile ;
- fonctionnement sans JavaScript ;
- message prérempli correctement encodé s’il est validé ;
- aucune donnée cliente dans l’URL.

Ne pas ouvrir WhatsApp ni envoyer réellement un message pendant le test.

Tester la destination du lien, pas le service externe.

## 13. Tester le téléphone

Vérifier :
- texte `+33 7 49 61 65 82` ;
- `href="tel:+33749616582"` ;
- libellé accessible ;
- absence de variante incohérente ;
- CTA visible sur mobile ;
- fallback disponible lorsque pertinent.

Ne pas déclencher réellement un appel.

## 14. Tester les services

Vérifier :
- six prestations exactes ;
- ordre décidé ;
- titres et descriptions associés ;
- images cohérentes ;
- alt adaptés ;
- aucun prix ou délai inventé ;
- grille responsive ;
- CTA d’information fonctionnel ;
- données hors du JSX.

## 15. Tester la galerie

Vérifier :
- toutes les réalisations accessibles ;
- grille utilisable sans carrousel obligatoire ;
- images optimisées ;
- alt utiles ;
- filtres sans état vide incompréhensible ;
- lightbox ouvrable ;
- navigation ;
- fermeture par bouton et `Escape` ;
- focus maîtrisé puis restauré ;
- rendu tactile ;
- origine des médias validée.

## 16. Tester les avis

Vérifier :
- témoignages réellement validés ;
- texte fidèle ;
- informations personnelles autorisées ;
- aucun faux score ;
- aucun faux volume ;
- aucun contenu provisoire publié ;
- accès à tous les avis sans interaction bloquante.

Si aucun avis validé n’existe, signaler le blocage produit.

## 17. Tester la FAQ

Vérifier :
- questions et réponses validées ;
- bouton pour chaque question ;
- `aria-expanded` cohérent ;
- relation contrôle-contenu ;
- clavier ;
- focus ;
- état ouvert et fermé ;
- contenu indexable ;
- aucun renseignement inventé.

## 18. Tester Réserver et Contact

Vérifier :
- parcours explicite vers WhatsApp ;
- aucune confirmation automatique ;
- aucun formulaire ;
- aucun calendrier ;
- aucun paiement ;
- téléphone cliquable ;
- réseaux uniquement avec URL validée ;
- aucune adresse ou zone fictive ;
- CTA principal identifiable.

## 19. Tester le responsive

Contrôler au minimum :

| Profil | Viewport |
| --- | --- |
| Petit mobile | `320 × 568` |
| Mobile courant | `390 × 844` |
| Tablette | `768 × 1024` |
| Desktop | `1440 × 900` |

À chaque point :
- aucun scroll horizontal ;
- texte non coupé ;
- CTA non masqué ;
- navigation adaptée ;
- galerie sans chevauchement ;
- images correctement cadrées ;
- zones tactiles utilisables ;
- rythme et hiérarchie conservés.

Tester aussi zoom `200 %` et paysage mobile lors de la revue manuelle.

## 20. Couvrir les navigateurs

Pour la boucle rapide, Chromium peut suffire.

Avant livraison, exécuter les parcours critiques sur :
- Chromium ;
- Firefox ;
- WebKit ;
- profil mobile tactile.

Signaler tout navigateur non vérifié.

## 21. Automatiser l’accessibilité

Scanner avec `@axe-core/playwright` :
- page chargée ;
- menu mobile ouvert ;
- FAQ ouverte ;
- lightbox ouverte ;
- tout nouvel état interactif.

Ne pas désactiver globalement une règle axe.

Toute exclusion doit être ciblée, expliquée et suivie.

Un scan sans violation ne prouve pas l’accessibilité complète.

## 22. Vérifier manuellement l’accessibilité

Contrôler :
- lien d’évitement ;
- structure des titres ;
- landmarks ;
- ordre de focus ;
- focus visible ;
- clavier complet ;
- noms accessibles ;
- alternatives des images ;
- contraste ;
- zoom `200 %` ;
- mouvement réduit ;
- compréhension sans couleur seule ;
- lecteur d’écran disponible.

Signaler le lecteur d’écran et le navigateur utilisés.

## 23. Contrôler le visuel

Comparer au design validé :
- page mobile ;
- page desktop ;
- Hero ;
- galerie ;
- menu mobile ouvert ;
- FAQ ouverte ;
- tout composant modifié.

Stabiliser les captures :
- viewport fixe ;
- polices et images chargées ;
- animations désactivées ou figées ;
- données stables ;
- même plateforme lorsque comparée.

Ne pas accepter automatiquement une nouvelle capture de référence.

## 24. Vérifier console et réseau

Rechercher :
- erreur JavaScript ;
- avertissement React ;
- erreur d’hydratation ;
- ressource interne `4xx` ou `5xx` ;
- image cassée ;
- police manquante ;
- requête inattendue ;
- tracker ou script tiers ;
- secret ou donnée sensible.

Un site visuellement correct avec erreurs console n’est pas validé.

## 25. Tester les états dégradés

Vérifier selon la fonctionnalité :
- image manquante ;
- collection vide ;
- texte long ;
- animation désactivée ;
- JavaScript désactivé pour les liens ;
- ouverture et fermeture répétées ;
- navigation rapide ;
- focus après fermeture ;
- contenu absent ;
- ressource lente.

Le fallback doit rester compréhensible et utilisable.

## 26. Écrire un test de régression

Lorsqu’un bug est corrigé :
1. reproduire le défaut ;
2. écrire un test qui échoue pour la cause observée ;
3. appliquer ou vérifier le correctif ;
4. confirmer que le test passe ;
5. relancer le parcours voisin ;
6. documenter la preuve.

Ne pas écrire un test qui valide seulement l’implémentation du correctif.

## 27. Protéger l’intégrité des tests

Ne jamais :
- supprimer un test pour obtenir du vert ;
- utiliser `.skip` sans décision ;
- affaiblir une assertion ;
- augmenter les retries pour masquer une instabilité ;
- utiliser `waitForTimeout` comme synchronisation ;
- mettre à jour un snapshot sans revue ;
- mocker le comportement à prouver ;
- ignorer types, lint, sécurité ou accessibilité.

Un test instable doit être diagnostiqué.

## 28. Gérer les échecs

Pour un échec :
1. conserver la sortie utile ;
2. identifier le premier échec ;
3. reproduire avec la commande la plus petite ;
4. distinguer défaut produit, test et environnement ;
5. localiser la cause ;
6. relancer ciblé ;
7. élargir seulement après réussite.

Ne pas modifier plusieurs éléments au hasard.

## 29. Donner un verdict

Utiliser :
- **GO** : aucun défaut bloquant, critères vérifiés ;
- **GO sous conditions** : limites précises et non critiques ;
- **NO-GO** : défaut critique ou majeur, preuve insuffisante ;
- **NON VÉRIFIABLE** : environnement ou accès manquant.

Ne pas convertir une absence de preuve en GO.

## 30. Rédiger le rapport

Utiliser :

```md
# Rapport QA — [Nom]
## Périmètre
## Environnement
## Contrôles exécutés
## Résultats
## Défauts
## Responsive et navigateurs
## Accessibilité
## Console et réseau
## Non vérifié
## Risques restants
## Verdict
```

Pour chaque défaut :

```md
### [Sévérité] Titre
- Précondition :
- Étapes :
- Résultat observé :
- Résultat attendu :
- Preuve :
- Impact :
```

## 31. Definition of Done QA

La QA est terminée lorsque :
- critères d’acceptation reliés à des preuves ;
- invariants métier vérifiés ;
- tests adaptés au risque exécutés ;
- lint, types, tests et build documentés ;
- parcours navigation, WhatsApp et téléphone vérifiés ;
- viewports critiques contrôlés ;
- accessibilité automatique et manuelle pertinente réalisée ;
- console et réseau inspectés ;
- aucun test affaibli ;
- défauts classés et reproductibles ;
- limites signalées ;
- verdict justifié.
