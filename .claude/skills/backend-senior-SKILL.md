---
name: backend-senior
description: Concevoir, auditer ou implémenter les responsabilités serveur de PRIMiE avec une posture backend senior. Utiliser cette skill pour décider si un besoin exige réellement un backend, travailler sur Server Components, métadonnées ou routes système Next.js, évaluer une API, une base de données, une authentification, un webhook ou une intégration externe, et protéger la V1 contre toute infrastructure implicite.
---
# Backend Senior PRIMiE
Résoudre le besoin avec la plus petite responsabilité serveur possible. La V1
ne possède ni API métier, ni base de données, ni authentification. Traiter cette
absence comme une décision d’architecture, pas comme un manque à combler.

## 1. Charger le contexte
Avant toute action :
1. lire `CLAUDE.md` ;
2. lire les règles d’architecture, sécurité, confidentialité, performance et
   tests applicables ;
3. lire la décision CTO et le plan Tech Lead ;
4. inspecter le dépôt réel ;
5. lire `package.json` et la configuration Next.js ;
6. vérifier les frontières serveur/client existantes ;
7. identifier les données réellement nécessaires.
Ne pas déduire un service, une version ou une configuration qui n’existe pas.

## 2. Appliquer la règle V1
La V1 est une landing page statique ou rendue côté serveur avec Next.js.
Elle exclut :
- API métier ;
- base de données ;
- authentification ;
- compte client ;
- dashboard ;
- formulaire ;
- calendrier ;
- paiement ;
- CMS ;
- chatbot ;
- WhatsApp Cloud API ;
- webhook métier ;
- collecte de données clientes ;
- analytics implicite.
Ne créer aucun endpoint, schéma, secret ou adaptateur « pour plus tard ».

## 3. Distinguer serveur et backend métier
Les capacités serveur natives de Next.js ne constituent pas automatiquement un
backend métier.
Responsabilités autorisées dans la V1 :
- Server Components ;
- génération des métadonnées ;
- `robots.ts` ;
- `sitemap.ts` ;
- `manifest.ts` ;
- image Open Graph ;
- optimisation des images et polices ;
- configuration d’en-têtes validée ;
- génération statique ou rendu serveur nécessaire.
Responsabilités nécessitant un arbitrage CTO :
- Route Handler métier ;
- Server Action recevant des données clientes ;
- persistance ;
- authentification ;
- intégration SaaS ;
- email transactionnel ;
- webhook ;
- tâche planifiée ;
- stockage de fichiers ;
- secret runtime supplémentaire.

## 4. Vérifier si un backend est nécessaire
Pour chaque proposition, répondre :
1. quel problème utilisateur est résolu ;
2. pourquoi un lien ou contenu statique ne suffit pas ;
3. quelles données entrent et sortent ;
4. si ces données doivent être conservées ;
5. qui peut lire ou modifier ces données ;
6. quelle obligation de sécurité ou confidentialité apparaît ;
7. quel coût de maintenance est créé ;
8. quelle alternative sans backend existe.
Recommander l’absence de backend lorsque le besoin peut être satisfait par :
- lien WhatsApp ;
- lien téléphonique ;
- contenu statique ;
- navigation par ancres ;
- composant interactif local ;
- métadonnée générée au build.

## 5. Exiger un gate d’architecture
Avant tout backend métier, obtenir :
- besoin produit validé ;
- décision CTO explicite ;
- données et finalités documentées ;
- modèle de menace ;
- choix d’hébergement ;
- stratégie de secrets ;
- stratégie de tests ;
- politique de rétention ;
- observabilité ;
- plan de déploiement et de retour arrière.
Retourner `NO-GO` si un de ces éléments critique manque.

## 6. Définir le contrat avant le code
Pour chaque opération serveur validée, préciser :
- acteur ;
- entrée ;
- validation ;
- autorisation ;
- traitement ;
- sortie ;
- erreurs ;
- effets de bord ;
- idempotence ;
- données persistées ;
- durée de conservation ;
- logs autorisés ;
- limites de fréquence ;
- timeout ;
- dépendance externe.
Ne pas commencer par le framework ou le fournisseur.

## 7. Concevoir une frontière minimale
Préférer :
- fonction pure pour la logique ;
- adaptateur isolé pour un service externe ;
- validation à l’entrée ;
- résultat typé ;
- erreurs explicites ;
- timeout et annulation ;
- dépendances injectables pour les tests ;
- configuration centralisée côté serveur.
Éviter :
- couche repository sans base de données ;
- architecture hexagonale complète pour une seule opération ;
- abstraction générique avant un second cas réel ;
- état global serveur ;
- duplication de types entre client et serveur ;
- logique métier dans un composant React.

## 8. Protéger les Server Components
Utiliser les Server Components par défaut pour :
- lire du contenu local ;
- composer la page ;
- générer du HTML indexable ;
- limiter le JavaScript client ;
- conserver les secrets hors du navigateur.
Ne jamais :
- importer un module serveur dans un Client Component ;
- transmettre un secret dans des props ;
- rendre toute la page cliente pour une petite interaction ;
- effectuer un effet de bord pendant le rendu ;
- masquer une dépendance réseau non maîtrisée.

## 9. Encadrer les Route Handlers
Ne créer un Route Handler que si une responsabilité HTTP réelle est validée.
Définir :
- méthode autorisée ;
- schéma d’entrée ;
- taille maximale ;
- authentification si nécessaire ;
- autorisation ;
- réponse typée ;
- codes de statut ;
- politique de cache ;
- CORS ;
- limitation de fréquence ;
- journalisation ;
- test de contrat.
Rejeter par défaut les méthodes et origines non nécessaires.
Ne pas utiliser un Route Handler comme proxy général.

## 10. Encadrer les Server Actions
Une Server Action n’est pas un raccourci pour éviter la conception d’un contrat.
Si une Server Action est validée :
- traiter son entrée comme non fiable ;
- valider côté serveur ;
- vérifier l’autorisation ;
- limiter les effets de bord ;
- retourner un résultat sérialisable ;
- ne pas exposer une erreur interne ;
- tester succès, validation et échec ;
- prévoir les doubles soumissions.
La V1 PRIMiE ne nécessite aucune Server Action métier.

## 11. Valider toutes les entrées
Considérer comme non fiables :
- paramètres d’URL ;
- headers ;
- cookies ;
- corps de requête ;
- formulaires ;
- webhooks ;
- réponses d’API tierces ;
- noms de fichiers ;
- variables d’environnement.
Valider :
- type ;
- longueur ;
- format ;
- valeurs autorisées ;
- encodage ;
- cohérence entre champs ;
- taille totale.
Normaliser uniquement après validation.

## 12. Protéger les sorties
Les réponses doivent :
- exposer le minimum ;
- utiliser des structures stables ;
- éviter les détails internes ;
- ne jamais contenir de secret ;
- ne pas révéler une stack trace ;
- utiliser des messages clients compréhensibles ;
- conserver une erreur interne corrélable sans donnée sensible.
Ne pas renvoyer un objet de base de données brut.

## 13. Gérer les erreurs
Séparer :
- erreur de validation ;
- accès refusé ;
- ressource absente ;
- conflit ;
- limite atteinte ;
- dépendance indisponible ;
- erreur interne.
Pour chaque erreur :
- définir le statut ;
- définir le message public ;
- définir ce qui peut être journalisé ;
- préserver la cause technique côté serveur ;
- éviter une fuite de donnée ;
- prévoir le test.
Ne pas capturer une erreur pour retourner silencieusement un faux succès.

## 14. Gérer secrets et configuration
Ne jamais placer dans le code :
- token ;
- mot de passe ;
- clé privée ;
- secret de webhook ;
- identifiant sensible ;
- URL contenant des credentials.
Règles :
- utiliser une variable serveur ;
- vérifier sa présence au démarrage ou au build adapté ;
- ne jamais utiliser un préfixe public pour un secret ;
- documenter uniquement le nom de la variable ;
- ne jamais afficher sa valeur dans les logs ;
- prévoir rotation et révocation ;
- séparer environnements.
Une nouvelle variable distante exige une autorisation explicite.

## 15. Protéger les données
Avant toute collecte, documenter :
- donnée ;
- finalité ;
- base de décision produit ;
- personne ayant accès ;
- lieu de stockage ;
- durée de conservation ;
- suppression ;
- export éventuel ;
- fournisseur ;
- transfert externe ;
- risque.
Collecter le minimum.
La V1 ne collecte aucune donnée cliente : le contact s’effectue directement via
WhatsApp ou téléphone.

## 16. Encadrer une future base de données
Ne choisir aucun moteur ou fournisseur sans décision d’architecture.
Si une base est validée :
- modéliser les contraintes dans le schéma ;
- utiliser des migrations versionnées ;
- définir clés, nullabilité et unicité ;
- appliquer le moindre privilège ;
- bloquer l’accès par défaut ;
- séparer accès public et serveur ;
- prévoir sauvegarde et restauration ;
- définir rétention et suppression ;
- tester les politiques d’accès ;
- interdire les modifications manuelles non tracées en Production.
Ne jamais exposer une clé de service au navigateur.

## 17. Encadrer une future authentification
Une authentification nécessite :
- besoin produit explicite ;
- rôles et permissions ;
- modèle de session ;
- expiration et révocation ;
- protection CSRF selon l’architecture ;
- limitation de fréquence ;
- récupération de compte ;
- journalisation minimale ;
- tests d’autorisation ;
- gestion des données personnelles.
Authentifier ne suffit pas : vérifier l’autorisation pour chaque ressource.
La V1 ne doit pas contenir de code d’authentification dormant.

## 18. Encadrer les intégrations externes
Avant une intégration :
- auditer le fournisseur ;
- vérifier licence, coût et disponibilité ;
- lire la documentation officielle ;
- identifier les données envoyées ;
- définir timeout et retry borné ;
- gérer rate limits ;
- valider les réponses ;
- isoler l’adaptateur ;
- prévoir un fallback ;
- définir une stratégie de retrait.
Ne pas intégrer un SDK lorsque quelques appels HTTP correctement isolés
suffisent, sauf bénéfice démontré.

## 19. Encadrer les webhooks
Si un webhook est explicitement validé :
- vérifier la signature sur le corps brut ;
- appliquer une fenêtre temporelle ;
- prévenir le rejeu ;
- rendre le traitement idempotent ;
- répondre rapidement ;
- déplacer le travail long hors requête ;
- journaliser un identifiant de corrélation ;
- masquer les données sensibles ;
- tester signature valide, invalide, doublon et timeout.
PRIMiE V1 ne possède aucun webhook.

## 20. Protéger WhatsApp
Le parcours V1 utilise un lien HTML réel :

```text
https://wa.me/33749616582
```

Ne pas :
- créer une API proxy ;
- utiliser WhatsApp Cloud API ;
- envoyer automatiquement un message ;
- enregistrer le numéro de la cliente ;
- annoncer une réservation confirmée ;
- ajouter une donnée personnelle à l’URL ;
- journaliser le clic avec un tracker implicite.
Un message prérempli doit être validé, encodé et modifiable avant envoi.

## 21. Caching et fraîcheur
Définir explicitement :
- donnée statique ;
- donnée calculée au build ;
- donnée dynamique ;
- durée de validité ;
- invalidation ;
- comportement en cas d’échec.
Ne pas rendre dynamique une page dont le contenu est local et stable.
Ne pas ajouter une stratégie de revalidation sans source distante réelle.

## 22. Logs et observabilité
Journaliser uniquement ce qui aide à diagnostiquer :
- type d’opération ;
- résultat ;
- durée ;
- identifiant de corrélation ;
- erreur catégorisée.
Ne jamais journaliser :
- secret ;
- contenu privé ;
- numéro complet d’une cliente ;
- cookie ;
- token ;
- corps de webhook brut ;
- variable d’environnement.
Une landing page sans backend ne nécessite pas une plateforme de logs serveur
supplémentaire.

## 23. Performance et résilience
Pour toute dépendance réseau validée :
- définir timeout ;
- limiter retries ;
- utiliser un backoff borné ;
- éviter les retries sur erreur non transitoire ;
- prévenir les doublons ;
- limiter la concurrence ;
- prévoir une réponse dégradée ;
- mesurer la latence ;
- protéger le rendu principal.
Ne jamais rendre le CTA WhatsApp dépendant d’une API.

## 24. Tester le serveur
Prévoir selon le risque :
- test unitaire des fonctions pures ;
- test de validation ;
- test d’autorisation ;
- test d’intégration de l’adaptateur ;
- test de contrat HTTP ;
- test d’idempotence ;
- test d’échec et timeout ;
- test de non-exposition des secrets ;
- test de migration si une base existe.
Utiliser des doubles contrôlés aux frontières externes, sans mocker la logique
que le test doit prouver.

## 25. Auditer un changement backend
Vérifier :
- nécessité démontrée ;
- autorisation CTO ;
- contrat documenté ;
- entrées validées ;
- autorisation appliquée ;
- secrets protégés ;
- données minimisées ;
- erreurs maîtrisées ;
- dépendances auditées ;
- tests pertinents ;
- observabilité proportionnée ;
- rollback possible ;
- documentation durable mise à jour.
Toute absence critique produit un `NO-GO`.

## 26. Formater une proposition
Utiliser :

```md
# Proposition backend — [Nom]

## Besoin
## Alternative sans backend
## Décision recommandée
## Données et finalités
## Contrat
## Sécurité et confidentialité
## Architecture minimale
## Dépendances
## Tests
## Observabilité
## Déploiement et rollback
## Risques
## Décision CTO requise
```

Commencer par `Backend non nécessaire` lorsque c’est la conclusion.

## 27. Definition of Done
Une tâche serveur est terminée lorsque :
- le besoin ne pouvait pas être satisfait plus simplement ;
- le périmètre est explicitement autorisé ;
- le contrat est typé et vérifié ;
- toutes les entrées sont validées ;
- authentification et autorisation sont correctes si présentes ;
- secrets et données personnelles sont protégés ;
- effets de bord et doublons sont maîtrisés ;
- erreurs et timeouts sont traités ;
- tests ciblés, typecheck, lint et build passent ;
- aucune donnée sensible n’est journalisée ;
- la documentation durable reflète la réalité ;
- la stratégie de retour arrière est connue ;
- les limites non vérifiées sont signalées.
Pour la V1 actuelle, le résultat attendu est généralement : aucune nouvelle
infrastructure backend.
