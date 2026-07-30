---
name: feature-development
description: Piloter une fonctionnalité PRIMiE de bout en bout, depuis la compréhension du besoin jusqu’à l’implémentation vérifiée. Utiliser cette skill pour ajouter ou modifier un comportement, une section, un composant, un contenu structuré ou un parcours transversal nécessitant découverte, cadrage, analyse d’impact, design gate, planification, développement, tests, QA et compte rendu sans régression.
---
# Feature Development PRIMiE
Livrer le plus petit changement complet qui répond au besoin utilisateur, respecte
la V1 et préserve tous les invariants du projet.
Ne pas confondre vitesse de génération et vitesse de livraison fiable.

## 1. Charger le contexte minimal
Avant d’agir :
1. lire `CLAUDE.md` ;
2. lire les règles spécialisées liées aux fichiers et au besoin ;
3. lire le brief, les décisions et critères existants ;
4. inspecter le fichier cible, ses importateurs et ses tests ;
5. lire `package.json` avant de citer une commande ou dépendance ;
6. inspecter l’état local et préserver tout travail inconnu ;
7. vérifier la structure réelle du dépôt.
Utiliser `rg --files` et `rg` pour localiser les sources.
Ne pas supposer qu’un fichier, script, package, composant ou test existe.

## 2. Identifier le mode autorisé
Classer la demande :
| Mode | Résultat attendu | Modification autorisée |
| --- | --- | --- |
| Expliquer | réponse fondée | non |
| Auditer | constats et risques | non |
| Diagnostiquer | cause démontrée | non, sauf demande de correction |
| Planifier | plan et décisions | non |
| Modifier | changement vérifié | oui, dans le périmètre |
| Déployer | état distant modifié | uniquement avec autorisation explicite |
« Analyse », « audit » ou « qu’en pensez-vous ? » n’autorise pas une correction.
« Ajoute », « crée », « corrige » ou « implémente » autorise les fichiers utiles,
mais jamais automatiquement commit, push, merge ou déploiement.

## 3. Reformuler le résultat
Définir :
- utilisateur concerné ;
- problème à résoudre ;
- résultat observable ;
- périmètre inclus ;
- périmètre exclu ;
- critères d’acceptation ;
- données métier requises ;
- viewports ou parcours affectés ;
- risques ;
- validations nécessaires.
Une demande claire ne nécessite pas une cérémonie.
Poser une question seulement si la réponse change réellement le produit,
l’architecture, la sécurité, le contenu public ou une action distante.
Sinon, retenir l’hypothèse la plus prudente et la signaler.

## 4. Vérifier le périmètre V1
PRIMiE reste une landing page publique unique.
Ne pas introduire :
- compte ;
- authentification ;
- dashboard ;
- formulaire ;
- calendrier ;
- paiement ;
- API métier ;
- base de données ;
- CMS ;
- back-office ;
- chatbot ;
- tracking ou pixel ;
- WhatsApp Cloud API.
Si la demande exige un de ces éléments :
1. arrêter l’implémentation ;
2. expliquer l’extension de périmètre ;
3. demander un arbitrage Product Manager et CTO ;
4. reprendre seulement après décision.
Ne pas préparer silencieusement une architecture future.

## 5. Protéger les invariants
Ne jamais modifier sans validation :
- marque : `Chez PRIMiE Coiffure` ;
- graphie courte : `PRIMiE` ;
- porteuse : `Prisca` ;
- téléphone affiché : `+33 7 49 61 65 82` ;
- téléphone E.164 : `+33749616582` ;
- WhatsApp : `https://wa.me/33749616582`.
Services canoniques :
- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage
Ne pas inventer prix, durée, adresse, horaires, disponibilité, zone, avis,
certification, promotion ou politique commerciale.

## 6. Préserver l’ordre de page
Conserver :
1. Header
2. Hero
3. Services
4. Galerie — Nos réalisations
5. Pourquoi me choisir ?
6. Avis clientes
7. FAQ
8. Réserver
9. Contact
10. Footer
Une fonctionnalité locale ne doit pas réordonner ou fusionner les sections.
Toute modification de cette architecture exige une décision produit explicite.

## 7. Établir la baseline
Avant un changement non trivial, relever :
- état Git ;
- tests disponibles ;
- typecheck ;
- lint ;
- build ;
- comportement actuel ;
- erreurs préexistantes ;
- rendu actuel si la fonctionnalité est visuelle.
Adapter la baseline au risque et au temps raisonnable.
Ne pas annoncer une baseline non exécutée.
Ne pas attribuer au nouveau diff un défaut observé avant modification.

## 8. Cartographier l’impact
Identifier :
- fichiers à modifier ;
- consommateurs directs ;
- types et contenus partagés ;
- routes ou sections affectées ;
- tests concernés ;
- contrats de données ;
- comportement serveur ou client ;
- accessibilité ;
- SEO ;
- performance ;
- sécurité ;
- responsive ;
- parcours WhatsApp et téléphone.
Pour une source partagée, utiliser `rg` pour trouver tous les importateurs.
Ne pas modifier une constante centrale sans examiner ses consommateurs.

## 9. Choisir la source de vérité
Conserver :
- identité et coordonnées dans `content/site-config.ts` ;
- prestations dans la source de contenu dédiée ;
- navigation dans une configuration unique ;
- textes métier hors du JSX lorsqu’ils sont réutilisés ;
- fonctions pures dans `lib/` ;
- types partagés dans `types/` seulement s’ils ont plusieurs consommateurs ;
- assets publiables dans `public/`.
Ne pas dupliquer un fait pour simplifier localement un composant.
Ne pas créer une abstraction avant un besoin réel.

## 10. Appliquer le design gate
Avant un changement visible, consigner :
1. intention UX ;
2. structure ;
3. références de design ;
4. anti-patterns.
Préciser au minimum :
- ce que la visiteuse doit comprendre ;
- ce qu’elle doit pouvoir faire ;
- hiérarchie du contenu ;
- comportement mobile ;
- comportement desktop ;
- CTA ;
- états ;
- contraintes d’accessibilité.
Ne pas commencer une intégration visible sur la seule base de « faites quelque
chose de joli ».

## 11. Définir les critères d’acceptation
Écrire des critères observables.
Utiliser le format :
```text
Étant donné [contexte]
Quand [action ou événement]
Alors [résultat observable]
```
Couvrir selon le besoin :
- scénario nominal ;
- petit écran ;
- clavier ;
- contenu manquant ;
- état ouvert ou fermé ;
- lien produit ;
- erreur possible ;
- absence de régression.
Éviter les critères vagues comme « moderne », « fluide » ou « fonctionne bien ».

## 12. Planifier proportionnellement
Créer un plan lorsque la tâche :
- touche plusieurs fichiers ;
- traverse plusieurs couches ;
- modifie un contrat ;
- comporte une migration ;
- change un parcours critique ;
- présente une cause incertaine ;
- nécessite plusieurs validations.
Chaque étape doit produire un résultat vérifiable.
Garder une seule étape active.
Mettre à jour le plan lorsque les faits changent.
Pour un changement local évident, inspecter, modifier et vérifier directement.

## 13. Choisir la solution minimale
Comparer les options selon :
- adéquation au besoin ;
- simplicité ;
- cohérence avec l’existant ;
- accessibilité ;
- performance ;
- sécurité ;
- testabilité ;
- réversibilité ;
- coût de maintenance.
Préférer l’option qui résout complètement le besoin avec le moins de surface.
Ne pas ajouter :
- dépendance pour une fonction triviale ;
- état global pour un besoin local ;
- Client Component pour un contenu statique ;
- couche générique utilisée une fois ;
- compatibilité avec un futur hypothétique.

## 14. Respecter l’architecture frontend
Utiliser :
- `app/` pour routes, composition, métadonnées et styles globaux ;
- `components/layout/` pour Header, navigation et Footer ;
- `components/sections/` pour les sections métier ;
- `components/shared/` pour les composants transversaux PRIMiE ;
- `components/ui/` pour les primitives génériques ;
- `content/` pour les données publiques ;
- `lib/` pour la logique pure ;
- `types/` pour les types réellement partagés ;
- `public/` pour les ressources.
Server Components par défaut.
Ajouter `"use client"` uniquement à la plus petite frontière interactive.
Ne pas créer `src/` ou un monorepo.

## 15. Implémenter par incréments cohérents
Pendant l’édition :
- garder le diff centré sur la fonctionnalité ;
- respecter les conventions voisines ;
- utiliser TypeScript strict ;
- interdire `any` ;
- préserver la sémantique HTML ;
- centraliser les faits ;
- réutiliser tokens et composants ;
- supprimer uniquement le code rendu inutile par le changement ;
- ajouter le test de régression pertinent ;
- laisser les fichiers hors périmètre intacts.
Ne pas reformater une zone non concernée.
Ne pas contourner une erreur par une assertion forcée ou une règle désactivée.

## 16. Préserver le travail existant
Toute modification inconnue appartient à l’utilisatrice ou à un autre travail.
Ne jamais :
- restaurer un fichier sans demande ;
- écraser un diff existant ;
- nettoyer un dépôt sale ;
- utiliser une commande destructive sur une cible ambiguë ;
- supprimer un fichier inconnu ;
- intégrer un changement sans rapport ;
- utiliser `git reset --hard` ;
- utiliser `--force` pour masquer un problème.
Si la même zone contient un changement incompatible, arrêter et demander une
décision.

## 17. Gérer les dépendances
Avant toute installation :
1. confirmer que le besoin ne peut pas être couvert par le stack existant ;
2. identifier le package officiel ;
3. vérifier licence, maintenance, sécurité et taille ;
4. vérifier compatibilité avec les versions installées ;
5. expliquer le coût ;
6. obtenir une validation si la dépendance est significative ;
7. utiliser `pnpm`.
Ne jamais installer automatiquement un skill, plugin, script ou outil externe.
RTK reste un candidat à auditer, jamais une intégration implicite.

## 18. Construire les tests à partir des risques
Choisir le niveau le plus bas qui protège le comportement :
- typecheck pour les contrats ;
- test unitaire pour une fonction pure ;
- test composant pour une interaction isolée ;
- Playwright pour un parcours navigateur ;
- axe et revue manuelle pour l’accessibilité ;
- capture ciblée pour une régression visuelle.
Tester le comportement public, pas les détails d’implémentation.
Utiliser en priorité rôle et nom accessible.
Ne pas créer de mocks pour des fonctionnalités absentes de la V1.

## 19. Vérifier les parcours critiques
Après un changement concerné, protéger :
1. chargement de `/` ;
2. lecture du Hero ;
3. navigation par ancres ;
4. menu mobile ;
5. prestations ;
6. galerie ;
7. FAQ ;
8. CTA WhatsApp ;
9. lien téléphone ;
10. navigation clavier.
Un défaut WhatsApp, téléphone, page blanche, build ou navigation clavier est
critique.
Ne pas déclencher réellement un appel ou envoyer un message pendant les tests.

## 20. Vérifier le responsive
Pour un changement visible, contrôler au minimum :
- `320px` ;
- `390px` ;
- `768px` ;
- `1440px`.
Vérifier :
- absence de débordement horizontal ;
- ordre de lecture ;
- lisibilité ;
- cadrage des images ;
- collision du Header ;
- CTA atteignable ;
- cibles tactiles ;
- textes longs ;
- zoom à `200 %` lorsque pertinent.
Ne pas prétendre qu’un viewport a été vérifié sans l’avoir ouvert ou testé.

## 21. Vérifier l’accessibilité
Contrôler :
- un seul `h1` ;
- titres logiques ;
- landmarks ;
- lien d’évitement ;
- éléments natifs ;
- clavier ;
- focus visible et non masqué ;
- contraste ;
- alternatives d’images ;
- taille des cibles ;
- accordéon et menu ;
- mouvement réduit ;
- absence d’information par couleur seule.
Une bibliothèque accessible ne rend pas son intégration automatiquement
accessible.

## 22. Vérifier performance et SEO
Pour tout changement concerné :
- préserver les Server Components ;
- limiter JavaScript client ;
- dimensionner et optimiser les images ;
- éviter un chargement eager non essentiel ;
- maintenir titre, description et structure indexable ;
- préserver URL canonique seulement si le domaine est confirmé ;
- éviter layout shift ;
- vérifier les Core Web Vitals impactés ;
- ne pas ajouter de script tiers implicite.
Ne pas inventer un domaine, une localisation ou une donnée structurée.

## 23. Vérifier sécurité et vie privée
Contrôler :
- aucun secret dans le code ou le diff ;
- aucune donnée cliente ;
- aucun HTML non fiable injecté ;
- aucun lien utilisateur non validé ;
- aucune permission navigateur inutile ;
- aucun tracker ;
- aucune ressource externe non auditée ;
- aucune donnée personnelle dans un message WhatsApp prérempli.
La V1 ne collecte aucune donnée sur le site.
Ne pas ajouter une bannière de consentement pour un tracking inexistant.

## 24. Lancer les contrôles
Utiliser uniquement les scripts réellement présents.
Ordre recommandé :
1. test ciblé ;
2. typecheck ;
3. lint ;
4. tests utiles ;
5. build ;
6. QA visuelle ;
7. smoke test des parcours affectés.
Si un contrôle échoue :
- lire l’erreur ;
- déterminer si elle est nouvelle ;
- corriger la cause dans le périmètre ;
- relancer le contrôle pertinent ;
- signaler tout échec restant.
Ne pas supprimer ou affaiblir un test pour obtenir du vert.

## 25. Relire le diff
Avant livraison :
- relire chaque fichier modifié ;
- vérifier les imports ;
- chercher les duplications ;
- rechercher données canoniques altérées ;
- rechercher secrets et logs ;
- confirmer les fichiers inattendus ;
- vérifier qu’aucun TODO provisoire n’est livré ;
- confirmer que le diff correspond aux critères.
Un build vert ne remplace pas la relecture.

## 26. Respecter les autorisations
Ne pas effectuer sans demande explicite :
- `git add` ;
- commit ;
- push ;
- création ou merge de PR ;
- rebase ;
- déploiement ;
- modification Vercel ;
- modification de domaine ou DNS ;
- modification de variable distante ;
- envoi de message.
Une autorisation pour une action n’autorise pas automatiquement la suivante.
Résoudre précisément la cible avant toute action destructive ou distante.

## 27. Conditions d’arrêt
Arrêter et demander une décision si :
- deux sources de vérité se contredisent ;
- une donnée métier essentielle manque ;
- une extension de périmètre est requise ;
- une dépendance importante est nécessaire ;
- un travail inconnu serait écrasé ;
- une migration ou suppression est ambiguë ;
- la Production, un secret, un domaine ou un DNS est affecté ;
- les critères d’acceptation ne permettent pas de choisir correctement ;
- la correction exige d’affaiblir une protection.

## 28. Définition de terminé
Une fonctionnalité est terminée lorsque :
- besoin couvert ;
- critères satisfaits ;
- périmètre respecté ;
- invariants préservés ;
- code relu ;
- tests pertinents ajoutés ou adaptés ;
- contrôles disponibles réussis ;
- QA visuelle faite si nécessaire ;
- responsive vérifié si affecté ;
- accessibilité vérifiée si affectée ;
- parcours critiques préservés ;
- aucune action distante implicite ;
- limites restantes signalées.
« Le code est écrit » n’est pas une définition de terminé.

## 29. Compte rendu final
Terminer par :
- résultat obtenu ;
- fichiers modifiés ;
- décision technique principale ;
- contrôles exécutés et résultats ;
- QA manuelle réalisée ;
- invariants vérifiés ;
- éléments non vérifiés ;
- risques résiduels ;
- décision ou prochaine étape éventuelle.
Distinguer explicitement :
- **vérifié** ;
- **non vérifié** ;
- **bloqué**.
Ne jamais annoncer un test, build, viewport ou parcours comme réussi sans preuve.
