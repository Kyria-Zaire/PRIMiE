---
paths:
  - "app/**/*.{ts,tsx}"
  - "components/**/*.{ts,tsx}"
  - "content/**/*.{ts,tsx}"
  - "lib/**/*.{ts,tsx}"
  - "types/**/*.ts"
---

# PRiMiE — Périmètre produit V1

## 1. Rôle de cette règle

Applique cette règle pour toute tâche qui :

- crée ou modifie une section de la landing page ;
- change un texte, un CTA, une navigation ou un parcours ;
- ajoute une interaction visible par la clientèle ;
- touche aux services, réalisations, avis, FAQ ou coordonnées ;
- vérifie la conformité fonctionnelle de la V1.

La constitution Cursor `.cursor/rules/00-project.mdc` et `do-not-break.md` restent prioritaires pour les invariants.

## 2. Résultat produit attendu

PRiMiE est une landing page publique, premium et mobile-first dédiée à
`Chez PRiMiE Coiffure`.

Son objectif principal est de transformer une visite en conversation WhatsApp.

Une nouvelle visiteuse doit pouvoir, sans créer de compte :

1. identifier PRiMiE et son activité ;
2. comprendre les prestations proposées ;
3. observer des réalisations ;
4. découvrir des éléments de réassurance ;
5. obtenir des réponses pratiques ;
6. contacter Prisca ou demander une réservation.

Chaque section doit contribuer à la compréhension, à la confiance ou à la
conversion. Un bloc purement décoratif ne doit pas alourdir le parcours.

## 3. Structure officielle

L'ordre de la page est verrouillé :

1. Header
2. Hero
3. Services
4. Galerie — Nos réalisations
5. Pourquoi me choisir ?
6. FAQ
7. Réserver
8. Contact
9. Footer

La section « Avis clientes » / Testimonials est **retirée de la V1**
(`TESTIMONIALS-CONTENT-01` = `CANCELLED` — CTO 2026-08-02).

Ne pas :

- supprimer une section ;
- fusionner deux sections ;
- changer leur ordre ;
- ajouter une section majeure ;
- transformer la landing page en site multipage ;

sans validation explicite du CTO.

## 4. Navigation et ancres

Utiliser les ancres canoniques suivantes :

- `#accueil`
- `#services`
- `#galerie`
- `#a-propos`
- `#faq`
- `#reserver`
- `#contact`

Exigences :

- le logo ou nom de marque mène vers `#accueil` ;
- chaque lien cible une section existante ;
- le scroll ne masque pas le titre ciblé ;
- le menu mobile se ferme après sélection ;
- la navigation reste utilisable au clavier ;
- le CTA principal du header mène vers WhatsApp ou `#reserver` ;
- aucun `href="#"`, lien vide ou bouton factice n'est autorisé.

## 5. Header

Le Header contient :

- l'identité `PRiMiE` ;
- la navigation principale sur desktop ;
- un accès clair à la réservation ;
- un menu adapté aux petits écrans.

Critères d'acceptation :

- identité lisible sur tous les fonds ;
- aucune collision entre logo, navigation et CTA ;
- menu mobile correctement nommé et annoncé ;
- état ouvert ou fermé compréhensible ;
- focus visible sur chaque contrôle ;
- aucun doublon inutile de navigation.

Le Header doit rester utile sans occuper une part excessive de l'écran mobile.

## 6. Hero

Le Hero affiche :

- `Chez PRiMiE Coiffure` ;
- une proposition de valeur courte et crédible ;
- un visuel principal de qualité ;
- un CTA WhatsApp prioritaire ;
- un CTA secondaire vers `#galerie`.

Le contenu doit faire comprendre immédiatement :

- qu'il s'agit de coiffure et beauté afro ;
- que la prestation est réalisée à domicile ;
- que l'expérience est humaine et professionnelle ;
- que la prise de contact se fait simplement.

Critères d'acceptation :

- contenu essentiel visible rapidement sur mobile ;
- CTA principal identifiable sans ambiguïté ;
- texte lisible quelle que soit l'image ;
- cadrage maîtrisé sur mobile et desktop ;
- aucune statistique, distinction ou promesse inventée.

## 7. Services

Les prestations canoniques sont :

- Tresses & coiffure femme et homme
- Traitement de perruque
- Pose perruque
- Look & twist
- Vente et pose de perruques
- Tissage

Chaque carte de service contient, selon les données validées :

- un titre ;
- une description courte et utile ;
- une image représentative ;
- une action pour demander des informations.

Exigences :

- libellés compréhensibles par la clientèle ;
- données centralisées hors du JSX ;
- cartes visuellement cohérentes ;
- images réellement liées au service annoncé ;
- aucun tarif, délai ou résultat non confirmé ;
- aucun service ajouté pour équilibrer une grille.

## 8. Galerie — Nos réalisations

La galerie privilégie une grille responsive.

Ne jamais utiliser un carrousel comme seul moyen d'accéder aux réalisations.

Fonctions autorisées :

- grille d'images ;
- filtres par catégorie si le volume le justifie ;
- agrandissement accessible dans une lightbox ;
- navigation entre les images ;
- fermeture par bouton, touche `Escape` et interaction mobile adaptée.

Exigences :

- chaque réalisation possède un texte alternatif utile ;
- aucun filtre ne crée un état vide incompréhensible ;
- la lightbox maîtrise le focus clavier ;
- le retour du focus est prévisible à la fermeture ;
- les médias sont optimisés ;
- aucune réalisation tierce n'est présentée comme celle de PRiMiE.

Une photo ne doit être publiée que si son origine et son autorisation d'usage sont
maîtrisées.

## 9. Pourquoi me choisir ?

Cette section présente des raisons concrètes et crédibles de choisir Prisca.

Thèmes autorisés lorsqu'ils restent vérifiables :

- attention portée à la cliente ;
- soin et précision ;
- écoute du besoin ;
- accompagnement personnalisé ;
- respect du cheveu et du style souhaité ;
- prestation à domicile.

Ne transforme jamais ces thèmes en :

- certification ;
- garantie absolue ;
- résultat chiffré ;
- comparaison dénigrante ;
- promesse médicale ou technique.

## 10. Avis clientes

Statut V1 : **retirée** (`TESTIMONIALS-CONTENT-01` = `CANCELLED` — CTO 2026-08-02).
Aucun scaffolding runtime Testimonials / `#avis`.

Si une réouverture future est décidée, n'afficher que des témoignages :

- réellement reçus ;
- validés pour publication ;
- reproduits fidèlement ;
- accompagnés uniquement des informations autorisées.

Un avis provisoire doit être clairement marqué dans les données et ne doit jamais
être présenté comme authentique sur le site public.

Interdictions (restent applicables) :

- faux score global ;
- faux volume d'avis ;
- nom complet ou photo sans autorisation ;
- réécriture qui change le sens ;
- slider obligatoire pour accéder à tous les avis ;
- inventer un témoignage pour remplir la maquette.

## 11. FAQ

La FAQ répond uniquement à des informations métier confirmées.

Sujets possibles après validation :

- fonctionnement de la prise de rendez-vous ;
- préparation avant la prestation ;
- fournitures nécessaires ;
- déplacement à domicile ;
- entretien après la coiffure ;
- moyens de contact.

Critères d'acceptation :

- questions et réponses issues d'une source unique ;
- accordéon utilisable au clavier ;
- état ouvert communiqué aux technologies d'assistance ;
- aucun renseignement inventé pour remplir une réponse ;
- aucune réponse juridique ou commerciale non validée.

Si une réponse manque, la demander au CTO ou à Prisca.

## 12. Réserver

Le parcours officiel est :

1. la cliente contacte PRiMiE sur WhatsApp ;
2. elle précise la prestation souhaitée ;
3. Prisca confirme les détails et sa disponibilité.

Le CTA canonique utilise :

```text
https://wa.me/33749616582
```

Un message prérempli peut être ajouté uniquement s'il est validé, centralisé,
modifiable avant l'envoi et correctement encodé.

La V1 ne réserve aucun créneau automatiquement.

## 13. Contact

Afficher uniquement :

- téléphone : `+33 7 49 61 65 82` ;
- lien d'appel : `tel:+33749616582` ;
- WhatsApp : `https://wa.me/33749616582` ;
- réseaux sociaux après validation de leurs URL ;
- adresse ou zone géographique après confirmation.

Critères d'acceptation :

- téléphone réellement cliquable ;
- WhatsApp présenté comme canal principal ;
- aucun faux horaire ou emplacement ;
- aucun formulaire de contact dans la V1 ;
- aucune donnée personnelle demandée par la page.

## 14. Footer

Le Footer contient au minimum :

- l'identité PRiMiE ;
- les raccourcis réellement utiles ;
- les coordonnées validées ;
- les mentions nécessaires lorsqu'elles sont disponibles ;
- une année calculée sans maintenance manuelle.

Ne pas afficher :

- lien vers une page inexistante ;
- réseau social non validé ;
- mention légale inventée ;
- adresse fictive ;
- newsletter non fonctionnelle.

## 15. Conversion WhatsApp

Tous les CTA de réservation doivent :

- utiliser le même numéro canonique ;
- avoir un libellé explicite ;
- fonctionner sur mobile et desktop ;
- utiliser un lien HTML réel ;
- rester utilisables sans animation ;
- permettre un fallback téléphonique.

Libellés acceptables :

- `Réserver sur WhatsApp`
- `Contacter Prisca sur WhatsApp`
- `Demander des informations sur WhatsApp`

Éviter les libellés vagues comme `Cliquez ici`, `Envoyer`, `Continuer` ou `Go`.

Ne jamais :

- annoncer qu'une réservation est confirmée ;
- envoyer automatiquement un message ;
- intégrer un widget ou SDK WhatsApp ;
- ajouter une donnée cliente à l'URL ;
- multiplier les variantes du numéro dans les composants.

## 16. Sources de contenu

Les faits métier modifiables doivent être centralisés, notamment :

- identité ;
- coordonnées ;
- navigation ;
- services ;
- réalisations ;
- raisons de choisir PRiMiE ;
- témoignages validés ;
- FAQ ;
- textes de CTA ;
- réseaux sociaux.

Utiliser `content/site-config.ts` pour les constantes globales et des modules de
contenu dédiés lorsque les collections deviennent suffisamment importantes.

Le JSX ne doit pas devenir une seconde source de vérité.

## 17. États fonctionnels

Chaque interaction ajoutée doit traiter :

- état initial ;
- survol lorsque pertinent ;
- focus clavier ;
- état actif ou sélectionné ;
- état ouvert ou fermé ;
- contenu absent ;
- média indisponible ;
- mouvement réduit.

Une dégradation doit rester propre :

- une image manquante ne casse pas la mise en page ;
- une liste vide ne produit pas un bloc incompréhensible ;
- une animation défaillante ne bloque pas le CTA ;
- JavaScript désactivé ne doit pas empêcher un lien simple.

## 18. Hors périmètre

Ne pas introduire dans la V1 :

- authentification ou compte client ;
- dashboard ou espace administrateur ;
- base de données ;
- API métier ;
- formulaire ;
- calendrier ;
- paiement ;
- marketplace ;
- application mobile ;
- chatbot ;
- WhatsApp Cloud API ;
- CMS ;
- tracking ou analytics implicite.

Une proposition hors périmètre doit être expliquée puis attendre une décision
explicite. Ne pas en coder une fondation cachée.

## 19. Contrôles fonctionnels

Après un changement concerné par cette règle, vérifier selon l'impact :

1. chargement de `/` ;
2. ordre et présence des sections ;
3. navigation par ancres ;
4. menu mobile ;
5. affichage des services ;
6. galerie et lightbox ;
7. FAQ ;
8. tous les liens WhatsApp ;
9. lien téléphonique ;
10. navigation clavier ;
11. affichage mobile et desktop ;
12. absence d'erreur console.

Ne pas déclencher réellement un appel ou envoyer un message pendant les tests.
Contrôler la destination du lien.

## 20. Definition of Done

Une modification produit est terminée lorsque :

- son objectif pour la cliente est clair ;
- elle respecte l'ordre officiel de la page ;
- ses contenus sont validés ou explicitement provisoires ;
- ses CTA mènent à la destination canonique ;
- ses interactions fonctionnent au clavier et au tactile ;
- mobile et desktop sont vérifiés lorsqu'ils sont affectés ;
- elle ne crée aucun lien mort ni information inventée ;
- elle n'étend pas implicitement le périmètre V1 ;
- elle conserve une source de vérité pour les données métier ;
- les tests et contrôles pertinents passent ;
- toute limite non vérifiée est signalée.

Si un point n'est pas démontré, ne pas présenter la tâche comme entièrement
terminée.
