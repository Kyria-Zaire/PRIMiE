---
name: content-copywriting
description: Concevoir, rédiger, réécrire, auditer ou intégrer les contenus de PRiMiE en respectant sa voix de marque et ses faits validés. Utiliser cette skill pour les titres, Hero, prestations, galerie, bénéfices, avis, FAQ, réservation, contact, footer, CTA, messages WhatsApp, textes alternatifs, métadonnées SEO, microcopy ou sources TypeScript, ainsi que pour améliorer clarté, conversion, cohérence, français et accessibilité sans inventer prix, adresse, ville, horaires, disponibilité, expérience, avis, promesse ni information métier.
---

# Content Copywriting PRiMiE

Écrire une copy élégante, chaleureuse et crédible qui aide la cliente à
comprendre l’offre puis à contacter Prisca sur WhatsApp. Préserver les faits,
refuser les inventions et préférer une information manquante à une fausse
information convaincante.

## 1. Charger le contexte

Avant toute rédaction :

1. lire `CLAUDE.md` ;
2. lire `07-content-copy.md`, `10-seo.md`, `09-accessibility.md`,
   `whatsapp.md` et `do-not-break.md` selon la demande ;
3. lire le brief, les décisions et validations produit ;
4. inspecter les sources de contenu existantes ;
5. rechercher toutes les occurrences du texte concerné ;
6. identifier le support, la section et la contrainte de longueur ;
7. préserver tout travail local inconnu.

Utiliser `rg --files` et `rg` pour localiser les sources et consommateurs. Ne
pas supposer qu’un texte visible est la source canonique.

## 2. Respecter le mode demandé

Distinguer :

- **rédaction** : créer un contenu à partir de faits confirmés ;
- **réécriture** : améliorer sans changer le sens ;
- **audit** : relever les défauts sans modifier ;
- **correction** : appliquer les changements autorisés ;
- **variantes** : proposer plusieurs directions en attente de choix ;
- **intégration** : placer un texte validé dans la bonne source.

Une demande d’audit n’autorise pas une réécriture. Une demande de rédaction
n’autorise pas une intégration, un commit ou un déploiement.

## 3. Protéger l’identité

Utiliser exactement :

```text
Projet : PRiMiE
Marque : Chez PRiMiE Coiffure
Graphie courte : PRiMiE
Porteuse : Prisca
Activité : coiffure et beauté afro à domicile
Téléphone affiché : +33 7 49 61 65 82
Téléphone E.164 : +33749616582
WhatsApp : https://wa.me/33749616582
```

Ne jamais modifier la casse de `PRiMiE`. Ne pas présenter l’activité comme un
salon physique sans adresse commerciale confirmée.

## 4. Classer les informations

Avant d’écrire, classer chaque élément :

- **validé** : publié dans une source canonique ;
- **observé** : présent dans le produit, mais pas forcément validé ;
- **proposé** : formulation en attente ;
- **inconnu** : information absente ;
- **interdit** : affirmation non prouvée ;
- **hors périmètre** : fonction ou contenu non prévu en V1.

Utiliser uniquement les faits validés. Une formulation plausible ne transforme
pas une inconnue en fait.

## 5. Refuser les inventions

Ne jamais inventer :

- prix, remise ou promotion ;
- durée de prestation ou de tenue ;
- horaire, disponibilité ou délai de réponse ;
- adresse, ville ou zone de déplacement ;
- moyen de paiement ou acompte ;
- politique d’annulation ou remboursement ;
- diplôme, certification ou ancienneté ;
- nombre de clientes ou réalisations ;
- avis, prénom, note ou plateforme ;
- garantie de résultat ;
- récompense ou partenariat ;
- marque de produit utilisée.

Demander la donnée si elle bloque. Sinon, rédiger sans elle et signaler la
limite.

## 6. Respecter la voix

La voix PRiMiE est :

- élégante ;
- chaleureuse ;
- rassurante ;
- professionnelle ;
- directe ;
- humaine ;
- valorisante ;
- accessible.

Éviter une voix prétentieuse, froide, agressive, infantilisante, excessivement
familière ou chargée de superlatifs.

Faire ressentir la qualité par la précision, le rythme et la cohérence, pas par
la répétition de « premium ».

## 7. Employer le vouvoiement

S’adresser toujours à la cliente avec `vous`.

Formulations adaptées :

- `Découvrez nos prestations`
- `Choisissez le style qui vous ressemble`
- `Contactez PRiMiE sur WhatsApp`
- `Préparez votre rendez-vous`

Ne pas alterner entre `tu` et `vous`. L’intitulé `Pourquoi me choisir ?` reste
autorisé lorsqu’il porte la voix directe de Prisca.

## 8. Écrire en français naturel

Appliquer :

- phrases courtes ou moyennes ;
- une idée principale par paragraphe ;
- verbes précis ;
- vocabulaire concret ;
- bénéfices réalistes ;
- ponctuation française ;
- accents et apostrophes ;
- cohérence singulier/pluriel ;
- informations faciles à scanner.

Éviter jargon non expliqué, anglicismes gratuits, majuscules intégrales, emojis
en série, points d’exclamation multiples et phrases de template.

Écrire `WhatsApp`, `PRiMiE`, `coiffure à domicile` et `rendez-vous`.

## 9. Respecter les prestations

Liste canonique :

- Tresses & coiffure femme et homme ;
- Traitement de perruque ;
- Pose perruque ;
- Look & twist ;
- Vente et pose de perruques ;
- Tissage.

Une normalisation légère est possible si le sens ne change pas. Ne pas ajouter
maquillage, cils, onglerie, coloration, défrisage, soin thérapeutique ou produit
non confirmé.

Toute nouvelle prestation nécessite une validation métier.

## 10. Construire la hiérarchie

Respecter l’ordre officiel :

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

Chaque section doit répondre à une question différente. Éviter de répéter la
même promesse dans le Hero, les bénéfices et la réservation.

## 11. Rédiger les titres

Un titre doit :

- transmettre une idée claire ;
- fonctionner hors maquette ;
- respecter la hiérarchie ;
- éviter les formulations génériques ;
- rester lisible sans mot décoratif.

Repères :

- `h1` : environ 4 à 10 mots ;
- `h2` : environ 2 à 8 mots ;
- carte : environ 2 à 6 mots.

Conserver un seul `h1`. Une police manuscrite ne doit jamais porter seule le
sens.

## 12. Rédiger le Hero

Le Hero doit permettre de comprendre immédiatement :

- l’activité ;
- la marque ;
- la valeur principale ;
- la prochaine action.

Préférer :

- un `h1` direct ;
- une phrase de soutien courte ;
- un CTA WhatsApp explicite ;
- un CTA secondaire utile si validé.

Ne pas surcharger le Hero avec toutes les prestations, de fausses preuves ou
une localisation non confirmée.

## 13. Rédiger les prestations

Pour chaque prestation, distinguer :

- nom validé ;
- description factuelle ;
- bénéfice raisonnable ;
- illustration ou réalisation ;
- action éventuelle.

Éviter de promettre durée, tenue, résultat, prix ou disponibilité. Ne pas
attribuer un besoin médical à une prestation esthétique.

Conserver les données hors du JSX dans `content/services.ts`.

## 14. Rédiger la galerie

La copy de galerie doit :

- distinguer réalisation et illustration ;
- décrire le savoir-faire sans fausse attribution ;
- aider à comprendre la coiffure ;
- rester secondaire par rapport aux images ;
- inviter à explorer sans exagération.

Ne jamais écrire « nos réalisations » au-dessus d’images stock ou IA présentées
comme œuvres de Prisca.

## 15. Rédiger les bénéfices

Pour `Pourquoi me choisir ?`, utiliser seulement des qualités raisonnables et
observables :

- écoute de la demande ;
- attention portée aux détails ;
- style adapté aux envies ;
- échange direct avec Prisca ;
- contact simple sur WhatsApp.

Éviter `meilleure`, `incomparable`, `garanti`, `zéro casse`, `24 h/24` ou toute
preuve absente.

## 16. Gérer les avis

Un avis doit être réel, validé, fidèle au sens et publié avec autorisation.

Ne jamais :

- générer un témoignage ;
- inventer un prénom ou une note ;
- attribuer un avis à Google, Instagram ou WhatsApp sans preuve ;
- transformer fortement la voix de la cliente ;
- publier une conversation privée.

Sans avis validé, masquer la section en Production ou utiliser une alternative
honnête approuvée. Ne pas remplir l’espace avec un faux exemple.

## 17. Rédiger la FAQ

Chaque question doit :

- répondre à une objection réelle ;
- employer les mots de la cliente ;
- recevoir une réponse courte et honnête ;
- éviter les informations non confirmées ;
- orienter vers WhatsApp si une réponse dépend du cas.

Ne pas créer une FAQ avec prix, horaires, zone, paiement ou politique tant que
ces faits ne sont pas validés.

Une FAQ utile réduit l’incertitude ; elle ne fabrique pas de règles métier.

## 18. Rédiger Réserver et Contact

La section Réserver doit expliquer que :

- la cliente ouvre une conversation ;
- elle peut décrire sa demande ;
- Prisca échange avec elle ;
- aucun créneau n’est confirmé automatiquement.

La section Contact doit afficher les coordonnées canoniques et un fallback
téléphonique. Ne pas annoncer formulaire, calendrier ou réponse immédiate.

## 19. Écrire les CTA

Commencer par un verbe et décrire le résultat :

- `Réserver sur WhatsApp`
- `Contacter PRiMiE`
- `Voir les réalisations`
- `Découvrir les prestations`
- `Demander des informations`
- `Appeler PRiMiE`

Éviter `Cliquez ici`, `Go`, `Envoyer`, `Soumettre` et `En savoir plus` sans
contexte. Le CTA principal doit mentionner WhatsApp.

Ne pas répéter le même CTA après chaque phrase.

## 20. Écrire le message WhatsApp

Utiliser seulement un message validé, court, poli et modifiable.

Modèles autorisés :

```text
Bonjour PRiMiE, je souhaite obtenir des informations concernant une prestation.
```

```text
Bonjour PRiMiE, je souhaite obtenir des informations concernant : {service}.
```

Ne pas préremplir nom, adresse, date, disponibilité, prix ou donnée sensible.
Sans message validé, utiliser le lien sans paramètre `text`.

## 21. Écrire les textes alternatifs

Décrire l’information utile dans le contexte.

Bon exemple :

```text
Longues tresses fines relevées en chignon
```

Éviter `image`, `photo coiffure`, `femme`, nom de fichier ou liste de mots-clés.

Règles :

- rester concis ;
- décrire la coiffure si elle est le sujet ;
- utiliser `alt=""` pour le décoratif ;
- ne pas présenter une illustration comme réalisation.

L’`alt` sert d’abord à l’accessibilité, pas au bourrage SEO.

## 22. Rédiger les métadonnées

Le title et la description doivent :

- identifier PRiMiE ;
- décrire honnêtement l’activité ;
- correspondre au contenu visible ;
- utiliser une localisation uniquement validée ;
- éviter les mots-clés répétés ;
- inviter naturellement au contact.

Ne pas écrire `n°1`, `meilleure`, `pas cher`, `urgence` ou une promesse absente.
Ne pas fixer une canonical sans domaine validé.

## 23. Respecter inclusion et représentation

Valoriser les coiffures et la beauté afro sans :

- clichés culturels ;
- exotisation ;
- hypersexualisation ;
- infantilisation ;
- généralisation sur les cheveux noirs ;
- promesse médicale ;
- jugement sur une texture ou un style.

Décrire le résultat visuel et le service, pas le corps ou l’identité supposée
du modèle.

## 24. Organiser les sources

Centraliser :

```text
content/site-config.ts
content/navigation.ts
content/services.ts
content/gallery.ts
content/benefits.ts
content/faq.ts
```

Garder les données typées, stables et faciles à réviser. Le JSX ne doit pas
contenir une copie divergente.

Avant de renommer une clé ou déplacer un contenu, rechercher tous ses
consommateurs et tests.

## 25. Gérer les contenus provisoires

Procédure :

1. garder la donnée hors du contenu publié ;
2. utiliser `TODO(content): à valider` seulement dans le code ;
3. signaler la donnée manquante ;
4. ne jamais rendre le placeholder en Production.

Interdire `Lorem ipsum`, faux avis, faux numéro, prix fictif, fausse adresse,
URL `#` ou profil social inventé.

Une section absente est préférable à une fausse information.

## 26. Réécrire sans déformer

Lors d’une réécriture :

1. extraire les faits ;
2. identifier l’intention ;
3. conserver le sens ;
4. supprimer répétitions et adjectifs vides ;
5. clarifier le bénéfice ;
6. préserver la voix ;
7. comparer avant/après ;
8. signaler toute information supprimée ou ambiguë.

Ne pas ajouter une preuve, une caractéristique ou une promesse pour rendre la
phrase plus persuasive.

## 27. Valider avant intégration

Vérifier :

- graphie `PRiMiE` ;
- `vous` cohérent ;
- six prestations intactes ;
- coordonnées canoniques ;
- faits traçables ;
- CTA exacts ;
- messages WhatsApp validés ;
- absence de placeholder ;
- métadonnées cohérentes ;
- alternatives utiles ;
- français relu ;
- responsive sans texte coupé.

Si le contenu modifie une décision métier, demander validation avant
intégration.

## 28. Définition de terminé

Un contenu est prêt lorsqu’il :

- respecte la voix et le vouvoiement ;
- se comprend dès la première lecture ;
- ne contient aucun fait inventé ;
- utilise les sources canoniques ;
- possède un objectif clair ;
- conserve un CTA précis ;
- distingue illustration et réalisation ;
- reste accessible et structuré ;
- est relu en français ;
- a reçu la validation requise ;
- ne crée aucune contradiction.

## 29. Interdictions absolues

Ne jamais :

- générer un faux avis ;
- inventer prix, horaire, adresse ou zone ;
- inventer expérience, certification ou disponibilité ;
- publier une prestation non confirmée ;
- promettre un résultat ;
- présenter PRiMiE comme salon physique sans preuve ;
- tutoyer la cliente ;
- bourrer le texte de mots-clés ;
- publier un placeholder ;
- changer un fait pendant une correction de style ;
- ajouter du contenu commercial pendant une tâche technique ;
- intégrer ou déployer sans autorisation.

Séparer dans le compte rendu les textes changés, les faits ajoutés avec leur
source, les éléments en attente et les vérifications réellement effectuées.
