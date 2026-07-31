# PRD — [Nom du produit ou de la fonctionnalité]

> Modèle officiel de Product Requirements Document pour PRiMiE.
> Remplacer les champs entre crochets. Supprimer les sections inutiles plutôt
> que de les remplir artificiellement.

## 0. Métadonnées

| Champ | Valeur |
| --- | --- |
| Identifiant | `PRD-[DOMAINE]-[NNN]` |
| Titre | [Titre explicite] |
| Version | [Ex. `1.0`] |
| Statut | `Proposé` / `Validé` / `En cours` / `Implémenté` / `Vérifié` / `Déployé` / `Déprécié` |
| Autorité produit | [Nom confirmé] |
| Autorité technique | [Nom confirmé] |
| Rédacteur | [Nom ou rôle] |
| Date de création | `YYYY-MM-DD` |
| Dernière mise à jour | `YYYY-MM-DD` |
| BMAD lié | [Identifiant ou `À créer`] |
| ADR liés | [Liens ou `Aucun`] |
| Tickets liés | [Liens ou `À créer`] |
| Environnement cible | [Local / Preview / Production] |

## 1. Résumé exécutif

[Résumer en cinq à dix lignes le problème, la cible, la proposition de valeur,
le périmètre et le résultat attendu.]

### Décision demandée

[Indiquer précisément ce qui doit être validé par l’autorité produit ou
technique.]

## 2. Contexte

### Situation actuelle

[Décrire uniquement les faits vérifiés.]

### Problème

[Décrire le problème utilisateur ou métier, sans proposer immédiatement une
solution.]

### Pourquoi maintenant ?

[Expliquer l’urgence, l’opportunité ou la dépendance réelle. Écrire `Non
applicable` si aucune contrainte temporelle n’existe.]

### Sources

- [Brief validé]
- [Retour utilisateur]
- [Décision produit]
- [Donnée ou audit]

## 3. Vision produit

### Vision

[Décrire l’expérience finale recherchée en une phrase.]

### Proposition de valeur

[Pourquoi la cible utiliserait-elle cette solution ?]

### Résultat utilisateur

[Décrire ce que la personne peut accomplir après livraison.]

### Résultat métier

[Décrire la valeur pour le produit sans inventer de chiffres.]

## 4. Objectifs

| ID | Objectif | Indicateur | Cible | Source |
| --- | --- | --- | --- | --- |
| `OBJ-001` | [Objectif] | [Mesure] | [Cible ou `À confirmer`] | [Source] |
| `OBJ-002` | [Objectif] | [Mesure] | [Cible ou `À confirmer`] | [Source] |

### Non-objectifs

- [Ce que ce PRD ne cherche pas à résoudre]
- [Fonction future explicitement exclue]
- [Optimisation hors périmètre]

## 5. Utilisatrices et parties prenantes

### Utilisatrice principale

| Élément | Description |
| --- | --- |
| Profil | [Profil réel ou hypothèse signalée] |
| Besoin | [Besoin] |
| Contexte | [Mobile, recherche locale, etc.] |
| Frein | [Frein] |
| Résultat attendu | [Résultat] |

### Parties prenantes

| Rôle | Responsabilité | Autorité |
| --- | --- | --- |
| Autorité produit | valide besoin, contenu et périmètre | [Nom confirmé] |
| Autorité technique | valide architecture et livraison | [Nom confirmé] |
| Exécution | implémente les tickets acceptés | [Rôle] |
| Review | contrôle conformité et risques | [Rôle] |
| QA / sécurité | vérifie les critères | [Rôle] |

Ne pas attribuer une décision à une personne sans confirmation.

## 6. Périmètre

### Inclus

- [Capacité incluse]
- [Parcours inclus]
- [État inclus]

### Exclus

- [Capacité exclue]
- [Intégration exclue]
- [Cas reporté]

### Hypothèses

| ID | Hypothèse | Validation attendue | Responsable | Statut |
| --- | --- | --- | --- | --- |
| `HYP-001` | [Hypothèse] | [Preuve] | [Rôle] | `À confirmer` |

Une hypothèse ne doit jamais apparaître comme un fait dans le produit.

## 7. Parcours utilisateur

### Parcours principal

1. [Point d’entrée]
2. [Action]
3. [Réponse du système]
4. [Décision]
5. [Résultat]

### Parcours alternatifs

- [Cas alternatif]
- [Retour arrière]
- [Échec récupérable]

### Cas d’erreur

| Cas | Message ou comportement | Récupération |
| --- | --- | --- |
| [Erreur] | [Réponse compréhensible] | [Action possible] |

## 8. Exigences fonctionnelles

Utiliser `MUST`, `SHOULD`, `COULD` et `WON’T` pour la priorité.

| ID | Exigence | Priorité | Source | Critère lié |
| --- | --- | --- | --- | --- |
| `FR-001` | Le système doit [comportement testable]. | `MUST` | [Source] | `AC-001` |
| `FR-002` | Le système doit [comportement testable]. | `SHOULD` | [Source] | `AC-002` |

Règles :

- une exigence décrit un comportement, pas une implémentation ;
- une exigence possède une source ;
- une exigence ambiguë reste `À clarifier` ;
- aucune fonctionnalité future ne doit être présentée comme actuelle.

## 9. Critères d’acceptation

Utiliser une formulation observable. Préférer EARS lorsque pertinent :

```text
LORSQUE [événement ou condition],
LE SYSTÈME DOIT [comportement observable].
```

| ID | Exigence | Critère |
| --- | --- | --- |
| `AC-001` | `FR-001` | Lorsque [condition], le système doit [résultat]. |
| `AC-002` | `FR-002` | Étant donné [contexte], quand [action], alors [résultat]. |

Inclure les états d’erreur, vide, chargement, mobile, clavier et mouvement réduit
lorsqu’ils existent.

## 10. Exigences non fonctionnelles

### Performance

| ID | Exigence | Cible |
| --- | --- | --- |
| `NFR-PERF-001` | LCP au 75e percentile | `≤ 2,5 s` |
| `NFR-PERF-002` | INP au 75e percentile | `≤ 200 ms` |
| `NFR-PERF-003` | CLS au 75e percentile | `≤ 0,1` |

### Accessibilité

- viser WCAG 2.2 AA ;
- navigation clavier complète ;
- focus visible ;
- contraste conforme ;
- cibles tactiles minimales de `44 × 44px` ;
- zoom `200 %` ;
- `prefers-reduced-motion` respecté.

### Responsive

Vérifier au minimum :

```text
320px
390px
768px
1440px
```

### Sécurité et confidentialité

- aucun secret côté client ;
- aucune donnée personnelle collectée sans besoin validé ;
- aucune dépendance ou intégration non auditée ;
- aucun analytics, pixel ou replay implicite ;
- validation des liens et entrées externes ;
- headers de sécurité adaptés.

### SEO

- HTML sémantique ;
- metadata cohérentes ;
- canonical réel ;
- sitemap et robots contrôlés ;
- contenu indexable sans dépendance à une animation.

### Maintenabilité

- TypeScript strict ;
- Server Components par défaut ;
- frontière cliente minimale ;
- contenu séparé des composants ;
- aucune abstraction prématurée.

## 11. UX et direction artistique

### Intention

[Décrire la hiérarchie, le ton et la perception recherchée.]

### Structure

[Lister l’ordre des sections ou écrans.]

### États à concevoir

- default ;
- hover ;
- focus ;
- active ;
- disabled si pertinent ;
- loading ;
- empty ;
- error ;
- reduced motion.

### Contenu

[Lister les textes, images et données nécessaires avec leur source.]

### Assets

| Asset | Source | Droits | Format | État |
| --- | --- | --- | --- | --- |
| [Image] | [Source] | [Confirmés / À confirmer] | [Format] | [Statut] |

## 12. Architecture et contraintes techniques

### Stack réelle

[Lire `package.json` et le dépôt avant de remplir.]

### Composants affectés

- [Composant]
- [Section]
- [Source de contenu]

### Données

[Décrire les données nécessaires. Écrire `Aucune` si le besoin est statique.]

### Intégrations

| Intégration | Finalité | Données | Risque | Validation |
| --- | --- | --- | --- | --- |
| [Service] | [But] | [Données] | [Risque] | [Autorité] |

### Décision d’architecture

[Indiquer si un ADR est nécessaire. Ne pas créer d’ADR pour une décision
mineure.]

## 13. Contenu et vérité métier

| Élément | Valeur | Source | Statut |
| --- | --- | --- | --- |
| [Fait métier] | [Valeur] | [Source] | `Confirmé` / `À confirmer` |

Interdire toute invention de prix, durée, adresse, zone, disponibilité,
promotion, certification ou avis.

## 14. Mesure et observabilité

### Indicateurs techniques

- disponibilité ;
- erreurs bloquantes ;
- ressources critiques ;
- Core Web Vitals ;
- parcours critique.

### Mesure produit

[Décrire uniquement une mesure approuvée. Écrire `Aucune collecte utilisateur
en V1` si applicable.]

Tout outil collectant des données visiteur exige une revue sécurité et
confidentialité avant installation.

## 15. Dépendances

| ID | Dépendance | Type | Responsable | Condition | Statut |
| --- | --- | --- | --- | --- | --- |
| `DEP-001` | [Décision, asset, accès ou composant] | [Produit / Tech / Externe] | [Rôle] | [Condition] | [Statut] |

## 16. Risques

| ID | Risque | Probabilité | Impact | Prévention | Plan de réponse |
| --- | --- | --- | --- | --- | --- |
| `RISK-001` | [Risque] | [Faible/Moyenne/Forte] | [Faible/Moyen/Fort] | [Action] | [Réponse] |

## 17. Plan de livraison

### Étapes

1. validation du PRD ;
2. décomposition BMAD ;
3. ADR si nécessaire ;
4. tickets prêts ;
5. implémentation ;
6. review ;
7. QA et sécurité ;
8. Preview ;
9. autorisation Production ;
10. documentation et clôture.

### Déploiement

[Décrire Preview, validations et autorité de promotion.]

### Rollback

[Décrire le retour à la dernière version saine.]

## 18. Gates de validation

| Gate | Question | Autorité | Preuve | Statut |
| --- | --- | --- | --- | --- |
| `G0 — Besoin` | Le problème mérite-t-il une action ? | Produit | Brief validé | [ ] |
| `G1 — PRD` | Périmètre et critères sont-ils validés ? | Produit | PRD validé | [ ] |
| `G2 — Solution` | Architecture et risques sont-ils acceptés ? | Technique | ADR ou note | [ ] |
| `G3 — Ready` | Les tickets sont-ils exécutables ? | Produit + Tech | DoR | [ ] |
| `G4 — Quality` | Critères, QA et sécurité passent-ils ? | Review + QA | Résultats | [ ] |
| `G5 — Release` | La Production est-elle autorisée ? | Autorité désignée | Preview validée | [ ] |

## 19. Traçabilité

| Besoin | Exigence | Critère | Ticket | Test | Statut |
| --- | --- | --- | --- | --- | --- |
| [Besoin] | `FR-001` | `AC-001` | [ID] | [Test] | [Statut] |

Chaque exigence `MUST` doit être reliée à un critère, un ticket et une preuve.

## 20. Questions ouvertes

| ID | Question | Impact | Décideur | Échéance | Statut |
| --- | --- | --- | --- | --- | --- |
| `Q-001` | [Question] | [Impact] | [Rôle] | [Date/condition] | `Ouverte` |

Une question bloquante empêche le passage au gate suivant.

## 21. Journal des décisions

| Date | Décision | Autorité | Impact | Lien |
| --- | --- | --- | --- | --- |
| `YYYY-MM-DD` | [Décision] | [Rôle] | [Impact] | [ADR ou source] |

## 22. Checklist de validation du PRD

### Produit

- [ ] le problème est explicite ;
- [ ] la cible est identifiée ;
- [ ] objectifs et non-objectifs sont distincts ;
- [ ] périmètre inclus et exclu est clair ;
- [ ] faits métier sont confirmés ;
- [ ] aucune hypothèse n’est présentée comme un fait.

### Exigences

- [ ] exigences fonctionnelles sont testables ;
- [ ] priorités sont explicites ;
- [ ] critères couvrent parcours principal et erreurs ;
- [ ] exigences non fonctionnelles sont mesurables ;
- [ ] dépendances et questions sont visibles.

### Technique

- [ ] stack correspond au dépôt ;
- [ ] architecture future n’est pas présentée comme actuelle ;
- [ ] sécurité et confidentialité sont couvertes ;
- [ ] accessibilité, responsive, SEO et performance sont couverts ;
- [ ] ADR nécessaire est identifié.

### Exécution

- [ ] risques ont un plan de réponse ;
- [ ] gates et autorités sont définis ;
- [ ] traçabilité PRD → BMAD → tickets est possible ;
- [ ] stratégie Preview et rollback existe ;
- [ ] PRD est validé avant implémentation.

---

## Annexe A — Socle canonique PRiMiE

À conserver tant que le PRD concerne PRiMiE :

```text
Projet : PRiMiE
Marque affichée : Chez PRiMiE Coiffure
Porteuse : Prisca
Activité : coiffure et beauté afro à domicile
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
Conversion principale : conversation WhatsApp
```

Ordre V1 :

1. Header ;
2. Hero ;
3. Services ;
4. Galerie — Nos réalisations ;
5. Pourquoi me choisir ? ;
6. Avis clientes ;
7. FAQ ;
8. Réserver ;
9. Contact ;
10. Footer.

Hors périmètre V1 :

- compte et authentification ;
- dashboard ou back-office ;
- formulaire ;
- calendrier ;
- paiement ;
- backend, base de données ou CMS ;
- chatbot ;
- analytics ou tracking implicite.
