---
name: bug-fixing
description: Diagnostiquer et corriger méthodiquement un défaut dans PRiMiE à partir de preuves reproductibles. Utiliser cette skill lorsqu’un comportement, rendu, test, build, lien, composant, asset, parcours WhatsApp, responsive, accessibilité, hydratation ou environnement Development, Preview ou Production ne fonctionne pas comme attendu et qu’il faut isoler la cause racine, appliquer un correctif minimal et prévenir la régression.
---
# Bug Fixing PRiMiE
Expliquer le défaut avant de le corriger. Suivre :
```text
observer → reproduire → réduire → formuler → tester → corriger → prévenir
```
Ne pas modifier du code au hasard jusqu’à disparition du symptôme.
## 1. Charger le contexte minimal
Avant toute investigation :
1. lire `CLAUDE.md` ;
2. lire `17-debugging.md`, `do-not-break.md` et les règles spécialisées ;
3. inspecter le fichier concerné, ses consommateurs et ses tests ;
4. lire `package.json` et les versions réellement installées ;
5. inspecter l’état local et préserver les modifications inconnues ;
6. identifier l’environnement affecté ;
7. relever les messages d’erreur exacts.
Utiliser `rg --files` et `rg` pour localiser sources, imports et contrats. Ne pas supposer qu’un fichier, script, package ou comportement existe.
## 2. Respecter le mode demandé
Une demande de diagnostic autorise :
- lecture ;
- commandes non destructives ;
- reproduction locale ;
- tests ciblés ;
- inspection visuelle ;
- collecte de logs non sensibles ;
- rapport de cause.
Elle n’autorise pas :
- correction implicite ;
- refactor ;
- installation ;
- modification distante ;
- commit, push ou merge ;
- déploiement ou rollback.
Passer au correctif uniquement si l’utilisatrice demande explicitement de corriger, réparer ou résoudre.
## 3. Définir précisément le défaut
Consigner :
- comportement attendu ;
- comportement observé ;
- impact utilisateur ;
- route ;
- section ou composant ;
- action déclenchante ;
- environnement ;
- navigateur ;
- appareil ou viewport ;
- fréquence ;
- date ou version d’apparition connue ;
- message exact ;
- étapes minimales.
Ne pas traduire « ça ne marche pas » en cause supposée. Demander une précision seulement si elle empêche une reproduction utile.
## 4. Évaluer la sévérité
Classer :
| Niveau | Critère |
| --- | --- |
| Critique | page inutilisable, build cassé, WhatsApp ou téléphone incorrect, fuite de donnée |
| Majeur | parcours principal bloqué, navigation ou accessibilité fortement dégradée |
| Mineur | défaut local avec contournement simple |
| Cosmétique | écart visuel sans perte de fonction ni de compréhension |
La sévérité dépend de l’impact, pas de la taille du diff.
Prioriser sécurité, conversion, accès au contenu et build.
## 5. Protéger les invariants
Ne jamais modifier silencieusement :
- `Chez PRiMiE Coiffure` ;
- `PRiMiE` ;
- `Prisca` ;
- `+33 7 49 61 65 82` ;
- `+33749616582` ;
- `https://wa.me/33749616582`.
Services exacts :
- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage
Une donnée incorrecte se corrige dans sa source canonique après confirmation.
Ne pas inventer la valeur manquante.
## 6. Préserver la V1
Un bugfix ne doit pas introduire :
- compte ou authentification ;
- formulaire ou calendrier ;
- paiement ;
- API métier ou base de données ;
- CMS ou back-office ;
- chatbot ;
- tracking ;
- WhatsApp Cloud API.
Si le symptôme révèle un besoin produit hors périmètre, séparer le constat de la demande d’évolution et solliciter un arbitrage.
## 7. Établir une baseline
Avant correction, relever selon le risque :
- état Git ;
- comportement actuel ;
- test ciblé ;
- typecheck ;
- lint ;
- build ;
- erreurs console ;
- requêtes réseau ;
- capture visuelle ;
- viewports affectés.
Noter les erreurs préexistantes.
Ne pas attribuer au bug étudié un échec déjà présent.
Ne pas prétendre avoir établi une baseline si elle n’a pas été exécutée.
## 8. Reproduire de manière stable
Chercher la reproduction la plus courte.
Vérifier :
1. route correcte ;
2. rechargement complet ;
3. navigation interne ;
4. viewport exact ;
5. souris, tactile et clavier ;
6. navigation privée ;
7. autre navigateur pertinent ;
8. build Production local ;
9. Preview ;
10. Production si elle est signalée.
Ne pas modifier Production pour reproduire.
Si le défaut reste intermittent, documenter fréquence, préconditions et traces.
Une impossibilité de reproduire n’est pas une résolution.
## 9. Isoler la première erreur utile
Collecter uniquement les preuves pertinentes :
- première erreur console ;
- stack trace complète ;
- test minimal en échec ;
- requête réseau fautive ;
- statut et type MIME ;
- DOM rendu ;
- style calculé ;
- dimensions ;
- configuration ;
- versions ;
- trace Playwright ;
- différence entre état sain et état affecté.
Masquer :
- secrets ;
- cookies ;
- tokens ;
- valeurs d’environnement ;
- identifiants privés ;
- données personnelles.
Les erreurs en cascade ne doivent pas détourner de la première cause.
## 10. Réduire la surface
Réduire successivement :
- environnement ;
- navigateur ;
- route ;
- section ;
- composant ;
- interaction ;
- état ;
- prop ;
- fonction ;
- règle CSS ;
- asset ;
- configuration ;
- commit ou changement.
Tester une variable à la fois.
Toute instrumentation temporaire doit être locale, réversible et supprimée avant livraison.
## 11. Formuler des hypothèses falsifiables
Utiliser :
```text
Hypothèse :
Preuve attendue si vraie :
Test le moins coûteux :
Résultat :
Conclusion :
```
Prioriser :
1. explication compatible avec tous les symptômes ;
2. changement récent ;
3. donnée ou configuration réellement utilisée ;
4. hypothèse la plus simple à réfuter.
Ne pas tester plusieurs correctifs dans un même diff.
Ne pas confondre corrélation, disparition du symptôme et cause démontrée.
## 12. Différencier symptôme et cause
Exemples :
| Symptôme | Cause possible à démontrer |
| --- | --- |
| bouton inactif | élément superposé, mauvais élément HTML, état désactivé |
| image absente | chemin, casse, origine, MIME ou fichier non publié |
| layout mobile cassé | largeur minimale, grid, overflow ou texte non contraint |
| hydratation | rendu serveur différent du premier rendu client |
| test instable | temps, animation, état partagé ou dépendance externe |
| Preview seulement | variable, cache, version ou commit différent |
Ne pas appliquer ces causes comme recettes.
Chaque cause doit être confirmée dans le dépôt et l’environnement affecté.
## 13. Diagnostiquer TypeScript
Pour une erreur TypeScript :
- lire la première erreur ;
- inspecter le type source ;
- suivre les imports ;
- vérifier union, nullabilité et narrowing ;
- vérifier alias et casse ;
- distinguer erreur primaire et cascade ;
- vérifier frontière serveur/client ;
- vérifier sérialisation des props.
Interdire comme pseudo-correctifs :
- `any` ;
- `@ts-ignore` ;
- assertion forcée ;
- désactivation de `strict` ;
- option Next.js ignorant les erreurs.
Corriger le contrat ou l’usage fautif.
## 14. Diagnostiquer build et lint
Lire les scripts réels avant exécution.
Pour un build :
- utiliser la première erreur ;
- vérifier module, chemin et casse ;
- confirmer variables requises ;
- vérifier imports serveur/client ;
- reproduire avec la même version Node et `pnpm` ;
- comparer Development et build Production.
Pour lint :
- comprendre la règle ;
- corriger le code ;
- ne pas désactiver globalement ;
- ne pas reformater hors périmètre.
Ne pas supprimer le lockfile ou réinstaller au hasard.
## 15. Diagnostiquer l’hydratation
Comparer HTML serveur et premier rendu client.
Chercher :
- `Date.now()` ;
- `Math.random()` ;
- branche `typeof window` qui change le markup ;
- `localStorage` pendant le premier rendu ;
- locale variable ;
- donnée externe instable ;
- HTML invalide ;
- identifiant instable ;
- extension navigateur.
Utiliser `useId` lorsque l’identifiant accessible doit être stable.
Ne pas utiliser `suppressHydrationWarning` comme correctif générique.
Ne pas rendre toute la page cliente.
## 16. Diagnostiquer Server et Client Components
Vérifier :
- premier `"use client"` ;
- hooks ;
- gestionnaires d’événement ;
- API navigateur ;
- module serveur importé côté client ;
- données non sérialisables ;
- taille de la frontière cliente.
Déplacer l’interactivité vers le plus petit composant approprié.
Un composant statique reste serveur par défaut.
Ne pas convertir une arborescence pour faire disparaître une erreur.
## 17. Diagnostiquer le rendu responsive
Inspecter :
- box model ;
- largeur calculée ;
- `min-width` et `max-width` ;
- overflow ;
- flex et grid ;
- contraintes des enfants ;
- positionnement ;
- stacking context ;
- `z-index` ;
- héritage ;
- breakpoint actif ;
- zoom ;
- taille du texte.
Tester le viewport de reproduction et ses voisins.
Vérifier `320`, `390`, `768` et `1440 px` si le changement est transversal.
Ne pas masquer le symptôme par `overflow-hidden` global ou `z-index` extrême.
## 18. Diagnostiquer les interactions
Pour Header, menu, FAQ, galerie ou CTA, vérifier :
- élément sémantique ;
- événement ;
- état initial ;
- état après action ;
- `aria-expanded` ;
- focus ;
- fermeture avec `Escape` ;
- scroll ;
- élément superposé ;
- zone tactile ;
- comportement clavier ;
- mouvement réduit.
Tester le comportement sans souris.
Ne pas ajouter un délai fixe pour synchroniser une interaction.
## 19. Diagnostiquer les images et polices
Vérifier :
- fichier réel ;
- nom exact ;
- casse ;
- chemin depuis `public/` ;
- import ;
- statut réseau ;
- type MIME ;
- dimensions ;
- format ;
- configuration `next/image` ;
- origine distante ;
- chargement de police ;
- fallback ;
- impact CLS.
Ne pas remplacer une ressource cassée par une image aléatoire.
Préserver le statut `realization`, `illustration`, `brand` ou `decorative`.
## 20. Diagnostiquer WhatsApp et téléphone
Inspecter les valeurs réellement rendues :
```text
https://wa.me/33749616582
tel:+33749616582
```
Vérifier :
- source canonique ;
- `href` ;
- format ;
- encodage du message ;
- double encodage ;
- overlay bloquant ;
- état désactivé ;
- nom accessible ;
- clavier ;
- ouverture externe.
Ne pas déclencher réellement un appel ni envoyer un message pendant un test.
Un défaut de destination est critique.
## 21. Diagnostiquer les tests
Relancer d’abord le test seul.
Examiner :
- produit réellement cassé ;
- assertion obsolète ;
- sélecteur fragile ;
- état partagé ;
- dépendance au temps ;
- animation ;
- réseau externe ;
- différence navigateur ;
- artefact CI ;
- fixture incorrecte.
Utiliser rôle et nom accessible.
Utiliser rapport et trace Playwright lorsque pertinents.
Interdire :
- `waitForTimeout` pour masquer l’instabilité ;
- retries ajoutés sans cause ;
- `.skip` ;
- assertion affaiblie ;
- snapshot régénéré aveuglément.
## 22. Comparer les environnements
Entre local, Preview et Production, comparer :
- commit exact ;
- versions Node et `pnpm` ;
- commande de build ;
- variables présentes, sans exposer leurs valeurs ;
- cache ;
- headers ;
- domaine ;
- redirections ;
- casse des chemins ;
- fichiers publiés ;
- navigateur.
Une réussite locale ne prouve pas la Production.
Préparer un correctif reproductible et le valider en Preview.
Toute lecture ou modification distante doit respecter les accès et autorisations.
## 23. Confirmer la cause racine
Une cause est confirmée si :
- elle explique tous les symptômes pertinents ;
- une preuve observable la soutient ;
- un test ciblé l’isole ;
- le comportement change lorsque la cause est contrôlée ;
- aucune hypothèse plus simple ne reste compatible.
Si la cause n’est pas confirmée, écrire « hypothèse ».
Ne pas présenter une forte intuition comme un fait.
## 24. Concevoir le correctif minimal
Le correctif doit :
- traiter la cause racine ;
- modifier la plus petite surface cohérente ;
- préserver le comportement valide ;
- respecter l’architecture ;
- éviter une nouvelle dépendance ;
- rester testable ;
- être réversible ;
- supprimer toute instrumentation.
Séparer :
- correction urgente ;
- dette ou refactor éventuel ;
- amélioration produit.
Ne pas profiter du bug pour refaire le composant ou la page.
## 25. Préserver le travail existant
Considérer toute modification inconnue comme appartenant à l’utilisatrice.
Ne jamais :
- restaurer un fichier ;
- nettoyer le dépôt ;
- écraser un diff ;
- supprimer un fichier inconnu ;
- reformater hors périmètre ;
- utiliser `git reset --hard` ;
- utiliser `git clean` ;
- supprimer cache ou configuration sans preuve ;
- exécuter une cible destructive ambiguë.
Si la correction chevauche un travail incompatible, arrêter et demander une décision.
## 26. Ajouter un test de régression
Ajouter un test lorsque le défaut est :
- automatisable ;
- susceptible de revenir ;
- lié à un contrat ;
- causé par une interaction ;
- critique pour la conversion ;
- révélateur d’une branche non couverte.
Le test doit :
1. échouer avant le correctif ;
2. passer après ;
3. vérifier le comportement public ;
4. rester déterministe ;
5. ne pas dépendre d’un service externe.
Pour un défaut visuel, utiliser une comparaison ciblée ou une checklist reproductible.
Ne pas créer un snapshot massif sans valeur.
## 27. Valider progressivement
Après correction :
1. reproduire le scénario initial ;
2. confirmer que le défaut a disparu ;
3. exécuter le test de régression ;
4. exécuter les contrôles ciblés ;
5. lancer typecheck et lint ;
6. lancer les tests concernés ;
7. lancer le build ;
8. faire la QA visuelle ;
9. contrôler console et réseau ;
10. tester les états voisins.
Utiliser uniquement les scripts présents.
Si une validation est impossible, indiquer précisément laquelle et pourquoi.
## 28. Vérifier les parcours critiques
Selon l’impact, préserver :
1. chargement de `/` ;
2. Hero ;
3. ancres ;
4. menu mobile ;
5. services ;
6. galerie ;
7. FAQ ;
8. WhatsApp ;
9. téléphone ;
10. clavier et focus.
Vérifier responsive, accessibilité, SEO, performance, sécurité et vie privée lorsque la surface corrigée les affecte.
« Ça compile » ne signifie pas « aucune régression ».
## 29. Respecter les autorisations
Ne pas effectuer sans demande explicite :
- installation ;
- `git add` ;
- commit ;
- push ;
- pull request ;
- merge ou rebase ;
- déploiement ;
- rollback ;
- modification Vercel ;
- modification DNS ou domaine ;
- modification de variable distante.
Une autorisation pour diagnostiquer n’autorise pas à corriger.
Une autorisation pour corriger n’autorise pas à déployer.
## 30. Conditions d’arrêt
Arrêter et demander une décision si :
- le défaut ne peut pas être défini ;
- la cause reste inconnue après investigation raisonnable ;
- deux sources de vérité se contredisent ;
- une donnée métier manque ;
- un travail inconnu serait écrasé ;
- une dépendance importante paraît nécessaire ;
- le correctif rompt un contrat validé ;
- la Production ou un secret serait affecté ;
- une action destructive ou distante est ambiguë ;
- la seule option proposée affaiblit un contrôle.
## 31. Definition of Done
Le bug est résolu lorsque :
- attendu et observé sont définis ;
- reproduction initiale documentée ;
- cause racine démontrée ;
- correction ciblée ;
- test de régression pertinent ;
- scénario initial réparé ;
- états voisins vérifiés ;
- contrôles adaptés réussis ;
- instrumentation supprimée ;
- invariants préservés ;
- travail existant préservé ;
- limites restantes explicites.
Une impossibilité de reproduire ne suffit pas.
Une disparition temporaire du symptôme ne suffit pas.
## 32. Compte rendu
Terminer par :
```md
## Symptôme
Comportement observé et impact.
## Cause
Cause confirmée ou hypothèse restante.
## Preuves
Reproduction, fichiers, erreurs et tests.
## Correction
Modification réalisée ou proposée.
## Validation
Contrôles exécutés et résultats.
## Limites
Éléments non vérifiés et suivi.
```
Distinguer **observé**, **déduit**, **corrigé** et **non vérifié**.
Ne pas noyer la cause dans un journal de terminal.
