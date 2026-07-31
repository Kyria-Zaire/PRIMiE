# Do Not Break

## 1. Directive principale
Toute modification doit satisfaire le besoin demandé sans casser :
- les faits métier validés ;
- les parcours existants ;
- le responsive et l’accessibilité ;
- la sécurité, la vie privée, le SEO et les performances ;
- le build et les tests ;
- le travail local d’une autre personne.
« Ça compile » ne signifie pas « rien n’est cassé ».
Cette règle est globale et s’applique à tous les fichiers.

## 2. Invariants métier
Ne jamais modifier sans validation explicite :
```text
Marque : Chez PRiMiE Coiffure
Graphie courte : PRiMiE
Prénom : Prisca
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

La graphie officielle de la marque est `PRiMiE`. Toute autre casse est interdite
dans l’interface, les metadata et les contenus publics.

Services exacts :
- Tresses & coiffure femme et homme ;
- Traitement de perruque ;
- Pose perruque ;
- Look & twist ;
- Vente et pose de perruques ;
- Tissage.
Ne pas corriger, reformuler, compléter ou déduire ces informations
silencieusement.

## 3. Périmètre V1 protégé
PRiMiE est une landing page.
Ne pas ajouter implicitement :
- compte, authentification ou dashboard ;
- formulaire ou calendrier ;
- paiement ;
- API métier ou base de données ;
- espace d’administration ou CMS ;
- chatbot ou WhatsApp Cloud API ;
- analytics, pixel ou replay de session.
Toute extension exige une décision produit explicite et une nouvelle analyse de
sécurité.

## 4. Parcours critiques
Après chaque changement, préserver :
1. chargement de `/` et lecture du Hero ;
2. navigation par ancres et menu mobile ;
3. services, galerie et FAQ ;
4. ouverture de `https://wa.me/33749616582` ;
5. appel via `tel:+33749616582` ;
6. accès clavier au contenu et aux CTA.
Une régression sur téléphone ou WhatsApp est critique.
Aucun test ne doit envoyer réellement un message ou déclencher un appel.

## 5. Qualité protégée
Respecter les règles spécialisées de `.claude/rules/`.
Interdictions :
- hack CSS global pour un défaut local ;
- suppression d’un attribut ou test d’accessibilité ;
- affaiblissement d’une CSP ou d’un contrôle ;
- tracker ou script tiers implicite ;
- `"use client"` ajouté à une grande sous-arborescence ;
- image lourde, non autorisée ou sans dimensions ;
- domaine, adresse, tarif, horaire ou avis inventé ;
- changement visible sans inspection du rendu.
Les viewports critiques sont `320`, `390`, `768` et `1440 px`.

## 6. Préserver le travail existant
Avant toute édition, inspecter l’état disponible :
```bash
git status --short --branch
git diff --stat
git diff
```
Si Git n’existe pas, inspecter directement les fichiers concernés.
Toute modification inconnue appartient à l’utilisatrice ou à un autre travail.
Ne pas restaurer, écraser, supprimer, nettoyer ou reformater hors périmètre.
Avant une source partagée, rechercher importateurs, consommateurs, types, tests,
styles et effets serveur/client.

## 7. Diff, configuration et dépendances
Modifier la plus petite surface cohérente.
Préférer la source de vérité, un composant existant et un test de régression.
Ne pas mêler refactor, renommage global ou formatage massif à une petite demande.
Ne pas modifier sans nécessité démontrée :
- `package.json`, `pnpm-lock.yaml` ou `tsconfig.json` ;
- `next.config.ts`, Tailwind ou ESLint ;
- Playwright, Vitest, Vercel ou les variables d’environnement.
Toute dépendance doit être nécessaire, auditée et testée.
Ne jamais supprimer le lockfile, utiliser `--force` ou désactiver un contrôle
pour obtenir du vert.

## 8. Tests protégés
Ne jamais :
- supprimer ou ignorer un test en échec sans justification ;
- utiliser `.skip`, des retries ou `waitForTimeout` pour masquer une cause ;
- affaiblir une assertion ;
- régénérer aveuglément un snapshot ;
- ignorer TypeScript, ESLint, sécurité ou accessibilité ;
- mocker le comportement que le test doit réellement vérifier.
Un test ne change que si le contrat attendu a été explicitement validé.

## 9. Validation progressive
Après modification :
1. relire le diff ;
2. exécuter le test ciblé ;
3. lancer typecheck et lint ;
4. lancer les tests pertinents ;
5. lancer le build ;
6. exécuter les E2E si un parcours change ;
7. contrôler rendu, responsive et accessibilité si l’interface change ;
8. vérifier console et réseau.
Ne pas déclarer une validation non exécutée.
Signaler toute commande absente, impossible ou en échec.

## 10. Actions destructives et distantes
Ne jamais exécuter sans demande explicite et cible vérifiée :
```bash
git reset --hard
git clean -fd
git clean -fdx
git restore .
git checkout -- .
rm -rf
```
Ne pas supprimer en masse via glob ou variable non résolue.
Sans demande explicite, ne jamais :
- indexer, commit, amend, pull, rebase, merge ou push ;
- changer de branche, créer un tag ou une pull request ;
- modifier Vercel, DNS ou une variable distante ;
- déployer, promouvoir, rollback ou supprimer une ressource.
Une autorisation pour une action n’autorise pas la suivante.

## 11. Conditions d’arrêt
Arrêter et demander une décision si :
- deux règles ou sources se contredisent ;
- une information métier manque ;
- un travail inconnu chevauche la même zone ;
- une cible destructive est ambiguë ;
- une permission, un secret ou un accès manque ;
- une dépendance runtime importante devient nécessaire ;
- la Production, le domaine ou un service payant serait affecté ;
- le correctif impose une rupture de contrat ;
- la cause reste inconnue après diagnostic.
Ne pas combler un blocage par une hypothèse risquée.

## 12. Régression détectée
Si une modification casse un invariant :
1. arrêter l’élargissement du changement ;
2. identifier le diff responsable ;
3. préserver le travail non lié ;
4. corriger la cause ;
5. ajouter un test de régression ;
6. relancer les contrôles et le parcours complet ;
7. signaler l’incident et sa résolution.
Ne pas masquer une régression par CSS global, exception ou suppression de test.

## 13. Compte rendu obligatoire
À la fin, indiquer :
- résultat et fichiers modifiés ;
- invariants vérifiés ;
- commandes exécutées et résultats ;
- QA manuelle réalisée ;
- éléments non vérifiés ;
- risques restants.
Ne pas cacher une limite derrière « tout est bon ».

## 14. Definition of Done
Une modification est terminée lorsque :
- le besoin demandé fonctionne ;
- les invariants et le périmètre V1 sont respectés ;
- les parcours critiques restent opérationnels ;
- téléphone et WhatsApp sont exacts ;
- design, responsive et accessibilité ne régressent pas ;
- sécurité, vie privée, SEO et performance ne sont pas affaiblis ;
- le travail existant est préservé ;
- le diff est ciblé ;
- tests pertinents et build réussissent ;
- le rendu est inspecté lorsqu’il change ;
- aucune action distante n’a été déduite ;
- les limites restantes sont explicitement signalées.
