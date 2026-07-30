---
paths:
  - "content/**/*.{ts,tsx}"
  - "app/**/*.{ts,tsx}"
  - "components/**/*.tsx"
---

# PRIMiE — Contenu et copywriting

## 1. Rôle de cette règle

Cette règle encadre tout texte affiché, structuré ou référencé par PRIMiE :

- titres ;
- descriptions ;
- prestations ;
- CTA ;
- témoignages ;
- FAQ ;
- coordonnées ;
- métadonnées SEO ;
- textes alternatifs ;
- messages WhatsApp ;
- mentions légales.

La priorité est double :

1. donner envie de contacter PRIMiE ;
2. ne jamais tromper la cliente.

Le fichier racine `CLAUDE.md` et la règle produit restent prioritaires.

## 2. Identité éditoriale

Valeurs canoniques :

```text
Nom : Chez PRIMiE Coiffure
Nom court : PRIMiE
Personne mise en avant : Prisca
Activité : coiffure et beauté afro à domicile
Téléphone : +33 7 49 61 65 82
WhatsApp : https://wa.me/33749616582
```

Ne jamais :

- modifier la casse de `PRIMiE` ;
- présenter PRIMiE comme un salon physique ;
- attribuer une équipe à Prisca ;
- inventer une adresse, ville ou zone d'intervention ;
- remplacer l'identité par une formulation générique.

## 3. Voix de marque

La voix PRIMiE est :

- élégante ;
- chaleureuse ;
- rassurante ;
- professionnelle ;
- directe ;
- humaine ;
- valorisante ;
- accessible.

Elle ne doit pas être :

- prétentieuse ;
- froide ;
- agressivement commerciale ;
- infantilisante ;
- excessivement familière ;
- remplie de superlatifs ;
- construite sur des clichés liés aux femmes noires ou aux cheveux afro.

## 4. Relation avec la cliente

Utiliser le vouvoiement dans tout le site.

Exemples :

- `Découvrez nos prestations`
- `Choisissez le style qui vous ressemble`
- `Contactez PRIMiE sur WhatsApp`
- `Préparez votre rendez-vous`

Ne pas alterner entre `tu` et `vous`.

Les intitulés à la première personne, comme `Pourquoi me choisir ?`, peuvent
représenter la voix directe de Prisca lorsqu'ils sont validés.

## 5. Style rédactionnel

Règles :

- phrases courtes ou moyennes ;
- vocabulaire concret ;
- une idée principale par paragraphe ;
- verbes d'action précis ;
- bénéfices sans promesse excessive ;
- titres expressifs mais compréhensibles ;
- informations pratiques faciles à parcourir ;
- ponctuation française correcte ;
- accents et apostrophes conservés.

Éviter :

- jargon beauté non expliqué ;
- anglicismes inutiles ;
- répétition du mot `premium` ;
- accumulation d'adjectifs ;
- majuscules intégrales dans un texte long ;
- points d'exclamation multiples ;
- séries d'emojis décoratifs ;
- formulations génériques de template.

## 6. Prestations canoniques

Utiliser exactement les prestations validées :

- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage

Ne reformule pas silencieusement un libellé canonique.
Une évolution rédactionnelle ou une nouvelle catégorie exige une validation.

Ne pas ajouter automatiquement :

- extensions de cils ;
- maquillage ;
- onglerie ;
- coloration ;
- défrisage ;
- soin médical ou thérapeutique ;
- vente de produits non confirmée.

## 7. Informations interdites sans validation

Ne jamais inventer :

- tarif ou remise ;
- durée de prestation ;
- durée de tenue d'une coiffure ;
- horaire ou jour d'ouverture ;
- délai de réponse ;
- adresse, ville ou rayon de déplacement ;
- moyen de paiement ou acompte ;
- politique d'annulation ou remboursement ;
- certification ou diplôme ;
- nombre d'années d'expérience ;
- nombre de clientes ;
- note moyenne ou récompense ;
- garantie de résultat ;
- partenariat ;
- marque de produits utilisée ;
- disponibilité.

Une formulation crédible n'est jamais une preuve.

## 8. Promesses commerciales

Préférer des engagements raisonnables :

- écoute de votre demande ;
- attention portée aux détails ;
- style adapté à vos envies ;
- échange direct avec Prisca ;
- prise de contact simple sur WhatsApp.

Éviter les absolus :

- `résultat garanti`
- `la meilleure coiffeuse`
- `zéro casse`
- `tenue parfaite`
- `qualité incomparable`
- `disponible 24 h/24`
- `réponse immédiate`
- `100 % satisfaite`

Une promesse doit rester vérifiable et réaliste.

## 9. Titres

Un titre doit :

- transmettre une idée claire ;
- rester compréhensible hors de la maquette ;
- éviter les formulations génériques ;
- respecter la hiérarchie `h1` à `h3` ;
- ne pas dépendre d'un mot décoratif pour avoir du sens.

Repères :

- `h1` : environ 4 à 10 mots ;
- `h2` : environ 2 à 8 mots ;
- titre de carte : environ 2 à 6 mots.

Un seul `h1` est autorisé sur la page.
La police manuscrite ne doit jamais porter seule un titre essentiel.

## 10. CTA

Un CTA commence idéalement par un verbe et décrit le résultat.

Libellés recommandés :

- `Réserver sur WhatsApp`
- `Contacter Prisca sur WhatsApp`
- `Voir les réalisations`
- `Découvrir les prestations`
- `Demander des informations`
- `Appeler PRIMiE`

Éviter :

- `Cliquez ici`
- `En savoir plus` sans contexte
- `Go`
- `Envoyer`
- `Soumettre`
- `Découvrir` répété partout

Le CTA principal de réservation doit mentionner WhatsApp.
Il ne doit jamais annoncer une réservation déjà confirmée.

## 11. Message WhatsApp

Un message prérempli doit être :

- explicitement validé ;
- poli ;
- court ;
- compréhensible hors contexte ;
- modifiable par la cliente ;
- correctement encodé ;
- centralisé dans la configuration.

Exemple technique à ne pas publier sans validation :

```text
Bonjour PRIMiE, je souhaite obtenir des informations concernant une prestation.
```

Ne jamais préremplir :

- identité ou téléphone d'une cliente ;
- adresse ;
- date ou horaire supposé ;
- tarif ;
- disponibilité ;
- confirmation de rendez-vous ;
- tracking ou identifiant de session.

Si aucun message n'est validé, utiliser le lien WhatsApp sans paramètre `text`.

## 12. Témoignages

Un témoignage publié doit être :

- réel ;
- validé ;
- reproduit sans déformer le sens ;
- anonymisé si nécessaire ;
- accompagné uniquement des informations autorisées.

Ne jamais :

- générer un faux témoignage ;
- inventer une note ou un prénom ;
- attribuer un avis à une plateforme sans preuve ;
- corriger un avis au point de changer sa voix ;
- publier une conversation privée sans autorisation ;
- utiliser une photo de cliente sans consentement.

Si aucun témoignage n'est validé, ne pas fabriquer de contenu pour remplir la
section.

## 13. FAQ

Chaque réponse doit reposer sur une information confirmée.

Une FAQ peut expliquer :

- la prise de contact ;
- la préparation d'une prestation ;
- les fournitures nécessaires ;
- le déplacement à domicile ;
- l'entretien après coiffure ;
- les moyens de contact.

Ne pas déduire :

- condition commerciale ;
- délai ;
- disponibilité ;
- obligation pour la cliente ;
- conseil médical ;
- politique non communiquée.

Une question sans réponse validée reste hors Production.

## 14. Textes alternatifs

Un texte alternatif décrit l'information utile de l'image dans son contexte.

Bon exemple :

```text
Longues tresses fines relevées en chignon
```

Mauvais exemples :

- `image`
- `photo coiffure`
- `femme`
- `belle femme noire`
- nom de fichier
- suite de mots-clés SEO

Règles :

- ne pas commencer automatiquement par `Image de` ;
- décrire la coiffure lorsqu'elle est le sujet ;
- rester concis ;
- utiliser `alt=""` pour une image purement décorative ;
- ne pas présenter une illustration comme une réalisation PRIMiE.

## 15. Contenus provisoires

Une donnée non confirmée ne doit pas ressembler à un fait validé.

Procédure :

1. conserver la donnée hors du contenu publié ;
2. ajouter `TODO(content): à valider` seulement si nécessaire ;
3. expliquer l'information manquante dans le compte rendu ;
4. empêcher le placeholder d'atteindre la Production.

Ne pas utiliser :

- `Lorem ipsum` ;
- faux numéro ;
- fausse adresse ;
- faux témoignage ;
- prix fictif ;
- URL `#` ;
- réseau social inventé.

Une section peut être temporairement absente. Une fausse information ne l'est
jamais.

## 16. Organisation des contenus

Centraliser :

- identité et coordonnées dans `content/site-config.ts` ;
- navigation dans `content/navigation.ts` ;
- prestations dans `content/services.ts` ;
- galerie dans `content/gallery.ts` ;
- bénéfices dans `content/benefits.ts` ;
- témoignages dans `content/testimonials.ts` ;
- FAQ dans `content/faq.ts`.

Le JSX ne doit pas contenir une copie divergente.
Les données restent typées, stables et faciles à réviser.

## 17. Métadonnées

Les métadonnées doivent :

- identifier PRIMiE ;
- décrire honnêtement l'activité ;
- utiliser une localisation seulement si elle est validée ;
- éviter le bourrage de mots-clés ;
- conserver une longueur raisonnable ;
- rester cohérentes avec le contenu visible.

Ne pas promettre dans le titre SEO ce que la page ne fournit pas.

Ne pas écrire `n°1`, `meilleure`, `pas cher` ou `urgence` sans preuve et décision
explicite.

## 18. Français et typographie

Respecter :

- accents sur les majuscules ;
- espaces avant `:`, `;`, `?` et `!` selon la typographie française ;
- apostrophes correctes ;
- unités séparées de leur nombre ;
- numéro de téléphone lisible ;
- majuscules limitées ;
- cohérence singulier/pluriel.

Écrire :

- `WhatsApp`
- `PRIMiE`
- `coiffure à domicile`
- `rendez-vous`

Éviter :

- `Whatsapp`
- `whats app`
- `rdv` dans un titre public
- abréviations SMS

## 19. Modification par une IA

Avant de modifier un contenu :

1. identifier sa source actuelle ;
2. déterminer s'il est validé ;
3. rechercher toutes ses occurrences ;
4. préserver le ton et le vouvoiement ;
5. vérifier les métadonnées liées ;
6. éviter toute contradiction.

Après modification, signaler :

- textes changés ;
- faits ajoutés ;
- source ou statut de validation ;
- contenus encore à valider ;
- métadonnées affectées.

## 20. Interdictions absolues

- Générer un faux témoignage.
- Inventer prix, horaire, adresse ou zone.
- Inventer une expérience professionnelle.
- Publier une prestation non confirmée.
- Promettre une disponibilité.
- Utiliser un texte générique de salon physique.
- Passer du vouvoiement au tutoiement.
- Surcharger les textes de mots-clés.
- Utiliser une image comme seule porteuse d'une information essentielle.
- Publier un placeholder.
- Transformer une supposition en fait.
- Ajouter du contenu commercial pendant une tâche purement technique.
- Modifier une prestation pour équilibrer une grille.

## 21. Definition of Done

Un contenu est prêt lorsqu'il :

- respecte la voix PRIMiE ;
- s'adresse à la cliente avec `vous` ;
- est compréhensible dès la première lecture ;
- ne contient aucun fait inventé ;
- utilise les coordonnées et prestations canoniques ;
- reste cohérent dans toutes les sections ;
- possède une source de vérité unique ;
- conserve un CTA précis ;
- est accessible et correctement structuré ;
- distingue illustration et réalisation réelle ;
- a été relu en français ;
- est explicitement validé pour publication.
