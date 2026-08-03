---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.mjs"
  - "**/*.css"
---

# PRiMiE — Standards de code

## 1. Rôle de cette règle

Applique cette règle lors de toute création, modification, revue ou
refactorisation de code.

Le code PRiMiE doit être :

- correct ;
- strictement typé ;
- lisible sans explication orale ;
- simple à tester ;
- accessible ;
- performant par défaut ;
- cohérent avec l'architecture validée ;
- facile à reprendre par une autre personne ou IA.

La réussite d'un build ne suffit pas si le code est fragile, trompeur ou
inutilement complexe.

`01-product-scope.md`, `02-architecture.md` et `do-not-break.md`
restent prioritaires.

## 2. Principes généraux

- Résoudre le besoin demandé, pas un besoin hypothétique.
- Préférer la solution la plus simple qui respecte les contraintes.
- Écrire des unités petites avec une responsabilité claire.
- Préserver les conventions déjà présentes dans le dépôt.
- Réutiliser avant de dupliquer.
- Refactoriser uniquement dans le périmètre utile.
- Ne jamais masquer une erreur pour terminer plus vite.
- Ne pas laisser de code mort, log de debug ou TODO vague.
- Ne pas modifier un fichier sans comprendre son rôle et ses dépendances.

Inspecte l'existant avant de générer une nouvelle abstraction.

## 3. TypeScript strict

TypeScript doit rester en mode strict.

Obligations :

- typer les propriétés des composants ;
- typer les données métier ;
- typer paramètres et retours lorsque l'inférence n'est pas claire ;
- utiliser des unions discriminées pour les états exclusifs ;
- utiliser `unknown` avant validation lorsque le type n'est pas connu ;
- rendre `readonly` ce qui ne doit pas muter ;
- traiter explicitement les valeurs optionnelles ;
- préférer une validation réelle à une assertion de type ;
- conserver une inférence précise lorsque TypeScript la fournit.

Interdictions :

- `any` explicite ou implicite ;
- `@ts-ignore` ;
- `@ts-nocheck` ;
- double assertion comme `value as unknown as TargetType` ;
- assertion non nulle `!` sans invariant démontrable ;
- `as` utilisé uniquement pour faire taire le compilateur ;
- affaiblissement de `tsconfig.json` pour contourner une erreur.

Lorsqu'une assertion est réellement nécessaire, documente l'invariant qui la
rend sûre.

## 4. Modélisation des types

Utiliser :

- `type` pour les unions, intersections, alias et modèles de contenu ;
- `interface` pour une extension publique réellement intentionnelle ;
- `as const` pour les valeurs de configuration immuables ;
- `satisfies` pour vérifier une structure sans perdre l'inférence ;
- une union littérale plutôt qu'une chaîne arbitraire pour un ensemble fermé.

Exemple :

```ts
export const services = [
  {
    id: "braids",
    title: "Tresses",
    description: "Description validée",
  },
] as const satisfies readonly Service[];
```

Ne pas :

- créer un type global utilisé dans un seul fichier ;
- dupliquer deux types décrivant le même contrat ;
- ajouter un champ optionnel pour éviter de modéliser deux états distincts ;
- utiliser un enum lorsque des littéraux suffisent clairement.

## 5. Nommage

Les noms décrivent l'intention.

Conventions :

- composants : `PascalCase` ;
- types et interfaces : `PascalCase` ;
- variables et fonctions : `camelCase` ;
- handlers : préfixe `handle`, par exemple `handleMenuClose` ;
- callbacks en props : préfixe `on`, par exemple `onClose` ;
- booléens : préfixe `is`, `has`, `can` ou `should` ;
- fichiers et dossiers : `kebab-case` ;
- identifiants de contenu : anglais stable et sans accent ;
- textes visibles : français naturel et correctement accentué.

Éviter les noms vagues :

- `data`
- `item`
- `thing`
- `temp`
- `helper`
- `utils2`
- `component`

Ils ne sont acceptables que lorsque le contexte les rend réellement précis.

## 6. Fonctions

Une fonction doit :

- avoir une responsabilité principale ;
- retourner un résultat prévisible ;
- limiter les effets de bord ;
- utiliser des clauses de garde lorsque cela clarifie le flux ;
- éviter les paramètres booléens ambigus ;
- ne pas muter une donnée reçue sans contrat explicite ;
- rester testable sans environnement disproportionné.

Préférer :

```ts
createWhatsAppUrl({ phone, message });
```

à :

```ts
createUrl(phone, message, true, false);
```

Extraire une fonction uniquement si cela clarifie le code, permet une
réutilisation réelle ou facilite un test utile.

## 7. Composants React

Règles :

- utiliser des fonctions nommées ;
- typer les props explicitement ;
- ne pas utiliser `React.FC` par défaut ;
- conserver une responsabilité visuelle claire ;
- préférer la composition aux nombreuses options booléennes ;
- utiliser des clés stables issues des données ;
- ne pas utiliser l'index comme clé si l'ordre peut changer ;
- ne pas déclarer un composant React dans un autre composant ;
- ne pas copier des données métier dans le JSX ;
- ne pas produire du HTML invalide pour satisfaire le design ;
- conserver les éléments natifs lorsqu'ils répondent au besoin.

Exemple :

```tsx
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
```

## 8. Server Components et Client Components

Un composant reste serveur par défaut.

Ajouter `"use client"` uniquement si le fichier utilise réellement :

- un hook React client ;
- un événement navigateur ;
- une API du navigateur ;
- une bibliothèque qui impose le client.

Règles :

- placer la frontière client au plus bas ;
- transmettre seulement des props sérialisables ;
- isoler une interaction locale de sa section statique ;
- ne pas utiliser le client pour du contenu purement statique ;
- ne pas déplacer du contenu dans un hook ;
- ne pas importer un module serveur côté client.

## 9. État React

Utiliser l'état local uniquement pour une donnée qui change dans le temps et
affecte le rendu.

Ne pas stocker dans le state :

- une valeur dérivable des props ;
- une liste filtrée calculable au rendu ;
- une constante ;
- une donnée de configuration ;
- une valeur sans impact visuel utilisée par un seul événement.

Règles :

- utiliser une mise à jour fonctionnelle si le nouvel état dépend du précédent ;
- ne pas synchroniser deux states représentant la même information ;
- éviter `useEffect` pour une valeur dérivée ;
- éviter `useMemo` et `useCallback` sans besoin mesuré ;
- nettoyer listeners et timers ;
- ne pas ajouter de state manager global dans la V1.

## 10. Effets React

`useEffect` est réservé à la synchronisation avec un système externe :

- API navigateur ;
- listener ;
- timer ;
- bibliothèque impérative ;
- ressource extérieure à React.

Avant d'ajouter un effet, vérifier si le besoin peut être résolu :

- pendant le rendu ;
- dans un handler ;
- par une prop ;
- par une clé React ;
- par CSS ;
- côté serveur.

Un effet sans dépendances maîtrisées est interdit.

## 11. Next.js

- Utiliser `next/image` pour les images de contenu.
- Utiliser `next/link` pour la navigation interne entre routes.
- Utiliser un lien HTML pour une ancre ou une URL externe.
- Utiliser l'API `metadata` de l'App Router.
- Garder `app/page.tsx` déclaratif.
- Ne pas créer de route API pour une opération frontend.
- Ne pas utiliser le router pour une simple ancre.
- Ne pas désactiver l'optimisation d'image globalement.
- Ne pas ajouter une bibliothèque pour une fonction native de Next.js.

Les fichiers spéciaux Next.js conservent leurs exports par défaut lorsque le
framework l'exige.

## 12. Tailwind CSS

Utiliser Tailwind comme méthode principale de style.

Règles :

- employer les tokens du design system ;
- conserver un ordre de classes cohérent ;
- utiliser `cn()` pour les classes conditionnelles ;
- éviter les valeurs arbitraires répétées ;
- extraire un token lorsqu'une valeur devient une convention ;
- réserver `globals.css` aux variables, bases et rares styles globaux ;
- éviter les classes CSS métier dispersées.

Les styles inline sont réservés aux valeurs réellement dynamiques, notamment une
variable CSS calculée.

Ne pas construire de classes Tailwind par concaténation non détectable :

```ts
// Interdit
const className = `text-${color}-500`;
```

Utiliser une table de correspondance explicite.

## 13. Imports

Ordre recommandé :

1. modules Node ou framework ;
2. dépendances externes ;
3. imports internes avec `@/` ;
4. imports relatifs locaux ;
5. types lorsque leur séparation améliore la lecture ;
6. styles.

Règles :

- aucun import inutilisé ;
- aucun chemin relatif profond comme `../../../` ;
- aucun import circulaire ;
- aucun réexport massif sans bénéfice démontré ;
- utiliser `import type` pour un import uniquement typé ;
- ne pas renommer un import pour masquer un conflit de conception.

## 14. Gestion des erreurs

- Ne jamais utiliser un `catch` vide.
- Ne jamais ignorer silencieusement une promesse rejetée.
- Fournir un fallback visuel pour un média optionnel.
- Faire échouer clairement une configuration invalide en développement.
- Ne pas exposer d'information sensible dans un message d'erreur.
- Distinguer erreur attendue, contenu absent et bug.
- Ne pas retourner une valeur fictive donnant l'impression d'un succès.

Un commentaire n'est pas un traitement d'erreur.

Un fallback ne doit pas :

- masquer durablement une configuration cassée ;
- remplacer silencieusement une donnée métier canonique ;
- transformer un bug en contenu trompeur.

## 15. Commentaires et documentation

Le code explique le « quoi ». Les commentaires expliquent le « pourquoi ».

Commentaires utiles :

- contrainte navigateur inhabituelle ;
- compromis de performance ;
- invariant non évident ;
- décision métier qui pourrait sembler arbitraire ;
- dette explicitement suivie.

Commentaires interdits :

- paraphrase de la ligne suivante ;
- code commenté conservé « au cas où » ;
- TODO sans raison ni condition de résolution ;
- conversation introuvable comme seule justification ;
- commentaire utilisé pour excuser un code volontairement fragile.

Les fonctions et composants évidents n'ont pas besoin de JSDoc.

## 16. Dépendances

Avant d'ajouter une dépendance :

1. vérifier si la stack ou le navigateur couvre le besoin ;
2. vérifier les dépendances déjà installées ;
3. évaluer le poids et l'impact client ;
4. vérifier maintenance et compatibilité ;
5. auditer les scripts d'installation ;
6. expliquer la justification.

Ne jamais :

- installer plusieurs bibliothèques pour le même rôle ;
- ajouter une dépendance pour quelques lignes simples ;
- modifier le lockfile avec autre chose que `pnpm` ;
- exécuter un script d'installation non audité ;
- supprimer une dépendance sans rechercher ses usages ;
- utiliser `--force` pour résoudre une incompatibilité.

Toute compétence, extension, plugin ou outil externe suit également la règle
d'audit avant installation.

## 17. Secrets et données

- Aucun secret dans le code, les tests, commentaires ou documentation.
- Aucun fichier `.env*` sensible dans Git.
- Aucune coordonnée privée différente des données publiques validées.
- Aucun contenu client réel utilisé comme démonstration sans autorisation.
- Aucune télémétrie ajoutée implicitement.
- Aucune donnée personnelle placée dans un lien WhatsApp.

Les valeurs publiques répétées viennent de la configuration centralisée.

## 18. Contrôles avant livraison

Inspecter d'abord les scripts réellement déclarés dans `package.json`.

Exécuter les commandes disponibles et pertinentes :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Ne pas prétendre qu'une commande a réussi si elle n'a pas été exécutée.

Si un script n'existe pas :

- ne pas inventer son résultat ;
- indiquer qu'il est absent ;
- proposer son ajout uniquement s'il appartient au périmètre.

Distinguer les erreurs préexistantes hors périmètre des régressions introduites.

## 19. Interdictions absolues

- Laisser `console.log`, `debugger` ou du code de test en Production.
- Désactiver ESLint globalement.
- Affaiblir TypeScript.
- Ajouter `eslint-disable` sans justification locale.
- Utiliser `dangerouslySetInnerHTML` sans besoin démontré et contenu maîtrisé.
- Utiliser une clé de tableau instable.
- Lancer une requête réseau depuis un rendu React.
- Copier un composant uniquement pour changer son texte.
- Mélanger refactorisation étendue et correction ciblée.
- Modifier des fichiers non concernés « pour harmoniser ».
- Générer des centaines de lignes lorsque quelques lignes suffisent.
- Effectuer un commit ou un push sans demande explicite.

## 20. Revue du diff

Avant de terminer :

- vérifier que chaque fichier modifié sert la demande ;
- rechercher les imports, variables et styles devenus inutiles ;
- confirmer qu'aucun contenu canonique n'a été dupliqué ;
- vérifier les frontières serveur/client ;
- confirmer que le typage n'a pas été affaibli ;
- contrôler les erreurs console liées au changement ;
- vérifier qu'aucune dépendance n'a été ajoutée implicitement.

Un diff minimal doit aussi rester complet : ne pas omettre un test ou un état
nécessaire uniquement pour réduire le nombre de lignes.

## 21. Compte rendu

Après une modification, indiquer :

- résultat obtenu ;
- fichiers modifiés ;
- décisions techniques importantes ;
- contrôles réellement exécutés ;
- contrôles non exécutés et leur raison ;
- limites ou contenus provisoires ;
- dette créée, s'il y en a une.

Le compte rendu doit être factuel, court et vérifiable.

## 22. Definition of Done

Une modification de code est terminée lorsque :

- elle résout le besoin demandé ;
- TypeScript strict reste intact ;
- le code respecte les responsabilités architecturales ;
- la frontière client est minimale ;
- le contenu métier n'est pas dupliqué ;
- les erreurs sont traitées explicitement ;
- aucun code mort ou log de debug ne reste ;
- aucune dépendance injustifiée n'est ajoutée ;
- lint, typecheck, tests et build pertinents sont exécutés ;
- les vérifications non réalisables sont signalées ;
- le diff est ciblé, lisible et réversible.
