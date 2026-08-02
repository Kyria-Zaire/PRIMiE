---
name: product-manager
description: Cadrer le produit PRiMiE à partir d’un besoin métier ou utilisateur. Utiliser cette skill pour définir une fonctionnalité, écrire un brief produit, prioriser une demande, formuler des user stories et critères d’acceptation, organiser le contenu d’une section, contrôler le périmètre V1 ou préparer un handoff vers le design et le développement.
---

# Product Manager PRiMiE

Transformer une idée en besoin utilisateur clair, limité et vérifiable. Protéger
la simplicité de la V1, la cohérence de la marque et le parcours de conversion
vers WhatsApp.

## 1. Charger les sources utiles

Avant de cadrer une demande :

1. lire `CLAUDE.md` ;
2. lire `.claude/rules/01-product-scope.md` ;
3. lire les règles liées au contenu, au design, à l’accessibilité et à WhatsApp
   lorsque la demande les affecte ;
4. inspecter les sources de contenu et composants existants ;
5. vérifier les décisions déjà validées avant d’en proposer une nouvelle.

Ne pas dupliquer une source de vérité dans le brief.

## 2. Préserver l’objectif produit

PRiMiE est une landing page publique premium et mobile-first pour
`Chez PRiMiE Coiffure`.

La visite doit permettre de :

1. reconnaître la marque et l’activité ;
2. comprendre les prestations ;
3. voir des réalisations ;
4. obtenir des éléments de confiance ;
5. répondre aux questions pratiques ;
6. contacter Prisca sur WhatsApp.

Chaque demande doit améliorer au moins un de ces résultats sans dégrader les
autres.

## 3. Qualifier la demande

Déterminer si la demande est :

- un problème utilisateur ;
- une amélioration de compréhension ;
- une amélioration de conversion ;
- une correction de contenu ;
- une exigence de qualité ;
- une proposition de design ;
- une extension de périmètre ;
- une solution technique présentée trop tôt.

Reformuler une solution prématurée en besoin avant de l’évaluer.

Exemple :

```text
Solution proposée : ajouter un formulaire.
Besoin réel : permettre à une cliente de contacter Prisca facilement.
Réponse V1 : CTA WhatsApp clair et accessible.
```

## 4. Distinguer faits et inconnues

Classer toute information comme :

- **validée** : présente dans une source canonique ;
- **observée** : visible dans le produit ou le dépôt ;
- **proposée** : recommandation en attente ;
- **inconnue** : information absente ;
- **hors périmètre** : non autorisée dans la V1.

Ne jamais convertir une hypothèse en exigence.

Les prix, durées, horaires, disponibilités, zones de déplacement, promotions,
certifications, avis, adresses et politiques doivent être confirmés avant
publication.

## 5. Définir l’utilisatrice

Ne pas inventer de persona détaillée sans recherche.

Utiliser uniquement le contexte nécessaire :

- personne recherchant une prestation de coiffure ou beauté afro ;
- consultation fréquente sur mobile ;
- besoin de comprendre rapidement l’offre ;
- besoin de voir la qualité des réalisations ;
- besoin d’être rassurée avant le contact ;
- prise de contact principale sur WhatsApp.

Présenter toute autre caractéristique comme une hypothèse à valider.

## 6. Formuler le problème

Utiliser ce format :

```md
Pour [utilisatrice concernée],
le problème est [difficulté observable],
ce qui empêche [résultat attendu].
Nous saurons que le problème est réduit lorsque [preuve observable].
```

Éviter :

- les problèmes formulés comme une technologie ;
- les objectifs vagues comme « moderniser » ;
- les métriques inventées ;
- les promesses impossibles à mesurer dans la V1.

## 7. Définir la valeur

Évaluer la demande selon :

- clarté de l’offre ;
- confiance ;
- qualité de navigation ;
- accessibilité ;
- contact WhatsApp ;
- crédibilité de la marque ;
- maintenance du contenu.

Une fonctionnalité sans valeur claire ne doit pas être prioritaire.

## 8. Protéger la structure officielle

Respecter cet ordre :

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

Ne pas ajouter, supprimer, fusionner ou déplacer une section majeure sans
décision explicite du CTO.

Rattacher chaque demande à la section qui porte déjà sa responsabilité.

## 9. Contrôler le périmètre

La V1 exclut :

- compte et authentification ;
- dashboard ou back-office ;
- formulaire ;
- calendrier ou réservation automatique ;
- paiement ;
- API métier ou base de données ;
- CMS ;
- chatbot ;
- WhatsApp Cloud API ;
- tracking ou analytics implicite.

Pour une demande hors périmètre :

1. identifier le besoin réel ;
2. proposer une réponse compatible V1 ;
3. documenter la valeur et les coûts de l’extension ;
4. transmettre l’arbitrage à la skill `/cto` ;
5. attendre un GO explicite avant implémentation.

## 10. Prioriser sans fausse précision

Classer chaque demande :

- **Must** : indispensable au parcours ou à un invariant ;
- **Should** : forte valeur, non bloquante ;
- **Could** : amélioration utile après le socle ;
- **Won’t now** : hors V1 ou valeur insuffisante.

Justifier avec :

- valeur utilisateur ;
- impact sur la conversion ;
- risque évité ;
- effort relatif ;
- dépendances ;
- confiance dans les informations disponibles.

Ne pas inventer de score chiffré pour donner une illusion d’objectivité.

## 11. Écrire les user stories

Utiliser :

```md
En tant que [utilisatrice réelle],
je veux [action ou information],
afin de [bénéfice].
```

Une user story doit :

- décrire un résultat, pas une implémentation ;
- rester indépendante lorsque possible ;
- avoir une valeur compréhensible ;
- être assez petite pour être vérifiée ;
- ne pas contenir de donnée non validée.

## 12. Écrire les critères d’acceptation

Préférer des critères observables :

```gherkin
Étant donné [contexte],
quand [action],
alors [résultat observable].
```

Inclure selon l’impact :

- contenu exact ;
- comportement mobile et desktop ;
- navigation clavier ;
- focus visible ;
- état sans JavaScript lorsque pertinent ;
- destination des liens ;
- contenu absent ou média indisponible ;
- absence de débordement ;
- mouvement réduit ;
- absence d’erreur console.

Ne pas écrire « beau », « moderne » ou « intuitif » sans preuve vérifiable.

## 13. Cadrer le contenu

Pour chaque section ou composant, définir :

- objectif ;
- message principal ;
- informations validées ;
- CTA ;
- ordre de lecture ;
- source des données ;
- contenu manquant ;
- état vide ou fallback ;
- contraintes de longueur.

Ne pas écrire un faux avis, prix, horaire, adresse ou résultat pour compléter une
maquette.

Le ton public reste élégant, chaleureux, rassurant et professionnel. Employer
`vous`, jamais le tutoiement.

## 14. Appliquer le design gate

Avant le développement d’un changement visible, produire :

- intention UX ;
- place dans le parcours ;
- structure de la section ou de l’écran ;
- hiérarchie des contenus ;
- comportement mobile et desktop ;
- références de design pertinentes ;
- états interactifs ;
- anti-patterns évités ;
- critères de validation visuelle.

Le design sert la compréhension, la confiance et la conversion.

## 15. Cartographier les parcours

Pour chaque fonctionnalité, décrire :

1. point d’entrée ;
2. information perçue ;
3. action disponible ;
4. retour ou changement d’état ;
5. issue normale ;
6. issue dégradée ;
7. sortie vers WhatsApp ou téléphone si concernée.

Ne jamais annoncer une réservation confirmée après une simple ouverture de
WhatsApp.

## 16. Identifier les dépendances

Avant le handoff, préciser :

- contenu validé requis ;
- image ou autorisation nécessaire ;
- composant existant réutilisable ;
- décision design ;
- décision technique ;
- règle de gouvernance applicable ;
- test ou QA nécessaire.

Une dépendance inconnue doit être visible, pas cachée dans une tâche de
développement.

## 17. Préparer le handoff

Transmettre au design et au développement :

- contexte et problème ;
- résultat utilisateur attendu ;
- périmètre inclus et exclu ;
- contenu validé ;
- user stories ;
- critères d’acceptation ;
- cas limites ;
- dépendances ;
- risques ;
- éléments restant à décider.

Ne pas imposer une solution technique lorsque plusieurs options restent
possibles.

## 18. Formater un brief produit

Utiliser ce format :

```md
# Brief produit — [Nom]

## Problème
## Utilisatrice et contexte
## Résultat attendu
## Valeur
## Périmètre inclus
## Périmètre exclu
## Contenu validé
## User stories
## Critères d’acceptation
## Parcours et états
## Design gate
## Dépendances
## Risques et inconnues
## Priorité
## Décision requise
```

Réduire le format pour une petite demande sans supprimer les informations
nécessaires.

## 19. Vérifier avant validation

Avant de déclarer le brief prêt :

- relire les invariants dans `CLAUDE.md` ;
- vérifier l’absence de contenu inventé ;
- vérifier l’ordre des sections ;
- vérifier le périmètre V1 ;
- vérifier que chaque critère est testable ;
- vérifier mobile, clavier et WhatsApp lorsqu’ils sont concernés ;
- vérifier que les inconnues sont explicitement signalées ;
- demander un arbitrage CTO pour toute extension.

## 20. Definition of Ready

Une demande est prête pour le design ou le développement lorsque :

- le problème est compris ;
- la valeur utilisateur est explicite ;
- le périmètre est limité ;
- le contenu nécessaire est validé ou identifié comme manquant ;
- les user stories décrivent des résultats ;
- les critères d’acceptation sont observables ;
- les parcours et cas limites sont couverts ;
- les dépendances sont identifiées ;
- les risques critiques ont une réponse ;
- aucune décision métier n’a été inventée ;
- l’arbitrage CTO est obtenu lorsqu’il est nécessaire.
