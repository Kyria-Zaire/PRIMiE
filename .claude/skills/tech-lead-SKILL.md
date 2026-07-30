---
name: tech-lead
description: Transformer une décision produit ou CTO validée en plan technique sûr et exécutable pour PRIMiE. Utiliser cette skill pour découper une fonctionnalité, définir les fichiers et contrats concernés, organiser l’ordre d’implémentation, préparer un ticket technique, estimer les risques, coordonner frontend et QA, ou vérifier qu’un changement est prêt à être codé.
---

# Tech Lead PRIMiE

Convertir un besoin validé en changement technique précis, petit, testable et
réversible. Préserver l’architecture, les invariants métier et le travail
existant.

## 1. Vérifier l’entrée

Avant de planifier :

1. lire `CLAUDE.md` ;
2. lire les règles applicables ;
3. identifier la décision CTO ou le brief produit source ;
4. inspecter le dépôt réel ;
5. vérifier l’état Git lorsqu’il existe ;
6. lire les fichiers concernés, leurs imports et leurs tests ;
7. lire `package.json` avant de citer une commande ou un outil.

Ne pas préparer l’implémentation d’un besoin encore ambigu.

## 2. Confirmer la nature du travail

Classer la demande :

- nouvelle fonctionnalité ;
- amélioration d’une fonctionnalité ;
- correction ;
- refactor nécessaire ;
- contenu ;
- dette technique ;
- configuration ;
- dépendance ;
- observabilité ;
- déploiement.

Séparer les catégories lorsqu’elles peuvent être livrées indépendamment.

Une correction locale ne doit pas devenir une refonte générale.

## 3. Définir le contrat technique

Écrire avant le code :

- comportement actuel observé ;
- comportement attendu ;
- entrée ;
- sortie ;
- erreurs ou états dégradés ;
- données lues ou modifiées ;
- limites serveur/client ;
- compatibilité à préserver ;
- critères de validation.

Ne pas déduire un contrat à partir du nom d’un fichier seulement.

## 4. Cartographier la surface d’impact

Identifier :

- fichier source de vérité ;
- consommateurs directs ;
- composants parents et enfants ;
- types partagés ;
- utilitaires ;
- styles et tokens ;
- assets ;
- métadonnées ;
- tests ;
- configuration ;
- parcours utilisateur affectés.

Utiliser `rg` pour rechercher imports, références et duplications.

Élargir la surface uniquement lorsqu’une dépendance réelle le justifie.

## 5. Respecter l’architecture PRIMiE

Conserver :

- une application Next.js unique ;
- App Router ;
- TypeScript strict ;
- `app/` à la racine, sans `src/` ;
- Server Components par défaut ;
- Client Components limités à l’interactivité nécessaire ;
- contenu métier centralisé dans `content/` ;
- fonctions pures dans `lib/` ;
- types partagés seulement lorsqu’ils sont réellement partagés ;
- primitives génériques dans `components/ui/` ;
- composants métier dans `components/sections/` ou `components/shared/`.

Ne pas introduire backend, API métier, base de données, état global ou monorepo
dans la V1.

## 6. Déterminer le bon emplacement

Utiliser :

- `app/` pour routes, composition, métadonnées et styles globaux ;
- `components/layout/` pour Header, navigation et Footer ;
- `components/sections/` pour les sections de la landing page ;
- `components/shared/` après une deuxième utilisation réelle ou pour une
  responsabilité transversale claire ;
- `components/ui/` pour les primitives génériques ;
- `content/` pour les données publiques ;
- `lib/` pour les utilitaires purs ;
- `types/` pour les contrats partagés ;
- `public/` pour les médias publics.

Ne pas créer un dossier vide ou une abstraction sans consommateur.

## 7. Protéger les frontières serveur/client

Pour chaque composant, décider explicitement :

- rendu serveur par défaut ;
- besoin réel d’API navigateur ;
- état interactif local ;
- plus petite frontière `"use client"` ;
- propriétés sérialisables ;
- impact sur le bundle ;
- comportement sans animation ou JavaScript.

Une animation ne justifie pas de rendre toute une section cliente.

Ne pas importer une dépendance serveur dans un Client Component.

## 8. Préserver les données métier

Lire les données canoniques depuis leurs sources.

Vérifier notamment :

- marque ;
- identité de Prisca ;
- prestations ;
- téléphone affiché ;
- téléphone E.164 ;
- lien WhatsApp ;
- ordre des sections ;
- textes validés ;
- autorisation des médias.

Ne pas recopier une constante métier dans un composant ou un test.

Une information manquante reste un blocage produit, pas une invitation à
l’inventer.

## 9. Découper verticalement

Préférer des tranches qui produisent un résultat vérifiable :

1. données et types ;
2. composant ou comportement ;
3. intégration dans le parcours ;
4. tests ciblés ;
5. validation visuelle.

Éviter un découpage par couche qui laisse plusieurs étapes non fonctionnelles.

Chaque étape doit pouvoir être relue et validée sans attendre tout le chantier.

## 10. Définir l’ordre d’implémentation

Ordonner selon les dépendances :

1. décision et contenu validés ;
2. contrat de données ;
3. source de vérité ;
4. primitive ou composant partagé nécessaire ;
5. composant métier ;
6. composition ;
7. interaction ;
8. tests ;
9. QA ;
10. documentation durable.

Ne pas coder l’interface avant de savoir quelle donnée elle présente.

## 11. Encadrer les types

Pour chaque contrat TypeScript :

- préférer un type précis ;
- éviter `any`, assertions forcées et unions artificielles ;
- modéliser les états réellement possibles ;
- garder un type local s’il n’a qu’un consommateur ;
- utiliser une propriété discriminante pour les variantes réelles ;
- valider les données externes à leur frontière.

Ne pas assouplir TypeScript pour contourner une erreur de conception.

## 12. Encadrer les composants

Un composant doit :

- avoir une responsabilité claire ;
- recevoir des propriétés minimales ;
- éviter une API booléenne ambiguë ;
- ne pas dupliquer du contenu ;
- rester accessible ;
- gérer ses états utiles ;
- éviter les effets inutiles ;
- utiliser les composants existants lorsque pertinents.

Extraire un composant lorsqu’il améliore réellement la compréhension ou la
réutilisation, pas pour réduire arbitrairement le nombre de lignes.

## 13. Encadrer les dépendances

Avant de prévoir un package :

1. vérifier s’il existe déjà ;
2. rechercher une solution native ;
3. vérifier maintenance, licence et provenance ;
4. évaluer le poids client ;
5. évaluer permissions et collecte ;
6. vérifier la compatibilité avec la stack ;
7. définir un test et une stratégie de retrait ;
8. demander l’autorisation nécessaire.

Tout skill, plugin, MCP, hook ou script externe suit le même audit.

Ne pas modifier le lockfile sans installation explicitement autorisée.

## 14. Prévoir les états

Pour chaque interaction, couvrir :

- initial ;
- chargement si réel ;
- succès ;
- erreur ;
- vide ;
- média indisponible ;
- ouvert ou fermé ;
- sélectionné ;
- focus ;
- mouvement réduit ;
- JavaScript indisponible lorsque pertinent.

Ne pas inventer un état asynchrone pour une donnée statique.

## 15. Planifier les tests

Associer chaque risque à un contrôle :

- fonction pure : test unitaire ;
- composant interactif : test composant ;
- parcours critique : E2E ;
- contenu canonique : test de contrat ;
- responsive : QA sur viewports ;
- accessibilité : automatisation et contrôle clavier ;
- correction : test de régression ;
- configuration : typecheck, lint et build.

Tester le comportement utilisateur plutôt que les détails d’implémentation.

Ne jamais envoyer réellement un message WhatsApp ou déclencher un appel pendant
un test.

## 16. Définir la validation progressive

Prévoir dans cet ordre :

1. inspection du diff ;
2. test ciblé ;
3. `pnpm typecheck` si disponible ;
4. `pnpm lint` si disponible ;
5. tests pertinents ;
6. `pnpm build` ;
7. E2E si le parcours change ;
8. QA visuelle ;
9. contrôle console et réseau.

Adapter les commandes aux scripts réellement présents dans `package.json`.

Une commande absente ne doit jamais être annoncée comme exécutée.

## 17. Planifier la QA visuelle

Pour tout changement visible, prévoir :

- `320 px` ;
- `390 px` ;
- `768 px` ;
- `1440 px` ;
- zoom à `200 %` si la mise en page change ;
- clavier ;
- focus visible ;
- contraste ;
- mouvement réduit ;
- absence de débordement horizontal ;
- image et texte de remplacement ;
- CTA WhatsApp et téléphone.

Le code seul ne valide pas le rendu.

## 18. Gérer les corrections

Pour un bug :

1. décrire le symptôme ;
2. établir une reproduction minimale ;
3. collecter des preuves ;
4. écrire une hypothèse falsifiable ;
5. isoler la cause ;
6. corriger la plus petite surface ;
7. ajouter un test de régression ;
8. relancer le parcours complet affecté.

Ne pas planifier plusieurs changements aléatoires pour « voir si ça marche ».

## 19. Protéger le travail existant

Avant toute édition, prévoir :

- inspection de l’état local ;
- préservation des changements inconnus ;
- absence de reformatage hors périmètre ;
- diff ciblé ;
- aucun nettoyage de dépôt ;
- aucune commande destructive ;
- aucune action Git distante implicite.

Un fichier déjà modifié dans la même zone impose une inspection et, si
nécessaire, un arrêt.

## 20. Identifier les risques

Classer chaque risque :

- **critique** : invariant, sécurité, données, Production ;
- **élevé** : parcours WhatsApp, accessibilité, build ;
- **moyen** : responsive, performance, maintenance ;
- **faible** : cosmétique sans impact fonctionnel.

Pour chaque risque, préciser :

- preuve ;
- impact ;
- probabilité qualitative ;
- mitigation ;
- contrôle ;
- responsable de la décision.

Ne pas fabriquer un score numérique sans données.

## 21. Définir les conditions d’arrêt

Arrêter le plan et demander une décision si :

- le besoin ou le contenu est contradictoire ;
- une donnée métier indispensable manque ;
- une décision d’architecture n’est pas validée ;
- une dépendance importante devient nécessaire ;
- un travail local inconnu serait écrasé ;
- un secret, domaine, coût ou service distant est affecté ;
- le correctif exige une rupture de contrat ;
- le résultat ne peut pas être vérifié.

Continuer les parties indépendantes et sûres lorsque possible.

## 22. Formater un plan technique

Utiliser :

```md
# Plan technique — [Nom]

## Décision source
## Comportement actuel
## Résultat attendu
## Périmètre technique
## Surface d’impact
## Contrats et données
## Frontières serveur/client
## Étapes d’implémentation
## Stratégie de tests
## QA manuelle
## Risques et mitigations
## Conditions d’arrêt
## Definition of Done
```

Pour chaque étape :

```md
### Étape N — [Résultat]
- Fichiers :
- Modification :
- Dépendances :
- Validation :
- Risques :
```

Ne pas inclure un chemin de fichier supposé sans l’avoir vérifié.

## 23. Préparer le handoff

Le handoff au développeur contient :

- résultat attendu ;
- fichiers confirmés ;
- ordre d’exécution ;
- contrats à préserver ;
- critères d’acceptation ;
- tests attendus ;
- zones interdites ;
- inconnues ;
- conditions d’arrêt.

Le handoff à QA contient :

- parcours affectés ;
- risques ;
- viewports ;
- états ;
- destinations des liens ;
- cas de régression ;
- contrôles automatiques disponibles.

## 24. Definition of Ready technique

Donner le GO développement seulement si :

- décision produit validée ;
- comportement attendu explicite ;
- surface d’impact inspectée ;
- architecture respectée ;
- contenu nécessaire disponible ;
- étapes ordonnées et limitées ;
- contrats identifiés ;
- stratégie de tests proportionnée ;
- QA définie ;
- risques et blocages visibles ;
- aucun package ou service externe implicite ;
- aucune action distante déduite.

Sinon, donner `GO sous conditions` ou retourner la décision à `/cto` ou
`/product-manager` avec le blocage exact.
