---
name: devops
description: Préparer, auditer ou exécuter les opérations de build, Preview, Production, domaine, rollback et monitoring de PRiMiE sur Vercel. Utiliser cette skill pour vérifier la configuration de déploiement, diagnostiquer un build, préparer une checklist, contrôler une Preview, planifier une mise en Production, analyser un incident, organiser un rollback ou définir une observabilité minimale. Toute action distante exige une autorisation explicite.
---
# DevOps PRiMiE
Rendre chaque livraison volontaire, reproductible, vérifiée, sécurisée et
réversible. Ne jamais transformer une demande de code en autorisation de
déploiement.
## 1. Charger le contexte
Avant toute opération :
- lire `.claude/rules/01-product-scope.md`, `.claude/rules/do-not-break.md` et `.claude/rules/15-deployment.md` ;
- lire les règles de déploiement, sécurité, Git, QA et monitoring ;
- identifier l’environnement ;
- inspecter le dépôt, le diff et le commit lorsque Git existe ;
- lire `package.json`, le lockfile et la configuration ;
- vérifier les versions Node et pnpm ;
- confirmer la cible Vercel et le domaine sans les deviner ;
- identifier les validations déjà réalisées.
Ne pas exposer un identifiant, secret ou URL sensible dans le rapport.
## 2. Définir l’autorité
Sans demande explicite, autoriser uniquement :
- inspection locale ;
- lecture de configuration ;
- validations locales ;
- analyse de logs accessibles ;
- préparation de checklist ;
- diagnostic ;
- vérification non destructive d’une URL déjà fournie ;
- proposition de procédure.
Interdire implicitement :
- liaison à un projet Vercel ;
- modification distante ;
- variable distante ;
- création de déploiement ;
- promotion en Production ;
- rollback ;
- modification DNS ;
- suppression de ressource ;
- activation d’un outil de monitoring ;
- commit, push ou merge.
Une autorisation pour Preview n’autorise pas Production.
## 3. Confirmer chaque action distante
Avant une écriture distante, préciser :
- action exacte ;
- projet ;
- environnement ;
- branche ou commit ;
- domaine éventuel ;
- impact ;
- risque ;
- rollback ;
- contrôles post-action.
Obtenir une confirmation explicite pour cette action précise.
Une permission ne se propage jamais à l’étape suivante.
## 4. Respecter la V1
PRiMiE V1 est une application Next.js unique sur Vercel sans :
- API métier ;
- base de données ;
- authentification ;
- paiement ;
- migration ;
- tâche planifiée ;
- stockage utilisateur ;
- backend séparé.
Ne pas créer pipeline, service, conteneur ou sauvegarde pour une capacité
absente.
## 5. Distinguer les environnements
Utiliser :
| Environnement | Usage | Exigence |
| --- | --- | --- |
| Development | travail local | valeurs locales |
| Preview | revue hébergée | configuration de test |
| Production | site public | version validée |
Une Preview peut être publique à toute personne disposant de son URL.
`noindex` ne protège pas l’accès.
Ne jamais publier de donnée confidentielle en Preview.
## 6. Préserver la source de vérité
Un déploiement doit provenir de :
- commit identifié ;
- `pnpm-lock.yaml` versionné ;
- version Node déclarée ;
- version pnpm déclarée ;
- configuration suivie ;
- variables de l’environnement ciblé.
Éviter de déployer un état local non committé.
Consigner commit, environnement, URL, date et validations.
## 7. Vérifier la configuration Vercel
Contrôler :
- Framework Preset Next.js ;
- Root Directory réelle ;
- commande d’installation pnpm ;
- `pnpm build` sauf décision contraire ;
- Output Directory géré par Next.js ;
- branche Production confirmée ;
- versions Node et pnpm cohérentes ;
- configuration non dupliquée ;
- `vercel.json` seulement si nécessaire.
Ne pas modifier le dashboard pour compenser une configuration de dépôt
incomprise.
## 8. Verrouiller le gestionnaire de paquets
Utiliser uniquement pnpm :

```text
pnpm install --frozen-lockfile
pnpm build
```

Vérifier :
- champ `packageManager` ;
- lockfile présent ;
- absence de second lockfile ;
- installation reproductible ;
- absence de changement inattendu du lockfile.
Ne jamais supprimer le lockfile pour débloquer un build.
## 9. Gérer les variables
Pour chaque variable, vérifier :
- consommateur ;
- environnement nécessaire ;
- caractère public ou secret ;
- nom documenté ;
- valeur absente du dépôt ;
- séparation Preview/Production ;
- rotation possible ;
- redéploiement requis.
`NEXT_PUBLIC_*` est visible dans le navigateur.
Téléphone et WhatsApp sont des données publiques dans `content/site-config.ts`,
pas des secrets.
Ne pas créer une variable sans consommateur.
## 10. Protéger les fichiers locaux
Ne pas committer :

```text
.vercel
.next
node_modules
.env*
```

Autoriser `.env.example` uniquement avec des valeurs factices.
Ne pas partager une sortie CLI contenant identifiants ou configuration privée.
## 11. Préparer les contrôles locaux
Exécuter selon les scripts présents :

```text
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Vérifier ensuite :
- diff compris ;
- aucun secret ;
- aucun fichier privé ;
- contenu validé ;
- téléphone exact ;
- WhatsApp exact ;
- aucune dépendance imprévue ;
- aucun TODO bloquant ;
- aucun contrôle désactivé.
Une commande absente ou échouée doit être signalée.
## 12. Diagnostiquer un build
Suivre :
1. première erreur utile ;
2. version Node ;
3. version pnpm ;
4. lockfile figé ;
5. variable manquante ;
6. casse des chemins ;
7. import ou fichier absent ;
8. TypeScript ;
9. lint ;
10. tests ;
11. configuration d’environnement.
Reproduire localement avec les mêmes paramètres lorsque possible.
Ne pas changer plusieurs variables ou relancer indéfiniment sans hypothèse.
## 13. Préparer une Preview
Avant création :
- commit ou branche identifié ;
- contrôles locaux réussis ;
- contenu publiable ;
- variables Preview confirmées ;
- absence de secret ;
- périmètre de QA défini ;
- autorisation explicite.
Une Preview sert à valider, pas à contourner le gate Production.
## 14. Contrôler la Preview
Tester l’URL réelle.
### Fonctionnel
- `/` ;
- sections et ancres ;
- menu mobile ;
- galerie ;
- FAQ ;
- 404 ;
- WhatsApp ;
- téléphone.
### Visuel
- `320 px` ;
- `390 px` ;
- `768 px` ;
- `1440 px` ;
- zoom `200 %` ;
- images et polices ;
- absence de scroll horizontal.
### Technique
- HTTPS ;
- métadonnées ;
- favicon ;
- robots ;
- sitemap ;
- headers ;
- console ;
- réseau ;
- absence de traceur inattendu ;
- performance de contrôle.
## 15. Appliquer le gate Production
Donner `NO-GO` si :
- build, lint, types ou tests échouent ;
- Preview non vérifiée ;
- téléphone ou WhatsApp incorrect ;
- secret exposé ;
- contenu non validé ;
- image ou police critique absente ;
- menu ou CTA bloqué ;
- défaut majeur d’accessibilité ;
- erreur console critique ;
- rollback inconnu ;
- cible Production ambiguë.
Documenter tout avertissement accepté.
## 16. Préparer la promotion
Avant Production :
1. identifier la Preview ;
2. confirmer le commit ;
3. confirmer les validations ;
4. confirmer les variables Production ;
5. confirmer le domaine ;
6. identifier le dernier déploiement sain ;
7. préparer les smoke tests ;
8. obtenir l’autorisation explicite.
Ne jamais exécuter `vercel --prod` ou une promotion sans ces conditions.
La version Production servie doit être testée même après promotion.
## 17. Gérer domaine et HTTPS
Ne jamais inventer le domaine.
Après configuration autorisée, vérifier :
- domaine canonique ;
- choix apex ou `www` ;
- redirection unique ;
- propagation DNS ;
- certificat ;
- HTTP vers HTTPS ;
- canonical ;
- sitemap ;
- robots ;
- métadonnées sociales.
Une écriture DNS est sensible et exige cible vérifiée et confirmation.
## 18. Exécuter le smoke test
Après un déploiement autorisé :

```text
GET /
GET /robots.txt
GET /sitemap.xml
GET /favicon.ico
```

Puis vérifier :
- statuts ;
- HTTPS et redirections ;
- titre et description ;
- sections ;
- images critiques ;
- menu mobile ;
- FAQ ;
- galerie ;
- téléphone ;
- WhatsApp ;
- console ;
- réseau ;
- headers ;
- absence de traceur ;
- au moins un vrai mobile disponible.
Ne pas ouvrir réellement WhatsApp ni déclencher un appel.
## 19. Définir l’observabilité minimale
Surveiller uniquement les signaux actionnables :
- disponibilité de `/` ;
- déploiements ;
- builds échoués ;
- erreurs JavaScript bloquantes ;
- ressources critiques cassées ;
- domaine et HTTPS ;
- téléphone et WhatsApp ;
- Core Web Vitals lorsque les données existent ;
- vulnérabilités applicables ;
- traceurs inattendus.
Ne pas ajouter analytics, pixel ou replay sous couvert de monitoring.
## 20. Contrôler la disponibilité
Une vérification utile confirme :
- réponse `200` ;
- HTTPS ;
- contenu distinctif ;
- temps raisonnable ;
- absence de boucle de redirection.
Compléter par `robots.txt`, `sitemap.xml` et `favicon.ico`.
Ne pas créer `/health` dynamique pour une landing page statique sans besoin.
## 21. Encadrer les alertes
Une alerte doit définir :
- signal ;
- seuil ;
- durée ;
- environnement ;
- sévérité ;
- destinataire ;
- première action ;
- condition de résolution.
Refuser une alerte sans destinataire ou action possible.
Corriger une alerte bruyante au lieu de l’ignorer.
Ne jamais inclure de secret dans une notification.
## 22. Interpréter les performances
Lorsque des données terrain suffisantes existent, suivre au 75e percentile :
| Métrique | Bon |
| --- | --- |
| LCP | `≤ 2,5 s` |
| INP | `≤ 200 ms` |
| CLS | `≤ 0,1` |
Segmenter mobile et desktop.
Ne pas confondre données terrain et audit Lighthouse local.
Ne pas conclure avec un échantillon insuffisant.
## 23. Classer les incidents
Utiliser :
| Niveau | Exemple | Réponse |
| --- | --- | --- |
| SEV-1 | site indisponible ou secret publié | confinement immédiat |
| SEV-2 | mauvais contact ou CTA bloqué | correction ou rollback |
| SEV-3 | image cassée ou régression limitée | correction rapide |
| SEV-4 | détail cosmétique | maintenance planifiée |
La sévérité dépend de l’impact réel.
Un défaut d’accessibilité bloquant le CTA peut être SEV-2.
## 24. Gérer un incident
Suivre :

```text
détecter → qualifier → contenir → restaurer → corriger → vérifier → apprendre
```

Étapes :
1. confirmer le signal ;
2. identifier environnement et version ;
3. mesurer l’impact ;
4. arrêter les promotions ;
5. choisir rollback ou correction ;
6. restaurer le service ;
7. vérifier les parcours ;
8. documenter la cause ;
9. ajouter une prévention.
Ne pas redéployer plusieurs versions au hasard.
## 25. Préparer un rollback
Avant :
- confirmer la version affectée ;
- identifier un déploiement sain ;
- vérifier son contenu et ses contacts ;
- confirmer l’environnement ;
- obtenir l’autorisation ;
- préparer les smoke tests.
Après :
- vérifier le site public ;
- consigner version et heure ;
- corriger la cause sur une nouvelle branche ;
- créer une nouvelle Preview ;
- ne pas réappliquer automatiquement le changement.
Un rollback ne révoque pas un secret compromis.
## 26. Gérer un incident de sécurité
Si un secret ou une donnée privée est publié :
1. limiter l’exposition ;
2. révoquer ou faire tourner le secret ;
3. retirer la version selon la procédure autorisée ;
4. vérifier les copies ;
5. corriger le dépôt ;
6. documenter sans recopier la valeur.
Escalader à `/security-reviewer`.
## 27. Maintenir les dépendances
Surveiller :
- vulnérabilités ;
- maintenance ;
- licences ;
- dépendances transitives ;
- actions CI ;
- compatibilité Node, Next.js et React.
Pour une mise à jour :
1. comprendre le besoin ;
2. vérifier l’exposition ;
3. lire les notes officielles ;
4. appliquer la plus petite version sûre ;
5. inspecter le lockfile ;
6. exécuter tests et build ;
7. valider une Preview.
Ne pas fusionner automatiquement une alerte.
## 28. Contrôler le contenu
Vérifier périodiquement :
- marque ;
- services ;
- téléphone ;
- WhatsApp ;
- CTA ;
- mentions réelles ;
- images autorisées ;
- liens ;
- orthographe ;
- cohérence responsive.
Toute modification métier vient d’une source validée.
## 29. Préserver la restauration
Pour la V1, les sources de récupération sont :
- dépôt Git ;
- historique des déploiements ;
- configuration documentée ;
- médias autorisés ;
- accès au domaine.
Il n’existe aucune base de données à sauvegarder.
Vérifier qu’une personne autorisée peut reconstruire avec le lockfile et
identifier un déploiement sain.
Ne pas stocker les secrets dans une sauvegarde documentaire.
## 30. Définir la cadence
Cadence recommandée :
| Moment | Contrôle |
| --- | --- |
| changement | lint, types et tests ciblés |
| déploiement | smoke test |
| semaine | disponibilité et liens |
| mois | dépendances, contenu, médias, performance |
| trimestre | audit accessibilité, sécurité, documentation |
Ne pas annoncer une tâche planifiée tant qu’elle n’est pas configurée.
## 31. Rédiger le rapport
Utiliser :

```md
# Rapport DevOps — [Nom]
## Périmètre
## Version et environnement
## Action autorisée
## Contrôles avant
## Action réalisée
## Contrôles après
## Incidents
## Rollback
## Non vérifié
## Risques
## Verdict
```

Ne pas recopier les secrets, identifiants internes ou logs inutiles.
## 32. Definition of Done
Une opération est terminée lorsque :
- action exacte autorisée ;
- version et environnement identifiés ;
- source reproductible ;
- lockfile et versions cohérents ;
- contrôles locaux réussis ;
- Preview validée avant Production ;
- variables confirmées sans exposition ;
- domaine et HTTPS corrects ;
- parcours critiques vérifiés ;
- console, réseau et headers contrôlés ;
- aucun traceur non approuvé ;
- rollback possible ;
- monitoring proportionné ;
- résultats consignés ;
- aucune action distante supplémentaire déduite.
