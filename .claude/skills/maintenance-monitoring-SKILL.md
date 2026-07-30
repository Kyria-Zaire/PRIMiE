---
name: maintenance-monitoring
description: Auditer, surveiller, maintenir, diagnostiquer ou restaurer PRIMiE après mise en ligne. Utiliser cette skill pour disponibilité, smoke tests, erreurs, logs, déploiements Vercel, Core Web Vitals, alertes, incidents, rollback, dépendances, vulnérabilités, domaine, DNS, HTTPS, certificat, contenu, liens, médias, reprise, rapports périodiques, confidentialité des données d’observabilité et détection de traceurs inattendus.
---
# Maintenance & Monitoring PRIMiE
Maintenir PRIMiE disponible, rapide, sécurisé, fidèle aux informations validées
et récupérable après incident. Collecter uniquement un signal exploitable, sans
transformer l’observabilité en suivi des visiteuses.

## 1. Charger le contexte
Avant toute action :
1. lire `CLAUDE.md` ;
2. lire `19-maintenance-monitoring.mdc`, `11-performance.mdc`,
   `12-security-privacy.mdc`, `15-deployment.mdc`, `17-debugging.mdc`,
   `18-documentation.mdc` et `do-not-break.mdc` ;
3. identifier environnement, version et dernier changement ;
4. inspecter configuration, CI, Vercel et outils réellement présents ;
5. relever les signaux disponibles sans supposer un service actif ;
6. vérifier l’autorisation avant toute action externe ;
7. préserver le travail local inconnu.
Utiliser `rg --files` et `rg` pour localiser configuration, scripts, traceurs,
SDK, logs, variables et documentation opérationnelle.

## 2. Respecter le mode demandé
Distinguer :
- **contrôle** : vérifier un état à un instant donné ;
- **monitoring** : suivre un signal dans le temps ;
- **audit** : inventorier sans modifier ;
- **diagnostic** : déterminer cause et impact ;
- **maintenance** : appliquer une action approuvée ;
- **incident** : restaurer un service affecté ;
- **rapport** : présenter preuves, risques et suivi ;
- **planification** : proposer une cadence sans prétendre qu’elle existe.
Un diagnostic n’autorise pas un correctif. Une alerte n’autorise pas un rollback.
Une demande de rapport n’autorise ni activation de service, ni déploiement.

## 3. Protéger le produit
Préserver :

```text
Marque : Chez PRIMiE Coiffure
Graphie courte : PRIMiE
Porteuse : Prisca
Téléphone : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
Conversion principale : conversation WhatsApp
```
La V1 reste une landing page sans formulaire, compte, calendrier, paiement,
backend, base de données, CMS, chatbot, analytics ou tracking implicite.

## 4. Distinguer monitoring et analytics

| Besoin | Finalité |
| --- | --- |
| Disponibilité | savoir si le site répond |
| Erreurs | détecter panne ou régression |
| Performance | mesurer Web Vitals et ressources |
| Déploiements | suivre build, Preview et Production |
| Analytics | comprendre audience et comportements |
Analytics, pixels et replay de session ne sont pas nécessaires au monitoring
technique. Tout outil collectant des données visiteur exige une revue sécurité,
confidentialité, consentement, rétention et transferts avant installation.

## 5. Respecter l’autorité
Dans le périmètre demandé, pouvoir :
- lire l’état public ;
- inspecter logs et métriques accessibles ;
- exécuter des contrôles non destructifs ;
- analyser une alerte ;
- préparer un rapport ou correctif ;
- proposer une procédure.
Sans demande explicite, ne pas :
- activer un service ;
- créer une alerte ou tâche planifiée ;
- installer un SDK ;
- changer une rétention ;
- accéder à des données visiteur ;
- modifier Vercel, DNS ou GitHub ;
- déployer, rollback ou supprimer.

## 6. Établir une baseline
Avant d’annoncer une dégradation, relever :
- version ;
- environnement ;
- heure ;
- région ou réseau si utile ;
- appareil et navigateur ;
- état du dernier déploiement sain ;
- métriques de référence disponibles ;
- changements récents ;
- volume et durée du signal.
Ne pas comparer Production à un test local non équivalent.

## 7. Suivre les signaux minimaux
Contrôler :
- disponibilité de `/` ;
- statut Production ;
- erreurs de build ;
- erreurs JavaScript bloquantes ;
- ressources critiques échouées ;
- domaine et HTTPS ;
- liens téléphone et WhatsApp ;
- Core Web Vitals si des données terrain existent ;
- alertes de dépendances ;
- traceurs inattendus.
Chaque signal doit être relié à une action. Supprimer une métrique que personne
ne sait interpréter ou assumer.

## 8. Contrôler la disponibilité
Utiliser `GET /` ou équivalent et vérifier :
- réponse `200` ;
- temps raisonnable ;
- contenu distinctif attendu ;
- HTTPS ;
- absence de redirection infinie.
Contrôler aussi si présents :

```text
/robots.txt
/sitemap.xml
/favicon.ico
```
Un ping réseau ne prouve pas que la page fonctionne. Ne pas créer `/health`
dynamique pour cette V1 statique sans besoin démontré.

## 9. Définir une cadence réaliste

| Moment | Contrôle |
| --- | --- |
| Chaque changement | lint, types, tests ciblés |
| Chaque déploiement | smoke test Preview ou Production |
| Hebdomadaire | disponibilité, liens critiques, alertes |
| Mensuel | dépendances, contenu, performance, médias |
| Trimestriel | accessibilité, sécurité, documentation |
Ajuster selon trafic, incidents et coûts. Ne pas annoncer un contrôle planifié
tant qu’il n’est pas réellement configuré.

## 10. Exécuter le smoke test
Après un déploiement autorisé :
1. charger `/` ;
2. vérifier les dix sections et leur ordre ;
3. ouvrir le menu mobile ;
4. tester FAQ ;
5. contrôler galerie et images ;
6. vérifier `tel:+33749616582` ;
7. vérifier `https://wa.me/33749616582` ;
8. inspecter console et réseau ;
9. vérifier HTTPS et headers ;
10. tester mobile.
Le test automatisé ne doit jamais appeler ou envoyer un message.

## 11. Contrôler le parcours critique
Vérifier :
- CTA Hero ;
- CTA Réserver ;
- lien Contact ;
- lien WhatsApp du Header ou Footer ;
- lien téléphonique ;
- libellés accessibles ;
- nouvel onglet si prévu ;
- fonctionnement clavier et tactile.
Un mauvais numéro ou CTA bloqué prime sur une régression cosmétique.

## 12. Utiliser Vercel avec prudence
Utiliser d’abord les capacités déjà disponibles :
- historique des déploiements ;
- logs de build ;
- état Production ;
- Observability selon le plan ;
- Speed Insights seulement si approuvé et activé.
Ne pas supposer une option payante disponible. Vérifier coût, limites, collecte
et rétention avant activation.
Une inspection Vercel n’autorise pas promotion, rollback ou modification des
variables.

## 13. Suivre les performances terrain
Lorsque le volume est suffisant, viser au 75e percentile :

| Métrique | Objectif |
| --- | --- |
| LCP | `≤ 2,5 s` |
| INP | `≤ 200 ms` |
| CLS | `≤ 0,1` |
Segmenter mobile et desktop. Comparer avant/après déploiement, route, appareil,
médias, scripts et polices.
Ne pas confondre données terrain et Lighthouse local. Ne pas conclure sur un
échantillon insuffisant.

## 14. Surveiller les ressources critiques
Contrôler :
- image LCP ;
- polices ;
- CSS ;
- JavaScript initial ;
- images de galerie ;
- favicon ;
- metadata et manifest si présents ;
- erreurs `404`, `5xx`, CORS ou CSP ;
- chargements tiers.
Une ressource lente mais non critique ne possède pas la même sévérité qu’un
script bloquant l’interaction.

## 15. Concevoir une alerte utile
Définir :
- signal ;
- seuil ;
- durée ;
- environnement ;
- sévérité ;
- destinataire réel ;
- première action ;
- résolution.
Éviter alerte par requête, doublons, seuil sans baseline, notification sans
destinataire, message sans action et secret dans l’alerte.
Corriger une alerte bruyante. Ne pas simplement l’ignorer.

## 16. Classer les incidents

| Niveau | Exemple PRIMiE | Réponse |
| --- | --- | --- |
| `SEV-1` | site indisponible, secret publié | confinement immédiat |
| `SEV-2` | mauvais contact, CTA bloqué | correction ou rollback prioritaire |
| `SEV-3` | image cassée, régression limitée | correction rapide |
| `SEV-4` | détail cosmétique | maintenance planifiée |
Classer selon l’impact réel. Une barrière d’accessibilité bloquant la conversion
peut être `SEV-2`.

## 17. Gérer le cycle d’incident

```text
détecter → qualifier → contenir → restaurer → corriger → vérifier → apprendre
```
1. confirmer le signal ;
2. identifier environnement et version ;
3. mesurer l’impact ;
4. arrêter les promotions ;
5. choisir correction ou rollback ;
6. restaurer ;
7. valider les parcours critiques ;
8. documenter la cause ;
9. ajouter une prévention proportionnée.
Ne pas redéployer successivement sans hypothèse.

## 18. Choisir correction ou rollback
Préférer rollback si :
- la Production est fortement dégradée ;
- une version saine est identifiée ;
- la correction est incertaine ;
- le retour arrière réduit rapidement l’impact.
Préférer correction ciblée si :
- le risque de rollback est supérieur ;
- le défaut est isolé ;
- le changement est petit et vérifiable ;
- une Preview peut être validée rapidement.
Toute action Production exige une autorisation explicite.

## 19. Encadrer le rollback
Avant :
- confirmer le déploiement affecté ;
- confirmer le candidat sain ;
- vérifier contenu et contacts ;
- obtenir l’autorisation ;
- préparer les smoke tests.
Après :
- vérifier le site public ;
- consigner version et heure ;
- corriger la cause sur une branche ;
- produire une Preview ;
- ne pas réappliquer le changement fautif.
Un rollback ne révoque pas un secret compromis.

## 20. Triage des erreurs
Regrouper par :
- message ou fingerprint ;
- version ;
- environnement ;
- navigateur ;
- route ;
- fréquence ;
- première apparition ;
- impact utilisateur.
Rechercher une corrélation avec le dernier changement. Ne pas conclure à partir
d’une stack trace tronquée. Masquer données personnelles et secrets dans tout
rapport.

## 21. Maintenir les dépendances
Surveiller :
- vulnérabilités ;
- versions non maintenues ;
- licences ;
- dépendances directes et transitives ;
- actions CI ;
- compatibilité Node, Next.js et React.
Pour une mise à jour :
1. comprendre l’alerte ;
2. vérifier l’exposition réelle ;
3. lire les notes officielles ;
4. appliquer la plus petite mise à jour sûre ;
5. inspecter le lockfile ;
6. exécuter tests et build ;
7. valider une Preview.
Une alerte automatisée n’autorise pas le merge. Ne pas forcer une mise à jour
majeure sans revue.

## 22. Triage des vulnérabilités
Priorité interne :
- critique et exploitable : triage immédiat, confinement le jour même ;
- élevée et applicable : correction sous trois jours ouvrés ;
- modérée : prochain cycle de maintenance ;
- faible ou non applicable : décision documentée.
Ces délais sont des objectifs internes. Ne pas fermer « non applicable » sans
preuve liée au code réellement utilisé.

## 23. Vérifier le contenu
Contrôler :
- `Chez PRIMiE Coiffure` ;
- six services validés ;
- téléphone ;
- WhatsApp ;
- CTA ;
- mentions légales réelles ;
- images autorisées ;
- liens ;
- orthographe ;
- cohérence mobile et desktop.
Toute modification métier vient de Prisca ou d’une source validée. Ne pas
déduire horaires, tarifs ou adresse d’une ancienne capture.

## 24. Vérifier domaine et HTTPS
Contrôler :
- résolution DNS ;
- canonical ;
- redirection apex/`www` ;
- HTTPS ;
- certificat ;
- redirection HTTP vers HTTPS ;
- sitemap et robots ;
- domaine Vercel attaché.
Ne documenter fournisseur et renouvellement que s’ils sont confirmés. Toute
modification DNS exige cible vérifiée et autorisation explicite.

## 25. Vérifier la récupérabilité
Pour la V1, les éléments récupérables sont :
- dépôt Git ;
- historique des déploiements ;
- configuration documentée ;
- médias sources autorisés ;
- accès au domaine.
Il n’existe aucune sauvegarde de base de données tant qu’aucune base n’existe.
Vérifier qu’une personne autorisée peut récupérer le dépôt, reconstruire avec le
lockfile, retrouver les variables, identifier un déploiement sain et restaurer
le domaine.
Ne jamais stocker les secrets dans un document de sauvegarde.

## 26. Contrôler les traceurs
Rechercher :
- scripts tiers ;
- pixels ;
- SDK analytics ;
- replay de session ;
- cookies non essentiels ;
- balises injectées ;
- requêtes réseau inattendues ;
- headers ou variables associés.
Une absence dans le code ne suffit pas si un outil de déploiement peut injecter
un script. Documenter preuve, environnement et source observée.

## 27. Protéger confidentialité et rétention
Pour chaque outil, documenter :
- données collectées ;
- finalité ;
- accès ;
- fournisseur ;
- transfert pertinent ;
- durée de conservation ;
- suppression ;
- consentement éventuel.
Collecter le minimum. Ne pas conserver indéfiniment logs, traces ou captures
contenant des identifiants.

## 28. Produire un rapport exploitable
Utiliser :

```md
## Périmètre
Version, environnement et date.
## État
Disponibilité, erreurs, performance, sécurité et contenu.
## Changements
Actions réellement réalisées.
## Validation
Commandes et contrôles avec résultat.
## Risques
Éléments ouverts et priorité.
## Prochaine revue
Date ou condition si réellement planifiée.
```
Ne pas recopier des métriques sans interprétation.

## 29. Tester une correction
Exécuter les commandes réellement présentes :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
Puis valider une Preview avant Production :
- smoke test ;
- parcours WhatsApp sans envoi ;
- mobile `320`, `390`, `768` et desktop `1440px` ;
- zoom `200 %` ;
- clavier ;
- console et réseau ;
- reduced motion si animation touchée.

## 30. Fermer un incident
Fermer seulement si :
- impact stoppé ;
- Production vérifiée ;
- parcours critique fonctionnel ;
- cause connue ou risque résiduel explicite ;
- correctif ou rollback identifié ;
- prévention proportionnée ;
- données sensibles traitées ;
- rapport mis à jour.
Ne pas confondre disparition de l’alerte et résolution.

## 31. Définition de terminé
Une maintenance est terminée lorsque :
- version et environnement sont identifiés ;
- disponibilité et parcours critiques sont vérifiés ;
- erreurs et performances reposent sur des preuves ;
- dépendances sont triées ;
- contenu et contacts sont exacts ;
- domaine, HTTPS et ressources fonctionnent ;
- aucune collecte non approuvée n’est active ;
- lint, types, tests et build pertinents passent ;
- Preview est validée avant Production ;
- rollback reste possible ;
- rétention est maîtrisée ;
- risques ouverts sont consignés.

## 32. Interdictions absolues
Ne jamais :
- présenter un monitoring non configuré comme actif ;
- installer analytics pour vérifier la disponibilité ;
- créer une alerte sans seuil ni destinataire ;
- exposer un secret dans log ou notification ;
- collecter une métrique sans action ;
- fusionner une mise à jour automatique sans tests ;
- utiliser `audit --fix --force` comme routine ;
- ignorer une alerte sans analyse ;
- fermer un incident sans vérification publique ;
- rollback au hasard ;
- supposer domaine ou certificat ;
- annoncer une sauvegarde non restaurable ;
- modifier un fait métier sans validation ;
- conserver indéfiniment les données d’observabilité ;
- modifier Production sans autorisation ;
- déployer sans autorisation.
Dans le compte rendu, séparer disponibilité, erreurs, performance, sécurité,
contenu, actions, validations, risques et prochaine revue.
