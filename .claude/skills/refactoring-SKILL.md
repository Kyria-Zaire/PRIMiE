---
name: refactoring
description: Restructurer le code de PRiMiE sans modifier son comportement utilisateur ni son périmètre produit. Utiliser cette skill pour réduire une complexité démontrée, supprimer une duplication, clarifier des responsabilités, centraliser une source de vérité, améliorer types, imports ou frontières Server et Client Components, déplacer ou extraire des fichiers, simplifier un état React, retirer du code mort ou préparer une évolution avec baseline, tests de caractérisation et validation anti-régression.
---
# Refactoring PRiMiE
Améliorer la structure interne sans changer le comportement observable. Refactoriser uniquement un problème démontré, avec une baseline et une surface limitée. Ne pas mélanger nettoyage, fonctionnalité et correction de bug.
## 1. Charger le contexte
Avant toute modification :
1. lire `CLAUDE.md` ;
2. lire `02-architecture.md`, `03-code-standards.md` et `do-not-break.md` ;
3. lire les règles spécialisées liées aux fichiers ;
4. inspecter le code cible, ses consommateurs et ses tests ;
5. lire `package.json`, `tsconfig.json` et les configurations concernées ;
6. inspecter l’état local ;
7. préserver tout travail inconnu.
Utiliser `rg --files` et `rg` pour localiser imports, contrats, contenus et usages. Ne pas supposer qu’un fichier, script, test, dépendance ou convention existe.
## 2. Confirmer qu’il s’agit d’un refactor
Un refactor change :
- structure ;
- nom ;
- responsabilité ;
- emplacement ;
- dépendance interne ;
- représentation de type ;
- composition ;
- organisation du style ;
- implémentation interne.
Il ne change pas :
- capacité utilisateur ;
- contenu public ;
- règle métier ;
- parcours ;
- résultat rendu ;
- API publique ;
- contrat validé ;
- comportement accessible.
Si le comportement attendu change, utiliser `feature-development`. Si le comportement actuel est défectueux, utiliser `bug-fixing`. Séparer les phases lorsqu’une évolution nécessite d’abord un refactor.
## 3. Respecter l’autorisation
Une demande d’audit ou de proposition de refactor n’autorise aucune modification. Une demande de refactor autorise uniquement les fichiers nécessaires. Elle n’autorise jamais automatiquement :
- installation ;
- changement de branche ;
- indexation ;
- commit ;
- push ;
- pull request ;
- merge ;
- déploiement ;
- modification Vercel, DNS ou environnement distant.
Une autorisation de refactor n’autorise pas un changement fonctionnel opportuniste.
## 4. Définir le problème structurel
Décrire :
- symptôme de maintenance ;
- preuve ;
- coût actuel ;
- risque ;
- fichiers concernés ;
- comportement à préserver ;
- résultat structurel attendu ;
- critère de succès ;
- validation nécessaire.
Exemples de preuves valides :
- donnée canonique dupliquée ;
- composant avec plusieurs responsabilités ;
- import circulaire ;
- frontière cliente trop haute ;
- logique pure enfermée dans le rendu ;
- état React redondant ;
- type répété ;
- style arbitraire répété ;
- code mort confirmé ;
- tests rendus difficiles par un couplage précis.
« Le code pourrait être plus propre » ne suffit pas.
## 5. Mesurer avant de décider
Utiliser les indicateurs pertinents :
- nombre d’occurrences ;
- nombre de consommateurs ;
- nombre de responsabilités ;
- taille de la frontière cliente ;
- dépendances traversées ;
- branches logiques ;
- complexité du test ;
- volume de duplication ;
- risque de divergence ;
- poids de bundle si mesuré.
Ne pas créer une métrique artificielle pour justifier une préférence. La réduction du nombre de lignes n’est pas un objectif autonome.
## 6. Protéger le périmètre V1
PRiMiE reste une landing page publique unique. Ne pas créer pendant un refactor :
- monorepo ;
- `src/` ;
- package partagé ;
- framework interne ;
- moteur de thème ;
- système de plugins ;
- CMS ;
- backend ;
- API métier ;
- base de données ;
- authentification ;
- dashboard ;
- formulaire ;
- calendrier ;
- paiement ;
- chatbot ;
- tracking.
La future réutilisation IMORIA Business Kit ne justifie pas une infrastructure sans plusieurs cas d’usage réels.
## 7. Protéger les invariants métier
Préserver exactement :
```text
Marque : Chez PRiMiE Coiffure
Graphie : PRiMiE
Porteuse : Prisca
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
Services :
- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage
Déplacer une donnée vers sa source canonique sans modifier sa valeur. Ne pas profiter d’une centralisation pour reformuler du contenu.
## 8. Préserver l’architecture de page
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
Un déplacement technique ne doit pas changer l’ordre DOM, la navigation, les ancres ou la hiérarchie de titres sans décision produit.
## 9. Établir une baseline
Avant refactor, relever selon la surface :
- état Git ;
- comportement actuel ;
- tests ciblés ;
- typecheck ;
- lint ;
- build ;
- E2E ;
- captures visuelles ;
- console ;
- réseau ;
- métriques utiles ;
- viewports.
Noter les échecs préexistants. Ne pas modifier avant de savoir quel comportement doit rester identique. Ne pas déclarer une baseline non exécutée.
## 10. Ajouter des tests de caractérisation
Lorsque le comportement n’est pas suffisamment protégé :
1. observer le comportement actuel valide ;
2. écrire un test qui le caractérise ;
3. vérifier que le test passe avant refactor ;
4. refactoriser ;
5. vérifier qu’il passe après.
Tester le contrat public, pas les détails internes à remplacer. Ne pas figer un bug connu comme comportement attendu. Si un comportement est ambigu, demander une décision avant de le caractériser.
## 11. Cartographier l’impact
Identifier :
- fichiers sources ;
- importateurs ;
- consommateurs ;
- exports ;
- types ;
- tests ;
- styles ;
- contenus ;
- Server et Client Components ;
- assets ;
- métadonnées ;
- parcours critiques.
Avant un déplacement ou renommage, rechercher chaque référence avec `rg`. Avant une suppression, démontrer l’absence d’usage direct, dynamique ou framework. Ne pas conclure qu’un fichier est mort uniquement parce qu’il n’est pas importé explicitement : vérifier les conventions Next.js.
## 12. Définir les invariants techniques
Écrire les contrats à préserver :
- exports publics ;
- signatures ;
- props ;
- types ;
- ordre de rendu ;
- HTML sémantique ;
- IDs d’ancres ;
- `href` ;
- états initiaux ;
- clavier et focus ;
- comportement responsive ;
- métadonnées ;
- poids et chargement si affectés.
Un invariant doit être vérifiable. Ne pas utiliser « même comportement » comme unique critère.
## 13. Choisir la stratégie minimale
Comparer :
- ne rien changer ;
- renommage local ;
- extraction ;
- déplacement ;
- centralisation ;
- composition ;
- suppression ;
- simplification de type ;
- réduction de frontière cliente. Évaluer :
- bénéfice ;
- surface ;
- risque ;
- testabilité ;
- réversibilité ;
- coût futur.
Préférer le plus petit changement qui traite la cause structurelle. Ne pas extraire une abstraction utilisée une seule fois sans responsabilité transversale claire.
## 14. Planifier par incréments
Pour un refactor non trivial :
1. protéger le comportement ;
2. préparer une frontière interne si nécessaire ;
3. déplacer une responsabilité ;
4. adapter les consommateurs ;
5. retirer l’ancien chemin ;
6. valider ;
7. relire le diff.
Chaque incrément doit rester compréhensible et vérifiable. Éviter un « big bang » qui mélange renommages, déplacements et réécriture. Maintenir une seule étape active.
## 15. Respecter le sens des dépendances
Conserver :
```text
app
  → components/sections et components/layout
    → components/shared et components/ui
      → lib et types

content
  → types
```
Interdire :
- `components/ui/` dépendant du métier ;
- `lib/` dépendant de React ;
- `content/` dépendant d’un composant ;
- couche basse important une couche haute ;
- import circulaire ;
- barrel export massif sans bénéfice ;
- chemin relatif profond.
Utiliser `@/` pour les imports internes conformément au projet.
## 16. Extraire un composant
Extraire lorsque :
- responsabilité visuelle identifiable ;
- interaction isolable ;
- réutilisation réelle ;
- parent réellement simplifié ;
- comportement accessible complexe à encapsuler.
Préserver :
- ordre DOM ;
- sémantique ;
- niveau de titre ;
- nom accessible ;
- focus ;
- rendu serveur ;
- styles ;
- responsive.
Ne pas créer un wrapper qui ne fait que renommer une balise. Ne pas déplacer le contenu métier dans une primitive UI.
## 17. Extraire une fonction
Extraire lorsque :
- logique pure ;
- responsabilité précise ;
- réutilisation ;
- test utile ;
- réduction de duplication réelle.
Une fonction extraite doit :
- avoir un nom métier ;
- limiter les paramètres ;
- éviter les booléens ambigus ;
- retourner un résultat prévisible ;
- ne pas muter ses entrées ;
- rester indépendante de React si placée dans `lib/`.
Ne pas transformer chaque expression en helper. Ne pas créer un dossier `utils` fourre-tout.
## 18. Centraliser le contenu
Utiliser :
- `content/site-config.ts` pour marque, téléphone et liens publics ;
- fichiers `content/` dédiés pour prestations, galerie, avantages, avis et FAQ ;
- types explicites pour les collections.
Lors d’une centralisation :
1. choisir la source canonique ;
2. confirmer les valeurs ;
3. adapter tous les consommateurs ;
4. supprimer les copies ;
5. vérifier rendu et tests.
Ne pas remplacer une valeur publique stable par une variable d’environnement. Ne pas ajouter une base de données ou un CMS pour du contenu statique.
## 19. Simplifier TypeScript
Préférer :
- union littérale ;
- union discriminée ;
- `as const` ;
- `satisfies` ;
- type local pour un usage local ;
- type partagé pour plusieurs consommateurs ;
- narrowing réel ;
- readonly lorsque pertinent.
Supprimer :
- `any` ;
- double assertion ;
- champ optionnel fictif ;
- type dupliqué ;
- assertion non nulle non démontrée ;
- enum inutile ;
- type global sans usage partagé.
Ne pas modifier le contrat métier pour simplifier le compilateur. Ne pas affaiblir `tsconfig.json`.
## 20. Simplifier React
Rechercher :
- state dérivable ;
- states synchronisés ;
- effet utilisé pour calculer ;
- memo sans mesure ;
- listener sans cleanup ;
- composant déclaré dans un composant ;
- prop drilling créé artificiellement ;
- booléens de variantes en cascade ;
- contexte ou store global inutile.
Préférer :
- calcul au rendu ;
- handler ;
- composition ;
- état local ;
- prop explicite ;
- CSS ;
- Server Component.
Valider les interactions après chaque simplification.
## 21. Réduire la frontière cliente
Pour chaque `"use client"` :
1. identifier l’API qui l’exige ;
2. isoler l’interactivité ;
3. conserver le contenu statique côté serveur ;
4. transmettre des props sérialisables ;
5. éviter un import serveur côté client ;
6. mesurer ou vérifier l’effet si significatif.
Ne pas déplacer du contenu dans un hook pour justifier le client. Ne pas casser menu, FAQ, galerie, animation ou hydratation. La réduction doit préserver clavier, focus et mouvement réduit.
## 22. Refactoriser les styles
Centraliser uniquement les conventions réelles :
- tokens ;
- variante stable ;
- espacement répété ;
- rayon ;
- rôle de couleur ;
- comportement de layout partagé. Éviter :
- valeur arbitraire répétée ;
- `!important` ;
- CSS global pour un cas local ;
- classe métier dispersée ;
- concaténation Tailwind dynamique ;
- nouvelle abstraction pour une occurrence.
Préserver le rendu aux viewports `320`, `390`, `768` et `1440 px`. Comparer avant et après pour tout changement visuel possible.
## 23. Déplacer ou renommer
Avant :
- trouver tous les imports ;
- vérifier la casse ;
- vérifier conventions Next.js ;
- vérifier tests, styles et docs ;
- prévoir l’ordre des modifications.
Après :
- rechercher l’ancien nom ;
- vérifier les nouveaux imports ;
- lancer typecheck ;
- vérifier build ;
- vérifier routes et assets concernés.
Ne pas déplacer l’application dans `src/`. Ne pas renommer un fait public ou un ID d’ancre sans besoin validé.
## 24. Supprimer du code
Supprimer seulement après avoir vérifié :
- absence de consommation ;
- absence d’usage dynamique ;
- absence de convention framework ;
- absence de référence de test ;
- absence de dépendance de build ;
- absence de valeur documentaire nécessaire ;
- remplacement complet.
Retirer :
- imports inutiles ;
- code commenté ;
- logs de debug ;
- TODO vague ;
- branche impossible ;
- abstraction devenue sans usage.
Ne pas supprimer une compatibilité ou un fallback sans connaître son contrat.
## 25. Retirer une dépendance
Avant retrait :
1. rechercher imports et appels ;
2. vérifier scripts ;
3. vérifier configuration ;
4. vérifier imports dynamiques ;
5. confirmer l’alternative ;
6. mesurer le bénéfice ;
7. utiliser `pnpm`.
Après retrait :
- vérifier `package.json` ;
- laisser `pnpm` mettre à jour le lockfile ;
- lancer build et tests ;
- rechercher les références restantes.
Ne pas modifier manuellement `pnpm-lock.yaml`. Ne pas installer un remplacement sans audit.
## 26. Séparer refactor et bugfix
Si un bug est découvert :
1. arrêter le refactor dans la zone ;
2. documenter le comportement ;
3. déterminer s’il est préexistant ;
4. revenir à la baseline du refactor sans écraser le travail ;
5. traiter le bug séparément après autorisation ;
6. reprendre seulement avec un contrat clair.
Ne pas corriger discrètement un bug en affirmant que le comportement est inchangé. Ne pas attribuer au refactor un défaut préexistant.
## 27. Préserver le travail existant
Toute modification inconnue appartient à l’utilisatrice. Ne jamais :
- restaurer ;
- écraser ;
- nettoyer le dépôt ;
- reformater hors périmètre ;
- supprimer un fichier inconnu ;
- utiliser `git reset --hard` ;
- utiliser `git clean` ;
- utiliser `--force` ;
- indexer ou publier sans demande.
Si le refactor chevauche un travail incompatible, arrêter et demander une décision.
## 28. Valider progressivement
Après chaque incrément, exécuter le contrôle le plus ciblé. À la fin, selon la surface :
1. relire le diff ;
2. test de caractérisation ;
3. tests ciblés ;
4. typecheck ;
5. lint ;
6. tests ;
7. build ;
8. E2E ;
9. QA visuelle ;
10. console et réseau.
Utiliser uniquement les scripts réellement présents. Ne pas déclarer un contrôle réussi sans exécution. Un build vert ne démontre pas seul l’absence de changement comportemental.
## 29. Vérifier les parcours critiques
Selon l’impact, préserver :
1. chargement de `/` ;
2. Hero ;
3. ancres ;
4. menu mobile ;
5. services ;
6. galerie ;
7. FAQ ;
8. `https://wa.me/33749616582` ;
9. `tel:+33749616582` ;
10. clavier et focus.
Vérifier accessibilité, responsive, SEO, performance, sécurité et vie privée pour toute surface concernée.
## 30. Relire le diff
Confirmer :
- chaque ligne sert le problème structurel ;
- comportement observable inchangé ;
- aucun contenu modifié ;
- aucune source de vérité dupliquée ;
- aucun import mort ;
- aucun fichier inattendu ;
- aucun log ou TODO temporaire ;
- aucune dépendance ajoutée ;
- TypeScript strict intact ;
- frontière cliente non élargie ;
- tests adaptés ;
- diff réversible.
Si le diff est difficile à expliquer, réduire ou découper.
## 31. Conditions d’arrêt
Arrêter et demander une décision si :
- comportement actuel ambigu ;
- test de caractérisation figerait un défaut ;
- donnée métier nécessaire absente ;
- source canonique contradictoire ;
- travail inconnu chevauché ;
- architecture publique modifiée ;
- dépendance importante nécessaire ;
- refactor transformé en fonctionnalité ;
- Production ou secret affecté ;
- suppression ou déplacement risqué sans preuve ;
- bénéfice non démontrable.
Ne pas poursuivre un refactor uniquement parce qu’il est déjà commencé.
## 32. Definition of Done
Le refactor est terminé lorsque :
- problème structurel démontré ;
- comportement à préserver défini ;
- baseline connue ;
- stratégie minimale appliquée ;
- tests de caractérisation présents si nécessaires ;
- incréments vérifiés ;
- architecture respectée ;
- invariants métier inchangés ;
- parcours critiques préservés ;
- contrôles pertinents réussis ;
- diff ciblé et réversible ;
- aucune dette involontaire ;
- limites explicites.
« Le code est plus joli » n’est pas une Definition of Done.
## 33. Compte rendu
Terminer par :
- problème initial ;
- bénéfice obtenu ;
- comportement préservé ;
- fichiers modifiés ou déplacés ;
- contrats vérifiés ;
- tests de caractérisation ;
- contrôles exécutés et résultats ;
- QA manuelle ;
- éléments non vérifiés ;
- risques ou suivi.
Distinguer **structure modifiée** et **comportement inchangé**. Ne jamais prétendre qu’un comportement est identique sans preuve adaptée.
