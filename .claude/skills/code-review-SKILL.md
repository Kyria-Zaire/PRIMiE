---
name: code-review
description: Réaliser une revue de code rigoureuse et en lecture seule pour PRIMiE. Utiliser cette skill pour examiner un diff local, une branche, un commit ou une pull request avant livraison, rechercher des bugs et régressions, vérifier périmètre produit, architecture, TypeScript, React, Next.js, sécurité, vie privée, accessibilité, responsive, performance, SEO, tests et gouvernance Git, puis classer les constats avec preuves et recommandations exploitables.
---
# Code Review PRIMiE
Rechercher les défauts qui peuvent casser le produit, pas les préférences
personnelles. Présenter les constats avant le résumé. Ne pas modifier le code pendant une revue sauf demande explicite distincte. Ne jamais simuler une validation humaine.
## 1. Charger le contexte
Avant la revue :
1. lire `CLAUDE.md` ;
2. lire `do-not-break.md` ;
3. lire les règles applicables aux fichiers modifiés ;
4. lire le besoin, les critères d’acceptation et décisions validées ;
5. inspecter `package.json` et les configurations concernées ;
6. inspecter l’état local ;
7. identifier exactement la cible de revue.
Utiliser `rg --files`, `rg`, `git status`, `git diff`, `git show` et `git log`
uniquement selon le contexte réel. Ne pas supposer qu’un fichier, test, script, package ou exigence existe.
## 2. Rester en lecture seule
Une demande de revue autorise :
- lecture de fichiers ;
- inspection Git ;
- commandes non destructives ;
- typecheck, lint, tests et build ;
- reproduction locale ;
- QA visuelle ;
- rapport de constats.
Elle n’autorise pas :
- modification ;
- formatage ;
- installation ;
- indexation ;
- commit ;
- push ;
- commentaire ou action distante ;
- merge ;
- déploiement.
Si l’utilisatrice demande ensuite les corrections, traiter cette demande comme
une phase séparée et utiliser `bug-fixing` ou `feature-development`.
## 3. Définir la cible exacte
Identifier :
- dépôt ;
- branche ou commit de base ;
- branche, commit ou diff examiné ;
- fichiers inclus ;
- fichiers exclus ;
- état indexé ou non indexé ;
- changements non suivis ;
- dépendances générées ;
- contexte de la demande.
Pour une revue de PR, comparer la bonne base au bon head. Pour des modifications locales, examiner les diffs indexés et non indexés. Ne pas mélanger un travail inconnu hors cible à la conclusion.
## 4. Lire la demande avant le diff
Déterminer :
- problème utilisateur ;
- résultat attendu ;
- périmètre autorisé ;
- critères d’acceptation ;
- contraintes ;
- parcours affectés ;
- contenu validé ;
- risque annoncé ;
- validation revendiquée.
Un diff techniquement correct peut rester faux s’il ne répond pas au besoin. Ne pas deviner l’intention à partir du code lorsque le brief existe.
## 5. Cartographier le changement
Produire une carte mentale concise :
- fichiers ajoutés ;
- fichiers modifiés ;
- fichiers supprimés ;
- contrats changés ;
- composants touchés ;
- contenu touché ;
- frontière serveur/client ;
- dépendances ;
- configuration ;
- tests ;
- assets ;
- effets sur build et déploiement.
Utiliser `rg` pour trouver importateurs et consommateurs d’une source partagée. Ne pas limiter la revue aux lignes modifiées si leur effet traverse le dépôt.
## 6. Examiner le diff avant le code complet
Lire :
1. résumé du diff ;
2. diff complet ;
3. fichiers entiers concernés ;
4. consommateurs ;
5. tests ;
6. règles et configuration.
Chercher immédiatement :
- changement hors périmètre ;
- suppression inattendue ;
- code généré massif ;
- lockfile ;
- secret ;
- donnée canonique modifiée ;
- contrôle désactivé ;
- TODO ou log temporaire.
Ne pas conclure à partir du diff seul si le contexte local change le sens.
## 7. Classer les constats
Utiliser :
| Priorité | Signification |
| --- | --- |
| P0 — Bloquant | sécurité critique, perte de donnée, production ou parcours vital inutilisable |
| P1 — Majeur | bug utilisateur certain, build cassé, WhatsApp ou téléphone incorrect |
| P2 — Important | régression probable, accessibilité ou performance significative |
| P3 — Mineur | défaut réel mais impact limité |
Une préférence de style n’est pas un finding. Une amélioration facultative appartient aux suggestions, pas aux blocages. Classer selon impact et probabilité, pas selon difficulté de correction.
## 8. Exiger un scénario de rupture
Chaque finding doit répondre :
- que se passe-t-il ?
- dans quelles conditions ?
- qui est affecté ?
- pourquoi le diff le provoque-t-il ?
- quel contrat est violé ?
- quelle correction minimale est attendue ?
Ne pas signaler une possibilité théorique sans chemin d’exécution plausible. Ne pas affirmer qu’un comportement casse si le code voisin le protège.
## 9. Utiliser un format de finding précis
Format :
```md
[P1] Titre impératif et spécifique
Fichier et zone concernée. Scénario reproductible ou condition. Impact utilisateur ou technique. Preuve observée dans le code ou un contrôle. Correction attendue sans réécrire la solution complète.
```
Garder chaque finding autonome. Éviter le ton accusatoire et les longs extraits. Regrouper les occurrences d’une même cause racine.
## 10. Prévenir les faux positifs
Avant de publier un finding :
1. relire le code complet ;
2. chercher une protection existante ;
3. vérifier version et configuration ;
4. reproduire si raisonnable ;
5. vérifier le test concerné ;
6. distinguer fait et hypothèse ;
7. confirmer l’impact. Écrire « risque » ou « hypothèse » si la preuve reste incomplète.
Retirer un finding réfuté. Ne pas remplir le rapport pour donner l’impression d’une revue approfondie.
## 11. Vérifier les invariants métier
Contrôler :
```text
Marque : Chez PRIMiE Coiffure
Graphie : PRIMiE
Porteuse : Prisca
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```
Services exacts :
- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage
Signaler toute duplication ou divergence susceptible de créer deux sources de
vérité. Ne pas valider un prix, horaire, adresse, avis ou autre fait non confirmé.
## 12. Vérifier le périmètre produit
PRIMiE V1 est une landing page publique unique. Signaler tout ajout implicite de :
- authentification ;
- compte ;
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
Vérifier l’ordre :
Header, Hero, Services, Galerie, Pourquoi me choisir, Avis clientes, FAQ,
Réserver, Contact, Footer. Une anticipation « pour plus tard » sans décision reste hors périmètre.
## 13. Vérifier l’architecture
Contrôler les responsabilités :
- `app/` : routes, composition, métadonnées, styles globaux ;
- `components/layout/` : Header, navigation, Footer ;
- `components/sections/` : sections métier ;
- `components/shared/` : éléments transversaux PRIMiE ;
- `components/ui/` : primitives génériques ;
- `content/` : données publiques ;
- `lib/` : fonctions pures ;
- `types/` : contrats réellement partagés ;
- `public/` : assets.
Signaler :
- dépendance inversée ;
- import circulaire ;
- composant géant ;
- source de vérité dupliquée ;
- abstraction prématurée ;
- logique métier dans une primitive UI ;
- `src/` ou monorepo non validé.
## 14. Vérifier TypeScript
Rechercher :
- `any` ;
- `@ts-ignore` ;
- `@ts-nocheck` ;
- double assertion ;
- assertion non nulle non démontrée ;
- union affaiblie ;
- prop incorrectement optionnelle ;
- entrée externe non validée ;
- type dupliqué ;
- branche non exhaustive ;
- retour ambigu ;
- `tsconfig` affaibli.
Vérifier le contrat source, pas seulement l’endroit où l’erreur apparaît. Une compilation réussie ne garantit pas un modèle correct.
## 15. Vérifier React et Next.js
Contrôler :
- Server Components par défaut ;
- `"use client"` minimal ;
- props sérialisables ;
- absence d’import serveur côté client ;
- hooks utilisés légalement ;
- état non dérivable ;
- effets réellement nécessaires ;
- cleanup ;
- clés stables ;
- HTML valide ;
- images avec `next/image` lorsque pertinent ;
- `next/link` réservé à la navigation interne ;
- métadonnées App Router ;
- absence de route API inutile.
Signaler une frontière cliente élargie qui augmente le bundle ou casse le rendu
serveur.
## 16. Vérifier la logique et les états
Examiner :
- cas nominal ;
- valeur absente ;
- liste vide ;
- texte long ;
- état initial ;
- interaction répétée ;
- ouverture et fermeture ;
- erreurs ;
- fallback ;
- concurrence éventuelle ;
- ordre des événements ;
- cleanup ;
- environnement sans JavaScript si pertinent.
Rechercher les branches impossibles, les succès fictifs et les erreurs avalées. Ne pas demander des états serveur à une V1 qui n’en possède pas.
## 17. Vérifier composants et design system
Contrôler :
- responsabilité unique ;
- props minimales ;
- variantes intentionnelles ;
- tokens sémantiques ;
- absence de valeurs brutes répétées ;
- composition lisible ;
- CTA réel ;
- cibles tactiles ;
- états focus, hover, actif et ouvert ;
- cohérence noir, doré, beige et crème.
Signaler :
- bouton réalisé avec `div` ;
- lien sans `href` ;
- icône sans nom accessible ;
- styles globaux pour un défaut local ;
- `!important` injustifié ;
- esthétique générique ou effet qui gêne le contenu.
Ne pas transformer une divergence cosmétique sans contrat en P1.
## 18. Vérifier le responsive
Évaluer :
- `320px` ;
- `390px` ;
- `768px` ;
- `1440px` ;
- zoom à `200 %` lorsque pertinent ;
- textes longs ;
- images ;
- navigation ;
- zones tactiles ;
- débordement horizontal.
Inspecter grid, flex, min-width, overflow, positionnement et breakpoints. Un rendu desktop correct ne valide pas mobile. Un finding visuel doit préciser le viewport et le scénario.
## 19. Vérifier l’accessibilité
Viser WCAG 2.2 AA. Contrôler :
- un seul `h1` ;
- hiérarchie de titres ;
- landmarks ;
- lien d’évitement ;
- ordre DOM ;
- clavier ;
- focus visible et non masqué ;
- `Escape` ;
- sémantique native ;
- nom accessible ;
- contraste ;
- taille des cibles ;
- alternatives d’images ;
- mouvement réduit ;
- information non fondée sur la couleur seule.
Ne pas considérer une primitive accessible comme preuve que son intégration
l’est. Classer comme important tout blocage clavier sur un parcours principal.
## 20. Vérifier sécurité et vie privée
Rechercher :
- secret ou valeur sensible ;
- `.env` réel ;
- donnée personnelle ;
- `dangerouslySetInnerHTML` non maîtrisé ;
- URL construite avec une entrée non validée ;
- redirection ouverte ;
- ressource ou script tiers ;
- télémétrie implicite ;
- log sensible ;
- permission navigateur inutile ;
- header ou CSP affaibli ;
- dépendance suspecte.
La V1 ne collecte aucune donnée sur le site. Un secret exposé impose un arrêt, une rotation et une analyse d’impact. Ne pas recopier la valeur sensible dans le finding.
## 21. Vérifier WhatsApp et téléphone
Contrôler les `href` produits :
```text
https://wa.me/33749616582
tel:+33749616582
```
Vérifier :
- source canonique ;
- format ;
- message validé ;
- encodage ;
- absence de donnée personnelle ;
- libellé ;
- focus ;
- clavier ;
- cibles tactiles ;
- absence d’envoi automatique.
Ne pas ouvrir réellement un appel ou envoyer un message dans un test. Une mauvaise destination est P1 au minimum.
## 22. Vérifier contenu et images
Pour le contenu :
- vouvoiement ;
- graphie `PRIMiE` ;
- ton élégant, chaleureux et professionnel ;
- aucune promesse ou donnée inventée ;
- texte centralisé lorsque réutilisé.
Pour les images :
- statut `realization`, `illustration`, `brand` ou `decorative` ;
- droit et provenance ;
- cadrage ;
- dimensions ;
- format ;
- optimisation ;
- texte alternatif ;
- absence de métadonnée privée.
Une image IA ou de stock présentée comme réalisation est un défaut majeur de
crédibilité.
## 23. Vérifier performance
Rechercher :
- Client Component inutile ;
- JavaScript excessif ;
- dépendance lourde ;
- rendu bloquant ;
- image non dimensionnée ;
- asset lourd ;
- chargement eager non essentiel ;
- police excessive ;
- layout shift ;
- animation coûteuse ;
- re-render évitable ;
- script tiers ;
- cache ou import sous-optimal.
Relier le finding à un impact plausible ou mesuré. Ne pas demander une micro-optimisation sans effet utilisateur.
## 24. Vérifier SEO
Contrôler :
- titre ;
- description ;
- `lang="fr"` ;
- un seul `h1` ;
- titres logiques ;
- contenu indexable ;
- images et alt ;
- liens valides ;
- metadata App Router ;
- sitemap et robots si concernés ;
- canonical uniquement avec domaine confirmé ;
- données structurées factuelles.
Ne pas inventer domaine, adresse, zone géographique, horaires ou avis. Le SEO ne justifie pas un contenu trompeur.
## 25. Vérifier les tests
Évaluer si les tests protègent le risque créé. Rechercher :
- absence de régression testée ;
- test d’implémentation fragile ;
- sélecteur CSS ou XPath ;
- `.skip` ;
- retries masquant un défaut ;
- `waitForTimeout` ;
- mock du comportement testé ;
- assertion affaiblie ;
- snapshot massif ;
- faux positif ;
- test non déterministe ;
- service externe réel.
Le test doit échouer si le contrat régresse. Ne pas exiger un test unitaire pour du markup statique déjà couvert utilement.
## 26. Vérifier dépendances et configuration
Pour une dépendance :
- besoin réel ;
- alternative native ;
- licence ;
- maintenance ;
- sécurité ;
- taille ;
- compatibilité ;
- scripts d’installation ;
- lockfile `pnpm`.
Pour la configuration :
- modification nécessaire ;
- portée ;
- compatibilité ;
- effet local, Preview et Production ;
- absence d’affaiblissement.
Signaler tout changement de `package.json`, lockfile, TypeScript, ESLint,
Next.js, Tailwind, Playwright ou Vercel sans justification. Tout skill, plugin ou outil externe doit être audité avant installation.
## 27. Vérifier Git et hygiène du diff
Rechercher :
- fichier sans rapport ;
- secret ;
- cache ;
- `.next/` ;
- `node_modules/` ;
- couverture ;
- rapport Playwright ;
- log ;
- média privé ;
- lockfile incohérent ;
- conflit non résolu ;
- fichier généré inattendu ;
- changement massif non expliqué.
Ne pas exécuter `git add`, commit, push, merge ou rebase. Ne pas demander un historique complexe pour une landing page simple.
## 28. Exécuter les validations pertinentes
Lire les scripts réels. Selon le diff, exécuter :
1. test ciblé ;
2. typecheck ;
3. lint ;
4. tests ;
5. build ;
6. E2E ;
7. audit accessibilité ;
8. QA visuelle ;
9. console et réseau.
Un contrôle réussi ne réfute pas automatiquement un finding comportemental. Un contrôle non exécuté doit rester explicitement non vérifié. Ne pas prétendre qu’une Preview ou Production a été testée sans accès réel.
## 29. Revoir les parcours critiques
Selon la surface, vérifier :
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
Un défaut de conversion, page blanche ou build est bloquant ou majeur. Un changement local peut avoir un effet global via une source partagée.
## 30. Donner une décision de revue
Utiliser :
- **APPROVE** : aucun finding bloquant ou majeur ;
- **COMMENT** : suggestions non bloquantes ou vérifications manquantes ;
- **REQUEST CHANGES** : au moins un finding P0 ou P1, ou contrat essentiel non
  respecté. Ne pas approuver uniquement parce que les tests passent. Ne pas demander des changements pour une préférence personnelle. Séparer la qualité du diff de l’autorisation de merge. La revue n’effectue jamais le merge.
## 31. Conditions d’arrêt
Arrêter et demander une précision si :
- base ou cible ambiguë ;
- diff incomplet ;
- règles contradictoires ;
- besoin ou contenu essentiel absent ;
- accès requis indisponible ;
- secret visible ;
- environnement nécessaire non accessible ;
- plusieurs travaux se chevauchent sans séparation possible.
Ne pas inventer le contenu manquant. Ne pas étendre la cible pour compenser un contexte insuffisant.
## 32. Format final
Présenter dans cet ordre :
```md
## Findings
### [P1] Titre
Preuve, scénario, impact et correction attendue.
## Questions
Décisions réellement nécessaires.
## Vérifications
Commandes et QA exécutées avec résultats.
## Résumé
But du diff, risque global et décision.
```
Si aucun défaut n’est trouvé, écrire clairement :
```text
Aucun finding bloquant identifié.
```
Puis signaler les limites et contrôles non exécutés. Ne pas cacher un finding au milieu du résumé.
