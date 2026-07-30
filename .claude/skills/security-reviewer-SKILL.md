---
name: security-reviewer
description: Auditer la sécurité et la vie privée de PRIMiE avant modification ou livraison. Utiliser cette skill pour revoir un diff, rechercher des secrets, examiner une dépendance ou un script tiers, contrôler XSS, URLs, CSP et en-têtes HTTP, analyser les données collectées, évaluer une intégration externe, vérifier les médias publics, traiter une alerte de sécurité ou rendre un verdict GO/NO-GO.
---
# Security Reviewer PRIMiE
Réduire la surface d’attaque et protéger la vie privée sans inventer une
infrastructure inutile. Fonder chaque conclusion sur le code, la configuration
ou une réponse réellement observée.

## 1. Charger le contexte
Avant la revue :
- lire `CLAUDE.md` ;
- lire les règles sécurité, architecture, dépendances et déploiement ;
- identifier le besoin et le périmètre autorisé ;
- inspecter le diff et les fichiers touchés ;
- lire `package.json`, le lockfile et la configuration concernée ;
- cartographier les données et destinations externes ;
- vérifier l’environnement ciblé : local, Preview ou Production.
Ne pas afficher un secret ou une donnée sensible dans le rapport.

## 2. Respecter le modèle V1
Le flux attendu est :

```text
navigateur → site PRIMiE sur Vercel → téléphone ou WhatsApp
```

La V1 :
- affiche du contenu public ;
- ne possède ni compte ni authentification ;
- ne contient ni formulaire ni calendrier ;
- ne traite aucun paiement ;
- n’utilise ni API métier ni base de données ;
- ne reçoit pas le contenu des demandes WhatsApp ;
- ne dépose aucun traceur non essentiel par défaut.
Toute nouvelle collecte ou transmission exige une nouvelle analyse de risques
et une décision CTO.

## 3. Définir la surface de revue
Rechercher :
- secrets et variables ;
- données personnelles ;
- entrées non fiables ;
- sorties HTML ;
- URLs et redirections ;
- dépendances ;
- scripts tiers ;
- médias ;
- en-têtes ;
- CSP ;
- logs ;
- configuration de build ;
- fichiers publics ;
- actions de déploiement.
Élargir uniquement lorsque le flux de données l’exige.

## 4. Classer les constats
Utiliser :
- **critique** : exploitation directe, secret actif, donnée sensible publique ;
- **élevé** : contrôle absent sur un chemin exposé ;
- **moyen** : défense incomplète ou configuration fragile ;
- **faible** : durcissement utile sans exploitation démontrée ;
- **information** : observation sans risque immédiat.
Pour chaque constat, préciser :
- preuve ;
- scénario ;
- impact ;
- précondition ;
- correction minimale ;
- validation attendue.
Ne pas amplifier un risque théorique sans scénario applicable.

## 5. Distinguer preuve et hypothèse
Marquer :
- **observé** : présent dans un fichier, une commande ou une réponse ;
- **déduit** : conséquence raisonnable ;
- **proposé** : amélioration recommandée ;
- **inconnu** : contrôle impossible.
Ne jamais déclarer une vulnérabilité confirmée à partir d’un nom de package
seul.

## 6. Rechercher les secrets
Inspecter :
- `.env*` ;
- code source ;
- configuration ;
- documentation ;
- captures et exports ;
- historique Git uniquement si autorisé et nécessaire ;
- fichiers dans `public/` ;
- logs ;
- URLs ;
- fixtures.
Rechercher notamment :
- clés API ;
- tokens ;
- mots de passe ;
- secrets de signature ;
- chaînes de connexion ;
- clés privées ;
- credentials intégrés à une URL.
Ne jamais recopier la valeur trouvée dans le compte rendu.

## 7. Traiter un secret exposé
Si un secret réel est exposé :
1. arrêter l’élargissement du travail ;
2. identifier le type et l’emplacement sans révéler la valeur ;
3. demander ou déclencher la révocation seulement avec autorité ;
4. faire tourner le secret ;
5. vérifier les journaux d’utilisation ;
6. préparer un nettoyage d’historique approuvé si nécessaire ;
7. valider la nouvelle configuration ;
8. documenter l’incident de manière expurgée.
Supprimer la dernière copie ne suffit pas.

## 8. Auditer les variables d’environnement
Vérifier :
- `.env*` réel ignoré ;
- `.env.example` manifestement factice ;
- aucun secret préfixé `NEXT_PUBLIC_` ;
- variables publiques réellement non sensibles ;
- séparation Preview et Production ;
- validation de présence côté serveur ;
- absence de valeur dans les messages d’erreur ;
- aucune variable inutile.
Les coordonnées publiques stables appartiennent à `content/site-config.ts`.

## 9. Auditer les entrées
Considérer comme non fiables :
- paramètres d’URL ;
- query string ;
- hash ;
- cookies ;
- headers ;
- stockage navigateur ;
- réponses tierces ;
- contenu CMS futur ;
- noms de fichiers ;
- variables d’environnement.
Vérifier type, longueur, format, valeurs autorisées et destination.
La validation client n’est jamais une frontière de sécurité.

## 10. Prévenir XSS et injections
Interdire :
- `dangerouslySetInnerHTML` ;
- `innerHTML`, `outerHTML`, `document.write` ;
- `eval`, `new Function` ;
- HTML externe brut ;
- URL `javascript:` ;
- interpolation non contrôlée dans un script ;
- rendu direct d’une entrée URL ;
- SVG externe injecté.
Préserver l’échappement React.
Pour un JSON-LD contrôlé, échapper au minimum `<` après `JSON.stringify`.
Toute future acceptation de HTML impose nettoyage par allowlist et tests
d’attaque.

## 11. Auditer les URLs
Vérifier :
- destination issue d’une configuration autorisée ;
- protocole attendu ;
- absence de redirection ouverte ;
- paramètres encodés ;
- aucune donnée personnelle ;
- `target="_blank"` justifié ;
- `rel="noopener noreferrer"` associé ;
- lien d’appel exact ;
- lien WhatsApp exact.
Construire un message WhatsApp avec `URL` et `URLSearchParams` ou
`encodeURIComponent`, jamais par concaténation brute.

## 12. Protéger WhatsApp
Destination canonique :

```text
https://wa.me/33749616582
```

Vérifier :
- lien HTML réel ;
- changement vers un service tiers compréhensible ;
- message modifiable avant envoi ;
- aucune donnée cliente ajoutée ;
- aucun envoi automatique ;
- aucun SDK ;
- aucune Cloud API ;
- aucune fausse confirmation de réservation ;
- aucun tracker implicite.
Une navigation vers `wa.me` n’exige pas son ajout dans `connect-src`.

## 13. Auditer les scripts tiers
Aucun script tiers n’est chargé par défaut.
Avant d’en accepter un :
1. confirmer le besoin ;
2. identifier fournisseur et domaines ;
3. lister cookies, traceurs et données ;
4. vérifier consentement et obligations ;
5. évaluer sécurité, accessibilité et performance ;
6. limiter les pages et permissions ;
7. définir retrait et fallback ;
8. obtenir une validation explicite.
Rejeter snippet opaque, domaine wildcard et chargement anticipé.

## 14. Auditer les dépendances
Pour chaque ajout ou mise à jour :
- nécessité ;
- alternative native ;
- nom exact et risque de typosquatting ;
- maintenance ;
- licence ;
- avis de sécurité ;
- scripts d’installation ;
- dépendances transitives ;
- poids ;
- permissions ;
- compatibilité ;
- lockfile ;
- stratégie de retrait.
Ne pas utiliser `audit --fix --force`.
Analyser l’exploitabilité réelle avant un changement majeur.

## 15. Auditer les skills et outils IA
Tout skill, plugin, MCP, hook, script ou outil externe doit être audité avant
installation.
Vérifier :
- provenance ;
- mainteneur ;
- code exécuté ;
- accès fichiers et réseau ;
- collecte ;
- secrets accessibles ;
- commandes proposées ;
- mises à jour ;
- désinstallation ;
- bénéfice mesuré.
RTK reste candidat et ne doit pas être activé sans audit ni autorisation.

## 16. Auditer les médias
Avant publication :
- vérifier les droits ;
- confirmer l’accord des personnes reconnaissables ;
- supprimer EXIF et géolocalisation inutiles ;
- inspecter arrière-plans, miroirs, documents et écrans ;
- éviter les noms complets de clientes ;
- ne placer aucune copie privée dans `public/` ;
- inspecter et nettoyer les SVG ;
- vérifier les domaines d’images.
Un fichier dans `public/` doit être considéré publiquement accessible.

## 17. Auditer les fichiers publics
Rechercher :
- sauvegardes ;
- exports ;
- source maps involontaires ;
- `.env` ;
- fichiers de test ;
- documents internes ;
- médias originaux privés ;
- métadonnées ;
- noms sensibles ;
- répertoires temporaires.
Ne pas considérer l’absence de lien comme une protection.

## 18. Auditer les en-têtes HTTP
Vérifier la réponse réellement servie.
Socle attendu :

```text
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Protéger l’encadrement avec `frame-ancestors 'none'` ou une mesure compatible
justifiée.
La Production doit utiliser HTTPS.
Ne pas modifier HSTS, sous-domaines ou preload sans analyser les conséquences.

## 19. Auditer la CSP
La CSP doit refléter les ressources réellement chargées.
Vérifier :
- en-tête HTTP ;
- `default-src` restrictif ;
- `object-src 'none'` ;
- `base-uri 'self'` ;
- `frame-ancestors 'none'` si applicable ;
- origines minimales pour scripts, styles, images, polices et connexions ;
- absence de `*` ;
- absence de `'unsafe-eval'` ;
- justification de tout `'unsafe-inline'` ;
- nonces ou hashes lorsque nécessaires.
Utiliser Report-Only avant blocage sur un site existant si nécessaire.
Ne pas élargir la CSP pour masquer une erreur.

## 20. Auditer la vie privée
Appliquer la minimisation :
- aucune collecte « au cas où » ;
- aucun identifiant visiteur ;
- aucun contenu WhatsApp enregistré ;
- aucune donnée personnelle dans URL ou logs ;
- aucune conservation sans finalité ;
- aucun transfert non documenté ;
- aucun traceur non essentiel par défaut.
Sans traceur soumis au consentement, ne pas ajouter une bannière décorative.
Une mesure d’audience future exige une analyse CNIL et une configuration réelle.

## 21. Auditer les mentions
Ne pas inventer :
- identité légale ;
- statut ;
- SIRET ;
- adresse ;
- hébergeur contractuel ;
- responsable de publication ;
- durée de conservation ;
- droit ou traitement inexistant.
La transparence doit correspondre au fonctionnement réel.
Le site ne doit pas prétendre contrôler les traitements propres à WhatsApp.

## 22. Auditer logs et erreurs
Interdire dans les logs et réponses :
- secret ;
- token ;
- stack trace publique ;
- objet de requête complet ;
- contenu de message ;
- URL personnelle ;
- cookie ;
- variable d’environnement ;
- détail interne exploitable.
Supprimer les logs de débogage.
Journaliser seulement le minimum nécessaire avec accès et durée maîtrisés.

## 23. Auditer une future collecte
Tout formulaire, API ou webhook futur nécessite :
- schéma serveur strict ;
- limites de taille ;
- normalisation ;
- rate limiting ;
- anti-spam ;
- CSRF lorsque pertinent ;
- authentification et autorisation ;
- stockage protégé ;
- rétention ;
- droits des personnes ;
- tests d’abus ;
- supervision.
La V1 actuelle doit rester sans collecte.

## 24. Auditer Git et Preview
Avant livraison :
- inspecter le diff ;
- rechercher secrets et `.env` ;
- vérifier binaires et médias ;
- vérifier le lockfile ;
- exclure sauvegardes et exports ;
- considérer toute URL Preview partageable comme publique ;
- ne placer aucune donnée confidentielle en Preview.
`noindex` protège le référencement, pas l’accès.
Ne jamais commit, push ou déployer sans demande explicite.

## 25. Exécuter les contrôles
Utiliser selon la configuration réelle :

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm audit
```

Compléter par :
- recherche de patterns dangereux ;
- inspection du bundle et des requêtes ;
- contrôle console ;
- vérification des en-têtes servis ;
- test des liens ;
- inspection des médias ;
- revue du lockfile.
Ne pas annoncer une commande non exécutée.

## 26. Vérifier la correction
Après correction :
1. reproduire le risque initial ;
2. confirmer que la cause est supprimée ;
3. ajouter un test de régression ;
4. vérifier les contrôles voisins ;
5. relancer build et tests adaptés ;
6. vérifier qu’aucune défense n’a été affaiblie ;
7. documenter les limites.
Ne pas accepter une correction qui masque seulement le symptôme.

## 27. Donner un verdict
Utiliser :
- **GO** : aucun risque bloquant démontré ;
- **GO sous conditions** : actions précises avant Production ;
- **NO-GO** : risque critique ou élevé exploitable ;
- **NON VÉRIFIABLE** : preuve ou accès insuffisant.
Une absence de test ne devient jamais une preuve de sécurité.

## 28. Rédiger le rapport
Utiliser :

```md
# Revue sécurité — [Nom]
## Périmètre
## Modèle de données
## Surface exposée
## Contrôles exécutés
## Constats
## Données et vie privée
## Dépendances et tiers
## En-têtes et CSP
## Non vérifié
## Risques restants
## Verdict
```

Pour un constat :

```md
### [Sévérité] Titre
- Preuve expurgée :
- Scénario :
- Impact :
- Correction :
- Validation :
```

## 29. Conditions d’arrêt
Arrêter et alerter si :
- secret actif exposé ;
- donnée personnelle publiée ;
- script tiers inconnu ;
- dépendance compromise ;
- action distante ambiguë ;
- accès Production nécessaire ;
- correction destructive ;
- preuve sensible impossible à partager sûrement ;
- changement légal ou collecte non validée.
Ne pas exploiter une vulnérabilité au-delà de la preuve minimale autorisée.

## 30. Definition of Done
La revue est terminée lorsque :
- flux de données compris ;
- secrets recherchés sans exposition ;
- entrées et sorties auditées ;
- URLs et destinations validées ;
- dépendances et scripts tiers examinés ;
- médias publics vérifiés ;
- vie privée et minimisation contrôlées ;
- en-têtes et CSP évalués sur la cible disponible ;
- logs et erreurs revus ;
- commandes et résultats documentés ;
- constats reproductibles et expurgés ;
- corrections vérifiées ;
- limites signalées ;
- verdict justifié.
